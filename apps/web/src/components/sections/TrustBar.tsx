import { motion } from 'framer-motion';
import { Shield, Award, Clock, CheckCircle } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: Award, label: 'BBB A+ Rated' },
  { icon: CheckCircle, label: 'EPA Certified' },
  { icon: Clock, label: '15+ Years Experience' },
];

export function TrustBar() {
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="container-custom py-8 md:py-10">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 lg:gap-20">
          {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                <Icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-gray-700">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
