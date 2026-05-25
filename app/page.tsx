import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { HeroBanner } from "@/components/hero-banner"
import { ValuesSection } from "@/components/values-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { ChallengesSection } from "@/components/challenges-section"
import { SolutionsSection } from "@/components/solutions-section"
import { InterfaceSection } from "@/components/interface-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { BeneficiariesSection } from "@/components/beneficiaries-section"
import { RoiSection } from "@/components/roi-section"
import { RoiStatsSection } from "@/components/roi-stats-section"
import PricingSection from "@/components/PricingSection"
import DemoSection from "@/components/DemoSection"
import FooterSection from "@/components/FooterSection"

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <HeroBanner />
      <ValuesSection />
      <AboutSection />
      <FeaturesSection />
      <ChallengesSection />
      <SolutionsSection />
      <InterfaceSection />
      <ProcessSection />
      <TestimonialsSection />
      <BeneficiariesSection />
      <RoiSection />
      <RoiStatsSection />
      <PricingSection />
      <DemoSection />
      <FooterSection />
    </main>
  )
}
