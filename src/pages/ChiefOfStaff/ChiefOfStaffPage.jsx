import { useSEO } from "./hooks/useSEO";
import PageStyles from "./components/PageStyles";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import WhatItIs from "./components/WhatItIs";
import WhatItDoes from "./components/WhatItDoes";
import HowItWorks from "./components/HowItWorks";
import Stack from "./components/Stack";
import Closing from "./components/Closing";
import Footer from "./components/Footer";

export default function ChiefOfStaffPage() {
  useSEO();

  return (
    <div className="cos-root min-h-screen">
      <PageStyles />
      <TopBar />
      <main>
        <Hero />
        <WhatItIs />
        <WhatItDoes />
        <HowItWorks />
        <Stack />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
