'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import HowItWorks from '@/components/HowItWorks';
import WhoBenefits from '@/components/WhoBenefits';
import ImpactStats from '@/components/ImpactStats';
import BusinessModel from '@/components/BusinessModel';
import EligibilityForm from '@/components/EligibilityForm';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <WhoBenefits />
      <ImpactStats />
      <BusinessModel />
      <EligibilityForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
