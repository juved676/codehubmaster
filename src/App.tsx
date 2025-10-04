import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Ask from "./pages/Ask";
import Topics from "./pages/Topics";
import TopicDetail from "./pages/TopicDetail";
import QuestionDetail from "./pages/QuestionDetail";
import Auth from "./pages/Auth";
import Question from "./pages/Question";
import Admin from "./pages/Admin";
import AdminPayments from "./pages/AdminPayments";
import Pricing from "./pages/Pricing";
import ReviewQueue from "./pages/ReviewQueue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ask" element={<Ask />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/questions" element={<Topics />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Topic pages */}
              <Route path="/python-basics" element={<TopicDetail />} />
              <Route path="/data-science" element={<TopicDetail />} />
              <Route path="/web-development" element={<TopicDetail />} />
              <Route path="/machine-learning" element={<TopicDetail />} />
              <Route path="/topic/:topic" element={<TopicDetail />} />
              
              {/* Question detail pages */}
              <Route path="/question/:topic/:id" element={<QuestionDetail />} />
              <Route path="/question/:id" element={<Question />} />
              
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
              <Route path="/review-queue" element={<ReviewQueue />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
