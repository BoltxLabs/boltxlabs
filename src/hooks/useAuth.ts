import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'member';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  adminSignIn: (password: string) => Promise<{ error?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: session.user.email === 'admin@boltxlabs.com' ? 'admin' : 'member',
          created_at: session.user.created_at
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: session.user.email === 'admin@boltxlabs.com' ? 'admin' : 'member',
            created_at: session.user.created_at
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      return { error: 'Supabase not configured. Please check your environment variables.' };
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });

      if (error) return { error: error.message };
      
      // Send notification email to admin
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'new_member',
          email: email,
          timestamp: new Date().toISOString()
        }
      });

      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: 'Supabase not configured. Please check your environment variables.' };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) return { error: error.message };
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const adminSignIn = async (password: string) => {
    if (!supabase) {
      return { error: 'Supabase not configured. Please check your environment variables.' };
    }

    if (password !== 'BoltXLabs@27') {
      return { error: 'Invalid admin password' };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'admin@boltxlabs.com',
        password: 'BoltXLabs@27'
      });

      if (error) return { error: error.message };
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    adminSignIn
  };
};