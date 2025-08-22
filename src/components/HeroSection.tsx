import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/enhanced-button";
import heroImage from "@/assets/hero-robotics.jpg";
import FloatingElements3D from "./FloatingElements3D";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background with 3D gradient */}
      <div className="absolute inset-0 bg-gradient-subtle"></div>
      <div className="absolute inset-0 bg-gradient-glow animate-pulse-glow opacity-20"></div>
      
      {/* 3D Floating Elements */}
      <FloatingElements3D />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in card-3d">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Building the Future of
                <span className="bg-gradient-primary bg-clip-text text-transparent neon-text animate-pulse-glow"> Robotics</span>
                <br />
                with AI and Innovation
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl text-balance neon-text">
                Affordable. Intelligent. Sustainable.
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl">
                We create intelligent robotics systems that integrate cutting-edge AI technology, 
                designed for students, researchers, and tech companies ready to shape tomorrow.
              </p>
            </div>

            {/* Enhanced CTA Buttons with 3D effects */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="group neon-glow animate-tilt-hover"
              >
                Explore Our Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                className="glass-card animate-tilt-hover"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Enhanced Stats with 3D effects */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-primary/20">
              <div className="text-center sm:text-left animate-tilt-hover">
                <div className="text-2xl font-bold text-primary neon-text animate-pulse-glow">50+</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div className="text-center sm:text-left animate-tilt-hover">
                <div className="text-2xl font-bold text-primary neon-text animate-pulse-glow">1000+</div>
                <div className="text-sm text-muted-foreground">Students Reached</div>
              </div>
              <div className="text-center sm:text-left animate-tilt-hover">
                <div className="text-2xl font-bold text-primary neon-text animate-pulse-glow">15+</div>
                <div className="text-sm text-muted-foreground">Research Partners</div>
              </div>
            </div>
          </div>

          {/* Enhanced Hero Image with 3D effects */}
          <div className="lg:order-last animate-slide-up">
            <div className="relative card-3d">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-2xl opacity-30 animate-float neon-glow"></div>
              <div className="absolute -inset-4 bg-gradient-accent rounded-xl blur-xl opacity-20 animate-morph"></div>
              <img
                src={heroImage}
                alt="Modern robotics and AI systems"
                className="relative rounded-xl shadow-lg animate-tilt-hover w-full h-auto object-cover glass-card border-primary/30 floating-3d"
              />
              {/* 3D overlay effects */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary/40 rounded-full animate-pulse-glow blur-sm"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-accent/40 rounded-lg animate-float"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;