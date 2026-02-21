// React default import not required with new JSX transform
import { Hero } from '../components/home/Hero';
import { ProgramsSection } from '../components/home/ProgramsSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Testimonials } from '../components/home/Testimonials';
import { PartnersSection } from '../components/home/PartnersSection';
import { CarbonSimulator } from '../components/home/CarbonSimulator';
import { CTASection } from '../components/home/CTASection';
export function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <PartnersSection />
      <ProgramsSection />
      <WhyChooseUs />
      <CarbonSimulator />
      <Testimonials />
      <CTASection />
    </main>);

}