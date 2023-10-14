import React from "react";
import Link from "next/link";

import { PRICE, Cuisine, Location } from "../types";
import { Price } from "./Price";

export interface RestaurantCardProps {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  slug: string;
  price: PRICE;
}

interface Props {
  restaurant: RestaurantCardProps;
}

export const RestaurantCard: React.FC<Props> = ({
  restaurant: { name, main_image, cuisine, location, slug, price },
}) => {
  return (
    <Link href={`/restaurant/${slug}`}>
      <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
        <img src={main_image} className="w-full h-36" alt="restaurant image" />
        <div className="p-1 text-black">
          <h3 className="font-bold text-2xl mb-2">{name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2">77 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{cuisine.name}</p>
            <Price price={price} />
            <p>{location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </div>
    </Link>
  );
};
