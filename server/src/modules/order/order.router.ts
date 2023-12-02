import { Router } from "express";
import createRouter from "express-promise-router";
import {
  changeStatus,
  deleteOrderById,
  getOrderById,
  getOrders,
  postOrder,
} from "./order.controller";

export function createOrderRouter(): Router {
  const router = createRouter();

  router.get("/", getOrders);
  router.get("/:id", getOrderById);
  router.post("/", postOrder);
  router.delete("/:id", deleteOrderById);
  router.put("/:id", changeStatus);

  return router;
}
