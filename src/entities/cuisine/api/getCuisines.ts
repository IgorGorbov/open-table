import { Prisma } from "@prisma/client";

import { prisma } from "@/shared/config";

export async function getCuisines(args?: Prisma.CuisineFindManyArgs) {
  return await prisma.cuisine.findMany(args);
}
