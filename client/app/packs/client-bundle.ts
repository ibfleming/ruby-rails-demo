// This is the client-side entry point. Only necessary for the browser.
// The server-side bundle uses 'react-on-rails' without the /client suffix,
// which includes some ~14KB of server-side rendering utilities browsers don't need.
// See: https://forum.shakacode.com/t/you-may-be-able-to-reduce-your-bundle-size-by-14-kb-by-using-react-on-rails-node-package-lib-clientstartup-when-calling-reactonrails-register-for-code-that-is-only-run-on-the-client/1908
import ReactOnRails from 'react-on-rails/client'

// Using alias: @components instead of relative path
import HelloWorld from '@components/HelloWorld/HelloWorld'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld
})
