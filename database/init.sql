-- ============================================================
--  SRP AI Labs — Single PostgreSQL Instance Schema
--  Run:  psql -U postgres -d srpailabs -f init.sql
--  Or:   psql postgresql://user:pass@localhost/srpailabs -f init.sql
-- ============================================================

-- Create database (run as superuser if not already created)
-- CREATE DATABASE srpailabs;
-- \c srpailabs;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
--  SHARED AUTH SCHEMA
-- ============================================================
CREATE SCHEMA IF NOT EXISTS auth;

CREATE TABLE IF NOT EXISTS auth.users (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email         TEXT NOT NULL UNIQUE,
    password_hash TEXT,                         -- NULL if using OAuth only
    full_name     TEXT,
    avatar_url    TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ,
    is_active     BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS auth.oauth_providers (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider    TEXT NOT NULL,                  -- 'google', 'github', etc.
    provider_id TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (provider, provider_id)
);

CREATE TABLE IF NOT EXISTS auth.sessions (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,            -- SHA-256 of JWT jti
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Subscriptions / plan tracking
CREATE TABLE IF NOT EXISTS auth.subscriptions (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan       TEXT NOT NULL DEFAULT 'starter',  -- 'starter', 'growth', 'enterprise'
    status     TEXT NOT NULL DEFAULT 'active',   -- 'active', 'past_due', 'cancelled'
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ends_at    TIMESTAMPTZ,
    stripe_sub_id TEXT
);

-- App access (which products a user/plan can access)
CREATE TABLE IF NOT EXISTS auth.app_access (
    id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    app     TEXT NOT NULL,                      -- 'autonomous', 'marketing', 'mediflow', 'recruit'
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, app)
);

-- ============================================================
--  AUTONOMOUS OS SCHEMA
-- ============================================================
CREATE SCHEMA IF NOT EXISTS autonomous;

CREATE TABLE IF NOT EXISTS autonomous.workspaces (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name       TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS autonomous.tasks (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES autonomous.workspaces(id) ON DELETE CASCADE,
    title        TEXT NOT NULL,
    description  TEXT,
    status       TEXT NOT NULL DEFAULT 'pending', -- 'pending','running','completed','failed'
    ai_output    JSONB,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS autonomous.agents (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES autonomous.workspaces(id) ON DELETE CASCADE,
    name         TEXT NOT NULL,
    config       JSONB NOT NULL DEFAULT '{}',
    is_active    BOOLEAN NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
--  MARKETING OS SCHEMA
-- ============================================================
CREATE SCHEMA IF NOT EXISTS marketing;

CREATE TABLE IF NOT EXISTS marketing.campaigns (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    channel     TEXT NOT NULL,                  -- 'email', 'linkedin', 'twitter', 'instagram'
    status      TEXT NOT NULL DEFAULT 'draft',  -- 'draft','scheduled','running','completed'
    config      JSONB NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marketing.content (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES marketing.campaigns(id) ON DELETE SET NULL,
    user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type        TEXT NOT NULL,                  -- 'post', 'email', 'ad'
    body        TEXT NOT NULL,
    ai_metadata JSONB,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marketing.analytics (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES marketing.campaigns(id) ON DELETE CASCADE,
    metric      TEXT NOT NULL,                  -- 'impressions','clicks','conversions'
    value       NUMERIC NOT NULL DEFAULT 0,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
--  MEDIFLOW SCHEMA
-- ============================================================
CREATE SCHEMA IF NOT EXISTS mediflow;

CREATE TABLE IF NOT EXISTS mediflow.clinics (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name       TEXT NOT NULL,
    address    TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mediflow.patients (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id  UUID NOT NULL REFERENCES mediflow.clinics(id) ON DELETE CASCADE,
    full_name  TEXT NOT NULL,
    dob        DATE,
    contact    TEXT,
    notes      TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mediflow.appointments (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id     UUID NOT NULL REFERENCES mediflow.clinics(id) ON DELETE CASCADE,
    patient_id    UUID NOT NULL REFERENCES mediflow.patients(id) ON DELETE CASCADE,
    scheduled_at  TIMESTAMPTZ NOT NULL,
    status        TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled','completed','cancelled'
    notes         TEXT,
    ai_summary    TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mediflow.workflows (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id  UUID NOT NULL REFERENCES mediflow.clinics(id) ON DELETE CASCADE,
    name       TEXT NOT NULL,
    trigger    TEXT NOT NULL,                   -- 'appointment_booked', 'reminder', etc.
    actions    JSONB NOT NULL DEFAULT '[]',
    is_active  BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
--  SMARTRECRUIT SCHEMA
-- ============================================================
CREATE SCHEMA IF NOT EXISTS recruit;

CREATE TABLE IF NOT EXISTS recruit.companies (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name       TEXT NOT NULL,
    industry   TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recruit.jobs (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id   UUID NOT NULL REFERENCES recruit.companies(id) ON DELETE CASCADE,
    title        TEXT NOT NULL,
    description  TEXT,
    requirements TEXT,
    status       TEXT NOT NULL DEFAULT 'open',  -- 'open','closed','paused'
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recruit.candidates (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id      UUID NOT NULL REFERENCES recruit.jobs(id) ON DELETE CASCADE,
    full_name   TEXT NOT NULL,
    email       TEXT NOT NULL,
    resume_url  TEXT,
    ai_score    NUMERIC,                        -- AI-generated fit score 0–100
    ai_summary  TEXT,
    status      TEXT NOT NULL DEFAULT 'applied', -- 'applied','screening','interview','offer','rejected'
    applied_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recruit.interviews (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID NOT NULL REFERENCES recruit.candidates(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMPTZ NOT NULL,
    interviewer  TEXT,
    notes        TEXT,
    ai_feedback  TEXT,
    outcome      TEXT,                          -- 'pass','fail','pending'
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
--  INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_sessions_user     ON auth.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires  ON auth.sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_app_access_user   ON auth.app_access(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_workspace   ON autonomous.tasks(workspace_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_user    ON marketing.campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_candidates_job    ON recruit.candidates(job_id);
CREATE INDEX IF NOT EXISTS idx_appointments_clinic ON mediflow.appointments(clinic_id);

-- ============================================================
--  UPDATED_AT TRIGGER (shared helper)
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
    CREATE TRIGGER trg_users_updated_at
        BEFORE UPDATE ON auth.users
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TRIGGER trg_tasks_updated_at
        BEFORE UPDATE ON autonomous.tasks
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TRIGGER trg_campaigns_updated_at
        BEFORE UPDATE ON marketing.campaigns
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TRIGGER trg_jobs_updated_at
        BEFORE UPDATE ON recruit.jobs
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TRIGGER trg_candidates_updated_at
        BEFORE UPDATE ON recruit.candidates
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
