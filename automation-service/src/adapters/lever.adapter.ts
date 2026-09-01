import { Page } from 'playwright';
import { BaseAtsAdapter, ApplicationPayload, ApplicationResult } from './base.adapter.js';

export class LeverAdapter extends BaseAtsAdapter {
  readonly name = 'LEVER';

  async fillAndProcess(page: Page, payload: ApplicationPayload): Promise<ApplicationResult> {
    const logs: string[] = [];
    const screenshots: string[] = [];

    logs.push(`Navigating to Lever application page: ${payload.targetUrl}`);
    await page.goto(payload.targetUrl, { waitUntil: 'domcontentloaded' });

    if (await page.$('input[name="name"]')) await page.fill('input[name="name"]', payload.userProfile.fullName);
    if (await page.$('input[name="email"]')) await page.fill('input[name="email"]', payload.userProfile.email);
    if (await page.$('input[name="phone"]')) await page.fill('input[name="phone"]', payload.userProfile.phone);
    if (await page.$('input[name="org"]')) await page.fill('input[name="org"]', payload.userProfile.currentCompany);
    if (await page.$('input[name="urls[LinkedIn]"]')) await page.fill('input[name="urls[LinkedIn]"]', payload.userProfile.linkedIn);
    if (await page.$('input[name="urls[GitHub]"]')) await page.fill('input[name="urls[GitHub]"]', payload.userProfile.gitHub);

    logs.push('Form inputs filled automatically.');
    const screenshot = `screenshots/${payload.applicationId}_lever_paused.png`;
    await page.screenshot({ path: screenshot });
    screenshots.push(screenshot);

    return {
      status: 'PAUSED_FOR_USER',
      screenshots,
      logs,
      requiresUserIntervention: true,
      interventionReason: 'Lever application filled. Please review and submit.'
    };
  }
}
