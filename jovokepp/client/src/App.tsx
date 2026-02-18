import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ScrollToHash } from "@/components/ScrollToHash";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Info from "@/pages/Info";
import Organisations from "@/pages/Organisations";
import Partners from "@/pages/Partners";
import Privacy from "@/pages/Privacy";
import Projects from "@/pages/Projects";
import { useState } from "react";

function App() {
  const [lang, setLang] = useState<"hu" | "en">("hu");

  return (
    <BrowserRouter>
      <ScrollToHash />
      <AppLayout lang={lang} setLang={setLang}>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
          <Route path="/info" element={<Info lang={lang} />} />
          <Route path="/organisations" element={<Organisations lang={lang} />} />
          <Route path="/partners" element={<Partners lang={lang} />} />
          <Route path="/privacy" element={<Privacy lang={lang} />} />
          <Route path="/projects" element={<Projects lang={lang} />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
