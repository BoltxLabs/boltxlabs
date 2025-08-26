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
  
  const { user } = useAuth();
  const { toast } = useToast();

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
          <TabsList className="grid grid-cols-6 w-full">
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

          {/* Placeholder tabs for blogs, team, and content */}
          <TabsContent value="blogs"><Card className="p-6"><h2>Blog Management Coming Soon</h2></Card></TabsContent>
          <TabsContent value="team"><Card className="p-6"><h2>Team Management Coming Soon</h2></Card></TabsContent>
          <TabsContent value="content"><Card className="p-6"><h2>Content Management Coming Soon</h2></Card></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
