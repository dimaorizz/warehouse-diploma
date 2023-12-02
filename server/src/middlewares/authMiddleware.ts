import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  jwt.verify(token, "secret", (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
