import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, ExternalLink, Filter } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const categories = ["All", "AI & Robotics", "Automation", "Education", "Research"];
  
  const projects = [
    {
      title: "Autonomous Navigation System",
      description: "Advanced AI-powered navigation system for mobile robotics platforms featuring real-time obstacle detection, path planning, and adaptive learning capabilities.",
      category: "AI & Robotics",
      tags: ["Machine Learning", "Computer Vision", "SLAM"],
      status: "Active",
      featured: true
    },
    {
      title: "Collaborative Robot Arms",
      description: "Safe, intelligent robotic arms designed for seamless human-robot collaboration in manufacturing and research environments.",
      category: "Automation",
      tags: ["Safety Systems", "Industrial IoT", "Collaborative Robotics"],
      status: "Active",
      featured: true
    },
    {
      title: "Educational Robot Kits",
      description: "Comprehensive learning platforms that make robotics accessible to students and educators with hands-on programming experiences.",
      category: "Education",
      tags: ["STEM Education", "Programming", "Hardware Design"],
      status: "Shipping",
      featured: false
    },
    {
      title: "Swarm Intelligence Platform",
      description: "Distributed robotics system enabling multiple robots to work together intelligently for complex task completion.",
      category: "Research",
      tags: ["Swarm Robotics", "Distributed Systems", "AI Coordination"],
      status: "Development",
      featured: true
    },
    {
      title: "Voice-Controlled Assistant Robot",
      description: "Personal assistant robot with natural language processing capabilities for home and office environments.",
      category: "AI & Robotics",
      tags: ["NLP", "Voice Recognition", "Smart Home"],
      status: "Beta",
      featured: false
    },
    {
      title: "Precision Assembly System",
      description: "High-precision robotic assembly system for electronics manufacturing with sub-millimeter accuracy.",
      category: "Automation",
      tags: ["Precision Control", "Manufacturing", "Quality Assurance"],
      status: "Active",
      featured: false
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-accent text-accent-foreground";
      case "Development": return "bg-primary text-primary-foreground";
      case "Beta": return "bg-secondary text-secondary-foreground";
      case "Shipping": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Discover our latest innovations in robotics and AI that are shaping the future of technology.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b bg-background/95 backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground mr-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className="transition-all duration-fast"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={index} 
                className={`p-6 hover:shadow-lg transition-all duration-normal animate-tilt-hover group animate-fade-in ${
                  project.featured ? 'ring-2 ring-primary/20' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {project.featured && (
                  <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <Badge 
                    variant="secondary" 
                    className="text-xs"
                  >
                    {project.category}
                  </Badge>
                  <Badge 
                    className={`text-xs ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="outline" 
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 group-hover:bg-primary-hover transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">
            Have a Project Idea?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're always looking for new challenges and collaboration opportunities. 
            Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="animate-tilt-hover">
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="animate-tilt-hover">
              View Open Source
              <Github className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;