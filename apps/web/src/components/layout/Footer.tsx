import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplets, Phone, Mail, MapPin,
  Facebook, Twitter, Instagram, Linkedin,
  ArrowUpRight, Heart, Clock, Shield, Star, Zap
} from 'lucide-react';

const FOOTER_LINKS = {
  services: [
    { label: 'Emergency Plumbing', href: '/services/emergency-plumbing' },
    { label: 'Drain Cleaning', href: '/services/drain-cleaning' },
    { label: 'Water Heater Repair', href: '/services/water-heater-repair' },
    { label: 'Leak Detection', href: '/services/leak-detection' },
    { label: 'Sewer Line Repair', href: '/services/sewer-line-repair' },
    { label: 'Pipe Replacement', href: '/services/pipe-replacement' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Blog', href: '/blog' },
    { label: 'Service Areas', href: '/service-areas' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
};

const TRUST_BADGES = [
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: Star, label: '5-Star Rated' },
  { icon: Zap, label: '24/7 Emergency' },
];

export function Footer() {
  return (
    <footer className="relative text-gray-300 overflow-hidden">
      {/* Background image with low opacity */}
      <div className="absolute inset-0">
        <img
          src="/footer-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.07]"
        />
        <div className="absolute inset-0 bg-navy" style={{ opacity: 0.97 }} />
      </div>

      {/* Top accent line */}
      <div className="relative z-10">
        <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-accent" />
      </div>

      {/* Trust badges strip */}
      <div className="relative z-10 border-b border-white/6 bg-white/2">
        <div className="container-custom py-5">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-6">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center border border-primary/20">
                  <Icon className="w-4 h-4 text-primary-light" />
                </div>
                <span className="text-gray-400 font-medium">{label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(n => (
                  <Star key={n} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-gray-400">4.9/5 · 2,400+ reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-custom pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <Droplets className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold text-white font-heading tracking-tight">ProPlumb</span>
                <span className="text-xl font-bold text-primary-light font-heading"> USA</span>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Professional plumbing services you can trust. Licensed, insured, and available 24/7 for all your needs across the Houston metro area.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary/25 flex items-center justify-center transition-colors duration-300 border border-white/6 hover:border-primary/30"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-white font-heading font-semibold text-base mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
              Our Services
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group text-sm text-gray-400 hover:text-primary-light transition-all duration-300 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-primary-light transition-colors" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-white font-heading font-semibold text-base mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
              Company
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group text-sm text-gray-400 hover:text-primary-light transition-all duration-300 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-primary-light transition-colors" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-white font-heading font-semibold text-base mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
              Contact Us
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center shrink-0 border border-accent/15">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">24/7 Emergency Line</p>
                  <a href="tel:5559117473" className="text-white font-semibold hover:text-accent transition-colors text-sm">
                    (555) 911-PIPE
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/12 flex items-center justify-center shrink-0 border border-primary/15">
                  <Mail className="w-4 h-4 text-primary-light" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <a href="mailto:info@proplumb.com" className="text-sm text-gray-300 hover:text-primary-light transition-colors">
                    info@proplumb.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/12 flex items-center justify-center shrink-0 border border-primary/15">
                  <MapPin className="w-4 h-4 text-primary-light" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Address</p>
                  <p className="text-sm text-gray-300 leading-relaxed">1234 Pipeline Ave, Suite 100<br />Houston, TX 77001</p>
                </div>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-6 p-5 rounded-2xl bg-white/4 border border-white/7">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary-light" />
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Business Hours</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Mon – Fri</span>
                  <span className="text-white font-medium">7AM – 8PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-white font-medium">8AM – 6PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Emergency</span>
                  <span className="text-accent font-semibold">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/7 relative z-10">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center py-6 gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} ProPlumb USA. Crafted with{' '}
            <Heart className="w-3.5 h-3.5 text-red fill-red" /> in Houston, TX
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
