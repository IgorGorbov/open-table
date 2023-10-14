import React, { PropsWithChildren } from "react";

export const RestaurantCards: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
      {children}
    </div>
  );
};
