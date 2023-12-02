import { NextFunction, Request, Response } from "express";
import { UserRole } from "../libs/enum";

export const roleMiddleware = (role: UserRole) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
};
