export enum ApplicationStatus {
  DISCOVERED = 'DISCOVERED',
  QUEUED = 'QUEUED',
  AUTOMATION_IN_PROGRESS = 'AUTOMATION_IN_PROGRESS',
  PAUSED_FOR_USER = 'PAUSED_FOR_USER',
  SUBMITTED = 'SUBMITTED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export enum AtsType {
  WORKDAY = 'WORKDAY',
  GREENHOUSE = 'GREENHOUSE',
  LEVER = 'LEVER',
  ASHBY = 'ASHBY',
  ORACLE = 'ORACLE',
  SUCCESSFACTORS = 'SUCCESSFACTORS',
  SMARTRECRUITERS = 'SMARTRECRUITERS',
  ICIMS = 'ICIMS',
  CUSTOM = 'CUSTOM'
}

export enum SubscriptionPlan {
  PREMIUM_ANNUAL = 'PREMIUM_ANNUAL'
}

export enum NotificationType {
  NEW_MATCHING_JOB = 'NEW_MATCHING_JOB',
  AUTOMATION_PAUSED = 'AUTOMATION_PAUSED',
  AUTOMATION_COMPLETED = 'AUTOMATION_COMPLETED',
  AUTOMATION_FAILED = 'AUTOMATION_FAILED',
  SUBSCRIPTION_EXPIRING = 'SUBSCRIPTION_EXPIRING'
}

export interface JobFilterCriteria {
  minExperienceYears: number;
  maxExperienceYears: number;
  locations: string[];
  maxPostingAgeDays: number;
  includeKeywords: string[];
  excludeKeywords: string[];
  minSalary?: number;
  employmentTypes?: string[];
}

export interface AutomationJobPayload {
  jobId: string;
  applicationId: string;
  userId: string;
  companyName: string;
  targetUrl: string;
  atsType: AtsType;
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

export interface AutomationResultPayload {
  jobId: string;
  applicationId: string;
  status: ApplicationStatus;
  screenshots: string[];
  logs: string[];
  errorMessage?: string;
  requiresUserIntervention?: boolean;
  interventionReason?: string;
}
