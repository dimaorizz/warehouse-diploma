import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { createProviderRouter } from "./modules/provider/provider.router";
import Knex from "knex";
import { Model } from "objection";
import { createItemsRouter } from "./modules/item/item.router";
import { createTransactionsRouter } from "./modules/transactions/transactions.router";
const knexConfig = require("../../knexfile.js");

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const knex = Knex(knexConfig[process.env.NODE_ENV ?? "development"]);
Model.knex(knex);

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/provider", createProviderRouter());
app.use("/items", createItemsRouter());
app.use("/transactions", createTransactionsRouter());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Server");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
