import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: express.Application = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const port: string | undefined = process.env.PORT;
const localURL: string | undefined = process.env.LOCAL_URL;

const server = http.createServer(app);
server.listen(port, (): void => {
  console.log(`The server is running on ${localURL}:${port}.`);
});
