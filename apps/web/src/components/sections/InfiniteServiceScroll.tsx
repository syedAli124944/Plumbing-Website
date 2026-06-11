import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Droplets, Droplet, Flame, Construction, Search, PlusCircle, Building } from 'lucide-react';

const SERVICES = [
  { icon: Droplet, name: 'Emergency Repairs', slug: 'emergency-plumbing', description: 'Available 24/7 for immediate pipe bursts, severe leaks, and flooding.', color: 'from-accent to-accent-dark', bg: 'bg-accent/10', border: 'border-accent/20', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600&auto=format&fit=crop' },
  { icon: Droplets, name: 'Drain Cleaning', slug: 'drain-cleaning', description: 'Advanced hydro-jetting and snaking to clear stubborn clogs instantly.', color: 'from-blue to-blue-dark', bg: 'bg-blue/10', border: 'border-blue/20', image: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=600&auto=format&fit=crop' },
  { icon: Flame, name: 'Water Heaters', slug: 'water-heater-repair', description: 'Installation and repair of traditional and tankless water heating systems.', color: 'from-primary to-primary-light', bg: 'bg-primary/10', border: 'border-primary/20', image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=600&auto=format&fit=crop' },
  { icon: Search, name: 'Leak Detection', slug: 'leak-detection', description: 'Non-invasive acoustic and thermal imaging to find hidden leaks fast.', color: 'from-purple-500 to-purple-700', bg: 'bg-purple-500/10', border: 'border-purple-500/20', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop' },
  { icon: Construction, name: 'Sewer Lines', slug: 'sewer-line-repair', description: 'Trenchless sewer repair and camera inspections to minimize yard damage.', color: 'from-amber-500 to-amber-700', bg: 'bg-amber-500/10', border: 'border-amber-500/20', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop' },
  { icon: Wrench, name: 'Pipe Replacement', slug: 'pipe-replacement', description: 'Whole-house repiping with durable PEX and copper materials.', color: 'from-emerald-500 to-emerald-700', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', image: 'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?q=80&w=600&auto=format&fit=crop' },
  { icon: PlusCircle, name: 'Toilet Repair', slug: 'toilet-repair', description: 'Fixing running toilets, clogs, and installing high-efficiency models.', color: 'from-cyan-500 to-cyan-700', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop' },
  { icon: Building, name: 'Commercial', slug: 'commercial-plumbing', description: 'Commercial solutions for offices, restaurants, and more.', color: 'from-gray-700 to-gray-900', bg: 'bg-gray-100', border: 'border-gray-200', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop' },
];

// Floating bubble above the track
function TrackBubble({ size, left, delay, color }: { size: number; left: string; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left, bottom: '-8px', background: color, border: '1px solid rgba(13,148,136,0.2)' }}
      animate={{ y: [0, -30, 0], opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
      transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function InfiniteServiceScroll() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4">Browse Our Services</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900">
            Everything You Need,{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Done Right</span>
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">Hover over a service card to learn more. Click to view full details.</p>
        </motion.div>
      </div>

      {/* Infinite scrolling track — slow 65s */}
      <div className="relative">
        {/* Bubble row above track */}
        <div className="relative h-6 mb-2 pointer-events-none">
          {[
            { size: 10, left: '5%', delay: 0, color: 'rgba(13,148,136,0.3)' },
            { size: 7, left: '20%', delay: 1.2, color: 'rgba(245,158,11,0.25)' },
            { size: 12, left: '38%', delay: 0.5, color: 'rgba(13,148,136,0.2)' },
            { size: 8, left: '55%', delay: 2.0, color: 'rgba(20,184,166,0.35)' },
            { size: 10, left: '72%', delay: 0.8, color: 'rgba(245,158,11,0.2)' },
            { size: 6, left: '88%', delay: 1.5, color: 'rgba(13,148,136,0.28)' },
          ].map((b, i) => (
            <TrackBubble key={i} {...b} />
          ))}
        </div>

        <div className="overflow-hidden w-full">
          <motion.div 
            className="flex w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 55, repeat: Infinity }}
          >
            <div className="flex shrink-0 gap-6 pr-6">
            {SERVICES.map(({ icon: Icon, name, slug, description, color, bg, border, image }, i) => (
              <Link
                key={`s1-${slug}-${i}`}
                to={`/services/${slug}`}
                className="relative flex-shrink-0 w-72 rounded-3xl border bg-white overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 ease-out hover:ease-in hover:-translate-y-2 flex flex-col"
                style={{ borderColor: 'rgba(0,0,0,0.06)' }}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${color}`} />
                <div className="h-32 w-full relative overflow-hidden bg-gray-100 shrink-0">
                  <div className="absolute inset-0 bg-gray-900/5 z-10" />
                  <img src={image} alt={name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="px-6 relative shrink-0">
                  <motion.div
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-14 h-14 rounded-2xl bg-white ${bg} border ${border} flex items-center justify-center -mt-7 mb-3 relative z-20 shadow-sm`}
                  >
                    <Icon className="w-6 h-6 text-gray-700" />
                  </motion.div>
                  <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">{name}</h3>
                </div>
                <div className="px-6 pb-6 flex-1 flex flex-col justify-between">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-auto">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
            <div className="flex shrink-0 gap-6 pr-6" aria-hidden="true">
            {SERVICES.map(({ icon: Icon, name, slug, description, color, bg, border, image }, i) => (
              <Link
                key={`s2-${slug}-${i}`}
                to={`/services/${slug}`}
                className="relative flex-shrink-0 w-72 rounded-3xl border bg-white overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 ease-out hover:ease-in hover:-translate-y-2 flex flex-col"
                style={{ borderColor: 'rgba(0,0,0,0.06)' }}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${color}`} />
                <div className="h-32 w-full relative overflow-hidden bg-gray-100 shrink-0">
                  <div className="absolute inset-0 bg-gray-900/5 z-10" />
                  <img src={image} alt={name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="px-6 relative shrink-0">
                  <motion.div
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-14 h-14 rounded-2xl bg-white ${bg} border ${border} flex items-center justify-center -mt-7 mb-3 relative z-20 shadow-sm`}
                  >
                    <Icon className="w-6 h-6 text-gray-700" />
                  </motion.div>
                  <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">{name}</h3>
                </div>
                <div className="px-6 pb-6 flex-1 flex flex-col justify-between">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-auto">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
