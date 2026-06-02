# SRP AI Labs — Software for Real Operations

> **5 Live Products** across HR, Recruitment & Growth, and Healthcare + custom workflow automation

**Website:** [srpailabs.com](https://srpailabs.com)  
**Contact:** info@srpailabs.com

---

## June 2026 Live Update

- Homepage now reflects the active go-to-market view: **5 live products**.
- Current homepage and industries focus is **3 core industries**: HR, Recruitment & Growth, Healthcare.
- `Wellora` is the nutrition product replacement (domain: `wellora.srpailabs.com`).
- Removed the recently added homepage image overlays per urgent request to keep sections clean.
- Removed mismatched page images from product/service/industry/technology modules.
- Fixed theme visibility issues so header, footer, logo, hero content, and theme toggle remain readable in both dark and light mode.
- Latest build and deployment were pushed to production (`srpailabs.com`).

---

## Live Product Ecosystem (5 Products)

### Enterprise Systems
| Product | Subdomain | Focus | Status |
|---|---|---|---|
| HRMS | [hrms.srpailabs.com](https://hrms.srpailabs.com) | Full Employee Lifecycle | **NEW** |
| SmartRecruit | [recruit.srpailabs.com](https://recruit.srpailabs.com) | ATS + Recruitment Pipeline | Live |

### Recruitment & Growth
| Product | Subdomain | Focus | Status |
|---|---|---|---|
| Growth OS | [growth.srpailabs.com](https://growth.srpailabs.com) | Recruitment + Sales Automation | Live |

### Industry Solutions
| Product | Subdomain | Focus | Status |
|---|---|---|---|
| MediFlow | [mediflow.srpailabs.com](https://mediflow.srpailabs.com) | Healthcare Management | Live |

### Consumer Apps
| Product | Subdomain | Focus | Status |
|---|---|---|---|
| Wellora | [wellora.srpailabs.com](https://wellora.srpailabs.com) | Nutrition Analysis | **NEW** |

> Each live product is a **fully independent system** — separate login, database, and deployment.
>
> **Key distinctions:**
> - **SmartRecruit** = Pure ATS + hiring system only
> - **HRMS** = Full employee lifecycle (onboarding → payroll → retirement)
> - **Growth OS** = Recruitment pipeline + Sales automation combined

---

## This Repository

Main brand hub + platform landing page (`srpailabs.com`). Each product lives in its own repository on its own subdomain.

---

## What's on srpailabs.com

- **Hero** — "Modern Systems. Real Outcomes." with live-system positioning
- **Product Tags** — HRMS · SmartRecruit · Growth OS · MediFlow · Wellora
- **Trust Signals** — Founder-led delivery, fast implementation, enterprise security, transparent pricing
- **Platform Overview** — One Platform. Five Live Systems. Independent infrastructure.
- **Custom Automation Section** — Workflow automation + agents + dashboards + CRM builds
- **Products Section** — 3-column grid with category badges, streamlined cards
- **Product Ecosystem** — Independent deployment model
- **Industries** — Human Resources, Recruitment & Growth, Healthcare
- **Pricing** — Per-product pricing with custom automation tiers
- **Sales Chatbot (SRPA)** — Solutions advisor with routing logic, cross-sell, lead capture
- **App Switcher** — Category-grouped product switcher (bottom drawer mobile / floating panel desktop)

---

## Product Config (Single Source of Truth)

All product data is in [`src/config/products.ts`](src/config/products.ts) with live filtering logic.  
This drives **every** part of the site automatically:

- Hero pills · Nav dropdown (categorized) · Mobile menu (categorized) · App Switcher (categorized)
- Product cards · Ecosystem grid · Platform overview · Pricing section · Footer
- Chatbot (SRPA) knowledge base

**To add a new live product:** update `allProducts` and the live list in `products.ts` — UI sections auto-update.

```ts
products.ts exports:
  - allProducts[]      — full internal catalog
  - products[]         — live products only
  - hiddenProducts[]   — non-live products
  - PRODUCT_COUNT      — total live product count
```

---

## Tech Stack

### Frontend (srpailabs.com)
- **React + Vite** (TypeScript)
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** — animations
- **OpenAI GPT-4.1-mini** — SRPA chatbot

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
  -d mediflow.srpailabs.com -d recruit.srpailabs.com \
  -d growth.srpailabs.com -d hrms.srpailabs.com \
  -d wellora.srpailabs.com
sudo nginx -t && sudo systemctl reload nginx
```

### Database

```sh
psql -U postgres -d srpailabs -f database/init.sql
```

Schemas: `auth` · `mediflow` · `recruit` · `growth` · `hrms` · `wellora`

---

## Security

- Credentials are in `.env` only — never committed to git
- `deploy.py` reads from environment variables — no hardcoded secrets
- Per-product isolated database schemas
- Multi-tenant isolation enforced at application + database level

---

## Mobile-First Responsive Design

- Hamburger menu with slide-over drawer + categorized expandable Products section
- Hero scales `text-4xl` (mobile) → `text-8xl` (desktop)
- Product grids: 1 col → 2 col → 3 col
- App Switcher: categorized bottom drawer (mobile) / floating panel (desktop)
- Touch-friendly throughout

---

## SEO Keywords

`HRMS Software` · `Recruitment Automation` · `Growth Automation` · `Healthcare Management System` · `Nutrition Intelligence` · `Business Automation` · `Workflow Automation` · `Custom Software Development`

---

© 2026 SRP AI Labs · [srpailabs.com](https://srpailabs.com)

---

## Changelog

### April 2026 — Homepage Hero Polish (v9.5)
- **Announcement bar** — Decluttered copy ("9 AI-Powered Products Live" instead of verbose text)
- **Headline** — Reduced font sizes by 5% + added `maxWidth: 95%` for tighter visual weight
- **Subheadline** — Increased text contrast from `0.72` → `0.82` opacity (+12%)
- **Right logo group** — Shifted upward by 24px for better vertical balance
- **Floating trust chips** — Aligned to clean invisible 3×2 grid (symmetric offsets)
- **Whitespace harmony** — Rebalanced hero padding, badge/chip margins for premium spacing
- **Nginx config** — Added all 10 product subdomain server blocks (ports 3001–3010)

---
