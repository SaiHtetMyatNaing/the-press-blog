// seed-clean.ts
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* -------------------------------------------------
   Slug helper – “- - - of the title”
   ------------------------------------------------- */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, "")   // keep letters, digits, spaces
    .trim()
    .replace(/\s+/g, "-");          // one dash per space
}

/* -------------------------------------------------
   Reading-time helper
   ------------------------------------------------- */
function calculateReadingTime(content: string): number {
  const wpm = 200;
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.ceil(words / wpm);
}

/* -------------------------------------------------
   Main
   ------------------------------------------------- */
async function main() {


  /* ---------- 2. CREATE USERS ---------- */
  console.log("Creating 10 users…");
  const users = await Promise.all(
    Array.from({ length: 10 }, () =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          image: faker.image.avatar(),
        },
      })
    )
  );
  console.log(`   ${users.length} users created.\n`);

  /* ---------- 3. CREATE CATEGORIES (with slug) ---------- */
  const categoryTitles = [
    "Technology",
    "Travel",
    "Food & Cooking",
    "Fitness & Health",
    "Business",
  ];

  console.log("Creating categories with slug…");
  const categories = await Promise.all(
    categoryTitles.map(async (title) => {
      const slug = generateSlug(title);
      const cat = await prisma.category.create({
        data: { title},
      });
      console.log(`   ${title} → ${slug}`);
      return cat;
    })
  );
  console.log(`   ${categories.length} categories created.\n`);

  /* ---------- 4. CREATE POSTS ---------- */
  console.log("Creating posts…");
  let postCount = 0;

  for (const cat of categories) {
    const postsPerCat = faker.number.int({ min: 3, max: 5 });

    for (let i = 0; i < postsPerCat; i++) {
      const title = faker.lorem.sentence({ min: 5, max: 10 });
      const content = faker.lorem.paragraphs({ min: 5, max: 10 }, "\n\n");

      const author = users[faker.number.int({ min: 0, max: users.length - 1 })];

      const slug =
        generateSlug(title) + "-" + faker.string.uuid().slice(0, 4);

      await prisma.post.create({
        data: {
          title,
          slug,
          excerpt: faker.lorem.paragraph(),
          content,
          thumbnail: faker.image.url(),
          readingTime: calculateReadingTime(content),
          authorId: author.id,
          categoryId: cat.id,
        },
      });

      postCount++;
    }

    console.log(`   ${postsPerCat} posts for "${cat.title}"`);
  }

  console.log("\nSeeding finished!");
  console.log(`   Users:      ${users.length}`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Posts:      ${postCount}`);
}

/* -------------------------------------------------
   Run
   ------------------------------------------------- */
main()
  .catch((e) => {
    console.error("Seeding failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });