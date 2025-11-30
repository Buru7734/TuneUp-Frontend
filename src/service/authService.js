import api from "./apiConfig";

const signUp = async (formData) => {
  try {
    // Some backends expect different field names for confirmation.
    // Build a payload that includes common variants so the server can accept it.
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      // include common alternate names for password confirmation
      password2: formData.passwordConf,
      password_confirmation: formData.passwordConf,
      password1: formData.password,
      password_confirm: formData.passwordConf,
    };

    const { data } = await api.post("/accounts/auth/register/", payload);

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      const decoded = JSON.parse(atob(data.token.split(".")[1]));
      return decoded.payload ? decoded.payload : decoded;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    // Try to surface server validation errors if available
    if (err.response && err.response.data) {
      console.error("Signup error response:", err.response.data);
      // If server returned an object of field errors, stringify it
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
    if (data.token) {
      localStorage.setItem("token", data.token);
      const decoded = JSON.parse(atob(data.token.split(".")[1]));
      const tokenUser = decoded.payload ? decoded.payload : decoded;
      // If token payload doesn't include username, try fetching the full user
      if (!tokenUser.username && tokenUser.user_id) {
        try {
          const res = await api.get(`/accounts/users/${tokenUser.user_id}/`);
          // assume API returns user object in res.data
          return res.data;
        } catch (fetchErr) {
          console.error("Failed to fetch user profile:", fetchErr);
          // fall back to token-derived user object
          return tokenUser;
        }
      }
      return tokenUser;
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
