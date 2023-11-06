import { ChangeEvent, useState } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import { partySizes } from "@/shared/config";
import { filterTimeByRestaurantWindow } from "@/entities/restaurant";
import { useAvailabilities } from "@/entities/availability";
import { convertToDisplayTime, formatDate } from "@/shared/lib";
import { Loader } from "@/shared/ui";

interface Props {
  slug: string;
  openTime: string;
  closeTime: string;
}

export const ReservationCard: React.FC<Props> = ({
  slug,
  openTime,
  closeTime,
}) => {
  const { availabilities, loading, error, fetchAvailabilities } =
    useAvailabilities(slug);

  const [partySize, setPartySize] = useState<number>(1);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>(openTime);

  const day = formatDate(date);

  const handleChangePartySize = (event: ChangeEvent<HTMLSelectElement>) =>
    setPartySize(Number(event.target.value));

  const handleChangeDate = (date: Date) => setDate(date);

  const handleChangeTime = (event: ChangeEvent<HTMLSelectElement>) =>
    setTime(event.target.value);

  const handleClick = () => fetchAvailabilities(day, time, partySize);

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          value={partySize}
          onChange={handleChangePartySize}
        >
          {partySizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label>Date</label>
          <DatePicker
            className="py-3 font-light border-b text-reg w-24 leading-tight"
            dateFormat="MMMM d"
            selected={date}
            onChange={handleChangeDate}
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label>Time</label>
          <select
            className="py-3 border-b font-light"
            value={time}
            onChange={handleChangeTime}
          >
            {filterTimeByRestaurantWindow(openTime, closeTime).map((time) => (
              <option key={time.time} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>{error}</div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? <Loader /> : "Find a Time"}
        </button>

        <div className="flex flex-wrap gap-3 mt-4">
          {availabilities.map((availability) => {
            return availability.available ? (
              <Link
                key={availability.time}
                href={`/reserve/${slug}?date=${day}T${availability.time}&partySize=${partySize}`}
                className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white rounded"
              >
                <p className="text-sm font-bold">
                  {convertToDisplayTime(availability.time)}
                </p>
              </Link>
            ) : (
              <p
                key={availability.time}
                className="bg-gray-300 p-2 w-24 rounded"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
