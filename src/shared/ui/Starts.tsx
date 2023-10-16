import React from "react";
import Image, { StaticImageData } from "next/image";

import FullStarImage from "../../../public/icons/full-star.png";
import HalfStarImage from "../../../public/icons/half-star.png";
import EmptyStarImage from "../../../public/icons/empty-star.png";

const getStars = (
  rating: number,
  stars: StaticImageData[] = []
): StaticImageData[] => {
  if (stars.length === 5) return stars;

  if (rating >= 1) {
    return getStars(rating - 1, [...stars, FullStarImage]);
  }

  if (rating >= 0.5) {
    return getStars(rating - 1, [...stars, HalfStarImage]);
  }

  return getStars(rating - 1, [...stars, EmptyStarImage]);
};

interface Props {
  rating: number;
}

export const Starts: React.FC<Props> = ({ rating }) => {
  const starts = getStars(rating);

  return (
    <div className="flex items-center">
      {starts.map((star, index) => (
        <Image key={index} src={star} className="w-4 h-4 mr-1" alt="star" />
      ))}
    </div>
  );
};
