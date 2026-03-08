# Dreamhorses

## Architecture

This project is a React application built with Vite and TypeScript, using Tailwind CSS for styling.

### Project Structure

- `src/components/`: Reusable UI components
  - `layout/`: Page layout components (e.g., Navbar, Footer)
  - `ui/`: Basic UI elements (e.g., Button, Input)
- `src/features/`: Feature-specific modules
  - `auth/`: Authentication feature with components, hooks, and schemas
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions
- `src/assets/`: Static assets

The application entry point is `src/main.tsx`, which renders the root `App.tsx` component.

### Full Project Skeleton

```
.
├── README.md
└── dreamhorse-login
    ├── dist
    │   ├── assets
    │   │   ├── index-73a73366.js
    │   │   └── index-96bd40c1.css
    │   └── index.html
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── src
    │   ├── App.tsx
    │   ├── assets
    │   │   └── logo.svg
    │   ├── components
    │   │   ├── layout
    │   │   │   ├── Footer.tsx
    │   │   │   └── Navbar.tsx
    │   │   └── ui
    │   │       ├── Button.tsx
    │   │       ├── Checkbox.tsx
    │   │       ├── FormField.tsx
    │   │       └── Input.tsx
    │   ├── features
    │   │   └── auth
    │   │       ├── LoginPage.tsx
    │   │       ├── components
    │   │       │   ├── LoginForm.tsx
    │   │       │   ├── LoginLinks.tsx
    │   │       │   └── SupportButton.tsx
    │   │       ├── hooks
    │   │       │   └── useLogin.ts
    │   │       └── schemas
    │   │           └── loginSchema.ts
    │   ├── index.css
    │   ├── main.tsx
    │   ├── types
    │   │   └── auth.ts
    │   └── utils
    │       └── validation.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```