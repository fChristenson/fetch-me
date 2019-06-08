import path from "path";
import express, {Request, Response } from "express";
import axios from "axios";
import { searchService, scrapeService } from "./lib/services";
import { downloadImage, scrapeImages, screenshot, search, scrapeEmails } from "./lib/routes";
import { catchError } from "./lib/catchError";
import { StatusError } from "./lib/StatusError";
import { NextFunction } from "connect";

export const app = express();
// TODO: optimize first call with one endpoint
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get(search, catchError(async (req: Request, res: Response) => {
  const data = await searchService.search(req.query.q);
  res.json(data);
}));

app.get(screenshot, catchError(async (req: Request, res: Response) => {
  const image = await scrapeService.screenshotPage(req.query.url);
  res.json(image);
}));

app.get(scrapeImages, catchError(async (req: Request, res: Response) => {
  const images = await scrapeService.scrapeImages(req.query.url);
  res.json(images);
}));

app.get(scrapeEmails, catchError(async (req: Request, res: Response) => {
  const result = await scrapeService.getContactInformation(req.query.url);
  res.json(result);
}));

app.get(downloadImage, catchError(async (req: Request, res: Response) => {
  const response = await axios.request({
    url: req.query.q,
    method: "GET",
    responseType: "stream",
  });
  await response.data.pipe(res);
}));

app.get("/*", catchError((_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "dist", "app.html"));
}));

app.use((err: StatusError|Error, _: Request, res: Response, _2: NextFunction) => {
  // @ts-ignore
  res.status(err.status || 500).json({error: err.message});
});
