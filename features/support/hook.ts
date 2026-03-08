import { Before, After } from '@cucumber/cucumber';
import 'dotenv/config';

import browser from '../core/browser';

Before(async () => {
  await browser.start();
});

After(async function () {
  await browser.stop();
});
