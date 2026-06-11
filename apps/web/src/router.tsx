import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from './components/layout/MainLayout';
import { PageTransition } from './components/layout/PageTransition';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const EmergencyPage = lazy(() => import('./pages/EmergencyPage'));
const ServiceAreasPage = lazy(() => import('./pages/ServiceAreasPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-navy">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-gray-400 font-medium text-sm tracking-widest uppercase animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

// Wrap each page for direction-aware transitions
function AnimatedOutlet({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}

export function AppRouter() {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<AnimatedOutlet><HomePage /></AnimatedOutlet>} />
            <Route path="/services" element={<AnimatedOutlet><ServicesPage /></AnimatedOutlet>} />
            <Route path="/services/:slug" element={<AnimatedOutlet><ServiceDetailPage /></AnimatedOutlet>} />
            <Route path="/testimonials" element={<AnimatedOutlet><TestimonialsPage /></AnimatedOutlet>} />
            <Route path="/blog" element={<AnimatedOutlet><BlogPage /></AnimatedOutlet>} />
            <Route path="/contact" element={<AnimatedOutlet><ContactPage /></AnimatedOutlet>} />
            <Route path="/emergency" element={<AnimatedOutlet><EmergencyPage /></AnimatedOutlet>} />
            <Route path="/service-areas" element={<AnimatedOutlet><ServiceAreasPage /></AnimatedOutlet>} />
          </Route>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
