import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProblemPromise } from "@/components/ProblemPromise";
import { SafetyBanner } from "@/components/SafetyBanner";
import { Protocol } from "@/components/Protocol";
import { Ingredients } from "@/components/Ingredients";
import { Benefits } from "@/components/Benefits";
import { BrandStory } from "@/components/BrandStory";
import { BeforeAfter } from "@/components/BeforeAfter";
import { HowToUse } from "@/components/HowToUse";
import { Testimonials } from "@/components/Testimonials";
import { Offer } from "@/components/Offer";
import { OrderForm } from "@/components/OrderForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Hero />
      <Marquee />
      <ProblemPromise />
      <SafetyBanner />
      <Protocol />
      <Ingredients />
      <Benefits />
      <BrandStory />
      <BeforeAfter />
      <HowToUse />
      <Testimonials />
      <Offer />
      <OrderForm />
      <Faq />
      <Footer />
      <StickyCta />
    </main>
  );
}
