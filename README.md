# FoodHub

> A modern, elegant web platform for food ordering and delivery management.

FoodHub is a comprehensive web application built with Next.js that connects users with food providers. It features a complete ecosystem with distinct experiences for customers, food providers, and administrators, all wrapped in a premium, highly responsive user interface with full dark mode support.

## 🔗 Live URLs

- **Live Application**: [https://foodhub-client-nu.vercel.app]
- **Live Backend**: [https://foodhub-server-gilt.vercel.app]

- **Frontend Repository**: [https://github.com/mdrifatul/Food_Hub_Client]
- **Backend Repository**: [https://github.com/mdrifatul/Food_Hub_Server]

## ✨ Features

- **Multi-Role Authentication**: Secure login and registration with distinct roles for Users, Providers, and Admins via Better Auth.
- **Dynamic Dashboards**: Dedicated routing and personalized dashboards for different user types.
- **Provider Management**: Food providers can manage their meal offerings and track incoming orders.
- **Admin Controls**: Comprehensive admin interface to manage categories, monitor users, and oversee platform activity.
- **Seamless Ordering**: Intuitive cart and checkout process for users to browse and order meals.
- **Premium UI/UX**:
  - Fluid animations powered by Framer Motion.
  - Consistent design system using Shadcn UI principles and Radix Primitives.
  - Seamless Light/Dark theme switching.
- **Performance Optimized**: Built on Next.js 16 App Router and React 19 for maximum performance and SEO.

## 🛠️ Technologies Used

### Core

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

### Styling & UI

- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Form Handling & Validation

- **Forms:** [@tanstack/react-form](https://tanstack.com/form/latest)
- **Validation:** [Zod](https://zod.dev/)

### Authentication

- **Auth:** [Better Auth](https://better-auth.com/)

## 🚀 Setup Instructions

Follow these simple steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- `pnpm` (recommended), `npm`, or `yarn`

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/foodhub_client.git
cd foodhub_client
```

### 2. Install dependencies

Using `pnpm` (recommended as per project lockfile):

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and copy the contents from `.env.example`.

```bash
cp .env.example .env
```

Update the environment variables in the `.env` file with your actual configuration details (like backend API URLs and Authentication secrets).

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
