import api from "./apiConfig";

//  Get all tags
export const getTags = async () => {
  const res = await api.get(`/api/tags/`);
  return res.data;
};

// Create a new tag
export const createTag = async (name) => {
  const res = await api.post(`/api/tags/`, { name });
  return res.data;
};

// Optional — Get a tag by ID
export const getTagById = async (id) => {
  const res = await api.get(`/api/tags/${id}/`);
  return res.data;
};

// Optional — Update a tag
export const updateTag = async (id, data) => {
  const res = await api.put(`/api/tags/${id}/`, data);
  return res.data;
};

// Optional — Delete a tag
export const deleteTag = async (id) => {
  const res = await api.delete(`/api/tags/${id}/`);
  return res.data;
};
