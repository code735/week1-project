"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const postRoutes_1 = __importDefault(require("../routes/postRoutes"));
const cors = require('cors');
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(cors());
app.use('/api/users', userRoutes_1.default);
app.use('/api/users', postRoutes_1.default);
const userSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(1, "Name is required")
        .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets and spaces"),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
const validateUser = (req, res, next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: "Validation failed",
            issues: result.error.errors,
        });
    }
    else {
        req.body = result.data;
        next();
    }
};
exports.validateUser = validateUser;
app.get("/", (req, res) => {
    res.send("hello");
});
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        message: err.message || "Internal server error",
        stack: err.stack
    });
});
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});
