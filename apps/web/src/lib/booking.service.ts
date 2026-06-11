/**
 * Frontend API service for all public-facing forms:
 * - Booking appointments
 * - Getting quotes
 * - Sending contact messages
 * - Emergency service requests
 */
import { api } from './axios';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ServiceType =
  | 'EMERGENCY'
  | 'DRAIN_CLEANING'
  | 'WATER_HEATER'
  | 'LEAK_DETECTION'
  | 'TOILET_REPAIR'
  | 'SEWER_LINE'
  | 'PIPE_REPLACEMENT'
  | 'COMMERCIAL'
  | 'OTHER';

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: ServiceType;
  scheduledAt: string; // ISO date string
  notes?: string;
}

export interface QuotePayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: ServiceType;
  description: string;
  preferredDate?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface EmergencyPayload {
  name: string;
  phone: string;
  address: string;
  issueType: string;
}

// ─── API Calls ────────────────────────────────────────────────────────────────

export const bookingService = {
  /** Submit a booking appointment */
  async book(data: BookingPayload) {
    const res = await api.post('/appointments', data);
    return res.data;
  },

  /** Request a quote */
  async requestQuote(data: QuotePayload) {
    const res = await api.post('/quotes', data);
    return res.data;
  },

  /** Send a contact message */
  async contact(data: ContactPayload) {
    const res = await api.post('/contact', data);
    return res.data;
  },

  /** Submit an emergency service request */
  async emergency(data: EmergencyPayload) {
    const res = await api.post('/service-requests', data);
    return res.data;
  },

  /** Fetch published testimonials */
  async getTestimonials() {
    const res = await api.get('/testimonials');
    return res.data;
  },

  /** Submit a review / testimonial */
  async submitReview(data: {
    customerName: string;
    rating: number;
    review: string;
    serviceType?: string;
  }) {
    const res = await api.post('/testimonials', data);
    return res.data;
  },
};

export const SERVICE_LABELS: Record<ServiceType, string> = {
  EMERGENCY: '🚨 Emergency Plumbing',
  DRAIN_CLEANING: '🚿 Drain Cleaning',
  WATER_HEATER: '🔥 Water Heater',
  LEAK_DETECTION: '💧 Leak Detection',
  TOILET_REPAIR: '🪠 Toilet Repair',
  SEWER_LINE: '🔩 Sewer Line',
  PIPE_REPLACEMENT: '🔧 Pipe Replacement',
  COMMERCIAL: '🏢 Commercial Services',
  OTHER: '🔨 Other',
};
