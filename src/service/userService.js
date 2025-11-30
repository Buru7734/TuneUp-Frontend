import api from "./apiConfig";

const API = import.meta.env.VITE_API_URL;

const index = async () => {
  try {
    const { data } = await api.get("accounts/users");

    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getUsers = async () => {
  const res = await api.get(`/accounts/users/`);
  return res.data;
};

const getTags = async () => {
  const res = await api.get(`/api/tags/`);
  return res.data;
};

const updateProfile = async (data, isFormData = false) => {
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};

  const res = await api.put("/accounts/profile/", data, config);
  return res.data;
};

export { index, getUsers, getTags, updateProfile };
