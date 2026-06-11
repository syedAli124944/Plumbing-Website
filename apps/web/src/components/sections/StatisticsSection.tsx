import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 5000, suffix: '+', label: 'Jobs Completed' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 35, suffix: '', label: 'Expert Technicians' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        if (prefersReduced) { setCount(value); return; }
        const obj = { val: 0 };
        gsap.to(obj, { val: value, duration: 2.5, ease: 'power1.inOut', onUpdate: () => setCount(Math.round(obj.val)) });
      },
    });

    return () => trigger.kill();
  }, [value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function StatisticsSection() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,148,136,0.1),transparent_70%)]" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Header — generous spacing */}
        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-light font-semibold text-sm tracking-[0.2em] uppercase mb-5"
          >
            Our Impact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6"
          >
            Trusted by Thousands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Our numbers speak for themselves. We deliver results that matter.
          </motion.p>
        </div>

        {/* Stats cards — bigger padding and gap */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {STATS.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center glass rounded-2xl p-7 md:p-10 hover:bg-white/[0.06] transition-all duration-300 group"
            >
              <p className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-3 group-hover:text-primary-light transition-colors">
                <AnimatedCounter value={value} suffix={suffix} />
              </p>
              <p className="text-gray-400 text-sm font-medium tracking-wide">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
