import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Zap, Network, GitBranch, Eye, Cpu, ShieldCheck, ArrowRight, ArrowUpRight,
  Bot, Workflow, Layers, Target, RefreshCw, MessageSquare, Database, Globe,
  ChevronDown, Menu, X, CheckCircle, Sparkles, Sun, Moon, Code2, FlaskConical,
  Building2, UserCheck, HeartPulse, TrendingUp, BarChart3, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import srpLogo from "@/assets/srp-ai-logo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

const agentCapabilities = [
  {
    icon: Brain,
    title: "Autonomous Reasoning",
    description: "Our agents don't just follow scripts — they reason through complex problems, break them into steps, and execute plans without human intervention.",
    color: "text-purple-400",
    bg: "from-purple-500/10 to-purple-500/5",
    border: "border-purple-500/20",
  },
  {
    icon: GitBranch,
    title: "Multi-Step Orchestration",
    description: "Chain dozens of AI actions together. Agents can trigger sub-agents, call APIs, query databases, and route decisions based on real-time context.",
    color: "text-cyan-400",
    bg: "from-cyan-500/10 to-cyan-500/5",
    border: "border-cyan-500/20",
  },
  {
    icon: Eye,
    title: "Memory & Context Awareness",
    description: "Persistent memory across sessions. Our agents remember previous interactions, learn from outcomes, and improve accuracy over time.",
    color: "text-pink-400",
    bg: "from-pink-500/10 to-pink-500/5",
    border: "border-pink-500/20",
  },
  {
    icon: RefreshCw,
    title: "Self-Healing Loops",
    description: "When an agent encounters an error or ambiguous result, it automatically retries, reformulates its approach, and escalates only when truly needed.",
    color: "text-orange-400",
    bg: "from-orange-500/10 to-orange-500/5",
    border: "border-orange-500/20",
  },
  {
    icon: Globe,
    title: "Tool & API Integration",
    description: "Agents natively call external tools — web search, document readers, spreadsheets, CRMs, email, Slack, and 300+ integrations through n8n.",
    color: "text-green-400",
    bg: "from-green-500/10 to-green-500/5",
    border: "border-green-500/20",
  },
  {
    icon: Layers,
    title: "Multi-Agent Collaboration",
    description: "Deploy orchestrator agents that coordinate specialist sub-agents in parallel. Complex tasks are handled by the right agent at the right time.",
    color: "text-blue-400",
    bg: "from-blue-500/10 to-blue-500/5",
    border: "border-blue-500/20",
  },
];

const agentUseCases = [
  {
    icon: UserCheck,
    product: "SmartRecruit",
    title: "Autonomous Hiring Agent",
    desc: "End-to-end recruitment without manual touch. Agent sources candidates, screens resumes, schedules interviews, sends follow-ups, and presents shortlists — all autonomously.",
    steps: ["Source candidates from LinkedIn & job boards", "AI screens resumes against JD", "Schedules interviews via calendar API", "Sends automated follow-ups", "Ranks and presents shortlist"],
    url: "https://recruit.srpailabs.com",
    gradient: "from-purple-500/10 to-violet-500/5",
  },
  {
    icon: Building2,
    product: "SRP HRMS",
    title: "HR Operations Agent",
    desc: "From onboarding to payroll to compliance — agents manage the entire employee lifecycle. When an employee joins, an orchestrator triggers 12+ automated tasks in sequence.",
    steps: ["Triggers onboarding workflow on hire", "Provisioning: accounts, tools, assets", "Payroll auto-calculated each cycle", "AI monitors attendance anomalies", "Compliance alerts generated proactively"],
    url: "https://hrms.srpailabs.com",
    gradient: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: TrendingUp,
    product: "Growth OS",
    title: "Sales Pipeline Agent",
    desc: "Prospecting to closing — without the manual grind. Our sales agent identifies warm leads, crafts personalized outreach, follows up intelligently, and alerts humans only at decision points.",
    steps: ["ICP-matched lead discovery", "Personalized outreach drafted by AI", "Multi-touch follow-up sequences", "Real-time pipeline scoring", "Auto-books demos for qualified leads"],
    url: "https://growth.srpailabs.com",
    gradient: "from-pink-500/10 to-rose-500/5",
  },
  {
    icon: HeartPulse,
    product: "MediFlow",
    title: "Clinical Workflow Agent",
    desc: "Reduce administrative burden by 70%. Patient intake, appointment routing, lab ordering, billing, and discharge — all managed by intelligent clinical agents.",
    steps: ["AI triage on patient arrival", "Auto-routes to correct specialist", "Lab results interpreted & flagged", "Prescription automation", "Insurance claim pre-authorization"],
    url: "https://mediflow.srpailabs.com",
    gradient: "from-green-500/10 to-emerald-500/5",
  },
];

