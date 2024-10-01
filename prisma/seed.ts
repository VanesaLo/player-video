const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const videosJson = require("./videos.json");

const load = async () => {
  try {
    await prisma.videos.deleteMany();
    console.log("Deleted records in videos table");

    //  Reset Auto Increment for MariaDB
    await prisma.$queryRaw`ALTER TABLE videos AUTO_INCREMENT = 1;`;
    console.log("reset videos auto increment to 1");

    await prisma.videos.createMany({
      data: videosJson,
    });
    console.log("Added videos data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
