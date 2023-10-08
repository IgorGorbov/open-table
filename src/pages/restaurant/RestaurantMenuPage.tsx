import React from "react";
import {
  Menu,
  RestaurantNavBar,
  RestaurantPageLayout,
} from "@/pages/restaurant/ui";

export const RestaurantMenuPage = () => {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar />
        <Menu />
      </div>
    </>
  );
};

RestaurantMenuPage.getLayout = function getLayout(page: React.ReactElement) {
  return <RestaurantPageLayout>{page}</RestaurantPageLayout>;
};
