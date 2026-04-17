import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import { 
  Workflow, MessageSquare, Globe, Plug, Bot, Settings, ArrowRight, Linkedin, Github, Mail,
  Zap, Clock, Bell, BarChart3, CheckCircle, Rocket, Shield, Users, Code, Wrench,
  HelpCircle, MapPin, Phone, Sparkles, FileText, TrendingUp, Target, ExternalLink,
  MousePointer2, Layers, Database, Cpu, ArrowUpRight, ChevronDown, Monitor, Activity,
  Brain, Briefcase, HeartPulse, UserCheck, Building2, Star, Menu, X, Minus,
  CircleDot, MousePointerClick, CalendarCheck, PhoneCall, Sun, Moon,
  Leaf, GraduationCap, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { products, productsByCategory } from "@/config/products";

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

// Animated counter component
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

      // Send Telegram notification
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
          // Telegram send failed silently – don't block the UX
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

  return (
    <div className="min-h-screen bg-background relative">
      {/* Cursor glow follower — SRP brand purple/cyan */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-[0.06]"
        style={{
          x: useTransform(smoothX, (v) => v - 300),
          y: useTransform(smoothY, (v) => v - 300),
          background: "radial-gradient(circle, hsl(265 85% 65%) 0%, hsl(190 100% 50% / 0.5) 40%, transparent 70%)",
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-2xl bg-background/80 border-b border-border/30"
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <a href="#home" className="flex items-center gap-2 sm:gap-3">
              <img src={srpLogo} alt="SRP AI Labs" className="h-10 sm:h-11 w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
            </a>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              {/* Products dropdown */}
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
                {/* Products expandable */}
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

      {/* ==================== HERO ==================== */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Interactive particle network background */}
        <div className="absolute inset-0">
          <ParticleNetwork />
          {/* Subtle gradient overlay at top and bottom for readability */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-[1]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[1]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-10 md:mb-16">
            {/* Left - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-5 sm:mb-8"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
                SRP AI Labs — 10 Specialized Products for Modern Business
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight font-display mb-5 sm:mb-8">
                <span className="text-foreground">Intelligent Systems.</span>
                <br />
                <span className="gradient-text-glow text-glow" style={{
                  backgroundImage: "linear-gradient(135deg, hsl(320 90% 65%), hsl(265 85% 65%), hsl(220 85% 60%), hsl(190 100% 50%))",
                  backgroundSize: "200% 200%",
                  animation: "text-shimmer 4s ease-in-out infinite",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Measurable Outcomes.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-6 sm:mb-10 max-w-xl">
                SRP AI Labs builds specialized software for HR, recruitment, sales, healthcare, education, and operations — designed to <strong className="text-foreground">automate workflows and deliver measurable results</strong>.
              </p>

              {/* Product pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-10">
                {products.map((p) => (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-card/60 border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-300">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                    {p.name}
                    {p.isNew && <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400">NEW</span>}
                    {p.isComingSoon && <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-yellow-500/20 text-yellow-400">SOON</span>}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2"
              >
                <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-6 sm:px-8 shadow-[0_4px_30px_hsl(265_85%_65%/0.4),0_2px_15px_hsl(190_100%_50%/0.2)] hover:shadow-[0_8px_50px_hsl(265_85%_65%/0.5),0_4px_25px_hsl(190_100%_50%/0.3)] hover:-translate-y-0.5 transition-all border-0 w-full sm:w-auto">
                  <a href="#products-overview" className="group flex items-center justify-center gap-2">
                    Explore Products
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-6 sm:px-8 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5 w-full sm:w-auto">
                  <a href="#contact" className="flex items-center justify-center gap-2">
                    Book a Demo
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right - Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:flex items-center justify-center"
            >
              <motion.img
                src={srpLogo}
                alt="SRP AI Labs"
                className="w-[200px] lg:w-[280px] drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Scrolling marquee ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 sm:mt-10 md:mt-14 py-4 sm:py-5 border-y border-border/30"
          >
            <div className="marquee-container">
              <div className="marquee-track">
                {[...Array(2)].map((_, setIdx) => (
                  <div key={setIdx} className="flex items-center gap-6 sm:gap-10 px-3 sm:px-5">
                    {["10 PRODUCTS LIVE", "MULTI-PRODUCT PLATFORM", "ENTERPRISE HRMS", "SMART RECRUITMENT", "HEALTHCARE SYSTEMS", "EDUCATION PLATFORM", "GROWTH AUTOMATION", "MARKETING AUTOMATION", "REVENUE OPERATIONS", "SECURE INFRASTRUCTURE", "MODULAR ARCHITECTURE", "INDEPENDENT DEPLOYMENTS", "WORKFLOW AUTOMATION", "MULTI-INDUSTRY", "AI-POWERED SYSTEMS", "SCALABLE BY DESIGN"].map((text, i) => (
                      <span key={`${setIdx}-${i}`} className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
                        <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-muted-foreground/60 hover:text-primary/80 transition-colors duration-300">{text}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 opacity-40" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 sm:mt-12 md:mt-16 bg-card/30 backdrop-blur-xl rounded-2xl border border-border/30 py-6 sm:py-8 px-4 sm:px-8"
          >
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
              {[
                { value: "10", suffix: "", label: "Product Systems Live" },
                { value: "6", suffix: "+", label: "Industries Served" },
                { value: "40", suffix: "+", label: "Workflow Automations" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-display" style={{
                    backgroundImage: "linear-gradient(135deg, hsl(320 90% 65%), hsl(265 85% 65%), hsl(190 100% 50%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    {stat.value === "24/7" ? "24/7" : <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== PRODUCT ECOSYSTEM OVERVIEW ==================== */}
      <section id="products-overview" className="py-14 sm:py-20 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, hsl(265 85% 65%), transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Product Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3">
                One Platform. <span className="gradient-text">Ten Specialized Products.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                Each product operates independently with its own login, database, and deployment — all under the SRP AI Labs platform. Use one product or the entire ecosystem.
              </p>
            </motion.div>
            {productsByCategory.map(({ category, items }) => (
              <div key={category} className="max-w-6xl mx-auto mb-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3 px-1">{category}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((product, i) => (
                    <motion.a
                      key={i}
                      variants={fadeInUp}
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className={`group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br ${product.gradientColor} border border-border/50 ${product.border} hover:border-primary/50 hover:shadow-[0_4px_20px_hsl(265_85%_65%/0.15)] transition-all duration-300`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-background/60 border border-border/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <product.icon className={`w-5 h-5 ${product.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                          {product.name}
                          {product.isNew && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-rose-500/20 text-rose-400">NEW</span>}
                          {product.isComingSoon && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-yellow-500/20 text-yellow-400">SOON</span>}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{product.desc}</div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </motion.a>
                  ))}
                </div>
              </div>
            ))}
            <motion.div variants={fadeInUp} className="text-center mt-2">
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

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== TECHNOLOGY / INTELLIGENCE ==================== */}
      <section id="technology" className="py-14 sm:py-20 md:py-24 relative overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(265 85% 65%), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Left content */}
                <motion.div variants={fadeInUp}>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-6">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
                    Platform Intelligence
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-5">
                    Intelligence <span className="gradient-text">Built Into</span>
                    <br />Every Workflow.
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
                    SRP AI Labs products use <strong className="text-foreground">contextual intelligence and workflow automation</strong> to handle complex business processes — so your team can focus on decisions, not repetitive tasks.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      { icon: Brain, text: "Contextual understanding — processes inputs from data, user actions, and prior interactions" },
                      { icon: Workflow, text: "Workflow orchestration with 500+ integrations and automated multi-step execution" },
                      { icon: Database, text: "Continuous learning — systems adapt based on outcomes and usage patterns" },
                      { icon: Shield, text: "Secure execution with role-based access and full audit trails" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        {item.text}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
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

                {/* Right — agent capability cards */}
                <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Bot, title: "Understand Context", desc: "Processes inputs from emails, data sources, user actions, and prior interactions to determine the right next step.", color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5" },
                    { icon: Brain, title: "Recommend Actions", desc: "Analyzes patterns and context to surface the right action — whether it's a follow-up, approval, or escalation.", color: "text-pink-400", bg: "from-pink-500/10 to-pink-500/5" },
                    { icon: Zap, title: "Execute Workflows", desc: "Runs multi-step processes automatically — API calls, data updates, notifications, and downstream triggers.", color: "text-cyan-400", bg: "from-cyan-500/10 to-cyan-500/5" },
                    { icon: CheckCircle, title: "Learn & Improve", desc: "Adapts over time based on outcomes, feedback, and usage patterns to deliver better results with every cycle.", color: "text-green-400", bg: "from-green-500/10 to-green-500/5" },
                  ].map((card, i) => (
                    <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}
                      className={`p-5 rounded-2xl bg-gradient-to-br ${card.bg} border border-border/40 hover:border-primary/30 transition-all`}>
                      <div className="w-10 h-10 rounded-xl bg-card/60 border border-border/60 flex items-center justify-center mb-4">
                        <card.icon className={`w-5 h-5 ${card.color}`} />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{card.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== INDUSTRY QUICK LINKS ==================== */}
      <section id="industries" className="py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.015] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Industry Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mb-3">
                Purpose-Built for <span className="gradient-text">Your Industry</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">Specialized software designed around real workflows — not generic templates.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                { icon: Building2, title: "Enterprise & HR", desc: "Complete HRMS with employee lifecycle management, payroll automation, and workforce analytics.", tag: "HRMS", href: "https://hrms.srpailabs.com" },
                { icon: UserCheck, title: "Recruitment", desc: "Applicant tracking, AI resume screening, and structured hiring pipelines that reduce time-to-hire.", tag: "SmartRecruit", href: "https://recruit.srpailabs.com" },
                { icon: HeartPulse, title: "Healthcare", desc: "Patient management, appointment scheduling, prescriptions, billing, and multi-facility workflows.", tag: "MediFlow", href: "https://mediflow.srpailabs.com" },
                { icon: TrendingUp, title: "Sales & Growth", desc: "Lead management, pipeline automation, outreach sequences, and revenue tracking in one system.", tag: "Growth OS", href: "https://growth.srpailabs.com" },
                { icon: Leaf, title: "Health & Nutrition", desc: "AI-powered meal analysis with instant calorie and macro breakdowns from photos or descriptions.", tag: "NutriSutra", href: "https://nutrisutra.srpailabs.com" },
                { icon: BookOpen, title: "Education", desc: "Student progress tracking, institutional analytics, and AI-assisted learning for modern education.", tag: "Education AI", href: "https://edu.srpailabs.com" },
                { icon: GraduationCap, title: "Kids Learning", desc: "Adaptive and gamified learning paths for children — personalized to age and skill level.", tag: "SRP Kids", href: "https://kids.srpailabs.com" },
              ].map((uc, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}>
                  <a href={uc.href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/[0.03] hover:shadow-[0_0_25px_hsl(265_85%_65%/0.15)] transition-all duration-400 h-full block">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                      <uc.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wide text-primary/70">{uc.tag}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{uc.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
                    </div>
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

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== WHY SRP ==================== */}
      <section id="why-srp" className="py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.015] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Why SRP AI Labs
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mb-3">
                Why Teams Choose <span className="gradient-text">SRP AI Labs</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">Enterprise capability. Startup speed. Real products for real operations.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                { icon: Layers, title: "Multi-Product Ecosystem", desc: "Ten specialized products across five categories — use one or build your entire operations stack on SRP." },
                { icon: Rocket, title: "Deploy in Days, Not Months", desc: "Each product ships production-ready with its own infrastructure. No lengthy implementation cycles." },
                { icon: Brain, title: "AI That Adds Real Value", desc: "Intelligence is built into workflows — not bolted on. Every AI feature solves a specific operational problem." },
                { icon: Database, title: "Modular Architecture", desc: "Independent databases, separate deployments, isolated environments. Scale what you need, when you need it." },
                { icon: Users, title: "Built for Real Teams", desc: "Designed for operators, HR managers, recruiters, and growth teams who need software that works on day one." },
                { icon: Shield, title: "Secure by Design", desc: "Multi-tenant isolation, encrypted data, role-based access, and audit trails across every product." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}
                  className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/[0.03] hover:shadow-[0_0_25px_hsl(265_85%_65%/0.15)] transition-all duration-400">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-14 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Let's Work Together
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3">
                Ready to Upgrade <span className="gradient-text">Your Operations</span>?
              </h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-14 text-center max-w-2xl mx-auto">
              Whether you need a product for your industry, a custom workflow, or enterprise integration — our team responds within hours.
            </motion.p>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-semibold text-foreground font-display">Contact Information</h4>
                <div className="space-y-4">
                  <a href="mailto:info@srpailabs.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <p className="text-foreground font-medium">info@srpailabs.com</p>
                    </div>
                  </a>
                  <a href="tel:+60122824566" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">WhatsApp / Phone</p>
                      <p className="text-foreground font-medium">+60 12-282 4566</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                      <p className="text-foreground font-medium">India / Remote</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <a href="https://www.linkedin.com/in/sashyank-p-9785a9303/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/shashankpasikanti91-blip" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
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
                      <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full border-0" size="lg">
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

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 sm:py-16 md:py-20 relative border-t border-transparent" style={{ borderImage: 'linear-gradient(90deg, transparent, hsl(320 90% 60% / 0.3), hsl(265 85% 65% / 0.5), hsl(190 100% 50% / 0.3), transparent) 1' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 mb-8 sm:mb-12">
            <div className="col-span-2">
              <img src={srpLogo} alt="SRP AI Labs" className="h-14 w-auto mb-4 drop-shadow-[0_0_10px_rgba(139,92,246,0.2)]" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                SRP AI Labs builds specialized software for HR, recruitment, growth, healthcare, and education — helping teams automate operations and deliver better outcomes.
              </p>
              <p className="text-xs text-muted-foreground">Part of SRP AI Labs Platform &mdash; <a href="https://srpailabs.com" className="hover:text-primary transition-colors">srpailabs.com</a></p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Products</h4>
              <ul className="space-y-3">
                {products.map((p) => (
                  <li key={p.name}><a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><p.icon className="w-3.5 h-3.5" />{p.name}{p.isNew && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-rose-500/20 text-rose-400">NEW</span>}{p.isComingSoon && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-yellow-500/20 text-yellow-400">SOON</span>}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
                <li><Link to="/technology" className="text-sm text-muted-foreground hover:text-primary transition-colors">Technology</Link></li>
                <li><Link to="/platform" className="text-sm text-muted-foreground hover:text-primary transition-colors">Platform</Link></li>
                <li><Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
                <li><Link to="/industries" className="text-sm text-muted-foreground hover:text-primary transition-colors">Industries</Link></li>
                <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link to="/case-studies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
                <li><Link to="/technology" className="text-sm text-muted-foreground hover:text-primary transition-colors">Technology</Link></li>
                <li><a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                <li><Link to="/security" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security</Link></li>
                <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <ul className="space-y-3">
                <li className="text-sm text-muted-foreground">info@srpailabs.com</li>
                <li className="text-sm text-muted-foreground">+60 12-282 4566</li>
                <li className="text-sm text-muted-foreground">India / Remote</li>
              </ul>
              <div className="flex gap-3 mt-6">
                <a href="https://www.linkedin.com/in/sashyank-p-9785a9303/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/shashankpasikanti91-blip" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40">
            <p className="text-sm text-muted-foreground text-center">© 2026 SRP AI Labs. All rights reserved. &nbsp;·&nbsp; <a href="https://srpailabs.com" className="hover:text-primary transition-colors">srpailabs.com</a></p>
          </div>
        </div>
      </footer>

      <AppSwitcher />
      <ChatWidget />
    </div>
  );
};

export default Index;
