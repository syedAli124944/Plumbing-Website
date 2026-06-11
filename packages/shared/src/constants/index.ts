// ═══════════════════════════════════════════════════════════
// ProPlumb USA — Shared Constants
// ═══════════════════════════════════════════════════════════

import { ServiceType } from '../types';

export const SERVICE_LABELS: Record<ServiceType, string> = {
  [ServiceType.EMERGENCY]: 'Emergency Plumbing',
  [ServiceType.DRAIN_CLEANING]: 'Drain Cleaning',
  [ServiceType.WATER_HEATER]: 'Water Heater Repair',
  [ServiceType.LEAK_DETECTION]: 'Leak Detection',
  [ServiceType.TOILET_REPAIR]: 'Toilet Repair',
  [ServiceType.SEWER_LINE]: 'Sewer Line Repair',
  [ServiceType.PIPE_REPLACEMENT]: 'Pipe Replacement',
  [ServiceType.COMMERCIAL]: 'Commercial Plumbing',
};

export const SERVICE_DESCRIPTIONS: Record<ServiceType, string> = {
  [ServiceType.EMERGENCY]: 'Fast 24/7 emergency plumbing response when you need it most. Our certified technicians arrive within 60 minutes.',
  [ServiceType.DRAIN_CLEANING]: 'Professional drain cleaning using state-of-the-art hydro-jetting and camera inspection technology.',
  [ServiceType.WATER_HEATER]: 'Expert water heater installation, repair, and maintenance for tank and tankless systems.',
  [ServiceType.LEAK_DETECTION]: 'Advanced leak detection using thermal imaging and acoustic technology to find hidden leaks.',
  [ServiceType.TOILET_REPAIR]: 'Complete toilet repair and replacement services including running toilets, clogs, and installations.',
  [ServiceType.SEWER_LINE]: 'Trenchless sewer line repair and replacement with minimal disruption to your property.',
  [ServiceType.PIPE_REPLACEMENT]: 'Full pipe replacement and repiping services using durable copper and PEX materials.',
  [ServiceType.COMMERCIAL]: 'Commercial plumbing solutions for offices, restaurants, and industrial facilities.',
};

export const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const QUOTE_STATUS_LABELS: Record<string, string> = {
  NEW: 'New',
  REVIEWING: 'Under Review',
  QUOTED: 'Quoted',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
};

export const BUSINESS_INFO = {
  name: 'ProPlumb USA',
  tagline: 'Professional Plumbing Services You Can Trust',
  phone: '(555) 123-4567',
  emergencyPhone: '(555) 911-PIPE',
  email: 'info@proplumb.com',
  address: '1234 Pipeline Avenue, Suite 100',
  city: 'Houston',
  state: 'TX',
  zip: '77001',
  hours: {
    weekday: '7:00 AM – 8:00 PM',
    saturday: '8:00 AM – 6:00 PM',
    sunday: '9:00 AM – 5:00 PM',
    emergency: '24/7',
  },
  social: {
    facebook: 'https://facebook.com/proplumbusa',
    twitter: 'https://twitter.com/proplumbusa',
    instagram: 'https://instagram.com/proplumbusa',
    linkedin: 'https://linkedin.com/company/proplumbusa',
    yelp: 'https://yelp.com/biz/proplumbusa',
  },
  stats: {
    yearsInBusiness: 15,
    jobsCompleted: 5000,
    rating: 4.9,
    technicians: 35,
    responseTime: '60 min',
  },
  certifications: [
    'Licensed & Insured',
    'BBB A+ Rated',
    'EPA Certified',
    'Master Plumber Licensed',
  ],
} as const;

export const SERVICE_AREAS = [
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
] as const;

export const BLOG_CATEGORIES = [
  'Plumbing Tips',
  'DIY Guides',
  'Home Maintenance',
  'Water Conservation',
  'Industry News',
  'Emergency Prep',
] as const;

export const FAQ_ITEMS = [
  {
    question: 'What areas do you serve?',
    answer: 'We serve major metropolitan areas across the United States including Houston, Dallas, Austin, Phoenix, Los Angeles, Miami, Atlanta, Denver, Chicago, Seattle, and New York. Contact us to confirm service availability in your area.',
  },
  {
    question: 'Do you offer 24/7 emergency service?',
    answer: 'Yes! Our emergency plumbing team is available 24 hours a day, 7 days a week, 365 days a year. We guarantee a response within 60 minutes for emergency calls in our primary service areas.',
  },
  {
    question: 'Are your plumbers licensed and insured?',
    answer: 'Absolutely. All our plumbers are fully licensed, bonded, and insured. We carry comprehensive liability insurance and workers\' compensation coverage for your protection.',
  },
  {
    question: 'How much does a typical plumbing service cost?',
    answer: 'Costs vary based on the type and complexity of the job. We provide free estimates before starting any work. Our pricing is transparent with no hidden fees. Basic services start at $99, while complex repairs are quoted individually.',
  },
  {
    question: 'Do you offer financing options?',
    answer: 'Yes, we offer flexible financing options for larger projects. We partner with several financing providers to offer plans with competitive rates and terms that fit your budget.',
  },
  {
    question: 'What is your warranty policy?',
    answer: 'We stand behind our work with a comprehensive warranty. All repairs come with a 1-year workmanship warranty, and we honor manufacturer warranties on all parts and equipment we install.',
  },
  {
    question: 'How quickly can you schedule an appointment?',
    answer: 'For non-emergency services, we typically can schedule within 24-48 hours. For emergencies, our technicians are dispatched immediately and arrive within 60 minutes.',
  },
  {
    question: 'Do I need to be home during the service?',
    answer: 'For most services, we recommend having someone over 18 present at the property. If you cannot be home, we can make arrangements on a case-by-case basis with proper authorization.',
  },
] as const;
