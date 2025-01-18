import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  // const backendUrl = "http://localhost:8000/api/users";
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://34.45.71.156:8000/api/users";

  useEffect(() => {
    fetch(backendUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [backendUrl]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;