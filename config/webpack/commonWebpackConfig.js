// Common configuration applying to client and server configuration
const { generateWebpackConfig, merge } = require('shakapacker')
const path = require('path')

const commonOptions = {
  resolve: {
    extensions: ['.css', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../../app/javascript/app'),
      '@components': path.resolve(
        __dirname,
        '../../app/javascript/app/components'
      ),
      '@packs': path.resolve(__dirname, '../../app/javascript/packs'),
      '@bundles': path.resolve(__dirname, '../../app/javascript/bundles')
    }
  },
  module: {
    rules: [
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: '@mdx-js/loader'
          }
        ]
      }
    ]
  }
}

const ignoreWarningsConfig = {
  ignoreWarnings: [/Module not found: Error: Can't resolve 'react-dom\/client'/]
}

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
// const commonWebpackConfig = () => (merge({}, baseClientWebpackConfig, commonOptions))
const commonWebpackConfig = () =>
  merge({}, generateWebpackConfig(), commonOptions, ignoreWarningsConfig)

module.exports = commonWebpackConfig
