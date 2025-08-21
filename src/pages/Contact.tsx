import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, Clock, Github, MessageCircle, Youtube } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
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
      // Store contact message
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([{
          ...formData,
          status: 'new',
          created_at: new Date().toISOString()
        }]);

      if (dbError) throw dbError;

      // Send notification email to admin
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'contact_message',
          data: formData,
          timestamp: new Date().toISOString()
        }
      });

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours."
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "hello@boltxlabs.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri, 9am-6pm PST"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      details: "San Francisco, CA",
      description: "By appointment only"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      details: "< 24 hours",
      description: "Average response time"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      name: "GitHub",
      url: "#",
      description: "Open source projects"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      name: "Discord",
      url: "#",
      description: "Join our community"
    },
    {
      icon: <Youtube className="w-6 h-6" />,
      name: "YouTube",
      url: "#",
      description: "Educational content"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Ready to collaborate or have questions about our robotics solutions? 
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass-card p-8 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6 neon-text">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="glass-card"
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
                        placeholder="your@email.com"
                        className="glass-card"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="glass-card"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your project or inquiry..."
                      rows={6}
                      className="glass-card"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full sm:w-auto neon-glow"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <Card 
                      key={index} 
                      className="p-4 hover:shadow-md transition-all duration-normal animate-tilt-hover"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground flex-shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{info.title}</h4>
                          <p className="text-sm font-medium text-primary">{info.details}</p>
                          <p className="text-xs text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
                <h3 className="text-xl font-semibold mb-6">Connect with Us</h3>
                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <Card 
                      key={index} 
                      className="p-4 hover:shadow-md transition-all duration-normal animate-tilt-hover cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {social.icon}
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">{social.name}</h4>
                          <p className="text-xs text-muted-foreground">{social.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <Card className="p-6 bg-gradient-primary text-primary-foreground animate-fade-in" style={{ animationDelay: "600ms" }}>
                <h3 className="text-lg font-semibold mb-3">Looking for partnerships?</h3>
                <p className="text-sm opacity-90 mb-4">
                  We're always interested in collaborating with researchers, 
                  educational institutions, and innovative companies.
                </p>
                <Link to="/partnership">
                  <Button variant="secondary" size="sm" className="animate-tilt-hover neon-glow">
                    Partnership Opportunities
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "What industries do you serve?",
                answer: "We work with educational institutions, research labs, manufacturing companies, and tech startups across various industries."
              },
              {
                question: "Do you offer custom solutions?",
                answer: "Yes! We specialize in creating custom robotics solutions tailored to your specific needs and requirements."
              },
              {
                question: "What's your typical project timeline?",
                answer: "Project timelines vary based on complexity, but most projects range from 3-12 months from concept to delivery."
              },
              {
                question: "Do you provide training and support?",
                answer: "Absolutely. We offer comprehensive training, documentation, and ongoing technical support for all our solutions."
              }
            ].map((faq, index) => (
              <Card 
                key={index} 
                className="p-6 animate-fade-in animate-tilt-hover"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h3 className="font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;