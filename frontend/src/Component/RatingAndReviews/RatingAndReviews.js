import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewList from "./ReviewList";
import DeleteModal from "./DeleteModal";
import { Container, Title, SuccessMessage } from "./styles";

const RatingAndReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ratings-reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the ratings!", error);
      });
  }, []);

  const deleteReview = (id) => {
    setShowModal(false);
    axios
      .delete(`http://localhost:5000/api/ratings-reviews/${id}`)
      .then(() => {
        setReviews(reviews.filter((review) => review.review_id !== id));
        setSuccessMessage("Review successfully deleted!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("There was an error deleting the review!", error);
      });
  };

  const handleDeleteClick = (id) => {
    setReviewToDelete(id);
    setShowModal(true);
  };

  return (
    <Container>
      <Title>Rating & Reviews</Title>
      <ReviewList reviews={reviews} onDeleteClick={handleDeleteClick} />
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {showModal && (
        <DeleteModal
          onConfirm={() => deleteReview(reviewToDelete)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </Container>
  );
};

export default RatingAndReviews;
