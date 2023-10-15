import React from "react";
import { GetStaticProps } from "next";
import { Item, getRestaurantBySlug } from "@/entities/restaurant";
import { Menu, RestaurantNavBar, RestaurantPageLayout } from "./ui";

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  items: Item[];
}

interface Props {
  restaurant: Restaurant;
}

export const RestaurantMenuPage = ({ restaurant }: Props) => {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Menu menu={restaurant.items} />
      </div>
    </>
  );
};

RestaurantMenuPage.getLayout = function getLayout(
  page: React.ReactElement,
  { restaurant }: Props
) {
  return (
    <RestaurantPageLayout title={restaurant.name}>{page}</RestaurantPageLayout>
  );
};

export const getRestaurantMenuStaticProps: GetStaticProps = async ({
  params,
}) => {
  const restaurant = await getRestaurantBySlug(params?.slug as string, {
    select: {
      id: true,
      name: true,
      items: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
        },
      },
    },
  });

  return {
    props: {
      restaurant,
    },
  };
};

export const getRestaurantMenuStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: "",
        },
      },
    ],
    fallback: true,
  };
};
