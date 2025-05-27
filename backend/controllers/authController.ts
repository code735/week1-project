import { NextFunction, Request, Response } from "express";
import prisma from "../models/prismaClient";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginFunction = async (req: Request, res: Response): Promise<any> => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email or password is not provided" })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ error: "user not found" })
    }

    const isPasswordSame = await bcrypt.compare(password, user?.password)

    if ( isPasswordSame ) {
      // const token = jwt.sign(
      //   {},
      //   process.env.JWT_SECRET as String,
      // )

      return res.status(400).json({ error: "user not found" })

    }
  }
  catch (error) {
      return res.status(500).json({ error: "Internal Server Error", message: error })
  }


}