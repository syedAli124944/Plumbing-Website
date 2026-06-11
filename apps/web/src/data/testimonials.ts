export interface Testimonial {
  name: string;
  role: string;
  review: string;
  rating: number;
  service: string;
  source: string;
}

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  { name: 'John Smith', role: 'Homeowner', review: 'ProPlumb USA saved us during a midnight pipe burst! Their technician arrived within 45 minutes and had the issue fixed in under two hours. Professional, courteous, and fair pricing. Cannot recommend enough!', rating: 5, service: 'Emergency Plumbing', source: 'Google' },
  { name: 'Sarah Johnson', role: 'Property Manager', review: 'Had a complete kitchen drain overhaul done by ProPlumb. The team was incredibly thorough, explained every step, and cleaned up perfectly after. My drains have never worked better!', rating: 5, service: 'Drain Cleaning', source: 'Yelp' },
  { name: 'Mike Williams', role: 'Homeowner', review: 'Installed a new tankless water heater. The installation was flawless, and they helped me choose the right model for my family size. Already saving on energy bills!', rating: 5, service: 'Water Heater', source: 'Google' },
  { name: 'Emily Davis', role: 'Business Owner', review: 'Used their leak detection service and they found a hidden leak behind the bathroom wall that had been causing mold. Very impressed with their thermal imaging technology.', rating: 4, service: 'Leak Detection', source: 'Direct' },
  { name: 'Robert Brown', role: 'Restaurant Owner', review: 'Our restaurant needed an emergency plumbing fix on a busy Friday night. ProPlumb sent someone within 30 minutes and had us back open in no time!', rating: 5, service: 'Commercial', source: 'Google' },
  { name: 'Lisa Martinez', role: 'Homeowner', review: 'Excellent service for our whole-house repiping project. They replaced all the old pipes with PEX in just two days with minimal disruption. Very competitive pricing too.', rating: 5, service: 'Pipe Replacement', source: 'Yelp' },
  { name: 'David Chen', role: 'Homeowner', review: 'Called about a sewer line issue. They used camera inspection to diagnose the problem and offered a trenchless repair option that saved our landscaping. Top notch!', rating: 5, service: 'Sewer Line', source: 'Google' },
  { name: 'Amanda Foster', role: 'Property Manager', review: 'ProPlumb installed a new toilet and repaired our bathroom plumbing. Quick, clean, and the price was exactly what they quoted. Will use again!', rating: 4, service: 'Toilet Repair', source: 'Yelp' }
];

export function getTestimonials(): Testimonial[] {
  try {
    const saved = localStorage.getItem('proplumb_testimonials');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {}
  return INITIAL_TESTIMONIALS;
}

export function addTestimonial(t: Testimonial) {
  const current = getTestimonials();
  const updated = [t, ...current];
  try {
    localStorage.setItem('proplumb_testimonials', JSON.stringify(updated));
    window.dispatchEvent(new Event('testimonials_updated'));
  } catch (e) {}
}
