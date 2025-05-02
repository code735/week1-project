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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure posts are deleted before users
    yield prisma.post.deleteMany();
    yield prisma.user.deleteMany();
    // Insert users
    yield prisma.user.createMany({
        data: [
            { name: "Bruce Wayne", email: "wayne@enterprices.com", password: "12345678" },
            { name: "Clark Kent", email: "clark@kent.com", password: "12345678" },
        ],
    });
    // Fetch inserted users
    const bruce = yield prisma.user.findUnique({ where: { email: "wayne@enterprices.com" } });
    const clark = yield prisma.user.findUnique({ where: { email: "clark@kent.com" } });
    if (!bruce || !clark) {
        throw new Error("Users not found");
    }
    // Insert posts
    yield prisma.post.createMany({
        data: [
            {
                caption: "My first post",
                type: "image",
                content: "https://www.google.com/",
                likes: 2,
                authorId: bruce.id,
            },
            {
                caption: "About Superman",
                type: "image",
                content: "https://www.google.com/",
                likes: 2,
                authorId: clark.id,
            },
        ],
    });
});
main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
