# Project File Audit Report

**Date**: October 18, 2025  
**Project**: react_on_rails_demo_ssr_hmr

---

## 🗑️ DEPRECATED / CAN BE REMOVED

### 1. Spring-Related Files (Rails Application Preloader)

**Status**: ❌ **DEPRECATED** - Spring is officially deprecated in favor of Bootsnap

#### Files to Remove:

- ✅ **`config/spring.rb`** - Spring configuration file
- ✅ **`bin/spring`** - Spring binstub loader

#### Files to Clean:

- ⚠️ **`bin/rails`** - Remove Spring references (lines 2-6)
- ⚠️ **`bin/rake`** - Remove Spring references (lines 2-6)

#### Evidence:

- Gemfile (line 44): `# Note: Spring is deprecated in favor of bootsnap`
- Gemfile (lines 45-46): Spring gems are commented out
- docs/UPGRADE_NOTES.md confirms Spring was removed during upgrades
- Rails 7.2+ uses Bootsnap for faster boot times

#### Action Required:

```bash
# Safe to delete
rm config/spring.rb
rm bin/spring

# Clean up bin/rails and bin/rake (remove Spring loading logic)
```

---

## ⚠️ UNUSED BUT VALID (Keep for Future Use)

### 1. Action Cable Files

**Status**: ✅ **VALID** but currently unused

#### Files:

- `config/cable.yml` - Action Cable configuration
- `app/channels/application_cable/` - WebSocket channel classes

#### Reason to Keep:

- Valid Rails feature for WebSockets/real-time features
- Might be needed if you add chat, notifications, or real-time updates
- No harm in keeping (minimal footprint)

#### Action: **KEEP**

---

### 2. Active Storage Files

**Status**: ✅ **VALID** but currently unused

#### Files:

- `config/storage.yml` - File storage configuration
- `storage/` directory - Local file storage

#### Reason to Keep:

- Valid Rails feature for file uploads
- Might be needed for user avatars, document uploads, etc.
- Configured but not actively used

#### Action: **KEEP**

---

### 3. Active Job Files

**Status**: ✅ **VALID** but currently unused

#### Files:

- `app/jobs/application_job.rb` - Base job class

#### Reason to Keep:

- Valid Rails feature for background jobs
- Might be needed for email sending, data processing, etc.
- Standard Rails scaffold

#### Action: **KEEP**

---

### 4. Action Mailer Files

**Status**: ✅ **VALID** but currently unused

#### Files:

- `app/mailers/application_mailer.rb` - Base mailer class

#### Reason to Keep:

- Valid Rails feature for sending emails
- Might be needed for notifications, password resets, etc.
- Standard Rails scaffold

#### Action: **KEEP**

---

## ✅ VALID AND IN USE

### 1. Shakapacker Configuration

- `config/shakapacker.yml` - ✅ **ACTIVELY USED**
- `config/webpack/` - ✅ **ACTIVELY USED**
- All webpack configs are current and necessary

### 2. React on Rails

- `config/initializers/react_on_rails.rb` - ✅ **ACTIVELY USED**
- `app/javascript/` - ✅ **ACTIVELY USED**

### 3. TypeScript

- `tsconfig.json` - ✅ **ACTIVELY USED**
- `app/javascript/Globals.d.ts` - ✅ **ACTIVELY USED**

### 4. Babel

- `babel.config.js` - ✅ **ACTIVELY USED**

### 5. PostCSS

- `postcss.config.js` - ✅ **ACTIVELY USED**

### 6. Browserslist

- `.browserslistrc` - ✅ **ACTIVELY USED** (defines browser support targets)

---

## 📝 FILES THAT NEED UPDATES

### 1. bin/rails

**Current Issue**: Contains deprecated Spring loading code

**Lines to Remove** (2-6):

```ruby
begin
  load File.expand_path('../spring', __FILE__)
rescue LoadError => e
  raise unless e.message.include?('spring')
end
```

