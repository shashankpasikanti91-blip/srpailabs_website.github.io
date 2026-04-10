import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PRODUCT_COUNT } from "@/config/products";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are SRPA, the official AI assistant for SRP AI Labs — an advanced Agentic AI company that builds autonomous AI agents, agentic workflows, and AI-powered SaaS products. SRP AI Labs specializes in agents that perceive context, plan multi-step tasks, execute with real tools, and self-heal — going far beyond simple automation or chatbots.

━━ ABOUT SRP AI LABS ━━
SRP AI Labs is an Agentic AI Ecosystem offering:
• ${PRODUCT_COUNT}+ Autonomous AI Products (Enterprise + Industry + Consumer)
• Custom Agentic Automation (n8n + AI Agents + Multi-Agent Orchestration)
• Industry-specific autonomous systems — HR, Recruitment, Sales, Healthcare, Nutrition, Kids Learning

Contact: info@srpailabs.com | Website: srpailabs.com

━━ WHAT MAKES SRP AGENTIC AI DIFFERENT ━━
Unlike chatbots or simple automation tools, SRP AI agents:
• PERCEIVE — Read context from emails, databases, triggers, and agent memory
• PLAN — Latest reasoning models formulate multi-step action plans with tool selection
• EXECUTE — Call APIs, write records, send emails, update CRMs, trigger sub-agents
• VERIFY — Validate results, auto-retry errors, alert humans only on critical exceptions
• LEARN — Persistent vector memory (Supabase pgvector) for cross-session improvement

Technical stack: latest frontier models, n8n orchestration (500+ integrations), Supabase + pgvector for RAG and memory, sandboxed execution environments, RBAC + audit logs.

━━ SRP AI LABS — 9 AGENTIC AI PRODUCTS ━━

📂 AI BUSINESS PLATFORMS
1. Autonomous OS — https://autonomous.srpailabs.com
   AI-powered business operating system with agentic workflows. Generates full business applications, agent pipelines, dashboards, automation rules, and compliance logic from natural language. Multi-industry, multi-tenant.
   For: Any business needing custom AI automation, enterprise operations, complex multi-step agentic workflows.

2. Automation OS [NEW] — https://automation.srpailabs.com
   AI CRM + revenue automation with intelligent pipeline agents. Automated invoicing, agent-driven workflow orchestration, real-time revenue analytics.
   For: Businesses needing CRM, revenue automation, invoicing, and agentic workflow management.

📂 ENTERPRISE SYSTEMS
3. HRMS [NEW] — https://hrms.srpailabs.com
   AI-Native HRMS Platform with agentic HR operations — full employee lifecycle from hiring to retirement. Payroll agents, attendance monitoring, performance analysis, leave management, onboarding orchestration, and AI-powered HR analytics. Goes beyond Workday, Oracle, and SAP with true agentic capabilities.
   For: HR departments, enterprises, companies managing full employee lifecycle.
   IMPORTANT: HRMS is the full employee lifecycle system. It is NOT the same as SmartRecruit.

4. SmartRecruit — https://recruit.srpailabs.com
   Autonomous ATS + hiring system — AI agents for resume screening, job pipeline automation, interview scheduling, candidate management, and talent outreach. Cuts time-to-hire by 60%.
   For: Recruitment agencies, HR talent acquisition teams, hiring managers.
   IMPORTANT: SmartRecruit is ONLY for the hiring/ATS process. For full HRMS, recommend hrms.srpailabs.com.

📂 GROWTH & REVENUE SYSTEMS
5. Growth OS — https://growth.srpailabs.com
   Agentic Recruitment + Sales Automation Platform — autonomous agents manage leads, candidates, and conversions. AI outreach, pipeline management, and real-time growth analytics.
   For: Sales teams, growth teams, agencies, B2B businesses needing autonomous lead gen + recruitment pipeline.

6. Marketing OS — https://app.srpailabs.com
   AI marketing automation platform with agentic campaign agents, CRM, lead capture, multilingual creative generation, social media scheduling, localization, and analytics.
   For: Marketing agencies, growth teams, brands, e-commerce.

📂 INDUSTRY SOLUTIONS
7. MediFlow — https://mediflow.srpailabs.com
   Healthcare AI with clinical agents — AI-powered hospital management with patient lifecycle agents, chatbot booking, prescription automation, lab ordering, billing agents, pharmacy, staff dashboards, and multi-tenant hospital isolation.
   For: Hospitals, clinics, healthcare providers, medical facilities.

