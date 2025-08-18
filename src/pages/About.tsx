import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Target, Eye, Heart, Users, Award, Rocket } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation",
      description: "We push the boundaries of robotics and AI, creating solutions that were once thought impossible."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Sustainability",
      description: "Every project we undertake considers environmental impact and long-term sustainability."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Accessibility",
      description: "We believe advanced technology should be accessible to everyone, not just the privileged few."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      expertise: "Robotics Engineering, AI Systems"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      expertise: "Machine Learning, Computer Vision"
    },
    {
      name: "Emily Watson",
      role: "Head of Research",
      expertise: "Autonomous Systems, Human-Robot Interaction"
    },
    {
      name: "David Kim",
      role: "Lead Designer",
      expertise: "Product Design, User Experience"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to democratize robotics"
    },
    {
      year: "2021",
      title: "First Product Launch",
      description: "Released our educational robot kit series"
    },
    {
      year: "2022",
      title: "Research Partnership",
      description: "Partnered with 15+ universities worldwide"
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Integrated advanced AI into all product lines"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Bolt X Labs</h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            We're on a mission to build intelligent, affordable, and sustainable robotics systems 
            that integrate AI technology for the next generation of innovators.
          </p>
          <div className="flex justify-center">
            <Button variant="hero" size="lg" className="animate-tilt-hover">
              <Rocket className="w-5 h-5" />
              Join Our Mission
            </Button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Bolt X Labs was born from a simple belief: advanced robotics and AI technology 
                  shouldn't be limited to well-funded corporations and elite institutions. 
                </p>
                <p>
                  Founded by a team of passionate engineers and researchers, we set out to create 
                  robotics solutions that are not only cutting-edge but also accessible to students, 
                  researchers, and small tech companies worldwide.
                </p>
                <p>
                  Today, we're proud to be working with educational institutions, research labs, 
                  and innovative companies to build the future of intelligent automation.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 animate-slide-up">
              <Card className="p-6 text-center animate-tilt-hover">
                <div className="text-2xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </Card>
              <Card className="p-6 text-center animate-tilt-hover">
                <div className="text-2xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Students Reached</div>
              </Card>
              <Card className="p-6 text-center animate-tilt-hover">
                <div className="text-2xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">University Partners</div>
              </Card>
              <Card className="p-6 text-center animate-tilt-hover">
                <div className="text-2xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Bolt X Labs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="p-8 text-center hover:shadow-md transition-all duration-normal animate-tilt-hover animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 text-primary-foreground">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The brilliant minds behind Bolt X Labs' innovations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className="p-6 text-center hover:shadow-md transition-all duration-normal animate-tilt-hover animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold mb-2">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.expertise}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in our mission to democratize robotics
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row gap-6 items-start animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold">
                    {milestone.year}
                  </div>
                </div>
                <Card className="flex-1 p-6 animate-tilt-hover">
                  <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;