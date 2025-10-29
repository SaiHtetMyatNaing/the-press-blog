import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@/src/generated/client";

const prisma = new PrismaClient();

// Helper function to generate a slug from title
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper function to calculate reading time (based on word count)
function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

const CATEGORY_COUNT = 5;
const POST_COUNT = 50;

const createSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-") +
  "-" +
  faker.string.uuid().slice(0, 4);

async function main() {
  // Create Categories
  const categories = [
    { title: "Technology" },
    { title: "Travel" },
    { title: "Food & Cooking" },
    { title: "Fitness & Health" },
    { title: "Business" },
  ];

  console.log("📁 Creating categories...");
  const createdCategories = [];
  for (const category of categories) {
    const newCategory = await prisma.category.create({
      data: category,
    });
    createdCategories.push(newCategory);
    console.log(`  ✓ Created category: ${category.title}`);
  }

  for (const category of createdCategories) {
    const numberOfPosts = faker.number.int({ min: 3, max: 5 });

    for (let i = 0; i < numberOfPosts; i++) {
      const title = faker.lorem.sentence({ min: 5, max: 10 });
      const content = faker.lorem.paragraphs({ min: 5, max: 10 }, `\n\n`);

      const post: Prisma.PostCreateInput = await prisma.post.create({
        data: {
          title,
          slug: generateSlug(title),
          excerpt: faker.lorem.paragraph(),
          content: content,
          thumbnail: faker.image.url(),
          readingTime: calculateReadingTime(content),
          authorId: faker.string.uuid(),
          authorName: faker.person.fullName(),
          categoryId : category.id
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });