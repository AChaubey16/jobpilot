import dotenv from 'dotenv';
import { BrowserWorkerPool } from './browser/pool.js';
import { startRabbitConsumer } from './mq/consumer.js';
import { startCareerScannerCron } from './scanner/cron.js';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://jobpilot:jobpilot123@localhost:5672';
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:8080/api/v1';
const HEADLESS = process.env.HEADLESS !== 'false';

async function bootstrap() {
  console.log('Starting JobPilot Playwright Automation Service...');
  const pool = new BrowserWorkerPool(HEADLESS);

  startCareerScannerCron(pool);
  await startRabbitConsumer(RABBITMQ_URL, BACKEND_API_URL, pool);
}

bootstrap();
