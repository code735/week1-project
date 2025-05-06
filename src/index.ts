import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import { randomUUID } from 'crypto';
const prisma = new PrismaClient();
import dotenv from "dotenv";
dotenv.config();
import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { z } from 'zod';
const app = express();
app.use(express.json())
const port = process.env.PORT;


const userSchema = z.object({
    name: z.string().min(1),
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

app.get("/users", async (req, res) => {
    try {
        const getAllUsers = async () => {
            const allUsers = await prisma.user.findMany({
                include: {
                    posts: true
                }
            })

            return allUsers;
        }

        const usersWithPosts = await getAllUsers();

        console.log("usersWithPosts", usersWithPosts)

        res.status(200).json(usersWithPosts)
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})

app.post('/add-user', validateUser, async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userId = randomUUID()?.slice(0,6);
        const createUser = await prisma.user.create({
            data: { id: userId, name, email, password }
        })

        res.status(200).json({ createUser })
    }
    catch (error) {
        console.error(error)
        next(error)
        // res.status(500).json({ error: "Internal server error", message: error })
    }
})

app.put('/update-user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email, password }
        })

        res.status(200).json(updatedUser)
    }
    catch (error) {
        console.error(error)
        res.status(500).json("Internal Server Error")
    }
})

app.delete("/delete-user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await prisma.user.delete({
            where: { id }
        })

        res.status(200).json(deletedUser)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
    prisma.user.delete
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