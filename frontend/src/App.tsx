import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Approach } from './components/Approach';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ServiceOption } from './types/contact';

export const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceOption | ''>('');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: prefersReducedMotion,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-textPrimary">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services onSelectService={(service) => setSelectedService(service)} />
        <Approach />
        <WhyChooseUs />
        <ContactForm selectedService={selectedService} />
      </main>
      <Footer onSelectService={(service) => setSelectedService(service)} />
    </div>
  );
};

export default App;

