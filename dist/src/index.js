"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("hello");
});
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
            const allUsers = yield prisma.user.findMany({
                include: {
                    posts: true
                }
            });
            return allUsers;
        });
        const usersWithPosts = yield getAllUsers();
        console.log("usersWithPosts", usersWithPosts);
        res.status(200).json(usersWithPosts);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.post('/add-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const createUser = yield prisma.user.create({
            data: { name, email, password }
        });
        res.status(200).json({ createUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.put('/update-user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updatedUser = yield prisma.user.update({
            where: { id },
            data: { name, email, password }
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
}));
app.delete("/delete-user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield prisma.user.delete({
            where: { id }
        });
        res.status(200).json(deletedUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
    prisma.user.delete;
}));
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});
