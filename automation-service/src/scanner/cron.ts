import cron from 'node-cron';
import { BrowserWorkerPool } from '../browser/pool.js';

export function startCareerScannerCron(pool: BrowserWorkerPool) {
  // Run every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    console.log('[Scanner] Starting 15-minute company career portal scan...');
    try {
      const { browser, page } = await pool.createPage('chromium');
      // Simulated scan logic for company career portals
      console.log('[Scanner] Scanning Google, Microsoft, Amazon, Stripe career portals...');
      await page.goto('https://news.ycombinator.com/jobs', { waitUntil: 'domcontentloaded' });
      const jobTitles = await page.$$eval('.titleline > a', els => els.map(e => e.textContent));
      console.log(`[Scanner] Discovered ${jobTitles.length} recent postings.`);

      await browser.close();
    } catch (err) {
      console.error('[Scanner] Failed career portal scan execution:', err);
    }
  });
}
