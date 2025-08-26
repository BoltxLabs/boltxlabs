import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import { NotificationProvider } from "./contexts/NotificationContext";
import { DynamicIsland } from "./components/DynamicIsland";
import { useNotifications } from "./contexts/NotificationContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Partnership from "./pages/Partnership";
import NotFound from "./pages/NotFound";
import { AdminDashboard } from "./components/AdminDashboard";

const queryClient = new QueryClient();

const AppContent = () => {
  const { notifications, removeNotification, clearAllNotifications } = useNotifications();
  
  return (
    <>
      <DynamicIsland 
        notifications={notifications}
        onDismiss={removeNotification}
        onClearAll={clearAllNotifications}
      />
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
