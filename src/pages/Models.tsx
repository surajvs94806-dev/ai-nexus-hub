import { useState } from "react";
import { Search } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ModelCard from "@/components/cards/ModelCard";
import { models, taskFilters } from "@/data/mock";

export default function Models() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = models.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.author.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((t) => t.includes(search.toLowerCase()));
    const matchesFilter = activeFilter === "All" || m.task === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="mb-8 animate-reveal-up">
          <h1 className="text-3xl font-extrabold mb-2">Model Hub</h1>
          <p className="text-muted-foreground">Discover and use thousands of community-built AI models.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-reveal-up stagger-1">
          <div className="flex items-center bg-card border border-border rounded-lg px-3 py-2 gap-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search models..."
              className="bg-transparent text-sm outline-none w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 animate-reveal-up stagger-2">
          {taskFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors active:scale-[0.97] ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-reveal-up stagger-3">
          {filtered.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium mb-1">No models found</p>
            <p className="text-sm">Try a different search or filter.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
