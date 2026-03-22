import { Download, Database } from "lucide-react";
import { Dataset, formatNumber } from "@/data/mock";

export default function DatasetCard({ dataset }: { dataset: Dataset }) {
  return (
    <div className="surface-interactive rounded-lg p-4 flex flex-col gap-3">
      <div>
        <p className="text-xs text-muted-foreground">{dataset.author}</p>
        <h3 className="font-semibold text-sm">{dataset.name}</h3>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {dataset.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {dataset.tags.slice(0, 3).map((t) => (
          <span key={t} className="tag text-[10px]">{t}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-auto pt-2 border-t border-border text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Download className="w-3 h-3" />{formatNumber(dataset.downloads)}</span>
        <span className="flex items-center gap-1"><Database className="w-3 h-3" />{dataset.size}</span>
        <span className="ml-auto">{dataset.updatedAt}</span>
      </div>
    </div>
  );
}
