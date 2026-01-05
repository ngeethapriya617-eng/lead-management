import { useState, useEffect } from "react";
import api from "../../api/axios";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import "./AdminUsers.css";

function AdminUsers() {
  // ✅ USERS STATE (FIXES MAIN ERROR)
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  // ✅ FETCH USERS FROM BACKEND
  useEffect(() => {
    api
      .get("admin/users/")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load users");
      });
  }, []);

  // ✅ HANDLE FORM INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ CREATE USER (BACKEND CONNECTED)
  const handleSave = async () => {
    if (!formData.username || !formData.role) {
      alert("Username and role are required");
      return;
    }

    try {
      await api.post("admin/users/create/", {
        username: formData.username,
        email: formData.email,
        role: formData.role,
        password: "Temp@123", // temporary password
      });

      setShowModal(false);
      setFormData({ username: "", email: "", role: "" });

      // Reload users
      const res = await api.get("admin/users/");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create user");
    }
  };

  // ✅ UI-ONLY TOGGLE (backend hookup later)
  const toggleStatus = async (id) => {
  try {
    const res = await api.patch(`admin/users/${id}/toggle/`);

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? res.data : user
      )
    );
  } catch (err) {
    console.error(err);
    alert("Failed to update user status");
  }
};


  return (
    <AdminLayout>
      <div className="users-header">
        <h1>Users</h1>
        <button className="add-user-btn" onClick={() => setShowModal(true)}>
          + Add User
        </button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email || "-"}</td>
              <td>{user.role}</td>
              <td>
                <span
                  className={`status ${
                    user.is_active ? "active" : "inactive"
                  }`}
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <button
                  className="toggle-btn"
                  onClick={() => toggleStatus(user.id)}
                >
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add User</h2>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="AGENT">Agent</option>
            </select>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminUsers;
