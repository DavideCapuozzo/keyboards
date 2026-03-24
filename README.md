# Nimbus Keyboards — Vapor75

A premium mechanical keyboard e-commerce experience built with **Next.js 16**, featuring interactive **3D product visualization**, real-time keycap customization, immersive animations, and **Stripe** checkout — all powered by **Prismic** as a headless CMS.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Architecture Overview](#architecture-overview)
  - [3D Rendering](#3d-rendering)
  - [Slices (Page Sections)](#slices-page-sections)
  - [Components](#components)
  - [API Routes](#api-routes)
  - [E-Commerce Flow](#e-commerce-flow)
- [CMS — Prismic](#cms--prismic)
  - [Content Types](#content-types)
  - [SliceMachine](#slicemachine)
- [Animations](#animations)
- [Sound System](#sound-system)
- [Styling](#styling)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- **Interactive 3D Keyboard** — Fully detailed GLTF model with 95+ individually mapped keycaps, rendered via React Three Fiber with HDR environment lighting and soft shadows.
- **Real-Time Keycap Customization** — Choose from 6 keycap texture sets (Goodwell, Dreamboard, Cherry Navy, Kick, Old School, Candy Keys) with instant 3D preview updates.
- **Mechanical Switch Playground** — Explore 4 switch types (Red, Blue, Brown, Black) with interactive 3D models, click animations with elastic bounce, and authentic per-color sound effects.
- **Stripe Checkout** — End-to-end payment flow: product data fetched from Prismic, Stripe session created server-side, seamless redirect to checkout.
- **Scroll-Driven Animations** — GSAP-powered character stagger text reveals, scroll-triggered fade-ins, background gradient transitions, and infinite marquee ticker.
- **Responsive & Accessible** — Mobile-first design with Tailwind CSS v4, respects `prefers-reduced-motion`, and uses Radix UI for accessible dialog components.
- **Headless CMS** — All content managed through Prismic with SliceMachine for visual editing and type-safe content modeling.

---

## Tech Stack

| Category            | Technology                                                           |
| ------------------- | -------------------------------------------------------------------- |
| **Framework**       | Next.js 16.1.1 (App Router, Server & Client Components)             |
| **UI**              | React 19.2.3                                                        |
| **3D Engine**       | Three.js 0.182 + React Three Fiber 9.5 + Drei 10.7                  |
| **Animations**      | GSAP 3.14 (ScrollTrigger, SplitText) + @gsap/react                  |
| **CMS**             | Prismic (Client 7.21, Next 2.2, React 3.3) + SliceMachine           |
| **Payments**        | Stripe 20.4                                                         |
| **Styling**         | Tailwind CSS 4 + PostCSS                                            |
| **UI Primitives**   | Radix UI (Dialog), react-icons                                      |
| **Language**        | TypeScript 5 (strict mode)                                          |
| **Linting/Format**  | ESLint 9 + Prettier 3.7 + prettier-plugin-tailwindcss               |
| **Dev Tools**       | Leva (3D scene GUI controls)                                        |

---

## Project Structure

```
keyboards/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout (Navbar + Footer)
│   ├── page.tsx                    # Homepage — fetches and renders Prismic slices
│   ├── globals.css                 # Global styles, custom fonts & animations
│   ├── api/
│   │   ├── checkout/[uid]/route.ts # POST — Creates Stripe checkout session
│   │   ├── preview/route.ts        # GET  — Enables Prismic preview mode
│   │   ├── exit-preview/route.ts   # GET  — Exits Prismic preview mode
│   │   └── revalidate/route.ts     # POST — Triggers ISR cache revalidation
│   ├── slice-simulator/page.tsx    # Prismic slice preview sandbox
│   └── success/page.tsx            # Post-checkout success page
│
├── components/                     # Shared React components
│   ├── Keyboard.tsx                # 3D GLTF keyboard (95+ keycap meshes, instanced switches)
│   ├── Keycap.tsx                  # Single 3D keycap (6 texture variants, float animation)
│   ├── Switch.tsx                  # Interactive 3D switch (click anim, sound, elastic bounce)
│   ├── Navbar.tsx                  # Fixed nav with Radix dialog menu + checkout CTA
│   ├── Footer.tsx                  # Site footer with links
│   ├── Bounded.tsx                 # Max-width layout wrapper
│   ├── FadeIn.tsx                  # GSAP scroll-triggered fade-in wrapper
│   ├── Loader.tsx                  # Loading screen with animated keycap SVG
│   ├── Logo.tsx                    # Full SVG logo
│   └── LogoMark.tsx                # Compact SVG logo mark
│
├── slices/                         # Prismic SliceMachine slices
│   ├── Hero/                       # Hero section (3D keyboard, text stagger, scroll gradient)
│   │   ├── index.tsx               # Slice component
│   │   └── Scene.tsx               # R3F canvas with camera tracking
│   ├── ColorChanger/               # Keycap customizer (6 textures, 3D live preview)
│   │   ├── index.tsx
│   │   └── Scene.tsx
│   ├── BentoBox/                   # Feature grid (S/M/L cards with images)
│   ├── Marquee/                    # Infinite scrolling text ticker
│   ├── PurchaseButton/             # CTA with mouse-tracking font variation animation
│   ├── SlicePlayground/            # Interactive switch tester (4 colors, 3D + sound)
│   └── index.ts                    # Dynamic slice component registry
│
├── customtypes/                    # Prismic content type schemas
│   ├── homapage/index.json         # Homepage singleton (SliceZone + SEO)
│   ├── product/index.json          # Product (name, price, image, description)
│   └── switch/index.json           # Switch definition (name, color)
│
├── public/
│   ├── hdr/                        # HDR environment maps for 3D lighting
│   │   ├── blue-studio.hdr
│   │   └── studio-small.hdr
│   └── sounds/                     # Switch click sound effects (12 MP3s)
│       ├── red-{1,2,3}.mp3
│       ├── blue-{1,2,3}.mp3
│       ├── brown-{1,2,3}.mp3
│       └── black-{1,2,3}.mp3
│
├── checkout.ts                     # Client-side checkout helper (POST → Stripe redirect)
├── prismicio.ts                    # Prismic client factory & route resolver
├── prismicio-types.d.ts            # Auto-generated Prismic TypeScript types
├── slicemachine.config.json        # SliceMachine config (repo, adapter, libraries)
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript config (strict mode)
├── postcss.config.mjs              # PostCSS with Tailwind plugin
├── eslint.config.mjs               # ESLint 9 flat config
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** (or yarn/pnpm)
- A **Prismic** repository (see [CMS — Prismic](#cms--prismic))
- A **Stripe** account with API keys

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd keyboards

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running SliceMachine

In a separate terminal, start the SliceMachine UI for visual slice editing:

```bash
npm run slicemachine
```

SliceMachine will be available at [http://localhost:9999](http://localhost:9999).

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...

# Prismic (optional — defaults to "keyboards-nextjs")
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=keyboards-nextjs
```

| Variable                            | Required | Description                                      |
| ----------------------------------- | -------- | ------------------------------------------------ |
| `STRIPE_SECRET_KEY`                 | Yes      | Stripe secret API key for creating checkout sessions |
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT`   | No       | Overrides the Prismic repository name            |

---

## Available Scripts

| Command                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Start Next.js development server               |
| `npm run build`         | Build for production                           |
| `npm start`             | Start production server                        |
| `npm run lint`          | Run ESLint                                     |
| `npm run slicemachine`  | Start Prismic SliceMachine editor              |

---

## Architecture Overview

### 3D Rendering

The 3D experience is built with **React Three Fiber** and **Drei**:

- **Keyboard model** — A complex GLTF with 95+ individually named keycap meshes (`K_A`, `K_ESC`, `K_LCONTROL`, etc.), instanced switch geometry for performance, and multiple material layers (plate, knob, PCB, top case, weight, screen).
- **HDR environments** — Professional studio lighting loaded from `/public/hdr/` for realistic reflections and product-grade rendering.
- **Performance optimizations** — `InstancedMesh` for repeated switch geometry, texture caching with `useTexture`, GLTF preloading with `useGLTF`, and responsive canvas scaling (0.5x on mobile).
- **Camera system** — Mouse-following `PerspectiveCamera` with lerp interpolation in the Hero scene.

### Slices (Page Sections)

Each page section is a **Prismic Slice** — a modular, reorderable content block:

| Slice              | Description                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **Hero**           | Full-viewport section with 3D keyboard, GSAP SplitText character animations, scroll-driven gradient transition (blue → white) |
| **ColorChanger**   | 6-option keycap customizer with real-time 3D preview, bounce animation on selection, and large background text overlay |
| **BentoBox**       | Responsive feature grid with S/M/L card sizes, image backgrounds, and scroll-triggered fade-ins    |
| **Marquee**        | Infinite-scroll text ticker with directional animation and interspersed logo marks                 |
| **PurchaseButton** | CTA button where Roboto Flex font `wdth` and `wght` axes respond to mouse position                |
| **SlicePlayground**| Interactive switch tester: pick a switch color, click to hear real sounds, see 3D model animate     |

### Components

| Component      | Purpose                                                                     |
| -------------- | --------------------------------------------------------------------------- |
| `Keyboard`     | Full 3D keyboard GLTF renderer with texture and elevation props             |
| `Keycap`       | Single 3D keycap with 6 interchangeable texture variants                    |
| `Switch`       | Interactive 3D switch: click to press (stem animation), release with elastic bounce, plays color-specific audio |
| `Navbar`       | Fixed header with logo, link list, Radix Dialog mobile menu, and "Buy Now" CTA |
| `Footer`       | Site footer with navigation links                                           |
| `Bounded`      | Reusable max-width centered container                                       |
| `FadeIn`       | Wraps children with GSAP ScrollTrigger fade + translateY animation          |
| `Loader`       | Full-screen loading overlay with animated keycap SVG, tracks R3F asset progress |

### API Routes

| Endpoint                    | Method | Description                                                              |
| --------------------------- | ------ | ------------------------------------------------------------------------ |
| `/api/checkout/[uid]`       | POST   | Fetches product from Prismic by UID, creates a Stripe Checkout Session (payment mode, USD), returns session URL |
| `/api/preview`              | GET    | Enables Prismic draft preview mode                                       |
| `/api/exit-preview`         | GET    | Exits Prismic preview mode, returns to published content                 |
| `/api/revalidate`           | POST   | Triggers Incremental Static Regeneration, clears cached pages            |

### E-Commerce Flow

```
User clicks "Buy Now"
       │
       ▼
checkout() — POST /api/checkout/vapor75
       │
       ▼
Server fetches product from Prismic (name, price, image, description)
       │
       ▼
Creates Stripe Checkout Session (line items, success/cancel URLs)
       │
       ▼
Returns session URL → browser redirects to Stripe
       │
       ▼
Payment complete → redirect to /success?session_id={id}
```

---

## CMS — Prismic

### Content Types

**Homepage** (`homapage` — singleton)
- **SliceZone**: Hero, BentoBox, ColorChanger, Marquee, PurchaseButton, SlicePlayground
- **SEO tab**: `meta_title`, `meta_description`, `meta_image`

**Product** (repeatable, UID-based)
- `name` — Product name (Text)
- `price` — Price in cents (Number)
- `image` — Product image (Image)
- `description` — Product description (Rich Text)

**Switch** (repeatable)
- `name` — Switch name (Text)
- `color` — Hex color (Color)

### SliceMachine

SliceMachine is configured in `slicemachine.config.json`:

```json
{
  "repositoryName": "keyboards-nextjs",
  "adapter": "@slicemachine/adapter-next",
  "libraries": ["./slices"],
  "localSliceSimulatorURL": "http://localhost:3000/slice-simulator"
}
```

- Run `npm run slicemachine` to open the visual editor at [http://localhost:9999](http://localhost:9999).
- The Slice Simulator is available at `/slice-simulator` for previewing slices in isolation.
- Type definitions are auto-generated in `prismicio-types.d.ts`.

---

## Animations

All animations are powered by **GSAP 3.14** with accessibility in mind:

| Element                   | Animation                                            | Trigger              |
| ------------------------- | ---------------------------------------------------- | -------------------- |
| Hero heading              | SplitText character stagger (fade + Y offset)        | Page load (4.2s)     |
| Hero body text            | Fade in                                              | After heading        |
| Hero background           | Gradient shift from blue to white                    | ScrollTrigger (40%)  |
| BentoBox cards            | Fade in + translateY                                 | Scroll into view     |
| Marquee                   | Infinite horizontal scroll (CSS keyframes)           | Continuous           |
| Switch press              | Stem moves down, container tilts on X axis           | Pointer down         |
| Switch release            | Elastic bounce back (`elastic.out(1, 0.3)`)          | Pointer up           |
| ColorChanger keyboard     | Scale bounce on texture change                       | Selection click      |
| PurchaseButton text       | Roboto Flex width/weight shift                       | Mouse position       |
| Loader keycaps            | Bounce loop                                          | During asset loading |

> All animations respect `prefers-reduced-motion: reduce` — either disabled entirely or set to instant via GSAP `matchMedia` and Tailwind's `motion-safe:` modifier.

---

## Sound System

The switch playground features authentic mechanical keyboard sounds:

- **12 MP3 files** — 3 per switch color (red, blue, brown, black) providing natural variation.
- Sounds are mapped in `Switch.tsx` via a `SOUND_MAP` keyed by hex color.
- On each click, a random variant is selected using `gsap.utils.random()`.
- Volume is normalized to `0.6`.

---

## Styling

- **Tailwind CSS v4** with `@tailwindcss/postcss` plugin.
- **Roboto Flex** — Variable font with axes: `wdth`, `slnt`, `opsz`, `wght`. Used for dynamic typographic effects (e.g., PurchaseButton mouse tracking).
- **Custom utility classes**:
  - `.font-black-slanted` — max weight, slanted, wide
  - `.font-bold-slanted` — semi-bold, slanted, narrow
  - `.blue-gradient-bg` — blue gradient background for Hero
  - `.animate-marquee` — infinite horizontal scroll keyframe
- **Color palette**: Cyan (`#01A7E1`), Orange (`#F0771F`), deep blues (`#0196C9`, `#0474BA`).

---

## Deployment

This project is optimized for **Vercel**:

```bash
# Build
npm run build

# Start production
npm start
```

- Set the required [environment variables](#environment-variables) in your hosting dashboard.
- Prismic webhooks should point to `/api/revalidate` for automatic ISR on content changes.
- Prismic preview should be configured to use `/api/preview` as the preview endpoint.

---

