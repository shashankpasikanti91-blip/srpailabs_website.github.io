import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-primary">
              SRP Automation Labs
            </Link>
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div {...fadeInUp}>
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the services provided by SRP Automation Labs ("we," "our," or "us"), 
                you agree to be bound by these Terms of Service. If you do not agree to these terms, 
                please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Services Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SRP Automation Labs provides workflow automation and integration services, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>n8n workflow automation development</li>
                <li>WhatsApp Business API integration</li>
                <li>Web scraping and data pipeline solutions</li>
                <li>API integrations and webhook configurations</li>
                <li>AI agent workflow development</li>
                <li>Custom business automation solutions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Client Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As a client, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate and complete information necessary for service delivery</li>
                <li>Ensure you have the legal right to automate processes involving third-party services</li>
                <li>Comply with all applicable laws and third-party terms of service</li>
                <li>Maintain the confidentiality of any credentials or access provided</li>
                <li>Use our services only for lawful purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                Upon full payment, clients receive ownership of custom workflows and automations 
                created specifically for their projects. We retain the right to use general methodologies, 
                techniques, and non-proprietary components in future projects.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Payment terms are agreed upon before project commencement. Unless otherwise specified, 
                a deposit may be required before work begins. Final payment is due upon project completion 
                or as outlined in the project agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Confidentiality</h2>
              <p className="text-muted-foreground leading-relaxed">
                We treat all client data, business processes, and proprietary information as confidential. 
                We will not disclose your information to third parties without your consent, 
                except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                SRP Automation Labs shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages arising from the use of our services. 
                Our total liability shall not exceed the amount paid for the specific service in question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our automations may integrate with third-party services (e.g., WhatsApp, Google APIs, Apify). 
                We are not responsible for changes, outages, or policy changes from these third-party providers 
                that may affect your automations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                Either party may terminate the service agreement with written notice. 
                Upon termination, you will receive all completed work and any applicable refunds 
                as outlined in your project agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. 
                Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at:{" "}
                <a href="mailto:info@srpailabs.com" className="text-primary hover:underline">
                  info@srpailabs.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 SRP Automation Labs — Workflow Automation & AI Solutions</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
