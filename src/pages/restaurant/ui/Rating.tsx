import React from "react";
import pluralize from "pluralize";
import { Review, calcReviewRatingAverage } from "@/entities/restaurant";
import { Starts } from "@/shared/ui";

interface Props {
  reviews: Review[];
}

export const Rating: React.FC<Props> = ({ reviews }) => {
  const rating = calcReviewRatingAverage(reviews);

  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Starts rating={rating} />
        <p className="text-reg ml-3">{rating.toFixed(1)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} {pluralize("review", reviews.length)}
        </p>
      </div>
    </div>
  );
};
