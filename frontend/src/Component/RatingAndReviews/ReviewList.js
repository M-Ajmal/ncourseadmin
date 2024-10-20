import React from "react";
import ReviewCard from "./ReviewCard";
import { ReviewsContainer } from "./styles";

const ReviewList = ({ reviews, onDeleteClick }) => {
  return (
    <ReviewsContainer>
      {reviews.map((review) => (
        <ReviewCard
          key={review.review_id}
          review={review}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </ReviewsContainer>
  );
};

export default ReviewList;
