# JobPilot - Production-Ready SaaS Platform for Software Engineers

JobPilot is a production-grade microservices SaaS platform that helps software engineers discover newly posted jobs from company career portals, calculate transparent match scores based on their profile, and automate multi-step job applications using Playwright browser automation with a human-in-the-loop pause-before-submit architecture.

---

## Service Architecture Overview

```
jobpilot/
├── frontend/             # React + Vite + Tailwind CSS + TypeScript dashboard
├── backend/              # Spring Boot 3 + Java 21 + PostgreSQL + Flyway + RabbitMQ
├── automation-service/   # Node.js + TypeScript + Playwright + 9 ATS Adapters
├── shared/               # Shared DTOs, TypeScript interfaces, and OpenAPI specs
├── docker-compose.yml    # Complete local & production multi-container orchestration
└── README.md
```

### Key Services

1. **Frontend (`frontend/`)**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide icons. Features Dashboard, Job Search, Kanban Applications, Resume Manager, ₹999/yr Subscription Checkout, Settings, and Admin Panel.
2. **Backend Main API (`backend/`)**: Spring Boot 3 on Java 21 with Spring Security, JWT, OAuth2, JPA/Hibernate, Flyway migrations, Redis caching, RabbitMQ message producer, and Swagger UI.
3. **Automation Service (`automation-service/`)**: Node.js microservice running Playwright headless/headed worker pools. Consumes jobs from RabbitMQ and runs ATS Adapters for Workday, Greenhouse, Lever, Ashby, Oracle, SAP SuccessFactors, SmartRecruiters, iCIMS, and generic custom forms.
4. **Shared Library (`shared/`)**: Common data transfer objects, RabbitMQ event contracts, and TypeScript types.

---

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Java 21 JDK & Maven (optional for manual backend builds)
- Node.js 20+ & npm

### Running the Entire Stack via Docker Compose

```bash
docker-compose up --build -d
```

Service URLs:
- **Frontend Dashboard**: `http://localhost:3000` (or `http://localhost:80`)
- **Spring Boot REST API**: `http://localhost:8080/api/v1`
- **Swagger API Docs**: `http://localhost:8080/swagger-ui.html`
- **RabbitMQ Management Dashboard**: `http://localhost:15672` (User: `jobpilot`, Pass: `jobpilot123`)
- **PostgreSQL Database**: `localhost:5432` (`jobpilot_db`)
