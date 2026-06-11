import { motion } from 'framer-motion';
import { MapPin, Globe } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHeroBanner } from '@/components/layout/PageHeroBanner';
import { popIn } from '@/components/layout/PageTransition';

const AREAS = [
  { city: 'Houston', state: 'TX', zips: ['77001', '77002', '77003', '77004', '77005'] },
  { city: 'Dallas', state: 'TX', zips: ['75201', '75202', '75203', '75204', '75205'] },
  { city: 'Austin', state: 'TX', zips: ['73301', '73344', '78701', '78702', '78703'] },
  { city: 'San Antonio', state: 'TX', zips: ['78201', '78202', '78203', '78204', '78205'] },
  { city: 'Phoenix', state: 'AZ', zips: ['85001', '85002', '85003', '85004', '85005'] },
  { city: 'Los Angeles', state: 'CA', zips: ['90001', '90002', '90003', '90004', '90005'] },
  { city: 'Miami', state: 'FL', zips: ['33101', '33102', '33125', '33126', '33127'] },
  { city: 'Atlanta', state: 'GA', zips: ['30301', '30302', '30303', '30304', '30305'] },
  { city: 'Denver', state: 'CO', zips: ['80201', '80202', '80203', '80204', '80205'] },
  { city: 'Chicago', state: 'IL', zips: ['60601', '60602', '60603', '60604', '60605'] },
  { city: 'Seattle', state: 'WA', zips: ['98101', '98102', '98103', '98104', '98105'] },
  { city: 'New York', state: 'NY', zips: ['10001', '10002', '10003', '10004', '10005'] },
];

export default function ServiceAreasPage() {
  return (
    <>
      <SEO title="Service Areas" description="ProPlumb USA serves major metropolitan areas across the United States. Find plumbing services near you." canonical="/service-areas" />

      <PageHeroBanner
        title="Service Areas"
        subtitle="Serving 12+ major metro areas across the United States with expert licensed plumbers ready to help 24/7."
        breadcrumbs={[{ label: 'Service Areas' }]}
        bgImage="/images/areas_hero.png"
        badge={
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/25 text-primary-light text-sm font-semibold">
            <Globe className="w-3.5 h-3.5" />
            12 Major Cities Covered
          </span>
        }
        accentColor="from-primary to-primary-light"
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {AREAS.map((area, i) => (
              <motion.div
                key={area.city}
                custom={i % 4}
                variants={popIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 cursor-default group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900">{area.city}</h3>
                    <p className="text-xs text-gray-400">{area.state}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {area.zips.map((zip) => (
                    <span key={zip} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">{zip}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
