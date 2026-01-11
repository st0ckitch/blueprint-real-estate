import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import Renders from "./pages/Renders";
import RenderDetail from "./pages/RenderDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

// Admin imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import ProjectsList from "./pages/admin/ProjectsList";
import ProjectsParams from "./pages/admin/ProjectsParams";
import ApartmentsList from "./pages/admin/ApartmentsList";
import ApartmentsParams from "./pages/admin/ApartmentsParams";
import BlogList from "./pages/admin/BlogList";
import BlogEditor from "./pages/admin/BlogEditor";
import BlogCategories from "./pages/admin/BlogCategories";
import GeneralSettings from "./pages/admin/GeneralSettings";
import BannerManager from "./pages/admin/BannerManager";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/projects/:location" element={<Projects />} />
              <Route path="/apartments" element={<Renders />} />
              <Route path="/apartments/:id" element={<RenderDetail />} />
              <Route path="/contact" element={<Contact />} />
              {/* Redirects for old URLs */}
              <Route path="/renders" element={<Renders />} />
              <Route path="/renders/:id" element={<RenderDetail />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="projects" element={<ProjectsList />} />
                <Route path="projects/parameters" element={<ProjectsParams />} />
                <Route path="apartments" element={<ApartmentsList />} />
                <Route path="apartments/parameters" element={<ApartmentsParams />} />
                <Route path="blog" element={<BlogList />} />
                <Route path="blog/new" element={<BlogEditor />} />
                <Route path="blog/:id" element={<BlogEditor />} />
                <Route path="blog/categories" element={<BlogCategories />} />
                <Route path="settings" element={<GeneralSettings />} />
                <Route path="banner" element={<BannerManager />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <WhatsAppButton />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
