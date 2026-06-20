import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Portfolio from "./pages/Portfolio/Portfolio";

// Project pages are code-split so the portfolio bundle stays lean (the Chief of
// Staff page pulls in React Flow, which we don't want on the landing page).
const AssistAIPage = lazy(() => import("./pages/AssistAI/AssistAIPage"));
const ChiefOfStaffPage = lazy(
  () => import("./pages/ChiefOfStaff/ChiefOfStaffPage"),
);

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
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0b]" />}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects/assistai" element={<AssistAIPage />} />
          <Route
            path="/projects/chief-of-staff"
            element={<ChiefOfStaffPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
