import { Monitor, BarChart3, Activity, UserCheck, TrendingUp, Settings, Users2, Leaf, GraduationCap, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProductCategory =
  | "Business Platforms"
  | "Enterprise HR & Hiring"
  | "Growth & Revenue"
  | "Industry Solutions"
  | "Consumer Products";

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
  // ── Business Platforms ──
  {
    name: "Autonomous OS",
    desc: "AI-powered business application generator",
    tagline: "AI Business Application Generator",
    description: "Generate full business applications, dashboards, and workflow systems from natural language — multi-tenant and multi-industry.",
    url: "https://autonomous.srpailabs.com",
    subdomain: "autonomous.srpailabs.com",
    icon: Monitor,
    color: "from-blue-500 to-cyan-500",
    gradientColor: "from-blue-500/20 to-cyan-500/10",
    border: "hover:border-blue-500/40",
    iconColor: "text-blue-400",
    badge: "Live",
    category: "Business Platforms",
    features: ["Generate apps from natural language", "Multi-industry, multi-tenant", "Automated workflow & dashboard generation", "Compliance & business logic AI"],
  },
  {
    name: "Automation OS",
    desc: "CRM, revenue automation & workflow system",
    tagline: "CRM & Revenue Automation",
    description: "Manage pipelines, automate invoicing, orchestrate workflows, and track revenue — all from one intelligent CRM.",
    url: "https://automation.srpailabs.com",
    subdomain: "automation.srpailabs.com",
    icon: Settings,
    color: "from-rose-500 to-red-500",
    gradientColor: "from-rose-500/20 to-red-500/10",
    border: "hover:border-rose-500/40",
    iconColor: "text-rose-400",
    badge: "New",
    tag: "NEW",
    category: "Business Platforms",
    features: ["AI-powered CRM & pipeline", "Automated invoicing & billing", "Workflow orchestration engine", "Real-time revenue analytics"],
  },

  // ── Enterprise HR & Hiring ──
  {
    name: "HRMS",
    desc: "Complete human resource management system",
    tagline: "Complete Human Resource Management",
    description: "Full employee lifecycle from onboarding to payroll, performance, attendance, and HR analytics — built to replace legacy systems.",
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
    category: "Enterprise HR & Hiring",
    features: ["Full employee lifecycle management", "Payroll, attendance & leave automation", "AI-powered HR analytics & reporting", "Hiring to retirement — one platform"],
  },
  {
    name: "SmartRecruit",
    desc: "Hiring & applicant tracking system",
    tagline: "Hiring & Applicant Tracking",
    description: "AI-powered resume screening, pipeline management, interview scheduling, and candidate tracking for modern recruitment teams.",
    url: "https://recruit.srpailabs.com",
    subdomain: "recruit.srpailabs.com",
    icon: UserCheck,
    color: "from-orange-500 to-amber-500",
    gradientColor: "from-orange-500/20 to-amber-500/10",
    border: "hover:border-orange-500/40",
    iconColor: "text-orange-400",
    badge: "Live",
    category: "Enterprise HR & Hiring",
    features: ["AI resume screening & scoring", "OTP login & secure access", "AI-generated job descriptions", "Full hiring pipeline automation"],
  },

  // ── Growth & Revenue ──
  {
    name: "Growth OS",
    desc: "Recruitment + sales automation platform",
    tagline: "Recruitment + Sales Automation",
    description: "Unified lead and candidate management with automated outreach, pipeline tracking, and growth analytics.",
    url: "https://growth.srpailabs.com",
    subdomain: "growth.srpailabs.com",
    icon: TrendingUp,
    color: "from-green-500 to-lime-500",
    gradientColor: "from-green-500/20 to-lime-500/10",
    border: "hover:border-green-500/40",
    iconColor: "text-green-400",
    badge: "Live",
    category: "Growth & Revenue",
    features: ["Recruitment pipeline automation", "Lead generation & sales CRM", "AI outreach sequences & follow-ups", "Real-time growth analytics dashboard"],
  },
  {
    name: "Marketing OS",
    desc: "Marketing automation platform",
    tagline: "Marketing Automation Platform",
    description: "CRM, lead capture, campaign management, multilingual creative generation, social scheduling, and performance analytics.",
    url: "https://app.srpailabs.com",
    subdomain: "app.srpailabs.com",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    gradientColor: "from-purple-500/20 to-pink-500/10",
    border: "hover:border-purple-500/40",
    iconColor: "text-purple-400",
    badge: "Live",
    category: "Growth & Revenue",
    features: ["CRM & lead capture automation", "Multilingual creative generation", "Campaign & social media scheduling", "Analytics & performance dashboard"],
  },

  // ── Industry Solutions ──
  {
    name: "MediFlow",
    desc: "Healthcare management system",
    tagline: "Healthcare Management System",
    description: "Hospital management with patient lifecycle, appointment booking, prescriptions, billing, lab workflows, and multi-tenant isolation.",
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
  {
    name: "SRP Education AI",
    desc: "Education & institutional platform",
    tagline: "Education & Institutional Platform",
    description: "Academic workflows, student progress tracking, AI study support, and institutional analytics for scalable education delivery.",
    url: "https://edu.srpailabs.com",
    subdomain: "edu.srpailabs.com",
    icon: BookOpen,
    color: "from-indigo-500 to-blue-500",
    gradientColor: "from-indigo-500/20 to-blue-500/10",
    border: "hover:border-indigo-500/40",
    iconColor: "text-indigo-400",
    badge: "New",
    tag: "NEW",
    isNew: true,
    category: "Industry Solutions",
    features: ["Student progress & success analytics", "AI-powered study support", "Institutional management dashboards", "Structured learning workflows"],
  },

  // ── Consumer Products ──
  {
    name: "NutriSutra",
    desc: "AI nutrition analysis app",
    tagline: "AI Nutrition Analysis",
    description: "Snap a photo or describe a meal — get accurate calorie, macro, and nutritional breakdown instantly.",
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
    category: "Consumer Products",
    features: ["Photo-based meal recognition", "Accurate calorie & macro analysis", "Real-world food database", "Daily nutrition tracking"],
  },
  {
    name: "SRP Kids",
    desc: "Learning platform for children",
    tagline: "Learning Platform for Kids",
    description: "Adaptive lessons, gamified challenges, and personalized learning paths designed to build skills and spark curiosity.",
    url: "https://kids.srpailabs.com",
    subdomain: "kids.srpailabs.com",
    icon: GraduationCap,
    color: "from-yellow-400 to-orange-400",
    gradientColor: "from-yellow-400/20 to-orange-400/10",
    border: "hover:border-yellow-400/40",
    iconColor: "text-yellow-400",
    badge: "Coming Soon",
    isComingSoon: true,
    category: "Consumer Products",
    features: ["Adaptive AI learning paths", "Gamified challenges & rewards", "Age-appropriate content", "Parent progress dashboard"],
  },
];

export const PRODUCT_COUNT = products.filter((p) => !p.isComingSoon).length;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Business Platforms",
  "Enterprise HR & Hiring",
  "Growth & Revenue",
  "Industry Solutions",
  "Consumer Products",
];

export const productsByCategory = PRODUCT_CATEGORIES.map((cat) => ({
  category: cat,
  items: products.filter((p) => p.category === cat),
}));
