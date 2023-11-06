import { Table } from "@prisma/client";

import { findAvailableTables } from "./findAvailableTables";

interface Restaurant {
  tables: Table[];
  open_time: string;
  close_time: string;
}

export async function getAvailabilities(
  restaurant: Restaurant,
  day: string,
  time: string,
  partySize: number
) {
  const openDate = new Date(`${day}T${restaurant.open_time}`);
  const closeDate = new Date(`${day}T${restaurant.close_time}`);

  const searchTimesWithTables = await findAvailableTables(
    restaurant,
    day,
    time
  );

  return searchTimesWithTables
    .map((searchTimesWithTable) => {
      const seatCount = searchTimesWithTable.tables.reduce(
        (result, table) => result + table.seats,
        0
      );

      return {
        time: searchTimesWithTable.time,
        available: seatCount >= partySize,
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHours =
        new Date(`${day}T${availability.time}`) >= openDate;

      const timeIsBeforeClosingHours =
        new Date(`${day}T${availability.time}`) <= closeDate;

      return timeIsAfterOpeningHours && timeIsBeforeClosingHours;
    });
}
