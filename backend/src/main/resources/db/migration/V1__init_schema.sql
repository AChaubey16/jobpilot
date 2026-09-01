-- JobPilot Core Schema Migration V1

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER' NOT NULL,
    provider VARCHAR(50) DEFAULT 'LOCAL' NOT NULL,
    provider_id VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    current_company VARCHAR(255),
    current_role VARCHAR(255),
    experience_years INT DEFAULT 0,
    notice_period_days INT DEFAULT 30,
    current_ctc VARCHAR(100),
    expected_ctc VARCHAR(100),
    education TEXT,
    skills TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE companies (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    website VARCHAR(255),
    career_url VARCHAR(255) NOT NULL,
    ats_type VARCHAR(50) DEFAULT 'CUSTOM' NOT NULL,
    logo_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE jobs (
    id VARCHAR(36) PRIMARY KEY,
    company_id VARCHAR(36) REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    experience_req VARCHAR(100),
    posting_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description TEXT,
    application_url VARCHAR(1024) NOT NULL UNIQUE,
    employment_type VARCHAR(100) DEFAULT 'FULL_TIME',
    salary_range VARCHAR(100),
    skills TEXT,
    ats_type VARCHAR(50) DEFAULT 'CUSTOM' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE resumes (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(512) NOT NULL,
    keywords TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE applications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    job_id VARCHAR(36) REFERENCES jobs(id) ON DELETE CASCADE,
    resume_id VARCHAR(36) REFERENCES resumes(id),
    status VARCHAR(50) DEFAULT 'DISCOVERED' NOT NULL,
    match_score INT DEFAULT 0,
    match_reasons TEXT,
    screenshots TEXT,
    error_message TEXT,
    applied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE subscriptions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    plan VARCHAR(50) DEFAULT 'PREMIUM_ANNUAL' NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE' NOT NULL,
    gateway VARCHAR(50) NOT NULL,
    gateway_subscription_id VARCHAR(255),
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    subscription_id VARCHAR(36) REFERENCES subscriptions(id),
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR' NOT NULL,
    gateway VARCHAR(50) NOT NULL,
    gateway_payment_id VARCHAR(255),
    gateway_order_id VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    invoice_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE automation_jobs (
    id VARCHAR(36) PRIMARY KEY,
    application_id VARCHAR(36) REFERENCES applications(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    attempts INT DEFAULT 0,
    last_error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE automation_logs (
    id VARCHAR(36) PRIMARY KEY,
    automation_job_id VARCHAR(36) REFERENCES automation_jobs(id) ON DELETE CASCADE,
    log_level VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    screenshot_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    action VARCHAR(255) NOT NULL,
    details TEXT,
    ip_address VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE settings (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    min_exp INT DEFAULT 5,
    max_exp INT DEFAULT 8,
    locations TEXT DEFAULT 'Mumbai, Pune, Bengaluru, Hyderabad, Remote',
    max_posting_age_days INT DEFAULT 3,
    include_keywords TEXT DEFAULT 'Java, Spring Boot, Backend, Microservices, Kafka, Redis, Docker, AWS',
    exclude_keywords TEXT DEFAULT 'Frontend, Angular, React, Android, QA, Support, Internship, Contract, Freelance',
    auto_submit_enabled BOOLEAN DEFAULT FALSE,
    pause_before_submit BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_jobs_posting_date ON jobs(posting_date);
CREATE INDEX idx_applications_user_status ON applications(user_id, status);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);

-- Initial Super Admin Seed Data for First System Startup
INSERT INTO users (id, email, password_hash, full_name, role, provider, created_at, updated_at)
VALUES (
    'admin-root-001',
    'admin@jobpilot.io',
    '$2a$10$e8Kz...BCryptHashedPassword...',
    'System Administrator',
    'ROLE_ADMIN',
    'LOCAL',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

