import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Portfolio from "./pages/Portfolio/Portfolio";
import AssistAIPage from "./pages/AssistAI/AssistAIPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects/assistai" element={<AssistAIPage />} />
      </Routes>
    </BrowserRouter>
  );
}
