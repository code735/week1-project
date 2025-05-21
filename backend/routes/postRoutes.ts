import { Router } from "express";
import { addPost, deletePost, updatePost } from "../controllers/postController";

const router = Router();

router.post('/add',addPost)
router.put("/update/:id",updatePost)
router.delete("/delete/:id",deletePost)


export default router;