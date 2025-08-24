import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Mail, Building, Calendar, Eye, Check, X, Plus, Globe, Settings } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

interface Partnership {
  id: string;
  company: string;
  email: string;
  phone?: string;
  partnership_type: string;
  description: string;
  budget?: string;
  timeline?: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  created_at: string;
}

interface SiteContent {
  id: string;
  content_type: string;
  title?: string;
  content?: string;
  image_url?: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

export const AdminDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState({
    content_type: '',
    title: '',
    content: '',
    image_url: ''
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [contactsRes, partnershipsRes, contentRes] = await Promise.all([
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
        supabase.from('partnerships').select('*').order('created_at', { ascending: false }),
        supabase.from('site_content').select('*').order('display_order', { ascending: true })
      ]);

      if (contactsRes.data) setContacts(contactsRes.data as Contact[]);
      if (partnershipsRes.data) setPartnerships(partnershipsRes.data as Partnership[]);
      if (contentRes.data) setSiteContent(contentRes.data as SiteContent[]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: Contact['status']) => {
    try {
      await supabase.from('contacts').update({ status }).eq('id', id);
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      toast({ title: "Status updated successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const updatePartnershipStatus = async (id: string, status: Partnership['status']) => {
    try {
      await supabase.from('partnerships').update({ status }).eq('id', id);
      setPartnerships(prev => prev.map(p => p.id === id ? { ...p, status } : p));
      toast({ title: "Status updated successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const createContent = async () => {
    if (!newContent.content_type || !newContent.title) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase.from('site_content').insert([{
        ...newContent,
        admin_id: user?.id
      }]).select();

      if (error) throw error;

      if (data) {
        setSiteContent(prev => [...prev, data[0]]);
        setNewContent({ content_type: '', title: '', content: '', image_url: '' });
        toast({ title: "Content created successfully" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create content",
        variant: "destructive"
      });
    }
  };

  const toggleContentPublished = async (id: string, isPublished: boolean) => {
    try {
      await supabase.from('site_content').update({ is_published: isPublished }).eq('id', id);
      setSiteContent(prev => prev.map(c => c.id === id ? { ...c, is_published: isPublished } : c));
      toast({ 
        title: isPublished ? "Content published" : "Content unpublished",
        description: isPublished ? "Content is now visible to everyone" : "Content is now hidden"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive"
      });
    }
  };

  const deleteContent = async (id: string) => {
    try {
      await supabase.from('site_content').delete().eq('id', id);
      setSiteContent(prev => prev.filter(c => c.id !== id));
      toast({ title: "Content deleted successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive"
      });
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Card className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 neon-text">Access Denied</h2>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 neon-text">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage contacts and partnership applications</p>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Site Content ({siteContent.length})
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contacts ({contacts.length})
            </TabsTrigger>
            <TabsTrigger value="partnerships" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Partnerships ({partnerships.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Plus className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Create New Content</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type *</Label>
                  <Input
                    id="content-type"
                    value={newContent.content_type}
                    onChange={(e) => setNewContent(prev => ({ ...prev, content_type: e.target.value }))}
                    placeholder="e.g., hero, feature, testimonial"
                    className="glass-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content-title">Title *</Label>
                  <Input
                    id="content-title"
                    value={newContent.title}
                    onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Content title"
                    className="glass-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content-image">Image URL</Label>
                  <Input
                    id="content-image"
                    value={newContent.image_url}
                    onChange={(e) => setNewContent(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="glass-card"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="content-content">Content</Label>
                  <Textarea
                    id="content-content"
                    value={newContent.content}
                    onChange={(e) => setNewContent(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Content text or description"
                    className="glass-card"
                    rows={3}
                  />
                </div>
              </div>
              <Button onClick={createContent} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Create Content
              </Button>
            </Card>

            <div className="space-y-4">
              {siteContent.map((content) => (
                <Card key={content.id} className="glass-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="capitalize">
                          {content.content_type}
                        </Badge>
                        <Badge 
                          variant={content.is_published ? "default" : "secondary"}
                        >
                          {content.is_published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg">{content.title}</h3>
                      {content.content && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {content.content}
                        </p>
                      )}
                      {content.image_url && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Image: {content.image_url}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(content.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      variant={content.is_published ? "secondary" : "default"}
                      onClick={() => toggleContentPublished(content.id, !content.is_published)}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {content.is_published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button 
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteContent(content.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            {contacts.length === 0 ? (
              <Card className="glass-card p-8 text-center">
                <p className="text-muted-foreground">No contact messages yet.</p>
              </Card>
            ) : (
              contacts.map((contact) => (
                <Card key={contact.id} className="glass-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={contact.status === 'new' ? 'default' : contact.status === 'read' ? 'secondary' : 'outline'}
                        className="capitalize"
                      >
                        {contact.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(contact.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">{contact.subject}</h4>
                    <p className="text-sm text-muted-foreground">{contact.message}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {contact.status === 'new' && (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => updateContactStatus(contact.id, 'read')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Mark as Read
                      </Button>
                    )}
                    {contact.status !== 'replied' && (
                      <Button 
                        size="sm"
                        onClick={() => updateContactStatus(contact.id, 'replied')}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Mark as Replied
                      </Button>
                    )}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="partnerships" className="space-y-4">
            {partnerships.length === 0 ? (
              <Card className="glass-card p-8 text-center">
                <p className="text-muted-foreground">No partnership applications yet.</p>
              </Card>
            ) : (
              partnerships.map((partnership) => (
                <Card key={partnership.id} className="glass-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{partnership.company}</h3>
                      <p className="text-sm text-muted-foreground">{partnership.email}</p>
                      {partnership.phone && (
                        <p className="text-sm text-muted-foreground">{partnership.phone}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          partnership.status === 'pending' ? 'default' : 
                          partnership.status === 'reviewing' ? 'secondary' :
                          partnership.status === 'approved' ? 'outline' : 'destructive'
                        }
                        className="capitalize"
                      >
                        {partnership.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(partnership.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Partnership Type</p>
                      <p className="text-sm text-muted-foreground capitalize">{partnership.partnership_type.replace('_', ' ')}</p>
                    </div>
                    {partnership.budget && (
                      <div>
                        <p className="text-sm font-medium">Budget</p>
                        <p className="text-sm text-muted-foreground">{partnership.budget}</p>
                      </div>
                    )}
                    {partnership.timeline && (
                      <div>
                        <p className="text-sm font-medium">Timeline</p>
                        <p className="text-sm text-muted-foreground">{partnership.timeline}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Description</p>
                    <p className="text-sm text-muted-foreground">{partnership.description}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {partnership.status === 'pending' && (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => updatePartnershipStatus(partnership.id, 'reviewing')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Start Review
                      </Button>
                    )}
                    {partnership.status !== 'approved' && partnership.status !== 'rejected' && (
                      <>
                        <Button 
                          size="sm"
                          onClick={() => updatePartnershipStatus(partnership.id, 'approved')}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => updatePartnershipStatus(partnership.id, 'rejected')}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};