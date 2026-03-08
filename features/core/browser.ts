import { Browser, BrowserContext, chromium, Page } from "playwright";

class BrowserManager {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    baseUrl!: string;

    async start() {
        this.baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000/";
        this.browser = await chromium.launch({
            headless: process.env.HEADLESS === "true",
            slowMo: process.env.SLOW_MO ? Number(process.env.SLOW_MO) : 0,
        });
        this.context = await this.browser.newContext({ viewport: { width: 1280, height: 720 } });
        this.page = await this.context.newPage();
    }

    async goto(path = "") {
        await this.page.goto(`${this.baseUrl}${path}`, {
            waitUntil: 'domcontentloaded',
            timeout: 60_000,
        });
    }

    async stop() {
        await this.context?.close();
        await this.browser?.close();
    }
}

export default new BrowserManager();