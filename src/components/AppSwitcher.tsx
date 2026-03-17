import { useState } from "react";
import { Monitor, BarChart3, Activity, UserCheck, X, Grid3X3 } from "lucide-react";

const apps = [
  {
    name: "Autonomous OS",
    description: "AI work automation",
    url: "https://autonomous.srpailabs.com",
    icon: Monitor,
    color: "from-blue-500 to-cyan-500",
    badge: "Live",
  },
  {
    name: "Marketing OS",
    description: "Growth & campaigns",
    url: "https://app.srpailabs.com",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    badge: "Live",
  },
  {
    name: "MediFlow",
    description: "Healthcare workflows",
    url: "https://mediflow.srpailabs.com",
    icon: Activity,
    color: "from-emerald-500 to-teal-500",
    badge: "Beta",
  },
  {
    name: "SmartRecruit",
    description: "AI recruitment",
    url: "https://recruit.srpailabs.com",
    icon: UserCheck,
    color: "from-orange-500 to-amber-500",
    badge: "Live",
  },
];

export default function AppSwitcher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 left-6 z-50 w-12 h-12 rounded-2xl bg-card border border-border/60 shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:scale-105"
        aria-label="Switch product"
      >
        {open ? <X className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
      </button>

      {/* App grid panel */}
      {open && (
        <div className="fixed bottom-40 left-6 z-50 w-72 rounded-2xl bg-card border border-border/60 shadow-2xl p-4 backdrop-blur-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            SRP AI Labs — Switch Product
          </p>
          <div className="grid grid-cols-2 gap-2">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <a
                  key={app.name}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 p-3 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-accent/30 transition-all"
                  onClick={() => setOpen(false)}
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center`}>
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{app.name}</p>
                    <p className="text-[10px] text-muted-foreground">{app.description}</p>
                  </div>
                  <span className={`self-start text-[9px] font-bold px-1.5 py-0.5 rounded-full ${app.badge === "Beta" ? "bg-yellow-500/20 text-yellow-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                    {app.badge}
                  </span>
                </a>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-border/40 text-center">
            <a href="https://srpailabs.com" className="text-[10px] text-muted-foreground hover:text-primary transition-colors">
              srpailabs.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
