import {Request, Response } from "express";
import path from "path";
import express from "express";
import axios from "axios";
import { searchService, scrapeService } from "./lib/services";
import { scrapeEmails, downloadImage, scrapeImages, screenshot, search } from "./lib/routes";

export const app = express();

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get(search, async (req: Request, res: Response) => {
  const data = await searchService.search(req.query.q);
  res.json(data);
});

app.get(screenshot, async (req: Request, res: Response) => {
  const image = await scrapeService.screenshotPage(req.query.url);
  res.json(image);
});

app.get(scrapeImages, async (req: Request, res: Response) => {
  const images = await scrapeService.scrapeImages(req.query.url);
  res.json(images);
});

app.get(downloadImage, async (req: Request, res: Response) => {
  const response = await axios.request({
    url: req.query.q,
    method: "GET",
    responseType: "stream",
  });
  await response.data.pipe(res);
});

app.get(scrapeEmails, async (_: Request, res: Response) => {
  res.json([]);
});

app.get("/*", (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "dist", "app.html"));
});
