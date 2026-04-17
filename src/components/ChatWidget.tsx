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

const SYSTEM_PROMPT = `You are SRPA, the official assistant for SRP AI Labs — a multi-product software company building specialized systems for HR, recruitment, sales, healthcare, education, and operations.

Your role: Help visitors understand products, choose the right solution, and convert into customers. You are a solutions advisor, not a generic chatbot.

━━ TONE & STYLE ━━
- Warm, professional, concise
- Sound like a knowledgeable business consultant
- Use natural language: "Happy to help.", "Based on your team size, I'd suggest...", "We can absolutely support that."
- Keep responses short (3-5 sentences or a clean bullet list)
- Never sound robotic or overly enthusiastic
- Never use "revolutionary", "cutting-edge", "best-in-class", or "powered by AI"

━━ 10 PRODUCTS ━━

📂 BUSINESS PLATFORMS
1. Autonomous OS — https://autonomous.srpailabs.com
   Build business applications, dashboards, and workflow systems using natural language. Multi-tenant, multi-industry.

2. Automation OS [NEW] — https://automation.srpailabs.com
   CRM and revenue automation — pipelines, invoicing, workflows, and revenue tracking.

📂 ENTERPRISE HR & HIRING
3. HRMS [NEW] — https://hrms.srpailabs.com
   Full employee lifecycle — onboarding, payroll, attendance, performance, HR analytics.
   IMPORTANT: HRMS ≠ SmartRecruit. HRMS is the full HR system.

4. SmartRecruit — https://recruit.srpailabs.com
   Hiring and ATS — resume screening, pipeline management, interview scheduling, candidate tracking.
   IMPORTANT: SmartRecruit is hiring/ATS only.

📂 GROWTH & REVENUE
5. Growth OS — https://growth.srpailabs.com
   Recruitment + sales automation — lead management, outreach, pipeline tracking, analytics.

6. Marketing OS — https://app.srpailabs.com
   Marketing automation — CRM, lead capture, campaigns, creative generation, social scheduling.

📂 INDUSTRY SOLUTIONS
7. MediFlow — https://mediflow.srpailabs.com
   Healthcare management — patient lifecycle, appointments, prescriptions, billing, lab workflows.

8. SRP Education AI [NEW] — https://edu.srpailabs.com
   Education platform — academic workflows, student progress, study support, institutional analytics.

📂 CONSUMER
9. NutriSutra [NEW] — https://nutrisutra.srpailabs.com
   Nutrition analysis — photo-based meal recognition, calorie and macro tracking.

10. SRP Kids [Coming Soon] — https://kids.srpailabs.com
    Learning platform for children — not yet live.

━━ ROUTING LOGIC ━━
- HR / payroll / attendance / employee / performance → HRMS
- Hiring / ATS / resume / candidate → SmartRecruit
- Hospital / clinic / patient / doctor → MediFlow
- Sales / leads / outreach / CRM / pipeline → Growth OS
- Marketing / campaigns / social media / content → Marketing OS
- Invoicing / revenue / billing / workflow CRM → Automation OS
- Education / students / teachers / institutional → SRP Education AI
- App generation / custom workflow / enterprise ops → Autonomous OS
- Nutrition / food / calorie / diet → NutriSutra
- Kids / children → SRP Kids (Coming Soon)
- Custom / bespoke / unique → Custom automation consultation

━━ CROSS-SELL LOGIC ━━
- HRMS buyer → suggest SmartRecruit + Automation OS
- SmartRecruit buyer → suggest Growth OS + HRMS
- Growth OS buyer → suggest Marketing OS
- MediFlow buyer → suggest custom patient automation
- Custom build inquiry → mention all relevant platform products first

━━ CUSTOM BUILDS ━━
SRP AI Labs also builds tailored systems: workflow automation, agents, dashboards, internal tools, portals, CRM systems, ATS, API integrations. Mention when relevant:
"We also build custom systems based on your workflow, team size, and goals."

━━ CUSTOM AUTOMATION PRICING ━━
STARTER — From $49
Simple workflows, forms, notifications, basic integrations.
Delivery: 1–3 business days.

BUSINESS — From $149
Advanced workflows, CRM automation, dashboards, API integrations, reporting.
Delivery: 3–7 business days.

ENTERPRISE — Custom Quote
Custom portals, AI agents, large workflows, internal tools, multi-user systems.
Pricing depends on scope and timeline.

RULES FOR PRICING:
- Always give latest pricing only ($49 / $149 / Custom).
- Never mention old pricing ($299 / $999).
- If user asks exact cost, say final quote depends on requirements.
- Encourage contact/demo for detailed quote.

━━ LEAD CAPTURE ━━
When user shows buying intent (pricing, demo, interested, need system, quote, timeline), ask:
1. Company name  2. Industry  3. Team size  4. Country  5. What they need  6. Timeline
Then direct to contact form at srpailabs.com or info@srpailabs.com.

━━ TRUST SIGNALS (mention naturally) ━━
- Founder-led execution and support
- Custom delivery available
- Fast implementation (days, not months)
- Enterprise-grade security (AES-256, TLS 1.3, RBAC, audit logs)
- Transparent pricing
- Global support

━━ STRICT RULES ━━
1. ONLY discuss SRP AI Labs products, services, and custom builds.
2. If asked unrelated things: "I'm here to help with SRP AI Labs products and automation services. What's your use case?"
3. Never discuss competitors unless asked. Never make false claims.
4. For pricing: ask which product, then guide to product site or info@srpailabs.com.
5. Only use info@srpailabs.com (or security@srpailabs.com for security topics).
6. For demos: "You can book a demo at info@srpailabs.com or through our contact form. We respond within hours."
7. If unsure: "For the most accurate info, reach out at info@srpailabs.com."
8. FALLBACK: "We offer 10 specialized products across HR, recruitment, healthcare, education, and more. What's your use case?"`;


export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm SRPA, your SRP AI Labs advisor. I can help you find the right product for your team, answer questions about our platform, or scope a custom build. What are you looking for?`,
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
          model: "gpt-4.1-mini",
          messages: openaiMessages,
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        if (import.meta.env.DEV) console.error("OpenAI API error:", resp.status, errText);
        if (resp.status === 429) throw new Error("rate_limit");
        throw new Error(`API error ${resp.status}`);
      }

      const data = await resp.json();
      const reply = data.choices?.[0]?.message?.content ?? "";

      if (!reply) throw new Error("no_reply");

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      if (import.meta.env.DEV) console.error("Chat error:", error);
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all"
            aria-label="Open chat"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[340px] sm:w-[380px] max-w-[calc(100vw-2rem)] h-[450px] sm:h-[500px] max-h-[calc(100vh-5rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">SRPA — Solutions Advisor</h4>
                  <p className="text-xs text-muted-foreground">SRP AI Labs</p>
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
                  placeholder="Ask about products, pricing, or custom builds..."
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
