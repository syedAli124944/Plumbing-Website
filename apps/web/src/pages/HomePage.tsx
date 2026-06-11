import { SEO } from '@/components/seo/SEO';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { InfiniteServiceScroll } from '@/components/sections/InfiniteServiceScroll';
import { AboutMiniSection } from '@/components/sections/AboutMiniSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { StatisticsSection } from '@/components/sections/StatisticsSection';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { PhotoGallery } from '@/components/sections/PhotoGallery';
import { ServiceAreasMap } from '@/components/sections/ServiceAreasMap';
import { EmergencyBanner } from '@/components/sections/EmergencyBanner';
import { CTASection } from '@/components/sections/CTASection';
import { FAQAccordion } from '@/components/sections/FAQAccordion';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Professional Plumbing Services"
        description="ProPlumb USA delivers expert plumbing services 24/7. Licensed & insured technicians, 60-min emergency response, and a 5-star satisfaction guarantee."
        canonical="/"
      />
      <HeroSection />
      <TrustBar />
      <InfiniteServiceScroll />
      <AboutMiniSection />
      <ServicesGrid />
      <WhyChooseUs />
      <HowItWorks />
      <StatisticsSection />
      <TestimonialsCarousel />
      <PhotoGallery />
      <ServiceAreasMap />
      <EmergencyBanner />
      <CTASection />
      <FAQAccordion />
    </>
  );
}
