import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useAuthStore, useThemeStore } from "@/store";
import { useEffect } from "react";
import { Route, Switch } from "wouter";
import { AppLayout } from "./components/AppLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import ComponentShowcase from "./pages/ComponentShowcase";
import Home from "./pages/Home";
import RentalHome from "./pages/RentalHome";
import FlatMateHome from "./pages/FlatMateHome";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={FlatMateHome} />
        <Route path="/stayhub" component={RentalHome} />
        <Route path="/template" component={Home} />
        <Route path="/properties" component={Properties} />
        <Route path="/properties/:id" component={PropertyDetails} />
        <Route path="/login" component={Login} />
        <Route path="/showcase" component={ComponentShowcase} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
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
