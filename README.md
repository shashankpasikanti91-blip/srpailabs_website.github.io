# SRP AI Labs — AI Ecosystem for Business, Enterprise & Consumers

> **Unified AI Ecosystem** — 10 AI Products (Enterprise + Industry + Consumer) + Custom Automation (n8n + AI)

**Website:** [srpailabs.com](https://srpailabs.com)  
**Contact:** info@srpailabs.com

---

## Product Ecosystem (10 AI Products)

### AI Business Platforms
| Product | Subdomain | Focus | Status |
|---|---|---|---|
| Autonomous OS | [autonomous.srpailabs.com](https://autonomous.srpailabs.com) | AI Business App Generator | Live |
| Automation OS | [automation.srpailabs.com](https://automation.srpailabs.com) | CRM / Revenue Automation | New |

### Enterprise Systems
| Product | Subdomain | Focus | Status |
|---|---|---|---|
| HRMS | [hrms.srpailabs.com](https://hrms.srpailabs.com) | AI-Native HRMS (Hiring to Retirement) | **NEW** |
| SmartRecruit | [recruit.srpailabs.com](https://recruit.srpailabs.com) | ATS + Recruitment Pipeline | Live |

### Growth & Revenue Systems
| Product | Subdomain | Focus | Status |
|---|---|---|---|
| Growth OS | [growth.srpailabs.com](https://growth.srpailabs.com) | Recruitment + Sales Automation | Live |
| Marketing OS | [app.srpailabs.com](https://app.srpailabs.com) | AI Marketing Automation | Live |

### Industry Solutions
| Product | Subdomain | Focus | Status |
|---|---|---|---|
| MediFlow | [mediflow.srpailabs.com](https://mediflow.srpailabs.com) | Healthcare Workflow AI | Live |
| SRP Education AI | [edu.srpailabs.com](https://edu.srpailabs.com) | Student Success & Institutional Intelligence | **NEW** |

### Consumer AI Apps
| Product | Subdomain | Focus | Status |
|---|---|---|---|
| NutriSutra | [nutrisutra.srpailabs.com](https://nutrisutra.srpailabs.com) | AI Nutrition Analysis | **NEW** |
| SRP Kids | [kids.srpailabs.com](https://kids.srpailabs.com) | AI Learning App for Kids | Coming Soon |

> Each product is a **fully independent system** — separate login, database, and deployment.
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

- **Hero** — "AI Ecosystem for Business, Enterprise & Consumers" (10 products + custom automation)
- **Product Tags** — HRMS OS · Recruitment AI · Sales Automation · Healthcare AI · Education AI · Nutri AI · Kids AI
- **Get Started** — 4-step onboarding: Choose Product → Sign Up → Custom Automation → Book Demo
- **Platform Overview** — One Ecosystem. Ten AI Systems. Categorized by type.
- **Custom Automation Section** — n8n + AI agents + CRM + multi-tenant SaaS builds
- **Products Section** — 10 product cards with category groupings, NEW/SOON badges
- **Product Ecosystem** — Independent deployment model explained
- **Industries** — Healthcare, Education, HRMS, Recruitment, Marketing, Sales, Nutrition, Kids
- **Pricing** — Flexible per-product pricing
- **AI Chatbot (SRPA)** — Updated with all 10 products, clear routing logic, key distinctions
- **App Switcher** — Category-grouped product switcher (bottom drawer mobile / panel desktop)

---

## Product Config (Single Source of Truth)

All 10 products are in [`src/config/products.ts`](src/config/products.ts) with categories.  
This drives **every** part of the site automatically:

- Hero pills · Nav dropdown (categorized) · Mobile menu (categorized) · App Switcher (categorized)
- Product cards · Ecosystem grid · Platform overview · Pricing section · Footer
- Chatbot (SRPA) knowledge base

**To add an 11th product:** update `products.ts` only — everything else auto-updates.

```ts
products.ts exports:
  - products[]         — all 10 products
  - productsByCategory — grouped by category
  - PRODUCT_COUNT      — count of non-coming-soon products (9)
  - PRODUCT_CATEGORIES — list of 5 category names
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
  -d autonomous.srpailabs.com -d app.srpailabs.com \
  -d mediflow.srpailabs.com -d recruit.srpailabs.com \
  -d growth.srpailabs.com -d automation.srpailabs.com \
  -d hrms.srpailabs.com -d nutrisutra.srpailabs.com \
  -d edu.srpailabs.com -d kids.srpailabs.com
sudo nginx -t && sudo systemctl reload nginx
```

### Database

```sh
psql -U postgres -d srpailabs -f database/init.sql
```

Schemas: `auth` · `autonomous` · `marketing` · `mediflow` · `recruit` · `growth` · `automation` · `hrms` · `nutrisutra` · `edu` · `kids`

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

`AI HRMS Software` · `Recruitment Automation Platform` · `Sales Automation AI` · `Healthcare AI System` · `AI Education Platform` · `AI Nutrition App` · `AI Kids Learning App` · `AI Business Automation` · `n8n Workflow Automation`

---

© 2026 SRP AI Labs · [srpailabs.com](https://srpailabs.com)

---

## This Repository

This repo contains the **main brand hub + platform landing page** (`srpailabs.com`). Each product lives in its own separate repository on its own subdomain. This site routes users to the correct product.

---

## What's on srpailabs.com

- **Hero** — AI Business Automation Platform (10 products + custom automation)
- **Get Started** — 4-step onboarding: Choose Product → Sign Up → Custom Automation → Book Demo
- **Platform Positioning** — One Platform. Multiple AI Systems.
- **Custom Automation Section** — n8n + AI agents + CRM + multi-tenant SaaS builds
- **Products Section** — 10 product cards with Open Product + View Pricing CTAs
- **Product Ecosystem** — Independent deployment model explained
- **Industries** — Healthcare, Education, Recruitment, Marketing, Enterprise, SMEs, Startups
- **Pricing** — Flexible per-product pricing
- **Need Help Choosing** — AI Chat, Book Demo, Contact Team
- **Contact / Demo** — Lead capture form + Telegram notification
- **AI Chatbot (SRPA)** — Routes by industry, handles pricing, guides to correct product
- **App Switcher** — Floating product switcher (bottom drawer mobile / panel desktop)

---

## Product Config (Single Source of Truth)

All 10 products are defined in [`src/config/products.ts`](src/config/products.ts).  
This drives **every** part of the site — no hardcoded product lists anywhere:

- Hero pills · Nav dropdown · Mobile menu · App Switcher
- Product cards · Ecosystem grid · Pricing section · Footer
- Chatbot knowledge base

**To add an 11th product:** update `products.ts` only — everything else auto-updates.

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
