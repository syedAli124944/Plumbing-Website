import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Zap } from 'lucide-react';

export function EmergencyBanner() {
  return (
    <div className="bg-gradient-to-r from-accent to-accent-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="container-custom py-6 md:py-7 flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20"
          >
            <Zap className="w-5 h-5" />
          </motion.div>
          <div>
            <p className="font-heading font-bold text-base sm:text-lg">Plumbing Emergency? We're Here 24/7!</p>
            <p className="text-white/80 text-xs sm:text-sm mt-0.5">Our technicians arrive within 60 minutes — guaranteed.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <motion.a
            href="tel:5559117473"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="call-ring-pulse pulse-accent relative flex items-center gap-2.5 bg-white text-accent-dark px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/90 transition-all duration-300 shadow-lg"
          >
            <Phone className="w-4 h-4 phone-wiggle" />
            (555) 911-PIPE
          </motion.a>
          <Link
            to="/emergency"
            className="border-2 border-white/40 px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
