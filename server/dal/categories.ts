import "server-only";
import { cache } from "react";
import { prisma } from "../db/prisma";

// Get all categories (to filter the UI)
export const getAllCategories = cache(async () => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  return categories;
});

export const getCategoryById = cache(async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return category?.title;
});
