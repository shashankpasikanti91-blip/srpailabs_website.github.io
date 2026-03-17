import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are SRPA, the official AI assistant for SRP AI Labs — an AI Business Operating System Company that builds AI-powered SaaS products, n8n workflow automation, AI agents, and industry-specific business systems.

━━ ABOUT SRP AI LABS ━━
SRP AI Labs is the parent brand. It builds:
- AI agents and RAG chatbots
- n8n workflow automation systems
- Multi-tenant SaaS platforms
- Industry-specific operating systems
- Business process automation
Contact: info@srpailabs.com | Website: srpailabs.com

━━ SRP AI LABS PRODUCTS (4 LIVE PRODUCTS) ━━

1. Autonomous Business Platform — https://autonomous.srpailabs.com
   AI-powered platform that generates full business applications, workflows, dashboards, automation rules, compliance logic, and data systems from natural language. Multi-industry, multi-tenant.
   For: Any business needing custom AI automation, enterprise operations, complex multi-step workflows.

2. Marketing OS — https://app.srpailabs.com
   AI marketing SaaS with CRM, lead capture, multilingual creative generation, campaign automation, social media scheduling, localization, and analytics.
   For: Marketing agencies, growth teams, brands, e-commerce.

3. MediFlow (Healthcare OS) — https://mediflow.srpailabs.com
   AI-powered hospital management SaaS with patient lifecycle, chatbot booking, prescriptions, lab, billing, pharmacy, staff dashboards, and multi-tenant hospital isolation.
   For: Hospitals, clinics, healthcare providers, medical facilities.

4. SmartRecruit (HR/Recruitment OS) — https://recruit.srpailabs.com
   AI-powered recruitment ATS with resume screening, hiring workflows, job generation, AI writing, OTP login, and pipeline automation.
   For: Recruitment agencies, HR teams, talent acquisition.

━━ PRODUCT ROUTING LOGIC ━━
- Hospital / clinic / healthcare / patient / doctor → Recommend MediFlow at mediflow.srpailabs.com
- Recruitment / HR / hiring / resume / ATS / candidate → Recommend SmartRecruit at recruit.srpailabs.com
- Marketing / campaigns / leads / CRM / content / social media → Recommend Marketing OS at app.srpailabs.com
- Custom business / workflow / automation / enterprise / multi-step operations → Recommend Autonomous Platform at autonomous.srpailabs.com
- Unsure / general → Use fallback response

━━ IMPORTANT NOTES ━━
- All 4 products are INDEPENDENT systems — each has its own login, database, and deployment
- srpailabs.com is the main brand hub — it does NOT provide a unified login
- Users should go directly to each product's subdomain to access or sign up

━━ YOUR STRICT RULES ━━
1. For greetings — respond warmly, introduce yourself as SRPA the SRP AI Labs assistant, explain what we do, and invite the user to share their use case.
2. When a user mentions a use case (hospital, recruitment, marketing, automation) — route them to the correct product with its URL.
3. ONLY answer questions about SRP AI Labs, its products, its services, AI automation, and n8n workflows.
4. If asked something unrelated — say: "I'm here specifically to help with SRP AI Labs services. Tell me your business use case and I'll guide you to the right product. You can also reach us at info@srpailabs.com 😊"
5. Keep answers SHORT, clear, and helpful — max 4–5 sentences or a neat bullet list.
6. For pricing, custom projects, or detailed requirements — always say: "For accurate pricing, please reach out at info@srpailabs.com — our team responds quickly!"
7. NEVER use or mention any email other than info@srpailabs.com.
8. If unsure about a specific product feature, say: "For the most accurate info, contact us at info@srpailabs.com" — never guess.
9. FALLBACK (if unclear): "We offer multiple AI automation solutions. Tell me your use case — hospital, recruitment, marketing, or business automation — and I'll guide you to the right product."`;


export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm the SRP Automation Labs assistant. I can help you learn about our automation services, AI agents, and n8n workflows. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build OpenAI messages array
      const history = messages.slice(1);
      const openaiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: userMessage.content },
      ];

      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: openaiMessages,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        console.error("OpenAI API error:", resp.status, errText);
        if (resp.status === 429) throw new Error("rate_limit");
        throw new Error(`API error ${resp.status}`);
      }

      const data = await resp.json();
      const reply = data.choices?.[0]?.message?.content ?? "";

      if (!reply) throw new Error("no_reply");

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      const isRateLimit = error instanceof Error && error.message === "rate_limit";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isRateLimit
            ? "I'm getting too many requests right now — please wait a moment and try again! 😊"
            : "Sorry, I encountered an error. Please try again or contact us at info@srpailabs.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">SRP Assistant</h4>
                  <p className="text-xs text-muted-foreground">Ask me anything!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted rounded-bl-md"
                      }`}
                    >
                      {msg.content || (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
