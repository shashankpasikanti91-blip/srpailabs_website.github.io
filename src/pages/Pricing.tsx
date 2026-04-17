import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import srpLogo from "@/assets/srp-ai-logo.png";
import { products } from "@/config/products";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};
const stagger = { animate: { transition: { staggerChildren: 0.07 } } };

export default function Pricing() {
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
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Solutions <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-background/95 backdrop-blur border border-border/60 rounded-xl shadow-xl p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/services" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors">Services</Link>
                  <Link to="/case-studies" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors">Case Studies</Link>
                  <Link to="/technology" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors">Technology</Link>
                </div>
              </div>
              <Link to="/industries" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Industries</Link>
              <Link to="/pricing" className="text-sm text-primary font-medium">Pricing</Link>
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
                <span className="w-2 h-2 rounded-full bg-primary" /> Simple, Transparent Pricing
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4">
                Pay Per <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Product</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl mb-6">
                Each product has its own pricing based on features and scale. No bundles, no hidden costs.
              </p>
              <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto">
                Visit any product below to see plans, free trials, and enterprise options.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product pricing cards */}
      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {products.map((product, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -5 }}>
                <a href={product.url} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br ${product.gradientColor} border border-border/50 ${product.border} hover:border-primary/50 hover:shadow-[0_8px_30px_hsl(265_85%_65%/0.12)] transition-all duration-300 group`}>
                  <div className="w-12 h-12 rounded-xl bg-background/60 border border-border/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <product.icon className={`w-6 h-6 ${product.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm font-bold text-foreground">{product.name}</span>
                      {product.isNew && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400">NEW</span>}
                      {product.isComingSoon && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-yellow-500/20 text-yellow-400">SOON</span>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{product.desc}</p>
                    <p className="text-xs text-primary mt-1 font-medium">View Pricing →</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Custom automation pricing */}
      <section className="py-12 sm:py-16 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp} className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4">Custom Automation</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Need workflows, AI agents, CRM builds, or multi-tenant systems? We scope and price per project based on complexity and timeline.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8 text-left">
              {[
                { tier: "Starter", price: "From $299", desc: "Simple workflow automation — 1-3 steps, basic integrations. Delivered in 2-3 days." },
                { tier: "Business", price: "From $999", desc: "Complex multi-step workflows with integrations, testing, and documentation. 1-2 weeks." },
                { tier: "Enterprise", price: "Custom Quote", desc: "Full platform builds, multi-tenant systems, and bespoke solutions. Scoped per project." },
              ].map((tier, i) => (
                <div key={i} className="p-4 rounded-xl bg-card/60 border border-border/50">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{tier.tier}</p>
                  <p className="text-xl font-bold text-foreground font-display mb-2">{tier.price}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tier.desc}</p>
                </div>
              ))}
            </div>
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 border-0">
              <Link to="/#contact">Get a Custom Quote <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ-style pricing notes */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl mx-auto">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h2 className="text-2xl font-bold font-display mb-2">Good to Know</h2>
            </motion.div>
            {[
              { q: "Do I need to buy all products?", a: "No. Each product is completely independent. Sign up only for what you need." },
              { q: "Is there a free trial?", a: "Most products offer a free trial or freemium tier. Check each product's pricing page for details." },
              { q: "Can I pay monthly or annually?", a: "Both options are available. Annual plans typically offer 2 months free." },
              { q: "What about custom automation projects?", a: "Contact us for a scoped quote. We offer fixed-price projects and monthly retainers." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="mb-4 p-5 rounded-xl bg-card/50 border border-border/50">
                <h4 className="font-semibold text-foreground mb-1">{item.q}</h4>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
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
