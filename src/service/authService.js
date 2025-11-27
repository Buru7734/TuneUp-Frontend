import api from "./apiConfig";

const signUp = async (formData) => {
  try {
    const { data } = await api.post("/auth/sign-up", formData);

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const signIn = async (formData) => {
  try {
    const { data } = await api.post("/auth/sign-in", formData);

    if (data.err) {
      throw new Error(data.err);
    }
    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }
    throw new Error["Invalid response from server"]();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export { signUp, signIn };
