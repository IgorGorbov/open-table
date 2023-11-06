import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/shared/config";
import {
  findAvailableTables,
  getAvailabilities,
} from "@/entities/availability";

interface QueryParams {
  slug?: string;
  day?: string;
  time?: string;
  partySize?: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { slug, day, time, partySize } = request.query as QueryParams;

  if (slug && day && time && partySize) {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
      },
    });

    if (restaurant) {
      const searchTimesWithTables = await findAvailableTables(
        restaurant,
        day,
        time
      );

      if (searchTimesWithTables) {
        const availabilities = await getAvailabilities(
          restaurant,
          day,
          time,
          parseInt(partySize)
        );

        return response.status(200).json(availabilities);
      }
    }
  }

  response.status(400).json({ errorMessage: "Invalid data provided" });
}
