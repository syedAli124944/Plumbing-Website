# ProPlumb USA - Enterprise Plumbing Services Platform

ProPlumb USA is a premium, modern, and highly responsive web platform built for an enterprise plumbing services company. The application features a sleek glassmorphism design, fluid GSAP & Framer Motion animations, and a focus on lead conversion and user experience.

## 🚀 Features

- **Modern Glassmorphism UI**: Beautiful, layered, and translucent design aesthetics.
- **High-Performance Animations**: Powered by GSAP and Framer Motion for smooth, hardware-accelerated transitions, parallax scrolling, and micro-interactions.
- **Mobile-First Responsive Design**: Flawless experience across all devices, featuring a custom mobile accordion navigation menu.
- **Enterprise Services**: Detailed service sections with infinite auto-scroll marquees.
- **Emergency Conversion Components**: Strategically placed "Call Emergency" and "Book a Session" CTAs with glowing, pulsing CSS animations to drive customer engagement.
- **Performance Optimized**: Zero memory leaks, optimized React renders, and high-performance CSS hardware acceleration.
- **Client Testimonials System**: Dynamic user reviews with a local-storage backed submission system.

## 🛠️ Technology Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom global CSS utilities
- **Animations**: GSAP (GreenSock Animation Platform) & Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Project Structure

```
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── layout/       # Headers, Footers, Navigation
│   │   │   │   ├── sections/     # Hero, Services, Testimonials, About
│   │   │   │   └── ui/           # Reusable UI components
│   │   │   ├── data/             # Mock data (Testimonials, Services, etc.)
│   │   │   ├── pages/            # Main route pages
│   │   │   └── styles/           # Global CSS, Tailwind configurations
│   │   ├── public/               # Static assets
│   │   ├── index.html            # Entry HTML
│   │   ├── package.json          # Web dependencies
│   │   ├── vite.config.ts        # Vite build configuration
│   │   └── ...
```

## 🎯 Development History & Milestones

1. **Initial Scaffolding**: Setup of the monorepo structure with Vite and React.
2. **Design System Integration**: Implementation of global CSS variables, Tailwind configurations, and custom animations (`call-ring-pulse`, `glow-orb`, etc.).
3. **Hero & GSAP Integration**: Built the landing Hero section with complex GSAP timelines (Parallax, SVG pipe animations, breathing orbs).
4. **Responsive Navigation Overhaul**: Transitioned the mobile menu from a rigid grid to a fluid, Framer Motion-powered vertical accordion list to accommodate long service names.
5. **Animation Refinement**: Fixed `box-shadow` Z-index clipping issues on buttons. Refactored pulse animations to use pure CSS variables instead of inline styles for maximum browser compatibility.
6. **Codebase Cleanup & Optimization**: Resolved React Hooks purity warnings (`Math.random()` inside renders), removed unused variables, and addressed React lifecycle dependencies.
7. **Production Readiness**: Ensured 100% clean console logs, verified build stability, and cleared zombie Node processes blocking ports.

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Plumbing-Website.git
   ```

2. Install dependencies:
   ```bash
   cd Plumbing-Website
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Design Philosophy

The aesthetic of ProPlumb USA is intentionally designed to break away from the traditional, dated look of contractor websites. By utilizing deep navy blues, vibrant teals (`primary`), and striking oranges (`accent`), combined with glassmorphism overlays and staggered animations, the platform instantly establishes trust, technological competence, and premium service quality.

## 📄 License

This project is proprietary and confidential. All rights reserved.
