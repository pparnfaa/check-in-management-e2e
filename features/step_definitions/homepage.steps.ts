import { Given, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';

import browser from '../core/browser';

Given('I open the homepage', async function () {
  await browser.goto('/');
});

Then('the page title should not be empty', async function () {
  const title = await browser.page.title();
  assert.notEqual(title.trim().length, 0);
});
