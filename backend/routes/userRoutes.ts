import express from 'express';
import { addUsers, deleteUser, getUsers, updateUser } from '../controllers/userController';
import validateUser from '../src/middlewares/validateUser';
const router = express.Router();


router.get('/', getUsers)
router.post('/add', validateUser, addUsers)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router;