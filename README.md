# SRP AI Labs — Platform Website

> Part of the **SRP AI Labs Platform** — a unified suite of 4 AI-powered SaaS products.

**Website:** [srpailabs.com](https://srpailabs.com)  
**Contact:** info@srpailabs.com

---

## Platform Products

| Product | Subdomain | Status |
|---|---|---|
| Autonomous OS | [autonomous.srpailabs.com](https://autonomous.srpailabs.com) | Live |
| Marketing OS | [app.srpailabs.com](https://app.srpailabs.com) | Live |
| MediFlow | [mediflow.srpailabs.com](https://mediflow.srpailabs.com) | Beta |
| SmartRecruit | [recruit.srpailabs.com](https://recruit.srpailabs.com) | Live |

---

## This Repository

This repo contains the **main marketing + platform landing page** (`srpailabs.com`). Each product above lives in its own separate repository and runs on its own subdomain.

---

## Tech Stack

- **React + Vite** (TypeScript)
- **Tailwind CSS** + shadcn/ui components
- **OpenAI gpt-4o-mini** (chatbot)
- **Telegram Bot** (contact form notifications)
- **Nginx** — reverse proxy for all subdomains (see `nginx/srpailabs.conf`)
- **PostgreSQL** — single shared instance with per-product schemas (see `database/init.sql`)

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

See `nginx/srpailabs.conf` for the full reverse-proxy config covering all 5 domains (main + 4 subdomains) with SSL via Let's Encrypt.

Deploy steps on Hetzner:
```sh
sudo cp nginx/srpailabs.conf /etc/nginx/sites-available/srpailabs.conf
sudo ln -s /etc/nginx/sites-available/srpailabs.conf /etc/nginx/sites-enabled/
sudo certbot --nginx -d srpailabs.com -d www.srpailabs.com \
             -d autonomous.srpailabs.com -d app.srpailabs.com \
             -d mediflow.srpailabs.com -d recruit.srpailabs.com
sudo nginx -t && sudo systemctl reload nginx
```

### PostgreSQL

See `database/init.sql` for the full schema — shared instance with separate schemas per product:
- `auth` — shared users, sessions, subscriptions, app-access
- `autonomous` — Autonomous OS workspaces, tasks, agents
- `marketing` — Marketing OS campaigns, content, analytics
- `mediflow` — MediFlow clinics, patients, appointments, workflows
- `recruit` — SmartRecruit companies, jobs, candidates, interviews

```sh
psql -U postgres -d srpailabs -f database/init.sql
```
