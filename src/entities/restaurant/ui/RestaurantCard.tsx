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

type Variant = "primary" | "secondary";

interface Props {
  variant?: Variant;
  restaurant: RestaurantCardProps;
}

export const RestaurantCard: React.FC<Props> = ({
  variant = "primary",
  restaurant,
}) => {
  return variant === "primary" ? (
    <PrimaryCard restaurant={restaurant} />
  ) : (
    <SecondaryCard restaurant={restaurant} />
  );
};

const PrimaryCard: React.FC<Omit<Props, "variant">> = ({
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
            <p className="mr-3">{cuisine.name}</p>
            <Price price={price} />
            <p>{location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </div>
    </Link>
  );
};

export const SecondaryCard: React.FC<Omit<Props, "variant">> = ({
  restaurant: { name, main_image, slug, cuisine, location, price },
}) => {
  return (
    <div className="border-b flex pb-5">
      <img src={main_image} className="w-44 rounded" alt="restaurant image" />
      <div className="pl-5">
        <h2 className="text-3xl">{name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={price} />
            <p className="mr-2">{cuisine.name}</p>
            <p className="mr-2 capitalize">{location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};
