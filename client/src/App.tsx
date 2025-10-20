import { Switch, Route, Link } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ChatButton from "@/components/ChatButton";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import TextToImageGenerator from "@/pages/TextToImageGenerator";
import ImageToImage from "@/pages/ImageToImage";
import ImageToSketch from "@/pages/ImageToSketch";
import BGRemover from "@/pages/BGRemover";
import Upscale from "@/pages/Upscale";
import Admin from "@/pages/Admin";
import MoreTools from "@/pages/MoreTools";
import Support from "@/pages/Support";
import FAQ from "@/pages/FAQ";
import TermsAndConditions from "@/pages/TermsAndConditions";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import DMCA from "@/pages/DMCA";
import CanvasEditor from "@/pages/CanvasEditor";
import API from "@/pages/API";
import { useEffect, useState } from "react";

const AdsterraNativeBanner = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl27831876.effectivegatecpm.com/fcc36959a3b4378011d5b8ab47925cb8/invoke.js';
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
};

const AdsterraSocialBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl27831772.effectivegatecpm.com/17/0e/67/170e67842e34ff156ec9833bd5088524.js';
    script.async = true;
    
    document.body.appendChild(script);

    // Hide the ad after 1 minute (60000 milliseconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Remove any ad elements that might have been created by the script
      const adElements = document.querySelectorAll('[id*="adsterra"], [class*="adsterra"]');
      adElements.forEach(el => el.remove());
    }, 60000);
    
    return () => {
      clearTimeout(timer);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return null;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/support" component={Support} />
      <Route path="/admin" component={Admin} />
      <Route path="/text-to-image" component={TextToImageGenerator} />
      <Route path="/image-to-image" component={ImageToImage} />
      <Route path="/image-to-sketch" component={ImageToSketch} />
      <Route path="/canvas-editor" component={CanvasEditor} />
      <Route path="/bg-remover" component={BGRemover} />
      <Route path="/upscale" component={Upscale} />
      <Route path="/more-tools" component={MoreTools} />
      <Route path="/faq" component={FAQ} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/dmca" component={DMCA} />
      <Route path="/api" component={API} />
      <Route component={NotFound} />
    </Switch>
  );
}

function TopBar() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-3">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="CreatiVista ai Logo" className="h-8 w-8" data-testid="img-logo" />
          <span className="text-lg font-semibold text-foreground" data-testid="text-brand-name">
            CreatiVista ai
          </span>
        </Link>
      </div>
    </header>
  );
}

function App() {
  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={sidebarStyle as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <TopBar />
              <main className="flex-1 overflow-auto">
                <Router />
                {/* Adsterra Native Banner Ad */}
                <div className="w-full flex justify-center py-4 mt-8">
                  <div id="container-fcc36959a3b4378011d5b8ab47925cb8"></div>
                </div>
              </main>
            </div>
          </div>
          <ChatButton />
          <Toaster />
          <AdsterraNativeBanner />
          <AdsterraSocialBar />
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
