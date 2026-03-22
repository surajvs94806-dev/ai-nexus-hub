import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Explain transformer architecture",
  "Write a Python function to sort a list",
  "What is fine-tuning in machine learning?",
  "Compare GPT and BERT",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `That's a great question about "${text.trim().slice(0, 50)}". This is a demo response — connect Lovable Cloud to enable real AI streaming responses powered by LLMs.`,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <PageLayout>
      <div className="flex flex-col h-[calc(100vh-3.5rem-3.5rem)]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="container max-w-2xl py-16 text-center animate-reveal-up">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Suraj AI Assistant</h1>
              <p className="text-muted-foreground mb-8">Ask anything about AI, ML, or code.</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="surface-interactive rounded-lg p-3 text-left text-sm hover:border-primary/30 transition-colors active:scale-[0.98]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="container max-w-2xl py-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 animate-reveal-up ${m.role === "user" ? "" : ""}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    m.role === "user" ? "bg-secondary" : "bg-primary/10"
                  }`}>
                    {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {m.role === "user" ? "You" : "Suraj AI"}
                    </p>
                    <p className="text-sm leading-relaxed">{m.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="pt-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-border bg-card p-4">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="container max-w-2xl flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-secondary rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
