import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  { q: 'What areas do you serve?', a: 'We serve major metro areas across the USA including Houston, Dallas, Austin, Phoenix, Los Angeles, Miami, Atlanta, Denver, Chicago, Seattle, and New York.' },
  { q: 'Do you offer 24/7 emergency service?', a: 'Yes! Our emergency team is available 24/7/365. We guarantee a response within 60 minutes for emergency calls in our service areas.' },
  { q: 'Are your plumbers licensed and insured?', a: 'Absolutely. All plumbers are fully licensed, bonded, and insured with comprehensive liability and workers\' compensation coverage.' },
  { q: 'How much does a typical plumbing service cost?', a: 'Costs vary by job complexity. We provide free estimates upfront with no hidden fees. Basic services start at $99.' },
  { q: 'What is your warranty policy?', a: 'All repairs come with a 1-year workmanship warranty. We also honor manufacturer warranties on all parts and equipment.' },
  { q: 'How quickly can you schedule an appointment?', a: 'Non-emergency services are typically scheduled within 24-48 hours. Emergencies are dispatched immediately.' },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-gray-50 mesh-bg">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-14 md:mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center mb-6">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-7 h-7 text-primary" />
            </motion.div>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-5">FAQ</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">Frequently Asked Questions</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">Got questions? We've got answers.</motion.p>
        </div>

        <div className="space-y-5">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`rounded-2xl overflow-hidden transition-all duration-300 border ${open === i ? 'bg-white shadow-elevated border-primary/20' : 'bg-white/80 shadow-card border-gray-100/80 hover:shadow-elevated'}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-7 py-6 text-left gap-4">
                <span className="flex items-center gap-4">
                  <span className={`text-sm font-bold font-heading ${open === i ? 'text-primary' : 'text-gray-300'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`font-heading font-semibold ${open === i ? 'text-primary' : 'text-gray-900'}`}>{q}</span>
                </span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${open === i ? 'bg-primary/10 rotate-180' : 'bg-gray-100'}`}>
                  <ChevronDown className={`w-4 h-4 ${open === i ? 'text-primary' : 'text-gray-400'}`} />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="px-7 pb-7 pl-[4.5rem]">
                      <p className="text-gray-500 text-[15px] leading-relaxed">{a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
