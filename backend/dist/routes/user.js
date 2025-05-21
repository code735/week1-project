"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const validateUser_1 = __importDefault(require("../src/middlewares/validateUser"));
const router = express_1.default.Router();
router.get('/', user_1.getUsers);
router.post('/add', validateUser_1.default, user_1.addUsers);
router.put('/update/:id', user_1.updateUser);
router.delete('/delete/:id', user_1.deleteUser);
exports.default = router;
