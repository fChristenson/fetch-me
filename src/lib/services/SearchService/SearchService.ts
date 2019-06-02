import puppeteer from "puppeteer";
import { ISearchResult } from "./SearchResult";

export class SearchService {
  public async search(q: string): Promise<ISearchResult[]> {
    const browser = await puppeteer.launch();
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
    await browser.close();

    return res;
  }
}
