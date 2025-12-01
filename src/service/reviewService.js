import api from "./apiConfig";

// Get all reviews
export const getReviews = async () => {
  const res = await api.get("/reviews/");
  return res.data;
};

// create a review
export const createReview = async (data) => {
  const res = await api.post("/reviews/", data);
  return res.data;
};

// Get review by ID
export const getReviewById = async (id) => {
  const res = await api.get(`/reviews/${id}/`);
  return res.data;
};

// Update a review
export const updateReview = async (id, data) => {
  const res = await api.put(`/reviews/${id}/`, data);
  return res.data;
};

// Delete a review
export const deleteReview = async (id) => {
  const res = await api.delete(`/reviews/${id}/`);
  return res.data;
};

// // Get reviews for a specific gig
// export const getReviewsByGigId = async (gigId) => {
//   const res = await api.get(`/api/gigs/${gigId}/reviews/`);
//   return res.data;
// };

// // Get reviews by a specific user
// export const getReviewsByUserId = async (userId) => {
//   const res = await api.get(`/api/users/${userId}/reviews/`);
//   return res.data;
// };
