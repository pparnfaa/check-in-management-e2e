import { Before, After, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import 'dotenv/config';

import browser from '../core/browser';

// Extend timeout for browser operations
setDefaultTimeout(60 * 1000);

let isBrowserStarted = false;

Before(async () => {
  if (!isBrowserStarted) {
    await browser.start();
    isBrowserStarted = true;
  }
});

After(async function () {
  // Keep browser open across scenarios
});

AfterAll(async function () {
  if (isBrowserStarted) {
    try {
      await browser.stop();
      isBrowserStarted = false;
    } catch (error) {
      console.error('Error closing browser in AfterAll:', error);
    }
  }
});

