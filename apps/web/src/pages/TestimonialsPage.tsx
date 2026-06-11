import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHeroBanner } from '@/components/layout/PageHeroBanner';
import { fromLeft, fromRight } from '@/components/layout/PageTransition';
import { getTestimonials, type Testimonial } from '@/data/testimonials';

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getTestimonials);

  useEffect(() => {
    setTestimonials(getTestimonials());
    
    const handleUpdate = () => setTestimonials(getTestimonials());
    window.addEventListener('testimonials_updated', handleUpdate);
    return () => window.removeEventListener('testimonials_updated', handleUpdate);
  }, []);

  return (
    <>
      <SEO title="Customer Testimonials" description="Read what our customers say about ProPlumb USA. 5-star rated plumbing service with hundreds of satisfied customers." canonical="/testimonials" />

      <PageHeroBanner
        title="Customer Testimonials"
        subtitle="Real reviews from real customers — see why thousands trust ProPlumb USA for all their plumbing needs."
        breadcrumbs={[{ label: 'Testimonials' }]}
        bgImage="/images/testimonials_hero.png"
        badge={
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/25 text-accent text-sm font-semibold">
            <Star className="w-3.5 h-3.5 fill-accent" />
            4.9 / 5 — 2,400+ Reviews
          </span>
        }
        accentColor="from-accent to-primary-light"
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={Math.floor(i / 3)}
                variants={i % 2 === 0 ? fromLeft : fromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="break-inside-avoid bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <Quote className="w-8 h-8 text-blue/15 mb-3" />
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.review}"</p>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'text-accent fill-accent' : 'text-gray-200'}`} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-blue-light flex items-center justify-center text-white text-xs font-bold">{getInitials(t.name)}</div>
                  <div>
                    <p className="font-heading font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.service} • {t.source}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
