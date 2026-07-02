import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { VenturesSection } from '@/components/sections/VenturesSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyEMBSection } from '@/components/sections/WhyEMBSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <VenturesSection />
        <ServicesSection />
        <WhyEMBSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}