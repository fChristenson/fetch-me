import puppeteer, { Browser } from "puppeteer";

// TODO: create singleton browser to avoid multiple instances?
export async function startBrowser<T>(codeToRun: (browser: Browser) => Promise<T>) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  try {
    const val = await codeToRun(browser);
    await browser.close();
    return val;
  } catch (e) {
    await browser.close();
    throw e;
  }
}
