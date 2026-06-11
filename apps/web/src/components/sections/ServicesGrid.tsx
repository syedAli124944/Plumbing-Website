import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { easeIn, hover, motion } from 'framer-motion';
import { Siren, Droplets, Flame, Search, Wrench, Construction, PipetteIcon, Building, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: Siren, name: 'Emergency Plumbing', slug: 'emergency-plumbing', description: 'Fast 24/7 emergency response when you need it most.', features: ['60-min response', '24/7/365', 'Licensed techs'], image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop', gradient: 'from-red-500/80 to-rose-700/60', accent: 'bg-red-500/20 text-red-400 border-red-500/30'},

  { icon: Droplets, name: 'Drain Cleaning', slug: 'drain-cleaning', description: 'Professional drain cleaning with hydro-jetting technology.', features: ['Hydro-jetting', 'Camera inspection', 'Preventive plans'], image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop', gradient: 'from-primary/80 to-primary-dark/60', accent: 'bg-primary/20 text-primary-light border-primary/30' },

  { icon: Flame, name: 'Water Heater', slug: 'water-heater-repair', description: 'Expert water heater installation, repair, and maintenance.', features: ['Tank & tankless', 'Energy-efficient', 'Same-day service'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop', gradient: 'from-orange-500/80 to-amber-700/60', accent: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },

  { icon: Search, name: 'Leak Detection', slug: 'leak-detection', description: 'Advanced thermal imaging leak detection technology.', features: ['Non-invasive', 'Thermal imaging', 'Accurate location'], image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop', gradient: 'from-blue-500/80 to-indigo-700/60', accent: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { icon: Wrench, name: 'Toilet Repair', slug: 'toilet-repair', description: 'Complete toilet repair and replacement services.', features: ['Running toilets', 'Clog removal', 'New installations'], image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop', gradient: 'from-primary-dark/80 to-primary/60', accent: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },

  { icon: Construction, name: 'Sewer Line', slug: 'sewer-line-repair', description: 'Trenchless sewer repair with minimal disruption.', features: ['Trenchless tech', 'Camera diagnostics', 'Full replacement'], image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', gradient: 'from-gray-700/80 to-gray-600/60', accent: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  { icon: PipetteIcon, name: 'Pipe Replacement', slug: 'pipe-replacement', description: 'Full pipe replacement with durable materials.', features: ['Copper & PEX', 'Whole-house', 'Warranty included'], image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop', gradient: 'from-primary/80 to-accent/60', accent: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },

  { icon: Building, name: 'Commercial', slug: 'commercial-plumbing', description: 'Commercial solutions for offices and restaurants.', features: ['Grease traps', 'Backflow prevention', 'Scheduled maint.'], image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop', gradient: 'from-navy/90 to-navy-mid/70', accent: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { y: 50, opacity: 0, scale: 0.94 },
  show: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-padding bg-gray-50 mesh-bg" ref={gridRef}>
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-5"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            Our{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Professional Services
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive plumbing solutions for every need. From quick fixes to major installations — we do it all with precision.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map(({ icon: Icon, name, slug, description, features, image, gradient, accent }) => (
            <motion.div key={slug} variants={card}>
              <Link
                to={`/services/${slug}`}
                className="group block rounded-[22px] overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 ease-out hover:ease-in hover:-translate-y-3 bg-white border border-gray-100/80 h-full"
              >
                {/* Image with gradient overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className=" w-full h-full object-cover transition-transform duration-500 ease-out group-hover:ease-in group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-70 group-hover:opacity-0 transition-opacity duration-300 ease-out group-hover:ease-in`} />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 group-hover:scale-110 group-hover:bg-red-700 transition-all duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white/25 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg text-gray-900 mb-2.5 group-hover:text-primary transition-colors duration-300">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">{description}</p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {features.map((f) => (
                      <span key={f} className={`text-xs px-2.5 py-1 rounded-full border font-medium ${accent}`}>
                        {f}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
