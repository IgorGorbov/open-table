import React, { PropsWithChildren } from "react";
import { Header } from "@/pages/restaurant/ui/index";

export const RestaurantPageLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
};
