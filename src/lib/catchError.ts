import { Request, Response, NextFunction } from "express";

type IFn = (req: Request, res: Response) => void;

export const catchError = (fn: IFn) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res)).catch(next);
};
