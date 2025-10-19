# Production Deployment Guide

## Pre-Deployment Build Process

### Quick Build (Recommended)

```bash
bin/build-production
```

This script will:
- ✅ Verify environment variables
- ✅ Clean previous builds
- ✅ Install dependencies
- ✅ Compile production assets (client & server bundles)
- ✅ Verify build outputs
- ✅ Show build statistics

### Manual Build Steps

If you prefer to run steps manually:

```bash
# 1. Set environment
export RAILS_ENV=production
export NODE_ENV=production
export SECRET_KEY_BASE=$(rails secret)

# 2. Clean previous builds
rm -rf public/packs tmp/cache/webpacker

# 3. Install dependencies
bundle install --without development test
yarn install --frozen-lockfile

# 4. Precompile assets
bundle exec rake assets:precompile

# 5. Verify build
ls -lh public/packs/
```

## Build Artifacts

After a successful build, you'll have:

```
public/packs/
├── manifest.json                      # Asset manifest for Rails
├── js/
│   ├── client-bundle-[hash].js        # Client-side React bundle (minified)
│   ├── server-bundle.js               # Server-side rendering bundle
│   ├── application-[hash].js          # Main application bundle
│   └── runtime-[hash].js              # Webpack runtime
└── css/
    ├── client-bundle-[hash].css       # Client styles
    └── application-[hash].css         # Application styles
```

## Production Environment Variables

### Required

```bash
SECRET_KEY_BASE=your-secret-key-here
RAILS_ENV=production
```

Generate a secure key:
```bash
rails secret
```

### Optional

```bash
# Database
DATABASE_URL=postgresql://user:pass@host/dbname

# Rails
RAILS_SERVE_STATIC_FILES=true        # If not using nginx/apache
RAILS_LOG_TO_STDOUT=true             # For containerized deployments

# React on Rails
REACT_ON_RAILS_ENV=production

# Performance
WEB_CONCURRENCY=2                    # Puma workers
RAILS_MAX_THREADS=5                  # Puma threads per worker
```

## Deployment Checklist

### Before Deployment

- [ ] Run `bin/build-production` successfully
- [ ] Test production build locally
- [ ] Verify all environment variables are set
- [ ] Review database migrations
- [ ] Check that `public/packs/` contains compiled assets
- [ ] Verify server bundle exists (`public/packs/server-bundle.js`)
- [ ] Test SSR functionality locally

### During Deployment

- [ ] Upload compiled assets (`public/packs/`) to production server
- [ ] Set `SECRET_KEY_BASE` environment variable
- [ ] Run database migrations: `bundle exec rake db:migrate`
- [ ] Restart application server

### After Deployment

- [ ] Verify application starts without errors
- [ ] Check server-side rendering is working
- [ ] Test client-side routing
- [ ] Monitor logs for errors
- [ ] Test critical user flows

## Testing Production Build Locally

```bash
# Build assets
bin/build-production

# Start production server
SECRET_KEY_BASE=$(rails secret) bundle exec rails s -e production

# Visit http://localhost:3000
```

## Platform-Specific Deployment

### Heroku

```bash
# Heroku automatically runs asset compilation
# Just ensure you have:
echo "ruby '3.4.7'" > .ruby-version
heroku buildpacks:add heroku/ruby
heroku buildpacks:add heroku/nodejs

# Set config
heroku config:set SECRET_KEY_BASE=$(rails secret)
heroku config:set RAILS_ENV=production
```

### Docker

```dockerfile
# Build stage
FROM ruby:3.4.7 AS builder
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

WORKDIR /app
COPY Gemfile* package.json yarn.lock ./
RUN bundle install --without development test && yarn install --frozen-lockfile

COPY . .
RUN SECRET_KEY_BASE=dummy bundle exec rake assets:precompile

# Runtime stage
FROM ruby:3.4.7-slim
WORKDIR /app
COPY --from=builder /app /app
COPY --from=builder /usr/local/bundle /usr/local/bundle

EXPOSE 3000
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
```

### VPS / Manual Deployment

```bash
# On your local machine - build assets
bin/build-production

# Copy to server (option 1: rsync)
rsync -avz --exclude 'node_modules' --exclude 'tmp' \
  ./ user@your-server:/var/www/app/

# Or (option 2: git pull on server)
ssh user@your-server
cd /var/www/app
git pull origin main
bin/build-production

# On server - run migrations and restart
bundle exec rake db:migrate
sudo systemctl restart puma
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.4.7
          bundler-cache: true
      
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'yarn'
      
      - name: Install dependencies
        run: |
          bundle install
          yarn install --frozen-lockfile
      
      - name: Build production assets
        env:
          RAILS_ENV: production
          NODE_ENV: production
          SECRET_KEY_BASE: ${{ secrets.SECRET_KEY_BASE }}
        run: bin/build-production
      
      - name: Upload assets
        uses: actions/upload-artifact@v3
        with:
          name: production-assets
          path: public/packs/
```

## Troubleshooting

### Assets not loading

- Verify `RAILS_SERVE_STATIC_FILES=true` is set
- Check nginx/apache configuration for `/packs` path
- Ensure `public/packs/` directory exists with files

### SSR not working

- Verify `public/packs/server-bundle.js` exists
- Check React on Rails configuration in `config/initializers/react_on_rails.rb`
- Review server logs for Node.js errors

### Build failures

- Clear cache: `rm -rf tmp/cache/webpacker`
- Update browserslist: `npx browserslist@latest --update-db`
- Check Node/Ruby versions match requirements

### Performance issues

- Enable asset compression in nginx/apache
- Use CDN for static assets
- Increase Puma workers/threads based on server resources
- Monitor memory usage

## Monitoring & Maintenance

- Monitor application logs
- Set up error tracking (e.g., Sentry, Honeybadger)
- Monitor server resources (CPU, memory, disk)
- Regularly update dependencies
- Run `bundle exec rake assets:clean` to remove old assets

## Support

- [React on Rails Documentation](https://github.com/shakacode/react_on_rails)
- [Shakapacker Documentation](https://github.com/shakacode/shakapacker)
- [Rails Deployment Guide](https://guides.rubyonrails.org/deploying.html)
