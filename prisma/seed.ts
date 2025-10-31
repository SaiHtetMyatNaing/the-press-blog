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

  // Create Users first
  console.log("👤 Creating users...");
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
      },
    });
    users.push(user);
    console.log(`  ✓ Created user: ${user.name}`);
  }

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

  // Create Posts
  console.log("📝 Creating posts...");
  let totalPosts = 0;

  for (const category of createdCategories) {
    const numberOfPosts = faker.number.int({ min: 3, max: 5 });

    for (let i = 0; i < numberOfPosts; i++) {
      const title = faker.lorem.sentence({ min: 5, max: 10 });
      const content = faker.lorem.paragraphs({ min: 5, max: 10 }, `\n\n`);
      
      // Pick a random user as author
      const randomUser = users[faker.number.int({ min: 0, max: users.length - 1 })];

      await prisma.post.create({
        data: {
          title,
          slug: generateSlug(title) + "-" + faker.string.uuid().slice(0, 4), // Ensure uniqueness
          excerpt: faker.lorem.paragraph(),
          content: content,
          thumbnail: faker.image.url(),
          readingTime: calculateReadingTime(content),
          authorId: randomUser.id, // Use actual user ID
          categoryId: category.id,
        },
      });
      
      totalPosts++;
    }
    console.log(`  ✓ Created ${numberOfPosts} posts for ${category.title}`);
  }

  console.log(`\n✅ Seeding completed successfully!`);
  console.log(`   - ${users.length} users created`);
  console.log(`   - ${createdCategories.length} categories created`);
  console.log(`   - ${totalPosts} posts created`);
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