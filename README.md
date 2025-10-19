# React on Rails Demo With SSR, HMR fast refresh, and TypeScript

A production-ready React on Rails application demonstrating server-side rendering, hot module replacement, and TypeScript integration.

**Current Stack (October 2025):**

- Ruby 3.4.7
- Rails 7.2.2
- React 18.3.1
- Shakapacker 9.2.0
- React on Rails 16.1.1
- TypeScript 5.7.2
- Webpack 5.97.1

## Key Features

1. **Shakapacker v9.2** - Modern webpack integration for Rails
1. **Server-Side Rendering (SSR)** - Separate server bundle for optimal performance
1. **Hot Module Replacement (HMR)** - Fast refresh via [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
1. **TypeScript** - Full type safety across the application
1. **CSS Modules** - Scoped styling support
1. **React Router v7** - Client-side routing with SSR support

# Installation

## Setup

```bash
git clone git@github.com:ibfleming/ruby-rails-demo.git
cd ruby-rails-demo
bundle install
yarn install
```

## Process Management

This project includes three Procfiles for different scenarios:

1. **`Procfile.dev`** - Development with HMR enabled
   - Rails server on port 3000
   - Webpack dev server with hot reloading
   - Server bundle watch mode
2. **`Procfile.dev-static`** - Development without HMR

   - Rails server on port 3000
   - Webpack watch mode (requires manual refresh)

3. **`Procfile.prod`** - Production mode
   - Runs compiled assets via Puma server
   - Requires pre-compiled assets

## Running with HMR

```sh
bin/dev
# or
overmind start -f Procfile.dev
```

## Running without HMR, statically creating the bundles

```sh
bin/dev-static
# or
foreman start -f Procfile.dev-static
```

## Production Build & Deployment

### Building for Production

**Quick Build (Recommended):**

```sh
bin/build-production
```

This automated script will:

- Clean previous builds
- Install dependencies
- Compile optimized production assets
- Verify build outputs
- Show build statistics

**CI/CD Build:**

```sh
# For automated pipelines
SECRET_KEY_BASE=dummy bin/build-ci
```

**Manual Build:**

```sh
SECRET_KEY_BASE=test RAILS_ENV=production bundle exec rake assets:precompile
```

### Testing Production Locally

```sh
# After building, start production server
SECRET_KEY_BASE=test bundle exec rails s -e production -p 3000
```

### Deployment

See **[PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md)** for:

- Complete deployment checklist
- Platform-specific guides (Heroku, Docker, VPS)
- CI/CD integration examples
- Troubleshooting tips
- Environment variable requirements

## Testing Functionality

### SSR and HMR Testing

1. Start the development server with HMR:

   ```sh
   bin/dev  # or: foreman start -f Procfile.dev
   ```

2. Visit http://localhost:3000

   - Check browser console for HMR message: `[webpack-dev-server] Hot Module Replacement enabled.`
   - Test React components and routing functionality

3. Test Hot Module Replacement:

   - Edit `client/app/components/HelloWorld/HelloWorld.tsx`
   - Save the file and observe instant updates without page refresh
   - Browser console will show:
     ```
     [webpack-dev-server] App updated. Recompiling...
     [HMR] Checking for updates on the server...
     [HMR] Updated modules: ...
     [HMR] App is up to date.
     ```

4. Test CSS Module hot reloading:
   - Edit `client/app/assets/styles/application.module.css`
   - Changes apply instantly without losing component state

### Production Build Testing

```sh
# Clean previous builds
rm -rf public/packs

# Precompile assets
RAILS_ENV=production bundle exec rake assets:precompile

# Start production server
foreman start -f Procfile.prod

# Visit http://localhost:3000
```

## Project Structure

```
client/app/
├── components/       # React components
│   └── HelloWorld/  # Example component with TypeScript
├── packs/           # Webpack entry points
│   ├── application.js      # Main app entry
│   ├── client-bundle.ts    # Client-side bundle
│   └── server-bundle.ts    # Server-side bundle
└── assets/
    └── styles/      # CSS and CSS Modules

config/
├── webpack/         # Webpack configuration
│   ├── clientWebpackConfig.js
│   ├── commonWebpackConfig.js
│   ├── development.js
│   └── production.js
└── initializers/
    └── react_on_rails.rb    # React on Rails config
```

## Debugging

To debug webpack configuration:

```sh
# Development
NODE_ENV=development bin/shakapacker --debug

# Production
NODE_ENV=production RAILS_ENV=production bin/shakapacker --debug
```

## Running Tests

```sh
bundle exec rspec
```

## Resources

- [React on Rails Documentation](https://github.com/shakacode/react_on_rails)
- [Shakapacker Documentation](https://github.com/shakacode/shakapacker)
- [React on Rails Tutorial](https://github.com/shakacode/react_on_rails/blob/master/docs/guides/tutorial.md)

## License

MIT License - Copyright (c) 2020 ShakaCode
