const { PrismaClient } = require("@prisma/client");
const { fakerRU } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  /** Чистим старые данные (если есть) */
  await prisma.voter.deleteMany();
  await prisma.idea.deleteMany();

  /** Создаем тестовые данные */
  const mockIdeas = Array(20)
    .fill(0)
    .map(() => ({
      title: fakerRU.company?.buzzVerb(),
      text: fakerRU.company.catchPhrase(),
    }));

  /** Заполняем */
  const ideas = await Promise.all(
    mockIdeas.map((data) => prisma.idea.create({ data }))
  );

  console.log("Сид-данные заполнены!", ideas);
}

main()
  .catch((e) => {
    console.error("Ошибка при заполнении сид-данных", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
