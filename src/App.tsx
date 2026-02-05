import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";

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
const AboutPolicy = lazy(() => import("./pages/AboutPolicy"));
const ReviewQueue = lazy(() => import("./pages/ReviewQueue"));
const VerifyPayment = lazy(() => import("./pages/VerifyPayment"));
const AITechnology = lazy(() => import("./pages/AITechnology"));
const HostingGuide = lazy(() => import("./pages/HostingGuide"));
const AICodingForBeginners = lazy(() => import("./pages/AICodingForBeginners"));
const PythonWithAI = lazy(() => import("./pages/PythonWithAI"));
const WebDevelopmentWithAI = lazy(() => import("./pages/WebDevelopmentWithAI"));
const AIProjectsForStudents = lazy(() => import("./pages/AIProjectsForStudents"));
const HowAIHelpsInCoding = lazy(() => import("./pages/HowAIHelpsInCoding"));
const FreeAICodingTools = lazy(() => import("./pages/FreeAICodingTools"));
const AIToolsDataScience = lazy(() => import("./pages/AIToolsDataScience"));
const AICodingSkillsJobs = lazy(() => import("./pages/AICodingSkillsJobs"));
const EDATutorial = lazy(() => import("./pages/EDATutorial"));
const AICapabilitiesGuide = lazy(() => import("./pages/AICapabilitiesGuide"));
const AIToolsMegaGuide = lazy(() => import("./pages/AIToolsMegaGuide"));
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
          <div className="min-h-screen bg-background flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/ask" element={<Ask />} />
                  <Route path="/topics" element={<Topics />} />
                  <Route path="/questions" element={<Topics />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/about-policy" element={<AboutPolicy />} />
                  <Route path="/ai-technology" element={<AITechnology />} />
                  <Route path="/hosting-guide" element={<HostingGuide />} />
                  <Route path="/ai-coding-for-beginners" element={<AICodingForBeginners />} />
                  <Route path="/python-with-ai" element={<PythonWithAI />} />
                  <Route path="/web-development-with-ai" element={<WebDevelopmentWithAI />} />
                  <Route path="/ai-projects-for-students" element={<AIProjectsForStudents />} />
                  <Route path="/how-ai-helps-in-coding" element={<HowAIHelpsInCoding />} />
                  <Route path="/free-ai-coding-tools-for-beginners" element={<FreeAICodingTools />} />
                  <Route path="/ai-tools-for-data-science" element={<AIToolsDataScience />} />
                  <Route path="/ai-coding-skills-for-jobs-2025" element={<AICodingSkillsJobs />} />
                  <Route path="/eda-tutorial-python" element={<EDATutorial />} />
                  <Route path="/question/data-science/ds-5" element={<EDATutorial />} />
                  <Route path="/ai-capabilities-guide" element={<AICapabilitiesGuide />} />
                  <Route path="/ai-tools-mega-guide-2025" element={<AIToolsMegaGuide />} />
                  <Route path="/auth" element={<Auth />} />
                  
                  {/* Topic pages - consolidated to single dynamic route */}
                  <Route path="/topic/:topic" element={<TopicDetail />} />
                  <Route path="/python-basics" element={<TopicDetail />} />
                  <Route path="/data-science" element={<TopicDetail />} />
                  <Route path="/web-development" element={<TopicDetail />} />
                  <Route path="/machine-learning" element={<TopicDetail />} />
                  <Route path="/devops-basics" element={<TopicDetail />} />
                  
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
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
