import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Workflow, Bot, Brain, Code, Database, Plug, MessageSquare, Sparkles, Layers, ShieldCheck, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import srpLogo from "@/assets/srp-ai-logo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};
const stagger = { animate: { transition: { staggerChildren: 0.07 } } };

const coreStack = [
  { icon: Workflow, name: "n8n", type: "Automation Platform", description: "The backbone of every workflow. We build self-hosted n8n instances that orchestrate AI, APIs, databases, and business tools into unified pipelines.", color: "from-orange-500 to-red-500" },
  { icon: Bot, name: "OpenAI GPT-4o", type: "AI Language Model", description: "Powers our email classification, document analysis, data extraction, and conversational agents with state-of-the-art reasoning capabilities.", color: "from-green-500 to-emerald-500" },
  { icon: Brain, name: "Claude (Anthropic)", type: "Advanced AI Reasoning", description: "Used for complex multi-step reasoning, long-context analysis, and tasks requiring deep understanding over large documents.", color: "from-purple-500 to-violet-500" },
  { icon: Code, name: "Python + FastAPI", type: "AI Backend & APIs", description: "Custom AI microservices for RAG pipelines, vector search endpoints, data preprocessing, and business logic that lives outside n8n.", color: "from-blue-500 to-cyan-500" },
  { icon: Database, name: "Supabase", type: "Database & Auth Layer", description: "PostgreSQL-backed persistence, row-level security, and real-time subscriptions used across all products for user data and workflow state.", color: "from-emerald-500 to-teal-500" },
  { icon: Plug, name: "APIs & Webhooks", type: "System Integrations", description: "We integrate with Gmail, Slack, Notion, Airtable, Stripe, LinkedIn, Telegram, WhatsApp, Shopify, and any REST/GraphQL API your business uses.", color: "from-pink-500 to-rose-500" },
];

const aiCapabilities = [
  { icon: MessageSquare, name: "RAG Pipelines", type: "Knowledge Retrieval", description: "Retrieval-Augmented Generation allows AI agents to answer from your private knowledge base — documents, manuals, SOPs, emails — with zero hallucination drift.", color: "from-cyan-500 to-blue-500" },
  { icon: Sparkles, name: "Agentic AI Workflows", type: "Multi-Step AI Agents", description: "Chains of AI reasoning that can search, decide, act, and loop — enabling fully autonomous multi-step tasks like research, outreach, qualification, and reporting.", color: "from-yellow-500 to-orange-500" },
  { icon: Layers, name: "Vector Databases", type: "Semantic Memory", description: "Pinecone and pgvector store embeddings that give AI agents persistent memory and semantic search capabilities across your business data.", color: "from-violet-500 to-purple-500" },
  { icon: ShieldCheck, name: "Secure Self-Hosting", type: "On-Premise Deployment", description: "All automation infrastructure can be deployed on your own VPS or cloud. No vendor lock-in. Your data never leaves your environment.", color: "from-slate-500 to-gray-500" },
];

const supportingTools = [
  "Gmail API", "Slack Webhooks", "Google Sheets API", "Notion API", "Airtable API",
  "Telegram Bot API", "LinkedIn Unofficial API", "Pinecone", "pgvector", "Redis",
  "Zapier (migration)", "Puppeteer / Playwright", "Apify", "Stripe Webhooks", "WhatsApp Cloud API",
];

export default function Technology() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-background/80 border-b border-border/30">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={srpLogo} alt="SRP AI Labs" className="h-10 sm:h-11 w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
            </Link>
            <div className="hidden md:flex items-center gap-5">
              <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Products</Link>
              <Link to="/platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Platform</Link>
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm text-primary font-medium">
                  Solutions <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-background/95 backdrop-blur border border-border/60 rounded-xl shadow-xl p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/services" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors">Services</Link>
                  <Link to="/case-studies" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors">Case Studies</Link>
                  <Link to="/technology" className="block px-3 py-2 rounded-lg text-sm text-primary font-medium hover:bg-primary/5 transition-colors">Technology</Link>
                </div>
              </div>
              <Link to="/industries" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Industries</Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild className="hidden sm:flex bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full border-0 text-sm">
                <Link to="/#contact">Contact</Link>
              </Button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center">
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
          {mobileOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-1 border-t border-border/40 mt-4">
              {[{ label: "Products", to: "/products" }, { label: "Platform", to: "/platform" }, { label: "Industries", to: "/industries" }, { label: "Pricing", to: "/pricing" }].map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded-xl text-sm text-foreground hover:bg-muted/50">{l.label}</Link>
              ))}
              <button onClick={() => setSolutionsOpen(!solutionsOpen)} className="flex items-center justify-between w-full py-2 px-3 rounded-xl text-sm text-foreground hover:bg-muted/50">
                Solutions <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>
              {solutionsOpen && [{ label: "Services", to: "/services" }, { label: "Case Studies", to: "/case-studies" }, { label: "Technology", to: "/technology" }].map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-2 px-6 text-sm text-muted-foreground hover:bg-muted/50 rounded-xl">{l.label}</Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" /> Under the Hood
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4">
                Our <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Technology Stack</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl mb-8">
                Every tool we use is best-in-class, battle-tested, and chosen specifically for production AI automation at scale.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Stack */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp} className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-display mb-2">Core Infrastructure</h2>
              <p className="text-muted-foreground">The foundational tools powering every automation we build.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {coreStack.map((tech, i) => (
                <motion.div key={i} variants={fadeInUp}
                  className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-300">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-4`}>
                    <tech.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{tech.type}</div>
                  <h3 className="font-bold text-foreground text-lg font-display mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp} className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-display mb-2">AI Capabilities</h2>
              <p className="text-muted-foreground">Advanced AI patterns we implement for production workflows.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5">
              {aiCapabilities.map((tech, i) => (
                <motion.div key={i} variants={fadeInUp}
                  className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-300 flex gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center flex-shrink-0`}>
                    <tech.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{tech.type}</div>
                    <h3 className="font-bold text-foreground font-display mb-1.5">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Supporting Tools */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp} className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-display mb-2">Integrations & APIs</h2>
              <p className="text-muted-foreground">Third-party platforms we connect to regularly.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2.5">
              {supportingTools.map((tool, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full text-sm border border-border/60 bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors">
                  {tool}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">Ready to put these tools to work?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">We'll design an architecture using these proven technologies to automate your business processes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 border-0">
                <Link to="/#contact">Start a Project <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-purple-500/30 hover:border-purple-500/60">
                <Link to="/case-studies">See Case Studies</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 SRP AI Labs. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
