# DreamHorse Login

A modern, responsive login page built with React, TypeScript, Next.js, and Tailwind CSS. Features Telegram bot integration for login notifications.

## Features

- Modern UI with Tailwind CSS
- TypeScript for type safety
- Form validation with Zod
- Telegram bot notifications on successful login
- Responsive design
- Accessible components

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
4. Configure your Telegram bot:
   - Create a bot with [@BotFather](https://t.me/botfather)
   - Get your bot token
   - Get your chat ID (you can use [@userinfobot](https://t.me/userinfobot))
   - Update `.env` with your credentials
5. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
app/
├── globals.css
├── layout.tsx
├── page.tsx
└── components/
    ├── layout/
    │   ├── Footer.tsx
    │   └── Navbar.tsx
src/
├── components/
│   ├── ui/              # Reusable UI components
├── features/
│   └── auth/            # Authentication feature
├── services/
├── types/
└── utils/
```
│       ├── components/  # Auth-specific components
│       ├── hooks/       # Auth hooks
│       └── schemas/     # Validation schemas
├── services/            # External service integrations
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```