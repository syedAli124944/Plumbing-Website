import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Zap, Clock, Shield, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { SEO } from '@/components/seo/SEO';
import { api } from '@/lib/axios';

const schema = z.object({ name: z.string().min(2), phone: z.string().min(7), address: z.string().min(5), issueType: z.string().min(3) });
type EmergencyForm = z.infer<typeof schema>;

export default function EmergencyPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<EmergencyForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: EmergencyForm) => {
    try { await api.post('/service-requests', { ...data, isEmergency: true }); toast.success('Emergency request submitted! A technician will call you shortly.'); reset(); } catch { toast.error('Failed to submit. Please call us directly at (555) 911-PIPE'); }
  };

  const inputClass = 'w-full px-4 py-3.5 rounded-xl border border-accent/30 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all';

  return (
    <>
      <SEO title="Emergency Plumbing" description="24/7 Emergency plumbing service. Our technicians arrive within 60 minutes. Call now for immediate assistance." canonical="/emergency" />

      <section className="bg-gradient-to-br from-accent-dark via-accent to-accent-light pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8"><Link to="/" className="hover:text-white">Home</Link><span>/</span><span className="text-white">Emergency</span></nav>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/20 text-white text-sm font-bold mb-8 animate-pulse backdrop-blur-sm">
            <Zap className="w-4 h-4" /> Technicians Available Now
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">Emergency Plumbing Service</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/90 text-lg max-w-xl mb-10 leading-relaxed">Burst pipes? Flooding? Sewer backup? Don't wait — our emergency team responds in 60 minutes or less.</motion.p>
          <motion.a initial={{ opacity: 0, y: 10, scale: 1 }} animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }} transition={{ delay: 0.4, scale: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.8 } }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} href="tel:5559117473" className="call-ring-pulse relative inline-flex items-center gap-3 bg-white text-accent-dark px-10 py-5 rounded-2xl font-heading font-bold text-xl hover:bg-gray-50 transition-all shadow-xl">
            <Phone className="w-6 h-6 phone-wiggle" /> (555) 911-PIPE
          </motion.a>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Clock, title: '60-Min Response', desc: 'Our nearest technician is dispatched immediately upon your call.' },
              { icon: Shield, title: 'Licensed & Insured', desc: 'All emergency technicians are certified and carry full insurance.' },
              { icon: Zap, title: 'Upfront Pricing', desc: 'No surprise charges. You approve the quote before we start any work.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-8 rounded-2xl bg-accent/5 border border-accent/10 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
                <Icon className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center">Submit Emergency Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-2xl p-8 md:p-10 shadow-elevated border border-gray-100">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label><input {...register('name')} className={inputClass} placeholder="John Smith" />{errors.name && <p className="text-red text-xs mt-1.5">{errors.name.message}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input {...register('phone')} className={inputClass} placeholder="(555) 123-4567" />{errors.phone && <p className="text-red text-xs mt-1.5">{errors.phone.message}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Your Address</label><input {...register('address')} className={inputClass} placeholder="123 Main St, Houston, TX" />{errors.address && <p className="text-red text-xs mt-1.5">{errors.address.message}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Describe the Emergency</label><textarea {...register('issueType')} rows={3} className={inputClass} placeholder="e.g., Burst pipe in kitchen, water flooding..." />{errors.issueType && <p className="text-red text-xs mt-1.5">{errors.issueType.message}</p>}</div>
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-2xl font-heading font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-accent/20"><Send className="w-5 h-5" />Submit Emergency Request</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
