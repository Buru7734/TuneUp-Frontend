// src/service/authService.js
import api from "./apiConfig";

const signUp = async (formData) => {
  try {
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password2: formData.passwordConf,
      password_confirmation: formData.passwordConf,
      password1: formData.password,
      password_confirm: formData.passwordConf,
    };

    const { data } = await api.post("/accounts/auth/register/", payload);

    if (data.err) {
      throw new Error(data.err);
    }

    // ✅ Expecting: { refresh, access, user }
    if (data.access && data.refresh) {
      localStorage.setItem("token", data.access); // access token for API calls
      localStorage.setItem("refreshToken", data.refresh);
      return data.user; // full user object from backend
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    if (err.response && err.response.data) {
      console.error("Signup error response:", err.response.data);
      const serverMsg =
        typeof err.response.data === "string"
          ? err.response.data
          : JSON.stringify(err.response.data);
      throw new Error(serverMsg);
    }
    console.error(err);
    throw new Error(err.message || "Signup failed");
  }
};

const signIn = async (formData) => {
  console.log(
    "SENDING LOGIN REQUEST TO:",
    api.defaults.baseURL + "/accounts/auth/login/"
  );

  try {
    const { data } = await api.post("/accounts/auth/login/", formData);

    if (data.err) {
      throw new Error(data.err);
    }

    // ✅ Expecting: { refresh, access, user }
    if (data.access && data.refresh) {
      localStorage.setItem("token", data.access); // use access token
      localStorage.setItem("refreshToken", data.refresh);
      // No need to decode JWT – backend already sent the user
      return data.user;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    if (err.response && err.response.data) {
      console.error("Signin error response:", err.response.data);
      const serverMsg =
        typeof err.response.data === "string"
          ? err.response.data
          : JSON.stringify(err.response.data);
      throw new Error(serverMsg);
    }
    console.error(err);
    throw new Error(err.message || "Signin failed");
  }
};

export { signUp, signIn };
