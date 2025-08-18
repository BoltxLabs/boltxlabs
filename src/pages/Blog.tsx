import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "The Future of Human-Robot Collaboration",
    excerpt: "Exploring how collaborative robotics is reshaping industries and creating new possibilities for human-machine partnerships in the workplace.",
    author: "Dr. Sarah Chen",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Industry Insights",
    featured: true
  };

  const posts = [
    {
      title: "Building Accessible Robotics Education",
      excerpt: "How we're making advanced robotics concepts accessible to students and educators worldwide through innovative learning platforms.",
      author: "Emily Watson",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Education"
    },
    {
      title: "AI-Powered Autonomous Navigation: A Deep Dive",
      excerpt: "Technical insights into our latest navigation algorithms and how machine learning is revolutionizing robotic movement.",
      author: "Marcus Rodriguez",
      date: "March 5, 2024",
      readTime: "12 min read",
      category: "Technical"
    },
    {
      title: "Sustainable Robotics: Designing for the Planet",
      excerpt: "Our approach to creating environmentally conscious robotic systems that minimize ecological impact while maximizing efficiency.",
      author: "David Kim",
      date: "February 28, 2024",
      readTime: "7 min read",
      category: "Sustainability"
    },
    {
      title: "Open Source Robotics: Building Together",
      excerpt: "Why we believe in open source development and how the community is accelerating robotics innovation worldwide.",
      author: "Dr. Sarah Chen",
      date: "February 22, 2024",
      readTime: "5 min read",
      category: "Community"
    },
    {
      title: "From Lab to Market: Scaling Robotic Solutions",
      excerpt: "The challenges and opportunities in bringing cutting-edge research from academic labs to real-world applications.",
      author: "Marcus Rodriguez",
      date: "February 15, 2024",
      readTime: "9 min read",
      category: "Business"
    },
    {
      title: "Safety First: Designing Trustworthy Autonomous Systems",
      excerpt: "How we prioritize safety and reliability in autonomous robot design to build systems people can trust.",
      author: "Emily Watson",
      date: "February 8, 2024",
      readTime: "10 min read",
      category: "Safety"
    }
  ];

  const categories = ["All", "Technical", "Industry Insights", "Education", "Sustainability", "Community", "Business", "Safety"];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Technical": "bg-primary text-primary-foreground",
      "Industry Insights": "bg-accent text-accent-foreground",
      "Education": "bg-secondary text-secondary-foreground",
      "Sustainability": "bg-muted text-muted-foreground",
      "Community": "bg-primary/10 text-primary",
      "Business": "bg-accent/10 text-accent",
      "Safety": "bg-destructive/10 text-destructive"
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Insights & Innovation</h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Explore the latest developments in robotics, AI, and emerging technologies from our team of experts.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 animate-fade-in">Featured Article</h2>
            <Card className="p-8 hover:shadow-lg transition-all duration-normal animate-tilt-hover group animate-slide-up">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <Badge className={getCategoryColor(featuredPost.category)}>
                      {featuredPost.category}
                    </Badge>
                    <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center lg:justify-end">
                  <Button variant="hero" size="lg" className="group-hover:scale-105 transition-transform">
                    Read Article
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 animate-fade-in">Latest Articles</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-md transition-all duration-normal animate-tilt-hover group animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-4">
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                  
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary/10 transition-colors justify-between"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest articles, research updates, and industry insights delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button variant="secondary" size="lg" className="flex-1 animate-tilt-hover">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;