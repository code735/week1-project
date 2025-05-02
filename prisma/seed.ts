import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  // Ensure posts are deleted before users
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Insert users
  await prisma.user.createMany({
    data: [
      { name: "Bruce Wayne", email: "wayne@enterprices.com", password: "12345678" },
      { name: "Clark Kent", email: "clark@kent.com", password: "12345678" },
    ],
  });

  // Fetch inserted users
  const bruce = await prisma.user.findUnique({ where: { email: "wayne@enterprices.com" } });
  const clark = await prisma.user.findUnique({ where: { email: "clark@kent.com" } });

  if (!bruce || !clark) {
    throw new Error("Users not found");
  }

  // Insert posts
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
