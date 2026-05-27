# SwiftCargo — Premium Logistics & Shipping Platform

A premium, fully responsive logistics and shipping website inspired by enterprise carriers like DHL. Built with modern web technologies, featuring real-time shipment tracking, an interactive booking flow, an admin operations dashboard, and a polished enterprise UI.

## Features

- **Homepage** — Hero with tracking lookup, service highlights, partner marquee, stats, and FAQ accordion
- **Services** — Catalog of shipping solutions (Air Freight, Sea Freight, Road Transport, Express, Rail Freight)
- **Track Shipments** — Real-time interactive tracking timeline with progress visualization
- **Book a Shipment** — Multi-step booking form with customer details, payment simulation, and OTP verification
- **Admin Dashboard** — Operations panel to create shipments, update statuses, manage customers, and edit routes
- **Contact & About** — Professional company pages with forms and team info
- **Cookie Consent** — GDPR-style cookie banner with accept/decline options
- **Dark Mode** — Full light/dark theme toggle with persistent preference
- **SEO Ready** — Meta tags, sitemap.xml, robots.txt, and semantic HTML
- **Fully Responsive** — Optimized from mobile (320px) up to desktop (1440px+)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) |
| Router | [TanStack Router](https://tanstack.com/router) (file-based) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| State / Data | React hooks + localStorage (mock backend) |
| Icons | [Lucide React](https://lucide.dev/) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |
| Forms | React Hook Form + Zod validation |

## Project Structure

```
src/
├── routes/                 # TanStack file-based routes
│   ├── __root.tsx          # Root layout (head, providers)
│   ├── index.tsx           # Homepage
│   ├── services.tsx        # Services catalog
│   ├── track.tsx           # Shipment tracking
│   ├── book.tsx            # Booking flow
│   ├── admin.tsx           # Operations dashboard
│   ├── about.tsx           # About page
│   ├── contact.tsx         # Contact form
│   └── sitemap[.]xml.ts    # Dynamic sitemap route
├── components/
│   ├── site/               # Site-wide components
│   │   ├── Header.tsx      # Sticky nav with mobile menu & dark toggle
│   │   ├── Footer.tsx      # Multi-column footer with links
│   │   ├── CookieBanner.tsx # Cookie consent banner
│   │   └── PageHero.tsx    # Reusable page hero banner
│   └── ui/                 # shadcn/ui components (Button, Card, Dialog, etc.)
├── lib/
│   ├── shipments.ts        # Shipment data model, localStorage CRUD, status flow
│   └── utils.ts            # cn() helper, formatting utilities
├── assets/                 # Generated images (hero, cargo, logo, etc.)
├── styles.css              # Global styles, CSS variables, brand tokens
└── router.tsx              # Router configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/) 1+

### Install Dependencies

```bash
bun install
# or
npm install
```

### Run Development Server

```bash
bun dev
# or
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
bun run build
# or
npm run build
```

### Preview Production Build

```bash
bun run preview
# or
npm run preview
```

## Key Functionalities

### Shipment Tracking
- Enter a tracking ID (e.g., `SC-784512903` or `SC-220088471`) on the home hero or `/track` page
- View a visual timeline of shipment progress from **Processing → Delivered**
- Status updates automatically as the admin advances shipment stages

### Booking Flow (`/book`)
1. **Shipment Details** — Enter sender info, origin, destination, weight, and shipping type
2. **Payment** — Simulated checkout with card UI and OTP verification (code: `123456`)
3. **Confirmation** — Success screen with generated tracking ID

### Admin Dashboard (`/admin`)
- Create new shipments manually with auto-generated tracking IDs
- Update shipment status with timeline location entries
- **Edit origin, destination, and current location** in real-time
- View all customers and shipment statistics
- All data persists via localStorage

### Design System
- **Primary Yellow** — `#FACC15` (signature logistics brand color)
- **Accent Red** — `#EF4444` (highlights, CTAs)
- **Dark Gray** — `#1F2937` (text, dark surfaces)
- **Glassmorphism** — Frosted header and card effects
- **Smooth Animations** — Fade-up transitions, hover lifts, marquee scroll

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari / Chrome (iOS & Android)

## License

MIT

---

Built with ❤️ using [Lovable](https://lovable.dev) and modern open-source tools.
