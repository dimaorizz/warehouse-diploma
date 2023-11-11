import { Router } from "express";
import createRouter from "express-promise-router";
import {
  getAllProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
} from "./provider.controller";

export function createProviderRouter(): Router {
  const router = createRouter();

  router.get("/all", getAllProviders);
  router.get("/:providerID", getProviderById);
  router.post("/create", createProvider);
  router.put("/:providerID", updateProvider);
  router.delete("/:providerID", deleteProvider);

  return router;
}
