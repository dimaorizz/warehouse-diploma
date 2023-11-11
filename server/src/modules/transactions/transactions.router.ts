import { Router } from "express";
import createRouter from "express-promise-router";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
} from "./transactions.controller";

export function createTransactionsRouter(): Router {
  const router = createRouter();

  router.get("/", getAllTransactions);
  router.get("/:transactionID", getTransactionById);
  router.post("/create", createTransaction);
  router.put("/:transactionID", updateTransaction);
  router.delete("/:transactionID", deleteTransaction);

  return router;
}
