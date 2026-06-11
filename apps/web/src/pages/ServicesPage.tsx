import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Siren, Droplets, Flame, Search, Wrench, Construction, PipetteIcon, Building, ArrowRight, Zap } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHeroBanner } from '@/components/layout/PageHeroBanner';
import { fromLeft, fromRight, popIn } from '@/components/layout/PageTransition';

const SERVICES = [
  { icon: Siren, name: 'Emergency Plumbing', slug: 'emergency-plumbing', description: 'Fast 24/7 emergency plumbing response when you need it most. Our certified technicians arrive within 60 minutes.', features: ['60-minute response time', 'Available 24/7/365', 'Licensed emergency technicians'], priceFrom: 149, side: 'left' },
  { icon: Droplets, name: 'Drain Cleaning', slug: 'drain-cleaning', description: 'Professional drain cleaning using state-of-the-art hydro-jetting and camera inspection technology.', features: ['Hydro-jetting technology', 'Camera pipe inspection', 'Preventive maintenance plans'], priceFrom: 99, side: 'right' },
  { icon: Flame, name: 'Water Heater Repair', slug: 'water-heater-repair', description: 'Expert water heater installation, repair, and maintenance for tank and tankless systems.', features: ['Tank & tankless systems', 'Energy-efficient upgrades', 'Same-day service available'], priceFrom: 129, side: 'left' },
  { icon: Search, name: 'Leak Detection', slug: 'leak-detection', description: 'Advanced leak detection using thermal imaging and acoustic technology to find hidden leaks.', features: ['Non-invasive detection', 'Thermal imaging technology', 'Accurate leak location'], priceFrom: 199, side: 'right' },
  { icon: Wrench, name: 'Toilet Repair', slug: 'toilet-repair', description: 'Complete toilet repair and replacement services including running toilets, clogs, and installations.', features: ['Running toilet fixes', 'Clog removal', 'New installations'], priceFrom: 89, side: 'left' },
  { icon: Construction, name: 'Sewer Line Repair', slug: 'sewer-line-repair', description: 'Trenchless sewer line repair and replacement with minimal disruption to your property.', features: ['Trenchless technology', 'Camera diagnostics', 'Full line replacement'], priceFrom: 299, side: 'right' },
  { icon: PipetteIcon, name: 'Pipe Replacement', slug: 'pipe-replacement', description: 'Full pipe replacement and repiping services using durable copper and PEX materials.', features: ['Copper & PEX options', 'Whole-house repiping', 'Warranty included'], priceFrom: 249, side: 'left' },
  { icon: Building, name: 'Commercial Plumbing', slug: 'commercial-plumbing', description: 'Commercial plumbing solutions for offices, restaurants, and industrial facilities.', features: ['Grease trap installation', 'Backflow prevention', 'Scheduled maintenance'], priceFrom: 199, side: 'right' },
];

export default function ServicesPage() {
  return (
    <>
      <SEO title="Our Services" description="Explore our comprehensive range of professional plumbing services including emergency repair, drain cleaning, water heater service, and more." canonical="/services" />

      <PageHeroBanner
        title="Our Services"
        subtitle="Comprehensive plumbing solutions for residential and commercial properties. Expert technicians, transparent pricing, guaranteed results."
        breadcrumbs={[{ label: 'Services' }]}
        bgImage="/images/services_hero.png"
        badge={
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/25 text-accent text-sm font-semibold">
            <Zap className="w-3.5 h-3.5" />8 Premium Services — From $89
          </span>
        }
        accentColor="from-primary-light to-accent"
      />

      {/* Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map(({ icon: Icon, name, slug, description, features, priceFrom, side }, i) => (
              <motion.div
                key={slug}
                custom={i}
                variants={side === 'left' ? fromLeft : fromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <Link
                  to={`/services/${slug}`}
                  className="group flex flex-col h-full bg-white rounded-[20px] p-8 shadow-card hover:shadow-elevated transition-all duration-400 hover:-translate-y-2 border border-gray-100 card-shine"
                >
                  <div className="flex items-start gap-5 mb-5">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy to-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20"
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="font-heading font-bold text-xl text-gray-900 mb-1 group-hover:text-primary transition-colors">{name}</h2>
                      <p className="text-sm text-primary font-semibold">Starting from ${priceFrom}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {features.map((f, fi) => (
                      <motion.li
                        key={f}
                        custom={fi}
                        variants={popIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex items-center gap-2.5 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
