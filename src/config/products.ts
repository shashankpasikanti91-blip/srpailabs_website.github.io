import { Monitor, BarChart3, Activity, UserCheck, TrendingUp, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  badge: "Live" | "Beta" | "New";
  tag?: string;
  features: string[];
}

export const products: Product[] = [
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
    features: ["Generate apps from natural language", "Multi-industry, multi-tenant", "Automated workflow & dashboard generation", "Compliance & business logic AI"],
  },
  {
    name: "Marketing OS",
    desc: "AI marketing automation platform",
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
    features: ["CRM & lead capture automation", "Multilingual creative generation", "Campaign & social media scheduling", "Analytics & performance dashboard"],
  },
  {
    name: "MediFlow",
    desc: "Healthcare workflow AI system",
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
    features: ["Patient lifecycle & chatbot booking", "Prescriptions, lab & billing", "Pharmacy & staff dashboards", "Multi-tenant hospital isolation"],
  },
  {
    name: "SmartRecruit",
    desc: "AI recruitment platform",
    tagline: "AI-Powered Recruitment ATS",
    description: "AI-powered recruitment ATS with resume screening, hiring workflows, job generation, AI writing, OTP login, and full pipeline automation.",
    url: "https://recruit.srpailabs.com",
    subdomain: "recruit.srpailabs.com",
    icon: UserCheck,
    color: "from-orange-500 to-amber-500",
    gradientColor: "from-orange-500/20 to-amber-500/10",
    border: "hover:border-orange-500/40",
    iconColor: "text-orange-400",
    badge: "Live",
    features: ["AI resume screening & scoring", "OTP login & secure access", "AI-generated job descriptions", "Full hiring pipeline automation"],
  },
  {
    name: "Growth OS",
    desc: "Sales & lead generation automation",
    tagline: "AI-Driven Business Growth Platform",
    description: "AI-powered growth platform with automated lead generation, pipeline management, outreach sequences, workflow execution, and real-time business analytics — built for scale.",
    url: "https://growth.srpailabs.com",
    subdomain: "growth.srpailabs.com",
    icon: TrendingUp,
    color: "from-green-500 to-lime-500",
    gradientColor: "from-green-500/20 to-lime-500/10",
    border: "hover:border-green-500/40",
    iconColor: "text-green-400",
    badge: "Live",
    features: ["Automated lead generation & scoring", "AI outreach sequences & follow-ups", "Pipeline tracking & deal management", "n8n workflow execution engine", "Real-time growth analytics dashboard"],
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
    features: ["AI-powered CRM & pipeline", "Automated invoicing & billing", "Workflow orchestration engine", "Real-time revenue analytics"],
  },
];

export const PRODUCT_COUNT = products.length;
