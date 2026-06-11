import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export function CTASection() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !ctaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.cta-glow', { scale: 1.2, opacity: 0.6, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 1 });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ctaRef} className="section-padding bg-gradient-to-br from-primary-dark via-primary to-primary-light relative overflow-hidden">
      {/* Glow orbs */}
      <div className="cta-glow absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]" />
      <div className="cta-glow absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
          >
            <Sparkles className="w-7 h-7 text-accent" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-7 tracking-tight"
        >
          Ready to Fix Your Plumbing?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Get a free, no-obligation quote today. Our experts are standing by to help with any plumbing issue — big or small.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-3 bg-white text-primary-dark px-8 py-4 rounded-2xl font-heading font-semibold text-base transition-all duration-300 hover:bg-gray-50 hover:scale-[1.04] active:scale-[0.97] shadow-lg hover:shadow-xl"
          >
            Get Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
          <motion.a
            href="tel:5559117473"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="call-ring-pulse relative inline-flex items-center justify-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-heading font-semibold text-base hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            <Phone className="w-5 h-5 phone-wiggle" />
            <span>Call (555) 911-PIPE</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
