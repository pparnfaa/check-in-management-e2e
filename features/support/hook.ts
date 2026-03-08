import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import 'dotenv/config';

import browser from '../core/browser';

// Extend timeout for browser operations
setDefaultTimeout(60 * 1000);

let isBrowserStarted = false;

const closeBrowser = async () => {
  if (isBrowserStarted) {
    try {
      await browser.stop();
      isBrowserStarted = false;
      process.exit(0);
    } catch (error) {
      console.error('Error closing browser:', error);
      process.exit(1);
    }
  }
};

Before(async () => {
  if (!isBrowserStarted) {
    await browser.start();
    isBrowserStarted = true;

    // Handle explicit termination - close browser and exit cleanly
    process.on('SIGINT', closeBrowser);
    process.on('SIGTERM', closeBrowser);
  }
});

After(async function () {
  // Keep browser open across scenarios
});

