import { z } from "zod";
import { NextFunction, Request, Response } from 'express';

const userSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets and spaces"),
  email: z.string().email(),
  password: z.string().min(8)
})

const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Validation failed",
      issues: result.error.errors,
    });
  } else {
    req.body = result.data;
    next();
  }
};

export default validateUser;