import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, X, ChevronDown, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import srpLogo from "@/assets/srp-ai-logo.png";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Platform", href: "/platform" },
  {
    label: "Solutions",
    children: [
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Technology", href: "/technology" },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
];

interface PageLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

export function PageLayout({ children, currentPath }: PageLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur-2xl z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={srpLogo} alt="SRP AI Labs" className="h-10 w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(139,92,246,0.2)]" />
              <span className="hidden">
                SRP{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, hsl(265 85% 65%), hsl(190 100% 50%))",
                  }}
                >
                  AI Labs
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-5">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative group">
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-background/95 backdrop-blur border border-border/60 rounded-xl shadow-xl p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href!}
                    className={`text-sm transition-colors duration-300 relative group ${
                      currentPath === link.href
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link to="/" className="flex items-center gap-1.5 text-sm">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Home
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400 rounded-full border-0 shadow-[0_2px_10px_hsl(265_85%_65%/0.3)]"
              >
                <Link to="/#contact">Get Started</Link>
              </Button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-foreground"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden pt-4 pb-3 border-t border-border/40 mt-3 space-y-0.5">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setSolutionsOpen(!solutionsOpen)}
                      className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl text-sm text-foreground hover:bg-muted/50 transition-colors"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform ${solutionsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {solutionsOpen &&
                      link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 px-6 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href!}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2.5 px-3 rounded-xl text-sm transition-colors ${
                      currentPath === link.href
                        ? "text-primary font-medium bg-primary/5"
                        : "text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 SRP AI Labs — AI Operating System for Modern Businesses
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <a
                href="mailto:info@srpailabs.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                info@srpailabs.com
              </a>
              <a
                href="https://www.linkedin.com/in/sashyank-p-9785a9303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/shashankpasikanti91-blip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
