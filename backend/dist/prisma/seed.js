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
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    yield prisma.post.deleteMany();
    yield prisma.user.deleteMany();
    const users = [
        { name: "Bruce Wayne", email: "wayne@enterprices.com", password: "12345678", id: (_a = (0, crypto_1.randomUUID)()) === null || _a === void 0 ? void 0 : _a.slice(0, 6) },
        { name: "Clark Kent", email: "clark@kent.com", password: "12345678", id: (_b = (0, crypto_1.randomUUID)()) === null || _b === void 0 ? void 0 : _b.slice(0, 6) },
        { name: "Diana Prince", email: "diana@themyscira.com", password: "12345678", id: (_c = (0, crypto_1.randomUUID)()) === null || _c === void 0 ? void 0 : _c.slice(0, 6) },
        { name: "Barry Allen", email: "barry@flash.com", password: "12345678", id: (_d = (0, crypto_1.randomUUID)()) === null || _d === void 0 ? void 0 : _d.slice(0, 6) },
        { name: "Hal Jordan", email: "hal@lantern.com", password: "12345678", id: (_e = (0, crypto_1.randomUUID)()) === null || _e === void 0 ? void 0 : _e.slice(0, 6) },
        { name: "Arthur Curry", email: "arthur@atlantis.com", password: "12345678", id: (_f = (0, crypto_1.randomUUID)()) === null || _f === void 0 ? void 0 : _f.slice(0, 6) },
        { name: "Victor Stone", email: "victor@cyborg.com", password: "12345678", id: (_g = (0, crypto_1.randomUUID)()) === null || _g === void 0 ? void 0 : _g.slice(0, 6) },
        { name: "Oliver Queen", email: "oliver@arrow.com", password: "12345678", id: (_h = (0, crypto_1.randomUUID)()) === null || _h === void 0 ? void 0 : _h.slice(0, 6) },
        { name: "Lex Luthor", email: "lex@luthorcorp.com", password: "12345678", id: (_j = (0, crypto_1.randomUUID)()) === null || _j === void 0 ? void 0 : _j.slice(0, 6) },
        { name: "Lois Lane", email: "lois@dailyplanet.com", password: "12345678", id: (_k = (0, crypto_1.randomUUID)()) === null || _k === void 0 ? void 0 : _k.slice(0, 6) },
        { name: "Selina Kyle", email: "selina@catwoman.com", password: "12345678", id: (_l = (0, crypto_1.randomUUID)()) === null || _l === void 0 ? void 0 : _l.slice(0, 6) },
        { name: "Harley Quinn", email: "harley@arkham.com", password: "12345678", id: (_m = (0, crypto_1.randomUUID)()) === null || _m === void 0 ? void 0 : _m.slice(0, 6) },
        { name: "Pamela Isley", email: "ivy@gothamu.com", password: "12345678", id: (_o = (0, crypto_1.randomUUID)()) === null || _o === void 0 ? void 0 : _o.slice(0, 6) },
        { name: "Edward Nigma", email: "riddler@enigma.com", password: "12345678", id: (_p = (0, crypto_1.randomUUID)()) === null || _p === void 0 ? void 0 : _p.slice(0, 6) },
        { name: "Oswald Cobblepot", email: "penguin@gotham.com", password: "12345678", id: (_q = (0, crypto_1.randomUUID)()) === null || _q === void 0 ? void 0 : _q.slice(0, 6) },
        { name: "Barbara Gordon", email: "barbara@oracle.com", password: "12345678", id: (_r = (0, crypto_1.randomUUID)()) === null || _r === void 0 ? void 0 : _r.slice(0, 6) },
        { name: "James Gordon", email: "james@gcpd.com", password: "12345678", id: (_s = (0, crypto_1.randomUUID)()) === null || _s === void 0 ? void 0 : _s.slice(0, 6) },
        { name: "Alfred Pennyworth", email: "alfred@wayne.com", password: "12345678", id: (_t = (0, crypto_1.randomUUID)()) === null || _t === void 0 ? void 0 : _t.slice(0, 6) },
        { name: "Lucius Fox", email: "lucius@wayneenterprises.com", password: "12345678", id: (_u = (0, crypto_1.randomUUID)()) === null || _u === void 0 ? void 0 : _u.slice(0, 6) },
        { name: "Jonathan Crane", email: "scarecrow@arkham.com", password: "12345678", id: (_v = (0, crypto_1.randomUUID)()) === null || _v === void 0 ? void 0 : _v.slice(0, 6) },
        { name: "Rachel Dawes", email: "rachel@gothamda.com", password: "12345678", id: (_w = (0, crypto_1.randomUUID)()) === null || _w === void 0 ? void 0 : _w.slice(0, 6) },
        { name: "Ra's al Ghul", email: "ras@league.com", password: "12345678", id: (_x = (0, crypto_1.randomUUID)()) === null || _x === void 0 ? void 0 : _x.slice(0, 6) },
        { name: "Talia al Ghul", email: "talia@league.com", password: "12345678", id: (_y = (0, crypto_1.randomUUID)()) === null || _y === void 0 ? void 0 : _y.slice(0, 6) },
        { name: "Bane", email: "bane@venom.com", password: "12345678", id: (_z = (0, crypto_1.randomUUID)()) === null || _z === void 0 ? void 0 : _z.slice(0, 6) },
        { name: "Zatanna Zatara", email: "zatanna@magic.com", password: "12345678", id: (_0 = (0, crypto_1.randomUUID)()) === null || _0 === void 0 ? void 0 : _0.slice(0, 6) },
        { name: "John Constantine", email: "john@hellblazer.com", password: "12345678", id: (_1 = (0, crypto_1.randomUUID)()) === null || _1 === void 0 ? void 0 : _1.slice(0, 6) },
        { name: "Martian Manhunter", email: "jonn@mars.com", password: "12345678", id: (_2 = (0, crypto_1.randomUUID)()) === null || _2 === void 0 ? void 0 : _2.slice(0, 6) },
        { name: "Wally West", email: "wally@flash.com", password: "12345678", id: (_3 = (0, crypto_1.randomUUID)()) === null || _3 === void 0 ? void 0 : _3.slice(0, 6) },
        { name: "Kara Danvers", email: "kara@supergirl.com", password: "12345678", id: (_4 = (0, crypto_1.randomUUID)()) === null || _4 === void 0 ? void 0 : _4.slice(0, 6) },
        { name: "Billy Batson", email: "billy@shazam.com", password: "12345678", id: (_5 = (0, crypto_1.randomUUID)()) === null || _5 === void 0 ? void 0 : _5.slice(0, 6) },
    ];
    yield prisma.user.createMany({ data: users });
    const bruce = yield prisma.user.findUnique({ where: { email: "wayne@enterprices.com" } });
    const clark = yield prisma.user.findUnique({ where: { email: "clark@kent.com" } });
    if (!bruce || !clark)
        throw new Error("Users not found");
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
