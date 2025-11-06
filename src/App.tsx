import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import { lazy, Suspense } from "react";

// Lazy load pages for better performance
const Ask = lazy(() => import("./pages/Ask"));
const Topics = lazy(() => import("./pages/Topics"));
const TopicDetail = lazy(() => import("./pages/TopicDetail"));
const QuestionDetail = lazy(() => import("./pages/QuestionDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const Question = lazy(() => import("./pages/Question"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminPayments = lazy(() => import("./pages/AdminPayments"));
const Pricing = lazy(() => import("./pages/Pricing"));
const ReviewQueue = lazy(() => import("./pages/ReviewQueue"));
const VerifyPayment = lazy(() => import("./pages/VerifyPayment"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Suspense fallback={<LoadingFallback />}>
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
                
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/admin/payments" element={<ProtectedRoute><AdminPayments /></ProtectedRoute>} />
                <Route path="/review-queue" element={<ProtectedRoute><ReviewQueue /></ProtectedRoute>} />
                <Route path="/verify-payment" element={<VerifyPayment />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
