import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Scale, CreditCard, Users, Globe, AlertTriangle, Building2, FileText, XCircle, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import srpLogo from "@/assets/srp-ai-logo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        By accessing or using any product or service provided by <strong className="text-foreground">SRP AI Labs</strong> ("we," "our," or "us"),
        you agree to be bound by these Terms of Service. This includes your use of srpailabs.com, srphrms.com,
        smartrecruit.in, growthossrp.com, srpmarketing.com, mediflowsrp.com, nutrisutra.in, srpkids.com,
        autonomousos.com, and automationos.com. If you do not agree to these terms, please do not use our services.
      </p>
    ),
  },
  {
    icon: Building2,
    title: "2. Services Description",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          SRP AI Labs develops and operates a suite of <strong className="text-foreground">10 AI-powered products</strong> across five categories:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { cat: "Business Platforms", items: ["Autonomous OS — AI-native operating system", "Automation OS — Intelligent workflow engine"] },
            { cat: "Enterprise HR & Hiring", items: ["SRP HRMS — HR lifecycle management", "SmartRecruit — AI recruitment platform"] },
            { cat: "Growth & Revenue", items: ["Growth OS — Revenue & recruitment hybrid", "Marketing OS — AI marketing automation"] },
            { cat: "Industry Solutions", items: ["MediFlow — Healthcare AI for clinics & hospitals", "SRP Education AI — Student success & institutional intelligence"] },
            { cat: "Consumer Products", items: ["NutriSutra — AI nutrition & wellness", "SRP Kids — AI learning for children (Coming Soon)"] },
          ].map((g) => (
            <div key={g.cat} className="p-3 rounded-xl bg-muted/30 border border-border/40">
              <p className="text-xs font-semibold text-primary mb-1.5 uppercase tracking-wide">{g.cat}</p>
              <ul className="space-y-1">
                {g.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    icon: Users,
    title: "3. User Responsibilities",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-3">As a user or client, you agree to:</p>
        <ul className="space-y-2">
          {[
            "Provide accurate and complete information during registration and onboarding",
            "Maintain the security and confidentiality of your account credentials",
            "Use our services only for lawful purposes and in compliance with applicable regulations",
            "Ensure you have the legal right to process or automate data involving third parties",
            "Not attempt to reverse-engineer, decompile, or exploit any of our AI systems",
            "Promptly notify us of any unauthorised access or security incidents",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: Lock,
    title: "4. Data Security & Safety",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Security is foundational to every product we build. Our technical safeguards include:
        </p>
        <div className="space-y-3">
          {[
            { title: "Isolated Product Databases", desc: "Each of our 10 products runs on a completely separate database. Medical records in MediFlow, HR records in SRP HRMS, education data in SRP Education AI, and nutritional data in NutriSutra are stored in isolated environments and never co-mingled." },
            { title: "Data Encryption", desc: "All data is encrypted in transit (TLS 1.2+) and at rest. Authentication tokens are hashed using industry-standard algorithms." },
            { title: "Role-Based Access Control", desc: "Every product enforces RBAC — users only access data their role permits. Admin escalations are logged and auditable." },
            { title: "Responsible AI Practices", desc: "Our AI systems are designed to avoid bias and harmful outputs. Healthcare (MediFlow) and children (SRP Kids) products comply with additional safety standards for sensitive contexts." },
            { title: "Security Incident Response", desc: "We maintain an incident response protocol. In the event of a breach, affected users will be notified within 72 hours as required by applicable law." },
          ].map((item) => (
            <div key={item.title} className="p-3 rounded-xl bg-primary/[0.04] border border-primary/15">
              <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    icon: Scale,
    title: "5. Intellectual Property",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        All software, AI models, workflows, interfaces, brand assets, and content produced by SRP AI Labs are our exclusive intellectual property.
        Upon full payment, clients receive a licence to use custom automations built for their specific project.
        We retain the right to use general methodologies, patterns, and non-proprietary techniques in future work.
        You may not reproduce, distribute, or create derivative works from our products without prior written consent.
      </p>
    ),
  },
  {
    icon: CreditCard,
    title: "6. Payment Terms",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Subscription and pricing terms are presented at purchase and vary by product tier. Enterprise contracts are governed by separate agreements.
        Unless otherwise stated, a deposit may be required before custom project work begins.
        Refunds for SaaS subscriptions follow the specific product's refund policy.
        All fees are non-refundable after the billing cycle has commenced, except where required by law.
      </p>
    ),
  },
  {
    icon: Lock,
    title: "7. Confidentiality",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        We treat all client data, business processes, strategic information, and personal records as strictly confidential.
        We will not disclose your information to third parties without your explicit consent, except as required by applicable law or regulatory authority.
        Employees and contractors with access to client data are bound by confidentiality obligations.
      </p>
    ),
  },
  {
    icon: AlertTriangle,
    title: "8. Limitation of Liability",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        SRP AI Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services.
        Our total cumulative liability shall not exceed the total fees paid for the specific product or service in the 12 months preceding the claim.
        We do not warrant uninterrupted or error-free operation of any AI system. AI-generated outputs should be reviewed by qualified professionals before acting on them, particularly in medical, legal, or financial contexts.
      </p>
    ),
  },
  {
    icon: Globe,
    title: "9. Third-Party Services & Integrations",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Our products integrate with third-party services including but not limited to: Google Workspace, Microsoft 365, WhatsApp Business API, LinkedIn, Stripe, Twilio, and healthcare integrations.
        We are not responsible for changes, outages, policy updates, or data handling practices of these third-party providers.
        Where required, you are responsible for your own compliance with third-party terms of service.
      </p>
    ),
  },
  {
    icon: XCircle,
    title: "10. Termination",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Either party may terminate a subscription or service agreement with written notice per the product's cancellation policy.
        We reserve the right to suspend or terminate accounts that violate these Terms, engage in abusive behaviour, or create security risks.
        Upon termination, your data will be retained for 30 days and then permanently deleted, unless you request earlier deletion or an export.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "11. Modifications to Terms",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        We reserve the right to modify these Terms of Service at any time.
        Material changes will be communicated via email or in-product notifications at least 14 days before taking effect.
        Continued use of our services after changes constitutes acceptance of the updated terms.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "12. Contact Information",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        For questions or concerns about these Terms, please contact us at:{" "}
        <a href="mailto:legal@srpailabs.com" className="text-primary hover:underline font-medium">
          legal@srpailabs.com
        </a>
        {" "}or{" "}
        <a href="mailto:info@srpailabs.com" className="text-primary hover:underline font-medium">
          info@srpailabs.com
        </a>
      </p>
    ),
  },
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={srpLogo} alt="SRP AI Labs" className="h-11 sm:h-12 md:h-[3.25rem] w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Security</Link>
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Privacy</Link>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Home
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground font-medium">Legal Documents</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 font-display">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: April 2026</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.07 } } }}
          className="space-y-6"
        >
          {sections.map((section) => (
            <motion.section
              key={section.title}
              variants={fadeInUp}
              className="p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              </div>
              <div>{section.content}</div>
            </motion.section>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-border mt-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="mb-3">© 2026 SRP AI Labs — Specialized Software for Modern Business</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/technology" className="hover:text-primary transition-colors">Technology</Link>
            <Link to="/security" className="hover:text-primary transition-colors">Security</Link>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <a href="mailto:info@srpailabs.com" className="hover:text-primary transition-colors">info@srpailabs.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;

