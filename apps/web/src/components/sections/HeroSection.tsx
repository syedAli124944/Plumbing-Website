import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ChevronDown, Zap, Shield, Star, Clock, Award, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Animated word cycler */
const words = ['Trusted', 'Licensed', 'Expert', 'Fast'];
function AnimatedWord() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const idxRef = useRef(0);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    const cycle = () => {
      idxRef.current = (idxRef.current + 1) % words.length;
      gsap.fromTo(
        el,
        { y: 30, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out',
          onComplete: () => { if (el) el.textContent = words[idxRef.current]; },
        }
      );
    };
    const interval = setInterval(cycle, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      ref={wordRef}
      className="bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent inline-block"
    >
      {words[0]}
    </span>
  );
}

/* Animated call button with bubble particles */
function BubbleCallButton() {
  const bubbles = [
    { size: 'w-3 h-3', left: '20%', delay: '0s', color: 'bg-primary-light/40' },
    { size: 'w-2 h-2', left: '40%', delay: '1s', color: 'bg-accent/40' },
    { size: 'w-2.5 h-2.5', left: '60%', delay: '0.5s', color: 'bg-white/30' },
    { size: 'w-1.5 h-1.5', left: '80%', delay: '1.8s', color: 'bg-primary/40' },
    { size: 'w-2 h-2', left: '10%', delay: '1.3s', color: 'bg-accent-light/30' },
  ];
  return (
    <motion.a
      href="tel:5559117473"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="call-ring-pulse relative inline-flex items-center justify-center gap-3 border-2 border-white/25 text-white px-8 py-4 rounded-2xl font-heading font-semibold text-base transition-all duration-300 hover:bg-white/10 hover:border-white/40 overflow-visible group"
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className={`bubble absolute ${b.size} rounded-full ${b.color} -bottom-3`}
          style={{ left: b.left, animationDelay: b.delay }}
        />
      ))}
      <Phone className="w-5 h-5 phone-wiggle shrink-0" />
      <span>Call Now</span>
    </motion.a>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentBg, setCurrentBg] = useState(0);
  const heroBgs = ['/hero_bg_1.png', '/hero_bg_2.png', '/hero_bg_3.png'];

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBgs.length);
    }, 6000);
    return () => clearInterval(bgInterval);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Background crossfade animation handles image opacity
      gsap.fromTo('.hero-bg-img', 
        { scale: 1.05 }, 
        { scale: 1, duration: 8, ease: 'sine.out', clearProps: 'all' }
      );
      // Floating icons
      gsap.to('.float-icon', {
        y: -22, rotation: 10, duration: 3.5, ease: 'sine.inOut',
        yoyo: true, repeat: -1, stagger: 0.9,
      });

      // Animated SVG pipe paths
      gsap.fromTo('.pipe-path',
        { strokeDashoffset: 1200 },
        { strokeDashoffset: 0, duration: 4.5, ease: 'power2.out', stagger: 0.6 }
      );

      // Scroll indicator bounce
      gsap.to('.scroll-indicator', {
        y: 14, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });

      // Parallax on scroll
      gsap.to('.hero-parallax', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Bubble drift across screen
      gsap.to('.hero-bubble', {
        x: 'random(-80, 80)',
        y: 'random(-60, 60)',
        duration: 'random(4, 8)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.7, from: 'random' },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[75vh] flex items-center overflow-hidden bg-navy pt-24 pb-16" id="hero-section">

      {/* ── Background: slider with transition ── */}
      <div className="hero-parallax absolute inset-0 scale-110">
        {heroBgs.map((bg, idx) => (
          <img
            key={bg}
            src={bg}
            alt="Professional plumbing background"
            className={`hero-bg-img absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
              currentBg === idx ? 'opacity-90 z-0' : 'opacity-0 -z-10'
            }`}
          />
        ))}
        {/* Dark overlay — reduced so image shows more */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/60 via-navy/30 to-navy-mid/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60 z-10" />
      </div>

      {/* Animated geometric overlays */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 z-10" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 z-10" />

      {/* ── SVG pipe network ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" viewBox="0 0 1440 900" fill="none">
        <path className="pipe-path" d="M0 400 H400 V200 H800 V600 H1200 V300 H1440" stroke="#14B8A6" strokeWidth="2" strokeDasharray="1200" strokeDashoffset="1200" />
        <path className="pipe-path" d="M0 600 H300 V400 H700 V800 H1100 V500 H1440" stroke="#0D9488" strokeWidth="2" strokeDasharray="1200" strokeDashoffset="1200" />
        <path className="pipe-path" d="M200 0 V300 H600 V700 H1000 V200 H1400 V900" stroke="#5EEAD4" strokeWidth="1.5" strokeDasharray="1200" strokeDashoffset="1200" />
      </svg>

      {/* ── Floating hero bubbles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { w: 60, h: 60, left: '5%', top: '20%', opacity: 0.15 },
          { w: 35, h: 35, left: '85%', top: '15%', opacity: 0.2 },
          { w: 50, h: 50, left: '70%', top: '65%', opacity: 0.12 },
          { w: 25, h: 25, left: '40%', top: '80%', opacity: 0.18 },
          { w: 45, h: 45, left: '15%', top: '70%', opacity: 0.1 },
          { w: 20, h: 20, left: '55%', top: '10%', opacity: 0.22 },
          { w: 30, h: 30, left: '90%', top: '40%', opacity: 0.14 },
          { w: 55, h: 55, left: '25%', top: '35%', opacity: 0.08 },
        ].map((b, i) => (
          <div
            key={i}
            className="hero-bubble absolute rounded-full border border-primary-light/30"
            style={{
              width: b.w, height: b.h,
              left: b.left, top: b.top,
              opacity: b.opacity,
              background: `radial-gradient(circle at 30% 30%, rgba(20,184,166,0.4), rgba(13,148,136,0.05))`,
            }}
          />
        ))}
      </div>

      {/* ── Floating icons ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="float-icon absolute top-[18%] right-[12%] w-16 h-16 rounded-2xl bg-primary/12 flex items-center justify-center border border-primary/20 backdrop-blur-sm">
          <Shield className="w-7 h-7 text-primary-light opacity-70" />
        </div>
        <div className="float-icon absolute top-[42%] left-[8%] w-12 h-12 rounded-xl bg-accent/12 flex items-center justify-center border border-accent/20 backdrop-blur-sm">
          <Award className="w-5 h-5 text-accent opacity-70" />
        </div>
        <div className="float-icon absolute bottom-[28%] right-[22%] w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/15 backdrop-blur-sm">
          <Star className="w-6 h-6 text-primary opacity-60" />
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container-custom relative z-10 pt-32 pb-40">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-accent/12 border border-accent/25 text-accent text-sm font-semibold mb-8 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4" />
            24/7 Emergency Service — 60 Min Response
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-[1.08] mb-7 tracking-tight"
          >
            <AnimatedWord />{' '}
            <span className="block">Plumbing Services</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl text-white/80 mt-2">You Can Count On</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-300 max-w-xl mb-12 leading-relaxed"
          >
            Licensed & insured technicians delivering expert plumbing solutions across the USA. From emergency repairs to full installations — we've got you covered.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-14"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-heading font-semibold text-base transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 group"
            >
              Book a Session
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <BubbleCallButton />
          </motion.div>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-gray-400"
          >
            {[
              { icon: Shield, text: 'Licensed & Insured' },
              { icon: Star, text: '5-Star Rated' },
              { icon: Clock, text: '60-Min Response' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-primary-light" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { value: '5,000+', label: 'Jobs Completed' },
            { value: '15', label: 'Years Experience' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '24/7', label: 'Always Available' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="glass rounded-2xl p-5 md:p-7 text-center group cursor-default"
            >
              <p className="text-2xl md:text-3xl font-heading font-bold text-white group-hover:text-primary-light transition-colors">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>
    </section>
  );
}
