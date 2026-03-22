import { Heart } from "lucide-react";
import { Space, formatNumber } from "@/data/mock";

export default function SpaceCard({ space }: { space: Space }) {
  return (
    <div className="surface-interactive rounded-lg p-5 flex flex-col gap-3 text-center items-center">
      <span className="text-4xl">{space.emoji}</span>
      <div>
        <h3 className="font-semibold text-sm">{space.name}</h3>
        <p className="text-xs text-muted-foreground">{space.author}</p>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {space.description}
      </p>
      <div className="flex items-center gap-3 mt-auto pt-2 text-xs text-muted-foreground">
        <span className="tag text-[10px]">{space.runtime}</span>
        <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatNumber(space.likes)}</span>
      </div>
    </div>
  );
}
