# Path Aliases Guide

This project uses webpack path aliases to simplify imports and make your code more maintainable.

## 📋 Available Aliases

| Alias | Points To | Description |
|-------|-----------|-------------|
| `@/*` | `app/javascript/app/*` | Root of app directory |
| `@components/*` | `app/javascript/app/components/*` | All components |
| `@packs/*` | `app/javascript/packs/*` | Webpack entry points |
| `@bundles/*` | `app/javascript/bundles/*` | Legacy bundles directory |

## 🎯 Usage Examples

### Before (Relative Paths)
```typescript
// From: app/javascript/packs/hello-world-bundle.ts
import HelloWorld from '../app/components/HelloWorld/HelloWorld'
import OtherComponent from '../app/components/OtherComponent'
```

### After (With Aliases)
```typescript
// From: app/javascript/packs/hello-world-bundle.ts
import HelloWorld from '@components/HelloWorld/HelloWorld'
import OtherComponent from '@components/OtherComponent'
```

---

## 💡 Common Use Cases

### 1. Importing Components
```typescript
// Instead of: '../../../app/components/HelloWorld'
import HelloWorld from '@components/HelloWorld/HelloWorld'
import Button from '@components/Button'
import Header from '@components/Header/Header'
```

### 2. Using Root App Alias
```typescript
// Access anything in app/javascript/app/
import { helper } from '@/utils/helpers'
import { API_URL } from '@/config/constants'
import HelloWorld from '@/components/HelloWorld/HelloWorld'
```

### 3. Cross-Component Imports
```typescript
// Inside: app/javascript/app/components/Dashboard/Dashboard.tsx
import HelloWorld from '@components/HelloWorld/HelloWorld'
import UserCard from '@components/UserCard'
```

### 4. Importing Pack Files
```typescript
// If you ever need to reference a pack
import something from '@packs/application'
```

---

## 📁 Example Project Structure with Aliases

```
app/javascript/
├── app/
│   ├── components/          # @components/*
│   │   ├── HelloWorld/
│   │   ├── UserProfile/
│   │   └── Dashboard/
│   ├── utils/               # @/utils/*
│   │   └── helpers.ts
│   ├── hooks/               # @/hooks/*
│   │   └── useAuth.ts
│   └── config/              # @/config/*
│       └── constants.ts
├── packs/                   # @packs/*
│   ├── application.js
│   └── hello-world-bundle.ts
└── bundles/                 # @bundles/*
    └── (legacy components)
```

---

## 🔧 Configuration Files

### Webpack Config
**File**: `config/webpack/commonWebpackConfig.js`
```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, '../../app/javascript/app'),
    '@components': path.resolve(__dirname, '../../app/javascript/app/components'),
    '@packs': path.resolve(__dirname, '../../app/javascript/packs'),
    '@bundles': path.resolve(__dirname, '../../app/javascript/bundles'),
  }
}
```

### TypeScript Config
**File**: `tsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["app/javascript/app/*"],
      "@components/*": ["app/javascript/app/components/*"],
      "@packs/*": ["app/javascript/packs/*"],
      "@bundles/*": ["app/javascript/bundles/*"]
    }
  }
}
```

---

## ✨ Benefits

### 1. **Cleaner Imports**
```typescript
// ❌ Hard to read
import HelloWorld from '../../../app/components/HelloWorld/HelloWorld'

// ✅ Clean and clear
import HelloWorld from '@components/HelloWorld/HelloWorld'
```

### 2. **No Path Calculation**
You don't need to count `../` levels anymore!

### 3. **Easy Refactoring**
Move files around without breaking imports:
```typescript
// This stays the same regardless of file location
import Button from '@components/Button'
```

### 4. **Better IDE Support**
- TypeScript autocomplete works perfectly
- Jump to definition works seamlessly
- Refactoring tools understand aliases

### 5. **Consistent Imports**
Everyone on the team uses the same import style.

