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
exports.deleteComment = exports.updateComment = exports.addComment = void 0;
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, postId, userId } = req.body;
    try {
        const newComment = yield prismaClient_1.default.comment.create({
            data: { text, postId, userId }
        });
        res.status(200).json({ newComment });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error", message: e });
    }
});
exports.addComment = addComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const comment = yield prismaClient_1.default.comment.update({
            where: { id },
            data: { text }
        });
        res.status(200).json({
            message: "comment updated successfully!",
            updatedPost: comment,
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
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield prismaClient_1.default.comment.delete({
            where: { id },
        });
        res.status(200).json({
            message: "comment deleted successfully!",
            deletedPost: post,
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "error deleting comment",
            error: error
        });
    }
});
exports.deleteComment = deleteComment;
