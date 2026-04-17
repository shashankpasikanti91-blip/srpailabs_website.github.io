import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Workflow, Code, Globe, Plug, Settings, Target, Layers, Rocket, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import srpLogo from "@/assets/srp-ai-logo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};
const stagger = { animate: { transition: { staggerChildren: 0.07 } } };

const services = [
  { icon: Bot, title: "AI Agents", description: "Conversational agents for support, sales, and internal ops.", features: ["Customer support agent", "Lead generation agent", "WhatsApp/Email bot", "Website chatbot", "FAQ Assistant"], color: "text-purple-400" },
  { icon: Workflow, title: "Workflow Automation", description: "End-to-end automation for repetitive business processes.", features: ["Task automation", "Notification system", "CRM integration", "Google Sheets automation", "Multi-step API workflows"], color: "text-cyan-400" },
  { icon: Code, title: "Internal Tools", description: "Dashboards, admin panels, and lightweight apps — without code.", features: ["Internal tools", "Automation dashboards", "Small CRM", "Lead tracking systems", "Custom mini-apps"], color: "text-pink-400" },
  { icon: Globe, title: "Website Automation", description: "Automate customer journeys and web interactions.", features: ["Web form → CRM", "Auto-reply system", "Customer onboarding", "Chatbot integration"], color: "text-green-400" },
  { icon: Plug, title: "API Integrations", description: "Connect your tools and data sources seamlessly.", features: ["REST APIs", "JSON processing", "Google Apps API", "Gmail & Sheets integration", "CRM integrations"], color: "text-orange-400" },
  { icon: Settings, title: "Custom Automation", description: "Tailored workflows for your specific business needs.", features: ["Recruitment automation", "Lead generation flows", "Dashboard automations", "Reporting systems"], color: "text-blue-400" },
];

const steps = [
  { step: "01", icon: Target, title: "Discovery", desc: "We map your business processes and identify the highest-impact automation opportunities." },
  { step: "02", icon: Layers, title: "Design", desc: "We architect the solution with clear documentation and delivery milestones." },
  { step: "03", icon: Code, title: "Build", desc: "We develop and test the automation using proven tools and custom code where needed." },
  { step: "04", icon: Rocket, title: "Deploy", desc: "We launch, monitor, and provide ongoing support as your needs evolve." },
];

export default function Services() {
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
                  <Link to="/services" className="block px-3 py-2 rounded-lg text-sm text-primary font-medium hover:bg-primary/5 transition-colors">Services</Link>
                  <Link to="/case-studies" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors">Case Studies</Link>
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
                <span className="w-2 h-2 rounded-full bg-primary" /> What We Build
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4">
                Automation <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl mb-8">
                From workflow automation to custom agents — we build the systems that reduce manual work and lower admin costs.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {services.map((svc, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }}
                className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 hover:bg-primary/[0.03] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svc.icon className={`w-6 h-6 ${svc.color}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2 font-display text-lg">{svc.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{svc.description}</p>
                <ul className="space-y-1.5">
                  {svc.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full ${svc.color.replace('text-', 'bg-')}`} />{f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 sm:py-20 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-display mb-3">How We Work</h2>
              <p className="text-muted-foreground">Simple, transparent process from discovery to deployment</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {steps.map((step, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }}
                  className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 transition-all duration-300">
                  <div className="absolute top-4 right-4 text-4xl font-bold text-primary/10 font-display group-hover:text-primary/20 transition-colors">{step.step}</div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground font-display mb-2">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">Ready to automate your business?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Tell us about your processes and we'll design the right automation strategy.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 border-0">
                <Link to="/#contact">Book a Free Consultation <ArrowRight className="w-4 h-4 ml-1" /></Link>
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
