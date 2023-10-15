import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Location } from "@/entities/location";
import { Cuisine } from "@/entities/cuisine";
import { PRICE } from "@prisma/client";

const prices = [
  { price: PRICE.CHEAP, text: "$" },
  { price: PRICE.REGULAR, text: "$$" },
  { price: PRICE.EXPENSIVE, text: "$$$" },
];

interface Props {
  locations: Location[];
  cuisines: Cuisine[];
}

export const SearchSidebar: React.FC<Props> = ({ locations, cuisines }) => {
  const pathname = usePathname();

  const searchParams = useSearchParams() || {};

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    return params.toString();
  };

  return (
    <div className="w-1/4 pr-6">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={pathname + "?" + createQueryString("city", location.name)}
            key={location.id}
            className="font-light text-reg capitalize"
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={pathname + "?" + createQueryString("cuisine", cuisine.name)}
            key={cuisine.id}
            className="font-light text-reg capitalize"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex gap-2 text-sm">
          {prices.map(({ price, text }) => (
            <Link
              key={price}
              href={pathname + "?" + createQueryString("price", price)}
              className="border w-full text-center text-reg font-light rounded-l p-2"
            >
              {text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
