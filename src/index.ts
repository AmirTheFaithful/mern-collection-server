import express, { Application } from "express";
import { Server, createServer } from "http";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import ping from "./mongo-setup";
import sizeLogger from "./middlewares/sizeLogger";
import router from "./routers/main-router";

dotenv.config();

const app: Application = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(sizeLogger);

const port: string = process.env.PORT;
const localURL: string = process.env.LOCAL_URL;

const server: Server = createServer(app);
server.listen(port, (): void => {
  console.log(`The server is running on ${localURL}:${port}.`);
});

// Check MongoDB authenticated connection
ping();

// Use MongoDB authenticated connection link form .env file
const mongoURI: string = process.env.MONGO_URI;
// Set JS global Promise object to use it instead of MongoDB's deprecated Promise object
mongoose.Promise = Promise;

mongoose.connect(mongoURI);
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

// Set main router on the home path of the web site
app.use("/", router());
