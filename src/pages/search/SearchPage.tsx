import React from "react";
import { GetServerSideProps } from "next";
import { SearchBar } from "@/features/search";
import {
  RestaurantCardProps,
  RestaurantCard,
  getRestaurants,
} from "@/entities/restaurant";
import { SearchSidebar } from "./ui";

interface Props {
  restaurants: RestaurantCardProps[];
}

export const SearchPage: React.FC<Props> = ({ restaurants = [] }) => {
  return (
    <>
      <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
        <SearchBar />
      </div>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar />
        <div className="w-5/6">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              variant="secondary"
              restaurant={restaurant}
            />
          ))}
          {restaurants.length === 0 && <p>Sorry, we found no restaurant in this area</p>}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const city = (query.city as string).trim().toLowerCase();

  const restaurants = await getRestaurants({
    where: {
      location: {
        name: {
          equals: city,
        },
      },
    },
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

  return {
    props: { restaurants },
  };
};
