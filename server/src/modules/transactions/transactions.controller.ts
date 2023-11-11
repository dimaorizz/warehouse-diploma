import { Request, Response } from "express";
import _ from "lodash";
import Transaction from "../../libs/models/transation.model";

export async function getAllTransactions(req: Request, res: Response) {
  try {
    const data = await Transaction.query();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getTransactionById(req: Request, res: Response) {
  try {
    const { transactionID } = req.params;
    const data = await Transaction.query().findById(transactionID);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createTransaction(req: Request, res: Response) {
  try {
    const transaction = req.body;
    const data = await Transaction.query().insertAndFetch(transaction);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateTransaction(req: Request, res: Response) {
  try {
    const { transactionID } = req.params;
    const transaction = req.body;
    await Transaction.query().findById(transactionID).patch(transaction);
    const data = await Transaction.query().findById(transactionID);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  try {
    const { transactionID } = req.params;
    const data = await Transaction.query().findById(transactionID);
    await Transaction.query().deleteById(transactionID);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
