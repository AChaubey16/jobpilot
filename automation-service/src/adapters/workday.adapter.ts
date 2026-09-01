import { Page } from 'playwright';
import { BaseAtsAdapter, ApplicationPayload, ApplicationResult } from './base.adapter.js';

export class WorkdayAdapter extends BaseAtsAdapter {
  readonly name = 'WORKDAY';

  async fillAndProcess(page: Page, payload: ApplicationPayload): Promise<ApplicationResult> {
    const logs: string[] = [];
    const screenshots: string[] = [];

    logs.push(`Navigating to Workday portal: ${payload.targetUrl}`);
    await page.goto(payload.targetUrl, { waitUntil: 'domcontentloaded' });

    logs.push('Workday multi-step application form detected.');
    const screenshot = `screenshots/${payload.applicationId}_workday.png`;
    await page.screenshot({ path: screenshot });
    screenshots.push(screenshot);

    return {
      status: 'PAUSED_FOR_USER',
      screenshots,
      logs,
      requiresUserIntervention: true,
      interventionReason: 'Workday login / sign-in required. Please authenticate to proceed.'
    };
  }
}
