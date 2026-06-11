import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { SEO } from '@/components/seo/SEO';
import { bookingService, QuotePayload } from '@/lib/booking.service';
import { PageHeroBanner } from '@/components/layout/PageHeroBanner';
import { MessageSquare, Zap } from 'lucide-react';

const contactSchema = z.object({ name: z.string().min(2, 'Name must be at least 2 characters'), email: z.string().email('Valid email required'), phone: z.string().optional(), message: z.string().min(10, 'Message must be at least 10 characters') });
const quoteSchema = z.object({ name: z.string().min(2, 'Name required'), email: z.string().email('Valid email required'), phone: z.string().min(7, 'Phone required'), address: z.string().min(5, 'Address required'), serviceType: z.string().min(1, 'Select a service'), description: z.string().min(10, 'Description required'), preferredDate: z.string().optional() });
const emergencySchema = z.object({ name: z.string().min(2, 'Name required'), phone: z.string().min(7, 'Phone required'), address: z.string().min(5, 'Address required'), issueType: z.string().min(3, 'Describe the issue') });

type ContactForm = z.infer<typeof contactSchema>;
type QuoteForm = z.infer<typeof quoteSchema>;
type EmergencyForm = z.infer<typeof emergencySchema>;

const TABS = ['General Contact', 'Book Session / Quote', 'Emergency'];

