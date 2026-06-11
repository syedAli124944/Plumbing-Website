import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight, Play, Wrench } from 'lucide-react';

const HIGHLIGHTS = [
  'Family-owned business with 15+ years serving Houston',
  'All technicians are fully licensed, bonded & insured',
  'Upfront pricing — no hidden fees, ever',
  'Satisfaction guaranteed on every job we complete',
  '5-star rated across Google, Yelp, and BBB',
];

export function AboutMiniSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT: Image / Video */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-[28px] overflow-hidden shadow-overlay aspect-[4/5]">
              <img
                src="/about-team.jpg"
                alt="ProPlumb USA professional team"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

              {/* Play button overlay */}
              <button className="absolute inset-0 flex items-center justify-center group">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="call-ring-pulse pulse-primary relative w-20 h-20 text-white rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl"
                >
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40 group-hover:bg-primary-dark transition-colors">
                    <Play className="w-6 h-6 text-white ml-1 fill-white" />
                  </div>
                </motion.div>
              </button>

              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-heading font-bold text-lg">Watch Our Story</p>
                <p className="text-white/70 text-sm">2 min overview of who we are</p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 glass-dark rounded-2xl p-5 shadow-overlay border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary-light" />
                </div>
                <div>
                  <p className="text-white font-heading font-bold text-xl">15+</p>
                  <p className="text-gray-400 text-xs">Years of Service</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative ring */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border-2 border-primary/20 opacity-50" />
            <div className="absolute -top-3 -left-3 w-20 h-20 rounded-full border border-primary/30 opacity-40" />
          </motion.div>

          {/* RIGHT: Text content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-5">About ProPlumb USA</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight">
              More Than Just{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                A Plumber
              </span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              We're a team of passionate professionals who believe that great plumbing is about trust, transparency, and technical excellence. Since 2009, we've served thousands of families across the Houston metro area with integrity.
            </p>

            {/* Highlights */}
            <ul className="space-y-4 mb-10">
              {HIGHLIGHTS.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-600">{h}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark text-white px-7 py-3.5 rounded-2xl font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.03] transition-all duration-300 group"
              >
                Read More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300 animated-underline"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
