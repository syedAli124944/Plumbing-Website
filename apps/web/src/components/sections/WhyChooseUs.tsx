import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Clock, DollarSign, Headphones, Shield, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: Clock, title: 'Fast Response Time', description: 'Our technicians arrive within 60 minutes for emergency calls. No more waiting around for hours.', accent: 'from-primary to-primary-light' },
  { icon: ThumbsUp, title: 'Satisfaction Guaranteed', description: 'We stand behind our work with a 100% satisfaction guarantee and comprehensive warranties.', accent: 'from-accent to-accent-light' },
  { icon: DollarSign, title: 'Transparent Pricing', description: 'No hidden fees or surprise charges. We provide detailed quotes before starting any work.', accent: 'from-green to-primary-light' },
  { icon: Shield, title: 'Licensed & Insured', description: 'All technicians are fully licensed, bonded, and insured for your complete peace of mind.', accent: 'from-primary-dark to-primary' },
  { icon: Headphones, title: '24/7 Support', description: 'Our customer support team is available around the clock to answer questions and schedule service.', accent: 'from-accent-dark to-accent' },
  { icon: Users, title: 'Expert Technicians', description: 'Over 35 master plumbers with 15+ years of combined experience handling every type of job.', accent: 'from-primary to-accent' },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.why-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-grid', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-gray-50 mesh-bg" ref={sectionRef}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-5"
          >
            Why ProPlumb
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We combine expert craftsmanship with exceptional customer service to deliver plumbing solutions that last.
          </motion.p>
        </div>

        {/* Cards — better gap and padding */}
        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map(({ icon: Icon, title, description, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="why-card group flex gap-5 p-7 md:p-8 rounded-[20px] bg-white shadow-card border border-gray-100/80 hover:shadow-elevated hover:-translate-y-2 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-300 shadow-lg shadow-primary/10`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="pt-1 min-w-0">
                <h3 className="font-heading font-semibold text-gray-900 text-lg mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
