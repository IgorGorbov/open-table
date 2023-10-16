import { Review } from "../types";

export const calcReviewRatingAverage = (reviews: Review[]) => {
  if (reviews.length) {
    return (
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    );
  }

  return 0;
};

export const reviewsRatingToText = (reviews: Review[]) => {
  const rating = calcReviewRatingAverage(reviews);

  if (rating > 4) return "Awesome";

  if (rating <= 4 && rating > 3) return "Good";

  if (rating <= 3 && rating > 0) return "Average";

  return "";
};