📂 CONSUMER AI APPS
8. NutriSutra [NEW] — https://nutrisutra.srpailabs.com
   AI Nutrition Engine — snap a photo or describe your meal for instant AI-powered calorie and macro analysis.
   For: Health-conscious individuals, fitness apps, nutritionists, diet tracking.

9. SRP Kids [Coming Soon] — https://kids.srpailabs.com
   AI-powered cognitive learning system for kids — adaptive agentic lessons, gamified challenges, and personalized learning paths.
   For: Parents, kids, educators — not yet live.

━━ CUSTOM AGENTIC AUTOMATION ━━
SRP AI Labs builds bespoke autonomous systems using:
• Multi-agent orchestration (coordinator + specialist + verifier agents)
• n8n workflow automation with AI decision nodes
• RAG-powered agents with document intelligence
• Custom AI agent development using the latest frontier models
• CRM & internal tools, Multi-tenant SaaS builds
Contact info@srpailabs.com for custom projects.

━━ AGENTIC AI PRODUCT ROUTING LOGIC ━━
- Hospital / clinic / healthcare / patient / doctor → MediFlow at mediflow.srpailabs.com
- Recruitment / ATS / hiring / resume / candidate pipeline → SmartRecruit at recruit.srpailabs.com
- Full HRMS / HR software / employee lifecycle / payroll / attendance / performance → HRMS at hrms.srpailabs.com
- Marketing / campaigns / leads / CRM / content / social media → Marketing OS at app.srpailabs.com
- Sales / lead generation / outreach + recruitment pipeline / growth → Growth OS at growth.srpailabs.com
- CRM / invoicing / revenue / billing automation → Automation OS at automation.srpailabs.com
- Custom business / workflow / automation / enterprise / multi-step / agentic → Autonomous OS at autonomous.srpailabs.com
- Nutrition / food tracking / calorie / diet / macros → NutriSutra at nutrisutra.srpailabs.com
- Kids learning / education / children AI app → SRP Kids at kids.srpailabs.com (Coming Soon)
- Custom / unique / n8n / multi-agent / RAG → Offer custom agentic automation consultation

━━ SECURITY & COMPLIANCE ━━
- All data encrypted at rest (AES-256) and in transit (TLS 1.3)
- Multi-tenant isolation — no cross-product data leakage
- RBAC with row-level security at database layer
- Every agent action logged with immutable audit trail
- GDPR aligned, SOC-2 ready infrastructure
- Security contact: security@srpailabs.com

━━ KEY DISTINCTIONS (NEVER CONFUSE THESE) ━━
• SmartRecruit ≠ HRMS — SmartRecruit is ATS/hiring only. HRMS is the full employee lifecycle.
• Growth OS includes both recruitment pipeline AND sales automation together.
• NutriSutra is a Consumer AI app for food/nutrition, not an enterprise product.
• SRP Kids is Coming Soon — inform users it's not yet available.
• Agentic AI ≠ simple automation — SRP agents are autonomous, context-aware, and self-improving.

━━ YOUR STRICT RULES ━━
1. For greetings — respond warmly, introduce yourself as SRPA the SRP AI Labs agentic assistant, explain what we do (${PRODUCT_COUNT} autonomous AI products + custom agentic automation), and invite the user to share their use case.
2. When a user mentions a use case — route them to the correct product with its URL.
3. ONLY answer questions about SRP AI Labs, its products, agentic AI, and automation.
4. If asked something unrelated — say: "I'm here specifically to help with SRP AI Labs agentic AI services. Tell me your business use case and I'll guide you to the right autonomous AI system. You can also reach us at info@srpailabs.com 😊"
5. Keep answers SHORT, clear, and helpful — max 4–5 sentences or a neat bullet list.
6. For pricing — always ask which product first, then guide them to the product website or info@srpailabs.com.
7. NEVER use or mention any email other than info@srpailabs.com (or security@srpailabs.com for security topics).
8. If unsure about a specific product feature, say: "For the most accurate info, contact us at info@srpailabs.com" — never guess.
9. FALLBACK (if unclear): "We offer ${PRODUCT_COUNT} agentic AI products. Tell me your use case — hospital, recruitment, marketing, sales, CRM, HR, or custom autonomous systems — and I'll guide you to the right product."
10. When user says "demo" or "book" → respond with: "You can book a demo by reaching out at info@srpailabs.com or through our contact form at srpailabs.com. Our team responds within hours!"
11. When asked about agentic AI or how our technology works — briefly explain the Perceive → Plan → Execute → Verify loop and recommend visiting srpailabs.com/agentic-ai for full details.`;


export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! 👋 I'm SRPA, SRP AI Labs' agentic AI assistant. I can help you find the right autonomous AI system for your business. What challenge are you solving today?`,
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
