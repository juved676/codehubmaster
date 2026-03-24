import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Clock, MapPin, MessageCircle, Send, HelpCircle, BookOpen } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:support@codehubmaster.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    toast({ title: "Opening your email client", description: "Your email client should open with the pre-filled message." });
  };

  return (
    <>
      <SEO
        title="Contact Us - CodeHubMaster"
        description="Get in touch with the CodeHubMaster team. We're here to help with questions about our AI coding assistant, account support, content feedback, and partnership inquiries."
        keywords="contact codehubmaster, support, help, feedback, partnership"
        canonical="https://codehubmaster.site/contact"
      />

      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, feedback, or need help? We'd love to hear from you. Our team is committed to responding to every inquiry within 24–48 hours during business days.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Send className="h-5 w-5 text-primary" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <MessageCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Thank You!</h3>
                    <p className="text-muted-foreground">Your email client should have opened with the message. If it didn't, please email us directly at <a href="mailto:support@codehubmaster.com" className="text-primary hover:underline">support@codehubmaster.com</a>.</p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="John Doe" required value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" required value={formData.subject} onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))} />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Please describe your question or feedback in detail..." rows={6} required value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg"><Mail className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                      <a href="mailto:support@codehubmaster.com" className="text-primary hover:underline">support@codehubmaster.com</a>
                      <p className="text-sm text-muted-foreground mt-1">For general inquiries, account support, and feedback.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg"><Clock className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
                      <p className="text-muted-foreground">We typically respond within 24–48 hours during business days (Monday–Friday).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg"><MapPin className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Our Presence</h3>
                      <p className="text-muted-foreground">CodeHubMaster operates as a global online education platform serving learners worldwide.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Common Topics We Can Help With
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Account issues, login problems, or password reset</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Questions about subscription plans or credits</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Feedback on AI-generated answers or content quality</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Bug reports or technical issues with the platform</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Content suggestions or topic requests</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Partnership and collaboration opportunities</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Advertising inquiries</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Helpful Resources
                  </h3>
                  <div className="space-y-2">
                    <Link to="/about-policy" className="block text-primary hover:underline text-sm">About CodeHubMaster →</Link>
                    <Link to="/privacy-policy" className="block text-primary hover:underline text-sm">Privacy Policy →</Link>
                    <Link to="/disclaimer" className="block text-primary hover:underline text-sm">Disclaimer →</Link>
                    <Link to="/pricing" className="block text-primary hover:underline text-sm">Pricing & Plans →</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