const architecturePillars = [
  { icon: Cpu, title: "Model Core", desc: "Latest frontier models with enterprise-grade reasoning and routing" },
  { icon: Workflow, title: "n8n Orchestration", desc: "500+ connectors, visual workflow builder, enterprise triggers" },
  { icon: Database, title: "Vector Memory", desc: "Supabase pgvector for RAG, semantic search, and agent memory" },
  { icon: ShieldCheck, title: "Secure Execution", desc: "Sandboxed agent runtime, RBAC, audit logs per action" },
  { icon: RefreshCw, title: "Feedback Loops", desc: "Agents improve from outcomes — supervised and unsupervised" },
  { icon: Network, title: "Agent Mesh", desc: "Orchestrator ↔ Specialist ↔ Verifier agent topology" },
];

export default function AgenticAI() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-background/80 border-b border-border/30">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img src={srpLogo} alt="SRP AI Labs" className="h-12 sm:h-14 md:h-[3.75rem] w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
            </Link>
            <div className="hidden md:flex items-center gap-5">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/agentic-ai" className="text-sm text-primary font-medium">Agentic AI</Link>
              <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Products</Link>
              <Link to="/platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Platform</Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 hidden md:flex"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Button asChild className="hidden sm:flex bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full border-0 text-sm px-5">
                <Link to="/#contact">Request Demo</Link>
              </Button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center">
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
          {mobileOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-1 border-t border-border/40 mt-4">
              {[
                { label: "Home", to: "/" },
                { label: "Agentic AI", to: "/agentic-ai" },
                { label: "Products", to: "/products" },
                { label: "Platform", to: "/platform" },
                { label: "Pricing", to: "/pricing" },
              ].map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-xl text-sm text-foreground hover:bg-muted/50">
                  {l.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full border-0">
                  <Link to="/#contact" onClick={() => setMobileOpen(false)}>Request Demo</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative min-h-[80vh] flex flex-col justify-center py-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(265 85% 65%), transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(190 100% 50%), transparent 70%)", filter: "blur(80px)" }} />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
              Advanced Agentic AI — Beyond Automation
              <Sparkles className="w-4 h-4" />
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.05] tracking-tight mb-8">
              <span className="text-foreground">AI That Acts.</span>
              <br />
              <span style={{
                backgroundImage: "linear-gradient(135deg, hsl(320 90% 65%), hsl(265 85% 65%), hsl(220 85% 60%), hsl(190 100% 50%))",
                backgroundSize: "200% 200%",
                animation: "text-shimmer 4s ease-in-out infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Thinks. Decides. Delivers.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
              SRP AI Labs builds <strong className="text-foreground">autonomous AI agents</strong> that don't just answer questions — they complete entire workflows end-to-end. Plan, execute, verify, and iterate — without human handholding.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-10 border-0 shadow-[0_4px_30px_hsl(265_85%_65%/0.4)] hover:-translate-y-0.5 transition-all">
                <Link to="/#contact" className="flex items-center gap-2">
                  Deploy Your First Agent <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-10 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5">
                <Link to="/platform">See Architecture</Link>
              </Button>
            </motion.div>

            {/* Key metrics bar */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 max-w-2xl mx-auto bg-card/30 backdrop-blur-xl rounded-2xl border border-border/30 py-6 px-8">
              {[
                { value: "40+", label: "Agent Workflows Live" },
                { value: "95%", label: "Task Completion Rate" },
                { value: "10×", label: "Faster than Manual" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold font-display" style={{
                    backgroundImage: "linear-gradient(135deg, hsl(320 90% 65%), hsl(265 85% 65%), hsl(190 100% 50%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== WHAT IS AGENTIC AI ===== */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.div variants={fadeInUp} className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <Brain className="w-4 h-4" /> What Makes It Agentic
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                  Not a chatbot. <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">An AI that does the work.</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Traditional AI answers questions. Agentic AI takes actions. SRP agents perceive context, form a plan, use tools, and complete multi-step tasks — autonomously, continuously, at scale.
                </p>
              </motion.div>

              {/* Comparison table */}
              <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="p-8 rounded-2xl bg-card/50 border border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-muted-foreground">Traditional AI / Chatbots</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Responds to one question at a time",
                      "Cannot take actions — only generates text",
                      "No memory between sessions",
                      "Human must drive every step",
                      "Breaks on unexpected inputs",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <X className="w-4 h-4 text-red-400/70 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/5 border border-primary/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">SRP Agentic AI</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Completes entire multi-step workflows",
                      "Uses real tools — APIs, databases, email, calendar",
                      "Persistent memory — learns across sessions",
                      "Operates 24/7 without supervision",
                      "Self-heals and retries on errors",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Capability grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {agentCapabilities.map((cap, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${cap.bg} border ${cap.border} hover:shadow-[0_0_30px_hsl(265_85%_65%/0.15)] transition-all duration-500`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-card/60 border border-border/60 flex items-center justify-center mb-5`}>
                      <cap.icon className={`w-6 h-6 ${cap.color}`} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2 font-display">{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== HOW AGENTS WORK ===== */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(190 100% 50%), transparent 70%)", filter: "blur(100px)" }} />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.div variants={fadeInUp} className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <Workflow className="w-4 h-4" /> Agent Execution Loop
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                  How our agents <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">actually work</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Every SRP agent follows a structured Perceive → Plan → Execute → Verify loop — built on enterprise-grade infrastructure.
                </p>
              </motion.div>

              {/* Loop steps */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {[
                  { step: "01", icon: Eye, title: "Perceive", desc: "Agent reads context — emails, data, triggers, user inputs, API responses, and memory from previous sessions.", color: "text-pink-400" },
                  { step: "02", icon: Brain, title: "Plan", desc: "Latest reasoning models formulate a multi-step action plan, selecting the right tools and sub-agents for each step.", color: "text-purple-400" },
                  { step: "03", icon: Zap, title: "Execute", desc: "Agent calls APIs, writes records, sends emails, updates CRMs, schedules events, and triggers downstream agents.", color: "text-cyan-400" },
                  { step: "04", icon: ShieldCheck, title: "Verify", desc: "Results validated against expected outcomes. Failed steps auto-retry. Humans alerted only on critical exceptions.", color: "text-green-400" },
                ].map((s, i) => (
                  <motion.div key={i} variants={fadeInUp} className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 transition-all group">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-4xl font-bold font-display text-border">{s.step}</span>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <s.icon className={`w-5 h-5 ${s.color}`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 font-display">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Architecture stack */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-xl font-semibold text-center text-foreground mb-8 font-display">The Technology Stack Behind Every Agent</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {architecturePillars.map((p, i) => (
                    <motion.div key={i} variants={fadeInUp} className="flex items-start gap-4 p-5 rounded-xl bg-card/30 border border-border/40 hover:border-primary/30 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <p.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">{p.title}</h4>
                        <p className="text-xs text-muted-foreground">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== AGENT USE CASES ===== */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.div variants={fadeInUp} className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <Target className="w-4 h-4" /> Real-World Agent Deployments
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                  Agents deployed <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">across every industry</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  SRP agentic AI powers real workflows across HRMS, recruitment, sales, and healthcare — not just demos.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {agentUseCases.map((uc, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    className={`p-8 rounded-2xl bg-gradient-to-br ${uc.gradient} border border-border/50 hover:border-primary/40 transition-all duration-500 group`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <uc.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-primary/70">{uc.product}</span>
                          <h3 className="text-lg font-semibold text-foreground font-display">{uc.title}</h3>
                        </div>
                      </div>
                      <a href={uc.url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{uc.desc}</p>
                    <div className="space-y-2">
                      {uc.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">{idx + 1}</span>
                          <span className="text-muted-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                    <a href={uc.url} target="_blank" rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      Explore {uc.product} <ArrowRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== WHY SRP AGENTS ===== */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.div variants={fadeInUp} className="text-center mb-14">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <Rocket className="w-4 h-4" /> Why SRP Agentic AI
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                  Enterprise-grade. <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Startup-speed.</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We don't sell you a chatbot and call it AI. Every SRP agent is production-hardened, measurable, and business-outcome focused.
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { icon: ShieldCheck, title: "SOC-2 Ready Infrastructure", desc: "All agent executions are logged, auditable, and comply with enterprise data governance requirements." },
                  { icon: BarChart3, title: "Measurable ROI", desc: "Every agent deployment comes with KPI tracking — tasks completed, time saved, cost reduced, errors caught." },
                  { icon: Code2, title: "Custom Agent Development", desc: "We build agents tailored to your exact workflows — not generic templates. Proprietary and custom-trained." },
                  { icon: FlaskConical, title: "Rapid Iteration", desc: "Agents are deployed in days not months. We iterate in production with your real data and real outcomes." },
                  { icon: Layers, title: "Multi-Model Flexibility", desc: "We route tasks to the best available models based on cost, speed, and accuracy needs." },
                  { icon: Network, title: "Composable Architecture", desc: "Agents compose with your existing stack — Slack, Notion, Salesforce, SAP, Google Workspace, and beyond." },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} whileHover={{ y: -5 }}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/[0.03] hover:shadow-[0_0_25px_hsl(265_85%_65%/0.15)] transition-all duration-500 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1.5 text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ===== CTA ===== */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.04] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 animate-pulse" /> Ready to Deploy Agents?
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6">
              Let agents do the <span style={{
                backgroundImage: "linear-gradient(135deg, hsl(320 90% 65%), hsl(265 85% 65%), hsl(190 100% 50%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>heavy lifting.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Book a free 30-minute session with our agentic AI team. We'll map your workflow, identify automation opportunities, and show you a working agent prototype in under a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-10 border-0 shadow-[0_4px_30px_hsl(265_85%_65%/0.4)] hover:-translate-y-0.5 transition-all">
                <Link to="/#contact" className="flex items-center gap-2">
                  Start with Agentic AI <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-10 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5">
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center">
              <img src={srpLogo} alt="SRP AI Labs" className="h-12 sm:h-14 md:h-[3.75rem] w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
            </Link>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center">
              {[
                { label: "Home", to: "/" },
                { label: "Agentic AI", to: "/agentic-ai" },
                { label: "Products", to: "/products" },
                { label: "Platform", to: "/platform" },
                { label: "Security", to: "/security" },
                { label: "Privacy", to: "/privacy-policy" },
                { label: "Terms", to: "/terms-of-service" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">© 2026 SRP AI Labs</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
