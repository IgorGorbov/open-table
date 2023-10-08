"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter();

  const [location, setLocation] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleClick = () => router.push("/search");

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        type="text"
        value={location}
        placeholder="State, city or town"
        className="rounded  mr-3 p-2 w-[450px]"
        onChange={handleChange}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={handleClick}
      >
        Let's go
      </button>
    </div>
  );
};
