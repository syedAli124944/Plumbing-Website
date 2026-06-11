import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Phone, Clock, Shield, DollarSign, Wrench, ShieldCheck, AlertCircle } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CTASection } from '@/components/sections/CTASection';

const SERVICES_DATA: Record<string, {
  name: string;
  description: string;
  longDescription: string;
  features: string[];
  process: { step: string; title: string; desc: string }[];
  pricing: { tier: string; price: string; desc: string }[];
  faqs: { q: string; a: string }[];
}> = {
  'emergency-plumbing': {
    name: 'Emergency Plumbing',
    description: '24/7 emergency plumbing services with a 60-minute response guarantee.',
    longDescription: 'When plumbing emergencies strike, every minute counts. Our emergency plumbing team is available around the clock, 365 days a year. We dispatch certified technicians to your location within 60 minutes, equipped with the tools and parts needed to handle any emergency — from burst pipes and severe leaks to overflowing toilets and gas line issues.',
    features: [
      '60-minute guaranteed response time',
      '24/7/365 availability including holidays',
      'Fully stocked service vehicles',
      'Licensed emergency-certified technicians',
      'Upfront pricing — no surprise overtime charges',
      'Comprehensive post-repair inspection'
    ],
    process: [
      { step: '1', title: 'Emergency Call', desc: 'Call our 24/7 hotline. A dispatcher will gather details and send the nearest available technician.' },
      { step: '2', title: 'Rapid Assessment', desc: 'Our technician arrives within 60 minutes, assesses the situation, and provides an immediate upfront quote.' },
      { step: '3', title: 'Expert Repair', desc: 'We fix the issue using professional-grade materials, then inspect the surrounding plumbing to prevent future emergencies.' },
    ],
    pricing: [
      { tier: 'Basic Emergency', price: '$149 - $299', desc: 'Simple fixes: valve replacement, minor leaks, toilet overflows' },
      { tier: 'Standard Emergency', price: '$299 - $699', desc: 'Burst pipes, water heater failure, sewer backup' },
      { tier: 'Complex Emergency', price: '$699+', desc: 'Main line breaks, flooding mitigation, gas line repair' },
    ],
    faqs: [
      { q: 'How fast can you get here?', a: 'We guarantee arrival within 60 minutes of your call in our primary service areas.' },
      { q: 'Do you charge extra for nights and weekends?', a: 'Our emergency rates are transparent. While there is an after-hours dispatch fee, we provide the full quote before any work begins.' },
      { q: 'What should I do while waiting?', a: 'Turn off the main water valve if possible, clear the affected area, and avoid using electricity near standing water.' },
    ],
  },
  'drain-cleaning': {
    name: 'Drain Cleaning & Hydro-Jetting',
    description: 'Professional drain clearing and hydro-jetting to restore perfect flow.',
    longDescription: 'Clogged drains can disrupt your entire household. Our specialists utilize high-definition fiber optic drain cameras to pinpoint clogs, and high-pressure hydro-jetting technology to scour the inside of your pipes. This completely clears out grease, roots, mineral buildup, and debris, returning your drains to like-new condition without using harsh chemicals that damage pipes.',
    features: [
      'High-definition sewer camera inspection',
      'High-pressure hydro-jetting scouring',
      'Environmentally friendly cleaning methods',
      'Safe for all pipe types (cast iron, PVC, clay)',
      'Removes roots, grease, scale, and hair clogs',
      'Preventative maintenance planning'
    ],
    process: [
      { step: '1', title: 'Video Inspection', desc: 'We run a micro-camera through your drains to identify the exact cause and location of the blockage.' },
      { step: '2', title: 'Precision Clearing', desc: 'We use hydro-jetting or motorized augers to safely and completely clear the blockage.' },
      { step: '3', title: 'Flow Testing', desc: 'We verify the entire line is completely clear and run a follow-up camera inspection to guarantee results.' }
    ],
    pricing: [
      { tier: 'Basic Snaking', price: '$99 - $199', desc: 'Single drain clog, kitchen or bathroom sink auger' },
      { tier: 'Main Line Clearing', price: '$199 - $399', desc: 'Main sewer drain snake, cleanout access' },
      { tier: 'Hydro-Jetting', price: '$399 - $699', desc: 'High-pressure water scouring, includes camera inspection' }
    ],
    faqs: [
      { q: 'What is hydro-jetting?', a: 'Hydro-jetting uses high-pressure water (up to 4,000 PSI) to blast away grease, scale, and tree roots from pipes.' },
      { q: 'Are chemical drain cleaners safe?', a: 'No, chemical cleaners generate heat that can warp PVC pipes and corrode older metal lines. We recommend professional mechanical clearing.' },
      { q: 'How often should drains be cleaned?', a: 'We recommend professional cleaning every 1-2 years for preventative maintenance, especially for older homes.' }
    ]
  },
  'water-heater-repair': {
    name: 'Water Heater Services',
    description: 'Expert repair, maintenance, and installation for tank and tankless systems.',
    longDescription: 'From cold showers to leaking tanks, water heater issues require fast, professional attention. We specialize in both traditional tank-style and modern energy-efficient tankless water heaters. Our certified technicians diagnose heating elements, thermostats, anode rods, and gas valves, providing reliable repairs or expert replacement options to restore hot water and optimize energy efficiency.',
    features: [
      'Traditional gas & electric tank repair',
      'High-efficiency tankless water heater installation',
      'Anode rod and flushing maintenance',
      'Thermostat & heating element replacement',
      'Code compliance & safety inspections',
      'Eco-friendly disposal of old units'
    ],
    process: [
      { step: '1', title: 'Diagnostic Test', desc: 'We check electrical connections, gas supply, thermostat calibration, and inspect the tank for integrity.' },
      { step: '2', title: 'Custom Estimate', desc: 'We present options for repair or energy-efficient replacements tailored to your household hot water usage.' },
      { step: '3', title: 'Installation / Repair', desc: 'We perform precision work, calibrate the safety valves, and test hot water temperature at your taps.' }
    ],
    pricing: [
      { tier: 'Maintenance & Flush', price: '$129 - $249', desc: 'Tank flush, anode rod inspection, safety test' },
      { tier: 'Standard Repair', price: '$199 - $499', desc: 'Heating element, thermocouple, thermostat replacement' },
      { tier: 'System Replacement', price: '$1,200 - $3,500+', desc: 'New tank or tankless unit, professional installation & warranty' }
    ],
    faqs: [
      { q: 'How long do water heaters last?', a: 'Tank water heaters typically last 8-12 years, while tankless systems can last 20+ years with proper maintenance.' },
      { q: 'Should I upgrade to tankless?', a: 'Tankless systems save energy, occupy less space, and provide endless hot water, but have higher upfront installation costs.' },
      { q: 'Why is my water heater making noise?', a: 'Popping or rumbling sounds indicate sediment buildup at the bottom of the tank, which requires professional flushing.' }
    ]
  },
  'leak-detection': {
    name: 'Leak Detection & Repair',
    description: 'Non-invasive electronic leak detection and precise water line repairs.',
    longDescription: 'Hidden water leaks can cause catastrophic structural damage, mold growth, and high utility bills. We use state-of-the-art non-invasive diagnostic tools, including acoustic ground microphones, thermal imaging cameras, and tracer gas detectors, to pinpoint leaks behind walls, under concrete slabs, or underground. Once located, we execute clean, target-focused repairs.',
    features: [
      'Non-invasive acoustic leak location',
      'Thermal imaging heat mapping',
      'Slab leak diagnostics and rerouting',
      'Wall and ceiling leak isolation',
      'Water meter test verification',
      'Insurance-ready reporting & documentation'
    ],
    process: [
      { step: '1', title: 'Tech Isolation', desc: 'We perform pressure tests on your water system to isolate which line (hot or cold) is losing pressure.' },
      { step: '2', title: 'Acoustic & Thermal Scan', desc: 'We scan floors, walls, and yards to isolate the leak location to a matter of inches.' },
      { step: '3', title: 'Surgical Repair', desc: 'We perform target-access repairs (or pipe rerouting) to fix the leak with minimal drywall or concrete disruption.' }
    ],
    pricing: [
      { tier: 'Electronic Locate', price: '$199 - $349', desc: 'Acoustic/thermal search, full diagnostic report' },
      { tier: 'Drywall / Pipe Repair', price: '$299 - $599', desc: 'Exposing pipe, clean replacement, pressure test' },
      { tier: 'Slab Leak Repair', price: '$899 - $2,500+', desc: 'Tunneling or slab penetration to repair lines under concrete' }
    ],
    faqs: [
      { q: 'What are signs of a hidden water leak?', a: 'Unexpected water bill spikes, warm spots on concrete floors, damp drywall, or hearing running water when faucets are off.' },
      { q: 'Will my homeowners insurance cover slab leaks?', a: 'Most insurance policies cover the cost of locating the leak and restoring property damage, though pipe repair itself is sometimes separate.' },
      { q: 'What is a slab leak?', a: 'A slab leak is a water pipe leak occurring in the copper or PEX water lines running beneath your home\'s concrete foundation.' }
    ]
  },
  'toilet-repair': {
    name: 'Toilet Repair & Installation',
    description: 'Complete services for running, leaking, clogged, or new high-efficiency toilets.',
    longDescription: 'A broken or running toilet is a major inconvenience and can waste thousands of gallons of water per month. We specialize in fast repairs for all toilet components, including fill valves, flappers, wax rings, and flush levers. We also install modern, water-saving comfort-height and high-efficiency models from leading brands, ensuring a perfect seal and solid installation.',
    features: [
      'Unclogging stubborn sewer line blockages',
      'Wax ring and toilet flange replacement',
      'Fill valve, flapper, and flushometer repair',
      'High-efficiency dual-flush installations',
      'Leaking tank-to-bowl seal repairs',
      'Comfort-height modern toilet upgrades'
    ],
    process: [
      { step: '1', title: 'Leak & Flow Test', desc: 'We inspect the internal tank parts and test the base seal to determine the source of leaks or runs.' },
      { step: '2', title: 'Hardware Upgrade', desc: 'We rebuild the tank hardware or prep the floor flange with a new, heavy-duty wax ring.' },
      { step: '3', title: 'Calibration & Seal', desc: 'We bolt down the fixture, connect water supply lines, and test the flush rate to guarantee no leaks.' }
    ],
    pricing: [
      { tier: 'Minor Toilet Repair', price: '$99 - $179', desc: 'Flapper, fill valve, or lever replacement' },
      { tier: 'Base Reset & Seal', price: '$199 - $299', desc: 'New wax ring, bolts, and floor realignment' },
      { tier: 'Toilet Replacement', price: '$349 - $599', desc: 'Includes standard comfort-height toilet, installation, and removal of old unit' }
    ],
    faqs: [
      { q: 'Why does my toilet keep running?', a: 'This is usually caused by a worn-out flapper valve that is no longer sealing, or an incorrectly adjusted fill valve.' },
      { q: 'How much water can a running toilet waste?', a: 'A constantly running toilet can waste up to 200 gallons of water per day, raising your utility bill significantly.' },
      { q: 'When should I replace my toilet?', a: 'If the porcelain is cracked, if it requires frequent repairs, or if you want to upgrade to a modern water-saving model.' }
    ]
  },
  'sewer-line-repair': {
    name: 'Sewer Line Services',
    description: 'Trenchless sewer line repairs and comprehensive mainline replacements.',
    longDescription: 'Sewer line failures can lead to backup and structural damage. We offer the latest in sewer repair technology, including traditional excavation and trenchless sewer solutions. By utilizing camera inspections, pipe bursting, and epoxy lining, we can repair or replace collapsed, root-invaded, or cracked sewer lines with minimal disruption to your landscape, driveway, or patio.',
    features: [
      'High-tech trenchless pipe lining (CIPP)',
      'Tree root clearing & pipe descaling',
      'Main sewer line structural repairs',
      'Traditional sewer line excavation',
      'Sewer camera line mapping',
      'Post-job pressure safety verification'
    ],
    process: [
      { step: '1', title: 'Sewer Scope', desc: 'We feed a camera down the cleanout to locate and measure the depth of the crack or collapse.' },
      { step: '2', title: 'Strategy Review', desc: 'We review excavation options versus trenchless lining to choose the most cost-effective approach.' },
      { step: '3', title: 'Line Restoration', desc: 'We apply epoxy lining or excavate and install durable schedule-40 PVC lines with a full warranty.' }
    ],
    pricing: [
      { tier: 'Camera Scope & Locate', price: '$149 - $299', desc: 'Full sewer line camera recording and depth mapping' },
      { tier: 'Spot Repair', price: '$899 - $1,800', desc: 'Excavating and replacing a damaged 5-to-10 foot section' },
      { tier: 'Full Line Replacement', price: '$3,000 - $8,000+', desc: 'Epoxy lining or complete trenchless/excavation mainline replacement' }
    ],
    faqs: [
      { q: 'What are symptoms of a damaged sewer line?', a: 'Multiple clogged drains, sewer smells in the yard, soggy lawns, or gurgling sounds from toilets when laundry runs.' },
      { q: 'What is trenchless sewer repair?', a: 'Trenchless repair creates a new pipe inside the old one using an epoxy-saturated sleeve, avoiding the need to dig up your yard.' },
      { q: 'What causes sewer lines to break?', a: 'Tree roots searching for water, shifting soil, ground freezing, and corrosion in older clay or cast iron pipes.' }
    ]
  },
  'pipe-replacement': {
    name: 'Whole-House Repiping',
    description: 'Complete copper or PEX repiping for older homes to eliminate low pressure and leaks.',
    longDescription: 'Older homes with galvanized steel or degraded copper pipes are prone to rusty water, low water pressure, and sudden leaks. We offer comprehensive whole-house repiping using high-grade, flexible PEX piping or premium copper. Our specialized repipe teams replace all water distribution lines with minimal wall cuts, providing clean, fresh water and a lifetime leak-free solution.',
    features: [
      'Galvanized steel pipe removal & replacement',
      'Flexible, freeze-resistant PEX-A installations',
      'Solid copper water line configurations',
      'Pressure balancing and manifold systems',
      'Drywall repair coordination options',
      'Lifetime warranty on repiping materials'
    ],
    process: [
      { step: '1', title: 'System Blueprint', desc: 'We map out the route for the new water lines to run through joists and closets, minimizing wall cuts.' },
      { step: '2', title: 'Water Line Install', desc: 'We pull the new lines, mount brass fittings, and connect them to a central pressure manifold.' },
      { step: '3', title: 'System Flush', desc: 'We flush all lines, test pressure at twice the normal operating rate, and seal all wall openings.' }
    ],
    pricing: [
      { tier: 'Small Home Repiping', price: '$3,500 - $5,500', desc: 'PEX water line repipe for homes under 1,500 sq ft' },
      { tier: 'Medium Home Repiping', price: '$5,500 - $8,500', desc: 'PEX repipe for homes 1,500 - 2,500 sq ft' },
      { tier: 'Large / Copper Repiping', price: '$8,500 - $15,000+', desc: 'Copper water lines or homes over 2,500 sq ft' }
    ],
    faqs: [
      { q: 'PEX vs Copper: which is better?', a: 'PEX is highly flexible, freeze-resistant, has fewer joints, and is more cost-effective. Copper is highly durable and holds value, but is more expensive.' },
      { q: 'How long does a repipe take?', a: 'Most residential repiping jobs take between 3 to 5 days, and we ensure you have water service turned back on every evening.' },
      { q: 'Why is my water pressure low?', a: 'This is a common symptom of corroding galvanized pipes closing up from the inside, restricting water flow.' }
    ]
  },
  'commercial-plumbing': {
    name: 'Commercial Plumbing Solutions',
    description: 'Specialized plumbing solutions for restaurants, retail, offices, and property management.',
    longDescription: 'Commercial plumbing systems face heavy usage and require rapid, professional maintenance to prevent downtime. Our commercial specialists handle high-capacity grease trap cleaning, backflow prevention testing, multi-stall restroom maintenance, commercial boiler systems, and scheduled drain maintenance programs. We work around your hours to minimize disruption to your business.',
    features: [
      'Certified backflow prevention testing & rebuilds',
      'Grease trap cleanouts & interceptor repair',
      'Commercial water heater & boiler services',
      'Multi-fixture commercial restroom upgrades',
      'Scheduled preventative drain maintenance',
      'Emergency response priority status'
    ],
    process: [
      { step: '1', title: 'Business Assessment', desc: 'We evaluate your property layout, usage load, and compliance with local municipal codes.' },
      { step: '2', title: 'Off-Hours Scheduling', desc: 'We schedule repairs, cleanouts, or upgrades during non-operating hours to keep your business running.' },
      { step: '3', title: 'Code Sign-off', desc: 'We execute code-compliant installations and issue test reports for your city records.' }
    ],
    pricing: [
      { tier: 'Backflow Test & Certify', price: '$149 - $299', desc: 'Annual testing and municipal report submission' },
      { tier: 'Restroom Rebuild / Fixture', price: '$299 - $599', desc: 'Sensor flushometer, commercial sink, or toilet repair' },
      { tier: 'Mainline / Grease Trap', price: '$499 - $999+', desc: 'Commercial hydro-jetting or grease interceptor pumping' }
    ],
    faqs: [
      { q: 'Why is backflow testing required annually?', a: 'Most cities require annual testing to ensure your backflow preventer works, keeping sewer water from contaminating the public drinking supply.' },
      { q: 'Do you offer maintenance contracts?', a: 'Yes, we customize commercial maintenance contracts for restaurants, hotels, and office complexes.' },
      { q: 'Are you licensed for commercial boilers?', a: 'Yes, our commercial team is fully certified for gas, steam, and high-capacity electrical heating units.' }
    ]
  }
};

