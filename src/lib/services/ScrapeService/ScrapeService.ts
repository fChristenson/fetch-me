import puppeteer from "puppeteer";
import path from "path";
import { IScreenshot, Screenshot } from "./Screenshot";

export class ScrapeService {
  public async screenshotPage(url: string): Promise<IScreenshot> {
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
    const page = await browser.newPage();
    await page.goto(url);
    const name = Buffer.from(url).toString("base64");
    const image = `${name}.png`;
    await page.screenshot({path: path.join(__dirname, "..", "..", "..", "..", "dist", image)});
    await browser.close();
    return Screenshot(image);
  }

  public async scrapeImages(url: string): Promise<string[]> {
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
    const page = await browser.newPage();
    await page.goto(url);
    // TODO: unit test formatting logic, how to handle inline svg?
    const images = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("img")).map((el) => {
        if (el) {
          return el.src || "";
        } else {
          return "";
        }
      });

      const urls = Array.from(document.querySelectorAll("*")).map((el) => {
        if (el) {
          return getComputedStyle(el).backgroundImage || "";
        } else {
          return "";
        }
      })
      .filter((v) => /^url/.test(v))
      .map((cssUrl) => {
        return cssUrl.replace(/["'()]/g, "").replace(/url/, "");
      });

      return images.concat(urls).map((v) => v.trim()).filter((v, i, self) => self.indexOf(v) === i);
    });

    return images.filter((v) => !!v);
  }
}
