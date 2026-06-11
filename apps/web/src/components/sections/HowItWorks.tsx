import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, ClipboardList, Wrench, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { icon: Phone, step: '01', title: 'Call or Book Online', description: 'Contact us 24/7 via phone, form, or online booking. We respond within minutes to get your service scheduled.' },
  { icon: ClipboardList, step: '02', title: 'Get a Free Estimate', description: 'Our technician assesses the issue on-site and provides a transparent, upfront quote — no hidden fees, guaranteed.' },
  { icon: Wrench, step: '03', title: 'We Fix It Right', description: 'Expert repair with quality parts, backed by our satisfaction guarantee and comprehensive warranty on every job.' },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.step-card', { y: 40, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.steps-grid', start: 'top 80%' },
      });
      gsap.fromTo('.connect-line', { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.steps-grid', start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-white" ref={sectionRef}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-5"
          >
            Simple Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Getting your plumbing fixed is simple. Three easy steps to a worry-free home.
          </motion.p>
        </div>

        {/* Steps — generous spacing */}
        <div className="steps-grid grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 relative">
          {/* Connecting lines */}
          <div className="connect-line hidden md:block absolute top-[72px] left-[22%] right-[22%] h-[3px] bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-full origin-left" />

          {STEPS.map(({ icon: Icon, step, title, description }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="step-card flex flex-col items-center text-center relative group"
            >
              {/* Step number watermark */}
              <span className="text-[80px] font-heading font-extrabold text-gray-100/70 absolute -top-6 select-none group-hover:text-primary/10 transition-colors duration-500">{step}</span>

              {/* Icon circle */}
              <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-8 relative z-10 shadow-xl shadow-primary/20 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/30 transition-all duration-500">
                <Icon className="w-10 h-10 text-white" />
              </div>

              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4 relative z-10 group-hover:text-primary transition-colors duration-300">{title}</h3>
              <p className="text-gray-500 text-[15px] max-w-xs leading-relaxed">{description}</p>

              {/* Arrow for non-last items */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex absolute -right-5 top-[72px] z-20">
                  <ArrowRight className="w-6 h-6 text-primary/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
