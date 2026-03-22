import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <span className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-black">S</span>
          Suraj AI Hub
        </div>
        <div className="flex gap-6">
          <Link to="/models" className="hover:text-foreground transition-colors">Models</Link>
          <Link to="/datasets" className="hover:text-foreground transition-colors">Datasets</Link>
          <Link to="/spaces" className="hover:text-foreground transition-colors">Spaces</Link>
          <Link to="/chat" className="hover:text-foreground transition-colors">Chat</Link>
        </div>
        <p>© 2026 Suraj AI Hub</p>
      </div>
    </footer>
  );
}
