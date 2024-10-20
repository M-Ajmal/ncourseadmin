import { getRatingsAndReviews, deleteRatingAndReview } from "../models/ratingModel.js";

export const showRatingsAndReviews = (req, res) => {
  getRatingsAndReviews((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

export const removeRatingAndReview = (req, res) => {
  const { id } = req.params;
  deleteRatingAndReview(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Rating and review not found" });
    } else {
      res.status(200).json({ message: "Rating and review deleted successfully" });
    }
  });
};
