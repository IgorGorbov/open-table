import { Prisma } from "@prisma/client";

import { prisma } from "@/shared/config";

export async function getRestaurantBySlug(
  slug: string,
  args?: Omit<Prisma.RestaurantFindUniqueArgs, "where">
) {
  return await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    ...args,
  });
}
