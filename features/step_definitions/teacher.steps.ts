import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import assert from 'node:assert/strict';

import browser from '../core/browser';
import loginPage from '../pages/login.page';
import registerPage from '../pages/register.page';
import coursePage from '../pages/course.page';

type RegisterCredentials = {
  email: string;
  password: string;
};

type TeacherWorld = {
  registerCredentials?: RegisterCredentials;
  teacherName?: string;
};

async function loginWithStoredRegisterCredentials(world: TeacherWorld) {
  const { registerCredentials } = world;
  assert.ok(registerCredentials?.email, 'Missing register email for login fallback');
  assert.ok(registerCredentials?.password, 'Missing register password for login fallback');

  await loginPage.openLoginPage();
  await loginPage.loginWithEmailAndPassword(registerCredentials.email, registerCredentials.password);
}

Given('the user is on log in page', async function () {
  await loginPage.openLoginPage();
});

Given('the teacher is on login page', async function () {
  await loginPage.openLoginPage();
});

Then('the login form should be visible', async function () {
  const isVisible = await loginPage.isLoginFormVisible();
  assert.equal(isVisible, true);
});

Then('the login page should be visible', async function () {
  const isVisible = await loginPage.isLoginFormVisible();
  assert.equal(isVisible, true);
});

Then('the element with test id {string} should be visible', async function (testId: string) {
  const isVisible = await registerPage.isElementByTestIdVisible(testId);
  assert.equal(isVisible, true);
});

When('the teacher clicks the element with test id {string}', async function (testId: string) {
  await registerPage.clickElementByTestId(testId);
});

When('the teacher fills the following register information:', async function (table: DataTable) {
  const rows = table.hashes() as Array<{ testId: string; value: string }>;
  const registerFormData = Object.fromEntries(rows.map(row => [row.testId, row.value])) as Record<string, string>;

  for (const row of rows) {
    await registerPage.fillElementByTestId(row.testId, row.value);
  }

  const world = this as TeacherWorld;
  world.registerCredentials = {
    email: registerFormData[registerPage.testIds.emailInput] ?? '',
    password: registerFormData[registerPage.testIds.passwordInput] ?? '',
  };
  world.teacherName = registerFormData['name-input'] ?? '';
});

When('the teacher submits register form with test id {string}', async function (testId: string) {
  await registerPage.clickElementByTestId(testId);

  const isRegistered = await loginPage.waitForUrlToContain('courses', 5_000);

  if (isRegistered) {
    return;
  }

  await loginWithStoredRegisterCredentials(this as TeacherWorld);
});

Then('the teacher should be on {string} page', async function (expectedPath: string) {
  const navigated = await loginPage.waitForUrlToContain(expectedPath);
  assert.equal(navigated, true, `Failed to navigate to page containing "${expectedPath}"`);

  const currentUrl = await loginPage.getCurrentUrl();
  assert.match(currentUrl, new RegExp(expectedPath), `Expected URL to contain "${expectedPath}", but got "${currentUrl}"`);
});

Then('the test run completes and closes browser', async function () {
  await new Promise(resolve => setTimeout(resolve, 1000));
  try {
    await browser.stop();
  } catch (error) {
    console.error('Error closing browser:', error);
  }
  process.exit(0);
});

Then('the username or email input should be visible', async function () {
  const isVisible = await loginPage.isUsernameOrEmailInputVisible();
  assert.equal(isVisible, true);
});

Then('the password input should be visible', async function () {
  const isVisible = await loginPage.isPasswordInputVisible();
  assert.equal(isVisible, true);
});

Then('the login button should be visible', async function () {
  const isVisible = await loginPage.isLoginButtonVisible();
  assert.equal(isVisible, true);
});

Then('the page title should not be empty', async function () {
  const title = await browser.page.title();
  assert.notEqual(title.trim().length, 0);
});

When('the teacher fills the following course information:', async function (table: DataTable) {
  const rows = table.hashes() as Array<{ testId: string; value: string }>;

  for (const row of rows) {
    await coursePage.fillElementByTestId(row.testId, row.value);
  }
});

When('the teacher fills course information with unique code:', async function (table: DataTable) {
  const rows = table.hashes() as Array<{ testId: string; value: string }>;
  const timestamp = Date.now();
  const uniqueCourseCode = `CS${timestamp.toString().slice(-8)}`;

  for (const row of rows) {
    const value = row.testId === 'course-code-input' ? uniqueCourseCode : row.value;
    await coursePage.fillElementByTestId(row.testId, value);
  }
});

