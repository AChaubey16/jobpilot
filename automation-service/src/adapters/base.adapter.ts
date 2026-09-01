import { Page } from 'playwright';

export interface ApplicationPayload {
  jobId: string;
  applicationId: string;
  targetUrl: string;
  userProfile: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedIn: string;
    gitHub: string;
    portfolio: string;
    currentCompany: string;
    currentRole: string;
    experienceYears: number;
    noticePeriodDays: number;
    currentCtc: string;
    expectedCtc: string;
    education: string;
    skills: string[];
  };
  resumeUrl: string;
  pauseBeforeSubmit: boolean;
}

export interface ApplicationResult {
  status: 'PAUSED_FOR_USER' | 'SUBMITTED' | 'FAILED';
  screenshots: string[];
  logs: string[];
  errorMessage?: string;
  requiresUserIntervention?: boolean;
  interventionReason?: string;
}

export abstract class BaseAtsAdapter {
  abstract readonly name: string;

  abstract fillAndProcess(page: Page, payload: ApplicationPayload): Promise<ApplicationResult>;

  protected async detectSecurityChallenge(page: Page): Promise<string | null> {
    const content = await page.content();
    if (content.includes('cf-challenge') || content.includes('g-recaptcha') || content.includes('h-captcha')) {
      return 'CAPTCHA detected on career page';
    }
    if (content.toLowerCase().includes('two-factor') || content.toLowerCase().includes('enter code sent to')) {
      return 'MFA / Security Code verification required';
    }
    return null;
  }
}
