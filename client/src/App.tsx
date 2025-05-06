import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AnimatedRoutes, PageTransition } from "./lib/transitions";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import Team from "@/pages/Team";
import Blog from "@/pages/Blog";
import Testimonials from "@/pages/Testimonials";
import BookIntroduction from "@/pages/BookIntroduction";
import DementiaCare from "@/pages/DementiaCare";
import PalliativeCare from "@/pages/PalliativeCare";
import LiveInCare from "@/pages/LiveInCare";
import Gallery from "@/pages/Gallery";
import RespiteCare from "@/pages/RespiteCare";
import Recruitment from "@/pages/Recruitment";
import ApplicationForm from "@/pages/ApplicationForm";
import BlogDetail from "@/pages/BlogDetail";

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatedRoutes>
      <PageTransition key={location}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/about-us" component={About} />
          <Route path="/team" component={Team} />
          <Route path="/services" component={Services} />
          <Route path="/dementia-care" component={DementiaCare} />
          <Route path="/palliative-care" component={PalliativeCare} />
          <Route path="/live-in-care" component={LiveInCare} />
          <Route path="/respite-care" component={RespiteCare} />
          <Route path="/contact" component={Contact} />
          <Route path="/contact-us" component={Contact} />
          <Route path="/book-an-introduction" component={BookIntroduction} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogDetail} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/recruitment" component={Recruitment} />
          <Route path="/application-form" component={ApplicationForm} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-conditions" component={TermsConditions} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AnimatedRoutes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
