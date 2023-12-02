import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../libs/models/user.model";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.query().insert({
      username,
      password: hashedPassword,
      role,
    });

    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await User.query().where("username", username).first();

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, "secret", {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
