import React from "react";
import { Review } from "@/entities/restaurant";
import { Starts } from "@/shared/ui";

interface Props {
  review: Review;
}

export const ReviewCard: React.FC<Props> = ({
  review: { first_name, last_name, text, rating },
}) => {
  return (
    <div className="border-b pb-7 mb-7">
      <div className="flex">
        <div className="w-1/6 flex flex-col items-center">
          <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
            <h2 className="text-white text-2xl uppercase">U</h2>
          </div>
          <p className="text-center">
            {first_name} {last_name}
          </p>
        </div>
        <div className="ml-10 w-5/6">
          <div className="flex items-center">
            <Starts rating={rating} />
          </div>
          <div className="mt-5">
            <p className="text-lg font-light">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
