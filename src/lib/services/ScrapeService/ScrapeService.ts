import path from "path";
import {startBrowser} from "../startBrowser";
import { IImage, Image } from "./Image";
import { IContactInformationSearchResult, ContactInformationSearchResult } from "./ContactInformation";
import { uniq, truthy, trim } from "../../utils";

export class ScrapeService {
  public async getContactInformation(url: string): Promise<IContactInformationSearchResult> {
    return startBrowser(async (browser) => {
      const page = await browser.newPage();
      await page.goto(url);
      const result = await page.evaluate(() => {
        // @ts-ignore
        const domEmails = document.body.textContent.split(" ").filter((str) => /@.+\..*/.test(str));
        const domLinks = Array.from(document.querySelectorAll("a")).map((el) => el.href);

        const linkResults = domLinks.filter((l) => /https?/.test(l));
        const emailResults = domLinks.filter((l) => /mailto:/.test(l)).concat(domEmails);

        return {emails: emailResults, links: linkResults};
      });
      const emails = result.emails.filter(truthy).filter(uniq).map(trim);
      const links = result.links.filter(truthy).filter(uniq).map(trim);
      return ContactInformationSearchResult(emails, url, links);
    });
  }

  public async screenshotPage(url: string): Promise<IImage> {
    return startBrowser(async (browser) => {
      const page = await browser.newPage();
      await page.goto(url);
      const name = Buffer.from(url).toString("base64");
      const image = `${name}.png`;
      await page.screenshot({path: path.join(__dirname, "..", "..", "..", "..", "dist", image)});
      return Image(image);
    });
  }

  public async scrapeImages(url: string): Promise<string[]> {
    return startBrowser(async (browser) => {
      const page = await browser.newPage();
      await page.goto(url);
      // TODO: unit test formatting logic
      const result = await page.evaluate(() => {
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

      return result.filter((v) => !!v);
    });
  }
}
