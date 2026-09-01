import { Page } from 'playwright';
import { BaseAtsAdapter, ApplicationPayload, ApplicationResult } from './base.adapter.js';

export class CustomAdapter extends BaseAtsAdapter {
  readonly name = 'CUSTOM';

  async fillAndProcess(page: Page, payload: ApplicationPayload): Promise<ApplicationResult> {
    const logs: string[] = [];
    const screenshots: string[] = [];

    logs.push(`Navigating to custom career portal: ${payload.targetUrl}`);
    await page.goto(payload.targetUrl, { waitUntil: 'domcontentloaded' });

    // Generic heuristic field filler
    const inputs = await page.$$('input[type="text"], input[type="email"], input[type="tel"]');
    for (const input of inputs) {
      const nameAttr = (await input.getAttribute('name')) || '';
      const idAttr = (await input.getAttribute('id')) || '';
      const placeholder = (await input.getAttribute('placeholder')) || '';

      const label = `${nameAttr} ${idAttr} ${placeholder}`.toLowerCase();

      if (label.includes('name') || label.includes('first') || label.includes('full')) {
        await input.fill(payload.userProfile.fullName);
      } else if (label.includes('email')) {
        await input.fill(payload.userProfile.email);
      } else if (label.includes('phone') || label.includes('mobile')) {
        await input.fill(payload.userProfile.phone);
      }
    }

    logs.push('Completed heuristic form fill for custom portal.');
    const screenshot = `screenshots/${payload.applicationId}_custom_paused.png`;
    await page.screenshot({ path: screenshot });
    screenshots.push(screenshot);

    return {
      status: 'PAUSED_FOR_USER',
      screenshots,
      logs,
      requiresUserIntervention: true,
      interventionReason: 'Form filled via custom heuristics. Please verify and submit.'
    };
  }
}
