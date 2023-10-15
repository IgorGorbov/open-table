"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter();

  const searchParams = useSearchParams()!;

  const [location, setLocation] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    return params.toString();
  };

  const handleClick = () => {
    router.push("/search" + "?" + createQueryString("city", location));
  };

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