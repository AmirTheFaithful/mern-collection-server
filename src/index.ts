import express, { Application } from "express";
import http, { Server } from "http";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const port: string = process.env.PORT;
const localURL: string = process.env.LOCAL_URL;

const server: Server = http.createServer(app);
server.listen(port, (): void => {
  console.log(`The server is running on ${localURL}:${port}.`);
});
