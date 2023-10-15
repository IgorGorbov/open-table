import { Prisma } from "@prisma/client";

import { prisma } from "@/shared/config";

export async function getLocations(args?: Prisma.LocationFindManyArgs) {
  return await prisma.location.findMany(args);
}
