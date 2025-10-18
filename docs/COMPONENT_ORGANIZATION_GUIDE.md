# Component Organization Examples for React on Rails

This document shows various valid ways to organize your React components.

## ✅ All of These Structures Work!

### 1. Original Structure (Current Project Default)
```
app/javascript/
├── packs/                    # Entry points (REQUIRED)
│   └── hello-world-bundle.ts
└── bundles/                  # Components (FLEXIBLE)
    └── HelloWorld/
        └── components/
            ├── HelloWorld.tsx
            └── HelloWorld.module.css
```

**Import in pack:**
```typescript
import HelloWorld from '../bundles/HelloWorld/components/HelloWorld'
```

---

### 2. App/Components Structure (NEW - Implemented)
```
app/javascript/
├── packs/                    # Entry points (REQUIRED)
│   └── hello-world-bundle.ts
└── app/
    └── components/           # Components (FLEXIBLE)
        └── HelloWorld/
            ├── HelloWorld.tsx
            └── HelloWorld.module.css
```

**Import in pack:**
```typescript
import HelloWorld from '../app/components/HelloWorld/HelloWorld'
```

---

### 3. Simple Components Folder
```
app/javascript/
├── packs/                    # Entry points (REQUIRED)
│   └── application.ts
└── components/               # Components (FLEXIBLE)
    ├── HelloWorld.tsx
    ├── UserProfile.tsx
    └── Dashboard.tsx
```

**Import in pack:**
```typescript
import HelloWorld from '../components/HelloWorld'
import UserProfile from '../components/UserProfile'
```

---

### 4. Source Directory Structure
```
app/javascript/
├── packs/                    # Entry points (REQUIRED)
│   └── application.ts
└── src/                      # Components (FLEXIBLE)
    ├── components/
    │   ├── HelloWorld/
    │   └── UserProfile/
    └── utils/
        └── helpers.ts
```

**Import in pack:**
```typescript
import HelloWorld from '../src/components/HelloWorld'
```

---

### 5. Feature-Based Structure
```
app/javascript/
├── packs/                    # Entry points (REQUIRED)
│   ├── auth-bundle.ts
│   └── dashboard-bundle.ts
└── features/                 # Components (FLEXIBLE)
    ├── authentication/
    │   ├── Login.tsx
    │   ├── Signup.tsx
    │   └── ForgotPassword.tsx
    └── dashboard/
        ├── Dashboard.tsx
        ├── Widgets/
        └── Charts/
```

**Import in pack:**
```typescript
import Login from '../features/authentication/Login'
import Dashboard from '../features/dashboard/Dashboard'
```

---

### 6. Domain-Driven Structure
```
app/javascript/
├── packs/                    # Entry points (REQUIRED)
│   └── application.ts
└── domains/                  # Components (FLEXIBLE)
    ├── users/
    │   ├── UserProfile.tsx
    │   └── UserSettings.tsx
    ├── products/
    │   ├── ProductList.tsx
    │   └── ProductDetail.tsx
    └── shared/
        └── Header.tsx
```

**Import in pack:**
```typescript
import UserProfile from '../domains/users/UserProfile'
import ProductList from '../domains/products/ProductList'
```

---

### 7. Flat Structure (Small Projects)
```
app/javascript/
├── packs/                    # Entry points (REQUIRED)
│   └── application.ts
├── HelloWorld.tsx            # Components (FLEXIBLE)
├── UserProfile.tsx
└── Dashboard.tsx
```

**Import in pack:**
```typescript
import HelloWorld from '../HelloWorld'
```

---

## 🎯 Key Rules

### REQUIRED ✅
- **`packs/` directory must exist** (configured in `shakapacker.yml`)
- Entry point files must be in `packs/`
- Components must be registered with `ReactOnRails.register()`

### FLEXIBLE ✨
- **Component organization is completely up to you**
- Choose any folder structure that makes sense
- Change it as your project evolves
- Mix and match patterns

---

## 📋 Choosing the Right Structure

| Structure | Best For | Pros | Cons |
|-----------|----------|------|------|
| **Bundles/** | React on Rails convention | Familiar to RoR users | Extra nesting |
| **App/Components/** | Clarity | Clear separation | More folders |
| **Components/** | Simplicity | Direct, simple | Can get crowded |
| **Src/** | React developers | Familiar to React devs | Extra folder |
| **Features/** | Large apps | Organized by feature | More upfront planning |
| **Domains/** | DDD projects | Matches backend | More complex |
| **Flat** | Small projects | Minimal structure | Doesn't scale |

---

## 💡 Recommendations

### Small Projects (<10 components)
```
app/javascript/
├── packs/
└── components/
    └── ComponentName.tsx
```

### Medium Projects (10-50 components)
```
app/javascript/
├── packs/
└── app/
    └── components/
        └── ComponentName/
            ├── ComponentName.tsx
            └── ComponentName.module.css
```

### Large Projects (50+ components)
```
app/javascript/
├── packs/
└── features/
    └── FeatureName/
        ├── components/
        ├── hooks/
        └── utils/
```

---

## 🔄 Migration Between Structures

You can easily change structure by:
1. Moving component files to new location
2. Updating imports in pack files
3. Testing the build

**Example:**
```typescript
// Before
import Component from '../bundles/Feature/components/Component'

// After
import Component from '../app/components/Feature/Component'
```

That's it! React on Rails doesn't care about the structure, only that the imports resolve correctly.
