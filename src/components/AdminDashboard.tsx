import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/contexts/NotificationContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Eye, EyeOff, Trash2, Plus, Send, Users, FileText, Settings, MessageSquare, 
  Handshake, Edit, Save, X, Globe, Mail, Phone, MapPin, Github, MessageCircle, 
  Youtube, Linkedin, Twitter 
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
  updated_at: string;
}

interface Partnership {
  id: string;
  company: string;
  email: string;
  phone: string | null;
  partnership_type: string;
  description: string;
  budget: string | null;
  timeline: string | null;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

interface SiteContent {
  id: string;
  content_type: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  is_published: boolean;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author: string;
  category: string;
  tags: string[] | null;
  status: string;
  is_featured: boolean;
  read_time: number | null;
  created_at: string;
  updated_at: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  email: string | null;
  display_order: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const AdminDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSettings, setEditingSettings] = useState<{[key: string]: boolean}>({});
  
  const [newContent, setNewContent] = useState({
    content_type: '',
    title: '',
    content: '',
    image_url: ''
  });

  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    excerpt: '',
    featured_image_url: '',
    author: 'Bolt X Labs',
    category: 'Technology',
    tags: '',
    status: 'draft',
    is_featured: false,
    read_time: 5
  });

  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    position: '',
    bio: '',
    image_url: '',
    linkedin_url: '',
    github_url: '',
    email: '',
    display_order: 0
  });

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'info' | 'warning' | 'error',
    icon: 'bell' as 'bell' | 'message' | 'users' | 'blog'
  });
  
  const { user } = useAuth();
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (user && user.email === 'boltx.1700@gmail.com') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [contactsRes, partnershipsRes, contentRes, blogsRes, teamRes, settingsRes] = await Promise.all([
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
        supabase.from('partnerships').select('*').order('created_at', { ascending: false }),
        supabase.from('site_content').select('*').order('display_order', { ascending: true }),
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('team_members').select('*').order('display_order', { ascending: true }),
        supabase.from('site_settings').select('*').order('setting_key', { ascending: true })
      ]);

      if (contactsRes.error) throw contactsRes.error;
      if (partnershipsRes.error) throw partnershipsRes.error;
      if (contentRes.error) throw contentRes.error;
      if (blogsRes.error) throw blogsRes.error;
      if (teamRes.error) throw teamRes.error;
      if (settingsRes.error) throw settingsRes.error;

      setContacts((contactsRes.data || []) as Contact[]);
      setPartnerships((partnershipsRes.data || []) as Partnership[]);
      setSiteContent(contentRes.data || []);
      setBlogs(blogsRes.data || []);
      setTeamMembers(teamRes.data || []);
      setSiteSettings(settingsRes.data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch data: " + error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, contentType: string) => {
    setNewContent(prev => ({ ...prev, [contentType]: e.target.value }));
  };

  const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setNewBlog(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleTeamMemberInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setNewTeamMember(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleContentSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .insert([
          {
            content_type: newContent.content_type,
            title: newContent.title,
            content: newContent.content,
            image_url: newContent.image_url,
            is_published: true,
            display_order: siteContent.length + 1
          }
        ]);

      if (error) throw error;

      setSiteContent([...siteContent, ...(data || [])]);
      setNewContent({ content_type: '', title: '', content: '', image_url: '' });

      toast({
        title: "Success",
        description: "Content added successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add content: " + error.message,
        variant: "destructive"
      });
    }
  };

  const handleBlogSubmit = async () => {
    try {
      const tagsArray = newBlog.tags ? newBlog.tags.split(',').map(tag => tag.trim()) : [];

      const { data, error } = await supabase
        .from('blogs')
        .insert([
          {
            title: newBlog.title,
            content: newBlog.content,
            excerpt: newBlog.excerpt,
            featured_image_url: newBlog.featured_image_url,
            author: newBlog.author,
            category: newBlog.category,
            tags: tagsArray,
            status: newBlog.status,
            is_featured: newBlog.is_featured,
            read_time: newBlog.read_time
          }
        ]);

      if (error) throw error;

      setBlogs([...blogs, ...(data || [])]);
      setNewBlog({
        title: '',
        content: '',
        excerpt: '',
        featured_image_url: '',
        author: 'Bolt X Labs',
        category: 'Technology',
        tags: '',
        status: 'draft',
        is_featured: false,
        read_time: 5
      });

      toast({
        title: "Success",
        description: "Blog post added successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add blog post: " + error.message,
        variant: "destructive"
      });
    }
  };

  const handleTeamMemberSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert([
          {
            name: newTeamMember.name,
            position: newTeamMember.position,
            bio: newTeamMember.bio,
            image_url: newTeamMember.image_url,
            linkedin_url: newTeamMember.linkedin_url,
            github_url: newTeamMember.github_url,
            email: newTeamMember.email,
            display_order: newTeamMember.display_order,
            is_active: true
          }
        ]);

      if (error) throw error;

      setTeamMembers([...teamMembers, ...(data || [])]);
      setNewTeamMember({
        name: '',
        position: '',
        bio: '',
        image_url: '',
        linkedin_url: '',
        github_url: '',
        email: '',
        display_order: 0
      });

      toast({
        title: "Success",
        description: "Team member added successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add team member: " + error.message,
        variant: "destructive"
      });
    }
  };

  const updateContactStatus = async (id: string, status: Contact['status']) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status } : contact
      ));

      toast({
        title: "Success",
        description: "Contact status updated"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update contact: " + error.message,
        variant: "destructive"
      });
    }
  };

  const updatePartnershipStatus = async (id: string, status: Partnership['status']) => {
    try {
      const { error } = await supabase
        .from('partnerships')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setPartnerships(partnerships.map(partnership => 
        partnership.id === id ? { ...partnership, status } : partnership
      ));

      toast({
        title: "Success",
        description: "Partnership status updated"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update partnership: " + error.message,
        variant: "destructive"
      });
    }
  };

  if (!user || user.email !== 'boltx.1700@gmail.com') {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access the admin dashboard.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your site content, team, blog posts, and user interactions.</p>
        </div>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid grid-cols-7 w-full">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="partnerships" className="flex items-center gap-2">
              <Handshake className="w-4 h-4" />
              Partnerships
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Site Settings</h2>
              <p className="text-sm text-muted-foreground mb-4">Manage your site's editable content and social links.</p>
              <div className="space-y-4">
                {siteSettings.map((setting) => (
                  <div key={setting.id} className="border rounded p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{setting.setting_key.replace(/_/g, ' ').toUpperCase()}</h4>
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                        <div className="mt-2">
                          {editingSettings[setting.id] ? (
                            <div className="flex gap-2">
                              <Input
                                value={setting.setting_value}
                                onChange={(e) => setSiteSettings(siteSettings.map(s => 
                                  s.id === setting.id ? {...s, setting_value: e.target.value} : s
                                ))}
                                className="flex-1"
                              />
                              <Button size="sm" onClick={() => {
                                // Update setting
                                supabase.from('site_settings').update({ setting_value: setting.setting_value }).eq('id', setting.id);
                                setEditingSettings(prev => ({ ...prev, [setting.id]: false }));
                              }}>
                                <Save className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center">
                              <p className="text-sm bg-muted p-2 rounded flex-1 mr-2">{setting.setting_value}</p>
                              <Button variant="outline" size="sm" onClick={() => setEditingSettings(prev => ({ ...prev, [setting.id]: true }))}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border rounded p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{contact.name} - {contact.subject}</h4>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        <p className="text-sm mt-2">{contact.message}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={contact.status === 'new' ? 'destructive' : 'default'}>
                          {contact.status}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => updateContactStatus(contact.id, contact.status === 'new' ? 'read' : 'replied')}>
                          Mark as {contact.status === 'new' ? 'Read' : 'Replied'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="partnerships" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Partnership Applications</h2>
              <div className="space-y-4">
                {partnerships.map((partnership) => (
                  <div key={partnership.id} className="border rounded p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{partnership.company}</h4>
                        <p className="text-sm text-muted-foreground">{partnership.email}</p>
                        <p className="text-sm mt-2">{partnership.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge>{partnership.status}</Badge>
                        <Select value={partnership.status} onValueChange={(value) => updatePartnershipStatus(partnership.id, value as Partnership['status'])}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_review">In Review</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="blogs" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Blog Management</h2>
              
              {/* Add New Blog */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Add New Blog Post</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="blog-title">Title</Label>
                    <Input
                      id="blog-title"
                      value={newBlog.title}
                      onChange={(e) => handleBlogInputChange(e, 'title')}
                      placeholder="Blog post title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-author">Author</Label>
                    <Input
                      id="blog-author"
                      value={newBlog.author}
                      onChange={(e) => handleBlogInputChange(e, 'author')}
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-category">Category</Label>
                    <Input
                      id="blog-category"
                      value={newBlog.category}
                      onChange={(e) => handleBlogInputChange(e, 'category')}
                      placeholder="Category"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-tags">Tags (comma separated)</Label>
                    <Input
                      id="blog-tags"
                      value={newBlog.tags}
                      onChange={(e) => handleBlogInputChange(e, 'tags')}
                      placeholder="technology, ai, robotics"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-featured-image">Featured Image URL</Label>
                    <Input
                      id="blog-featured-image"
                      value={newBlog.featured_image_url}
                      onChange={(e) => handleBlogInputChange(e, 'featured_image_url')}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-read-time">Read Time (minutes)</Label>
                    <Input
                      type="number"
                      id="blog-read-time"
                      value={newBlog.read_time}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, read_time: parseInt(e.target.value) || 5 }))}
                      placeholder="5"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor="blog-excerpt">Excerpt</Label>
                  <Textarea
                    id="blog-excerpt"
                    value={newBlog.excerpt}
                    onChange={(e) => handleBlogInputChange(e, 'excerpt')}
                    placeholder="Brief description of the blog post..."
                    rows={3}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="blog-content">Content</Label>
                  <Textarea
                    id="blog-content"
                    value={newBlog.content}
                    onChange={(e) => handleBlogInputChange(e, 'content')}
                    placeholder="Full blog post content..."
                    rows={6}
                  />
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="blog-featured"
                      checked={newBlog.is_featured}
                      onCheckedChange={(checked) => setNewBlog(prev => ({ ...prev, is_featured: checked }))}
                    />
                    <Label htmlFor="blog-featured">Featured Post</Label>
                  </div>
                  <Select value={newBlog.status} onValueChange={(value) => setNewBlog(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleBlogSubmit} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Blog Post
                </Button>
              </div>

              {/* Existing Blogs */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Existing Blog Posts</h3>
                {blogs.map((blog) => (
                  <div key={blog.id} className="border rounded p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{blog.title}</h4>
                        <p className="text-sm text-muted-foreground">By {blog.author} • {blog.category}</p>
                        <p className="text-sm mt-2">{blog.excerpt}</p>
                        {blog.tags && (
                          <div className="flex gap-1 mt-2">
                            {blog.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                          {blog.status}
                        </Badge>
                        {blog.is_featured && <Badge variant="outline">Featured</Badge>}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            try {
                              const { error } = await supabase
                                .from('blogs')
                                .delete()
                                .eq('id', blog.id);
                              
                              if (error) throw error;
                              
                              setBlogs(blogs.filter(b => b.id !== blog.id));
                              toast({
                                title: "Success",
                                description: "Blog post deleted successfully"
                              });
                            } catch (error: any) {
                              toast({
                                title: "Error",
                                description: "Failed to delete blog post: " + error.message,
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Team Management</h2>
              
              {/* Add New Team Member */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Add New Team Member</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="team-name">Name</Label>
                    <Input
                      id="team-name"
                      value={newTeamMember.name}
                      onChange={(e) => handleTeamMemberInputChange(e, 'name')}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="team-position">Position</Label>
                    <Input
                      id="team-position"
                      value={newTeamMember.position}
                      onChange={(e) => handleTeamMemberInputChange(e, 'position')}
                      placeholder="Job title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="team-email">Email</Label>
                    <Input
                      id="team-email"
                      type="email"
                      value={newTeamMember.email}
                      onChange={(e) => handleTeamMemberInputChange(e, 'email')}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="team-image">Image URL</Label>
                    <Input
                      id="team-image"
                      value={newTeamMember.image_url}
                      onChange={(e) => handleTeamMemberInputChange(e, 'image_url')}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="team-linkedin">LinkedIn URL</Label>
                    <Input
                      id="team-linkedin"
                      value={newTeamMember.linkedin_url}
                      onChange={(e) => handleTeamMemberInputChange(e, 'linkedin_url')}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="team-github">GitHub URL</Label>
                    <Input
                      id="team-github"
                      value={newTeamMember.github_url}
                      onChange={(e) => handleTeamMemberInputChange(e, 'github_url')}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="team-order">Display Order</Label>
                    <Input
                      type="number"
                      id="team-order"
                      value={newTeamMember.display_order}
                      onChange={(e) => setNewTeamMember(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor="team-bio">Bio</Label>
                  <Textarea
                    id="team-bio"
                    value={newTeamMember.bio}
                    onChange={(e) => handleTeamMemberInputChange(e, 'bio')}
                    placeholder="Brief bio about the team member..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleTeamMemberSubmit} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Team Member
                </Button>
              </div>

              {/* Existing Team Members */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Team Members</h3>
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        {member.image_url && (
                          <img src={member.image_url} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                        )}
                        <div>
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                          {member.email && <p className="text-sm">{member.email}</p>}
                          {member.bio && <p className="text-sm mt-2">{member.bio}</p>}
                          <div className="flex gap-2 mt-2">
                            {member.linkedin_url && (
                              <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-4 h-4 text-blue-600" />
                              </a>
                            )}
                            {member.github_url && (
                              <a href={member.github_url} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={member.is_active ? 'default' : 'secondary'}>
                          {member.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            try {
                              const { error } = await supabase
                                .from('team_members')
                                .update({ is_active: !member.is_active })
                                .eq('id', member.id);
                              
                              if (error) throw error;
                              
                              setTeamMembers(teamMembers.map(m => 
                                m.id === member.id ? { ...m, is_active: !m.is_active } : m
                              ));
                              
                              toast({
                                title: "Success",
                                description: `Team member ${member.is_active ? 'deactivated' : 'activated'}`
                              });
                            } catch (error: any) {
                              toast({
                                title: "Error",
                                description: "Failed to update team member: " + error.message,
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          {member.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            try {
                              const { error } = await supabase
                                .from('team_members')
                                .delete()
                                .eq('id', member.id);
                              
                              if (error) throw error;
                              
                              setTeamMembers(teamMembers.filter(m => m.id !== member.id));
                              toast({
                                title: "Success",
                                description: "Team member deleted successfully"
                              });
                            } catch (error: any) {
                              toast({
                                title: "Error",
                                description: "Failed to delete team member: " + error.message,
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Site Content Management</h2>
              
              {/* Add New Content */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Add New Content Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select value={newContent.content_type} onValueChange={(value) => setNewContent(prev => ({ ...prev, content_type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hero">Hero Section</SelectItem>
                        <SelectItem value="about">About Section</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="projects">Projects</SelectItem>
                        <SelectItem value="testimonials">Testimonials</SelectItem>
                        <SelectItem value="footer">Footer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="content-title">Title</Label>
                    <Input
                      id="content-title"
                      value={newContent.title}
                      onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Content title"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="content-image">Image URL</Label>
                    <Input
                      id="content-image"
                      value={newContent.image_url}
                      onChange={(e) => setNewContent(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor="content-content">Content</Label>
                  <Textarea
                    id="content-content"
                    value={newContent.content}
                    onChange={(e) => setNewContent(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Content text..."
                    rows={4}
                  />
                </div>
                <Button onClick={handleContentSubmit} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Content
                </Button>
              </div>

              {/* Existing Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Existing Content Sections</h3>
                {siteContent.map((content) => (
                  <div key={content.id} className="border rounded p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{content.title || content.content_type}</h4>
                        <p className="text-sm text-muted-foreground">Type: {content.content_type}</p>
                        {content.content && <p className="text-sm mt-2">{content.content.slice(0, 100)}...</p>}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={content.is_published ? 'default' : 'secondary'}>
                          {content.is_published ? 'Published' : 'Draft'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            try {
                              const { error } = await supabase
                                .from('site_content')
                                .update({ is_published: !content.is_published })
                                .eq('id', content.id);
                              
                              if (error) throw error;
                              
                              setSiteContent(siteContent.map(c => 
                                c.id === content.id ? { ...c, is_published: !c.is_published } : c
                              ));
                              
                              toast({
                                title: "Success",
                                description: `Content ${content.is_published ? 'unpublished' : 'published'}`
                              });
                            } catch (error: any) {
                              toast({
                                title: "Error",
                                description: "Failed to update content: " + error.message,
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          {content.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            try {
                              const { error } = await supabase
                                .from('site_content')
                                .delete()
                                .eq('id', content.id);
                              
                              if (error) throw error;
                              
                              setSiteContent(siteContent.filter(c => c.id !== content.id));
                              toast({
                                title: "Success",
                                description: "Content deleted successfully"
                              });
                            } catch (error: any) {
                              toast({
                                title: "Error",
                                description: "Failed to delete content: " + error.message,
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Send Notifications</h2>
              <p className="text-sm text-muted-foreground mb-6">Send real-time notifications that appear as dynamic islands to all users browsing the site.</p>
              
              {/* Send Notification Form */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Send New Notification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="notification-title">Title</Label>
                    <Input
                      id="notification-title"
                      value={newNotification.title}
                      onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Notification title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notification-type">Type</Label>
                    <Select 
                      value={newNotification.type} 
                      onValueChange={(value) => setNewNotification(prev => ({ ...prev, type: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notification-icon">Icon</Label>
                    <Select 
                      value={newNotification.icon} 
                      onValueChange={(value) => setNewNotification(prev => ({ ...prev, icon: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bell">Bell (General)</SelectItem>
                        <SelectItem value="message">Message</SelectItem>
                        <SelectItem value="users">Users</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor="notification-message">Message</Label>
                  <Textarea
                    id="notification-message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Notification message..."
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={() => {
                    if (newNotification.title && newNotification.message) {
                      addNotification({
                        title: newNotification.title,
                        message: newNotification.message,
                        type: newNotification.type,
                        icon: newNotification.icon
                      });
                      
                      // Also store in database for record keeping
                      supabase.from('notifications').insert([{
                        title: newNotification.title,
                        message: newNotification.message,
                        notification_type: newNotification.type,
                        target_audience: 'all',
                        is_sent: true,
                        sent_at: new Date().toISOString(),
                        created_by: user?.id
                      }]);
                      
                      setNewNotification({
                        title: '',
                        message: '',
                        type: 'info',
                        icon: 'bell'
                      });
                      
                      toast({
                        title: "Success",
                        description: "Notification sent successfully!"
                      });
                    } else {
                      toast({
                        title: "Error",
                        description: "Please fill in all required fields",
                        variant: "destructive"
                      });
                    }
                  }} 
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Notification
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20"
                    onClick={() => {
                      addNotification({
                        title: "New Blog Post Published!",
                        message: "Check out our latest insights on robotics and AI technology.",
                        type: "success",
                        icon: "blog"
                      });
                      toast({ title: "Blog notification sent!" });
                    }}
                  >
                    <FileText className="w-6 h-6" />
                    <span className="text-sm">New Blog Alert</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20"
                    onClick={() => {
                      addNotification({
                        title: "Team Update",
                        message: "Our team is growing! Welcome our new members to Bolt X Labs.",
                        type: "info",
                        icon: "users"
                      });
                      toast({ title: "Team update sent!" });
                    }}
                  >
                    <Users className="w-6 h-6" />
                    <span className="text-sm">Team Update</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20"
                    onClick={() => {
                      addNotification({
                        title: "System Maintenance",
                        message: "Scheduled maintenance will begin in 30 minutes. Expected downtime: 15 minutes.",
                        type: "warning",
                        icon: "bell"
                      });
                      toast({ title: "Maintenance alert sent!" });
                    }}
                  >
                    <Settings className="w-6 h-6" />
                    <span className="text-sm">Maintenance Alert</span>
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
