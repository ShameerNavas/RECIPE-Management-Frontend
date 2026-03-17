import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./UserProfile.css";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState(null);
// eslint-disable-next-line no-unused-vars
const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState(""); // ✅ new
  const [isEditing, setIsEditing] = useState(false); // ✅ new

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userId = loggedInUser?.userId;

    if (!userId) {
      setErrorMessage("User not logged in.");
      return;
    }

    axios
      .get(`https://recipe-ducwabaegshtc8f7.westeurope-01.azurewebsites.net/api/User/UserProfile/${userId}`)
      .then((response) => {
        setUser(response.data);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setErrorMessage("Failed to load user profile.");
      });
  }, []);

  // ✅ Enable editing mode
  const handleChangePassword = () => {
    setIsEditing(true);
  };

  // ✅ Save updated password to DB
  const handleSave = () => {
    if (!user || !password) {
      alert("Please enter a new password before saving.");
      return;
    }

    axios
      .put(`https://recipe-ducwabaegshtc8f7.westeurope-01.azurewebsites.net/api/User/UpdatePassword/${user.userId}`, {
        Password: password,
      })
      .then((response) => {
        alert("Password updated successfully!");
        setIsEditing(false);
        setPassword("");
      })
     .catch((error) => {
  console.error("Error updating password:", error.response || error.message);
  alert("Failed to update password. " + (error.response?.data || ""));
});
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <p className="loading-text">Loading user profile...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="userprofile-container">
        <div className="profile-card">
          <h2>User Profile</h2>

          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={user.name} disabled />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="text" value={user.email} disabled />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditing}
              placeholder={isEditing ? "Enter new password" : "********"}
            />
          </div>

          <div className="button-group">
            <button onClick={handleChangePassword} className="change-btn">
              Change Password
            </button>
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
