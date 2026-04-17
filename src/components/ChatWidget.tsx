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

const SYSTEM_PROMPT = `You are SRPA, the official AI assistant for SRP AI Labs — a multi-product software company that builds specialized business systems for HR, recruitment, sales, healthcare, education, and operations. SRP AI Labs combines practical AI, workflow automation, and clean interfaces to help teams operate better.

━━ ABOUT SRP AI LABS ━━
SRP AI Labs is a multi-product platform offering:
• 10 specialized software products (Enterprise + Industry + Consumer)
• Custom workflow automation and integrations
• Industry-specific solutions — HR, Recruitment, Sales, Healthcare, Education, Nutrition

Contact: info@srpailabs.com | Website: srpailabs.com

━━ HOW SRP AI LABS TECHNOLOGY WORKS ━━
SRP products use contextual intelligence and workflow automation to:
• UNDERSTAND CONTEXT — Process inputs from data, user actions, and prior interactions
• RECOMMEND ACTIONS — Surface the right next step based on patterns and context
• EXECUTE WORKFLOWS — Run multi-step processes automatically with 500+ integrations
• LEARN & IMPROVE — Adapt based on outcomes, feedback, and usage patterns

Technical stack: modern AI models, n8n orchestration (500+ integrations), Supabase, secure sandboxed execution, RBAC + audit logs.

━━ SRP AI LABS — 10 PRODUCTS ━━

📂 BUSINESS PLATFORMS
1. Autonomous OS — https://autonomous.srpailabs.com
   Generate full business applications, dashboards, and workflow systems from natural language — multi-tenant and multi-industry.
   For: Any business needing custom workflow automation, enterprise operations, or application generation.

2. Automation OS [NEW] — https://automation.srpailabs.com
   CRM and revenue automation — manage pipelines, automate invoicing, orchestrate workflows, and track revenue from one system.
   For: Businesses needing CRM, revenue automation, invoicing, and workflow management.

📂 ENTERPRISE HR & HIRING
3. HRMS [NEW] — https://hrms.srpailabs.com
   Complete human resource management — full employee lifecycle from onboarding to payroll, performance, attendance, and HR analytics. Built to replace legacy systems.
   For: HR departments, enterprises, companies managing full employee lifecycle.
   IMPORTANT: HRMS is the full employee lifecycle system. It is NOT the same as SmartRecruit.

4. SmartRecruit — https://recruit.srpailabs.com
   Hiring and applicant tracking — AI-powered resume screening, pipeline management, interview scheduling, and candidate tracking for modern recruitment teams.
   For: Recruitment agencies, HR talent acquisition teams, hiring managers.
   IMPORTANT: SmartRecruit is ONLY for the hiring/ATS process. For full HRMS, recommend hrms.srpailabs.com.

📂 GROWTH & REVENUE
5. Growth OS — https://growth.srpailabs.com
   Recruitment + sales automation — unified lead and candidate management with automated outreach, pipeline tracking, and growth analytics.
   For: Sales teams, growth teams, agencies, B2B businesses.

6. Marketing OS — https://app.srpailabs.com
   Marketing automation — CRM, lead capture, campaign management, multilingual creative generation, social scheduling, and performance analytics.
   For: Marketing agencies, growth teams, brands, e-commerce.

📂 INDUSTRY SOLUTIONS
7. MediFlow — https://mediflow.srpailabs.com
   Healthcare management — hospital management with patient lifecycle, appointment booking, prescriptions, billing, lab workflows, and multi-tenant isolation.
   For: Hospitals, clinics, healthcare providers, medical facilities.

8. SRP Education AI [NEW] — https://edu.srpailabs.com
   Education and institutional platform — academic workflows, student progress tracking, AI study support, and institutional analytics.
   For: Schools, universities, educational institutions, students and teachers.

📂 CONSUMER PRODUCTS
9. NutriSutra [NEW] — https://nutrisutra.srpailabs.com
   AI nutrition analysis — snap a photo or describe a meal for instant calorie, macro, and nutritional breakdown.
   For: Health-conscious individuals, fitness apps, nutritionists, diet tracking.

10. SRP Kids [Coming Soon] — https://kids.srpailabs.com
    Learning platform for children — adaptive lessons, gamified challenges, and personalized learning paths.
    For: Parents, kids, educators — not yet live.

━━ CUSTOM AUTOMATION ━━
SRP AI Labs builds custom systems using:
• Workflow automation with AI-powered decision logic
• Document intelligence and data processing
• Custom software development with modern AI models
• CRM & internal tools, multi-tenant SaaS builds
Contact info@srpailabs.com for custom projects.

━━ PRODUCT ROUTING LOGIC ━━
- Hospital / clinic / healthcare / patient / doctor → MediFlow at mediflow.srpailabs.com
- Recruitment / ATS / hiring / resume / candidate pipeline → SmartRecruit at recruit.srpailabs.com
- Full HRMS / HR software / employee lifecycle / payroll / attendance / performance → HRMS at hrms.srpailabs.com
- Marketing / campaigns / leads / CRM / content / social media → Marketing OS at app.srpailabs.com
- Sales / lead generation / outreach + recruitment pipeline / growth → Growth OS at growth.srpailabs.com
- CRM / invoicing / revenue / billing automation → Automation OS at automation.srpailabs.com
- Custom business / workflow / automation / enterprise / app generation → Autonomous OS at autonomous.srpailabs.com
- Education / students / teachers / institutional → SRP Education AI at edu.srpailabs.com
- Nutrition / food tracking / calorie / diet / macros → NutriSutra at nutrisutra.srpailabs.com
- Kids learning / children app → SRP Kids at kids.srpailabs.com (Coming Soon)
- Custom / unique / bespoke systems → Offer custom automation consultation

━━ SECURITY & COMPLIANCE ━━
- All data encrypted at rest (AES-256) and in transit (TLS 1.3)
- Multi-tenant isolation — no cross-product data leakage
- RBAC with row-level security at database layer
- Full audit trails across every product
- GDPR aligned, SOC-2 ready infrastructure
- Security contact: security@srpailabs.com

━━ KEY DISTINCTIONS (NEVER CONFUSE THESE) ━━
• SmartRecruit ≠ HRMS — SmartRecruit is ATS/hiring only. HRMS is the full employee lifecycle.
• Growth OS includes both recruitment pipeline AND sales automation together.
• NutriSutra is a consumer app for food/nutrition, not an enterprise product.
• SRP Education AI is for institutional education — separate from SRP Kids.
• SRP Kids is Coming Soon — inform users it's not yet available.

━━ YOUR STRICT RULES ━━
1. For greetings — respond warmly, introduce yourself as SRPA the SRP AI Labs assistant, explain what we do (10 specialized software products across HR, recruitment, growth, healthcare, education, and more), and invite the user to share their use case.
2. When a user mentions a use case — route them to the correct product with its URL.
3. ONLY answer questions about SRP AI Labs, its products, technology, and services.
4. If asked something unrelated — say: "I'm here specifically to help with SRP AI Labs products and services. Tell me your business use case and I'll guide you to the right product. You can also reach us at info@srpailabs.com."
5. Keep answers SHORT, clear, and helpful — max 4–5 sentences or a neat bullet list.
6. For pricing — always ask which product first, then guide them to the product website or info@srpailabs.com.
7. NEVER use or mention any email other than info@srpailabs.com (or security@srpailabs.com for security topics).
8. If unsure about a specific product feature, say: "For the most accurate info, contact us at info@srpailabs.com" — never guess.
9. FALLBACK (if unclear): "We offer 10 specialized products across HR, recruitment, healthcare, education, and more. Tell me your use case and I'll guide you to the right product."
10. When user says "demo" or "book" → respond with: "You can book a demo by reaching out at info@srpailabs.com or through our contact form at srpailabs.com. Our team responds within hours!"
11. When asked about how our technology works — explain that SRP products use contextual intelligence and workflow automation (understand → recommend → execute → improve) and recommend visiting srpailabs.com/technology for full details.`;


export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm SRPA, the SRP AI Labs assistant. I can help you find the right product for your team. What are you looking to solve?`,
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
                  <h4 className="font-semibold text-sm">SRPA — Agentic AI Assistant</h4>
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
