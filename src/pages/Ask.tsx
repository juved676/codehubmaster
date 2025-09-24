import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, BookOpen, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Ask = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    question: "",
    language: "english",
    audience: "school"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, show a toast - this will be connected to Supabase backend later
    toast({
      title: "Question Submitted!",
      description: "Your question is being processed. You'll receive an answer shortly.",
    });
    
    // Reset form
    setFormData({
      title: "",
      question: "",
      language: "english",
      audience: "school"
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ask Your Question
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            سوال پوچھیں
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get comprehensive answers to your Islamic studies questions from AI-powered insights backed by trusted sources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Submit Your Question</CardTitle>
                <CardDescription>
                  Fill out the form below to get a comprehensive answer to your Islamic studies question.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Question Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Question Title *</Label>
                    <Input
                      id="title"
                      placeholder="What is your main question? / آپ کا بنیادی سوال کیا ہے؟"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  {/* Question Details */}
                  <div className="space-y-2">
                    <Label htmlFor="question">Question Details *</Label>
                    <Textarea
                      id="question"
                      placeholder="Please provide detailed context for your question. Include any specific aspects you'd like covered..."
                      className="min-h-[120px]"
                      value={formData.question}
                      onChange={(e) => handleInputChange("question", e.target.value)}
                      required
                    />
                  </div>

                  {/* Language Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Language</Label>
                      <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="urdu">اردو (Urdu)</SelectItem>
                          <SelectItem value="arabic">العربية (Arabic)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Audience Level */}
                    <div className="space-y-2">
                      <Label>Study Level</Label>
                      <Select value={formData.audience} onValueChange={(value) => handleInputChange("audience", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school">School Level (بنیادی)</SelectItem>
                          <SelectItem value="college">College Level (درمیانی)</SelectItem>
                          <SelectItem value="research">Research Level (اعلیٰ)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Submit Question / سوال جمع کریں
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guidelines Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Guidelines</CardTitle>
                <CardDescription>رہنمائی</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Be Specific</p>
                    <p className="text-xs text-muted-foreground">Include context and specific aspects you want covered</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Response Time</p>
                    <p className="text-xs text-muted-foreground">Most questions answered within 2-5 minutes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Human Review</p>
                    <p className="text-xs text-muted-foreground">Complex theological questions reviewed by scholars</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Topics Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
                <CardDescription>مقبول موضوعات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Prayer (Salah) Guidelines",
                    "Zakat Calculations",
                    "Fasting Rules",
                    "Hadith Authenticity",
                    "Quranic Interpretation"
                  ].map((topic, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => handleInputChange("title", `Question about ${topic}`)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="border-islamic-gold/20 bg-islamic-gold/5">
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground text-center">
                  <strong>Disclaimer:</strong> Answers are educational summaries and not formal fatwas. 
                  For personal religious rulings, consult qualified scholars.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ask;