const DEFAULT_SERVICE = {
  name: 'Plumbing Service',
  description: 'Professional plumbing service.',
  longDescription: 'Our expert technicians provide top-quality plumbing services using the latest tools and techniques.',
  features: ['Licensed professionals', 'Quality materials', 'Satisfaction guarantee', 'Transparent pricing'],
  process: [
    { step: '1', title: 'Contact Us', desc: 'Call or book online.' },
    { step: '2', title: 'Assessment', desc: 'We evaluate the issue.' },
    { step: '3', title: 'Repair', desc: 'Expert fix with warranty.' }
  ],
  pricing: [
    { tier: 'Basic Visit', price: '$99 - $149', desc: 'Diagnostic visit and basic assessment' },
    { tier: 'Standard Repair', price: '$149 - $399', desc: 'Common repair services with parts and labor' },
    { tier: 'Premium Service', price: '$399+', desc: 'Complex replacements and major installs' }
  ],
  faqs: [
    { q: 'How do I schedule?', a: 'Call us or use our online booking form.' },
    { q: 'Are you insured?', a: 'Yes, we are 100% licensed, bonded, and insured.' }
  ],
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = (slug && SERVICES_DATA[slug]) || DEFAULT_SERVICE;

  return (
    <>
      <SEO title={service.name} description={service.description} canonical={`/services/${slug}`} />

      {/* Hero with animated background image and gradient overlay */}
      <section className="relative bg-navy pt-36 pb-24 overflow-hidden">
        {/* Background Image with opacity */}
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20 animate-[pulse_6s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/90 to-navy" />
        </div>

        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.name}</span>
          </nav>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30 text-xs font-semibold uppercase tracking-wider mb-5">
              <Wrench className="w-3.5 h-3.5" /> Premium Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 leading-tight tracking-tight">
              {service.name}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview & Features */}
      <section className="section-padding bg-white relative">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left side: narrative */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full" /> Service Overview
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{service.longDescription}</p>
              
              <div className="flex gap-4 p-5 bg-primary/5 border border-primary/10 rounded-2xl mb-8">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">100% Satisfaction Guaranteed</h4>
                  <p className="text-gray-500 text-xs mt-1">If you aren't satisfied with the quality of our service, we'll make it right at no additional cost to you.</p>
                </div>
              </div>
            </div>

            {/* Right side: quick features */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-6">Key Benefits</h3>
              <div className="space-y-4">
                {service.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-gray-700 leading-tight">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Our Service Process</h2>
            <p className="text-gray-500">How we deliver fast, reliable plumbing outcomes on every visit.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 z-0" />
            
            {service.process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center bg-white rounded-3xl p-8 shadow-card border border-gray-100/80 hover:shadow-elevated transition-shadow duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-heading font-bold text-xl mb-6 shadow-md shadow-primary/20">
                  {p.step}
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-3">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Estimates with high-end premium pricing cards */}
      <section className="section-padding bg-white relative">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-4 block">Estimates & Quotes</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Pricing Estimates</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Transparent upfront pricing ranges. Exact quotes are provided onsite after detailed diagnostic assessment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {service.pricing.map((p, i) => {
              const isPopular = i === 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between ${
                    isPopular
                      ? 'bg-gradient-to-br from-navy to-navy-dark text-white shadow-xl shadow-navy/20 scale-105 border-2 border-primary'
                      : 'bg-gray-50 text-gray-900 shadow-card hover:shadow-elevated border border-gray-100'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
                      Most Common
                    </span>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <p className={`text-xs font-bold uppercase tracking-wider ${isPopular ? 'text-primary-light' : 'text-primary'}`}>
                        {p.tier}
                      </p>
                      <div className={`p-2.5 rounded-xl ${isPopular ? 'bg-white/10' : 'bg-primary/5'}`}>
                        <DollarSign className={`w-4 h-4 ${isPopular ? 'text-primary-light' : 'text-primary'}`} />
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-heading font-extrabold mb-4 tracking-tight">
                      {p.price}
                    </h3>

                    <p className={`text-sm mb-6 ${isPopular ? 'text-gray-300' : 'text-gray-500'} leading-relaxed`}>
                      {p.desc}
                    </p>
                  </div>

                  <div className={`border-t ${isPopular ? 'border-white/10' : 'border-gray-200/60'} pt-6 mt-auto`}>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2.5 text-xs">
                        <CheckCircle className={`w-4 h-4 shrink-0 ${isPopular ? 'text-primary-light' : 'text-primary'}`} />
                        <span>Licensed technician onsite diagnostic</span>
                      </li>
                      <li className="flex items-center gap-2.5 text-xs">
                        <CheckCircle className={`w-4 h-4 shrink-0 ${isPopular ? 'text-primary-light' : 'text-primary'}`} />
                        <span>All workmanship 100% warranted</span>
                      </li>
                    </ul>

                    <Link
                      to="/contact"
                      className={`block w-full py-3.5 px-4 rounded-xl text-center text-sm font-bold transition-all duration-300 ${
                        isPopular
                          ? 'bg-gradient-to-r from-primary to-accent hover:from-primary-light hover:to-accent-light text-white shadow-lg shadow-primary/20'
                          : 'bg-white hover:bg-primary hover:text-white text-gray-800 border border-gray-200 hover:border-primary'
                      }`}
                    >
                      Book This Service
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 justify-center mt-12 text-sm text-gray-500">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span>Diagnostics fee is waived if repair work is authorized.</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="section-padding bg-gray-50 border-t border-gray-100">
          <div className="container-custom max-w-3xl">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
