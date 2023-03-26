import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import { PORT } from './utilities/constant'
import { connectDB } from './utilities/connectDB';

connectDB() // 連線資料庫

const app = express();
app.use(express.json()) // for parsing application/json
app.use(routes);  // 設定路由

// 設定路由不匹配的處理
app.use((req: Request, res: Response) => {
  res.status(404).send('Route not found');
});

// 設定共用錯誤處理 middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500).json({ success: false, message: err.message }).end()
});

// 設定監聽 port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
