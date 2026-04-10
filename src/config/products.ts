import { Monitor, BarChart3, Activity, UserCheck, TrendingUp, Settings, Users2, Leaf, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProductCategory =
  | "AI Business Platforms"
  | "Enterprise Systems"
  | "Growth & Revenue Systems"
  | "Industry Solutions"
  | "Consumer AI Apps";

export interface Product {
  name: string;
  desc: string;
  description: string;
  tagline: string;
  url: string;
  subdomain: string;
  icon: LucideIcon;
  color: string;
  gradientColor: string;
  border: string;
  iconColor: string;
  badge: "Live" | "Beta" | "New" | "Coming Soon";
  tag?: string;
  isNew?: boolean;
  isComingSoon?: boolean;
  category: ProductCategory;
  features: string[];
}

export const products: Product[] = [
  // ── AI Business Platforms ──
  {
    name: "Autonomous OS",
    desc: "AI-powered business operating system",
    tagline: "AI Business Application Generator",
    description: "AI-powered platform that generates full business applications, workflows, dashboards, automation rules, compliance logic, and data systems from natural language. Multi-industry, multi-tenant.",
    url: "https://autonomous.srpailabs.com",
    subdomain: "autonomous.srpailabs.com",
    icon: Monitor,
    color: "from-blue-500 to-cyan-500",
    gradientColor: "from-blue-500/20 to-cyan-500/10",
    border: "hover:border-blue-500/40",
    iconColor: "text-blue-400",
    badge: "Live",
    category: "AI Business Platforms",
    features: ["Generate apps from natural language", "Multi-industry, multi-tenant", "Automated workflow & dashboard generation", "Compliance & business logic AI"],
  },
  {
    name: "Automation OS",
    desc: "AI CRM, revenue automation & workflow system",
    tagline: "AI CRM & Revenue Automation",
    description: "AI-powered CRM and revenue automation platform with intelligent pipeline management, automated invoicing, workflow orchestration, and real-time revenue analytics.",
    url: "https://automation.srpailabs.com",
    subdomain: "automation.srpailabs.com",
    icon: Settings,
    color: "from-rose-500 to-red-500",
    gradientColor: "from-rose-500/20 to-red-500/10",
    border: "hover:border-rose-500/40",
    iconColor: "text-rose-400",
    badge: "New",
    tag: "NEW",
    category: "AI Business Platforms",
    features: ["AI-powered CRM & pipeline", "Automated invoicing & billing", "Workflow orchestration engine", "Real-time revenue analytics"],
  },

  // ── Enterprise Systems ──
  {
    name: "HRMS",
    desc: "AI-Native HRMS Platform — Beyond Workday, Oracle, and SAP",
    tagline: "AI-Native Human Resource Management System",
    description: "Full employee lifecycle management from hiring to retirement — onboarding, payroll, performance, leave, attendance, and AI-powered HR analytics. Built to replace legacy HRMS platforms.",
    url: "https://hrms.srpailabs.com",
    subdomain: "hrms.srpailabs.com",
    icon: Users2,
    color: "from-violet-500 to-indigo-500",
    gradientColor: "from-violet-500/20 to-indigo-500/10",
    border: "hover:border-violet-500/40",
    iconColor: "text-violet-400",
    badge: "New",
    tag: "NEW",
    isNew: true,
    category: "Enterprise Systems",
    features: ["Full employee lifecycle management", "Payroll, attendance & leave automation", "AI-powered HR analytics & reporting", "Hiring to retirement — one platform"],
  },
  {
    name: "SmartRecruit",
    desc: "AI Recruitment Platform — ATS + Screening",
    tagline: "AI-Powered Recruitment ATS",
    description: "Pure ATS and hiring system — AI-powered resume screening, job pipeline automation, interview scheduling, and candidate management. Purpose-built for recruitment teams.",
    url: "https://recruit.srpailabs.com",
    subdomain: "recruit.srpailabs.com",
    icon: UserCheck,
    color: "from-orange-500 to-amber-500",
    gradientColor: "from-orange-500/20 to-amber-500/10",
    border: "hover:border-orange-500/40",
    iconColor: "text-orange-400",
    badge: "Live",
    category: "Enterprise Systems",
    features: ["AI resume screening & scoring", "OTP login & secure access", "AI-generated job descriptions", "Full hiring pipeline automation"],
  },

  // ── Growth & Revenue Systems ──
  {
    name: "Growth OS",
    desc: "Recruitment + Sales Automation Platform",
    tagline: "AI-Powered Recruitment + Sales Automation",
    description: "AI-powered Recruitment + Sales Automation Platform — manage leads, candidates, and conversions in one system. Automated outreach, pipeline management, and real-time growth analytics.",
    url: "https://growth.srpailabs.com",
    subdomain: "growth.srpailabs.com",
    icon: TrendingUp,
    color: "from-green-500 to-lime-500",
    gradientColor: "from-green-500/20 to-lime-500/10",
    border: "hover:border-green-500/40",
    iconColor: "text-green-400",
    badge: "Live",
    category: "Growth & Revenue Systems",
    features: ["Recruitment pipeline automation", "Lead generation & sales CRM", "AI outreach sequences & follow-ups", "Real-time growth analytics dashboard"],
  },
  {
    name: "Marketing OS",
    desc: "AI Marketing Automation Platform",
    tagline: "AI Marketing SaaS Platform",
    description: "AI marketing SaaS with CRM, lead capture, multilingual creative generation, campaign automation, social media scheduling, localization, and analytics.",
    url: "https://app.srpailabs.com",
    subdomain: "app.srpailabs.com",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    gradientColor: "from-purple-500/20 to-pink-500/10",
    border: "hover:border-purple-500/40",
    iconColor: "text-purple-400",
    badge: "Live",
    category: "Growth & Revenue Systems",
    features: ["CRM & lead capture automation", "Multilingual creative generation", "Campaign & social media scheduling", "Analytics & performance dashboard"],
  },

  // ── Industry Solutions ──
  {
    name: "MediFlow",
    desc: "Healthcare Workflow AI System",
    tagline: "Healthcare Operating System",
    description: "AI-powered hospital management SaaS with patient lifecycle, chatbot booking, prescriptions, lab, billing, pharmacy, staff dashboards, and multi-tenant hospital isolation.",
    url: "https://mediflow.srpailabs.com",
    subdomain: "mediflow.srpailabs.com",
    icon: Activity,
    color: "from-emerald-500 to-teal-500",
    gradientColor: "from-emerald-500/20 to-teal-500/10",
    border: "hover:border-emerald-500/40",
    iconColor: "text-emerald-400",
    badge: "Live",
    category: "Industry Solutions",
    features: ["Patient lifecycle & chatbot booking", "Prescriptions, lab & billing", "Pharmacy & staff dashboards", "Multi-tenant hospital isolation"],
  },

  // ── Consumer AI Apps ──
  {
    name: "NutriSutra",
    desc: "AI Nutrition Engine — Accurate calorie analysis for real-world food",
    tagline: "AI Nutrition Analysis App",
    description: "AI Nutrition Engine that delivers accurate calorie and macro analysis for real-world food — snap a photo or describe your meal and get instant nutritional insights.",
    url: "https://nutrisutra.srpailabs.com",
    subdomain: "nutrisutra.srpailabs.com",
    icon: Leaf,
    color: "from-lime-500 to-green-500",
    gradientColor: "from-lime-500/20 to-green-500/10",
    border: "hover:border-lime-500/40",
    iconColor: "text-lime-400",
    badge: "New",
    tag: "NEW",
    isNew: true,
    category: "Consumer AI Apps",
    features: ["Photo-based meal recognition", "Accurate calorie & macro analysis", "Real-world food database", "Daily nutrition tracking"],
  },
  {
    name: "SRP Kids",
    desc: "AI-powered cognitive learning system for kids",
    tagline: "AI Learning App for Kids",
    description: "AI-powered cognitive learning system for kids — adaptive lessons, gamified challenges, and personalized learning paths designed to build skills and spark curiosity.",
    url: "https://kids.srpailabs.com",
    subdomain: "kids.srpailabs.com",
    icon: GraduationCap,
    color: "from-yellow-400 to-orange-400",
    gradientColor: "from-yellow-400/20 to-orange-400/10",
    border: "hover:border-yellow-400/40",
    iconColor: "text-yellow-400",
    badge: "Coming Soon",
    isComingSoon: true,
    category: "Consumer AI Apps",
    features: ["Adaptive AI learning paths", "Gamified challenges & rewards", "Age-appropriate content", "Parent progress dashboard"],
  },
];

export const PRODUCT_COUNT = products.filter((p) => !p.isComingSoon).length;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "AI Business Platforms",
  "Enterprise Systems",
  "Growth & Revenue Systems",
  "Industry Solutions",
  "Consumer AI Apps",
];

export const productsByCategory = PRODUCT_CATEGORIES.map((cat) => ({
  category: cat,
  items: products.filter((p) => p.category === cat),
}));
