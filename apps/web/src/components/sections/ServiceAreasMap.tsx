import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

const SERVICE_AREAS = [
  { city: 'Houston', state: 'TX', distance: 'HQ', highlight: true },
  { city: 'Sugar Land', state: 'TX', distance: '25 mi' },
  { city: 'Pearland', state: 'TX', distance: '18 mi' },
  { city: 'The Woodlands', state: 'TX', distance: '30 mi' },
  { city: 'Katy', state: 'TX', distance: '28 mi' },
  { city: 'Pasadena', state: 'TX', distance: '15 mi' },
  { city: 'League City', state: 'TX', distance: '27 mi' },
  { city: 'Missouri City', state: 'TX', distance: '20 mi' },
  { city: 'Friendswood', state: 'TX', distance: '22 mi' },
  { city: 'Baytown', state: 'TX', distance: '26 mi' },
  { city: 'Conroe', state: 'TX', distance: '40 mi' },
  { city: 'Humble', state: 'TX', distance: '22 mi' },
];

export function ServiceAreasMap() {
  const handleGetDirections = () => {
    window.open('https://maps.google.com/?q=1234+Pipeline+Avenue+Houston+TX+77001', '_blank');
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        window.open(
          `https://www.google.com/maps/dir/${latitude},${longitude}/1234+Pipeline+Avenue+Houston+TX+77001`,
          '_blank'
        );
      });
    }
  };

  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-light font-semibold text-sm tracking-[0.2em] uppercase mb-5"
          >
            Where We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6"
          >
            Service Areas &{' '}
            <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">Locations</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            We proudly serve Houston and all surrounding communities within 40 miles. Use the map below to get directions or share your location.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* LEFT: Service areas list */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="glass-dark rounded-3xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-primary-light" />
                <h3 className="text-white font-heading font-semibold text-lg">Cities We Serve</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_AREAS.map((area, i) => (
                  <motion.div
                    key={area.city}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center justify-between p-3 rounded-xl transition-colors duration-200 ${
                      area.highlight
                        ? 'bg-primary/20 border border-primary/30'
                        : 'bg-white/4 hover:bg-white/8 border border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${area.highlight ? 'bg-primary-light' : 'bg-gray-600'}`} />
                      <span className={`text-sm font-medium ${area.highlight ? 'text-primary-light' : 'text-gray-300'}`}>
                        {area.city}
                        {area.highlight && <span className="ml-1 text-xs text-primary-light/70">(HQ)</span>}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{area.distance}</span>
                  </motion.div>
                ))}
              </div>

              {/* Contact card */}
              <div className="mt-6 p-5 rounded-2xl bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary-light" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Call for your area:</p>
                    <a href="tel:5559117473" className="text-white font-bold hover:text-primary-light transition-colors">
                      (555) 911-PIPE
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Available</p>
                    <p className="text-white font-semibold">24/7 Emergency Response</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-overlay">
              {/* Google Maps embed */}
              <iframe
                title="ProPlumb USA Service Area Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d222483.8099040278!2d-95.77516!3d29.7604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />

              {/* Map action overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent p-5">
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleShareLocation}
                    className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors shadow-lg"
                  >
                    <Navigation className="w-4 h-4" />
                    Share My Location
                  </button>
                  <button
                    onClick={handleGetDirections}
                    className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/25 transition-colors border border-white/20"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Stats below map */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { label: 'Cities Served', value: '40+' },
                { label: 'Mile Radius', value: '40' },
                { label: 'Response Time', value: '<60 min' },
              ].map((s) => (
                <div key={s.label} className="glass-dark rounded-2xl p-4 text-center border border-white/8">
                  <p className="text-2xl font-heading font-bold text-primary-light">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
