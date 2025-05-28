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
exports.signUpController = exports.loginController = void 0;
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "email or password is not provided" });
    }
    try {
        const user = yield prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "email not found" });
        }
        const isPasswordSame = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (isPasswordSame) {
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ error: "login successful", token });
        }
        else {
            return res.status(401).json({ error: "password is incorrect" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error", message: error });
    }
});
exports.loginController = loginController;
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "email or password is not provided" });
    }
    try {
        const user = yield prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "email not found" });
        }
        const isPasswordSame = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (isPasswordSame) {
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ error: "login successful", token });
        }
        else {
            return res.status(401).json({ error: "password is incorrect" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error", message: error });
    }
});
exports.signUpController = signUpController;
