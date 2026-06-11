import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const GALLERY = [
  { id: 1, src: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=600&fit=crop', alt: 'Emergency plumbing repair', span: 'col-span-2 row-span-2' },
  { id: 2, src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop', alt: 'Drain cleaning service' },
  { id: 3, src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop', alt: 'Water heater installation' },
  { id: 4, src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop', alt: 'Pipe replacement' },
  { id: 5, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', alt: 'Toilet repair' },
  { id: 6, src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=300&fit=crop', alt: 'Sewer line work', span: 'col-span-2' },
  { id: 7, src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop', alt: 'Commercial plumbing' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function PhotoGallery() {
  const [selected, setSelected] = useState<null | typeof GALLERY[0]>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4"
          >
            Our Work in Action
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900"
          >
            Photo{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Gallery</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-4 text-lg max-w-xl mx-auto"
          >
            Real projects, real results. See the quality and craftsmanship we bring to every job.
          </motion.p>
        </div>

        {/* Masonry grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {GALLERY.map((photo) => (
            <motion.div
              key={photo.id}
              variants={item}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${photo.span ?? ''}`}
              onClick={() => setSelected(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-all duration-500" />

              {/* Hover content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-3"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </motion.div>
                <p className="text-white text-sm font-medium text-center px-4 font-heading">{photo.alt}</p>
              </div>

              {/* Shine on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/90 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-overlay"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.src.replace('w=400', 'w=1200').replace('w=800', 'w=1200')} alt={selected.alt} className="w-full h-auto max-h-[80vh] object-contain bg-gray-900" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy/80 to-transparent">
                <p className="text-white font-heading font-semibold">{selected.alt}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
