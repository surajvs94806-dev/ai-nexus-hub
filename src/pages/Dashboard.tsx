import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { Brain, Database, Layout, MessageSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("display_name, avatar_url, bio")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => setProfile(data));
    }
  }, [user]);

  if (loading || !user) return null;

  const quickLinks = [
    { icon: Brain, label: "Models", desc: "Browse AI models", href: "/models", color: "text-primary" },
    { icon: Database, label: "Datasets", desc: "Explore datasets", href: "/datasets", color: "text-info" },
    { icon: Layout, label: "Spaces", desc: "AI applications", href: "/spaces", color: "text-success" },
    { icon: MessageSquare, label: "Chat", desc: "AI assistant", href: "/chat", color: "text-warning" },
  ];

  return (
    <PageLayout>
      <div className="container py-8 max-w-4xl">
        <div className="animate-reveal-up">
          <div className="surface-elevated rounded-xl p-6 mb-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {(profile?.display_name || user.email)?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">
                Welcome, {profile?.display_name || user.email?.split("@")[0]}!
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile"><User className="w-4 h-4" /> Profile</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 animate-reveal-up stagger-1">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="surface-interactive rounded-xl p-5 flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
                <link.icon className={`w-5 h-5 ${link.color}`} />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{link.label}</h3>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