export default function ContactPage() {
  const [tab, setTab] = useState(0);
  const contact = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });
  const quote = useForm<QuoteForm>({ resolver: zodResolver(quoteSchema) });
  const emergency = useForm<EmergencyForm>({ resolver: zodResolver(emergencySchema) });

  const onContact = async (data: ContactForm) => {
    try { await bookingService.contact(data); toast.success('Message sent! We\'ll reply within 24 hours.'); contact.reset(); } catch { toast.error('Failed to send. Please try again.'); }
  };
  const onQuote = async (data: QuoteForm) => {
    try { await bookingService.requestQuote(data as QuotePayload); toast.success('Session/Quote request submitted!'); quote.reset(); } catch { toast.error('Failed to submit. Please try again.'); }
  };
  const onEmergency = async (data: EmergencyForm) => {
    try { await bookingService.emergency(data); toast.success('Emergency request sent! We\'ll call you ASAP.'); emergency.reset(); } catch { toast.error('Failed to submit. Please call us directly.'); }
  };

  const inputClass = 'w-full px-4 py-3 rounded-[8px] border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all';
  const errorClass = 'text-red text-xs mt-1';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with ProPlumb USA. Request a free quote, schedule service, or call for emergency plumbing." canonical="/contact" />

      <PageHeroBanner
        title="Get In Touch"
        subtitle="Have a question, need a quote, or have an emergency? We're here to help 24/7 — choose how you'd like to reach us."
        breadcrumbs={[{ label: 'Contact Us' }]}
        bgImage="/images/contact_hero.png"
        badge={
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/25 text-green text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            We're Online Now
          </span>
        }
        accentColor="from-primary to-accent"
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Forms */}
            <div className="lg:col-span-2">
              <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-xl shadow-card border border-gray-100">
                {TABS.map((t, i) => (
                  <button key={t} onClick={() => setTab(i)} className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${tab === i ? 'bg-blue text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>{t}</button>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100">
                {tab === 0 && (
                  <form onSubmit={contact.handleSubmit(onContact)} className="space-y-5">
                    <div><label className={labelClass}>Full Name</label><input {...contact.register('name')} className={inputClass} placeholder="John Smith" />{contact.formState.errors.name && <p className={errorClass}>{contact.formState.errors.name.message}</p>}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div><label className={labelClass}>Email</label><input {...contact.register('email')} type="email" className={inputClass} placeholder="john@email.com" />{contact.formState.errors.email && <p className={errorClass}>{contact.formState.errors.email.message}</p>}</div>
                      <div><label className={labelClass}>Phone (Optional)</label><input {...contact.register('phone')} className={inputClass} placeholder="(555) 123-4567" /></div>
                    </div>
                    <div><label className={labelClass}>Message</label><textarea {...contact.register('message')} rows={5} className={inputClass} placeholder="How can we help you?" />{contact.formState.errors.message && <p className={errorClass}>{contact.formState.errors.message.message}</p>}</div>
                    <button type="submit" disabled={contact.formState.isSubmitting} className="flex items-center gap-2 bg-blue hover:bg-blue-dark text-white px-8 py-3.5 rounded-[10px] font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"><Send className="w-4 h-4" />Send Message</button>
                  </form>
                )}

                {tab === 1 && (
                  <form onSubmit={quote.handleSubmit(onQuote)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div><label className={labelClass}>Full Name</label><input {...quote.register('name')} className={inputClass} />{quote.formState.errors.name && <p className={errorClass}>{quote.formState.errors.name.message}</p>}</div>
                      <div><label className={labelClass}>Email</label><input {...quote.register('email')} type="email" className={inputClass} />{quote.formState.errors.email && <p className={errorClass}>{quote.formState.errors.email.message}</p>}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div><label className={labelClass}>Phone</label><input {...quote.register('phone')} className={inputClass} />{quote.formState.errors.phone && <p className={errorClass}>{quote.formState.errors.phone.message}</p>}</div>
                      <div><label className={labelClass}>Service Type</label><select {...quote.register('serviceType')} className={inputClass}><option value="">Select service</option><option value="EMERGENCY">Emergency</option><option value="DRAIN_CLEANING">Drain Cleaning</option><option value="WATER_HEATER">Water Heater</option><option value="LEAK_DETECTION">Leak Detection</option><option value="TOILET_REPAIR">Toilet Repair</option><option value="SEWER_LINE">Sewer Line</option><option value="PIPE_REPLACEMENT">Pipe Replacement</option><option value="COMMERCIAL">Commercial</option></select>{quote.formState.errors.serviceType && <p className={errorClass}>{quote.formState.errors.serviceType.message}</p>}</div>
                    </div>
                    <div><label className={labelClass}>Address</label><input {...quote.register('address')} className={inputClass} />{quote.formState.errors.address && <p className={errorClass}>{quote.formState.errors.address.message}</p>}</div>
                    <div><label className={labelClass}>Preferred Date (Optional)</label><input {...quote.register('preferredDate')} type="date" className={inputClass} /></div>
                    <div><label className={labelClass}>Describe Your Issue</label><textarea {...quote.register('description')} rows={4} className={inputClass} />{quote.formState.errors.description && <p className={errorClass}>{quote.formState.errors.description.message}</p>}</div>
                    <button type="submit" disabled={quote.formState.isSubmitting} className="flex items-center gap-2 bg-blue hover:bg-blue-dark text-white px-8 py-3.5 rounded-[10px] font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"><Send className="w-4 h-4" />Book Session / Request Quote</button>
                  </form>
                )}

                {tab === 2 && (
                  <form onSubmit={emergency.handleSubmit(onEmergency)} className="space-y-5">
                    <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 text-sm text-accent-dark font-medium">⚡ For fastest response, call us directly at <a href="tel:5559117473" className="font-bold underline">(555) 911-PIPE</a></div>
                    <div><label className={labelClass}>Your Name</label><input {...emergency.register('name')} className={inputClass} />{emergency.formState.errors.name && <p className={errorClass}>{emergency.formState.errors.name.message}</p>}</div>
                    <div><label className={labelClass}>Phone Number</label><input {...emergency.register('phone')} className={inputClass} />{emergency.formState.errors.phone && <p className={errorClass}>{emergency.formState.errors.phone.message}</p>}</div>
                    <div><label className={labelClass}>Address</label><input {...emergency.register('address')} className={inputClass} />{emergency.formState.errors.address && <p className={errorClass}>{emergency.formState.errors.address.message}</p>}</div>
                    <div><label className={labelClass}>Describe the Emergency</label><textarea {...emergency.register('issueType')} rows={3} className={inputClass} />{emergency.formState.errors.issueType && <p className={errorClass}>{emergency.formState.errors.issueType.message}</p>}</div>
                    <button type="submit" disabled={emergency.formState.isSubmitting} className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-[10px] font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"><Send className="w-4 h-4" />Submit Emergency Request</button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {[
                { icon: Phone, title: '24/7 Emergency', value: '(555) 911-PIPE', href: 'tel:5559117473', color: 'text-accent' },
                { icon: Phone, title: 'General Inquiries', value: '(555) 123-4567', href: 'tel:5551234567', color: 'text-blue' },
                { icon: Mail, title: 'Email Us', value: 'info@proplumb.com', href: 'mailto:info@proplumb.com', color: 'text-blue' },
                { icon: MapPin, title: 'Office', value: '1234 Pipeline Ave, Suite 100, Houston, TX 77001', color: 'text-blue' },
              ].map(({ icon: Icon, title, value, href, color }) => (
                <div key={title} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className="font-heading font-semibold text-gray-900">{title}</span>
                  </div>
                  {href ? <a href={href} className="text-sm text-gray-600 hover:text-blue transition-colors">{value}</a> : <p className="text-sm text-gray-600">{value}</p>}
                </div>
              ))}

              <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue" />
                  <span className="font-heading font-semibold text-gray-900">Business Hours</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Mon-Fri: 7:00 AM – 8:00 PM</p>
                  <p>Saturday: 8:00 AM – 6:00 PM</p>
                  <p>Sunday: 9:00 AM – 5:00 PM</p>
                  <p className="text-accent font-semibold">Emergency: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
