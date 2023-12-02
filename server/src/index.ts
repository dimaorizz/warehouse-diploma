import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { createProviderRouter } from "./modules/provider/provider.router";
import Knex from "knex";
import { Model } from "objection";
import { createItemsRouter } from "./modules/item/item.router";
import cors from "cors";
import { createOrderRouter } from "./modules/order/order.router";
import { createAuthRouter } from "./modules/auth/auth.router";
const knexConfig = require("../../knexfile.js");

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const knex = Knex(knexConfig[process.env.NODE_ENV ?? "development"]);
Model.knex(knex);

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.use("/provider", createProviderRouter());
app.use("/items", createItemsRouter());
app.use("/order", createOrderRouter());
app.use("/auth", createAuthRouter());
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Server");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
