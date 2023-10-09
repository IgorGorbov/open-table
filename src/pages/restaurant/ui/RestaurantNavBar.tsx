import React from "react";
import Link from "next/link";

export const RestaurantNavBar: React.FC = () => {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href="/restaurant/milestone" className="mr-7">
        Overview
      </Link>
      <Link href="/restaurant/milestone/menu" className="mr-7">
        Menu
      </Link>
    </nav>
  );
};