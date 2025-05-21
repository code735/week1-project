import { Router } from "express";
import { addComment, deleteComment, updateComment } from "../controllers/commentController";

const router = Router();

router.post('/add',addComment)
router.put("/update/:id",updateComment)
router.delete("/delete/:id",deleteComment)


export default router;