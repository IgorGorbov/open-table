import React from "react";
import Link from "next/link";

interface Props {
  slug: string;
}

export const RestaurantNavBar: React.FC<Props> = ({ slug }) => {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href={`/restaurant/${slug}`} className="mr-7">
        Overview
      </Link>
      <Link href={`/restaurant/${slug}/menu`} className="mr-7">
        Menu
      </Link>
    </nav>
  );
};
