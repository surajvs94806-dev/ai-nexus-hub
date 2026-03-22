import { Link } from "react-router-dom";
import { Download, Heart } from "lucide-react";
import { Model, formatNumber } from "@/data/mock";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <Link
      to={`/models/${model.id}`}
      className="surface-interactive rounded-lg p-4 flex flex-col gap-3 group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{model.author}</p>
          <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
            {model.name}
          </h3>
        </div>
        <span className="tag text-[11px] shrink-0">{model.task}</span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {model.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {model.tags.slice(0, 3).map((t) => (
          <span key={t} className="tag-primary tag text-[10px]">{t}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-auto pt-2 border-t border-border text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Download className="w-3 h-3" />{formatNumber(model.downloads)}</span>
        <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatNumber(model.likes)}</span>
        <span className="ml-auto">{model.updatedAt}</span>
      </div>
    </Link>
  );
}
