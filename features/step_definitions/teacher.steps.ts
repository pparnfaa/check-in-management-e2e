import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import assert from 'node:assert/strict';

import browser from '../core/browser';
import loginPage from '../pages/login.page';

Given('the user is on log in page', async function () {
  await loginPage.LoginPage();
});

Given('the teacher is on login page', async function () {
  await loginPage.LoginPage();
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
  const isVisible = await loginPage.isElementByTestIdVisible(testId);
  assert.equal(isVisible, true);
});

When('the teacher clicks the element with test id {string}', async function (testId: string) {
  await loginPage.clickElementByTestId(testId);
});

When('the teacher fills the following register information:', async function (table: DataTable) {
  const rows = table.hashes() as Array<{ testId: string; value: string }>;

  for (const row of rows) {
    await loginPage.fillElementByTestId(row.testId, row.value);
  }
});

When('the teacher submits register form with test id {string}', async function (testId: string) {
  await loginPage.clickElementByTestId(testId);
});

Then('the teacher should be on {string} page', async function (expectedPath: string) {
  const navigated = await loginPage.waitForUrlToContain(expectedPath);
  assert.equal(navigated, true, `Failed to navigate to page containing "${expectedPath}"`);

  const currentUrl = await loginPage.getCurrentUrl();
  assert.match(currentUrl, new RegExp(expectedPath), `Expected URL to contain "${expectedPath}", but got "${currentUrl}"`);
});

Then('the test run completes and closes browser', async function () {
  await new Promise(resolve => setTimeout(resolve, 1000));
  process.kill(process.pid, 'SIGTERM');
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
