import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Share2, Lock, UserCheck, Cookie, Mail, Database, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import srpLogo from "@/assets/srp-ai-logo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const sections = [
  {
    icon: Eye,
    title: "1. Introduction",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        <strong className="text-foreground">SRP AI Labs</strong> ("we," "our," or "us") is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit srpailabs.com
        or use any of our AI products — SRP HRMS, SmartRecruit, Growth OS, Marketing OS, MediFlow, NutriSutra, SRP Kids,
        Autonomous OS, and Automation OS. By using our services, you consent to the practices described here.
      </p>
    ),
  },
  {
    icon: Fingerprint,
    title: "2. Information We Collect",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The type of data collected varies by product and the context of your interaction:
        </p>
        <div className="space-y-3">
          {[
            { label: "Account & Identity Data", desc: "Name, email, organisation name, job title, and authentication credentials provided during sign-up." },
            { label: "Product-Specific Data", desc: "Depending on product: employee records (HRMS), candidate data (SmartRecruit), patient/health records (MediFlow), nutritional profiles (NutriSutra), child learning progress (SRP Kids), pipeline & CRM data (Growth OS, Marketing OS)." },
            { label: "Usage & Analytics", desc: "Features used, actions taken, session duration, error logs, and in-app navigation patterns to improve our products." },
            { label: "Technical Data", desc: "IP address, browser type, device model, operating system, and referral source." },
            { label: "Communications", desc: "Messages sent via contact forms, email, or our chat widget." },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-xl bg-muted/30 border border-border/40">
              <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    icon: Shield,
    title: "3. How We Use Your Information",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-3">We use your data to:</p>
        <ul className="space-y-2">
          {[
            "Provide, operate, and improve our AI products and services",
            "Authenticate users and enforce role-based access controls",
            "Personalise your experience within each product",
            "Send transactional emails, product updates, and security alerts",
            "Conduct anonymised analytics to improve AI model performance",
            "Comply with legal obligations and respond to lawful requests",
            "Detect, prevent, and respond to security threats or abusive activity",
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
    icon: Share2,
    title: "4. Data Sharing",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We do not sell, rent, or trade your personal information. We may share data only in these limited circumstances:
        </p>
        <ul className="space-y-2">
          {[
            "With trusted infrastructure providers (cloud hosting, databases) under strict data processor agreements",
            "With payment processors (Stripe) solely for billing purposes — we never store card numbers",
            "With analytics and error-monitoring tools using anonymised or pseudonymised data",
            "When required by law, court order, or regulatory authority",
            "In the event of a merger or acquisition, with the successor entity under the same privacy terms",
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
    title: "5. Data Security & Safety",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Security is not an afterthought — it is built into the architecture of every SRP AI Labs product:
        </p>
        <div className="space-y-3">
          {[
            {
              title: "Physically Isolated Databases",
              desc: "Each product (HRMS, MediFlow, NutriSutra, SRP Kids, etc.) has its own database. HR data, medical data, and nutritional data are never stored together — isolation is at the infrastructure level.",
            },
            {
              title: "End-to-End Encryption",
              desc: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Passwords and sensitive credentials are hashed with bcrypt — never stored in plain text.",
            },
            {
              title: "Role-Based Access Control (RBAC)",
              desc: "Users can only access data their assigned role permits. All permission changes and privileged actions are logged and auditable.",
            },
            {
              title: "Children's Data (SRP Kids)",
              desc: "SRP Kids applies enhanced protections for data belonging to users under 13. Parental consent is required, data collected is minimal, and it is never used for advertising.",
            },
            {
              title: "Health Data (MediFlow)",
              desc: "Patient health records are treated as sensitive data. Access is restricted to verified healthcare providers and is logged per session.",
            },
            {
              title: "Incident Response",
              desc: "We maintain a formal incident response plan. Users and regulators are notified within 72 hours of a confirmed breach affecting their data.",
            },
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
    icon: Database,
    title: "6. Data Retention",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        We retain your data only as long as necessary to provide the service or comply with legal obligations.
        Account data is retained while your account is active. Upon account deletion, data is purged within 30 days,
        except where retention is required by law (e.g., tax records, audit logs). You may request an export of your data
        at any time before deletion.
      </p>
    ),
  },
  {
    icon: UserCheck,
    title: "7. Your Rights",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Depending on your jurisdiction (GDPR, India DPDP Act, CCPA, etc.), you may have the right to:
        </p>
        <ul className="space-y-2">
          {[
            "Access — request a copy of the personal data we hold about you",
            "Correction — request correction of inaccurate or incomplete data",
            "Deletion — request erasure of your data (subject to legal obligations)",
            "Portability — receive your data in a machine-readable format",
            "Restriction — limit how we process your data in certain circumstances",
            "Objection — object to automated decision-making or profiling",
            "Withdrawal — withdraw consent at any time where processing is consent-based",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mt-3">
          To exercise any of these rights, email{" "}
          <a href="mailto:privacy@srpailabs.com" className="text-primary hover:underline">
            privacy@srpailabs.com
          </a>
        </p>
      </>
    ),
  },
  {
    icon: Cookie,
    title: "8. Cookies & Tracking",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        Our website and products use essential cookies for authentication and security, and optional analytics cookies
        to understand usage patterns. You can manage or disable non-essential cookies through your browser settings
        or our cookie preference centre. Disabling essential cookies may affect product functionality.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "9. Contact Us",
    content: (
      <p className="text-muted-foreground leading-relaxed">
        For privacy questions, data access requests, or to report a concern, contact our privacy team at:{" "}
        <a href="mailto:privacy@srpailabs.com" className="text-primary hover:underline font-medium">
          privacy@srpailabs.com
        </a>
        {" "}or write to us at{" "}
        <a href="mailto:info@srpailabs.com" className="text-primary hover:underline font-medium">
          info@srpailabs.com
        </a>
      </p>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={srpLogo} alt="SRP AI Labs" className="h-12 sm:h-14 md:h-[3.75rem] w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Security</Link>
              <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Terms</Link>
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
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground font-medium">Legal Documents</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 font-display">Privacy Policy</h1>
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
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link to="/security" className="hover:text-primary transition-colors">Security</Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            <a href="mailto:info@srpailabs.com" className="hover:text-primary transition-colors">info@srpailabs.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;

