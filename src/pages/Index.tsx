import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import { 
  Workflow, MessageSquare, Globe, Plug, Bot, Settings, ArrowRight, Linkedin, Github, Mail,
  Zap, Clock, Bell, BarChart3, CheckCircle, Rocket, Shield, Users, Code, Wrench,
  HelpCircle, MapPin, Phone, Sparkles, FileText, TrendingUp, Target, ExternalLink,
  MousePointer2, Layers, Database, Cpu, ArrowUpRight, ChevronDown, Monitor, Activity,
  Brain, Briefcase, HeartPulse, UserCheck, Building2, Star, Menu, X, Minus,
  CircleDot, MousePointerClick, CalendarCheck, PhoneCall, Sun, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import srpLogo from "@/assets/srp-logo.png";
import { Heart, Stethoscope, Mic } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ChatWidget } from "@/components/ChatWidget";
import AppSwitcher from "@/components/AppSwitcher";
import ParticleNetwork from "@/components/ParticleNetwork";
import { products, PRODUCT_COUNT } from "@/config/products";

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

  const services = [
    { icon: Bot, title: "AI Agents", description: "Build intelligent AI agents for your business needs.", features: ["Customer support agent", "Lead generation agent", "WhatsApp/Email bot", "Website chatbot", "AI FAQ Assistant"] },
    { icon: Workflow, title: "n8n Workflow Automation", description: "Powerful automation workflows for any business process.", features: ["Task automation", "Notification system", "CRM integration", "Google Sheets automation", "API workflows"] },
    { icon: Code, title: "No-Code App Development", description: "Build internal tools and apps without writing code.", features: ["Internal tools", "Automation dashboards", "Small CRM", "Lead tracking systems", "Custom mini-apps"] },
    { icon: Globe, title: "Website Automation", description: "Automate your website interactions and customer journeys.", features: ["Web form → CRM", "Auto-reply system", "Customer onboarding", "Chatbot integration"] },
    { icon: Plug, title: "API Integrations & Webhooks", description: "Connect all your tools and systems seamlessly.", features: ["REST APIs", "JSON processing", "Google Apps API", "Gmail & Sheets", "CRM integrations"] },
    { icon: Settings, title: "Custom Business Automation", description: "Tailored automation solutions for your unique needs.", features: ["Recruitment automation", "Lead generation flows", "Dashboard automations", "Reporting systems"] },
  ];

  const projects = [
    { title: "Invoice Automation", description: "AI-powered invoice processing that extracts data from PDFs using GPT, stores in Google Sheets, and sends automated email confirmations.", slug: "invoice-automation" },
    { title: "Sales Requirement Agent", description: "Intelligent lead qualification workflow with form submission, AI scoring, Gmail/Sheets integration, and automated follow-ups.", slug: "sales-req-agent" },
    { title: "Self Learning Agent", description: "AI-powered Telegram agent that processes voice and text messages, uses RAG with Pinecone for knowledge retrieval.", slug: "self-learning-agent" },
    { title: "Twitter Parasyte System", description: "Automated Twitter/X content scraper using Apify that analyzes tweets with AI, generates engaging responses.", slug: "twitter-parasyte-system" },
    { title: "Instagram Scraping Posts", description: "AI-powered Instagram post scraper that extracts content, classifies relevance using GPT-4.1.", slug: "ig-scraping-posts" },
    { title: "Email Classifier AI Agent", description: "Intelligent email automation that classifies incoming emails into categories and routes them to appropriate workflows.", slug: "email-classifier-agent" },
    { title: "Full Recruitment Automation", description: "End-to-end recruitment automation with job application forms, candidate screening, and email notifications.", slug: "full-recruitment" },
    { title: "Job Automation Workflow", description: "Scheduled job automation that downloads resumes from Google Drive, extracts PDF content.", slug: "job-automation" },
    { title: "ATS - Applicant Tracking System", description: "AI-powered ATS using GPT-4 to analyze resumes, extract structured data.", slug: "ats" },
    { title: "Apify Google Maps Scraper", description: "Web scraping pipeline using Apify's Google Maps Scraper to extract business data.", slug: "apify-google-maps" },
    { title: "LinkedIn Content Parasystem", description: "AI-powered content generation system that scrapes LinkedIn posts from creators.", slug: "linkedin-content" },
    { title: "Gmail Agent", description: "AI-powered email automation that classifies incoming emails and generates intelligent auto-replies using GPT.", slug: "gmail-agent" },
    { title: "SRP RAG Chatbot", description: "AI-powered Telegram chatbot with RAG capabilities using GPT-4.1 Mini.", slug: "srp-rag-chatbot" },
    { title: "WhatsApp Auto-Reply System", description: "Integrated WhatsApp Cloud API, intelligent reply automation, and logged chats to Google Sheets." },
  ];

  const featuredProjects = [
    {
      title: "Recruitment AI Automation System",
      description: "An end-to-end AI-powered recruitment automation platform built to streamline resume screening and candidate management, based on real IT recruitment experience.",
      features: ["AI-powered resume & JD matching", "Semantic similarity scoring using embeddings", "Automated recruiter messaging (Email, WhatsApp, LinkedIn)", "Structured candidate lifecycle tracking", "Supabase database integration", "n8n workflow automation"],
      status: "Beta Phase",
      icon: Users,
    },
    {
      title: "Agentic AI Healthcare Automation System",
      description: "A production-ready Hospital AI Assistant & Management System using Agentic AI and n8n orchestration to automate patient interactions and hospital operations.",
      features: ["Multilingual AI chatbot (English, Hindi, Telugu)", "Voice-enabled patient support with real-time speech recognition", "Automated appointment booking and OPD registration", "Agentic AI workflows orchestrated using n8n", "Live integrations with Google Sheets and REST APIs", "Admin dashboard for hospital staff and operations", "Fully responsive and production deployed"],
      status: "Production",
      icon: Stethoscope,
    }
  ];

  const toolsAndTechnologies = [
    { name: "n8n", description: "Core Automation Platform", icon: Workflow },
    { name: "OpenAI GPT-4o", description: "ChatGPT & AI Completions", icon: Bot },
    { name: "Claude (Anthropic)", description: "Advanced AI Reasoning", icon: Brain },
    { name: "Python + FastAPI", description: "AI Backend & REST APIs", icon: Code },
    { name: "Cursor + VS Code", description: "Agentic AI Development", icon: Cpu },
    { name: "Pydantic + Fire", description: "Data Validation & CLI", icon: Shield },
    { name: "Gemini", description: "Google AI Models", icon: Zap },
    { name: "Supabase", description: "Database & Auth Layer", icon: Database },
    { name: "APIs & Webhooks", description: "System Integrations", icon: Plug },
    { name: "RAG Pipelines", description: "AI Knowledge Agents", icon: MessageSquare },
    { name: "Apify", description: "Web Scraping & Data", icon: Globe },
    { name: "Agentic AI", description: "Multi-step AI Workflows", icon: Sparkles },
  ];

  const faqs = [
    { question: "What services do you provide?", answer: "We provide AI agents, n8n workflow automation, no-code app development, website automation, API integrations, and custom business automation solutions." },
    { question: "Do you build custom workflows?", answer: "Yes! Every automation we build is customized to fit your specific business needs. We analyze your processes, identify bottlenecks, and create tailored solutions." },
    { question: "What industries do you serve?", answer: "We serve businesses across all industries including recruitment, e-commerce, marketing agencies, real estate, healthcare, and more." },
    { question: "How long does automation take?", answer: "Simple workflows can be delivered within 2-3 days. More complex automations typically take 1-2 weeks." },
  ];

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
              <img src={srpLogo} alt="SRP AI Labs" className="h-7 sm:h-8 w-auto" />
              <span className="text-base sm:text-lg font-bold text-foreground hidden sm:inline font-display">SRP <span className="gradient-text">AI Labs</span></span>
            </a>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              {/* Products dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Products <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-[70vh] overflow-y-auto">
                  {products.map((p) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group/item">
                      <div className="w-9 h-9 rounded-lg bg-card border border-border/60 flex items-center justify-center flex-shrink-0">
                        <p.icon className={`w-4 h-4 ${p.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground flex items-center gap-1.5">
                          {p.name}
                          {p.tag && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400">{p.tag}</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">{p.desc}</div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
              {[
                { label: "Solutions", href: "#services" },
                { label: "Industries", href: "#use-cases" },
                { label: "Pricing", href: "#pricing" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a key={item.label} href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
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
                          {products.map((p) => (
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
                              {p.tag && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400">{p.tag}</span>}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {[
                  { label: "Solutions", href: "#services" },
                  { label: "Industries", href: "#use-cases" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Contact", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
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
                SRP AI Labs Platform — {PRODUCT_COUNT} Products Live
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight font-display mb-5 sm:mb-8">
                <span className="text-foreground">AI Business</span>
                <br />
                <span className="text-foreground">Automation</span>
                <br />
                <span className="gradient-text-glow text-glow" style={{
                  backgroundImage: "linear-gradient(135deg, hsl(320 90% 65%), hsl(265 85% 65%), hsl(220 85% 60%), hsl(190 100% 50%))",
                  backgroundSize: "200% 200%",
                  animation: "text-shimmer 4s ease-in-out infinite",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Platform.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-6 sm:mb-10 max-w-xl">
                {PRODUCT_COUNT} AI Products + Custom Automation — Built for real business workflows across recruitment, healthcare, marketing, and operations.
              </p>

              {/* Product pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-10">
                {products.map((p) => (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-card/60 border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-300">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                    {p.name}
                    {p.tag && <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400">{p.tag}</span>}
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
                  <a href="#products" className="group flex items-center justify-center gap-2">
                    Explore Products
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-6 sm:px-8 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5 w-full sm:w-auto">
                  <a href="#custom-automation" className="flex items-center justify-center">Build Custom Automation</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right - Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:flex items-center justify-center relative"
            >
              <motion.img
                src={srpLogo}
                alt="SRP AI Automation Labs"
                className="relative z-10 w-[220px] lg:w-[300px] h-auto"
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
                    {["AI AUTOMATION", "n8n WORKFLOWS", "SaaS PRODUCTS", "HEALTHCARE AI", "RECRUITMENT AI", "MARKETING OS", "CUSTOM AGENTS", "RAG PIPELINES", "ENTERPRISE GRADE", "MULTI-TENANT", "GPT-4 POWERED", "FULL-STACK AI"].map((text, i) => (
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
                { value: "40", suffix: "+", label: "Hands-on Workflows Built" },
                { value: "100", suffix: "%", label: "No-Code / Low-Code" },
                { value: "24/7", suffix: "", label: "Automation Uptime" },
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

      {/* ==================== CAPABILITIES / HIGHLIGHTS ==================== */}
      <section className="py-14 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, hsl(265 85% 65%), transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-[10%] -right-[10%] w-[300px] h-[300px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, hsl(190 100% 50%), transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-3 sm:mb-4">
                What We <span className="gradient-text">Deliver</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
                End-to-end automation capabilities for modern businesses
              </p>
            </motion.div>

            {/* Bento grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-6xl mx-auto">
              {[
                { icon: Zap, title: "Save Time", description: "Automate repetitive tasks" },
                { icon: Bot, title: "AI Agents", description: "Smart automation powered by AI" },
                { icon: Workflow, title: "n8n Workflows", description: "Industry-standard workflows" },
                { icon: MessageSquare, title: "Smart Comms", description: "WhatsApp, Email & Chat" },
                { icon: BarChart3, title: "No-Code Tools", description: "Build without coding" },
                { icon: Bell, title: "Real-Time", description: "Stay updated instantly" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-[0_0_30px_hsl(265_85%_65%/0.2)] transition-all duration-500 cursor-default"
                >
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-300">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-1">{item.title}</h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="py-14 sm:py-20 md:py-24 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                  About SRP AI Labs
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 sm:mb-6 leading-tight">
                  AI Business Operating{" "}
                  <span className="gradient-text">System Company</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <span className="text-foreground font-semibold">SRP AI Labs</span> builds AI-powered SaaS products, automation systems, and intelligent business workflows — helping organizations across industries eliminate manual work and scale operations with purpose-built AI.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We specialize in <span className="text-foreground font-semibold">n8n workflow automation</span>, AI agent development, multi-tenant SaaS platforms, and industry-specific operating systems — from healthcare and recruitment to marketing and enterprise automation.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["AI-first", "Industry-specific", "Multi-tenant SaaS", "n8n Powered", "Automation-driven"].map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-card border border-border/50 text-sm font-medium text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <motion.blockquote
                  variants={fadeInUp}
                  className="text-xl font-medium text-foreground italic border-l-4 border-transparent pl-6 py-4 bg-card/30 rounded-r-2xl" style={{ borderImage: 'linear-gradient(to bottom, hsl(320 90% 60%), hsl(265 85% 65%), hsl(190 100% 50%)) 1' }}
                >
                  "We believe every business deserves purpose-built AI — not generic tools, but systems designed for your industry."
                </motion.blockquote>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "6", label: "Live Products" },
                    { value: "40+", label: "Workflows Built" },
                    { value: "24/7", label: "Uptime" },
                    { value: "Multi", label: "Industry" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      className="p-5 rounded-2xl bg-card border border-border/50 text-center hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-[0_0_25px_hsl(265_85%_65%/0.15)] transition-all duration-500"
                    >
                      <div className="text-2xl font-bold text-primary font-display">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full border-0">
                    <a href="#contact" className="group flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Book Demo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-full border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5">
                    <a href="#products">Explore Products</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== HOW WE WORK ==================== */}
      <section className="py-14 sm:py-20 md:py-24 lg:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">How We Work</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl">Simple, transparent process from discovery to deployment</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[
                { step: "01", title: "Discovery", desc: "We analyze your business processes and identify automation opportunities", icon: Target },
                { step: "02", title: "Design", desc: "We architect the workflow solution with clear documentation", icon: Layers },
                { step: "03", title: "Build", desc: "We develop and test the automation using n8n and AI tools", icon: Code },
                { step: "04", title: "Deploy", desc: "We launch, monitor, and provide ongoing support", icon: Rocket },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="group relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-3xl sm:text-4xl md:text-6xl font-bold text-primary/10 font-display group-hover:text-primary/20 transition-colors">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h4 className="font-bold text-sm sm:text-base md:text-xl mb-2 sm:mb-3 text-foreground font-display">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="py-14 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-[40%] right-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(190 100% 50%), transparent 70%)', filter: 'blur(60px)' }} />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                Our <span className="gradient-text">Services</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                Comprehensive automation solutions for modern businesses
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-[0_0_30px_hsl(265_85%_65%/0.2)] transition-all duration-500 overflow-hidden group backdrop-blur-sm">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-foreground font-display">{service.title}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-3 h-3 text-primary" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== WHY SRP AI LABS ==================== */}
      <section id="why-srp" className="py-14 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute top-[30%] -left-[5%] w-[350px] h-[350px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(320 90% 60%), transparent 70%)', filter: 'blur(60px)' }} />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Why SRP AI Labs
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">The Right AI Partner <span className="gradient-text">for Your Business</span></h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl">What makes SRP AI Labs different from generic automation vendors</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {[
                { icon: Brain, title: "AI-First Approach", description: "Every product and workflow is built with AI at the core — not bolted on as an afterthought." },
                { icon: Layers, title: "Scalable Architecture", description: "Systems built to grow with your business — from single teams to enterprise scale." },
                { icon: Building2, title: "Industry-Specific Solutions", description: "Purpose-built for hospitals, recruitment agencies, marketing teams, and enterprises." },
                { icon: Workflow, title: "Automation-Driven Operations", description: "End-to-end process automation — from data entry to intelligent decisions." },
                { icon: Shield, title: "Secure & Independent Systems", description: "Isolated deployments and separate databases per product — no cross-contamination." },
                { icon: CheckCircle, title: "Proven Technology Stack", description: "Built on n8n, GPT-4, Supabase, and enterprise-grade infrastructure." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-[0_0_30px_hsl(265_85%_65%/0.2)] transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/25 group-hover:border-primary/50 transition-all">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== CASE STUDIES ==================== */}
      <section id="agents" className="py-14 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(265 85% 65%), transparent 70%)', filter: 'blur(60px)' }} />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Success Stories
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                Case <span className="gradient-text">Studies</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">Real results from AI-powered n8n workflows</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: Mail, tag: "AI Email Automation", title: "Intelligent Email Classifier Agent",
                  challenge: "A business owner was drowning in 100+ daily emails, spending 3+ hours manually sorting.",
                  solution: "Built an n8n workflow with GPT-4 that automatically classifies incoming emails into Priority, Finance, Support, and Promotions.",
                  results: ["90% reduction in email sorting time", "Zero missed priority emails", "Fully automated with zero manual effort"],
                  slug: "email-classifier-agent"
                },
                {
                  icon: MessageSquare, tag: "AI Knowledge Agent", title: "Self-Learning RAG Chatbot",
                  challenge: "A Telegram community needed 24/7 support with zero human involvement.",
                  solution: "Created an intelligent Telegram agent with RAG using Pinecone that learns from every interaction.",
                  results: ["80% of inquiries handled automatically", "Instant responses 24/7", "Self-improving accuracy over time"],
                  slug: "self-learning-agent"
                },
                {
                  icon: FileText, tag: "Document Processing", title: "AI-Powered Invoice Automation",
                  challenge: "An accounting team spent 5+ hours weekly manually extracting data from PDF invoices.",
                  solution: "Created an n8n workflow that uses GPT to extract invoice data from PDFs and populates Google Sheets.",
                  results: ["95% faster invoice processing", "Near-zero errors in data entry", "Automatic audit trail"],
                  slug: "invoice-automation"
                },
              ].map((study, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }}>
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-[0_0_30px_hsl(265_85%_65%/0.2)] transition-all duration-500 overflow-hidden group">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/25 transition-all">
                        <study.icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{study.tag}</span>
                      <CardTitle className="text-xl mt-2 text-foreground font-display">{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div>
                        <h5 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-destructive" /> The Challenge
                        </h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                          <Bot className="w-4 h-4 text-primary" /> The Solution
                        </h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" /> The Results
                        </h5>
                        <ul className="text-sm text-muted-foreground space-y-1.5">
                          {study.results.map((r, idx) => (
                            <li key={idx}>• <span className="text-foreground font-medium">{r}</span></li>
                          ))}
                        </ul>
                      </div>
                      <Button variant="ghost" size="sm" className="group/btn p-0 h-auto hover:bg-transparent mt-2" asChild>
                        <Link to={`/project/${study.slug}`} className="flex items-center text-primary">
                          View Full Case Study
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="mt-10 sm:mt-16 text-center">
              <div className="inline-block p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-card/30 border border-border/40 backdrop-blur-xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground font-display">Ready to Transform Your Business?</h3>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Let's discuss how AI-powered automation can solve your specific challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full border-0">
                    <a href="#contact" className="group flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Book a Free Consultation
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== HOW TO GET STARTED ==================== */}
      <section id="get-started" className="py-14 sm:py-20 md:py-24 lg:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                How to <span className="gradient-text">Get Started</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">Start automating your business in 4 simple steps</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
              {[
                { step: "01", icon: MousePointerClick, title: "Choose a Product", desc: "Browse our 6 AI products and find the one that fits your industry and workflow needs." },
                { step: "02", icon: UserCheck, title: "Sign Up Directly", desc: "Go to the product's website and create your account. Each product has its own login." },
                { step: "03", icon: Settings, title: "Or Request Custom Automation", desc: "Need something unique? We build custom automation systems using n8n, AI agents, and APIs." },
                { step: "04", icon: CalendarCheck, title: "Book a Demo", desc: "Not sure where to start? Book a free demo and our team will guide you to the right solution." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-card/50 border border-border/50 hover:border-primary/60 hover:bg-primary/[0.06] hover:shadow-[0_0_40px_hsl(265_85%_65%/0.25),0_0_80px_hsl(190_100%_50%/0.1)] transition-all duration-500"
                >
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-3xl sm:text-4xl md:text-6xl font-bold text-primary/10 font-display group-hover:text-primary/30 transition-colors duration-500">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-primary/25 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsl(265_85%_65%/0.3)] transition-all duration-300">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h4 className="font-bold text-sm sm:text-base md:text-xl mb-2 sm:mb-3 text-foreground font-display group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== CUSTOM AUTOMATION ==================== */}
      <section id="custom-automation" className="py-14 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Custom Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                Need <span className="gradient-text">Custom Automation?</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                We build custom automation systems using n8n, AI agents, and APIs tailored to your business.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-10">
              {[
                { icon: Workflow, title: "Workflow Automation", desc: "End-to-end n8n workflows for any business process — from data entry to complex multi-step operations." },
                { icon: Bot, title: "AI Agents (OpenAI / Claude)", desc: "Intelligent AI agents that reason, plan, and execute tasks — customer support, lead gen, content creation." },
                { icon: Wrench, title: "CRM & Internal Tools", desc: "Custom CRM systems, admin dashboards, and internal tools built for your specific team needs." },
                { icon: Building2, title: "Multi-Tenant SaaS Builds", desc: "Full SaaS platforms with tenant isolation, authentication, billing, and scalable architecture." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }}
                  className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-[0_0_30px_hsl(265_85%_65%/0.2)] transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/25 group-hover:border-primary/50 transition-all">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 border-0">
                  <a href="#contact" className="group flex items-center gap-2">
                    Talk to Expert
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5">
                  <a href="#contact">Request Demo</a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== PLATFORM POSITIONING ==================== */}
      <section id="platform" className="py-14 sm:py-20 md:py-24 lg:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Platform Overview
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                One Platform. <span className="gradient-text">Multiple AI Systems.</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
                SRP AI Labs is an AI Business Automation Platform offering {PRODUCT_COUNT} AI SaaS Products, Custom Automation (n8n + AI), and industry-specific systems.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {products.map((product, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}
                  className={`group flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br ${product.gradientColor} border border-border/50 ${product.border} transition-all duration-500`}>
                  <div className="w-12 h-12 rounded-xl bg-background/60 border border-border/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <product.icon className={`w-6 h-6 ${product.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground flex items-center gap-2">
                      {product.name}
                      {product.tag && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400">{product.tag}</span>}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">{product.desc}</p>
                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:gap-2 transition-all">
                      Visit Product <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== FEATURED PROJECTS ==================== */}
      <section id="products" className="py-14 sm:py-20 md:py-24 lg:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                AI-Powered Products
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                Our <span className="gradient-text">Products</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">Six AI-powered SaaS platforms, each solving a critical business problem at scale</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                  <Card className={`h-full bg-gradient-to-br ${product.gradientColor} border-border/50 ${product.border} transition-all duration-500 overflow-hidden group relative`}>
                    <CardHeader className="p-5 sm:p-6 md:p-8">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-background/60 border border-border/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <product.icon className={`w-7 h-7 ${product.iconColor}`} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${product.badge === "New" ? "bg-rose-500/10 border-rose-500/20 text-rose-400" : "bg-primary/10 border-primary/20 text-primary"}`}>{product.badge}</span>
                          {product.tag && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 animate-pulse">{product.tag}</span>}
                          <a href={product.url} target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-background/60 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-foreground mb-1 font-display">{product.name}</CardTitle>
                      <p className="text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">{product.tagline}</p>
                      <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
                      <ul className="space-y-2.5 mb-6">
                        {product.features.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <CheckCircle className={`w-4 h-4 ${product.iconColor} flex-shrink-0`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a href={product.url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-2 rounded-full transition-all">
                          Open Product <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a href="#pricing" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary border border-border/60 hover:border-primary/40 px-4 py-2 rounded-full transition-all">
                          View Pricing
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== PRODUCT ECOSYSTEM ==================== */}
      <section id="ecosystem" className="py-14 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Product Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                One Platform. <span className="gradient-text">Six Independent Systems.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                srpailabs.com is the main hub. Each product is a fully independent SaaS with its own login, database, and deployment — intentional for performance, security, and clarity.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12">
              {[
                { icon: Shield, title: "Separate Logins", desc: "Each product has its own authentication system. Users log in directly to the product they need — no cross-product confusion." },
                { icon: Database, title: "Isolated Databases", desc: "Every product runs on its own database. Hospital data, HR data, and marketing data never mix." },
                { icon: Layers, title: "Independent Deployments", desc: "Each product is deployed and scaled independently. A change in one product never affects another." },
                { icon: Building2, title: "Unified Brand", desc: "All products are built and maintained by SRP AI Labs. Same quality standards, different domain expertise." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }} className="flex items-start gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-[0_0_30px_hsl(265_85%_65%/0.2)] transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/25 group-hover:border-primary/50 transition-all">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <div className="p-8 rounded-3xl bg-card/30 border border-border/40 backdrop-blur-xl">
                <p className="text-center text-sm font-semibold text-foreground mb-6">Access each product directly at its own subdomain:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                  {products.map((p) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-background/60 border border-border/60 hover:border-primary/40 transition-all group/card text-center">
                      <div className="w-10 h-10 rounded-xl bg-card border border-border/60 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                        <p.icon className={`w-5 h-5 ${p.iconColor}`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground flex items-center gap-1 justify-center">
                          {p.name}
                          {p.tag && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-rose-500/20 text-rose-400">{p.tag}</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">{p.desc}</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
                <p className="text-center text-xs text-muted-foreground mt-6">
                  Each product has its own independent login — no shared session or unified account required.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== USE CASES ==================== */}
      <section id="use-cases" className="py-14 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-[50%] -left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(320 90% 60%), transparent 70%)', filter: 'blur(60px)' }} />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Who It's For
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                Built for <span className="gradient-text">Every Industry</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">From startups to enterprises — SRP AI Labs platforms fit your workflow</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: Building2, title: "Enterprises & Agencies", product: "Marketing OS", desc: "Automate 80% of your marketing ops — content, outreach, reporting — while your team focuses on strategy.", tag: "Marketing OS" },
                { icon: HeartPulse, title: "Healthcare Providers", product: "MediFlow", desc: "Reduce admin burden with AI-driven patient intake, scheduling, and documentation that integrates with your EHR.", tag: "MediFlow" },
                { icon: Briefcase, title: "HR & Talent Teams", product: "SmartRecruit", desc: "Cut time-to-hire by 60% using AI screening, automated interviews, and a smart ATS that learns your hiring style.", tag: "SmartRecruit" },
                { icon: Rocket, title: "Ops & Growth Teams", product: "Autonomous OS", desc: "Deploy AI agents to handle repetitive operations — reporting, CRM updates, notifications — end-to-end autonomously.", tag: "Autonomous OS" },
                { icon: Code, title: "SaaS Startups", product: "Custom Workflows", desc: "Get n8n-powered automation tailored to your stack — webhooks, APIs, databases — built and deployed in days.", tag: "Custom Build" },
                { icon: Globe, title: "E-Commerce Brands", product: "Marketing OS", desc: "Automate product launches, customer segmentation, abandonment emails, and review campaigns at scale.", tag: "Marketing OS" },
              ].map((uc, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-[0_0_30px_hsl(265_85%_65%/0.2)] transition-all duration-500 group">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/25 transition-all">
                        <uc.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-3">{uc.tag}</span>
                      <h3 className="text-lg font-semibold text-foreground mb-2 font-display">{uc.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="py-14 sm:py-20 md:py-24 lg:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Flexible Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                Flexible Pricing <span className="gradient-text">Per Product</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                Each product has its own pricing based on features and usage. Choose the product that fits your needs and sign up directly.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div variants={fadeInUp} className="p-8 sm:p-12 rounded-3xl bg-card/30 border border-border/40 backdrop-blur-xl text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground font-display mb-4">
                  Every Product. Its Own Pricing.
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mb-8 max-w-xl mx-auto">
                  SRP AI Labs offers {PRODUCT_COUNT} independent products, each with tailored pricing based on features, usage, and scale. Visit any product to see its plans.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {products.map((product) => (
                    <a key={product.name} href={product.url} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br ${product.gradientColor} border border-border/50 ${product.border} transition-all group/price`}>
                      <div className="w-10 h-10 rounded-lg bg-background/60 border border-border/60 flex items-center justify-center flex-shrink-0 group-hover/price:scale-110 transition-transform">
                        <product.icon className={`w-5 h-5 ${product.iconColor}`} />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                          {product.name}
                          {product.tag && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400">{product.tag}</span>}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{product.desc}</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    </a>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full px-8 border-0">
                    <a href="#products" className="group flex items-center gap-2">
                      View Product Pricing
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5">
                    <a href="#contact">Contact Sales</a>
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.p variants={fadeInUp} className="text-center text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-10 max-w-2xl mx-auto p-3 sm:p-4 rounded-xl bg-card/30 border border-border/40">
              Need a custom automation solution?{" "}
              <a href="#contact" className="text-primary hover:underline font-medium">Contact SRP AI Labs</a>{" "}
              for tailored pricing and enterprise plans.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== TOOLS & TECHNOLOGIES ==================== */}
      <section className="py-14 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-[30%] right-[5%] w-[350px] h-[350px] rounded-full opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(265 85% 65%), transparent 70%)', filter: 'blur(60px)' }} />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center">
            <motion.div variants={fadeInUp} className="mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Tech Stack
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
              Tools & <span className="gradient-text">Technologies</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 max-w-2xl mx-auto">
              The exact tools and frameworks powering every SRP AI Labs product and workflow
            </motion.p>
            <motion.p variants={fadeInUp} className="text-xs sm:text-sm text-muted-foreground mb-8 sm:mb-14 max-w-3xl mx-auto bg-card/40 border border-border/40 rounded-xl px-4 py-3 sm:px-6 sm:py-4">
              <span className="text-foreground font-medium">{PRODUCT_COUNT} Live Products · 40+ Automation Workflows</span> — built hands-on with agentic AI, Python, n8n orchestration, and LLM integrations across every layer of the stack.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8 sm:mb-12">
              {toolsAndTechnologies.map((tool, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -6 }}
                  className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card/50 border border-border/50 hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-[0_0_30px_hsl(265_85%_65%/0.2)] transition-all duration-500 cursor-default"
                >
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <tool.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 text-xs sm:text-sm">{tool.name}</h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scrolling tech tags */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              {["n8n", "Python", "FastAPI", "Pydantic", "Fire", "OpenAI GPT-4o", "Claude Sonnet", "Gemini", "Supabase", "Cursor", "VS Code", "LangChain / LangGraph", "REST APIs", "Webhooks", "RAG Pipelines", "Agentic AI", "Apify", "WhatsApp Cloud API", "Google API Suite"].map((tech, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-card/50 border border-border/50 text-foreground rounded-full text-xs sm:text-sm font-medium hover:border-primary/60 hover:bg-primary/[0.06] hover:text-primary hover:shadow-[0_0_20px_hsl(265_85%_65%/0.15)] transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== NEED HELP CHOOSING ==================== */}
      <section id="help" className="py-14 sm:py-20 md:py-24 lg:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                Need Help <span className="gradient-text">Choosing?</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">Our team and AI assistant are here to help you find the right solution</p>
            </motion.div>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {[
                { icon: MessageSquare, title: "Chat with AI Assistant", desc: "Talk to SRPA, our AI assistant, to get instant product recommendations based on your use case.", cta: "Open Chat", action: "chat" },
                { icon: CalendarCheck, title: "Book a Demo", desc: "Schedule a free walkthrough with our team. We'll show you the right product for your business.", cta: "Book Demo", href: "#contact" },
                { icon: Mail, title: "Contact Team", desc: "Reach out directly via email or WhatsApp. We respond quickly and love helping businesses automate.", cta: "Contact Us", href: "#contact" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }}
                  className="group p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2 text-foreground font-display">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{item.desc}</p>
                  <Button variant="outline" asChild className="rounded-full">
                    <a href={item.href || "#contact"}>{item.cta}</a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="py-14 sm:py-20 md:py-24 lg:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl">Get answers to common questions about our services</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="bg-card/50 border border-border/50 rounded-2xl px-6 data-[state=open]:border-primary/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-5 text-foreground">
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pl-8 pb-5">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-14 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                Let's Work Together
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4">
                Ready to <span className="gradient-text">Automate</span>?
              </h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-14 text-center max-w-2xl mx-auto">
              Whether you need a custom AI agent, workflow automation, or just want to explore what's possible—I'm here to help.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-6">
                <h4 className="text-lg sm:text-xl font-semibold text-foreground font-display">Contact Information</h4>
                <div className="space-y-4">
                  <a href="mailto:info@srpailabs.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <span>info@srpailabs.com</span>
                  </a>
                  <a href="https://wa.me/60122824566" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <span>WhatsApp: +60 12-282 4566</span>
                  </a>
                  <div className="flex items-center gap-4 text-muted-foreground p-4 rounded-2xl bg-card/50 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <span>India / Remote</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-border/40">
                  <h5 className="font-medium mb-4 text-foreground">Connect with us</h5>
                  <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/sashyank-p-9785a9303/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://github.com/shashankpasikanti91-blip" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
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
              <img src={srpLogo} alt="SRP AI Labs" className="h-10 w-auto mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                SRP AI Labs builds AI-powered SaaS products that automate the hardest parts of running a business.
              </p>
              <p className="text-xs text-muted-foreground">Part of SRP AI Labs Platform &mdash; <a href="https://srpailabs.com" className="hover:text-primary transition-colors">srpailabs.com</a></p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Products</h4>
              <ul className="space-y-3">
                {products.map((p) => (
                  <li key={p.name}><a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><p.icon className="w-3.5 h-3.5" />{p.name}{p.tag && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-rose-500/20 text-rose-400">{p.tag}</span>}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3">
                <li><a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Solutions</a></li>
                <li><a href="#use-cases" className="text-sm text-muted-foreground hover:text-primary transition-colors">Industries</a></li>
                <li><a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
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
