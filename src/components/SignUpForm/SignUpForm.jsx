import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { signUp } from "../../service/authService";

import { UserContext } from "../../context/userContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
    email: "",
  });

  const { username, password, passwordConf, email } = formData;

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      console.log("This is the user", newUser.username);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf && email);
  };
  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <div>
            <label>email</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              placeholder="email"
              required
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={isFormInvalid()}>
            Sign Up
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
