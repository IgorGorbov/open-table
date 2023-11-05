import React from "react";
import { GetStaticProps } from "next";
import {
  Review,
  getRestaurantBySlug,
  getRestaurants,
} from "@/entities/restaurant";
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
  reviews: Review[];
  open_time: string;
  close_time: string;
}

interface Props {
  restaurant: Restaurant;
}

export const RestaurantDetailsPage = ({
  restaurant: {
    name,
    description,
    images,
    slug,
    reviews,
    open_time,
    close_time,
  },
}: Props) => {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={slug} />
        <Title name={name} />
        <Rating reviews={reviews} />
        <Description description={description} />
        <Images images={images} />
        <Reviews reviews={reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard openTime={open_time} closeTime={close_time} />
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

export const getRestaurantDetailsStaticProps: GetStaticProps = async ({
  params,
}) => {
  const restaurant = await getRestaurantBySlug(params?.slug as string, {
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      open_time: true,
      close_time: true,
      reviews: {
        select: {
          id: true,
          rating: true,
          text: true,
          first_name: true,
          last_name: true,
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
            },
          },
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

export const getRestaurantDetailsStaticPaths = async () => {
  const restaurants = await getRestaurants({
    select: {
      slug: true,
    },
  });

  const paths = restaurants.map((restaurant) => {
    return {
      params: {
        slug: restaurant.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
