# Production Build Quick Reference

## 🚀 Build for Production

### Interactive Build (Recommended for manual deployment)
```bash
bin/build-production
```
- Shows detailed progress
- Verifies environment
- Provides next steps

### CI/CD Build (Automated pipelines)
```bash
SECRET_KEY_BASE=dummy bin/build-ci
```
- No prompts
- Fast execution
- Exit codes for automation

### Manual Build
```bash
export SECRET_KEY_BASE=$(rails secret)
export RAILS_ENV=production
export NODE_ENV=production

rm -rf public/packs
bundle exec rake assets:precompile
```

## 📦 What Gets Built

```
public/packs/
├── manifest.json                          # Rails asset manifest
├── js/
│   ├── client-bundle-[hash].js           # ~3 KB minified
│   ├── server-bundle.js                  # ~616 KB (SSR)
│   ├── application-[hash].js             # ~3 KB
│   ├── runtime-[hash].js                 # ~1 KB
│   └── [vendor]-[hash].js                # ~187 KB (React, etc)
└── css/
    ├── client-bundle-[hash].css          # Minified styles
    └── application-[hash].css            # Minified styles
```

Total: ~2.5 MB (includes source maps and auxiliary files)

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] Run `bin/build-production` successfully
- [ ] All tests pass (`bundle exec rspec`)
- [ ] Environment variables ready:
  - [ ] `SECRET_KEY_BASE` (generate: `rails secret`)
  - [ ] `DATABASE_URL` (if using PostgreSQL)
  - [ ] `RAILS_ENV=production`
- [ ] Database migrations reviewed
- [ ] Test production build locally:
  ```bash
  SECRET_KEY_BASE=$(rails secret) bundle exec rails s -e production
  ```

## 🧪 Test Production Build Locally

```bash
# Build
bin/build-production

# Test server
SECRET_KEY_BASE=$(rails secret) bundle exec rails s -e production -p 3000

# Visit: http://localhost:3000
```

## 🌐 Deployment Platforms

### Heroku
```bash
git push heroku main
# Automatic asset compilation
```

### Docker
```bash
docker build -t myapp .
docker run -p 3000:3000 -e SECRET_KEY_BASE=$(rails secret) myapp
```

### VPS/Manual
```bash
# On local machine
bin/build-production
rsync -avz public/packs/ user@server:/var/www/app/public/packs/

# On server
bundle exec rake db:migrate
sudo systemctl restart puma
```

## 🔧 Common Issues

### Build Fails
```bash
# Clear cache and retry
rm -rf tmp/cache/webpacker node_modules/.cache
yarn install
bin/build-production
```

### Assets Not Loading
```bash
# Verify files exist
ls -lh public/packs/

# Check environment
echo $RAILS_ENV  # Should be: production
echo $RAILS_SERVE_STATIC_FILES  # Should be: true (if not using nginx)
```

### SSR Not Working
```bash
# Verify server bundle
ls -lh public/packs/server-bundle.js

# Check React on Rails config
grep server_bundle_js_file config/initializers/react_on_rails.rb
```

## 📊 Build Performance

Typical build times:
- Clean build: 15-30 seconds
- Cached build: 5-10 seconds

Optimize by:
- Using CI/CD caching
- Caching `node_modules`
- Caching bundle gems

## 🔐 Security

**IMPORTANT:** Never commit production secrets!

```bash
# .gitignore should include:
.env
.env.production
/config/master.key
/config/credentials/*.key
```

Generate secure keys:
```bash
rails secret  # For SECRET_KEY_BASE
```

## 📚 More Information

- Full deployment guide: [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md)
- Development setup: [README.md](README.md)
- Troubleshooting: See PRODUCTION_DEPLOYMENT.md

## 💡 Pro Tips

1. **Always test production build locally first**
   ```bash
   bin/build-production
   SECRET_KEY_BASE=test bundle exec rails s -e production
   ```

2. **Use environment-specific configs**
   - Development: Fast rebuilds, debugging
   - Production: Minified, optimized, SSR

3. **Monitor build artifacts size**
   ```bash
   du -sh public/packs/
   ```

4. **Keep dependencies updated**
   ```bash
   bundle update
   yarn upgrade-interactive
   ```

5. **Use asset CDN in production**
   - Configure in `config/environments/production.rb`
   - Set `config.asset_host`
