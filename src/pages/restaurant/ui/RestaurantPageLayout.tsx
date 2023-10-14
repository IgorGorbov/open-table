import React, { PropsWithChildren } from "react";
import { Header } from "@/pages/restaurant/ui/index";

interface Props {
  title: string;
}

export const RestaurantPageLayout: React.FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  return (
    <>
      <Header title={title} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
};
