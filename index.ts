import express, { Request, Response } from "express";
import { setRoutes } from "./src/routes";

const app = express();
const port = 3000;

setRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
