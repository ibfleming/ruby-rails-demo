# Quick Reference: Path Aliases

## Configured Aliases

```typescript
@/*           → app/javascript/app/*
@components/* → app/javascript/app/components/*
@packs/*      → app/javascript/packs/*
@bundles/*    → app/javascript/bundles/*
```

## Quick Examples

### Import Components
```typescript
// ❌ Before
import HelloWorld from '../app/components/HelloWorld/HelloWorld'
import Button from '../../components/Button'

// ✅ After
import HelloWorld from '@components/HelloWorld/HelloWorld'
import Button from '@components/Button'
```

### Import from Root
```typescript
// Access app/javascript/app/* with @/
import { helper } from '@/utils/helpers'
import { useAuth } from '@/hooks/useAuth'
import type { User } from '@/types/user'
```

### In Pack Files
```typescript
// app/javascript/packs/my-bundle.ts
import ReactOnRails from 'react-on-rails/client'
import Component from '@components/Component'  // Clean!
```

### In Components
```typescript
// app/javascript/app/components/Dashboard/Dashboard.tsx
import Header from '@components/Header'
import Card from '@components/Card'
import { api } from '@/utils/api'
```

## Setup Complete! 🎉

All aliases are configured in:
- ✅ `config/webpack/commonWebpackConfig.js` (webpack)
- ✅ `tsconfig.json` (TypeScript)
- ✅ Tested and working!

For detailed information, see `PATH_ALIASES_GUIDE.md`
