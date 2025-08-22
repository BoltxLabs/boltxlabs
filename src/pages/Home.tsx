import HeroSection from "@/components/HeroSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { ArrowRight, Zap, Shield, Users, Lightbulb, Cpu, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "Cutting-edge robotics solutions that push the boundaries of what's possible."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sustainability",
      description: "Environmentally conscious designs that minimize ecological impact."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Accessibility",
      description: "Affordable technology that democratizes access to advanced robotics."
    }
  ];

  const projects = [
    {
      title: "Autonomous Navigation System",
      description: "AI-powered navigation for mobile robotics platforms with advanced obstacle detection.",
      category: "AI & Robotics"
    },
    {
      title: "Collaborative Robot Arms",
      description: "Safe, intelligent robotic arms designed for human-robot collaboration in workspaces.",
      category: "Automation"
    },
    {
      title: "Educational Robot Kits",
      description: "Comprehensive learning platforms that make robotics accessible to students and educators.",
      category: "Education"
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on principles that drive meaningful innovation in robotics and AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 text-center glass-card card-3d animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 text-primary-foreground animate-float neon-glow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 neon-text">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground">
                Discover our latest innovations in robotics and AI
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:block">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="p-6 glass-card card-3d group animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium neon-glow animate-pulse-glow">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors neon-text">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6">{project.description}</p>
                <Button variant="ghost" className="group-hover:bg-primary/20 transition-colors animate-tilt-hover neon-glow">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/projects">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Build the Future Together?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of innovators, researchers, and creators pushing the boundaries of robotics and AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="animate-tilt-hover">
              Join Our Community
              <Users className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="lg" asChild className="animate-tilt-hover">
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;