# SRP AI Labs — AI Business Automation Platform

> **AI Business Automation Platform** — 6 AI SaaS Products + Custom Automation (n8n + AI) + Industry-specific systems

**Website:** [srpailabs.com](https://srpailabs.com)  
**Contact:** info@srpailabs.com

---

## Platform Products (6 Live)

| Product | Subdomain | Industry | Status |
|---|---|---|---|
| Autonomous OS | [autonomous.srpailabs.com](https://autonomous.srpailabs.com) | Multi-industry / Enterprise | Live |
| Marketing OS | [app.srpailabs.com](https://app.srpailabs.com) | Marketing / Agencies | Live |
| MediFlow | [mediflow.srpailabs.com](https://mediflow.srpailabs.com) | Hospitals / Healthcare | Live |
| SmartRecruit | [recruit.srpailabs.com](https://recruit.srpailabs.com) | Recruitment / HR | Live |
| Growth OS | [growth.srpailabs.com](https://growth.srpailabs.com) | Sales / Lead-Gen | Live |
| Automation OS | [automation.srpailabs.com](https://automation.srpailabs.com) | CRM / Revenue Automation | New |

> Each product is a **fully independent system** — separate login, database, and deployment. Intentional for security, performance, and product clarity.

---

## This Repository

This repo contains the **main brand hub + platform landing page** (`srpailabs.com`). Each product lives in its own separate repository on its own subdomain. This site routes users to the correct product.

---

## What's on srpailabs.com

- **Hero** — AI Business Automation Platform (6 products + custom automation)
- **Get Started** — 4-step onboarding: Choose Product → Sign Up → Custom Automation → Book Demo
- **Platform Positioning** — One Platform. Multiple AI Systems.
- **Custom Automation Section** — n8n + AI agents + CRM + multi-tenant SaaS builds
- **Products Section** — 6 product cards with Open Product + View Pricing CTAs
- **Product Ecosystem** — Independent deployment model explained
- **Industries** — Healthcare, Recruitment, Marketing, Enterprise, SMEs, Startups
- **Pricing** — Flexible per-product pricing (no confusing $19/$49 tiers)
- **Need Help Choosing** — AI Chat, Book Demo, Contact Team
- **Contact / Demo** — Lead capture form + Telegram notification
- **AI Chatbot (SRPA)** — Routes by industry, handles pricing, guides to correct product
- **App Switcher** — Floating product switcher (bottom drawer mobile / panel desktop)

---

## Product Config (Single Source of Truth)

All 6 products are defined in [`src/config/products.ts`](src/config/products.ts).  
This drives **every** part of the site — no hardcoded product lists anywhere:

- Hero pills · Nav dropdown · Mobile menu · App Switcher
- Product cards · Ecosystem grid · Pricing section · Footer
- Chatbot knowledge base

**To add a 7th product:** update `products.ts` only — everything else auto-updates.

---

## Tech Stack

### Frontend (srpailabs.com)
- **React + Vite** (TypeScript)
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** — animations
- **OpenAI GPT-4o-mini** — SRPA chatbot

### AI & Automation
- **n8n** — workflow automation
- **OpenAI GPT-4o** / **Claude** / **Gemini** — AI models
- **LangChain / LangGraph** — agentic pipelines
- **RAG Pipelines** — Pinecone + embeddings
- **Apify** — web scraping

### Backend / Products
- **Python + FastAPI** + **Pydantic** — AI backend services
- **Supabase** + **PostgreSQL** — per-product isolated schemas

### Infrastructure
- **Nginx** — reverse proxy for all subdomains
- **Hetzner VPS** — production server
- **Let's Encrypt** — SSL

---

## Local Development

```sh
npm install
cp .env.example .env   # fill in API keys
npm run dev            # http://localhost:8080
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_OPENAI_API_KEY` | OpenAI API key for SRPA chatbot |
| `VITE_TELEGRAM_BOT_TOKEN` | Telegram bot token for form notifications |
| `VITE_TELEGRAM_CHAT_ID` | Telegram chat ID to receive notifications |

> **Security:** Never commit `.env` to git.

---

## Build & Deployment

```sh
# Build
npm run build

# Deploy to Hetzner (credentials via env vars — never hardcode)
export DEPLOY_HOST="<server-ip>"
export DEPLOY_USER="root"
export DEPLOY_PASSWORD="<password>"
python deploy.py
```

### Nginx + SSL

```sh
sudo cp nginx/srpailabs.conf /etc/nginx/sites-available/srpailabs.conf
sudo ln -s /etc/nginx/sites-available/srpailabs.conf /etc/nginx/sites-enabled/
sudo certbot --nginx \
  -d srpailabs.com -d www.srpailabs.com \
  -d autonomous.srpailabs.com -d app.srpailabs.com \
  -d mediflow.srpailabs.com -d recruit.srpailabs.com \
  -d growth.srpailabs.com -d automation.srpailabs.com
sudo nginx -t && sudo systemctl reload nginx
```

### Database

```sh
psql -U postgres -d srpailabs -f database/init.sql
```

Schemas: `auth` · `autonomous` · `marketing` · `mediflow` · `recruit` · `growth` · `automation`

---

## Security

- Credentials are in `.env` only — never committed to git
- `deploy.py` reads from environment variables — no hardcoded secrets
- Per-product isolated database schemas
- Multi-tenant isolation enforced at application + database level

---

## Mobile-First Responsive Design

- Hamburger menu with slide-over drawer + expandable Products section
- Hero scales `text-4xl` (mobile) → `text-8xl` (desktop)
- Product grids: 1 col → 2 col → 3 col
- App Switcher: bottom drawer (mobile) / floating panel (desktop)
- Touch-friendly throughout

---

## Visual Design & UX

- **Interactive particle constellation** — Canvas-based particle network hero background with mouse/touch interaction, connection lines, nebula clouds, star field, and flowing waves
- **Day/Night theme toggle** — Sun/Moon toggle in header (desktop + mobile) switches between dark space theme and clean light theme
- **SRP brand colors** — Purple→Magenta→Blue→Cyan gradient system matching the SRP logo across all elements
- **Enhanced hover effects** — All cards glow with purple border + shadow on hover, icons scale up, smooth transitions
- **Framer Motion animations** — Scroll-triggered fade-in, stagger, and parallax effects throughout
- **Responsive particle network** — Adapts density to viewport size, supports touch interaction on mobile

---

© 2026 SRP AI Labs · [srpailabs.com](https://srpailabs.com)
