import browser from "../core/browser";

class CoursePage {
    public readonly testIds = {
        createCourseButton: "create-course-btn",
        courseCodeInput: "course-code-input",
        courseNameInput: "course-name-input",
        courseYearInput: "course-year-input",
        courseSemesterSelect: "course-semester-select",
        instructorSelect: "instructor-select",
        submitCourseButton: "submit-course-btn",
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

    public async selectDropdownByTestId(testId: string, value: string) {
        const element = browser.page.getByTestId(testId).first();
        await element.waitFor({ state: "visible", timeout: 15_000 });
        await element.selectOption(value);
    }

    public async selectDropdownByTestIdAndLabel(testId: string, label: string) {
        await browser.page.getByTestId(testId).first().selectOption({ label });
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

    public async hasCourseWithName(courseName: string): Promise<boolean> {
        try {
            const courseElement = browser.page.getByText(courseName, { exact: false }).first();
            await courseElement.waitFor({ state: "visible", timeout: 3_000 });
            return true;
        } catch {
            return false;
        }
    }

    public async hasSessionWithTitle(sessionTitle: string): Promise<boolean> {
        try {
            const sessionElement = browser.page.getByTestId('session-title').filter({ hasText: sessionTitle }).first();
            await sessionElement.waitFor({ state: "visible", timeout: 3_000 });
            return true;
        } catch {
            return false;
        }
    }

    public async clickSessionWithTitle(sessionTitle: string) {
        const sessionElement = browser.page.getByTestId('session-title').filter({ hasText: sessionTitle }).first();
        await sessionElement.waitFor({ state: "visible", timeout: 15_000 });
        await sessionElement.click();
    }
}

export default new CoursePage();
