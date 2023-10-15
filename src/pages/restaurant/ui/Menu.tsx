import React from "react";

import { Item } from "@/entities/restaurant";

import { MenuCard } from "./MenuCard";

interface Props {
  menu: Item[];
}

export const Menu: React.FC<Props> = ({ menu }) => {
  return (
    <div className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
