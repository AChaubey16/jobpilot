import { Page } from 'playwright';
import { BaseAtsAdapter, ApplicationPayload, ApplicationResult } from './base.adapter.js';

export class GreenhouseAdapter extends BaseAtsAdapter {
  readonly name = 'GREENHOUSE';

  async fillAndProcess(page: Page, payload: ApplicationPayload): Promise<ApplicationResult> {
    const logs: string[] = [];
    const screenshots: string[] = [];

    logs.push(`Navigating to Greenhouse application page: ${payload.targetUrl}`);
    await page.goto(payload.targetUrl, { waitUntil: 'domcontentloaded' });

    const challenge = await this.detectSecurityChallenge(page);
    if (challenge) {
      logs.push(`Security challenge hit: ${challenge}`);
      const screenshot = `screenshots/${payload.applicationId}_security.png`;
      await page.screenshot({ path: screenshot });
      return {
        status: 'PAUSED_FOR_USER',
        screenshots: [screenshot],
        logs,
        requiresUserIntervention: true,
        interventionReason: challenge
      };
    }

    // Fill standard Greenhouse fields
    if (await page.$('#first_name')) {
      await page.fill('#first_name', payload.userProfile.fullName.split(' ')[0] || '');
      await page.fill('#last_name', payload.userProfile.fullName.split(' ').slice(1).join(' ') || 'Engineer');
    } else if (await page.$('input[autocomplete="given-name"]')) {
      await page.fill('input[autocomplete="given-name"]', payload.userProfile.fullName);
    }

    if (await page.$('#email')) await page.fill('#email', payload.userProfile.email);
    if (await page.$('#phone')) await page.fill('#phone', payload.userProfile.phone);

    // Custom LinkedIn/GitHub fields
    const linkedinField = await page.$('input[label*="LinkedIn"], input[id*="linkedin"]');
    if (linkedinField) await linkedinField.fill(payload.userProfile.linkedIn);

    logs.push('Form inputs filled automatically.');
    const pausedScreenshot = `screenshots/${payload.applicationId}_paused.png`;
    await page.screenshot({ path: pausedScreenshot });
    screenshots.push(pausedScreenshot);

    if (payload.pauseBeforeSubmit) {
      logs.push('Pause before submit enabled. Stopping automation for user review.');
      return {
        status: 'PAUSED_FOR_USER',
        screenshots,
        logs,
        requiresUserIntervention: true,
        interventionReason: 'Form filled successfully. Review and click Submit.'
      };
    }

    return {
      status: 'SUBMITTED',
      screenshots,
      logs
    };
  }
}
