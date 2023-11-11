import { Router } from "express";
import createRouter from "express-promise-router";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from "./item.controller";

export function createItemsRouter(): Router {
  const router = createRouter();

  router.get("/", getAllItems);
  router.get("/:itemID", getItemById);
  router.post("/create", createItem);
  router.put("/:itemID", updateItem);
  router.delete("/:itemID", deleteItem);

  return router;
}
