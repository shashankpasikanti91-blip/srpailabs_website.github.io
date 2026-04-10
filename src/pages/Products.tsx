import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import srpLogo from "@/assets/srp-ai-logo.png";
import { products, productsByCategory, PRODUCT_COUNT } from "@/config/products";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const stagger = { animate: { transition: { staggerChildren: 0.07 } } };

export default function Products() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-background/80 border-b border-border/30">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={srpLogo} alt="SRP AI Labs" className="h-10 sm:h-11 w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
            </Link>
            <div className="hidden md:flex items-center gap-5">
              <Link to="/products" className="text-sm text-primary font-medium">Products</Link>
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
        <div className="absolute top-0 right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(265 85% 65%), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {PRODUCT_COUNT} AI Products + 1 Coming Soon
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4">
                Our <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">AI Products</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl mb-8">
                Enterprise platforms, industry solutions, and consumer apps — each with its own login, database, and deployment.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products by Category */}
      <section className="pb-20 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
            {productsByCategory.map(({ category, items }) => (
              <div key={category} className="mb-12">
                <motion.div variants={fadeInUp} className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 border border-border/50 px-3 py-1.5 rounded-full">{category}</span>
                </motion.div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {items.map((product, i) => (
                    <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                      <a href={product.url} target="_blank" rel="noopener noreferrer"
                        className={`flex flex-col h-full p-6 rounded-2xl bg-gradient-to-br ${product.gradientColor} border border-border/50 ${product.border} hover:border-primary/50 hover:shadow-[0_8px_40px_hsl(265_85%_65%/0.15)] transition-all duration-300 group`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-background/60 border border-border/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <product.icon className={`w-6 h-6 ${product.iconColor}`} />
                          </div>
                          <div className="flex items-center gap-2">
                            {product.isNew && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400">NEW</span>}
                            {product.isComingSoon && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-400">COMING SOON</span>}
                            <span className="w-8 h-8 rounded-lg bg-background/60 border border-border/60 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-all">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-foreground font-display mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-xs text-primary font-medium mb-2">{product.tagline}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{product.description}</p>
                        <div className="mt-4 pt-4 border-t border-border/40">
                          <ul className="space-y-1.5">
                            {product.features.slice(0, 3).map((f, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className={`w-1.5 h-1.5 rounded-full ${product.iconColor.replace('text-', 'bg-')}`} />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                            Visit {product.name} <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">Not sure which product to use?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Tell us your use case and our team will point you to the right system — or build something custom.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 border-0">
                <Link to="/#contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-purple-500/30 hover:border-purple-500/60">
                <Link to="/platform">View Platform Architecture <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 SRP AI Labs. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms</Link>
            <a href="https://srpailabs.com" className="hover:text-primary transition-colors">srpailabs.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
