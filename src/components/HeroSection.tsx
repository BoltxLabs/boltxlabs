import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/enhanced-button";
import heroImage from "@/assets/hero-robotics.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Building the Future of
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Robotics</span>
                <br />
                with AI and Innovation
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl text-balance">
                Affordable. Intelligent. Sustainable.
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl">
                We create intelligent robotics systems that integrate cutting-edge AI technology, 
                designed for students, researchers, and tech companies ready to shape tomorrow.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="group animate-tilt-hover"
              >
                Explore Our Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                className="animate-tilt-hover"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Students Reached</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Research Partners</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:order-last animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-2xl opacity-20 animate-float"></div>
              <img
                src={heroImage}
                alt="Modern robotics and AI systems"
                className="relative rounded-xl shadow-lg animate-tilt-hover w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;