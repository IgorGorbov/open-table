import { NextApiRequest, NextApiResponse } from "next";

import { prisma, times } from "@/shared/config";

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
    const searchTimes = times.find((t) => t.time === time)?.searchTimes;

    if (searchTimes) {
      const bookings = await prisma.booking.findMany({
        where: {
          booking_time: {
            gte: new Date(`${day}T${searchTimes.at(0)}`),
            lte: new Date(`${day}T${searchTimes.at(-1)}`),
          },
        },
        select: {
          number_of_people: true,
          booking_time: true,
          tables: true,
        },
      });

      const bookingTables = bookings.reduce<
        Record<string, Record<string, boolean>>
      >((result, booking) => {
        const bookingTime = booking.booking_time.toISOString();

        const tables = booking.tables.reduce((res, table) => {
          return {
            ...res,
            [table.table_id]: true,
          };
        }, {});

        return { ...result, [bookingTime]: tables };
      }, {});

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
        const openDate = new Date(`${day}T${restaurant.open_time}`);
        const closeDate = new Date(`${day}T${restaurant.close_time}`);

        const { tables } = restaurant;

        const searchTimesWithTables = searchTimes.map((searchTime) => {
          const date = new Date(new Date(`${day}T${searchTime}`));

          return {
            date,
            time: searchTime,
            tables: tables.filter(
              (table) => !bookingTables[date.toISOString()]?.[table.id]
            ),
          };
        });

        const availabilities = searchTimesWithTables
          .map((searchTimesWithTable) => {
            const seatCount = searchTimesWithTable.tables.reduce(
              (result, table) => result + table.seats,
              0
            );

            return {
              time: searchTimesWithTable.time,
              available: seatCount >= parseInt(partySize),
            };
          })
          .filter((availability) => {
            const timeIsAfterOpeningHours =
              new Date(`${day}T${availability.time}`) >= openDate;

            const timeIsBeforeClosingHours =
              new Date(`${day}T${availability.time}`) <= closeDate;

            return timeIsAfterOpeningHours && timeIsBeforeClosingHours;
          });

        return response.status(200).json(availabilities);
      }
    }
  }

  response.status(400).json({ errorMessage: "Invalid data provided" });
}
