import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useAuthStore, useThemeStore } from "@/store";
import { useEffect } from "react";
import { Route, Switch } from "wouter";
import { PortfolioLayout } from "./components/PortfolioLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

function Router() {
  return (
    <PortfolioLayout>
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </PortfolioLayout>
  );
}

// Initialize stores on app mount
function StoreInit() {
  const authInit = useAuthStore((s) => s._init);
  const themeInit = useThemeStore((s) => s._initTheme);

  useEffect(() => {
    // Initialize theme (set switchable to true to show theme toggle)
    themeInit("dark", true);

    // Initialize auth and get cleanup function
    const cleanup = authInit();
    return cleanup;
  }, [authInit, themeInit]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <StoreInit />
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
