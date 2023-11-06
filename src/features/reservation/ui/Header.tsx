import React from "react";
import pluralize from "pluralize";
import { Time, convertToDisplayTime, formatDate } from "@/shared/lib";

interface Props {
  name: string;
  image: string;
  date: string;
  partySize: string;
}

export const Header: React.FC<Props> = ({ name, image, date, partySize }) => {
  const [day, time] = date.split("T");

  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img className="w-32 h-18 rounded" src={image} alt="restaurant image" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{formatDate(date)}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">
              {partySize} {pluralize("people", parseInt(partySize))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
