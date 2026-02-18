import { AppLayout } from "@/components/AppLayout";
import Home from "@/pages/Home";
import { useState } from "react";

function App() {
  const [lang, setLang] = useState<"hu" | "en">("hu");

  return (
    <AppLayout lang={lang} setLang={setLang}>
      <Home lang={lang} />
    </AppLayout>
  );
}

export default App;
