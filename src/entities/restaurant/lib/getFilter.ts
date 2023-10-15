import { ParsedUrlQuery } from "querystring";
import { PRICE, Prisma } from "@prisma/client";

export const getFilter = (
  query: ParsedUrlQuery
): Prisma.RestaurantWhereInput => {
  const filter: Prisma.RestaurantWhereInput = {};

  if (typeof query.city === "string") {
    filter.location = {
      name: {
        equals: query.city.toLowerCase(),
      },
    };
  }

  if (typeof query.cuisine === "string") {
    filter.cuisine = {
      name: {
        equals: query.cuisine,
      },
    };
  }

  if (typeof query.price === "string") {
    filter.price = {
      equals: query.price as PRICE,
    };
  }

  return filter;
};
