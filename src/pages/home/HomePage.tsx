import React from "react";

import { Header } from "@/shared/ui";
import {
  RestaurantCardProps,
  RestaurantCards,
  RestaurantCard,
  getRestaurants,
} from "@/entities/restaurant";
import { SearchBar } from "@/features/search";

interface Props {
  restaurants: RestaurantCardProps[];
}

export const HomePage: React.FC<Props> = ({ restaurants }) => {
  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <RestaurantCards>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </RestaurantCards>
    </>
  );
};

export async function getStaticProps() {
  const restaurants = await getRestaurants({
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
      reviews: {
        select: {
          id: true,
          rating: true,
        },
      },
      slug: true,
      price: true,
    },
  });

  return {
    props: { restaurants },
  };
}
