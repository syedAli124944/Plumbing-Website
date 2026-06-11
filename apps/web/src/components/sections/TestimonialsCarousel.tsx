import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquarePlus, Send, X, User } from 'lucide-react';
import { getTestimonials, addTestimonial, type Testimonial } from '@/data/testimonials';
import { Portal } from '@/components/ui/Portal';

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewService, setReviewService] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [testimonials, setTestimonials] = useState<Testimonial[]>(getTestimonials);
  
  useEffect(() => {
    // Initial load
    setTestimonials(getTestimonials());
    
    // Listen for updates from other components
    const handleUpdate = () => setTestimonials(getTestimonials());
    window.addEventListener('testimonials_updated', handleUpdate);
    return () => window.removeEventListener('testimonials_updated', handleUpdate);
  }, []);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[current];

  if (!t) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTestimonial({
      name: reviewName,
      role: 'Customer',
      review: reviewText,
      rating: reviewRating,
      service: reviewService || 'General Service',
      source: 'Direct'
    });
    
    setSubmitted(true);
    setCurrent(0); // Jump to the newly added review

    setTimeout(() => {
      setSubmitted(false);
      setShowReviewForm(false);
      setReviewName('');
      setReviewText('');
      setReviewRating(5);
      setReviewService('');
    }, 2500);
  };

  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-light font-semibold text-sm tracking-[0.2em] uppercase mb-5"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Real stories from real customers who trust us with their plumbing needs.
          </motion.p>
        </div>

        {/* Testimonial card — centered */}
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-[24px] p-8 md:p-12 lg:p-14 text-center relative"
            >
              {/* Quote icon */}
              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Quote className="w-7 h-7 text-primary-light" />
                </motion.div>
              </div>

              {/* Review text */}
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10 font-medium italic max-w-2xl mx-auto">
                "{t.review}"
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-2 mb-7">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Star className={`w-5 h-5 ${i < t.rating ? 'text-accent fill-accent' : 'text-gray-600'}`} />
                  </motion.div>
                ))}
              </div>

              {/* Author */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2">
                  <User className="w-6 h-6 text-white" />
                </div>
                <p className="font-heading font-semibold text-white text-lg">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role}</p>
                <p className="text-xs text-primary-light mt-1">{t.service} • via {t.source}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls — proper spacing */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button onClick={prev} className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 group hover:scale-110" aria-label="Previous">
              <ChevronLeft className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            </button>
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-2.5 rounded-full transition-all duration-400 ${i === current ? 'bg-primary w-10' : 'bg-gray-600 w-2.5 hover:bg-gray-500'}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 group hover:scale-110" aria-label="Next">
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Add Review button */}
        <div className="flex justify-center mt-14">
          <motion.button
            onClick={() => setShowReviewForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            <MessageSquarePlus className="w-5 h-5" />
            Write a Review
          </motion.button>
        </div>

        {/* Review Form Modal using Portal to avoid transform boundary issues */}
        <Portal>
          <AnimatePresence>
            {showReviewForm && (
              <motion.div key="review-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-navy/80 backdrop-blur-sm" onClick={() => setShowReviewForm(false)}>
                <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-[24px] p-8 md:p-10 w-full max-w-lg shadow-overlay relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setShowReviewForm(false)} className="absolute top-5 right-5 p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                {submitted ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6"
                    >
                      <Star className="w-7 h-7 text-green fill-green" />
                    </motion.div>
                    <h3 className="font-heading font-bold text-2xl text-gray-900 mb-3">Thank You!</h3>
                    <p className="text-gray-500">Your review has been submitted successfully.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading font-bold text-2xl text-gray-900 mb-3">Share Your Experience</h3>
                    <p className="text-gray-500 text-sm mb-8">We'd love to hear about your experience with ProPlumb USA.</p>

                    <form onSubmit={handleSubmitReview} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                        <input type="text" value={reviewName} onChange={(e) => setReviewName(e.target.value)} required placeholder="John Doe" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Used</label>
                        <select value={reviewService} onChange={(e) => setReviewService(e.target.value)} required className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                          <option value="">Select a service...</option>
                          <option>Emergency Plumbing</option>
                          <option>Drain Cleaning</option>
                          <option>Water Heater Repair</option>
                          <option>Leak Detection</option>
                          <option>Toilet Repair</option>
                          <option>Sewer Line Repair</option>
                          <option>Pipe Replacement</option>
                          <option>Commercial Plumbing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Rating</label>
                        <div className="flex gap-2.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={() => setReviewRating(star)} className="p-1.5 transition-transform hover:scale-125">
                              <Star className={`w-7 h-7 transition-colors ${star <= reviewRating ? 'text-accent fill-accent' : 'text-gray-300'}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                        <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} required rows={4} placeholder="Tell us about your experience..." className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                      </div>

                      <button type="submit" className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-4 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]">
                        <Send className="w-4 h-4" />
                        Submit Review
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
            )}
          </AnimatePresence>
        </Portal>
      </div>
    </section>
  );
}
