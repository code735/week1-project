import { NextFunction, Request, Response } from "express";
import prisma from "../models/prismaClient";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginController = async (req: Request, res: Response): Promise<any> => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email or password is not provided" })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(401).json({ error: "email not found" })
    }

    const isPasswordSame = await bcrypt.compare(password, user?.password)

    if ( isPasswordSame ) {
      const token = jwt.sign(
        {userId: user.id, email: user.email},
        process.env.JWT_SECRET as string,
        { expiresIn: '1h'}
      )

      return res.status(201).json({ error: "login successful", token })
    }
    else {
      return res.status(401).json({ error: "password is incorrect" })
    }
  }
  catch (error) {
      return res.status(500).json({ error: "Internal Server Error", message: error })
  }
}

export const signUpController = async (req: Request, res: Response): Promise<any> => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email or password is not provided" })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(401).json({ error: "email not found" })
    }

    const isPasswordSame = await bcrypt.compare(password, user?.password)

    if ( isPasswordSame ) {
      const token = jwt.sign(
        {userId: user.id, email: user.email},
        process.env.JWT_SECRET as string,
        { expiresIn: '1h'}
      )

      return res.status(201).json({ error: "login successful", token })
    }
    else {
      return res.status(401).json({ error: "password is incorrect" })
    }
  }
  catch (error) {
      return res.status(500).json({ error: "Internal Server Error", message: error })
  }
}