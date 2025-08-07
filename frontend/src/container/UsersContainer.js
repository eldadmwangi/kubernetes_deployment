import React, { useEffect, useState, useCallback } from "react";
import Users from "../components/Users";

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  //const backendUrl = "http://localhost:8000/api/users"; // if running locally

  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://34.42.191.208:8000";
  const backendUrl = `${baseUrl}/api/users`;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(backendUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); 

  const handleCreateUser = async (userData) => {
    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setShowCreateForm(false);
    } catch (error) {
      setError(error.message);
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const updatedUser = await response.json();
      setUsers(users.map(user => user.id === id ? updatedUser : user));
      setEditingUser(null);
    } catch (error) {
      setError(error.message);
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError(error.message);
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Users 
      users={users} 
      onCreateUser={handleCreateUser}
      onUpdateUser={handleUpdateUser}
      onDeleteUser={handleDeleteUser}
      editingUser={editingUser}
      setEditingUser={setEditingUser}
      showCreateForm={showCreateForm}
      setShowCreateForm={setShowCreateForm}
    />
  );
};

export default UsersContainer;