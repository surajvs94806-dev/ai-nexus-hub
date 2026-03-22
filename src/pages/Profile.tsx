import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("display_name, bio")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setDisplayName(data.display_name || "");
            setBio(data.bio || "");
          }
        });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, bio })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast.error("Failed to save profile");
    } else {
      toast.success("Profile updated!");
    }
  };

  if (loading || !user) return null;

  return (
    <PageLayout>
      <div className="container max-w-lg py-8 animate-reveal-up">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        <div className="surface-elevated rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
              {(displayName || user.email)?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold">{displayName || "No name set"}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-secondary rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full bg-secondary rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
          <Button onClick={handleSave} disabled={saving} className="w-full">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
