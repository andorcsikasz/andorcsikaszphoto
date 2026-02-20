import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { PortfolioLayout } from "./components/PortfolioLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Photography from "./pages/Photography";
import Drone from "./pages/Drone";
import Sandbox from "./pages/Sandbox";

function Router() {
  return (
    <PortfolioLayout>
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route path="/photography" component={Photography} />
        <Route path="/drone" component={Drone} />
        <Route path="/sandbox" component={Sandbox} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </PortfolioLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
