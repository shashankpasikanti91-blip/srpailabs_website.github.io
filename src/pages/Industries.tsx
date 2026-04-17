import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, UserCheck, HeartPulse, TrendingUp, Leaf, GraduationCap, BookOpen, ChevronDown, Menu, X } from "lucide-react";
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

const industries = [
  {
    icon: Building2, title: "Enterprises & HR Teams",
    desc: "Full employee lifecycle management — hiring to retirement. Payroll, attendance, performance tracking, and HR analytics for growing teams.",
    product: "HRMS", productDesc: "SRP HRMS — Enterprise HR Platform", color: "text-purple-400",
    features: ["Employee lifecycle management", "AI-powered payroll automation", "Attendance & leave tracking", "Performance reviews & KPIs", "Onboarding workflows"],
  },
  {
    icon: UserCheck, title: "Recruitment Agencies",
    desc: "Reduce time-to-hire with resume screening, automated interview scheduling, and a smart ATS that learns your hiring patterns.",
    product: "SmartRecruit", productDesc: "SmartRecruit — AI ATS Platform", color: "text-cyan-400",
    features: ["AI resume scoring & matching", "Automated candidate messaging", "Interview scheduling automation", "Pipeline visibility dashboard", "Offer letter generation"],
  },
  {
    icon: HeartPulse, title: "Healthcare Providers",
    desc: "Reduce admin burden with automated patient intake, scheduling, billing, and documentation across your hospital or clinic network.",
    product: "MediFlow", productDesc: "MediFlow — Hospital AI System", color: "text-rose-400",
    features: ["AI patient intake chatbot", "Smart appointment scheduling", "Automated billing & coding", "Medical documentation AI", "OPD registration automation"],
  },
  {
    icon: TrendingUp, title: "Sales & Growth Teams",
    desc: "Manage leads, candidates, and conversions in one intelligent system. Automated outreach, pipeline tracking, and real-time analytics.",
    product: "Growth OS", productDesc: "Growth OS — Sales Intelligence Platform", color: "text-green-400",
    features: ["Lead scoring & qualification", "Automated outreach sequences", "Pipeline management", "Revenue forecasting", "CRM integrations"],
  },
  {
    icon: Leaf, title: "Health-Conscious Consumers",
    desc: "Snap a photo of your meal and get accurate calorie, macro, and micro nutrient analysis instantly.",
    product: "NutriSutra", productDesc: "NutriSutra — AI Nutrition App", color: "text-emerald-400",
    features: ["Photo-based food recognition", "Instant calorie & macro analysis", "Personalized meal plans", "Progress tracking", "Nutritionist-grade insights"],
  },
  {
    icon: BookOpen, title: "Education & Institutions",
    desc: "Education platform for students, teachers, and institutions — structured learning workflows, progress analytics, study support, and institutional management.",
    product: "SRP Education AI", productDesc: "SRP Education AI — Student Success Platform", color: "text-indigo-400",
    features: ["Student progress & success analytics", "AI-powered study support", "Institutional management dashboards", "Structured learning workflows", "Academic performance tracking"],
  },
  {
    icon: GraduationCap, title: "Parents & Kids",
    desc: "Cognitive learning system for children — adaptive lessons, gamified challenges, and personalized learning paths that evolve with each child.",
    product: "SRP Kids", productDesc: "SRP Kids — AI Learning Platform (Coming Soon)", color: "text-orange-400",
    features: ["Adaptive learning engine", "Age-appropriate AI content", "Gamified challenges", "Parent progress dashboard", "Multi-subject coverage"],
  },
];

export default function Industries() {
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
              <Link to="/industries" className="text-sm text-primary font-medium">Industries</Link>
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
        <div className="absolute top-0 right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(320 90% 60%), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" /> Who We Serve
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4">
                Built for <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Your Industry</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl mb-8">
                Purpose-built products for healthcare, HR, recruitment, education, sales, and more. Real workflows, not generic automation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="space-y-5 max-w-5xl mx-auto">
            {industries.map((ind, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ x: 4 }}
                className="group p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ind.icon className={`w-7 h-7 ${ind.color}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold text-foreground font-display">{ind.title}</h3>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">{ind.product}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{ind.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {ind.features.map((f, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-muted/50 border border-border/50 text-muted-foreground">{f}</span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground/70 mt-3">{ind.productDesc}</p>
                  </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">Don't see your industry?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">We build custom automation systems for any business. Share your workflow and we'll scope the right solution.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 border-0">
                <Link to="/#contact">Get Custom Automation <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-purple-500/30 hover:border-purple-500/60">
                <Link to="/products">Browse All Products</Link>
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
