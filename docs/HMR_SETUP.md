# HMR (Hot Module Replacement) Setup Guide

## Overview

This project is configured for Hot Module Replacement (HMR) and Hot Reloading during development, following the [React on Rails HMR guide](https://www.shakacode.com/react-on-rails/docs/guides/hmr-and-hot-reloading-with-the-webpack-dev-server/).

## What is HMR?

- **HMR (Hot Module Replacement)**: Updates modules in the browser without a full page reload
- **Hot Reloading**: Automatically reloads CSS changes without losing application state
- **Fast Refresh**: Updates React components while preserving component state

## Current Configuration

### ✅ Installed Dependencies

All required packages are installed in `package.json`:

- `@pmmmwh/react-refresh-webpack-plugin` - Webpack plugin for Fast Refresh
- `react-refresh` - React Fast Refresh runtime
- `webpack-dev-server` - Development server with HMR support

### ✅ Shakapacker Configuration

In `config/shakapacker.yml`, HMR is enabled:

```yaml
development:
  dev_server:
    host: localhost
    port: 3035
    hmr: true # Hot Module Replacement enabled
    inline: true # Inline mode for automatic reloading
    client:
      overlay: true # Show errors in browser overlay
    compress: true
    headers:
      'Access-Control-Allow-Origin': '*'
```

### ✅ Babel Configuration

In `babel.config.js`, the react-refresh plugin is conditionally loaded:

```javascript
plugins: [
  process.env.WEBPACK_SERVE && 'react-refresh/babel'
  // ... other plugins
].filter(Boolean)
```

This ensures the plugin only runs when using `shakapacker-dev-server`.

### ✅ Webpack Development Configuration

In `config/webpack/development.js`, the ReactRefreshWebpackPlugin is configured:

```javascript
const isWebpackDevServer = process.env.WEBPACK_SERVE

if (isWebpackDevServer) {
  const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
  clientWebpackConfig.plugins.push(
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockPort: devServer.port // Match shakapacker.yml port (3035)
      }
    })
  )
}
```

### ✅ Separate Client and Server Bundles

The project uses separate webpack configurations for client and server bundles, which is required for HMR with server-side rendering.

In `Procfile.dev`:

```
rails: bundle exec rails s -p 3000
wp-client: bin/shakapacker-dev-server        # Client bundle with HMR
wp-server: SERVER_BUNDLE_ONLY=yes bin/shakapacker --watch  # Server bundle
```

## How to Use HMR

### Starting the Development Server

Run all three processes using foreman:

```bash
# Option 1: Use foreman with Procfile.dev
foreman start -f Procfile.dev

# Option 2: Or run in separate terminals
# Terminal 1: Rails server
bundle exec rails s -p 3000

# Terminal 2: Webpack dev server (client bundle with HMR)
bin/shakapacker-dev-server

# Terminal 3: Server bundle watcher
SERVER_BUNDLE_ONLY=yes bin/shakapacker --watch
```

### Expected Behavior

1. **JavaScript Changes**:

   - Edit a React component in `client/app/components/`
   - The browser will update automatically without refresh
   - Component state is preserved (Fast Refresh)

2. **CSS Changes**:

   - Edit any stylesheet
   - Styles update immediately without page reload

3. **Errors**:
   - Compilation errors show as an overlay in the browser
   - Fix the error and the overlay disappears automatically

### Accessing the App

- **Rails app**: http://localhost:3000
- **Webpack dev server**: http://localhost:3035 (for assets)

The Rails app will automatically fetch assets from the webpack dev server when running in development mode.

## How It Works

1. **webpack-dev-server** runs on port 3035 serving the client bundle
2. The Rails app on port 3000 loads assets from the dev server
3. A WebSocket connection is established between browser and dev server
4. When files change, webpack recompiles and pushes updates via WebSocket
5. React Fast Refresh updates components without losing state

## Troubleshooting

### HMR Not Working

1. **Check all processes are running**:

   ```bash
   # Should see all three processes
   ps aux | grep -E "rails|shakapacker"
   ```

2. **Check browser console**:

   - Look for WebSocket connection to `ws://localhost:3035`
   - Should see "[HMR] connected" or similar messages

3. **Verify dev server is accessible**:

   ```bash
   curl http://localhost:3035
   ```

4. **Check CORS headers**:
   - Ensure `Access-Control-Allow-Origin: *` is set in shakapacker.yml
   - Check browser network tab for CORS errors

### Changes Not Reflecting

1. **Hard refresh**: Try Cmd/Ctrl + Shift + R
2. **Check webpack compilation**:
   - Watch the webpack-dev-server terminal
   - Should see "Compiled successfully" after file changes
3. **Clear browser cache**: Sometimes cached assets can interfere

### Server Bundle Errors

If you see `window is not defined` errors:

- Ensure `SERVER_BUNDLE_ONLY=yes` is set for the server bundle watcher
- The server bundle should NOT use the webpack-dev-server

### Fast Refresh Not Preserving State

Some patterns break Fast Refresh:

- Anonymous function components (use named functions)
- Class components (convert to functional components)
- Higher-order components (use hooks instead)

## Configuration Files Reference

Key files for HMR configuration:

1. `config/shakapacker.yml` - Dev server settings
2. `babel.config.js` - React refresh babel plugin
3. `config/webpack/development.js` - ReactRefreshWebpackPlugin
4. `config/webpack/ServerClientOrBoth.js` - Separate bundle logic
5. `Procfile.dev` - Development process configuration

## Additional Notes

### Server-Side Rendering (SSR)

This project uses SSR (prerender: true), which requires:

- Separate client and server bundles
- Server bundle built separately without HMR
- Client bundle served from webpack-dev-server with HMR

### Production Build

HMR is only active in development. Production builds work normally:

```bash
RAILS_ENV=production bundle exec rails assets:precompile
```

## References

- [React on Rails HMR Guide](https://www.shakacode.com/react-on-rails/docs/guides/hmr-and-hot-reloading-with-the-webpack-dev-server/)
- [React Fast Refresh](https://reactnative.dev/docs/fast-refresh)
- [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
- [Shakapacker Documentation](https://github.com/shakacode/shakapacker)
