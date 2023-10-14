import React from "react";
import { GetStaticProps } from "next";

import { getRestaurantBySlug } from "@/entities/restaurant";
import {
  Description,
  Images,
  Rating,
  ReservationCard,
  RestaurantNavBar,
  RestaurantPageLayout,
  Reviews,
  Title,
} from "./ui";

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
}

interface Props {
  restaurant: Restaurant;
}

export const RestaurantDetailsPage = ({
  restaurant: { name, description, images, slug },
}: Props) => {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={slug} />
        <Title name={name} />
        <Rating />
        <Description description={description} />
        <Images images={images} />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
};

RestaurantDetailsPage.getLayout = function getLayout(
  page: React.ReactElement,
  { restaurant }: Props
) {
  return (
    <RestaurantPageLayout title={restaurant.name}>{page}</RestaurantPageLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const restaurant = await getRestaurantBySlug(params?.slug as string, {
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
    },
  });

  return {
    props: {
      restaurant,
    },
  };
};

export const getStaticPaths = async () => {
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
