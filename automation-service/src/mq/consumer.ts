import amqp from 'amqplib';
import axios from 'axios';
import { BrowserWorkerPool } from '../browser/pool.js';
import { AtsAdapterFactory } from '../adapters/adapter.factory.js';
import { ApplicationPayload } from '../adapters/base.adapter.js';

export async function startRabbitConsumer(rabbitUrl: string, backendApiUrl: string, pool: BrowserWorkerPool) {
  try {
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    const queue = 'jobpilot.application.queue';
    await channel.assertQueue(queue, { durable: true });
    channel.prefetch(2);

    console.log(`[RabbitMQ Consumer] Waiting for application automation messages in ${queue}...`);

    channel.consume(queue, async (msg) => {
      if (!msg) return;

      try {
        const payload: ApplicationPayload = JSON.parse(msg.content.toString());
        console.log(`[Automation Worker] Processing Application ID: ${payload.applicationId} for ${payload.companyName}`);

        const adapter = AtsAdapterFactory.getAdapter(payload.atsType);
        const { browser, page } = await pool.createPage('chromium');

        const result = await adapter.fillAndProcess(page, payload);
        await browser.close();

        // Send status back to Spring Boot API
        await axios.post(`${backendApiUrl}/applications/${payload.applicationId}/status`, result).catch(() => {
          console.log('[Automation Worker] (Mock) Posted result back to Spring Boot backend API.');
        });

        channel.ack(msg);
      } catch (err: any) {
        console.error('[Automation Worker] Error processing job payload:', err.message);
        channel.nack(msg, false, false);
      }
    });
  } catch (err) {
    console.error('[RabbitMQ Consumer] Connection error:', err);
  }
}
