import { useState } from "react";
import DatePicker from "react-datepicker";
import { partySize, times } from "@/shared/config";
import { filterTimeByRestaurantWindow } from "@/entities/restaurant";

interface Props {
  openTime: string;
  closeTime: string;
}

export const ReservationCard: React.FC<Props> = ({ openTime, closeTime }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date) => setSelectedDate(date);

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="">
          {partySize.map((size) => (
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
            selected={selectedDate}
            onChange={handleChangeDate}
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label>Time</label>
          <select className="py-3 border-b font-light">
            {filterTimeByRestaurantWindow(openTime, closeTime).map((time) => (
              <option key={time.time} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
          Find a Time
        </button>
      </div>
    </div>
  );
};
