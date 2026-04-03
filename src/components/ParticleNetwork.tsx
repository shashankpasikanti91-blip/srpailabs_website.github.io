import { useEffect, useRef, useCallback } from "react";

/* ─── types ─── */
interface Particle {
  x: number;
  y: number;
  z: number;           // depth layer 0‑1 (0 = far, 1 = near)
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Nebula {
  x: number;
  y: number;
  rx: number;
  ry: number;
  color: string;
  phase: number;
  speed: number;
}

/* ─── component ─── */
export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<{ x: number; y: number; r: number; o: number; s: number }[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dimRef = useRef({ w: 0, h: 0 });
  const mouseSmooth = useRef({ x: -9999, y: -9999 });
  const isDarkRef = useRef(true);

  /* ── constants ── */
  const COLORS_DARK = [
    "180,130,255",
    "140,180,255",
    "80,220,255",
    "230,100,200",
    "110,160,255",
    "200,160,255",
  ];

  const COLORS_LIGHT = [
    "120,60,200",
    "60,100,200",
    "20,160,210",
    "180,50,150",
    "70,110,210",
    "140,80,200",
  ];

  const CONNECTION_DIST = 160;
  const MOUSE_DIST = 250;

  /* ── initialise particles ── */
  const initParticles = useCallback(() => {
    const { w, h } = dimRef.current;
    const area = w * h;
    const COLORS = isDarkRef.current ? COLORS_DARK : COLORS_LIGHT;
    const count = Math.min(Math.floor(area * 0.00016), 220);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const z = Math.random();
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z,
        vx: (Math.random() - 0.5) * 0.35 * (0.5 + z * 0.5),
        vy: (Math.random() - 0.5) * 0.35 * (0.5 + z * 0.5),
        radius: (Math.random() * 1.6 + 0.5) * (0.4 + z * 0.6),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        baseOpacity: (Math.random() * 0.4 + 0.25) * (0.3 + z * 0.7),
        twinkleSpeed: Math.random() * 0.002 + 0.001,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  /* ── initialise background star field ── */
  const initStars = useCallback(() => {
    const { w, h } = dimRef.current;
    const count = Math.min(Math.floor(w * h * 0.0003), 400);
    const stars: typeof starsRef.current = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 0.8 + 0.2,
        o: Math.random() * 0.5 + 0.1,
        s: Math.random() * 0.003 + 0.0005,
      });
    }
    starsRef.current = stars;
  }, []);

  /* ── initialise nebula clouds ── */
  const initNebulae = useCallback(() => {
    const { w, h } = dimRef.current;
    const nebulae: Nebula[] = [
      { x: w * 0.75, y: h * 0.25, rx: w * 0.35, ry: h * 0.25, color: "120,60,200", phase: 0,     speed: 0.0003 },
      { x: w * 0.2,  y: h * 0.6,  rx: w * 0.3,  ry: h * 0.2,  color: "60,120,220",  phase: 1,     speed: 0.0004 },
      { x: w * 0.55, y: h * 0.8,  rx: w * 0.25, ry: h * 0.18, color: "200,80,180",   phase: 2.5,   speed: 0.00025 },
      { x: w * 0.9,  y: h * 0.55, rx: w * 0.2,  ry: h * 0.22, color: "40,180,240",   phase: 3.8,   speed: 0.00035 },
    ];
    nebulaeRef.current = nebulae;
  }, []);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d", { alpha: true });
    if (!ctx) return;

