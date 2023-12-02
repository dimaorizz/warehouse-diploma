import { Router } from "express";
import createRouter from "express-promise-router";
import { loginUser, registerUser } from "./auth.controller";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import { UserRole } from "../../libs/enum";

export function createAuthRouter(): Router {
  const router = createRouter();

  router.post("/register", roleMiddleware(UserRole.Admin), registerUser);
  router.post("/login", loginUser);

  return router;
}
