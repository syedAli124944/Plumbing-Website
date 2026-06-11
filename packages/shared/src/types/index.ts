// ═══════════════════════════════════════════════════════════
// ProPlumb USA — Shared Types
// ═══════════════════════════════════════════════════════════

// ── Enums ──────────────────────────────────────────────────

export enum Role {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum QuoteStatus {
  NEW = 'NEW',
  REVIEWING = 'REVIEWING',
  QUOTED = 'QUOTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum RequestStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum ServiceType {
  EMERGENCY = 'EMERGENCY',
  DRAIN_CLEANING = 'DRAIN_CLEANING',
  WATER_HEATER = 'WATER_HEATER',
  LEAK_DETECTION = 'LEAK_DETECTION',
  TOILET_REPAIR = 'TOILET_REPAIR',
  SEWER_LINE = 'SEWER_LINE',
  PIPE_REPLACEMENT = 'PIPE_REPLACEMENT',
  COMMERCIAL = 'COMMERCIAL',
}

// ── Entity Interfaces ──────────────────────────────────────

export interface User {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  notes: string | null;
  appointments?: Appointment[];
  quotes?: Quote[];
  createdAt: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  customer?: Customer;
  serviceType: ServiceType;
  scheduledAt: string;
  status: AppointmentStatus;
  technicianNote: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  id: string;
  customerId: string;
  customer?: Customer;
  serviceType: ServiceType;
  description: string;
  address: string;
  preferredDate: string | null;
  status: QuoteStatus;
  estimatedCost: number | null;
  attachments: string[];
  createdAt: string;
}

export interface ServiceRequest {
  id: string;
  name: string;
  phone: string;
  address: string;
  issueType: string;
  isEmergency: boolean;
  status: RequestStatus;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  avatarUrl: string | null;
  rating: number;
  review: string;
  serviceType: string | null;
  isApproved: boolean;
  isPublished: boolean;
  source: string | null;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  category: string;
  authorId: string;
  tags: string[];
  readTimeMin: number;
  isPublished: boolean;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

// ── API DTOs ───────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface CreateQuoteRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: ServiceType;
  preferredDate?: string;
  description: string;
}

export interface CreateServiceRequestDto {
  name: string;
  phone: string;
  address: string;
  issueType: string;
  isEmergency?: boolean;
}

export interface CreateAppointmentRequest {
  customerId: string;
  serviceType: ServiceType;
  scheduledAt: string;
  technicianNote?: string;
}

export interface UpdateAppointmentRequest {
  status?: AppointmentStatus;
  scheduledAt?: string;
  technicianNote?: string;
}

export interface CreateBlogPostRequest {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  category: string;
  tags: string[];
  readTimeMin: number;
  isPublished?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface UpdateBlogPostRequest extends Partial<CreateBlogPostRequest> {}

export interface DashboardStats {
  totalCustomers: number;
  totalAppointments: number;
  pendingQuotes: number;
  unreadMessages: number;
  monthlyAppointments: number;
  completedThisMonth: number;
  revenueEstimate: number;
  averageRating: number;
}

// ── Pagination ─────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// ── API Response Wrapper ───────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}
