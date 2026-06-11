import { useEffect, useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  bgImage?: string;
  badge?: ReactNode;
  accentColor?: string; // tailwind class like 'from-primary to-primary-dark'
}

function MiniFloatingBubble({ size, x, y, delay }: { size: number; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none border border-primary-light/20"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: 'radial-gradient(circle at 30% 30%, rgba(20,184,166,0.35), rgba(13,148,136,0.05))',
      }}
      animate={{
        y: [0, -25, 0],
        x: [0, 12, 0],
        scale: [1, 1.12, 1],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

const BUBBLES = [
  { size: 60, x: '5%', y: '15%', delay: 0 },
  { size: 30, x: '88%', y: '20%', delay: 0.8 },
  { size: 45, x: '75%', y: '60%', delay: 1.5 },
  { size: 20, x: '35%', y: '75%', delay: 0.4 },
  { size: 35, x: '15%', y: '65%', delay: 2.1 },
  { size: 18, x: '60%', y: '10%', delay: 1.0 },
  { size: 50, x: '92%', y: '45%', delay: 0.6 },
];

export function PageHeroBanner({ title, subtitle, breadcrumbs, bgImage, badge, accentColor = 'from-primary to-primary-light' }: PageHeroBannerProps) {
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Pipe SVG draw
      gsap.fromTo('.hero-pipe-path',
        { strokeDashoffset: 800 },
        { strokeDashoffset: 0, duration: 3, ease: 'power2.out', stagger: 0.4 }
      );
      // Orb breathe
      gsap.to('.hero-orb', {
        scale: 1.25, opacity: 0.5, duration: 5, ease: 'sine.inOut',
        yoyo: true, repeat: -1, stagger: 1.8,
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="relative bg-navy overflow-hidden pt-32 pb-24">
      {/* Background image if provided */}
      {bgImage && (
        <div className="absolute inset-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/88 via-navy/70 to-navy-mid/80" />
        </div>
      )}

      {/* SVG pipes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" viewBox="0 0 1200 400" fill="none">
        <path className="hero-pipe-path" d="M0 200 H300 V100 H600 V300 H900 V150 H1200" stroke="#14B8A6" strokeWidth="2" strokeDasharray="800" strokeDashoffset="800" />
        <path className="hero-pipe-path" d="M0 300 H200 V200 H500 V350 H800 V250 H1200" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="800" strokeDashoffset="800" />
      </svg>

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-orb absolute top-[-10%] right-[15%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="hero-orb absolute bottom-[-10%] left-[10%] w-[300px] h-[300px] rounded-full bg-accent/8 blur-[80px]" />
      </div>

      {/* Floating bubbles */}
      {BUBBLES.map((b, i) => (
        <MiniFloatingBubble key={i} {...b} />
      ))}

      {/* Content */}
      <div className="container-custom relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 text-sm text-gray-400 mb-8 flex-wrap"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                {crumb.href
                  ? <Link to={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                  : <span className="text-white">{crumb.label}</span>
                }
              </span>
            ))}
          </motion.nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            {badge}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight mb-5"
        >
          <span className={`bg-gradient-to-r ${accentColor} bg-clip-text text-transparent`}>
            {title}
          </span>
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="text-gray-300 text-lg max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Gradient divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-8 h-1 w-24 rounded-full bg-gradient-to-r ${accentColor} origin-left`}
        />
      </div>
    </section>
  );
}
