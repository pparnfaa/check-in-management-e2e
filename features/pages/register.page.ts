import browser from "../core/browser";

class RegisterPage {
    public readonly testIds = {
        emailInput: "email-input",
        passwordInput: "password-input",
    };

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
        const element = browser.page.getByTestId(testId).first();
        await element.waitFor({ state: "visible", timeout: 15_000 });
        await element.click();
    }

    public async fillElementByTestId(testId: string, value: string) {
        const element = browser.page.getByTestId(testId).first();
        await element.waitFor({ state: "visible", timeout: 15_000 });
        await element.fill(value);
    }
}

export default new RegisterPage();
