import db from "../config/db.js";

export const getRatingsAndReviews = (result) => {
    const query = `
      SELECT r.review_id, r.u_id, u.f_name, u.l_name, r.rating, r.review_text, r.created_at
      FROM ratingandreviews r
      JOIN user u ON r.u_id = u.u_id
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.log("Error fetching ratings and reviews:", err);
        result(err, null);
      } else {
        result(null, results);
      }
    });
  };
  

export const deleteRatingAndReview = (review_id, result) => {
  const query = "DELETE FROM ratingandreviews WHERE review_id = ?";
  db.query(query, [review_id], (err, results) => {
    if (err) {
      console.log("Error deleting rating and review:", err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
