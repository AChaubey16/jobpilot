# JobPilot SaaS Deployment Guide

This guide describes how to deploy JobPilot on Kubernetes or AWS ECS with Docker containers.

## Production Requirements

1. **PostgreSQL**: Version 16+ (Amazon RDS / Cloud SQL) with automatic backups.
2. **Redis**: Cluster mode enabled for session cache and job lock synchronization.
3. **RabbitMQ**: Highly Available (HA) mirrored queue cluster.
4. **Environment Variables**:
   - `SPRING_DATASOURCE_URL`: JDBC URL
   - `JWT_SECRET`: Minimum 32 bytes random key
   - `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`
   - `RABBITMQ_URL`

## Health Checks

All microservices export standard health endpoints:
- Spring Boot: `GET /actuator/health`
- Playwright Automation: `GET /health`
- Nginx / React Frontend: `GET /`
