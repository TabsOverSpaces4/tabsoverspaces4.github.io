import { useState } from "react";
import { useSEO } from "./hooks/useSEO";
import PageStyles from "./components/PageStyles";
import InstallModal from "./components/InstallModal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ManifestoSection from "./components/ManifestoSection";
import MetricsGrid from "./components/MetricsGrid";
import VideoSection from "./components/VideoSection";
import ScoreRings from "./components/ScoreRings";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function AssistAIPage() {
  useSEO();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-[#07080f] font-sans">
      <PageStyles />
      {modalOpen && <InstallModal onClose={() => setModalOpen(false)} />}
      <Navbar onInstall={openModal} />
      <Hero onInstall={openModal} />
      <ManifestoSection />
      <MetricsGrid />
      <VideoSection />
      <ScoreRings />
      <CTASection onInstall={openModal} />
      <Footer />
    </div>
  );
}
