import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, Users, Target, BookOpen, Code, Brain, Shield, Rocket, Heart } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

const AboutPolicy = () => {
  return (
    <>
      <SEO
        title="About Us - CodeHubMaster | AI-Powered Coding Education Platform"
        description="Learn about CodeHubMaster's mission to provide free, high-quality AI-powered programming education. Meet our vision, values, and the story behind the platform."
        keywords="about codehubmaster, AI coding education, programming platform, learn to code, coding assistant"
        canonical="https://codehubmaster.site/about-policy"
      />

      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">About CodeHubMaster</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering learners worldwide with free, AI-powered programming education since 2026.
            </p>
          </div>

          {/* Our Story */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                CodeHubMaster was born from a simple but powerful idea: <strong className="text-foreground">high-quality programming education should be accessible to everyone, regardless of their background, location, or financial situation.</strong> In a world where technology skills are increasingly essential for career success, too many aspiring developers face barriers to learning — expensive courses, outdated materials, and lack of personalized guidance.
              </p>
              <p>
                Founded by Sohail, a passionate technologist and educator, CodeHubMaster set out to change this by leveraging the latest advances in artificial intelligence. Our platform uses AI technology including GPT-4, Claude, and Gemini to provide instant, accurate, and personalized answers to programming questions across multiple languages and skill levels.
              </p>
              <p>
                What started as a small project to help local students with Python and web development questions has grown into a comprehensive learning platform serving thousands of users worldwide. Today, CodeHubMaster offers extensive guides, tutorials, and an AI-powered question-answering system covering Python, JavaScript, React, data science, machine learning, and many more topics.
              </p>
              <p>
                We believe that the best way to learn programming is by doing — asking questions, writing code, making mistakes, and understanding why things work the way they do. Our AI assistant is designed to be the patient, knowledgeable tutor that every student deserves, available 24 hours a day, 7 days a week.
              </p>
            </CardContent>
          </Card>

          {/* Our Mission */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">To democratize programming education by providing free, accurate, and comprehensive AI-powered learning resources that empower individuals to achieve their coding goals and build successful careers in technology.</strong>
              </p>
              <p>
                We are committed to breaking down the barriers that prevent people from learning to code. Whether you're a school student exploring programming for the first time, a college student deepening your computer science knowledge, a self-taught developer building your skills, or a professional looking to upskill with AI and machine learning, CodeHubMaster is here to support your journey.
              </p>
              <p>
                Our mission extends beyond just providing answers. We aim to foster genuine understanding of programming concepts, encourage creative problem-solving, and help our users develop the confidence to tackle real-world coding challenges independently.
              </p>
            </CardContent>
          </Card>

          {/* What We Offer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Rocket className="h-6 w-6 text-primary" />
                What We Offer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    AI-Powered Q&A
                  </h3>
                  <p>Ask any coding question and receive detailed, accurate answers with working code examples in seconds. Our AI understands context and provides explanations tailored to your skill level.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    Comprehensive Guides
                  </h3>
                  <p>In-depth tutorials and articles on Python, web development, AI tools, data science, machine learning, and emerging technologies. All content is carefully curated for accuracy and relevance.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Multi-Level Learning
                  </h3>
                  <p>Content designed for school students, college learners, and researchers. Our platform adapts to your level, providing appropriate explanations whether you're a beginner or an advanced developer.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Quality Assurance
                  </h3>
                  <p>Every AI-generated answer goes through quality checks to ensure accuracy. Our review system helps maintain high standards across all content on the platform.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Values */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Accessibility</h3>
                  <p>We believe education should be available to everyone. Our free tier ensures that financial constraints never prevent someone from learning to code. We offer generous free credits so that every user can experience the value of AI-assisted learning.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Accuracy</h3>
                  <p>We are committed to providing correct, well-tested, and up-to-date information. Our AI models are selected for their accuracy, and our content goes through review processes to maintain quality. We continuously improve our content based on user feedback and technological advances.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Transparency</h3>
                  <p>We are transparent about the nature of our AI-generated content, our data practices, and our business model. We clearly label AI-generated answers, maintain comprehensive privacy and disclaimer policies, and communicate openly with our users about how the platform works.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Continuous Improvement</h3>
                  <p>Technology evolves rapidly, and so do we. We regularly update our content, improve our AI models, add new features, and expand our topic coverage to ensure CodeHubMaster remains a valuable and relevant learning resource for our community.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms of Service */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">1. Acceptance of Terms</h3>
                <p>By accessing and using CodeHubMaster, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">2. Content Usage Guidelines</h3>
                <p>All content provided on CodeHubMaster is for educational purposes only. While we strive for accuracy, we recommend verifying critical information from multiple sources. You may use the content for personal learning and educational purposes. Commercial redistribution of our content requires prior written permission.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">3. User Responsibilities</h3>
                <p>Users are expected to use the platform responsibly. You agree not to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Submit spam, malicious content, or inappropriate questions</li>
                  <li>Attempt to circumvent security measures or abuse the platform</li>
                  <li>Use automated systems to scrape content without permission</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">4. Credit System</h3>
                <p>Our platform uses a credit-based system for asking questions. Credits are provided according to your subscription plan. Unused credits may expire according to plan terms. Free users receive a limited number of credits each month.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">5. Limitation of Liability</h3>
                <p>CodeHubMaster provides educational content "as is" without warranties. We are not liable for any damages arising from the use of our platform or reliance on the information provided. Please review our <Link to="/disclaimer" className="text-primary hover:underline">Disclaimer</Link> for full details.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">6. Changes to Terms</h3>
                <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We value your feedback and are always here to help. Whether you have questions about the platform, suggestions for new features, or need technical support, don't hesitate to reach out.
              </p>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a href="mailto:support@codehubmaster.com" className="text-primary hover:underline">support@codehubmaster.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
                  <p className="text-muted-foreground">We typically respond within 24–48 hours during business days.</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/contact" className="text-primary hover:underline text-sm font-medium">Contact Form →</Link>
                <Link to="/privacy-policy" className="text-primary hover:underline text-sm font-medium">Privacy Policy →</Link>
                <Link to="/disclaimer" className="text-primary hover:underline text-sm font-medium">Disclaimer →</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AboutPolicy;
