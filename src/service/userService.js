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

export { index, getUsers };
