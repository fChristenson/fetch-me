import { startBrowser } from "../startBrowser";
import { ISearchResult } from "./SearchResult";
import { Browser } from "puppeteer";

export class SearchService {
  // TODO: If this project is a keeper perhaps using the payed search api is better?
  public async search(q: string): Promise<ISearchResult[]> {
    return startBrowser(async (browser: Browser) => {
      const page = await browser.newPage();
      await page.goto(`https://www.google.com/search?q=${q}`);

      const res = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".rc"))
          .map((e) => {
            const maybeTitleEl = e.querySelector(".LC20lb");
            const maybeDescriptionEl = e.querySelector(".st");
            const maybeLinkEl = e.querySelector("a");

            const title = maybeTitleEl && maybeTitleEl.textContent;
            const description = maybeDescriptionEl && maybeDescriptionEl.textContent;
            const href = maybeLinkEl && maybeLinkEl.href;

            return {title, description, href};
          });
      });
      return res;
    });
  }
}
