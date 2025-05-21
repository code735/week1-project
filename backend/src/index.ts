import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import dotenv from "dotenv";
import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { date, promise, z } from 'zod';
import userRoutes from '../routes/userRoutes'
import postRoutes from '../routes/postRoutes'
const cors = require('cors')
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT;
dotenv.config();

app.use(express.json())
app.use(cors())
app.use('/api/users',userRoutes)
app.use('/api/users',postRoutes)

const userSchema = z.object({
	name: z.string()
		.min(1, "Name is required")
		.regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets and spaces"),
	email: z.string().email(),
	password: z.string().min(8)
})

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
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

interface CustomError extends Error {
	status?: number;
}

app.get("/", (req, res) => {
	res.send("hello")
})

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
	const status = err.status || 500;

	res.status(status).json({
		message: err.message || "Internal server error",
		stack: err.stack
	});
})

app.listen(port, () => {
	console.log(`server is listening on http://localhost:${port}`)
})