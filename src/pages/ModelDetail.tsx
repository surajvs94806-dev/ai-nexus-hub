import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Heart, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { models, formatNumber } from "@/data/mock";

export default function ModelDetail() {
  const { id } = useParams();
  const model = models.find((m) => m.id === id);
  const [copied, setCopied] = useState(false);

  if (!model) {
    return (
      <PageLayout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Model not found.</p>
          <Button variant="outline" className="mt-4" asChild><Link to="/models"><ArrowLeft className="w-4 h-4" /> Back</Link></Button>
        </div>
      </PageLayout>
    );
  }

  const codeSnippet = `from transformers import pipeline\n\npipe = pipeline("${model.task.toLowerCase().replace(/ /g, "-")}", model="${model.author.toLowerCase()}/${model.id}")\nresult = pipe("Your input here")\nprint(result)`;

  const apiSnippet = `curl https://api.suraj-ai-hub.com/models/${model.id}/predict \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"inputs": "Your input here"}'`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <PageLayout>
      <div className="container py-8 max-w-4xl">
        <Link to="/models" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Models
        </Link>

        <div className="animate-reveal-up">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{model.author}</p>
              <h1 className="text-3xl font-extrabold">{model.name}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Heart className="w-4 h-4" /> {formatNumber(model.likes)}</Button>
              <Button size="sm"><Download className="w-4 h-4" /> Download</Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="tag-primary tag">{model.task}</span>
            {model.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>

          <div className="surface-elevated rounded-lg p-6 mb-6">
            <h2 className="font-bold mb-3">About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{model.description}</p>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Downloads</p><p className="font-bold tabular-nums">{formatNumber(model.downloads)}</p></div>
              <div><p className="text-xs text-muted-foreground">Likes</p><p className="font-bold tabular-nums">{formatNumber(model.likes)}</p></div>
              <div><p className="text-xs text-muted-foreground">Updated</p><p className="font-bold">{model.updatedAt}</p></div>
            </div>
          </div>

          <div className="surface-elevated rounded-lg p-6 mb-6 animate-reveal-up stagger-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold">Usage</h2>
              <Button variant="ghost" size="sm" onClick={() => handleCopy(codeSnippet)}>
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre className="code-block text-xs leading-relaxed overflow-x-auto"><code>{codeSnippet}</code></pre>
          </div>

          <div className="surface-elevated rounded-lg p-6 animate-reveal-up stagger-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold">API</h2>
              <Button variant="ghost" size="sm" onClick={() => handleCopy(apiSnippet)}>
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre className="code-block text-xs leading-relaxed overflow-x-auto"><code>{apiSnippet}</code></pre>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
