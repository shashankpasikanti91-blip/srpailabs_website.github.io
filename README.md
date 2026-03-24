# SRP AI Labs — Platform Website

> **AI Business Operating System Company** — building AI-powered SaaS products, n8n workflow automation, AI agents, and industry-specific business systems.

**Website:** [srpailabs.com](https://srpailabs.com)  
**Contact:** info@srpailabs.com

---

## Platform Products

| Product | Subdomain | Industry | Status |
|---|---|---|---|
| Autonomous Business Platform | [autonomous.srpailabs.com](https://autonomous.srpailabs.com) | Multi-industry / Enterprise | Live |
| Marketing OS | [app.srpailabs.com](https://app.srpailabs.com) | Marketing / Agencies | Live |
| MediFlow (Healthcare OS) | [mediflow.srpailabs.com](https://mediflow.srpailabs.com) | Hospitals / Healthcare | Live |
| SmartRecruit (HR/Recruitment OS) | [recruit.srpailabs.com](https://recruit.srpailabs.com) | Recruitment / HR | Live |
| Growth | [growth.srpailabs.com](https://growth.srpailabs.com) | Business Growth / Lead-Gen / Operations | Live |

> Each product is a **fully independent system** — separate login, database, and deployment. This is intentional for security, performance, and product clarity.

---

## This Repository

This repo contains the **main brand hub + platform landing page** (`srpailabs.com`). Each product above lives in its own separate repository and runs on its own subdomain. This site acts as the central entry point that routes users to the correct product.

---

## What's on srpailabs.com

- **Hero** — AI automation + agentic AI brand statement (fully responsive)
- **About SRP AI Labs** — Company overview as an AI Business Operating System Company
- **Solutions / Services** — n8n automation, AI agents, RAG chatbots, integrations, multi-tenant SaaS
- **Products Section** — Premium cards for all 5 products with descriptions, features, and direct links
- **Product Ecosystem** — Explains the independent deployment model (separate logins, isolated databases)
- **Industries** — Healthcare, Recruitment, Marketing, Enterprise, SMEs, Startups
- **Why SRP AI Labs** — AI-first, scalable, industry-specific, automation-driven, secure
- **Pricing** — Flexible plans (Starter / Growth / Enterprise) with feature comparison table
- **Contact / Demo** — Lead capture form + Telegram notification + social links
- **AI Chatbot (SRPA)** — Routes users to correct product based on their industry/use case (5 products)
- **App Switcher** — Floating product switcher widget (bottom drawer on mobile, panel on desktop)

### Mobile-First Responsive Design (v2.0)

The entire site is built with a mobile-first responsive approach:

- **Hamburger menu** on mobile with slide-over drawer, expandable Products section, and smooth animations
- **Hero section** scales typography from `text-3xl` (mobile) → `text-7xl` (desktop), buttons stack vertically on small screens
- **All sections** use responsive padding (`py-14 sm:py-20 md:py-24 lg:py-28`) and container padding (`px-4 sm:px-6`)
- **Product grids** adapt: single column on mobile → 2 columns on tablet → 3 columns on desktop
- **App Switcher** opens as a bottom sheet drawer on mobile, floating panel on desktop
- **Chat Widget** repositioned and resized for mobile screens
- **Pricing cards** stack vertically on mobile with full-width CTA buttons
- **No horizontal overflow** — overflow-x hidden globally
- **Touch-friendly** spacing and tap targets throughout

---

## Tech Stack

### Frontend (this repo — srpailabs.com)
- **React + Vite** (TypeScript)
- **Tailwind CSS** + shadcn/ui components
- **Framer Motion** — animations
- **OpenAI GPT-4o** — SRPA chatbot assistant
- **Telegram Bot** — contact form notifications

### Backend / Products
- **Python + FastAPI** — AI backend services for all products
- **Pydantic** — data validation & schemas
- **Fire** — CLI tooling
- **Supabase** — database, auth, and realtime per product
- **PostgreSQL** — per-product schemas (see `database/init.sql`)

### AI Models
- **OpenAI GPT-4o** — completions, agents, embeddings
- **Claude (Anthropic)** — advanced AI reasoning
- **Gemini** — Google AI models

### Agentic AI & Automation
- **n8n** — core workflow automation platform
- **LangChain / LangGraph** — agentic AI pipelines
- **Cursor + VS Code** — agentic AI-assisted development
- **RAG Pipelines** — Pinecone + embeddings
- **Apify** — web scraping & data extraction

### Infrastructure
- **Nginx** — reverse proxy for all subdomains (see `nginx/srpailabs.conf`)
- **Hetzner VPS** — production server
- **Let's Encrypt** — SSL for all 6 domains

---

## Local Development

### 1. Install dependencies
```sh
npm install
```

### 2. Set up environment variables
```sh
cp .env.example .env
# Fill in your keys in .env
```

### 3. Run dev server
```sh
npm run dev
# Opens at http://localhost:8080
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_OPENAI_API_KEY` | OpenAI API key for chatbot |
| `VITE_TELEGRAM_BOT_TOKEN` | Telegram bot token for form notifications |
| `VITE_TELEGRAM_CHAT_ID` | Telegram chat ID to receive notifications |

> **Security:** Never commit `.env` to git. It is listed in `.gitignore`.

---

## Build for Production

```sh
npm run build
# Output in /dist — upload to Hetzner VPS /var/www/srpailabs/dist
```

---

## Infrastructure

### Nginx

See `nginx/srpailabs.conf` for the full reverse-proxy config covering all 6 domains (main + 5 subdomains) with SSL via Let's Encrypt.

Deploy steps on Hetzner:
```sh
sudo cp nginx/srpailabs.conf /etc/nginx/sites-available/srpailabs.conf
sudo ln -s /etc/nginx/sites-available/srpailabs.conf /etc/nginx/sites-enabled/
sudo certbot --nginx -d srpailabs.com -d www.srpailabs.com \
             -d autonomous.srpailabs.com -d app.srpailabs.com \
             -d mediflow.srpailabs.com -d recruit.srpailabs.com \
             -d growth.srpailabs.com
sudo nginx -t && sudo systemctl reload nginx
```

### PostgreSQL

See `database/init.sql` for the full schema — shared instance with separate schemas per product:
- `auth` — shared users, sessions, subscriptions, app-access
- `autonomous` — Autonomous OS workspaces, tasks, agents
- `marketing` — Marketing OS campaigns, content, analytics
- `mediflow` — MediFlow clinics, patients, appointments, workflows
- `recruit` — SmartRecruit companies, jobs, candidates, interviews
- `growth` — Growth leads, pipelines, outreach sequences, analytics

```sh
psql -U postgres -d srpailabs -f database/init.sql
```
