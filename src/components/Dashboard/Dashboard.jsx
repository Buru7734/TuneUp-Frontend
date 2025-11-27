import { useEffect, useState, useContext } from "react";

import { UserContext } from "../../context/userContext";

import * as userService from "../../service/userService";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>THis is the dashboard where you can see a list of all the users.</p>
      <ul>
        {users?.results?.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
