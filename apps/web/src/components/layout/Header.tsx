import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Phone, Droplets, ChevronDown, Star, Clock, MapPin,
  Home, Wrench, MessageCircle, FileText, Map, Siren, ArrowRight, Zap
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/', icon: Home },
  {
    label: 'Services', href: '/services', icon: Wrench,
    children: [
      { label: 'Emergency Plumbing', href: '/services/emergency-plumbing', icon: Siren },
      { label: 'Drain Cleaning', href: '/services/drain-cleaning', icon: Droplets },
      { label: 'Water Heater Repair', href: '/services/water-heater-repair', icon: Zap },
      { label: 'Leak Detection', href: '/services/leak-detection', icon: MapPin },
      { label: 'Sewer Line Repair', href: '/services/sewer-line-repair', icon: Wrench },
    ]
  },
  { label: 'Testimonials', href: '/testimonials', icon: Star },
  { label: 'Blog', href: '/blog', icon: FileText },
  { label: 'Service Areas', href: '/service-areas', icon: Map },
  { label: 'Contact', href: '/contact', icon: MessageCircle },
];

/* ── Top bar bubbles */
function RatingBubble() {
  const bubblePositions = [
    { left: '10%', delay: 0, size: 6 },
    { left: '30%', delay: 0.8, size: 4 },
    { left: '55%', delay: 1.6, size: 8 },
    { left: '75%', delay: 0.4, size: 5 },
    { left: '90%', delay: 1.2, size: 6 },
  ];
  return (
    <div className="flex items-center gap-2 relative">
      <div className="flex items-center gap-1.5 relative px-4 py-2 rounded-full bg-amber-400/15 border border-amber-400/25 overflow-visible">
        {bubblePositions.map((b, i) => (
          <span
            key={i}
            className="topbar-bubble absolute rounded-full bg-amber-400/20"
            style={{ width: b.size, height: b.size, left: b.left, bottom: '-2px', animationDelay: `${b.delay}s` }}
          />
        ))}
        {[1, 2, 3, 4, 5].map(n => <Star key={n} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
        <span className="text-amber-400 font-bold text-xs ml-1">4.9</span>
        <span className="text-gray-400 text-xs">(2,400+ reviews)</span>
      </div>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const isOpen = time.getHours() >= 7 && time.getHours() < 20;
  return (
    <div className="flex items-center gap-2">
      <Clock className="w-3.5 h-3.5 text-primary-light" />
      <span className="text-gray-300 font-mono tabular-nums text-xs">
        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${isOpen ? 'bg-green/20 text-green' : 'bg-accent/20 text-accent'}`}>
        {isOpen ? '● OPEN' : '◉ 24/7'}
      </span>
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-white text-sm hidden md:block border-b border-white/5">
        <div className="container-custom flex justify-between items-center py-2.5">
          <div className="flex items-center gap-6">
            <a href="tel:5559117473" className="flex items-center gap-2 group">
              <Phone className="w-3.5 h-3.5 text-accent phone-wiggle" />
              <span className="text-gray-400 text-xs">24/7 Emergency:</span>
              <span className="font-bold text-accent hover:text-accent-light transition-colors text-xs">(555) 911-PIPE</span>
            </a>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <div className="live-reverse-pulse text-primary-light flex items-center justify-center">
                <MapPin className="w-3 h-3" />
              </div>
              <span>Houston, TX & Surrounding Areas</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <RatingBubble />
            <LiveClock />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-gray-200/50' : 'bg-white/60 backdrop-blur-xl'}`}>
        <div className="container-custom flex items-center justify-between h-[76px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-11 h-11 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <Droplets className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <span className="text-xl font-bold text-gray-900 font-heading tracking-tight">ProPlumb</span>
              <span className="text-xl font-bold text-primary font-heading"> USA</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 ml-6">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`relative px-3 py-2.5 rounded-xl text-[15px] font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                    location.pathname === link.href
                      ? 'text-primary bg-primary/8'
                      : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  )}
                </Link>
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-68 bg-white/95 backdrop-blur-xl rounded-2xl shadow-elevated border border-gray-100/80 py-3 z-50"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-all duration-200 hover:pl-7 group"
                        >
                          <child.icon className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                          {child.label}
                          <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 lg:gap-6 shrink-0 ml-auto lg:ml-8">
            <motion.a
              href="tel:5559117473"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center bg-gradient-to-r from-accent to-accent-dark text-white p-2.5 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-accent/25 glow-pulse-accent call-ring-pulse pulse-accent relative overflow-visible group"
            >
              {/* Bubble particles */}
              <span className="absolute -top-1 -left-1 w-2 h-2 bg-accent-light rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:-translate-x-2 transition-all duration-700 pointer-events-none" />
              <span className="absolute -top-2 right-4 w-3 h-3 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 group-hover:translate-x-2 transition-all duration-500 delay-100 pointer-events-none" />
              <span className="absolute -bottom-2 left-6 w-2.5 h-2.5 bg-accent/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-4 group-hover:-translate-x-4 transition-all duration-1000 pointer-events-none" />
              
              <Phone className="w-5 h-5 xl:w-4 xl:h-4 phone-wiggle" />
              <span className="hidden xl:inline ml-1.5">Emergency</span>
            </motion.a>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="hidden xl:inline-flex items-center bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20"
              >
                Book Session
              </Link>
            </motion.div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100/80 transition-colors relative z-50"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-6 h-6 text-gray-700" /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-6 h-6 text-gray-700" /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Gallery Menu ── */}
      <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />

              {/* Slide-in panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 flex flex-col shadow-2xl"
              >
                {/* Panel header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-heading font-bold text-gray-900">ProPlumb USA</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Vertical Navigation List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
                      className="w-full"
                    >
                      {link.children ? (
                        <>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                              activeDropdown === link.label
                                ? 'bg-primary/5 text-primary'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <link.icon className={`w-5 h-5 ${activeDropdown === link.label ? 'text-primary' : 'text-primary/60'}`} />
                              <span className="font-semibold text-[15px]">{link.label}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {activeDropdown === link.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pr-2 py-2 space-y-1 border-l-2 border-gray-100 ml-6 mt-1 mb-2">
                                  {link.children.map((child, j) => (
                                    <motion.div
                                      key={child.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: j * 0.05 }}
                                    >
                                      <Link
                                        to={child.href}
                                        className="flex items-center gap-3 p-3 rounded-xl text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-all group"
                                        onClick={() => setMobileOpen(false)}
                                      >
                                        <child.icon className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
                                        {child.label}
                                        <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={link.href}
                          className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                            location.pathname === link.href
                              ? 'bg-primary text-white shadow-lg shadow-primary/30'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          <link.icon className={`w-5 h-5 ${location.pathname === link.href ? 'text-white' : 'text-primary/60'}`} />
                          <span className="font-semibold text-[15px]">{link.label}</span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 border-t border-gray-100 space-y-3 bg-gray-50">
                  <motion.a
                    href="tel:5559117473"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-dark text-white px-5 py-3.5 rounded-xl font-semibold text-sm w-full call-ring-pulse relative overflow-visible"
                  >
                    <Phone className="w-4 h-4 phone-wiggle" />
                    Call Emergency: (555) 911-PIPE
                  </motion.a>
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-3.5 rounded-xl font-semibold text-sm w-full"
                  >
                    Book a Session
                  </Link>

                  {/* Bubble decorations */}
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <RatingBubble />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    </>
  );
}
