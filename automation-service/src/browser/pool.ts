import { chromium, firefox, webkit, Browser, Page } from 'playwright';

export type BrowserType = 'chromium' | 'firefox' | 'webkit';

export class BrowserWorkerPool {
  private isHeadless: boolean;

  constructor(headless: boolean = true) {
    this.isHeadless = headless;
  }

  async createPage(type: BrowserType = 'chromium'): Promise<{ browser: Browser; page: Page }> {
    let browser: Browser;
    switch (type) {
      case 'firefox':
        browser = await firefox.launch({ headless: this.isHeadless });
        break;
      case 'webkit':
        browser = await webkit.launch({ headless: this.isHeadless });
        break;
      default:
        browser = await chromium.launch({ headless: this.isHeadless });
        break;
    }

    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    });

    const page = await context.newPage();
    return { browser, page };
  }
}
