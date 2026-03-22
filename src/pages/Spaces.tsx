import PageLayout from "@/components/layout/PageLayout";
import SpaceCard from "@/components/cards/SpaceCard";
import { spaces } from "@/data/mock";

export default function Spaces() {
  return (
    <PageLayout>
      <div className="container py-8">
        <div className="mb-8 animate-reveal-up">
          <h1 className="text-3xl font-extrabold mb-2">Spaces</h1>
          <p className="text-muted-foreground">Interactive AI applications built by the community.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 animate-reveal-up stagger-1">
          {spaces.map((s) => <SpaceCard key={s.id} space={s} />)}
        </div>
      </div>
    </PageLayout>
  );
}
