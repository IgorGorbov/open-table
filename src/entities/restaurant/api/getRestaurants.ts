import { Prisma } from "@prisma/client";

import { prisma } from "@/shared/config";

export async function getRestaurants(args?: Prisma.RestaurantFindManyArgs) {
  return await prisma.restaurant.findMany(args);
}
