import { useEffect, useState } from "react";

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("[Index] Component mounted");
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-4">SRP AI Labs</h1>
      <p className="text-lg mb-4">Component Status: {mounted ? "✅ Mounted" : "⏳ Loading"}</p>
      
      <div className="mt-8 p-4 bg-card rounded-lg border border-border">
        <h2 className="text-2xl font-bold mb-2">Test Information</h2>
        <ul className="space-y-2">
          <li>✓ HTML loaded</li>
          <li>✓ CSS loaded</li>
          <li>✓ JavaScript loaded</li>
          <li>✓ React rendering</li>
          <li>✓ Index page rendering</li>
        </ul>
      </div>

      <div className="mt-8 p-4 bg-destructive/10 rounded-lg border border-destructive">
        <p className="text-sm">If you see this message, the app is working! Check browser console (F12) for any errors.</p>
      </div>
    </div>
  );
}
