import {Request, Response } from "express";
import path from "path";
import express from "express";
import { searchService, scrapeService } from "./lib/services";

export const app = express();

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/api/v1/search", async (req: Request, res: Response) => {
  const data = await searchService.search(req.query.q);
  res.json(data);
});

app.get("/api/v1/screenshot", async (req: Request, res: Response) => {
  const image = await scrapeService.screenshotPage(req.query.url);
  res.json(image);
});

app.get("/api/v1/scrape-images", async (req: Request, res: Response) => {
  const image = await scrapeService.scrapeImages(req.query.url);
  res.json(image);
});

app.get("/api/v1/download-image", async (req: Request, res: Response) => {
  const image = await scrapeService.scrapeImages(req.query.url);
  res.json(image);
});

app.get("/api/v1/scrape-emails", async (_: Request, res: Response) => {
  res.json([]);
});

app.get("/*", (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "dist", "app.html"));
});
