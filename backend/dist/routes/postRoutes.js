"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const router = (0, express_1.Router)();
router.post('/add', postController_1.addPost);
router.put("/update/:id", postController_1.updatePost);
router.delete("/delete/:id", postController_1.deletePost);
exports.default = router;
