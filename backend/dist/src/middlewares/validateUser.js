"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(1, "Name is required")
        .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets and spaces"),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
const validateUser = (req, res, next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: "Validation failed",
            issues: result.error.errors,
        });
    }
    else {
        req.body = result.data;
        next();
    }
};
exports.default = validateUser;
