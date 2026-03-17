import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { 
  Workflow, MessageSquare, Globe, Plug, Bot, Settings, ArrowRight, Linkedin, Github, Mail,
  Zap, Clock, Bell, BarChart3, CheckCircle, Rocket, Shield, Users, Code, Wrench,
  HelpCircle, MapPin, Phone, Sparkles, FileText, TrendingUp, Target, ExternalLink,
  MousePointer2, Layers, Database, Cpu, ArrowUpRight, ChevronDown, Monitor, Activity,
  Brain, Briefcase, HeartPulse, UserCheck, Building2, Star
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
    { name: "Figma", description: "UI & Workflow Design", icon: Layers },
    { name: "LLMs / GPT", description: "AI-Powered Intelligence", icon: Bot },
    { name: "Make / Zapier", description: "No-Code Automation Bridges", icon: Sparkles },
    { name: "Gemini", description: "Google AI Models", icon: Zap },
    { name: "APIs & Webhooks", description: "System Integrations", icon: Plug },
    { name: "Databases", description: "Data Storage & Retrieval", icon: Database },
    { name: "RAG Chatbots", description: "AI Knowledge Agents", icon: MessageSquare },
  ];

  const faqs = [
    { question: "What services do you provide?", answer: "We provide AI agents, n8n workflow automation, no-code app development, website automation, API integrations, and custom business automation solutions." },
    { question: "Do you build custom workflows?", answer: "Yes! Every automation we build is customized to fit your specific business needs. We analyze your processes, identify bottlenecks, and create tailored solutions." },
    { question: "What industries do you serve?", answer: "We serve businesses across all industries including recruitment, e-commerce, marketing agencies, real estate, healthcare, and more." },
    { question: "How long does automation take?", answer: "Simple workflows can be delivered within 2-3 days. More complex automations typically take 1-2 weeks." },
  ];

  return (
    <div className="min-h-screen bg-background dark relative">
      {/* Cursor glow follower */}
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-[0.07]"
        style={{
          x: useTransform(smoothX, (v) => v - 250),
          y: useTransform(smoothY, (v) => v - 250),
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-2xl bg-background/70 border-b border-border/40"
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <a href="#home" className="flex items-center gap-3">
              <img src={srpLogo} alt="SRP AI Labs" className="h-8 w-auto" />
              <span className="text-lg font-bold text-foreground hidden sm:inline font-display">SRP AI Labs</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              {/* Products dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Products <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {[
                    { name: "Autonomous OS", desc: "AI-powered work OS", url: "https://autonomous.srpailabs.com", icon: Monitor, color: "text-blue-400" },
                    { name: "Marketing OS", desc: "AI marketing automation", url: "https://app.srpailabs.com", icon: BarChart3, color: "text-purple-400" },
                    { name: "MediFlow", desc: "Healthcare workflow AI", url: "https://mediflow.srpailabs.com", icon: Activity, color: "text-emerald-400" },
                    { name: "SmartRecruit", desc: "AI recruitment platform", url: "https://recruit.srpailabs.com", icon: UserCheck, color: "text-orange-400" },
                  ].map((p) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group/item">
                      <div className="w-9 h-9 rounded-lg bg-card border border-border/60 flex items-center justify-center flex-shrink-0">
                        <p.icon className={`w-4 h-4 ${p.color}`} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.desc}</div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
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
              <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
                <a href="#contact">Get Started</a>
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ==================== HERO ==================== */}
      <section id="home" className="relative py-20 md:py-32">
        {/* Abstract animated background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large gradient orb - right side */}
          <motion.div
            className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full" style={{
              background: "conic-gradient(from 0deg, hsl(var(--primary) / 0.15), transparent, hsl(var(--primary) / 0.08), transparent, hsl(var(--primary) / 0.12))",
              filter: "blur(60px)",
            }} />
          </motion.div>
          
          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-[15%] right-[20%] w-20 h-20 border border-primary/20 rounded-2xl"
            animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[35%] right-[10%] w-14 h-14 border border-primary/15 rounded-full"
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-[25%] right-[25%] w-10 h-10 bg-primary/10 rounded-lg"
            animate={{ y: [0, -20, 0], rotate: [0, -30, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-[60%] right-[5%] w-6 h-6 bg-primary/20 rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Connection lines / dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{ top: `${20 + i * 12}%`, right: `${8 + (i % 3) * 15}%` }}
              animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                SRP AI Labs Platform — 4 Products Live
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight font-display mb-8">
                <span className="text-foreground">One Platform.</span>
                <br />
                <span className="text-foreground">Infinite</span>
                <br />
                <span className="gradient-text text-glow">Automation.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                SRP AI Labs builds AI-powered SaaS products that automate the hardest parts of running a business — from recruitment and marketing to healthcare and operations.
              </p>

              {/* Product pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  { label: "Autonomous OS", url: "https://autonomous.srpailabs.com" },
                  { label: "Marketing OS", url: "https://app.srpailabs.com" },
                  { label: "MediFlow", url: "https://mediflow.srpailabs.com" },
                  { label: "SmartRecruit", url: "https://recruit.srpailabs.com" },
                ].map((p) => (
                  <a key={p.label} href={p.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-card border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {p.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 mt-2"
              >
                <Button size="xl" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-[0_4px_25px_hsl(var(--primary)/0.4)] hover:shadow-[0_8px_40px_hsl(var(--primary)/0.5)] hover:-translate-y-0.5 transition-all">
                  <a href="#services" className="group flex items-center gap-2">
                    Explore Solutions
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button size="xl" variant="outline" asChild className="rounded-full px-8">
                  <a href="#contact">Book Demo</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right - Logo + visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:flex items-center justify-center relative"
            >
              <div className="relative">
                {/* Glow behind logo */}
                <div className="absolute inset-0 bg-primary/15 rounded-full blur-[80px] scale-150" />
                <motion.img
                  src={srpLogo}
                  alt="SRP AI Automation Labs"
                  className="relative z-10 w-[280px] h-auto drop-shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>

          {/* Stats section - responsive grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 border-t border-border/40 bg-background/60 backdrop-blur-xl rounded-lg py-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { value: "40", suffix: "+", label: "Hands-on Workflows Built" },
                { value: "100", suffix: "%", label: "No-Code / Low-Code" },
                { value: "24/7", suffix: "", label: "Automation Uptime" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary font-display">
                    {stat.value === "24/7" ? "24/7" : <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== CAPABILITIES / HIGHLIGHTS ==================== */}
      <section className="py-28 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                What We <span className="gradient-text">Deliver</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                End-to-end automation capabilities for modern businesses
              </p>
            </motion.div>

            {/* Bento grid layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
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
                  className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 cursor-default"
                >
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  About SRP AI Labs
                </span>
                <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
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
                  className="text-xl font-medium text-foreground italic border-l-4 border-primary pl-6 py-4 bg-card/30 rounded-r-2xl"
                >
                  "We believe every business deserves purpose-built AI — not generic tools, but systems designed for your industry."
                </motion.blockquote>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "4", label: "Live Products" },
                    { value: "40+", label: "Workflows Built" },
                    { value: "24/7", label: "Uptime" },
                    { value: "Multi", label: "Industry" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      className="p-5 rounded-2xl bg-card border border-border/50 text-center hover:border-primary/30 transition-colors"
                    >
                      <div className="text-2xl font-bold text-primary font-display">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                    <a href="#contact" className="group flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Book Demo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-full">
                    <a href="#products">Explore Products</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== HOW WE WORK ==================== */}
      <section className="py-28 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">How We Work</h2>
              <p className="text-muted-foreground text-lg">Simple, transparent process from discovery to deployment</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6">
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
                  className="group relative p-8 rounded-3xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="absolute top-6 right-6 text-6xl font-bold text-primary/10 font-display group-hover:text-primary/20 transition-colors">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h4 className="font-bold text-xl mb-3 text-foreground font-display">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                What We Do
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Our <span className="gradient-text">Services</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Comprehensive automation solutions for modern businesses
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden group backdrop-blur-sm">
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

      {/* ==================== WHY SRP AI LABS ==================== */}
      <section id="why-srp" className="py-28 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Why SRP AI Labs
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">The Right AI Partner <span className="gradient-text">for Your Business</span></h2>
              <p className="text-muted-foreground text-lg">What makes SRP AI Labs different from generic automation vendors</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                  className="flex items-start gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== CASE STUDIES ==================== */}
      <section id="agents" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Success Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Case <span className="gradient-text">Studies</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Real results from AI-powered n8n workflows</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
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
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden group">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
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
            <motion.div variants={fadeInUp} className="mt-16 text-center">
              <div className="inline-block p-10 rounded-3xl bg-card/30 border border-border/40 backdrop-blur-xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-display">Ready to Transform Your Business?</h3>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Let's discuss how AI-powered automation can solve your specific challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
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

      {/* ==================== FEATURED PROJECTS ==================== */}
      <section id="products" className="py-28 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                AI-Powered Products
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Our <span className="gradient-text">Products</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Four AI-powered SaaS apps, each solving a critical business problem at scale</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Autonomous OS",
                  tagline: "AI Business Application Generator",
                  description: "AI-powered platform that generates full business applications, workflows, dashboards, automation rules, compliance logic, and data systems from natural language. Multi-industry, multi-tenant.",
                  url: "https://autonomous.srpailabs.com",
                  subdomain: "autonomous.srpailabs.com",
                  icon: Monitor,
                  color: "from-blue-500/20 to-cyan-500/10",
                  border: "hover:border-blue-500/40",
                  iconColor: "text-blue-400",
                  badge: "Live",
                  features: ["Generate apps from natural language", "Multi-industry, multi-tenant", "Automated workflow & dashboard generation", "Compliance & business logic AI"],
                },
                {
                  name: "Marketing OS",
                  tagline: "AI Marketing SaaS Platform",
                  description: "AI marketing SaaS with CRM, lead capture, multilingual creative generation, campaign automation, social media scheduling, localization, and analytics.",
                  url: "https://app.srpailabs.com",
                  subdomain: "app.srpailabs.com",
                  icon: BarChart3,
                  color: "from-purple-500/20 to-pink-500/10",
                  border: "hover:border-purple-500/40",
                  iconColor: "text-purple-400",
                  badge: "Live",
                  features: ["CRM & lead capture automation", "Multilingual creative generation", "Campaign & social media scheduling", "Analytics & performance dashboard"],
                },
                {
                  name: "MediFlow",
                  tagline: "Healthcare Operating System",
                  description: "AI-powered hospital management SaaS with patient lifecycle, chatbot booking, prescriptions, lab, billing, pharmacy, staff dashboards, and multi-tenant hospital isolation.",
                  url: "https://mediflow.srpailabs.com",
                  subdomain: "mediflow.srpailabs.com",
                  icon: Activity,
                  color: "from-emerald-500/20 to-teal-500/10",
                  border: "hover:border-emerald-500/40",
                  iconColor: "text-emerald-400",
                  badge: "Live",
                  features: ["Patient lifecycle & chatbot booking", "Prescriptions, lab & billing", "Pharmacy & staff dashboards", "Multi-tenant hospital isolation"],
                },
                {
                  name: "SmartRecruit",
                  tagline: "AI-Powered Recruitment ATS",
                  description: "AI-powered recruitment ATS with resume screening, hiring workflows, job generation, AI writing, OTP login, and full pipeline automation.",
                  url: "https://recruit.srpailabs.com",
                  subdomain: "recruit.srpailabs.com",
                  icon: UserCheck,
                  color: "from-orange-500/20 to-amber-500/10",
                  border: "hover:border-orange-500/40",
                  iconColor: "text-orange-400",
                  badge: "Live",
                  features: ["AI resume screening & scoring", "OTP login & secure access", "AI-generated job descriptions", "Full hiring pipeline automation"],
                },
              ].map((product, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                  <Card className={`h-full bg-gradient-to-br ${product.color} border-border/50 ${product.border} transition-all duration-500 overflow-hidden group relative`}>
                    <CardHeader className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-background/60 border border-border/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <product.icon className={`w-7 h-7 ${product.iconColor}`} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary">{product.badge}</span>
                          <a href={product.url} target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-background/60 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <CardTitle className="text-2xl text-foreground mb-1 font-display">{product.name}</CardTitle>
                      <p className="text-sm text-primary font-medium mb-3">{product.tagline}</p>
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <ul className="space-y-2.5 mb-6">
                        {product.features.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <CheckCircle className={`w-4 h-4 ${product.iconColor} flex-shrink-0`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a href={product.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                        Visit {product.subdomain} <ArrowRight className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== PRODUCT ECOSYSTEM ==================== */}
      <section id="ecosystem" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Product Ecosystem
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                One Brand. <span className="gradient-text">Four Independent Systems.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                srpailabs.com is the main hub. Each product is a fully independent SaaS with its own login, database, and deployment — intentional for performance, security, and clarity.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {[
                { icon: Shield, title: "Separate Logins", desc: "Each product has its own authentication system. Users log in directly to the product they need — no cross-product confusion." },
                { icon: Database, title: "Isolated Databases", desc: "Every product runs on its own database. Hospital data, HR data, and marketing data never mix." },
                { icon: Layers, title: "Independent Deployments", desc: "Each product is deployed and scaled independently. A change in one product never affects another." },
                { icon: Building2, title: "Unified Brand", desc: "All products are built and maintained by SRP AI Labs. Same quality standards, different domain expertise." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-start gap-4 p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <div className="p-8 rounded-3xl bg-card/30 border border-border/40 backdrop-blur-xl">
                <p className="text-center text-sm font-semibold text-foreground mb-6">Access each product directly at its own subdomain:</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Autonomous OS", url: "https://autonomous.srpailabs.com", icon: Monitor, color: "text-blue-400", desc: "Business automation" },
                    { name: "Marketing OS", url: "https://app.srpailabs.com", icon: BarChart3, color: "text-purple-400", desc: "AI marketing" },
                    { name: "MediFlow", url: "https://mediflow.srpailabs.com", icon: Activity, color: "text-emerald-400", desc: "Healthcare OS" },
                    { name: "SmartRecruit", url: "https://recruit.srpailabs.com", icon: UserCheck, color: "text-orange-400", desc: "HR & Recruitment" },
                  ].map((p) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-background/60 border border-border/60 hover:border-primary/40 transition-all group/card text-center">
                      <div className="w-10 h-10 rounded-xl bg-card border border-border/60 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                        <p.icon className={`w-5 h-5 ${p.color}`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{p.name}</div>
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

      {/* ==================== USE CASES ==================== */}
      <section id="use-cases" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Who It's For
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Built for <span className="gradient-text">Every Industry</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">From startups to enterprises — SRP AI Labs platforms fit your workflow</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Building2, title: "Enterprises & Agencies", product: "Marketing OS", desc: "Automate 80% of your marketing ops — content, outreach, reporting — while your team focuses on strategy.", tag: "Marketing OS" },
                { icon: HeartPulse, title: "Healthcare Providers", product: "MediFlow", desc: "Reduce admin burden with AI-driven patient intake, scheduling, and documentation that integrates with your EHR.", tag: "MediFlow" },
                { icon: Briefcase, title: "HR & Talent Teams", product: "SmartRecruit", desc: "Cut time-to-hire by 60% using AI screening, automated interviews, and a smart ATS that learns your hiring style.", tag: "SmartRecruit" },
                { icon: Rocket, title: "Ops & Growth Teams", product: "Autonomous OS", desc: "Deploy AI agents to handle repetitive operations — reporting, CRM updates, notifications — end-to-end autonomously.", tag: "Autonomous OS" },
                { icon: Code, title: "SaaS Startups", product: "Custom Workflows", desc: "Get n8n-powered automation tailored to your stack — webhooks, APIs, databases — built and deployed in days.", tag: "Custom Build" },
                { icon: Globe, title: "E-Commerce Brands", product: "Marketing OS", desc: "Automate product launches, customer segmentation, abandonment emails, and review campaigns at scale.", tag: "Marketing OS" },
              ].map((uc, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-500 group">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
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

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="py-28 relative">
        <div className="container mx-auto px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Flexible Pricing
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Plans for <span className="gradient-text">Every Stage</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Pricing depends on solution type, users, workflow volume, and deployment scope.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$49",
                  period: "/mo",
                  desc: "Perfect for small teams getting started with AI automation",
                  features: ["1 solution deployment", "5 active workflows", "1,000 automation runs/mo", "Email support", "Standard integrations"],
                  cta: "Get Started",
                  popular: false,
                },
                {
                  name: "Growth",
                  price: "$149",
                  period: "/mo",
                  desc: "For growing teams that need advanced automation power",
                  features: ["Advanced automation features", "50 active workflows", "50,000 automation runs/mo", "Priority support", "Advanced AI agents", "Custom integrations", "Analytics dashboard"],
                  cta: "Book Demo",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  period: "",
                  desc: "Custom solution setup for large organizations",
                  features: ["Custom solution setup", "Dedicated AI agent deployment", "On-premise deployment option", "SLA & uptime guarantee", "Custom model fine-tuning", "Dedicated account manager", "White-label option"],
                  cta: "Contact Sales",
                  popular: false,
                },
              ].map((plan, i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="relative">
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-lg">
                        <Star className="w-3 h-3" /> Most Popular
                      </span>
                    </div>
                  )}
                  <Card className={`h-full transition-all duration-500 ${
                    plan.popular
                      ? "bg-primary/5 border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
                      : "bg-card/50 border-border/50 hover:border-primary/30"
                  }`}>
                    <CardHeader className="p-8 pb-6">
                      <CardTitle className="text-xl font-display mb-2">{plan.name}</CardTitle>
                      <div className="flex items-end gap-1 mb-3">
                        <span className="text-4xl font-bold text-foreground font-display">{plan.price}</span>
                        <span className="text-muted-foreground text-sm mb-1.5">{plan.period}</span>
                      </div>
                      <CardDescription className="text-sm">{plan.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button asChild className={`w-full rounded-full ${
                        plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "variant-outline"
                      }`} variant={plan.popular ? "default" : "outline"}>
                        <a href="#contact">{plan.cta}</a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeInUp} className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto p-4 rounded-xl bg-card/30 border border-border/40">
              Need a hospital, recruitment, marketing, or custom automation solution?{" "}
              <a href="#contact" className="text-primary hover:underline font-medium">Contact SRP AI Labs</a>{" "}
              for tailored pricing.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ==================== TOOLS & TECHNOLOGIES ==================== */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center">
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Tech Stack
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold font-display mb-4">
              Tools & <span className="gradient-text">Technologies</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              The core technologies powering AI automation workflows
            </motion.p>
            <motion.p variants={fadeInUp} className="text-sm text-muted-foreground mb-14 max-w-3xl mx-auto bg-card/40 border border-border/40 rounded-xl px-6 py-4">
              <span className="text-foreground font-medium">40+ Automation Workflows</span> have been practiced and built hands-on as real working examples for skill-building and demonstration.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {toolsAndTechnologies.map((tool, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -6 }}
                  className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 cursor-default"
                >
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <tool.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{tool.name}</h4>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scrolling tech tags */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {["n8n", "Apify", "WhatsApp Cloud API", "Google API Suite", "REST APIs", "JSON", "Webhooks", "Selenium (Java)", "AI Agents", "No-Code Automation Tools"].map((tech, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-2.5 bg-card/50 border border-border/50 text-foreground rounded-full text-sm font-medium hover:border-primary/40 transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="py-28 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">Get answers to common questions about our services</p>
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

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Let's Work Together
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Ready to <span className="gradient-text">Automate</span>?
              </h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-14 text-center max-w-2xl mx-auto">
              Whether you need a custom AI agent, workflow automation, or just want to explore what's possible—I'm here to help.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeInUp} className="space-y-6">
                <h4 className="text-xl font-semibold text-foreground font-display">Contact Information</h4>
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
                      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full" size="lg">
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
      <footer className="py-20 relative border-t border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <img src={srpLogo} alt="SRP AI Labs" className="h-10 w-auto mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                SRP AI Labs builds AI-powered SaaS products that automate the hardest parts of running a business.
              </p>
              <p className="text-xs text-muted-foreground">Part of SRP AI Labs Platform &mdash; <a href="https://srpailabs.com" className="hover:text-primary transition-colors">srpailabs.com</a></p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Products</h4>
              <ul className="space-y-3">
                <li><a href="https://autonomous.srpailabs.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5" />Autonomous OS</a></li>
                <li><a href="https://app.srpailabs.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" />Marketing OS</a></li>
                <li><a href="https://mediflow.srpailabs.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" />MediFlow</a></li>
                <li><a href="https://recruit.srpailabs.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5" />SmartRecruit</a></li>
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
