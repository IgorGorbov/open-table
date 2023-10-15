import React from "react";
import { GetServerSideProps } from "next";
import { SearchBar } from "@/features/search";
import {
  RestaurantCardProps,
  RestaurantCard,
  getRestaurants,
  getFilter,
} from "@/entities/restaurant";
import { Location, getLocations } from "@/entities/location";
import { Cuisine, getCuisines } from "@/entities/cuisine";
import { SearchSidebar } from "./ui";
import { ParsedUrlQuery } from "querystring";

interface Props {
  restaurants: RestaurantCardProps[];
  locations: Location[];
  cuisines: Cuisine[];
}

export const SearchPage: React.FC<Props> = ({
  restaurants = [],
  locations,
  cuisines,
}) => {
  return (
    <>
      <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
        <SearchBar />
      </div>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar locations={locations} cuisines={cuisines} />
        <div className="w-5/6">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              variant="secondary"
              restaurant={restaurant}
            />
          ))}
          {restaurants.length === 0 && (
            <p>Sorry, we found no restaurant in this area</p>
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const filter = getFilter(query);

  const restaurants = await getRestaurants({
    where: filter,
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: {
        select: {
          name: true,
        },
      },
      location: {
        select: {
          name: true,
        },
      },
      slug: true,
      price: true,
    },
  });

  const locations = await getLocations({
    select: {
      id: true,
      name: true,
    },
  });

  const cuisines = await getCuisines({
    select: {
      id: true,
      name: true,
    },
  });

  return {
    props: { restaurants, locations, cuisines },
  };
};
