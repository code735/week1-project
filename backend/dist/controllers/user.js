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
exports.deleteUser = exports.updateUser = exports.addUsers = exports.getUsers = void 0;
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const crypto_1 = require("crypto");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit);
        if (!page || !limit) {
            const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
                const allUsers = yield prismaClient_1.default.user.findMany({
                    include: {
                        posts: true
                    }
                });
                return allUsers;
            });
            const usersWithPosts = yield getAllUsers();
            // console.log("usersWithPosts", usersWithPosts)
            res.status(200).json({
                data: usersWithPosts,
                currentPage: 1,
                totalPages: 1
            });
        }
        else {
            const skip = (page - 1) * limit;
            const [users, total] = yield Promise.all([
                prismaClient_1.default.user.findMany({
                    skip,
                    take: limit,
                }),
                prismaClient_1.default.user.count()
            ]);
            const totalPages = Math.ceil(total / limit);
            res.status(200).json({
                data: users,
                currentPage: page,
                totalPages
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", message: error });
    }
});
exports.getUsers = getUsers;
const addUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, password } = req.body;
        const userId = (_a = (0, crypto_1.randomUUID)()) === null || _a === void 0 ? void 0 : _a.slice(0, 6);
        const createUser = yield prismaClient_1.default.user.create({
            data: { id: userId, name, email, password }
        });
        res.status(200).json({ createUser });
    }
    catch (error) {
        console.error(error);
        next(error);
        // res.status(500).json({ error: "Internal server error", message: error })
    }
});
exports.addUsers = addUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updatedUser = yield prismaClient_1.default.user.update({
            where: { id },
            data: { name, email, password }
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield prismaClient_1.default.user.delete({
            where: { id }
        });
        res.status(200).json(deletedUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
    prismaClient_1.default.user.delete;
});
exports.deleteUser = deleteUser;
