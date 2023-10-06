"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const Header = () => {
  const router = useRouter();

  const [location, setLocation] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleClick = () => router.push("/search");

  return (
    <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
      <div className="text-center mt-10">
        <h1 className="text-white text-5xl font-bold mb-2">
          Find your table for any occasion
        </h1>
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
      </div>
    </div>
  );
};
