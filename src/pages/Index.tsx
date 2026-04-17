import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Workflow, Globe, Plug, Bot, Settings, ArrowRight, Linkedin, Github, Mail,
  Zap, BarChart3, CheckCircle, Rocket, Shield, Users, Code,
  MapPin, Phone, Sparkles, TrendingUp, Target, ExternalLink,
  Layers, Database, Cpu, ArrowUpRight, ChevronDown, Monitor, Activity,
  Brain, Building2, Menu, X,
  Sun, Moon, Leaf, GraduationCap, BookOpen, ChevronRight, Lock, ServerCog, Boxes, Cog,
  UserCheck, HeartPulse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import srpLogo from "@/assets/srp-ai-logo.png";

import { ChatWidget } from "@/components/ChatWidget";
import AppSwitcher from "@/components/AppSwitcher";
import ParticleNetwork from "@/components/ParticleNetwork";
import { products, productsByCategory, PRODUCT_COUNT } from "@/config/products";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

const AnimatedCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const num = parseInt(value.replace(/\D/g, ''));
  const isNumeric = !isNaN(num);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView && isNumeric) {
      let start = 0;
      const end = num;
      const duration = 2000;
      const stepTime = Math.max(Math.floor(duration / end), 16);
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, isNumeric, num]);

  return <span ref={ref}>{isNumeric && isInView ? `${count}${suffix}` : value}</span>;
};

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      contactSchema.parse(formData);
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        const text =
          `📩 <b>New Contact Form Submission</b>\n\n` +
          `👤 <b>Name:</b> ${formData.name}\n` +
          `📧 <b>Email:</b> ${formData.email}\n` +
          `📞 <b>Phone:</b> ${formData.phone || "N/A"}\n` +
          `💬 <b>Message:</b>\n${formData.message}`;
        try {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
          });
        } catch (_) {
          // Silent fail
        }
      }
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Validation error", description: error.errors[0].message, variant: "destructive" });
      }
    }
  };

  const ecosystemCards = [
    { icon: Boxes, label: "10 Products Live", color: "text-purple-400", bg: "from-purple-500/15 to-purple-500/5" },
    { icon: Building2, label: "6+ Industries", color: "text-cyan-400", bg: "from-cyan-500/15 to-cyan-500/5" },
    { icon: ServerCog, label: "Independent Systems", color: "text-blue-400", bg: "from-blue-500/15 to-blue-500/5" },
    { icon: Shield, label: "Secure Infrastructure", color: "text-emerald-400", bg: "from-emerald-500/15 to-emerald-500/5" },
    { icon: Workflow, label: "Workflow Automation", color: "text-pink-400", bg: "from-pink-500/15 to-pink-500/5" },
    { icon: Rocket, label: "Scalable Deployments", color: "text-amber-400", bg: "from-amber-500/15 to-amber-500/5" },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Cursor glow */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-[0.06] hidden lg:block"
        style={{
          x: useTransform(smoothX, (v) => v - 300),
          y: useTransform(smoothY, (v) => v - 300),
          background: "radial-gradient(circle, hsl(265 85% 65%) 0%, hsl(190 100% 50% / 0.5) 40%, transparent 70%)",
        }}
      />

      {/* ==================== SECTION A: ANNOUNCEMENT BAR ==================== */}
      <div className="bg-gradient-to-r from-purple-600/10 via-primary/5 to-cyan-500/10 border-b border-border/20">
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-2.5">
          <p className="text-center text-xs sm:text-sm text-muted-foreground/80 font-medium">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {PRODUCT_COUNT} AI-Powered Products Live
              <Link to="/products" className="text-primary hover:text-primary/80 transition-colors font-semibold ml-1 inline-flex items-center gap-0.5">
                Explore <ChevronRight className="w-3 h-3" />
              </Link>
            </span>
          </p>
        </div>
      </div>

      {/* ==================== HEADER ==================== */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-2xl bg-background/80 border-b border-border/30"
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <a href="#home" className="flex items-center gap-2 sm:gap-3">
              <img src={srpLogo} alt="SRP AI Labs" className="h-11 sm:h-12 md:h-[3.25rem] w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
            </a>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Products <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[340px] bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-[500px] overflow-y-auto">
                  {productsByCategory.map(({ category, items }) => (
                    <div key={category} className="mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 px-3 pt-2 pb-1">{category}</p>
                      {items.map((p) => (
                        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-primary/5 transition-colors group/item">
                          <div className="w-8 h-8 rounded-lg bg-card border border-border/60 flex items-center justify-center flex-shrink-0">
                            <p.icon className={`w-4 h-4 ${p.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground flex items-center gap-1.5">
                              {p.name}
                              {p.isNew && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400">NEW</span>}
                              {p.isComingSoon && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-yellow-500/20 text-yellow-400">SOON</span>}
                            </div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">{p.desc}</div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {[
                { label: "Technology", href: "/technology" },
                { label: "Platform", href: "/platform" },
                { label: "Industries", href: "/industries" },
                { label: "Pricing", href: "/pricing" },
                { label: "Security", href: "/security" },
              ].map((item) => (
                <Link key={item.label} to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <a href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Button size="sm" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-6 border-0 shadow-[0_2px_15px_hsl(265_85%_65%/0.3)]">
                <a href="#contact">Get Started</a>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[80vw] max-w-xs bg-background border-l border-border/40 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border/40">
                <span className="text-sm font-bold text-foreground font-display">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-foreground"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-4">
                <div className="mb-1">
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="flex items-center justify-between w-full py-3 px-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                  >
                    Products
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 pb-2 space-y-1">
                          {productsByCategory.map(({ category, items }) => (
                            <div key={category}>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 px-3 pt-3 pb-1">{category}</p>
                              {items.map((p) => (
                                <a
                                  key={p.name}
                                  href={p.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <p.icon className={`w-4 h-4 ${p.iconColor}`} />
                                  <span className="text-sm text-muted-foreground">{p.name}</span>
                                  {p.isNew && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400">NEW</span>}
                                  {p.isComingSoon && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-yellow-500/20 text-yellow-400">SOON</span>}
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {[
                  { label: "Technology", href: "/technology" },
                  { label: "Platform", href: "/platform" },
                  { label: "Industries", href: "/industries" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "Security", href: "/security" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  Contact
                </a>
              </div>
              <div className="p-4 border-t border-border/40">
                <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full border-0" size="lg">
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Get Started</a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================== SECTION B: HERO ==================== */}
      <section id="home" className="relative overflow-hidden" style={{ minHeight: '88vh' }}>
        {/* Background — subtle particles, no heavy bloom */}
        <div className="absolute inset-0">
          <ParticleNetwork />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-[1]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1]" />
        </div>

        <div className="relative z-10 mx-auto w-full px-6 md:px-10 lg:px-12" style={{ maxWidth: '1440px', paddingTop: '48px', paddingBottom: '64px' }}>
          <div className="grid lg:grid-cols-[58fr_42fr] gap-8 lg:gap-8 items-center" style={{ minHeight: 'calc(88vh - 110px)' }}>

            {/* ===== LEFT COLUMN ===== */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col order-1"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/[0.06] border border-purple-500/20 text-purple-300" style={{ padding: '10px 18px', fontSize: '14px', fontWeight: 500 }}>
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
                  Intelligent Systems for Real Operations
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="font-display font-extrabold mb-7" style={{ lineHeight: 0.95, letterSpacing: '-2px', maxWidth: '95%' }}>
                <span className="text-foreground block text-[49px] md:text-[59px] lg:text-[68px] xl:text-[80px]">Modern Systems.</span>
                <span className="block text-[49px] md:text-[59px] lg:text-[68px] xl:text-[80px]" style={{
                  backgroundImage: 'linear-gradient(135deg, hsl(265 85% 65%), hsl(230 85% 62%), hsl(190 100% 50%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Real Outcomes.</span>
              </h1>

              {/* Subheadline */}
              <p className="mb-9" style={{
                fontSize: 'clamp(18px, 1.6vw, 24px)',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.82)',
                maxWidth: '680px',
                fontWeight: 400,
              }}>
                Software that handles the repetitive work — across HR, hiring, healthcare, education, and business operations. Built for teams that need results, not demos.
              </p>

              {/* Product Chips — Row 1 (desktop order-4, mobile order-5) */}
              <div className="flex flex-col gap-2 mb-10 order-5 sm:order-4">
                <div className="flex flex-wrap gap-2.5">
                  {products.filter(p => !p.isComingSoon).slice(0, 5).map((p) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/70 hover:border-purple-500/40 hover:text-purple-300 hover:bg-purple-500/[0.06] transition-all duration-300" style={{ padding: '10px 14px', fontSize: '14px', fontWeight: 500 }}>
                      <p.icon className={`w-3.5 h-3.5 ${p.iconColor}`} />
                      {p.name}
                    </a>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {products.filter(p => !p.isComingSoon).slice(5, 9).map((p) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/70 hover:border-purple-500/40 hover:text-purple-300 hover:bg-purple-500/[0.06] transition-all duration-300" style={{ padding: '10px 14px', fontSize: '14px', fontWeight: 500 }}>
                      <p.icon className={`w-3.5 h-3.5 ${p.iconColor}`} />
                      {p.name}
                    </a>
                  ))}
                  <Link to="/products"
                    className="inline-flex items-center gap-1.5 rounded-full text-purple-300 border border-purple-500/30 hover:bg-purple-500/[0.06] transition-all duration-300" style={{ padding: '10px 14px', fontSize: '14px', fontWeight: 500 }}>
                    +{products.filter(p => p.isComingSoon).length} More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* CTA Buttons (desktop order-5, mobile order-4) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3.5 order-4 sm:order-5 mb-9 sm:mb-0"
              >
                <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-500 hover:to-blue-400 rounded-full border-0 shadow-[0_4px_30px_hsl(265_85%_65%/0.35)] hover:shadow-[0_8px_50px_hsl(265_85%_65%/0.5)] hover:-translate-y-0.5 transition-all w-full sm:w-auto" style={{ height: '52px', padding: '0 28px', fontSize: '16px' }}>
                  <a href="#products-overview" className="group flex items-center justify-center gap-2">
                    Explore Products
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" asChild className="rounded-full border-white/[0.12] hover:border-purple-500/40 hover:bg-purple-500/[0.05] text-foreground w-full sm:w-auto" style={{ height: '52px', padding: '0 28px', fontSize: '16px' }}>
                  <a href="#contact" className="flex items-center justify-center gap-2">
                    Book a Demo
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* ===== RIGHT COLUMN — Desktop: Logo + Floating Chips ===== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:flex items-center justify-center order-2"
              style={{ marginTop: '-24px' }}
            >
              {/* Fixed 420×420 orbit container */}
              <div className="relative" style={{ width: '420px', height: '420px' }}>
                {/* Central logo — exact center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <img
                    src={srpLogo}
                    alt="SRP AI Labs"
                    className="w-[200px] h-auto object-contain"
                    style={{ filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.10))' }}
                  />
                </div>

                {/* 6 floating chips — 3 rows × 2 columns, mathematically symmetric */}
                {[
                  { label: "Scalable Deployments", icon: Rocket, color: "text-amber-400", bg: "from-amber-500/10 to-amber-500/[0.03]", top: '7%', left: '-4%' },
                  { label: "10 Products Live", icon: Boxes, color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/[0.03]", top: '7%', right: '-4%', left: 'auto' },
                  { label: "Workflow Automation", icon: Workflow, color: "text-pink-400", bg: "from-pink-500/10 to-pink-500/[0.03]", top: '42%', left: '-12%' },
                  { label: "6+ Industries", icon: Building2, color: "text-cyan-400", bg: "from-cyan-500/10 to-cyan-500/[0.03]", top: '42%', right: '-12%', left: 'auto' },
                  { label: "Secure Infrastructure", icon: Shield, color: "text-emerald-400", bg: "from-emerald-500/10 to-emerald-500/[0.03]", top: '77%', left: '-4%' },
                  { label: "Independent Systems", icon: ServerCog, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/[0.03]", top: '77%', right: '-4%', left: 'auto' },
                ].map((chip, i) => (
                  <div
                    key={chip.label}
                    className="absolute z-20"
                    style={{ top: chip.top, left: chip.left ?? undefined, right: (chip as any).right ?? undefined }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    >
                      <motion.div
                        animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                        transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                        className={`flex items-center gap-2 rounded-[14px] bg-gradient-to-br ${chip.bg} border border-white/[0.06] backdrop-blur-md hover:border-purple-500/20 transition-all duration-300 cursor-default`}
                        style={{ padding: '12px 16px' }}
                      >
                        <chip.icon className={`w-4 h-4 ${chip.color} flex-shrink-0`} />
                        <span className="text-[14px] font-medium text-foreground/90 whitespace-nowrap">{chip.label}</span>
                      </motion.div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ===== RIGHT COLUMN — Mobile: Logo + Simplified Chips ===== */}
            <div className="lg:hidden flex flex-col items-center gap-6 order-6 mt-2">
              <img
                src={srpLogo}
                alt="SRP AI Labs"
                className="w-[130px] md:w-[180px] h-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.08))' }}
              />
              <div className="flex flex-wrap justify-center gap-2">
                {ecosystemCards.slice(0, 4).map((card) => (
                  <div key={card.label} className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-br ${card.bg} border border-white/[0.06] backdrop-blur-md`}>
                    <card.icon className={`w-3.5 h-3.5 ${card.color}`} />
                    <span className="text-xs font-medium text-foreground/80">{card.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== SECTION C: TRUST STRIP ==================== */}
      <section className="relative border-y border-border/30 bg-card/20">
        <div className="py-5 sm:py-6">
          <div className="marquee-container">
            <div className="marquee-track">
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center gap-6 sm:gap-10 px-3 sm:px-5">
                  {["HR MANAGEMENT", "RECRUITMENT", "HEALTHCARE", "EDUCATION", "SALES & GROWTH", "MARKETING", "OPERATIONS", "REVENUE AUTOMATION", "WORKFLOW MANAGEMENT", "SECURE INFRASTRUCTURE"].map((text, i) => (
                    <span key={`${setIdx}-${i}`} className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
                      <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-muted-foreground/60 hover:text-primary/80 transition-colors duration-300">{text}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 opacity-40" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION D: METRICS ==================== */}
      <section className="py-16 sm:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-card/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-border/30 py-8 sm:py-12 px-6 sm:px-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              {[
                { value: "10", suffix: "", label: "Specialized Products" },
                { value: "6", suffix: "+", label: "Industries Served" },
                { value: "5", suffix: "", label: "Product Categories" },
                { value: "100", suffix: "%", label: "Independent Deployments" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-1" style={{
                    backgroundImage: "linear-gradient(135deg, hsl(320 90% 65%), hsl(265 85% 65%), hsl(190 100% 50%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mt-1 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== SECTION E: PRODUCT ECOSYSTEM ==================== */}
      <section id="products-overview" className="py-14 sm:py-20 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, hsl(265 85% 65%), transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Product Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
                One Platform. <span className="gradient-text">Ten Products.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Each product runs on its own infrastructure with dedicated databases, access controls, and deployment. Use one or use the full suite.
              </p>
            </motion.div>
            {productsByCategory.map(({ category, items }) => (
              <div key={category} className="max-w-6xl mx-auto mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3 px-1">{category}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {items.map((product, i) => (
                    <motion.a
                      key={i}
                      variants={fadeInUp}
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4 }}
                      className={`group flex items-center gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${product.gradientColor} border border-border/50 ${product.border} hover:border-primary/50 hover:shadow-[0_4px_20px_hsl(265_85%_65%/0.15)] transition-all duration-300`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-background/60 border border-border/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <product.icon className={`w-5 h-5 ${product.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-0.5">
                          {product.name}
                          {product.isNew && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-rose-500/20 text-rose-400">NEW</span>}
                          {product.isComingSoon && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-yellow-500/20 text-yellow-400">SOON</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">{product.desc}</div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </motion.a>
                  ))}
                </div>
              </div>
            ))}
            <motion.div variants={fadeInUp} className="text-center mt-4">
              <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mr-6">
                View all products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/platform" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Platform architecture <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== SECTION F: WHY SRP ==================== */}
      <section id="why-srp" className="py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.015] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Why SRP AI Labs
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
                Why Teams Choose <span className="gradient-text">SRP AI Labs</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">Enterprise-grade systems. Startup-speed delivery. Real products, real results.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
              {[
                { icon: Rocket, title: "Fast Deployment", desc: "Each product ships production-ready with its own infrastructure. Go live in days, not months." },
                { icon: Target, title: "Solves Real Problems", desc: "Every product is built around a specific workflow — from hiring pipelines to patient management." },
                { icon: Brain, title: "Practical Intelligence", desc: "AI is built into workflows where it adds value — not bolted on for marketing." },
                { icon: Layers, title: "Independent Systems", desc: "Separate databases, isolated deployments, dedicated environments. Scale exactly what you need." },
                { icon: TrendingUp, title: "Scales With You", desc: "Multi-tenant isolation, horizontal scaling, and reliable infrastructure from day one." },
                { icon: Users, title: "Built for Real Teams", desc: "Designed for operators, managers, and decision-makers who need working software." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}
                  className="group p-6 sm:p-7 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/[0.03] hover:shadow-[0_0_25px_hsl(265_85%_65%/0.15)] transition-all duration-400">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== TRUST SIGNALS ==================== */}
      <section className="py-8 sm:py-10 border-y border-border/20 bg-card/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground/70">
            {[
              "Founder-led delivery",
              "Custom builds available",
              "Fast implementation",
              "Enterprise-grade security",
              "Transparent pricing",
              "Global support",
            ].map((signal) => (
              <span key={signal} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400/70" />
                {signal}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== SECTION G: TECHNOLOGY ==================== */}
      <section id="technology" className="py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(265 85% 65%), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
                Platform Technology
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
                Built on <span className="gradient-text">Reliable Infrastructure</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Secure, performant, and scalable — the same stack powering all ten products.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
              {[
                { icon: Brain, title: "Modern AI Models", desc: "Powered by the latest reasoning and language models — updated as capabilities improve.", color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5" },
                { icon: Cpu, title: "Context-Aware Processing", desc: "Understands inputs, prior interactions, and domain-specific knowledge to surface the right action.", color: "text-pink-400", bg: "from-pink-500/10 to-pink-500/5" },
                { icon: Workflow, title: "Workflow Automation", desc: "Multi-step execution engine handling API calls, data processing, notifications, and triggers.", color: "text-cyan-400", bg: "from-cyan-500/10 to-cyan-500/5" },
                { icon: Lock, title: "Secure Infrastructure", desc: "Multi-tenant isolation, encrypted data at rest and in transit, role-based access, and full audit trails.", color: "text-emerald-400", bg: "from-emerald-500/10 to-emerald-500/5" },
                { icon: ServerCog, title: "Scalable Backend", desc: "Independent deployments, horizontal scaling, and dedicated databases per product.", color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5" },
                { icon: Plug, title: "500+ Integrations", desc: "Connect with existing tools through APIs, webhooks, and pre-built connectors.", color: "text-amber-400", bg: "from-amber-500/10 to-amber-500/5" },
              ].map((card, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}
                  className={`group p-6 sm:p-7 rounded-2xl bg-gradient-to-br ${card.bg} border border-border/40 hover:border-primary/30 transition-all duration-300`}>
                  <div className="w-11 h-11 rounded-xl bg-card/60 border border-border/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInUp} className="text-center mt-8">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-7 border-0 shadow-[0_4px_20px_hsl(265_85%_65%/0.3)]">
                  <Link to="/technology" className="flex items-center gap-2">
                    Explore Technology <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="rounded-full px-7 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5">
                  <Link to="/platform">View Platform Architecture</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== SECTION H: INDUSTRY SOLUTIONS ==================== */}
      <section id="industries" className="py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.015] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Industry Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
                Purpose-Built for <span className="gradient-text">Your Industry</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">Software designed around real workflows — not generic templates repurposed for every vertical.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                { icon: Building2, title: "Human Resources", desc: "Employee lifecycle management, payroll, attendance, and workforce analytics.", tag: "HRMS", href: "https://hrms.srpailabs.com" },
                { icon: UserCheck, title: "Recruitment", desc: "Applicant tracking, AI screening, and structured hiring pipelines.", tag: "SmartRecruit", href: "https://recruit.srpailabs.com" },
                { icon: HeartPulse, title: "Healthcare", desc: "Patient management, appointments, prescriptions, billing, and multi-facility workflows.", tag: "MediFlow", href: "https://mediflow.srpailabs.com" },
                { icon: BookOpen, title: "Education", desc: "Student progress tracking, institutional analytics, and AI-assisted learning.", tag: "Education AI", href: "https://edu.srpailabs.com" },
                { icon: TrendingUp, title: "Sales & Growth", desc: "Lead management, pipeline automation, outreach sequences, and revenue tracking.", tag: "Growth OS", href: "https://growth.srpailabs.com" },
                { icon: BarChart3, title: "Marketing", desc: "Campaign management, creative generation, social scheduling, and analytics.", tag: "Marketing OS", href: "https://app.srpailabs.com" },
                { icon: Cog, title: "Operations", desc: "CRM, revenue automation, workflow orchestration, and business process management.", tag: "Automation OS", href: "https://automation.srpailabs.com" },
              ].map((uc, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}>
                  <a href={uc.href} target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col p-5 sm:p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/[0.03] hover:shadow-[0_0_25px_hsl(265_85%_65%/0.15)] transition-all duration-400 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                        <uc.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-primary/60">{uc.tag}</span>
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{uc.title}</h3>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
                  </a>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInUp} className="text-center mt-8">
              <Link to="/industries" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                View all industries <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== SECTION I: CTA ==================== */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(265 85% 65%), transparent 60%)', filter: 'blur(80px)' }} />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Run Your Business
              <br />
              <span className="gradient-text">More Efficiently</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              From HR and recruitment to healthcare and education — pick the right product for your team and go live in days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 shadow-[0_4px_30px_hsl(265_85%_65%/0.4),0_2px_15px_hsl(190_100%_50%/0.2)] hover:shadow-[0_8px_50px_hsl(265_85%_65%/0.5)] hover:-translate-y-0.5 transition-all border-0">
                <Link to="/products" className="group flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5">
                <a href="#contact">Book a Demo</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-border/50 hover:border-primary/40 hover:bg-primary/5">
                <a href="mailto:info@srpailabs.com">Contact Sales</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Get in Touch
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
                Ready to <span className="gradient-text">Get Started</span>?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Whether you need a product for your industry, a custom workflow, or enterprise integration — we respond within hours.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-5">
                <h4 className="text-lg sm:text-xl font-semibold text-foreground font-display">Contact Information</h4>
                <div className="space-y-3">
                  <a href="mailto:info@srpailabs.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <p className="text-foreground font-medium text-sm">info@srpailabs.com</p>
                    </div>
                  </a>
                  <a href="tel:+60122824566" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">WhatsApp / Phone</p>
                      <p className="text-foreground font-medium text-sm">+60 12-282 4566</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                      <p className="text-foreground font-medium text-sm">India / Remote</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <a href="https://www.linkedin.com/in/sashyank-p-9785a9303/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/shashankpasikanti91-blip" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input placeholder="Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="bg-muted/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground rounded-xl" />
                      <Input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="bg-muted/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground rounded-xl" />
                      <Input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-muted/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground rounded-xl" />
                      <Textarea placeholder="Message *" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required rows={5} className="bg-muted/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground rounded-xl" />
                      <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full border-0 shadow-[0_2px_15px_hsl(265_85%_65%/0.3)]" size="lg">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION J: FOOTER ==================== */}
      <footer className="py-10 sm:py-14 relative border-t border-transparent" style={{ borderImage: 'linear-gradient(90deg, transparent, hsl(320 90% 60% / 0.3), hsl(265 85% 65% / 0.5), hsl(190 100% 50% / 0.3), transparent) 1' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 mb-8 sm:mb-10">
            <div className="col-span-2">
              <img src={srpLogo} alt="SRP AI Labs" className="h-12 w-auto mb-4 drop-shadow-[0_0_10px_rgba(139,92,246,0.2)]" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
                Specialized software for HR, hiring, healthcare, education, and growth. Founder-led. Global delivery.
              </p>
              <p className="text-xs text-muted-foreground/60">
                SRP AI Labs Platform &mdash; <a href="https://srpailabs.com" className="hover:text-primary transition-colors">srpailabs.com</a>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground text-sm">Products</h4>
              <ul className="space-y-2.5">
                {products.map((p) => (
                  <li key={p.name}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                      <p.icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {p.name}
                      {p.isNew && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-rose-500/20 text-rose-400">NEW</span>}
                      {p.isComingSoon && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-yellow-500/20 text-yellow-400">SOON</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground text-sm">Company</h4>
              <ul className="space-y-2.5">
                <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
                <li><Link to="/technology" className="text-sm text-muted-foreground hover:text-primary transition-colors">Technology</Link></li>
                <li><Link to="/platform" className="text-sm text-muted-foreground hover:text-primary transition-colors">Platform</Link></li>
                <li><Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
                <li><Link to="/industries" className="text-sm text-muted-foreground hover:text-primary transition-colors">Industries</Link></li>
                <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link to="/security" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security</Link></li>
                <li><a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground text-sm">Contact</h4>
              <ul className="space-y-2.5">
                <li><a href="mailto:info@srpailabs.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">info@srpailabs.com</a></li>
                <li><a href="tel:+60122824566" className="text-sm text-muted-foreground hover:text-primary transition-colors">+60 12-282 4566</a></li>
                <li className="text-sm text-muted-foreground">India / Remote</li>
              </ul>
              <div className="flex gap-3 mt-5">
                <a href="https://www.linkedin.com/in/sashyank-p-9785a9303/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://github.com/shashankpasikanti91-blip" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground/60 text-center">&copy; {new Date().getFullYear()} SRP AI Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AppSwitcher />
      <ChatWidget />
    </div>
  );
};

export default Index;
