import puppeteer from 'puppeteer';
import childProcces from 'child_process';

const server = childProcces.fork(`${__dirname}/test-server.js`);

jest.setTimeout(30000);

describe('Toggle button', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9999';

  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should make popover visible', async () => {
    await page.goto(baseUrl);
    const $btn = await page.$('#btn');

    $btn.click();
    await page.waitFor(1000);

    const visibility = await page.$eval('#popover', (node) => node.style.visibility);

    expect(visibility).toBe('visible');
  });

  test('should make popover hidden', async () => {
    await page.goto(baseUrl);
    const $btn = await page.$('#btn');

    $btn.click();
    await page.waitFor(100);
    $btn.click();
    await page.waitFor(1000);

    const visibility = await page.$eval('#popover', (node) => node.style.visibility);

    expect(visibility).toBe('hidden');
  });
});
