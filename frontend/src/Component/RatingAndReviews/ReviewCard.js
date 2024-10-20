import React from "react";
import { FaTrash } from "react-icons/fa";
import { ReviewCardContainer, Stars, Star, ReviewText, Author, DeleteButton } from "./styles";

const ReviewCard = ({ review, onDeleteClick }) => {
  const renderStars = (rating) => {
    const totalStars = 5;
    return [...Array(totalStars)].map((_, index) => (
      <Star key={index} filled={index < rating} />
    ));
  };

  return (
    <ReviewCardContainer
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Stars>{renderStars(review.rating)}</Stars>
      <ReviewText title={review.review_text}>"{review.review_text}"</ReviewText>
      <Author>
        - {review.f_name} {review.l_name}
      </Author>
      <DeleteButton onClick={() => onDeleteClick(review.review_id)}>
        <FaTrash size={16} />
      </DeleteButton>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
