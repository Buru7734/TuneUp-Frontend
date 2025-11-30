import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../../service/authService";

import { UserContext } from "../../context/userContext";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      console.log("This is the user", signedInUser);
      const token = localStorage.getItem("token");
      console.log("local token:", token);
      try {
        if (token)
          console.log("decoded token:", JSON.parse(atob(token.split(".")[1])));
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };
  return (
    <main>
      <h1>Sign In</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;
