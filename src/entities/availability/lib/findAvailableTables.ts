import { Table } from "@prisma/client";
import { prisma, times } from "@/shared/config";

interface Restaurant {
  tables: Table[];
  open_time: string;
  close_time: string;
}

export async function findAvailableTables(
  restaurant: Restaurant,
  day: string,
  time: string
) {
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

    return searchTimesWithTables;
  }

  return [];
}
