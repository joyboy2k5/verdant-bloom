import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Send, X } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const botResponses = [
  "🌿 Just like plants need balanced nutrients, your mind needs balanced rest and stimulation. Try a 20-minute walk in nature today!",
  "💧 Soil moisture is key to crop health — similarly, staying hydrated boosts your cognitive performance by up to 30%.",
  "🍃 Consider companion planting principles for your study groups: diverse perspectives lead to stronger understanding, just like biodiversity strengthens ecosystems.",
  "🌱 Your wellness score reflects the same principles as plant health: consistent care over time yields the best growth.",
  "☀️ Morning sunlight benefits both your circadian rhythm and your crops. Start your day with 15 minutes of natural light!",
  "🌻 Crop rotation prevents soil depletion — rotate your study subjects to prevent mental fatigue. Switch topics every 45 minutes.",
];

export const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "🌿 Hello! I'm your BioSync Sustainability & Wellness Coach. Ask me anything about farm health or student wellbeing!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    const botMsg: Message = { role: "bot", text: botResponses[Math.floor(Math.random() * botResponses.length)] };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-forest shadow-ink flex items-center justify-center hover:bg-forest-deep transition-colors"
      >
        {open ? (
          <X className="w-5 h-5 text-primary-foreground" />
        ) : (
          <Leaf className="w-6 h-6 text-primary-foreground animate-float" strokeWidth={1.5} />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 max-h-[28rem] flex flex-col paper-card shadow-ink overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-botanical bg-forest/5">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-forest" strokeWidth={1.5} />
                <span className="font-display text-base font-semibold text-ink">BioSync Coach</span>
              </div>
              <p className="font-sans text-[10px] text-muted-foreground mt-0.5">Sustainability & Wellness</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg font-body text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-forest text-primary-foreground rounded-br-sm"
                        : "bg-mint-soft text-ink rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-botanical">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about farm or wellness..."
                  className="flex-1 px-3 py-2 rounded-lg bg-mint-soft/40 border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-forest/30"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center text-primary-foreground hover:bg-forest-deep transition-colors"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
