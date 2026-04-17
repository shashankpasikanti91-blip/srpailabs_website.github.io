import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageSquare, FileText, Target, Bot, TrendingUp, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import srpLogo from "@/assets/srp-ai-logo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};
const stagger = { animate: { transition: { staggerChildren: 0.07 } } };

const caseStudies = [
  {
    icon: Mail, tag: "AI Email Automation", title: "Intelligent Email Classifier Agent",
    challenge: "A business owner was processing 100+ daily emails manually, spending 3+ hours on triage and sorting.",
    solution: "Built an n8n workflow with GPT-4 that automatically classifies incoming emails into Priority, Finance, Support, and Promotions — then routes each to the appropriate folder or action.",
    results: ["90% reduction in email sorting time", "Zero missed priority emails", "Fully automated with zero daily manual effort"],
    tech: ["n8n", "OpenAI GPT-4", "Gmail API", "Label automation"],
    slug: "email-classifier-agent",
  },
  {
    icon: MessageSquare, tag: "AI Knowledge Agent", title: "Self-Learning RAG Chatbot",
    challenge: "A Telegram community with 500+ members needed 24/7 support without any human involvement.",
    solution: "Created an intelligent Telegram agent using RAG (Retrieval-Augmented Generation) with Pinecone vector store that learns from every interaction and improves answers over time.",
    results: ["80% of inquiries handled automatically", "Instant responses 24/7, no human needed", "Self-improving accuracy over time"],
    tech: ["n8n", "Pinecone", "OpenAI Embeddings", "Telegram Bot API"],
    slug: "self-learning-agent",
  },
  {
    icon: FileText, tag: "Document Processing AI", title: "AI-Powered Invoice Automation",
    challenge: "An accounting team spent 5+ hours weekly manually extracting data from PDF invoices into spreadsheets.",
    solution: "Built an n8n workflow using GPT-4 Vision to extract structured data from PDF invoices, validate it, and automatically populate Google Sheets with zero manual data entry.",
    results: ["95% faster invoice processing", "Near-zero data entry errors", "Automatic audit trail in Google Sheets"],
    tech: ["n8n", "GPT-4 Vision", "Google Sheets API", "PDF processing"],
    slug: "invoice-automation",
  },
];

export default function CaseStudies() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-background/80 border-b border-border/30">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={srpLogo} alt="SRP AI Labs" className="h-11 sm:h-12 md:h-[3.25rem] w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
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
                  <Link to="/case-studies" className="block px-3 py-2 rounded-lg text-sm text-primary font-medium hover:bg-primary/5 transition-colors">Case Studies</Link>
                  <Link to="/technology" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors">Technology</Link>
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
      <section className="py-14 sm:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" /> Real Results
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4">
                Case <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Studies</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl mb-8">
                Real AI automation projects — the challenge, our solution, and the measurable results.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="space-y-6 max-w-4xl mx-auto">
            {caseStudies.map((study, i) => (
              <motion.div key={i} variants={fadeInUp}
                className="p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-300">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <study.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{study.tag}</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground font-display mt-0.5">{study.title}</h2>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-5 mb-5">
                  <div className="p-4 rounded-xl bg-background/60 border border-border/50">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                      <Target className="w-4 h-4 text-rose-400" /> The Challenge
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background/60 border border-border/50">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                      <Bot className="w-4 h-4 text-primary" /> The Solution
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background/60 border border-border/50">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                      <TrendingUp className="w-4 h-4 text-green-400" /> The Results
                    </div>
                    <ul className="space-y-1.5">
                      {study.results.map((r, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-1.5">
                          <span className="text-green-400 mt-0.5">•</span>
                          <span className="text-foreground font-medium">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex flex-wrap gap-2">
                    {study.tech.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-primary/10 text-primary border border-primary/20">{t}</span>
                    ))}
                  </div>
                  <Link to={`/project/${study.slug}`}
                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    View Full Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">Want results like these?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">We'll analyze your business processes and design an automation solution that delivers measurable ROI.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 border-0">
                <Link to="/#contact">Start Your Project <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-purple-500/30 hover:border-purple-500/60">
                <Link to="/services">See All Services</Link>
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
