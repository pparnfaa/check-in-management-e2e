import browser from "../core/browser";

class LoginPage {
    public readonly testIds = {
        form: "login-page",
        usernameOrEmailInput: "email-input",
        passwordInput: "password-input",
        loginButton: "signin-btn",
    };

    public async openLoginPage() {
        await browser.goto("/");
    }

    public async LoginPage() {
        await this.openLoginPage();
    }

    public async isElementByTestIdVisible(testId: string) {
        const element = browser.page.getByTestId(testId).first();

        try {
            await element.waitFor({ state: "visible", timeout: 15_000 });
            return true;
        } catch {
            return false;
        }
    }

    public async clickElementByTestId(testId: string) {
        await browser.page.getByTestId(testId).first().click();
    }

    public async fillElementByTestId(testId: string, value: string) {
        await browser.page.getByTestId(testId).first().fill(value);
    }

    public async isLoginFormVisible() {
        return this.isElementByTestIdVisible(this.testIds.form);
    }

    public async isUsernameOrEmailInputVisible() {
        return this.isElementByTestIdVisible(this.testIds.usernameOrEmailInput);
    }

    public async isPasswordInputVisible() {
        return this.isElementByTestIdVisible(this.testIds.passwordInput);
    }

    public async isLoginButtonVisible() {
        return this.isElementByTestIdVisible(this.testIds.loginButton);
    }

    public async loginWithEmailAndPassword(email: string, password: string) {
        await this.fillElementByTestId(this.testIds.usernameOrEmailInput, email);
        await this.fillElementByTestId(this.testIds.passwordInput, password);
        await this.clickElementByTestId(this.testIds.loginButton);
    }

    public async getCurrentUrl(): Promise<string> {
        return browser.page.url();
    }

    public async waitForUrlToContain(expectedPath: string, timeout = 15_000): Promise<boolean> {
        try {
            await browser.page.waitForURL(`**/${expectedPath}**`, { timeout });
            return true;
        } catch {
            return false;
        }
    }
}

export default new LoginPage();