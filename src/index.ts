import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
app.use(express.json())
const port = process.env.PORT;


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

app.post('/add-user', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const createUser = await prisma.user.create({
            data: { name, email, password }
        })

        res.status(200).json({ createUser})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.put('/update-user/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const updatedUser = await prisma.user.update({
            where : { id },
            data : { name, email, password }
        })

        res.status(200).json(updatedUser)
    }   
    catch (error) {
        console.error(error)
        res.status(500).json("Internal Server Error")
    }
})

app.delete("/delete-user/:id",async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser  = await prisma.user.delete({
            where : {id}
        })

        res.status(200).json(deletedUser)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user'});
    }
    prisma.user.delete
})

app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`)
})