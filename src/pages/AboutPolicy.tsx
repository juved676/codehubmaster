import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock } from "lucide-react";
import { SEO } from "@/components/SEO";

const AboutPolicy = () => {
  return (
    <>
      <SEO 
        title="About & Policy - CodeHubMaster"
        description="Learn about CodeHubMaster's mission to provide free programming education. Read our terms of service and contact information."
        keywords="about codehubmaster, programming education, terms of service, contact"
      />
      
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-foreground">
            About & Policy
          </h1>

          {/* SECTION 1: ABOUT CODEHUBMASTER */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">About CodeHubMaster</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                CodeHubMaster is a comprehensive platform dedicated to providing free, high-quality programming education to learners worldwide. Our mission is to make coding knowledge accessible to everyone, regardless of their background or financial situation.
              </p>
              <p>
                We leverage artificial intelligence and expert-curated content to deliver accurate, detailed answers to programming questions across multiple languages and difficulty levels. Whether you're a school student taking your first steps in coding, a college student deepening your knowledge, or a researcher exploring advanced concepts, CodeHubMaster is here to support your learning journey.
              </p>
              <p>
                <strong>Our Mission:</strong> To democratize programming education by providing free, accurate, and comprehensive learning resources that empower individuals to achieve their coding goals and build successful careers in technology.
              </p>
              <p>
                Founded by passionate technologists who believe in the power of education to transform lives, CodeHubMaster continues to grow and evolve to meet the needs of our global learning community.
              </p>
            </CardContent>
          </Card>

          {/* SECTION 2: TERMS OF SERVICE */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using CodeHubMaster, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">2. Content Usage Guidelines</h3>
                <p>
                  All content provided on CodeHubMaster is for educational purposes only. While we strive for accuracy, we recommend verifying critical information from multiple sources. You may use the content for personal learning and educational purposes. Commercial redistribution of our content requires prior written permission.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">3. User Responsibilities</h3>
                <p>
                  Users are expected to use the platform responsibly and respectfully. You agree not to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Submit spam, malicious content, or inappropriate questions</li>
                  <li>Attempt to circumvent security measures or abuse the platform</li>
                  <li>Use automated systems to scrape content without permission</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">4. Credit System</h3>
                <p>
                  Our platform uses a credit-based system for asking questions. Credits are provided according to your subscription plan. Unused credits may expire according to plan terms.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">5. Limitation of Liability</h3>
                <p>
                  CodeHubMaster provides educational content "as is" without warranties. We are not liable for any damages arising from the use of our platform or reliance on the information provided.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">6. Changes to Terms</h3>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 3: CONTACT INFORMATION */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                We're here to help! If you have questions, feedback, or need support, please don't hesitate to reach out to us.
              </p>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a 
                    href="mailto:support@codehubmaster.com" 
                    className="text-primary hover:underline"
                  >
                    support@codehubmaster.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
                  <p className="text-muted-foreground">
                    We typically respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> For technical issues with your account or questions, please include your account email and a detailed description of the issue to help us assist you faster.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AboutPolicy;
