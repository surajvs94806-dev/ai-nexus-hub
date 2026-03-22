import { useState } from "react";
import { Search } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import DatasetCard from "@/components/cards/DatasetCard";
import { datasets } from "@/data/mock";

export default function Datasets() {
  const [search, setSearch] = useState("");

  const filtered = datasets.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.author.toLowerCase().includes(search.toLowerCase()) ||
    d.tags.some((t) => t.includes(search.toLowerCase()))
  );

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="mb-8 animate-reveal-up">
          <h1 className="text-3xl font-extrabold mb-2">Dataset Hub</h1>
          <p className="text-muted-foreground">Browse curated datasets for training and evaluation.</p>
        </div>

        <div className="flex items-center bg-card border border-border rounded-lg px-3 py-2 gap-2 max-w-md mb-6 animate-reveal-up stagger-1">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search datasets..."
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-reveal-up stagger-2">
          {filtered.map((d) => <DatasetCard key={d.id} dataset={d} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium mb-1">No datasets found</p>
            <p className="text-sm">Try a different search term.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
