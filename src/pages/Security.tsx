import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Lock, Database, Server, Eye, CheckCircle, AlertTriangle,
  Key, Globe, FileText, Building2, ArrowLeft, Mail, ShieldCheck,
  Cpu, Network, RefreshCw, Users, Zap, Menu, X, Sun, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import srpLogo from "@/assets/srp-ai-logo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};
const stagger = { animate: { transition: { staggerChildren: 0.07 } } };

const securityPillars = [
  {
    icon: Lock,
    title: "Encryption at Rest & in Transit",
    color: "text-purple-400",
    border: "border-purple-500/20",
    bg: "from-purple-500/8 to-transparent",
    content: [
      "All data encrypted at rest using AES-256",
      "TLS 1.3 enforced for all API and web traffic",
      "Database-level encryption on Supabase (PostgreSQL)",
      "Secrets managed via environment isolation — never hardcoded",
      "Agent-to-agent communication uses signed JWT tokens",
    ],
  },
  {
    icon: Users,
    title: "Role-Based Access Control (RBAC)",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "from-cyan-500/8 to-transparent",
    content: [
      "Granular permission system — read, write, admin per resource",
      "Multi-tenant isolation: no data leakage between organizations",
      "Row-level security (RLS) enforced at database layer",
      "Session tokens expire automatically after inactivity",
      "MFA supported across all enterprise product logins",
    ],
  },
  {
    icon: Eye,
    title: "Audit Logging & Monitoring",
    color: "text-pink-400",
    border: "border-pink-500/20",
    bg: "from-pink-500/8 to-transparent",
    content: [
      "Every agent action logged with user, timestamp, and payload hash",
      "Immutable audit trail — cannot be modified post-write",
      "Real-time anomaly detection on login and API patterns",
      "Automated alerts on suspicious access patterns",
      "Exportable compliance reports for enterprise clients",
    ],
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    color: "text-green-400",
    border: "border-green-500/20",
    bg: "from-green-500/8 to-transparent",
    content: [
      "Hosted on Hetzner Cloud (EU) with DDoS protection",
      "Nginx reverse proxy with rate limiting and WAF rules",
      "Regular security patching and vulnerability scanning",
      "Isolated Docker containers per service with resource limits",
      "Automated backup policies with cross-region replication",
    ],
  },
  {
    icon: Database,
    title: "Data Privacy & Isolation",
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "from-blue-500/8 to-transparent",
    content: [
      "Each product uses a fully isolated Supabase project",
      "No cross-product data sharing without explicit user consent",
      "PII handled in compliance with GDPR principles",
      "AI models do not train on customer data by default",
      "Data deletion requests fulfilled within 30 days",
    ],
  },
  {
    icon: Network,
    title: "Agent Execution Security",
    color: "text-orange-400",
    border: "border-orange-500/20",
    bg: "from-orange-500/8 to-transparent",
    content: [
      "All agent actions require signed authorization tokens",
      "Sandboxed execution environment — no host filesystem access",
      "API rate limiting enforced per tenant and per agent",
      "Tool permissions explicitly whitelisted per agent instance",
      "Sensitive outputs (PII, credentials) masked in logs",
    ],
  },
];

const certifications = [
  { name: "GDPR Aligned", icon: Globe, desc: "Data processing follows GDPR principles for EU residents" },
  { name: "SOC-2 Ready", icon: ShieldCheck, desc: "Infrastructure and practices aligned with SOC-2 Type II controls" },
  { name: "ISO 27001 Aligned", icon: FileText, desc: "Information security management best practices observed" },
  { name: "HIPAA Awareness", icon: Building2, desc: "MediFlow product follows HIPAA-aligned data handling" },
];

export default function Security() {
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
              <Link to="/agentic-ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Agentic AI</Link>
              <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Products</Link>
              <Link to="/platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Platform</Link>
              <Link to="/security" className="text-sm text-primary font-medium">Security</Link>
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
                <a href="mailto:security@srpailabs.com">Report Vulnerability</a>
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
                { label: "Security", to: "/security" },
              ].map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 rounded-xl text-sm text-foreground hover:bg-muted/50">
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(265 85% 65%), transparent 70%)", filter: "blur(80px)" }} />
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-8">
                <Shield className="w-4 h-4" /> Security & Trust Center
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-6">
              Security is not an <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">afterthought.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Every SRP AI Labs product is built with security-first architecture. Isolated environments, encrypted data, auditable agents, and enterprise-grade controls — deployed from day one.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-10 border-0">
                <a href="mailto:security@srpailabs.com" className="flex items-center gap-2">
                  <Mail className="w-5 h-5" /> Contact Security Team
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-10 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Certifications / Compliance */}
      <section className="py-10 border-y border-border/30 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3 p-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <cert.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{cert.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Pillars */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.div variants={fadeInUp} className="text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
                  Six Pillars of <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">SRP Security</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our security architecture covers every layer — from infrastructure to AI agent execution.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {securityPillars.map((pillar, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className={`p-8 rounded-2xl bg-gradient-to-br ${pillar.bg} border ${pillar.border} group hover:shadow-[0_0_30px_hsl(265_85%_65%/0.1)] transition-all duration-500`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-card/60 border border-border/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground font-display">{pillar.title}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {pillar.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-400/80 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="py-20 sm:py-24 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-10 rounded-2xl bg-gradient-to-br from-amber-500/8 to-orange-500/5 border border-amber-500/20 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-7 h-7 text-amber-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4">Responsible Disclosure Policy</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                SRP AI Labs takes security vulnerabilities seriously. If you discover a security issue in any of our products or infrastructure, we encourage responsible disclosure. We commit to:
              </p>
              <ul className="text-left space-y-2 mb-8 text-sm text-muted-foreground max-w-md mx-auto">
                {[
                  "Acknowledge your report within 48 hours",
                  "Provide regular updates on remediation progress",
                  "Not take legal action against good-faith security researchers",
                  "Credit researchers in our security acknowledgements (with permission)",
                  "Target a 30-day remediation window for critical issues",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 border-0">
                <a href="mailto:security@srpailabs.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  security@srpailabs.com
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center">
              <img src={srpLogo} alt="SRP AI Labs" className="h-12 sm:h-14 md:h-[3.75rem] w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
            </Link>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center">
              {[
                { label: "Home", to: "/" },
                { label: "Agentic AI", to: "/agentic-ai" },
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
