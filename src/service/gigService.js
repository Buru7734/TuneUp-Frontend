import api from "./apiConfig";

// Get all gigs
export const getGigs = async () => {
  const res = await api.get("/api/gigs/");
  return res.data;
};

// Get a single gig by ID
export const getGigById = async (gigId) => {
  const res = await api.get(`/api/gigs/${gigId}/`);
  return res.data;
};

// Create a new gig
export const createGig = async (data, isFormData = false) => {
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};

  const res = await api.post("/api/gigs/", data, config);
  return res.data;
};

// Update a gig
export const updateGig = async (id, data, isFormData = false) => {
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};

  const res = await api.put(`/api/gigs/${id}/`, data, config);
  return res.data;
};

// Delete a gig
export const deleteGig = async (id) => {
  const res = await api.delete(`/api/gigs/${id}/`);
  return res.data;
};

// Search gigs
export const searchGigs = async (query) => {
  const res = await api.get(`/api/gigs/?search=${query}`);
  return res.data;
};
