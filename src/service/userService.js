import api from "./apiConfig";

// Removed unused "API" variable

// Get all users
export const getUsers = async () => {
  const res = await api.get("/accounts/users/");
  return res.data;
};

// Get logged-in user's profile
export const getProfile = async () => {
  const res = await api.get("/accounts/profile/");
  return res.data;
};

// Get a public profile by ID
export const getUserById = async (userId) => {
  const res = await api.get(`/accounts/users/${userId}/`);
  return res.data;
};

// Search users
export const searchUsers = async (query) => {
  const res = await api.get(`/accounts/users/?search=${query}`);
  return res.data;
};

// Update user profile
export const updateProfile = async (data, isFormData = false) => {
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};

  const res = await api.put("/accounts/profile/", data, config);
  return res.data;
};
