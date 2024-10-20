import express from "express";
import { showRatingsAndReviews, removeRatingAndReview } from "../controllers/ratingController.js";

const router = express.Router();

router.get("/ratings-reviews", showRatingsAndReviews);

router.delete("/ratings-reviews/:id", removeRatingAndReview);

export default router;
