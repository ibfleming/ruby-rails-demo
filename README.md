# Ruby on Rails + React Demo Application

A modern full-stack web application demonstrating the integration of Ruby on Rails 8 (8-0-stable branch) with React 19, featuring server-side rendering (SSR), hot module replacement (HMR), and a contemporary asset pipeline.

## Table of Contents

- [Overview](#overview)
- [Ruby Version](#ruby-version)
- [System Dependencies](#system-dependencies)
- [Technology Stack](#technology-stack)
- [Why React on Rails & Shakapacker?](#why-react-on-rails--shakapacker)
- [Configuration](#configuration)
- [Database](#database)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

## Overview

This application showcases a modern approach to building full-stack web applications by combining Rails' robust backend framework with React's powerful frontend capabilities. It uses **React on Rails** for seamless integration and **Shakapacker** (the spiritual successor to Webpacker) for asset compilation.

## Ruby Version

- **Ruby 3.4.7** (Latest stable version)
- Managed via `.ruby-version` file

## System Dependencies

### Core Requirements
- **Ruby**: 3.4.7
- **Node.js**: 22.20.0+ (managed via npm 10.9.2)
- **Rails**: 8.0 (8-0-stable branch)
- **SQLite3**: 2.1+ (development/test databases)

### Key Gems
- **react_on_rails** (16.1.1) - React integration with Rails
- **shakapacker** (9.2) - Modern webpack integration for Rails
- **propshaft** - Modern asset pipeline for Rails
- **puma** - Web server
- **tailwindcss-rails** - Utility-first CSS framework
- **solid_cache**, **solid_queue**, **solid_cable** - Database-backed adapters for Rails.cache, Active Job, and Action Cable
- **foreman** (0.90.0) - Process management for development
- **kamal** - Docker-based deployment tool
- **thruster** - HTTP asset caching/compression for production

### JavaScript Dependencies
- **React**: 19.2.0 (Latest version with concurrent features)
- **React DOM**: 19.2.0
- **Webpack**: 5.102.1+
- **Babel**: For JavaScript transpilation
- **SWC**: Fast Rust-based compiler (alternative to Babel)

### Development Tools
- **brakeman** - Security vulnerability scanner
- **rubocop-rails-omakase** - Ruby code style enforcement
- **debug** - Interactive debugging
- **capybara** & **selenium-webdriver** - System testing

## Technology Stack

### Backend
- **Ruby on Rails 8.0** - Modern web application framework
- **SQLite3** - Lightweight database (development/test)
- **Puma** - Multi-threaded web server
- **Jbuilder** - JSON API builder

### Frontend
- **React 19** - Component-based UI library
- **React on Rails** - Server-side rendering & Rails integration
- **Tailwind CSS** - Utility-first CSS framework
- **Webpack 5** - Module bundler via Shakapacker

### Asset Pipeline
- **Shakapacker** - Webpack integration
- **Propshaft** - Static asset serving
- **Babel/SWC** - JavaScript compilation
- **PostCSS** - CSS processing

### Infrastructure
- **Docker** - Containerization (production deployment)
- **Kamal** - Deployment orchestration
- **Thruster** - Production web server with caching

## Why React on Rails & Shakapacker?

### React on Rails: The Bridge Between Two Worlds

**React on Rails** is the integration layer that allows React components to seamlessly work within a Rails application. Here's why it's essential for this architecture:

#### Key Benefits:

1. **Server-Side Rendering (SSR)**
   - Renders React components on the server for faster initial page loads
   - Improves SEO by delivering fully-rendered HTML to search engines
   - Provides better user experience with immediate content visibility
   - Configured via `config.server_bundle_js_file` in `react_on_rails.rb`

2. **Unified Data Flow**
   - Props are passed directly from Rails controllers to React components
   - Example: `@hello_world_props = { name: "Stranger" }` flows seamlessly to React
   - Uses the `react_component()` helper in ERB views: `<%= react_component("HelloWorld", props: @hello_world_props, prerender: true) %>`

3. **Component Registration System**
   - Automatically registers React components for use in Rails views
   - Server bundle (`server-bundle.js`) contains all SSR-capable components
   - Client bundle handles hydration and interactivity

4. **Development Experience**
   - Hot Module Replacement (HMR) for instant updates without page refresh
   - React Refresh preserves component state during development
   - Separate webpack dev server for optimal development workflow

5. **Production Optimization**
   - Automatic code splitting and lazy loading
   - Separate client and server bundles for optimal performance
   - Integration with Rails asset pipeline for cache management

### Shakapacker: Modern Webpack for Rails

**Shakapacker** is the actively maintained successor to Webpacker, providing modern webpack integration for Rails applications.

#### Why Shakapacker Over Alternatives:

1. **Active Maintenance**
   - Webpacker is no longer maintained (archived)
   - Shakapacker provides ongoing updates and webpack 5 support
   - Community-driven with regular releases

2. **Webpack 5 Support**
   - Latest webpack features and performance improvements
   - Module federation support
   - Better tree-shaking and code splitting
   - Persistent caching for faster builds

3. **Flexible Build Options**
   - Supports multiple compilers: Babel (default), SWC, or esbuild
   - Configured via `webpack_loader` in `shakapacker.yml`
   - Current setup: Babel with React preset

4. **Development Features**
   - Hot Module Replacement (HMR) via webpack-dev-server
   - Live reload capability
   - Source maps for debugging
   - Fast incremental builds using `mtime` strategy in development

5. **Production Optimization**
   - Content hashing for cache busting
   - CSS extraction via mini-css-extract-plugin
   - Compression via terser-webpack-plugin
   - Subresource integrity (SRI) support for security

6. **Rails Integration**
   - Automatic manifest.json generation for asset lookup
   - Seamless integration with Propshaft
   - Environment-specific configurations
   - Supports Rails 7+ and 8.0

#### The Shakapacker Architecture in This App:

```
config/webpack/
├── commonWebpackConfig.js      # Shared configuration
├── clientWebpackConfig.js      # Client-side bundle config
├── serverWebpackConfig.js      # SSR bundle config
├── generateWebpackConfigs.js   # Dynamic config generation
├── development.js              # Dev-specific settings
├── production.js               # Production optimizations
└── webpack.config.js           # Entry point
```

This setup enables:
- **Dual Bundle System**: Separate client and server bundles for optimal SSR
- **Conditional Building**: Build client-only, server-only, or both based on environment
- **HMR Support**: Fast refresh during development without full page reloads
- **Asset Optimization**: Automatic minification, compression, and code splitting

## Configuration

### Environment Files
- `config/application.rb` - Main application configuration
- `config/environments/` - Environment-specific settings (development, test, production)
- `config/database.yml` - Database configuration
- `config/shakapacker.yml` - Webpack/asset pipeline configuration
- `config/master.key` - Encrypted credentials key (not in version control)

### React on Rails Configuration
Located in `config/initializers/react_on_rails.rb`:
- Server bundle: `server-bundle.js` (output to `ssr-generated/`)
- Test command: `RAILS_ENV=test bin/shakapacker`
- Supports prerendering with server-side rendering

### Webpack Configuration
Managed by Shakapacker in `config/webpack/`:
- Source path: `client/` directory
- Entry path: `client/packs/`
- Public output: `public/packs/`
- Development: HMR enabled on port 3035
- Production: Content hashing, minification, compression

### Tailwind CSS
- Configuration: `app/assets/tailwind/`
- Build output: `app/assets/builds/tailwind.css`
- Integrated with the asset pipeline

## Database

### Development & Test
- **Adapter**: SQLite3
- **Database Files**:
  - Development: `storage/development.sqlite3`
  - Test: `storage/test.sqlite3`

### Production
Uses multiple SQLite databases for different Rails 8 features:
- **Primary**: `storage/production.sqlite3` - Main application data
- **Cache**: `storage/production_cache.sqlite3` - Solid Cache (database-backed caching)
- **Queue**: `storage/production_queue.sqlite3` - Solid Queue (background jobs)
- **Cable**: `storage/production_cable.sqlite3` - Solid Cable (WebSocket connections)

### Database Creation
```bash
bin/rails db:create
```

### Database Initialization
```bash
bin/rails db:migrate
bin/rails db:seed  # If seed data exists
```

## Installation

### Prerequisites
Ensure Ruby 3.4.7 and Node.js 22+ are installed.

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ruby-rails-react-demo
   ```

2. **Run the setup script**
   ```bash
   bin/setup
   ```
   This will:
   - Install Ruby dependencies (gems)
   - Install JavaScript dependencies (npm packages)
   - Prepare the database
   - Clear logs and temp files

3. **Manual setup (alternative)**
   ```bash
   bundle install
   npm install
   bin/rails db:prepare
   ```

## Running the Application

### Development Mode with HMR (Recommended)

Uses Foreman to run multiple processes concurrently:

```bash
bin/dev
```

This starts three processes:
- **Rails server** on port 3000
- **Webpack dev server** (client bundle) with HMR on port 3035
- **Webpack watch** (server bundle) for SSR

The `Procfile.dev` defines:
```
rails: bundle exec rails s -p 3000
wp-client: WEBPACK_SERVE=true bin/shakapacker-dev-server
wp-server: SERVER_BUNDLE_ONLY=yes bin/shakapacker --watch
```

Access the application at: **http://localhost:3000**

### Alternative Development Modes

**Static asset compilation (no HMR)**:
```bash
foreman start -f Procfile.dev-static-assets
```

**Production assets in development**:
```bash
foreman start -f Procfile.dev-prod-assets
```

### Manual Process Management

Run in separate terminals:

**Terminal 1 - Rails Server**:
```bash
bundle exec rails server -p 3000
```

**Terminal 2 - Client Webpack Dev Server**:
```bash
WEBPACK_SERVE=true bin/shakapacker-dev-server
```

**Terminal 3 - Server Bundle Watch**:
```bash
SERVER_BUNDLE_ONLY=yes bin/shakapacker --watch
```

### Production Mode

```bash
RAILS_ENV=production rails server
```

Ensure assets are precompiled first:
```bash
RAILS_ENV=production rails assets:precompile
```

## Testing

### Running the Test Suite

**All tests**:
```bash
bin/rails test
```

**System tests** (with browser automation):
```bash
bin/rails test:system
```

**Specific test file**:
```bash
bin/rails test test/controllers/hello_world_controller_test.rb
```

### Test Framework
- **Minitest** - Rails default testing framework
- **Capybara** - Integration testing with browser simulation
- **Selenium WebDriver** - Browser automation for system tests

### Test Environment
- Configured in `config/environments/test.rb`
- Uses `storage/test.sqlite3` database
- Webpack compilation controlled via `config.build_test_command` in React on Rails

## Deployment

### Docker Deployment (Recommended)

This application includes Docker support for containerized deployment.

**Build Docker image**:
```bash
docker build -t ruby_rails_react_demo .
```

**Run container**:
```bash
docker run -d -p 80:80 \
  -e RAILS_MASTER_KEY=<your-master-key> \
  --name ruby_rails_react_demo \
  ruby_rails_react_demo
```

### Kamal Deployment

Kamal is included for zero-downtime Docker deployments:

```bash
kamal setup    # Initial setup
kamal deploy   # Deploy updates
```

Configuration in `config/deploy.yml`

### Production Considerations

1. **Asset Precompilation**:
   ```bash
   RAILS_ENV=production SECRET_KEY_BASE_DUMMY=1 rails assets:precompile
   ```

2. **Environment Variables**:
   - `RAILS_MASTER_KEY` - For encrypted credentials
   - `SECRET_KEY_BASE` - Session encryption
   - `DATABASE_URL` - If using external database

3. **Web Server**:
   - Uses **Thruster** by default (included with Rails 8)
   - Provides HTTP caching, compression, and X-Sendfile
   - Production command: `./bin/thrust ./bin/rails server`

4. **Database Setup**:
   - Ensure production databases are created
   - Run migrations: `RAILS_ENV=production rails db:migrate`

## Project Structure

```
.
├── app/
│   ├── assets/          # Static assets (images, stylesheets)
│   ├── controllers/     # Rails controllers
│   ├── models/          # ActiveRecord models
│   ├── views/           # ERB templates
│   │   ├── hello_world/ # Example React-integrated view
│   │   └── layouts/     # Application layouts
│   ├── helpers/         # View helpers
│   ├── jobs/            # Background jobs (Solid Queue)
│   └── mailers/         # Action Mailer classes
│
├── client/              # React application code
│   ├── src/             # React components
│   │   └── HelloWorld/  # Example component
│   │       └── ror_components/
│   │           ├── HelloWorld.client.jsx  # Client-side component
│   │           ├── HelloWorld.server.jsx  # SSR entry point
│   │           └── HelloWorld.module.css  # Component styles
│   ├── packs/           # Webpack entry points
│   │   ├── application.js    # Client bundle entry
│   │   └── server-bundle.js  # Server bundle entry
│   └── generated/       # Auto-generated React on Rails code
│
├── config/              # Application configuration
│   ├── webpack/         # Webpack configuration files
│   ├── initializers/    # Rails initializers
│   │   └── react_on_rails.rb
│   ├── environments/    # Environment configs
│   ├── application.rb   # Main app config
│   ├── routes.rb        # Route definitions
│   ├── database.yml     # Database config
│   └── shakapacker.yml  # Webpack/Shakapacker config
│
├── db/                  # Database files and migrations
│   ├── migrate/         # Database migrations
│   └── seeds.rb         # Seed data
│
├── public/              # Static files served directly
│   └── packs/           # Compiled webpack assets
│
├── ssr-generated/       # Server-side rendered bundles
│
├── test/                # Test suite
│   ├── controllers/     # Controller tests
│   ├── models/          # Model tests
│   ├── system/          # System/integration tests
│   └── fixtures/        # Test fixtures
│
├── bin/                 # Executable scripts
│   ├── dev              # Development server launcher
│   ├── setup            # Setup script
│   ├── rails            # Rails CLI
│   └── shakapacker*     # Webpack commands
│
├── Gemfile              # Ruby dependencies
├── package.json         # JavaScript dependencies
├── Dockerfile           # Production container image
├── Procfile.dev         # Development processes
└── babel.config.js      # Babel configuration
```

### Key Directories Explained

- **`client/`**: All React/JavaScript code lives here, following React on Rails conventions
- **`config/webpack/`**: Custom webpack configurations for advanced build customization
- **`ssr-generated/`**: Output directory for server-rendered bundles
- **`public/packs/`**: Compiled webpack assets with manifest.json for asset lookup
- **`app/views/hello_world/`**: Demonstrates Rails view with React component integration

## Example: Hello World Component

### Rails Controller
```ruby
class HelloWorldController < ApplicationController
  def index
    @hello_world_props = { name: "Stranger" }
  end
end
```

### Rails View (ERB)
```erb
<h1>Hello World</h1>
<%= react_component("HelloWorld", props: @hello_world_props, prerender: true) %>
```

### React Component
```jsx
const HelloWorld = (props) => {
  const [name, setName] = useState(props.name);
  return (
    <div>
      <h3>Hello, {name}!</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};
```

This demonstrates:
- **Server-side rendering** (prerender: true)
- **Props passing** from Rails to React
- **Client-side hydration** for interactivity
- **State management** within React

## Services

### Background Jobs
- **Solid Queue** - Database-backed job processing
- Jobs defined in `app/jobs/`
- Configuration: `config/queue.yml`

### Caching
- **Solid Cache** - Database-backed caching (Rails.cache)
- Configuration: `config/cache.yml`

### WebSockets
- **Solid Cable** - Database-backed Action Cable adapter
- Configuration: `config/cable.yml`

### Asset Pipeline
- **Propshaft** - Static asset serving
- **Shakapacker** - JavaScript/CSS compilation via Webpack

## Additional Resources

- [React on Rails Documentation](https://github.com/shakacode/react_on_rails)
- [Shakapacker Documentation](https://github.com/shakacode/shakapacker)
- [Rails 8.0 Guides](https://guides.rubyonrails.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is available as open source under the terms of your chosen license.