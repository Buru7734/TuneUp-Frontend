import { createContext, useState, useEffect } from "react";
import api from "../service/apiConfig";

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded.payload ? decoded.payload : decoded;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken);

  // If initial token-derived user lacks full profile (e.g. missing username),
  // fetch the full user profile and update context.
  useEffect(() => {
    const fetchProfile = async () => {
      if (user && !user.username && user.user_id) {
        try {
          const res = await api.get(`/accounts/users/${user.user_id}/`);
          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user profile on init:", err);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
export { UserProvider, UserContext };
