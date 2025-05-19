import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const users = [
    { name: "Bruce Wayne", email: "wayne@enterprices.com", password: "12345678" },
    { name: "Clark Kent", email: "clark@kent.com", password: "12345678" },
    { name: "Diana Prince", email: "diana@themyscira.com", password: "12345678" },
    { name: "Barry Allen", email: "barry@flash.com", password: "12345678" },
    { name: "Hal Jordan", email: "hal@lantern.com", password: "12345678" },
    { name: "Arthur Curry", email: "arthur@atlantis.com", password: "12345678" },
    { name: "Victor Stone", email: "victor@cyborg.com", password: "12345678" },
    { name: "Oliver Queen", email: "oliver@arrow.com", password: "12345678" },
    { name: "Lex Luthor", email: "lex@luthorcorp.com", password: "12345678" },
    { name: "Lois Lane", email: "lois@dailyplanet.com", password: "12345678" },
    { name: "Selina Kyle", email: "selina@catwoman.com", password: "12345678" },
    { name: "Harley Quinn", email: "harley@arkham.com", password: "12345678" },
    { name: "Pamela Isley", email: "ivy@gothamu.com", password: "12345678" },
    { name: "Edward Nigma", email: "riddler@enigma.com", password: "12345678" },
    { name: "Oswald Cobblepot", email: "penguin@gotham.com", password: "12345678" },
    { name: "Barbara Gordon", email: "barbara@oracle.com", password: "12345678" },
    { name: "James Gordon", email: "james@gcpd.com", password: "12345678" },
    { name: "Alfred Pennyworth", email: "alfred@wayne.com", password: "12345678" },
    { name: "Lucius Fox", email: "lucius@wayneenterprises.com", password: "12345678" },
    { name: "Jonathan Crane", email: "scarecrow@arkham.com", password: "12345678" },
    { name: "Rachel Dawes", email: "rachel@gothamda.com", password: "12345678" },
    { name: "Ra's al Ghul", email: "ras@league.com", password: "12345678" },
    { name: "Talia al Ghul", email: "talia@league.com", password: "12345678" },
    { name: "Bane", email: "bane@venom.com", password: "12345678" },
    { name: "Zatanna Zatara", email: "zatanna@magic.com", password: "12345678" },
    { name: "John Constantine", email: "john@hellblazer.com", password: "12345678" },
    { name: "Martian Manhunter", email: "jonn@mars.com", password: "12345678" },
    { name: "Wally West", email: "wally@flash.com", password: "12345678" },
    { name: "Kara Danvers", email: "kara@supergirl.com", password: "12345678" },
    { name: "Billy Batson", email: "billy@shazam.com", password: "12345678" },
  ];

  await prisma.user.createMany({ data: users });

  const bruce = await prisma.user.findUnique({ where: { email: "wayne@enterprices.com" } });
  const clark = await prisma.user.findUnique({ where: { email: "clark@kent.com" } });

  if (!bruce || !clark) throw new Error("Users not found");

  await prisma.post.createMany({
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
};

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
