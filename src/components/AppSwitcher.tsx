import { useState, useEffect, useCallback } from "react";
import { X, Grid3X3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/config/products";

export default function AppSwitcher() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close on escape
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open, handleKey]);

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 left-4 sm:bottom-24 sm:left-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-card border border-border/60 shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
        aria-label="Switch product"
      >
        {open ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel - Mobile: bottom drawer, Desktop: floating panel */}
            <motion.div
              initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 10 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={
                isMobile
                  ? "fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-card border-t border-border/60 shadow-2xl p-5 pb-8 max-h-[70vh] overflow-y-auto"
                  : "fixed bottom-36 left-6 z-50 w-80 rounded-2xl bg-card border border-border/60 shadow-2xl p-4 backdrop-blur-xl max-h-[70vh] overflow-y-auto"
              }
            >
              {/* Mobile drag handle */}
              {isMobile && (
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-1 rounded-full bg-border" />
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                  SRP AI Labs — Products
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className={isMobile ? "grid grid-cols-1 gap-2" : "grid grid-cols-2 gap-2"}>
                {products.map((app) => {
                  const Icon = app.icon;
                  return (
                    <a
                      key={app.name}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-accent/10 transition-all active:scale-[0.98]"
                      onClick={() => setOpen(false)}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-tight truncate flex items-center gap-1.5">
                          {app.name}
                          {app.tag && <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-rose-500/20 text-rose-400">{app.tag}</span>}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{app.desc}</p>
                      </div>
                      <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${app.badge === "New" ? "bg-rose-500/20 text-rose-400" : app.badge === "Beta" ? "bg-yellow-500/20 text-yellow-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                        {app.badge}
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 text-center">
                <a href="https://srpailabs.com" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  srpailabs.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
