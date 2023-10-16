import React from "react";
import pluralize from "pluralize";
import { Review } from "@/entities/restaurant";

import { ReviewCard } from "./Review";

interface Props {
  reviews: Review[];
}

export const Reviews: React.FC<Props> = ({ reviews }) => {
  console.log("reviews", reviews);
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        What {reviews.length} {pluralize("people", reviews.length)} are saying
      </h1>
      <div>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
