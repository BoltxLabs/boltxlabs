import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Building, Users, Rocket, BookOpen } from "lucide-react";

const Partnership = () => {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    phone: "",
    partnershipType: "",
    description: "",
    budget: "",
    timeline: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!supabase) {
      toast({
        title: "Error",
        description: "Database not configured. Please check your environment variables.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      // Store partnership application
      const { error: dbError } = await supabase
        .from('partnerships')
        .insert([{
          ...formData,
          status: 'pending',
          created_at: new Date().toISOString()
        }]);

      if (dbError) throw dbError;

      // Send notification email
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'partnership_application',
          data: formData,
          timestamp: new Date().toISOString()
        }
      });

      toast({
        title: "Partnership Application Submitted!",
        description: "We'll review your application and get back to you within 48 hours."
      });

      // Reset form
      setFormData({
        company: "",
        email: "",
        phone: "",
        partnershipType: "",
        description: "",
        budget: "",
        timeline: ""
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit partnership application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const partnershipTypes = [
    { value: "research", label: "Research Collaboration", icon: <BookOpen className="w-5 h-5" /> },
    { value: "technology", label: "Technology Partnership", icon: <Rocket className="w-5 h-5" /> },
    { value: "education", label: "Educational Institution", icon: <Users className="w-5 h-5" /> },
    { value: "enterprise", label: "Enterprise Solutions", icon: <Building className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 neon-text">Partnership Opportunities</h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Join forces with Bolt X Labs to build the future of robotics and AI together.
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partnership Types</h2>
            <p className="text-lg text-muted-foreground">Choose the collaboration that fits your vision</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {partnershipTypes.map((type, index) => (
              <Card 
                key={type.value} 
                className="glass-card p-6 text-center animate-fade-in hover:neon-glow transition-all duration-normal"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 neon-glow">
                  {type.icon}
                </div>
                <h3 className="font-semibold mb-2">{type.label}</h3>
              </Card>
            ))}
          </div>

          {/* Partnership Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card p-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 neon-text">Partnership Application</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization *</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="glass-card"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="glass-card"
                      placeholder="contact@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="glass-card"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="partnershipType">Partnership Type *</Label>
                    <Select value={formData.partnershipType} onValueChange={(value) => setFormData({...formData, partnershipType: value})}>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="Select partnership type" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        {partnershipTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="glass-card"
                    placeholder="Tell us about your project, goals, and how we can collaborate..."
                    rows={5}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="under-10k">Under $10,000</SelectItem>
                        <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                        <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                        <SelectItem value="500k-plus">$500,000+</SelectItem>
                        <SelectItem value="discuss">To be discussed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="immediate">Immediate (1-3 months)</SelectItem>
                        <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                        <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                        <SelectItem value="long">Long-term (12+ months)</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full neon-glow"
                  disabled={loading}
                >
                  {loading ? "Submitting Application..." : "Submit Partnership Application"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Partner with Bolt X Labs?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cutting-Edge Technology",
                description: "Access to the latest AI and robotics innovations, developed by our expert team."
              },
              {
                title: "Flexible Collaboration",
                description: "We adapt to your needs, whether it's research, development, or implementation."
              },
              {
                title: "Proven Track Record",
                description: "50+ successful projects with educational institutions and tech companies."
              }
            ].map((benefit, index) => (
              <Card 
                key={index} 
                className="glass-card p-6 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <h3 className="font-semibold mb-3 neon-text">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;