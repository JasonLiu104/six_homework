import { Request, Response, NextFunction } from "express";

// 設定共用錯誤處理 middleware
export const syncError = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
