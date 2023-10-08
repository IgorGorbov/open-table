import React from "react";
import { Header, SearchSidebar, RestaurantCard } from "@/pages/search/ui";

export const SearchPage = () => {
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar />
        <div className="w-5/6">
          <RestaurantCard />
        </div>
      </div>
    </>
  );
};
