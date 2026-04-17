import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Shield, Database, Layers, Building2, Globe, Lock, Zap, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import srpLogo from "@/assets/srp-ai-logo.png";
import { products, PRODUCT_COUNT } from "@/config/products";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};
const stagger = { animate: { transition: { staggerChildren: 0.07 } } };

export default function Platform() {
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
              <Link to="/platform" className="text-sm text-primary font-medium">Platform</Link>
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
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(190 100% 50%), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" /> Platform Architecture
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4">
                One Ecosystem.<br /><span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">{products.length} Independent Systems.</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl mb-8">
                SRP AI Labs builds each product as a completely isolated system — separate authentication, separate database, independent deployment — all under one brand.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Architecture principles */}
      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Lock, title: "Separate Authentication", desc: "Each product has its own fully independent login system. Users authenticate directly with the product — no unified SSO, no cross-product access.", color: "text-purple-400" },
              { icon: Database, title: "Isolated Databases", desc: "Every product runs on a dedicated database. Hospital data, HR records, nutrition logs, and recruitment data are completely separated.", color: "text-cyan-400" },
              { icon: Layers, title: "Independent Deployments", desc: "Each product is deployed and scaled on its own infrastructure. Updating or scaling one product never affects another.", color: "text-pink-400" },
              { icon: Shield, title: "Air-Gap Security", desc: "No shared sessions, no shared memory, no cross-product data leaks. Enterprise-grade isolation between every system.", color: "text-green-400" },
              { icon: Globe, title: "Dedicated Subdomains", desc: "Every product lives at its own subdomain — hrms.srpailabs.com, mediflow.srpailabs.com, etc. Clean, professional URLs.", color: "text-orange-400" },
              { icon: Building2, title: "Unified Brand", desc: "All products are designed, built, and maintained by SRP AI Labs. Same quality standards, same support commitment — different domain expertise.", color: "text-blue-400" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -5 }}
                className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 hover:bg-primary/[0.03] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2 font-display">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="py-12 sm:py-16 bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold font-display mb-3">Platform Structure</h2>
              <p className="text-muted-foreground">srpailabs.com is the main hub. Each product runs independently.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="p-6 sm:p-8 rounded-2xl bg-background border border-border/60">
              <div className="text-center mb-6">
                <div className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-primary/30 font-bold text-foreground font-display">srpailabs.com — Main Hub</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {products.map((p) => (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center p-4 rounded-xl bg-card/60 border border-border/50 hover:border-primary/40 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-background border border-border/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <p.icon className={`w-4 h-4 ${p.iconColor}`} />
                    </div>
                    <div className="text-xs font-semibold text-foreground">{p.name}</div>
                    {p.isNew && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-rose-500/20 text-rose-400 mt-1">NEW</span>}
                    {p.isComingSoon && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-yellow-500/20 text-yellow-400 mt-1">SOON</span>}
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </a>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-6 p-3 rounded-xl bg-muted/20 border border-border/30">
                Each product has a separate login, separate database, and independent deployment. No cross-product sessions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">Why This Architecture?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-10">Isolation isn't just a technical choice — it's a business and security requirement.</p>
            </motion.div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: "Data Privacy", desc: "Your hospital's patient data never touches your HR system. Strict data isolation per product domain.", color: "text-green-400" },
                { icon: Zap, title: "Independent Scaling", desc: "If NutriSutra goes viral, it scales without affecting HRMS or SmartRecruit. Zero interference.", color: "text-yellow-400" },
                { icon: Layers, title: "Faster Innovation", desc: "Each product team can deploy features independently. No coordinated releases, no shared codebase bottlenecks.", color: "text-purple-400" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-start gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 text-left">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4">Want to see it in action?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 border-0">
                <Link to="/products">Browse All Products <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-purple-500/30 hover:border-purple-500/60">
                <Link to="/#contact">Contact Sales</Link>
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