    /* ── resize ── */
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = cvs!.getBoundingClientRect();
      dimRef.current = { w: rect.width, h: rect.height };
      cvs!.width = rect.width * dpr;
      cvs!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      initStars();
      initNebulae();
    }

    /* ── draw nebula clouds (soft radial blurs) ── */
    function drawNebulae(t: number) {
      const nebulae = nebulaeRef.current;
      for (const n of nebulae) {
        const breathe = 1 + Math.sin(t * n.speed + n.phase) * 0.12;
        const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(n.rx, n.ry) * breathe);
        grad.addColorStop(0, `rgba(${n.color}, 0.06)`);
        grad.addColorStop(0.4, `rgba(${n.color}, 0.03)`);
        grad.addColorStop(1, `rgba(${n.color}, 0)`);
        ctx!.save();
        ctx!.translate(n.x, n.y);
        ctx!.scale(n.rx / Math.max(n.rx, n.ry), n.ry / Math.max(n.rx, n.ry));
        ctx!.translate(-n.x, -n.y);
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, Math.max(n.rx, n.ry) * breathe, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    /* ── draw static star field ── */
    function drawStars(t: number) {
      const stars = starsRef.current;
      const dark = isDarkRef.current;
      for (const s of stars) {
        const twinkle = Math.sin(t * s.s + s.x) * 0.3;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = dark
          ? `rgba(200,210,255,${Math.max(0, s.o + twinkle)})`
          : `rgba(100,80,180,${Math.max(0, (s.o + twinkle) * 0.6)})`;
        ctx!.fill();
      }
    }

    /* ── draw flowing waves ── */
    function drawWaves(t: number) {
      const { w, h } = dimRef.current;

      // Filled wave — purple→cyan gradient
      ctx!.beginPath();
      ctx!.moveTo(0, h);
      for (let x = 0; x <= w; x += 3) {
        const y = h - 55
          + Math.sin(x * 0.003 + t * 0.0008) * 22
          + Math.sin(x * 0.006 + t * 0.0005) * 14
          + Math.sin(x * 0.0015 + t * 0.001) * 18;
        ctx!.lineTo(x, y);
      }
      ctx!.lineTo(w, h);
      ctx!.closePath();
      const wg = ctx!.createLinearGradient(0, h - 90, w, h);
      wg.addColorStop(0, "rgba(160,80,220,0.07)");
      wg.addColorStop(0.5, "rgba(100,80,255,0.05)");
      wg.addColorStop(1, "rgba(60,200,255,0.03)");
      ctx!.fillStyle = wg;
      ctx!.fill();

      // Accent stroke 1 — cyan
      ctx!.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = h - 45 + Math.sin(x * 0.004 + t * 0.001) * 16 + Math.sin(x * 0.007 + t * 0.0006) * 9;
        x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = "rgba(100,200,255,0.1)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // Accent stroke 2 — purple
      ctx!.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = h - 65 + Math.sin(x * 0.002 + t * 0.0007 + 2) * 20 + Math.sin(x * 0.005 + t * 0.0004) * 11;
        x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = "rgba(180,100,255,0.08)";
      ctx!.lineWidth = 0.8;
      ctx!.stroke();
    }

    /* ── main loop ── */
    function animate(t: number) {
      const { w, h } = dimRef.current;
      ctx!.clearRect(0, 0, w, h);

      // Smooth mouse for elegant interaction
      mouseSmooth.current.x += (mouseRef.current.x - mouseSmooth.current.x) * 0.08;
      mouseSmooth.current.y += (mouseRef.current.y - mouseSmooth.current.y) * 0.08;
      const mx = mouseSmooth.current.x;
      const my = mouseSmooth.current.y;

      /* layer 1: nebula clouds (furthest back) */
      drawNebulae(t);

      /* layer 2: star field */
      drawStars(t);

      /* layer 3: particle network */
      const particles = particlesRef.current;

      // Pre-calc mouse glow spot
      const mouseActive = mx > -5000;
      if (mouseActive) {
        const mg = ctx!.createRadialGradient(mx, my, 0, mx, my, MOUSE_DIST);
        mg.addColorStop(0, "rgba(160,120,255,0.06)");
        mg.addColorStop(0.5, "rgba(80,180,255,0.03)");
        mg.addColorStop(1, "rgba(80,180,255,0)");
        ctx!.fillStyle = mg;
        ctx!.beginPath();
        ctx!.arc(mx, my, MOUSE_DIST, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Mouse attraction (gentle pull toward cursor)
        const dxM = p.x - mx;
        const dyM = p.y - my;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (mouseActive && distM < MOUSE_DIST && distM > 1) {
          const force = (MOUSE_DIST - distM) / MOUSE_DIST * 0.012;
          // Gentle push away
          p.vx += (dxM / distM) * force;
          p.vy += (dyM / distM) * force;
        }

        p.vx *= 0.997;
        p.vy *= 0.997;

        // Twinkle
        const twinkle = Math.sin(t * p.twinkleSpeed + p.twinkleOffset) * 0.2;
        const opacity = Math.max(0, p.baseOpacity + twinkle);

        // Glow for all particles (depth based)
        const glowR = p.radius * (2.5 + p.z * 3);
        if (glowR > 2) {
          const gg = ctx!.createRadialGradient(p.x, p.y, p.radius * 0.3, p.x, p.y, glowR);
          gg.addColorStop(0, `rgba(${p.color},${opacity * 0.35})`);
          gg.addColorStop(1, `rgba(${p.color},0)`);
          ctx!.fillStyle = gg;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx!.fill();
        }

        // Core dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color},${opacity})`;
        ctx!.fill();

        // Connections to nearby particles
        const connDist = CONNECTION_DIST * (0.7 + p.z * 0.3);
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = dx * dx + dy * dy; // skip sqrt for speed
          const maxD = connDist * connDist;
          if (dist < maxD) {
            const ratio = 1 - Math.sqrt(dist) / connDist;
            const alpha = ratio * 0.18 * ((p.z + q.z) * 0.5); // deeper = dimmer
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `rgba(${p.color},${alpha})`;
            ctx!.lineWidth = ratio * 0.8;
            ctx!.stroke();
          }
        }

        // Mouse connections — bright gradient lines
        if (mouseActive && distM < MOUSE_DIST) {
          const ratio = 1 - distM / MOUSE_DIST;
          const alpha = ratio * 0.4;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mx, my);
          ctx!.strokeStyle = `rgba(170,150,255,${alpha})`;
          ctx!.lineWidth = ratio * 1.2;
          ctx!.stroke();
        }
      }

      /* layer 4: flowing waves */
      drawWaves(t);

      animRef.current = requestAnimationFrame(animate);
    }

    /* ── events ── */
    function onMouse(e: MouseEvent) {
      const rect = cvs!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onTouchMove(e: TouchEvent) {
      const rect = cvs!.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    function onLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    window.addEventListener("resize", resize);
    cvs.addEventListener("mousemove", onMouse);
    cvs.addEventListener("touchmove", onTouchMove, { passive: true });
    cvs.addEventListener("mouseleave", onLeave);

    // Watch for theme changes on <html> class
    const observer = new MutationObserver(() => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
      initParticles(); // re-create with new colors
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    isDarkRef.current = document.documentElement.classList.contains("dark");
    resize();
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cvs.removeEventListener("mousemove", onMouse);
      cvs.removeEventListener("touchmove", onTouchMove);
      cvs.removeEventListener("mouseleave", onLeave);
    };
  }, [initParticles, initStars, initNebulae]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "auto" }}
    />
  );
}
