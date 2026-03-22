import { Link } from "react-router-dom";
import { ArrowRight, Brain, Database, Layout, MessageSquare, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import ModelCard from "@/components/cards/ModelCard";
import DatasetCard from "@/components/cards/DatasetCard";
import SpaceCard from "@/components/cards/SpaceCard";
import { models, datasets, spaces } from "@/data/mock";

function SectionHeader({ icon: Icon, title, href }: { icon: React.ElementType; title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <Icon className="w-5 h-5 text-primary" />
        {title}
      </h2>
      <Link to={href} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        View all <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function Index() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-card border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-2xl animate-reveal-up">
            <div className="tag-primary tag mb-4">Open AI Platform</div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-4">
              Discover, share &amp; deploy <span className="text-gradient">AI models</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              The collaborative hub for machine learning. Explore thousands of models, datasets, and AI applications built by the community.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="xl" asChild>
                <Link to="/models">Explore Models</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/chat"><MessageSquare className="w-4 h-4" /> Try Chat Assistant</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 animate-reveal-up stagger-2">
            {[
              { icon: Brain, label: "Models", value: "450K+" },
              { icon: Database, label: "Datasets", value: "120K+" },
              { icon: Layout, label: "Spaces", value: "85K+" },
              { icon: TrendingUp, label: "Monthly Users", value: "3.2M" },
            ].map((s) => (
              <div key={s.label} className="surface-elevated rounded-lg p-4 text-center">
                <s.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold tabular-nums">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Models */}
      <section className="container py-12 animate-reveal-up stagger-3">
        <SectionHeader icon={Sparkles} title="Trending Models" href="/models" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {models.slice(0, 4).map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </section>

      {/* Datasets */}
      <section className="container py-12 animate-reveal-up stagger-4">
        <SectionHeader icon={Database} title="Popular Datasets" href="/datasets" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {datasets.slice(0, 3).map((d) => (
            <DatasetCard key={d.id} dataset={d} />
          ))}
        </div>
      </section>

      {/* Spaces */}
      <section className="container py-12 pb-16 animate-reveal-up stagger-5">
        <SectionHeader icon={Layout} title="Featured Spaces" href="/spaces" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {spaces.map((s) => (
            <SpaceCard key={s.id} space={s} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