**Should Be**:

```ruby
#!/usr/bin/env ruby
APP_PATH = File.expand_path('../config/application', __dir__)
require_relative '../config/boot'
require 'rails/commands'
```

---

### 2. bin/rake

**Current Issue**: Contains deprecated Spring loading code

**Lines to Remove** (2-6):

```ruby
begin
  load File.expand_path('../spring', __FILE__)
rescue LoadError => e
  raise unless e.message.include?('spring')
end
```

**Should Be**:

```ruby
#!/usr/bin/env ruby
require_relative '../config/boot'
require 'rake'
Rake.application.run
```

---

### 3. config/application.rb

**Minor Update Recommended**:

**Line 25**: Update to Rails 7.2 defaults

```ruby
# Currently:
config.load_defaults 6.0

# Should be:
config.load_defaults 7.2
```

---

## 🔍 POTENTIALLY UNUSED CONFIGURATION

### 1. Sprockets

**Status**: ⚠️ **COMMENTED OUT** (Line 15 in config/application.rb)

```ruby
# require "sprockets/railtie"
```

**Reason**: Using Shakapacker (webpack) instead of Sprockets
**Action**: ✅ **CORRECTLY DISABLED** - Leave as is

---

### 2. Redis Configuration

**Status**: ⚠️ **CONFIGURED BUT MAY NOT BE USED**

Files:

- `config/cable.yml` - References Redis for Action Cable in production
- Gemfile line 20-21: Redis gem is commented out

**Action**:

- If not using Action Cable in production: **KEEP CONFIG** (harmless)
- If using Action Cable: Uncomment Redis gem in Gemfile

---

## 📊 SUMMARY

### Files to DELETE:

1. ❌ `config/spring.rb` (8 lines)
2. ❌ `bin/spring` (~18 lines)

### Files to UPDATE:

1. ⚠️ `bin/rails` - Remove Spring loading (5 lines)
2. ⚠️ `bin/rake` - Remove Spring loading (5 lines)
3. ⚠️ `config/application.rb` - Update load_defaults to 7.2 (1 line)

### Files to KEEP (Currently Unused):

1. ✅ `config/cable.yml` - Action Cable (WebSockets)
2. ✅ `config/storage.yml` - Active Storage (file uploads)
3. ✅ `app/channels/` - WebSocket channels
4. ✅ `app/mailers/` - Email functionality
5. ✅ `app/jobs/` - Background jobs
6. ✅ `.browserslistrc` - Browser targets

### Total Impact:

- **~36 lines** of deprecated code to remove
- **~3 files** to delete
- **~3 files** to update
- **Zero breaking changes**

---

## 🎯 RECOMMENDED ACTION PLAN

### Phase 1: Remove Deprecated (Safe - No Breaking Changes)

```bash
# 1. Delete Spring files
rm config/spring.rb
rm bin/spring

# 2. Update bin/rails
# 3. Update bin/rake
# 4. Update config/application.rb
```

### Phase 2: Test (Recommended)

```bash
# Ensure everything still works
bundle exec rails db:migrate
bin/shakapacker
bin/dev
```

### Phase 3: Optional Cleanup (If Features Not Needed)

```bash
# Only if you're SURE you won't use these features:
# - Action Cable (WebSockets)
# - Active Storage (File uploads)
# - Background jobs
# - Email sending

# For this demo project, these are likely NOT needed
# But keep them - they don't hurt anything
```

---

## 🚀 CONCLUSION

**Current State**: The project is mostly clean and up-to-date!

**Main Issues**:

- Spring (deprecated) - ~40 lines of code
- Minor version config updates

**Overall**: This is a well-maintained codebase. The only real "cruft" is the Spring-related files which were already deprecated during your upgrade.

**Recommendation**:

1. ✅ Remove Spring files (safe, recommended)
2. ✅ Update config/application.rb to Rails 7.2 defaults
3. ✅ Keep all other "unused" files (they're valid Rails features)