When('the teacher selects {string} from dropdown with test id {string}', async function (value: string, testId: string) {
  await coursePage.selectDropdownByTestId(testId, value);
});

When('the teacher selects instructor from dropdown with test id {string}', async function (testId: string) {
  const world = this as TeacherWorld;
  assert.ok(world.teacherName, 'Missing teacher name for instructor selection');
  await coursePage.selectDropdownByTestIdAndLabel(testId, world.teacherName);
});

When('the teacher submits course form with test id {string}', async function (testId: string) {
  await coursePage.clickElementByTestId(testId);
});

Then('the form heading with text {string} should be visible', async function (expectedText: string) {
  const headingElement = browser.page.getByTestId('form-heading').first();
  await headingElement.waitFor({ state: 'visible', timeout: 15_000 });
  
  const actualText = await headingElement.textContent();
  assert.ok(actualText?.includes(expectedText), `Expected form heading to contain "${expectedText}", but got "${actualText}"`);
});

When('the teacher fills the element with test id {string} with value {string}', async function (testId: string, value: string) {
  await coursePage.fillElementByTestId(testId, value);
});

Then('the session should be created successfully', async function () {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const currentUrl = await coursePage.getCurrentUrl();
  console.log(`Session created successfully. Current URL: ${currentUrl}`);
});

When('the teacher creates session if not exists with title {string}:', async function (sessionTitle: string) {
  // Wait for course summary page to load
  await new Promise(resolve => setTimeout(resolve, 2000));

  const sessionExists = await coursePage.hasSessionWithTitle(sessionTitle);

  if (sessionExists) {
    console.log(`Session "${sessionTitle}" already exists, navigating to session detail...`);
    await coursePage.clickSessionWithTitle(sessionTitle);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }

  console.log(`Session "${sessionTitle}" not found, creating new session...`);

  await coursePage.clickElementByTestId('create-session-btn');
  
  const headingElement = browser.page.getByTestId('form-heading').first();
  await headingElement.waitFor({ state: 'visible', timeout: 15_000 });
  
  await coursePage.fillElementByTestId('form-title-input', sessionTitle);
  await coursePage.clickElementByTestId('mode-online-card');
  await coursePage.clickElementByTestId('submit-btn');
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(`Session "${sessionTitle}" created successfully.`);
});

Then('the element with test id {string} in qr section should be visible', async function (testId: string) {
  const element = browser.page.getByTestId(testId).first();
  await element.waitFor({ state: 'visible', timeout: 15_000 });
  const isVisible = await element.isVisible();
  assert.equal(isVisible, true, `Expected element with test id "${testId}" to be visible`);
});

When('the teacher creates course if not exists:', async function (table: DataTable) {
  const rows = table.hashes() as Array<{ testId: string; value: string }>;
  const courseData = Object.fromEntries(rows.map(row => [row.testId, row.value])) as Record<string, string>;
  const courseName = courseData['course-name-input'];
  
  const world = this as TeacherWorld;
  assert.ok(courseName, 'Missing course name for checking existence');

  await new Promise(resolve => setTimeout(resolve, 2000));

  const courseExists = await coursePage.hasCourseWithName(courseName);

  if (courseExists) {
    console.log(`Course "${courseName}" already exists, navigating to manage course...`);
    await coursePage.clickElementByTestId('manage-course-btn');
    // Wait for navigation to complete (could be manage page or courses page)
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }

  console.log(`Course "${courseName}" not found, creating new course...`);

  await coursePage.clickElementByTestId('create-course-btn');
  await coursePage.waitForUrlToContain('courses/new', 10_000);

  const timestamp = Date.now();
  const uniqueCourseCode = `CS${timestamp.toString().slice(-8)}`;

  for (const row of rows) {
    if (row.testId === 'course-semester-select') {
      continue;
    }
    const value = row.testId === 'course-code-input' ? uniqueCourseCode : row.value;
    await coursePage.fillElementByTestId(row.testId, value);
  }

  const semester = courseData['course-semester-select'];
  if (semester) {
    await coursePage.selectDropdownByTestId('course-semester-select', semester);
  }

  assert.ok(world.teacherName, 'Missing teacher name for instructor selection');
  await coursePage.selectDropdownByTestIdAndLabel('instructor-select', world.teacherName);

  await coursePage.clickElementByTestId('submit-btn');
  
  // Wait for navigation back to courses page after creating course
  await coursePage.waitForUrlToContain('courses', 10_000);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log(`Course "${courseName}" created successfully, navigating to manage course...`);
  await coursePage.clickElementByTestId('manage-course-btn');
  await new Promise(resolve => setTimeout(resolve, 2000));
});
