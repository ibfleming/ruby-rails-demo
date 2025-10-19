// Server bundle uses the full version with SSR capabilities
import ReactOnRails from 'react-on-rails'

// Using alias: @components instead of relative path
import HelloWorld from '@components/HelloWorld/HelloWorldServer'
import RouterApp from '@components/RouterApp/RouterApp.server'

// This is how react_on_rails can see the HelloWorld in the server bundle.
ReactOnRails.register({
  HelloWorld,
  RouterApp
})
