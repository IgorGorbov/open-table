import React from "react";
import {
  Description,
  Images,
  Rating,
  ReservationCard,
  RestaurantNavBar,
  RestaurantPageLayout,
  Reviews,
  Title,
} from "@/pages/restaurant/ui";

export const RestaurantDetailsPage = () => {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar />
        <Title />
        <Rating />
        <Description />
        <Images />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
};

RestaurantDetailsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <RestaurantPageLayout>{page}</RestaurantPageLayout>;
};
