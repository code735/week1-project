"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validateUser_1 = __importDefault(require("../src/middlewares/validateUser"));
const router = express_1.default.Router();
router.get('/', userController_1.getUsers);
router.post('/add', validateUser_1.default, userController_1.addUsers);
router.put('/update/:id', userController_1.updateUser);
router.delete('/delete/:id', userController_1.deleteUser);
exports.default = router;
