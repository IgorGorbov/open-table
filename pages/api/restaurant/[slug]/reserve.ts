import { NextApiRequest, NextApiResponse } from "next";

import { prisma, times } from "@/shared/config";
import { findAvailableTables } from "@/entities/availability";

interface QueryParams {
  slug?: string;
  day?: string;
  time?: string;
  partySize?: string;
}

interface Body {
  bookingFirstName: string;
  bookingLastName: string;
  bookingEmail: string;
  bookingPhone: string;
  bookingOccasion: string;
  bookerRequest: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const { slug, day, time, partySize } = request.query as QueryParams;

    const {
      bookingFirstName,
      bookingLastName,
      bookingEmail,
      bookingPhone,
      bookingOccasion,
      bookerRequest,
    } = request.body as Body;

    if (slug && day && time && partySize) {
      const restaurant = await prisma.restaurant.findUnique({
        where: {
          slug,
        },
        select: {
          id: true,
          tables: true,
          open_time: true,
          close_time: true,
        },
      });

      if (restaurant) {
        const date = new Date(`${day}T${time}`);
        const openDate = new Date(`${day}T${restaurant.open_time}`);
        const closeDate = new Date(`${day}T${restaurant.close_time}`);

        if (date >= openDate && closeDate <= closeDate) {
          const searchTimesWithTables = await findAvailableTables(
            restaurant,
            day,
            time
          );

          const searchTimesWithTable = searchTimesWithTables.find(
            (searchTime) => searchTime.date.toISOString() === date.toISOString()
          );

          if (searchTimesWithTable) {
            const tables = searchTimesWithTable.tables.reduce<
              Record<string, number[]>
            >((result, table) => {
              const seats = result[table.seats] || [];

              return { ...result, [table.seats]: seats.concat(table.id) };
            }, {});

            const tablesToBooks = tables[partySize];

            const booking = await prisma.booking.create({
              data: {
                restaurant_id: restaurant.id,
                number_of_people: parseInt(partySize),
                booking_time: date,
                booking_email: bookingEmail,
                booking_phone: bookingPhone,
                booking_first_name: bookingFirstName,
                booking_last_name: bookingLastName,
                booking_occasion: bookingOccasion,
                booker_request: bookerRequest,
              },
            });

            const bookingOnTablesData = tablesToBooks.map((tableId) => ({
              table_id: tableId,
              booking_id: booking.id,
            }));

            await prisma.bookingsOnTable.createMany({
              data: bookingOnTablesData,
            });

            return response.status(200).json(booking);
          }

          return response
            .status(400)
            .json({ errorMessage: "No availability, cannot book" });
        }
      }
    }

    response.status(400).json({ errorMessage: "Invalid data provided" });
  }

  response.end();
}
