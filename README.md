# Selestial - Rails 8 Demo Application

## Project Overview
Minimal Rails 8.0.3 application with Tailwind CSS, running on Ruby 3.4.7. Currently on branch `superglue`.

## Tech Stack
- **Framework**: Rails 8.0.3 (Ruby 3.4.7)
- **Database**: SQLite3 (local file-based)
- **Asset Pipeline**: Propshaft (modern Rails asset pipeline)
- **CSS Framework**: Tailwind CSS
- **Web Server**: Puma
- **Testing**: Rails default (test-unit)

## Architecture

### Rails Modules (Minimal Setup)
**Active**:
- ActiveModel, ActiveRecord, ActionController, ActionView
- Rails TestUnit

**Disabled**:
- ActiveJob, ActiveStorage, ActionMailer, ActionMailbox, ActionText, ActionCable

### Application Structure
```
app/
├── controllers/
│   ├── application_controller.rb (base controller)
│   └── home_controller.rb (root page handler)
├── models/
│   └── application_record.rb (base model)
└── views/
    ├── home/index.html.erb (root page)
    └── layouts/application.html.erb (main layout)
```

### Routes
- `GET /` → `home#index` (root)
- `GET /home/index` → `home#index`
- `GET /up` → Rails health check endpoint

### Database
- **Development**: `storage/development.sqlite3`
- **Test**: `storage/test.sqlite3`
- **Production**: SQLite3 (requires persistent disk volumes)

## Key Features
- **PWA Support**: Manifest and service worker templates in `app/views/pwa/`
- **Tailwind CSS**: Pre-compiled assets in `app/assets/builds/`
- **Health Check**: `/up` endpoint for monitoring/load balancers

## Development

### Start Server
```bash
bin/dev  # Uses Procfile.dev (likely with Tailwind watch)
# or
bin/rails server
```

### Environment
- Running in dev container (Debian GNU/Linux 13 - Trixie)
- Tools available: git, gh, node, npm, eslint

### File Locations
- **Config**: `config/` (routes, database, environments, initializers)
- **Tests**: `test/controllers/home_controller_test.rb`
- **Assets**: `app/assets/` (Tailwind source + compiled builds)
- **Database Files**: `storage/*.sqlite3`

## Notes for AI Context
- **Module Name**: `Selestial` (in `config/application.rb`)
- **Minimal Rails**: Only essential modules loaded
- **No Background Jobs**: ActiveJob disabled
- **No Emails**: ActionMailer disabled
- **No File Uploads**: ActiveStorage disabled
- **Single Controller**: Only `HomeController` with `index` action
- **No Models Yet**: Only base `ApplicationRecord` exists
- **Static Root Page**: Home page with no dynamic data

## Quick Reference
- **Ruby Version**: 3.4.7
- **Rails Version**: 8.0.3
- **Primary Dependency**: Tailwind CSS for styling
- **Asset Strategy**: Propshaft (not Sprockets)
- **Current Branch**: superglue