---

## 🚀 Real-World Examples

### Example 1: Feature Component
```typescript
// File: app/javascript/app/components/Dashboard/Dashboard.tsx
import React from 'react'
import HelloWorld from '@components/HelloWorld/HelloWorld'
import UserCard from '@components/UserCard'
import { formatDate } from '@/utils/helpers'
import { API_URL } from '@/config/constants'

const Dashboard = () => {
  return (
    <div>
      <HelloWorld name="Dashboard" />
      <UserCard />
    </div>
  )
}

export default Dashboard
```

### Example 2: Pack File
```typescript
// File: app/javascript/packs/dashboard-bundle.ts
import ReactOnRails from 'react-on-rails/client'
import Dashboard from '@components/Dashboard/Dashboard'
import HelloWorld from '@components/HelloWorld/HelloWorld'

ReactOnRails.register({
  Dashboard,
  HelloWorld
})
```

### Example 3: Nested Component
```typescript
// File: app/javascript/app/components/Dashboard/Widgets/Chart.tsx
import React from 'react'
import { ChartData } from '@/types/chart'
import { processData } from '@/utils/data-processing'
import Tooltip from '@components/Tooltip'

const Chart = ({ data }: { data: ChartData }) => {
  const processed = processData(data)
  return (
    <div>
      <Tooltip content="Chart info" />
      {/* Chart implementation */}
    </div>
  )
}

export default Chart
```

---

## 🔄 Adding Custom Aliases

To add your own aliases:

1. **Update Webpack Config** (`config/webpack/commonWebpackConfig.js`):
```javascript
alias: {
  '@': path.resolve(__dirname, '../../app/javascript/app'),
  '@components': path.resolve(__dirname, '../../app/javascript/app/components'),
  '@utils': path.resolve(__dirname, '../../app/javascript/app/utils'),    // NEW
  '@hooks': path.resolve(__dirname, '../../app/javascript/app/hooks'),    // NEW
  '@types': path.resolve(__dirname, '../../app/javascript/app/types'),    // NEW
}
```

2. **Update TypeScript Config** (`tsconfig.json`):
```json
"paths": {
  "@/*": ["app/javascript/app/*"],
  "@components/*": ["app/javascript/app/components/*"],
  "@utils/*": ["app/javascript/app/utils/*"],     // NEW
  "@hooks/*": ["app/javascript/app/hooks/*"],     // NEW
  "@types/*": ["app/javascript/app/types/*"]      // NEW
}
```

3. **Rebuild**:
```bash
bin/shakapacker
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@components/...'"

**Solution**: Make sure both configs are updated:
1. ✅ `config/webpack/commonWebpackConfig.js` (for webpack)
2. ✅ `tsconfig.json` (for TypeScript)

### Issue: TypeScript errors but webpack builds fine

**Solution**: Restart your TypeScript language server:
- VS Code: Reload window (`Cmd/Ctrl + Shift + P` → "Reload Window")
- Or restart your editor

### Issue: Autocomplete not working

**Solution**:
1. Check `tsconfig.json` has the paths configured
2. Ensure `baseUrl` is set to `"."`
3. Restart your editor/IDE

---

## 📚 Best Practices

### ✅ DO
- Use aliases for all cross-directory imports
- Keep alias names short and descriptive (`@components`, `@utils`)
- Use `@/` for the app root
- Document custom aliases in this file

### ❌ DON'T
- Mix relative and alias imports in the same file
- Create too many aliases (keep it simple)
- Use aliases for same-directory imports (use relative `./`)
- Forget to update both webpack and TypeScript configs

---

## 🎉 Summary

Path aliases make your code:
- ✅ Easier to read
- ✅ Easier to maintain
- ✅ Easier to refactor
- ✅ More consistent
- ✅ More professional

**Current Status**: ✅ Fully configured and tested!

You can now use `@components/*` instead of relative paths throughout your application!
