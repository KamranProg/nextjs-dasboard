# Acme Dashboard

A modern, full-stack invoice management system built with Next.js 15, React 19, and PostgreSQL. This project demonstrates contemporary web development practices including server-side rendering, real-time data streaming, form validation, and secure authentication.

## Features

- **Authentication & Security**: Secure login system with bcrypt password hashing and NextAuth.js
- **Invoice Management**: Full CRUD operations for invoice creation, viewing, editing, and deletion
- **Customer Management**: Browse and manage customer information
- **Advanced Search**: Real-time search functionality with debouncing
- **Pagination**: Efficient data navigation for large datasets
- **Streaming**: Real-time data updates with React Server Components
- **Form Validation**: Type-safe form handling with Zod schema validation
- **Responsive Design**: Mobile-first UI built with TailwindCSS and Heroicons
- **Error Handling**: Comprehensive error boundaries and user-friendly error pages
- **Accessibility**: WCAG-compliant form states and interactive elements

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
└─────────────────────────────────────────────────────────────┘
                              ↑↓
┌─────────────────────────────────────────────────────────────┐
│              Next.js App Router (Server/Client)              │
├─────────────────────────────────────────────────────────────┤
│  ├─ /dashboard/(overview)    - Dashboard overview            │
│  ├─ /dashboard/invoices      - Invoice list & CRUD ops       │
│  ├─ /dashboard/customers     - Customer management           │
│  ├─ /login                   - Authentication                │
│  └─ /api/seed                - Database seeding endpoint     │
└─────────────────────────────────────────────────────────────┘
                              ↑↓
┌─────────────────────────────────────────────────────────────┐
│              Server-Side Logic & Data Access                 │
├─────────────────────────────────────────────────────────────┤
│  ├─ Server Actions           - Form submissions & mutations  │
│  ├─ Data Fetching            - Database queries              │
│  ├─ Authentication           - NextAuth.js integration       │
│  └─ Validation               - Zod schema validation         │
└─────────────────────────────────────────────────────────────┘
                              ↑↓
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
├─────────────────────────────────────────────────────────────┤
│  ├─ Users table              - Authentication data           │
│  ├─ Invoices table           - Invoice records               │
│  └─ Customers table          - Customer information          │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, TailwindCSS, Heroicons |
| **Framework** | Next.js 15 (App Router) |
| **Authentication** | NextAuth.js 5.0.0-beta |
| **Database** | PostgreSQL |
| **Security** | bcrypt, Zod validation |
| **Build Tools** | Turbopack, ESLint |
| **Package Manager** | pnpm |

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm 10+
- PostgreSQL database
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KamranProg/nextjs-dasboard.git
   cd nextjs-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   # Database Connection
   POSTGRES_URL=postgresql://user:password@localhost:5432/acme_db
   
   # NextAuth Configuration
   AUTH_SECRET=your-secret-key-here
   ```

4. **Initialize the database**
   ```bash
   # Seed the database with sample data
   curl http://localhost:3000/api/seed
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

### Available Scripts

```bash
pnpm dev      # Start development server with Turbopack
pnpm build    # Create production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Project Structure

```
nextjs-dashboard/
├── app/
│   ├── dashboard/              # Protected dashboard routes
│   │   ├── (overview)/         # Dashboard overview page
│   │   ├── invoices/           # Invoice management
│   │   │   ├── create/         # Create invoice form
│   │   │   ├── [id]/edit/      # Edit invoice form
│   │   │   └── page.tsx        # Invoice list
│   │   ├── customers/          # Customer list
│   │   └── layout.tsx          # Dashboard layout
│   ├── login/                  # Authentication page
│   ├── api/
│   │   └── seed/              # Database seeding endpoint
│   ├── ui/                     # Reusable UI components
│   │   ├── button.tsx
│   │   ├── login-form.tsx
│   │   ├── search.tsx
│   │   └── ...
│   ├── lib/                    # Utilities and helpers
│   │   ├── data.ts            # Data fetching functions
│   │   ├── placeholder-data.ts # Sample data
│   │   └── utils.ts           # Helper functions
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/                     # Static assets
├── .env.local                 # Environment variables (create this)
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # TailwindCSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Usage

### Logging In

1. Navigate to `http://localhost:3000/login`
2. Use the seeded credentials from the database
3. Access the protected dashboard

### Creating an Invoice

1. Navigate to Dashboard → Invoices
2. Click "Create Invoice"
3. Fill in the form with invoice details
4. Submit to save to the database

### Searching Invoices

Use the search bar on the invoices page to filter by customer name, email, or amount.

### Managing the Database

The project uses PostgreSQL. To reset the database with fresh sample data, call the seed endpoint:
```bash
curl http://localhost:3000/api/seed
```

## Key Technologies Explained

- **Next.js App Router**: Modern file-based routing with server and client components
- **Server Components**: Render on the server for better performance and security
- **Server Actions**: Handle form submissions and mutations securely
- **Streaming**: Real-time data updates without full page reloads
- **Zod**: Runtime type validation for forms and APIs
- **TailwindCSS**: Utility-first CSS framework for rapid UI development

## Development Notes

- Server components are the default; use `'use client'` only when needed for interactivity
- All database queries should use parameterized queries to prevent SQL injection
- Form validation happens both client-side and server-side
- Authentication is required for dashboard routes (enforced by NextAuth.js)

## Troubleshooting

**Port 3000 already in use?**
```bash
pnpm dev -- -p 3001
```

**Database connection issues?**
- Verify PostgreSQL is running
- Check `.env.local` has the correct `POSTGRES_URL`
- Ensure the database exists

**Build fails?**
```bash
rm -rf .next node_modules
pnpm install
pnpm build
```

## Learning Resources

This project follows the [Next.js Learn Course](https://nextjs.org/learn) by Vercel. Refer to the course for detailed explanations of each concept.

## License

This is an educational project following the Next.js Learn Course.

---

**Status**: ✅ Production-ready architecture with full CRUD operations, authentication, and modern best practices.
