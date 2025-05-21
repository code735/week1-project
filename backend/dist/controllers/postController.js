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
exports.deletePost = exports.updatePost = exports.addPost = void 0;
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { caption, type, content, likes, authorId } = req.body;
    try {
        const newPost = yield prismaClient_1.default.post.create({
            data: { caption, type, content, likes, authorId }
        });
        res.status(200).json({ message: "Post created successfully", post: newPost });
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server error", message: err });
    }
});
exports.addPost = addPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { caption, type, content } = req.body;
    try {
        const post = yield prismaClient_1.default.post.update({
            where: { id },
            data: { caption, type, content }
        });
        res.status(200).json({
            message: "Post updated successfully!",
            updatedPost: post,
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "error updating post",
            error: error
        });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield prismaClient_1.default.post.delete({
            where: { id },
        });
        res.status(200).json({
            message: "Post deleted successfully!",
            deletedPost: post,
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "error deleting post",
            error: error
        });
    }
});
exports.deletePost = deletePost;
