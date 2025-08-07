import React, { useState } from "react";
import PropTypes from "prop-types";

const Users = ({ 
  users, 
  onCreateUser, 
  onUpdateUser, 
  onDeleteUser, 
  editingUser, 
  setEditingUser,
  showCreateForm,
  setShowCreateForm
}) => {
  const [newUser, setNewUser] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editingUser) {
      onUpdateUser(editingUser.id, editingUser);
    } else {
      onCreateUser({
        ...newUser,
        // created_at: new Date().toISOString(),
        // updated_at: new Date().toISOString()
      });
      setNewUser({
        username: "",
        phone: "",
        email: "",
        password: ""
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>
      
      <button 
        onClick={() => setShowCreateForm(!showCreateForm)}
        style={{ marginBottom: "20px" }}
      >
        {showCreateForm ? "Cancel" : "Create New User Here!!"}
      </button>

      {(showCreateForm || editingUser) && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", padding: "20px", border: "1px solid #ccc" }}>
          <h2>{editingUser ? "Edit User" : "Create User"}</h2>
          <div style={{ marginBottom: "10px" }}>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={editingUser ? editingUser.username : newUser.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Phone: </label>
            <input
              type="text"
              name="phone"
              value={editingUser ? editingUser.phone : newUser.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={editingUser ? editingUser.email : newUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
          {!editingUser && (
            <div style={{ marginBottom: "10px" }}>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                required={!editingUser}
              />
            </div>
          )}
          <button type="submit">
            {editingUser ? "Update User" : "Create User"}
          </button>
          {editingUser && (
            <button 
              type="button"
              onClick={() => setEditingUser(null)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          )}
        </form>
      )}

      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.roles}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button 
                  onClick={() => onDeleteUser(user.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      username: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      roles: PropTypes.string,
      // created_at: PropTypes.string,
      // updated_at: PropTypes.string
    })
  ).isRequired,
  onCreateUser: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  editingUser: PropTypes.object,
  setEditingUser: PropTypes.func.isRequired,
  showCreateForm: PropTypes.bool.isRequired,
  setShowCreateForm: PropTypes.func.isRequired
};

export default Users;