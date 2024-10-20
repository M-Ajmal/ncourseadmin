import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaEdit,
  FaTrash,
  FaEyeSlash,
  FaEye,
  FaKey,
  FaUser,
} from "react-icons/fa";
import "./UserManagement.css";

const avatars = ["img/userm1.png", "img/userm.png", "img/userm2.png"];

const UserManagement = ({ user, setUser }) => {
  const [users, setUsers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/adminuser");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching adminuser:", error);
    }
  };

  const handleFormToggle = () => {
    setFormVisible(!formVisible);
    clearForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(""); // Clear error message on input change
  };

  const validateForm = () => {
    const { firstname, lastname, username, password, email } = formData;

    if (!firstname || !lastname || !username || !password || !email) {
      setErrorMessage("All fields are required!");
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isUpdating) {
      const currentUser = users[updateIndex];

      // Check if any changes have been made
      if (
        currentUser.firstname === formData.firstname &&
        currentUser.lastname === formData.lastname &&
        currentUser.username === formData.username &&
        currentUser.password === formData.password &&
        currentUser.email === formData.email
      ) {
        setDialogMessage("No changes have been made to the user.");
        setShowDialog(true);
        return; // Exit if no changes were made
      }

      setConfirmUpdate(true); // Proceed with update confirmation
      return;
    }

    // Ensure formData.username is trimmed
    const trimmedUsername = formData.username.trim();

    // Check for existing user only if formData is valid
    if (trimmedUsername) {
      const existingUser = users.some(
        (user) => user.username === trimmedUsername
      );
      if (existingUser) {
        setDialogMessage("A user with the same username already exists.");
        setShowDialog(true);
        return;
      }
    }

    // Continue with user creation logic
    try {
      const response = await fetch("http://localhost:5000/api/adminuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("API Response:", result); // Debugging response

      if (response.ok) {
        setUsers([...users, { ...formData, id: result.userId }]);
        showSuccessMessage("User successfully added!");
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }

    clearForm();
    setFormVisible(false);
  };

  const confirmUpdateUser = async () => {
    const updatedUser = { ...formData };
    try {
      const response = await fetch(
        `http://localhost:5000/api/adminuser/${users[updateIndex].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (response.ok) {
        const updatedUsers = [...users];
        updatedUsers[updateIndex] = {
          ...updatedUser,
          id: users[updateIndex].id,
        };
        setUsers(updatedUsers);

        // Update the active user in the header
        setUser({ ...updatedUser, id: users[updateIndex].id }); // Update the user state in App.js

        showSuccessMessage("User successfully updated!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
    setConfirmUpdate(false);
    setIsUpdating(false);
    clearForm();
    setFormVisible(false);
  };

  const handleDeleteUser = (index) => {
    // Check if the user trying to delete is the active user
    if (users[index].username === user.username) {
      setDialogMessage("You cannot delete your own account.");
      setShowDialog(true);
      return;
    }
    setDeleteIndex(index);
    setConfirmDelete(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/adminuser/${users[deleteIndex].id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedUsers = users.filter((_, i) => i !== deleteIndex);
        setUsers(updatedUsers);
        setDeleteSuccessMessage("User successfully deleted!");
        setTimeout(() => setDeleteSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setConfirmDelete(false);
    setDeleteIndex(null);
  };

  const handleUpdateUser = (index) => {
    setFormData(users[index]);
    setIsUpdating(true);
    setUpdateIndex(index);
    setFormVisible(true);
  };

  const clearForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
    });
    setIsUpdating(false);
    setUpdateIndex(null);
    setErrorMessage("");
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const generatePassword = () => {
    const length = 8; // Length of the password
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"; // Allowed characters
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    setFormData({ ...formData, password }); // Set the generated password to formData
  };

  const generateUsername = () => {
    // Ensure we are accessing the correct properties
    if (!formData.firstname || !formData.lastname) {
      setDialogMessage("Enter first and last name to generate a username.");
      setShowDialog(true);
      return;
    }
    const username =
      formData.lastname + Math.random().toString(36).substring(2, 6);
    setFormData({ ...formData, username }); // Update the username correctly
  };

  const handleUsernameKeyPress = (e) => {
    if (e.key === "Enter") {
      generateUsername(); // Trigger username generation on Enter key
    }
  };

  return (
    <div className="user-management">
      <div className="header">
        <h1>AdminUser Management</h1>
        <button className="add-button" onClick={handleFormToggle}>
          {formVisible ? <FaTimes /> : <FaPlus />}
        </button>
      </div>

      {formVisible && (
        <form className="user-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onKeyPress={handleUsernameKeyPress} // Add key press handler
              placeholder="Username"
              required
            />
            <button
              type="button"
              className="generate-username-button"
              onClick={generateUsername} // Generate username on button click
            >
              <FaUser />
            </button>
          </div>

          <div className="form-group">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="show-password-button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button
              type="button"
              className="generate-password-button"
              onClick={generatePassword}
            >
              <FaKey />
            </button>
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="User Email"
              required
            />
          </div>
          {errorMessage && (
            <div className="error-message">
              <FaExclamationTriangle style={{ color: "red" }} size={20} />
              {errorMessage}
            </div>
          )}
          <div className="form-actions">
            <button type="submit" className="submit-button">
              {isUpdating ? <FaCheckCircle /> : <FaPlus />}
            </button>
            <button type="button" className="clear-button" onClick={clearForm}>
              <FaTimes />
            </button>
          </div>
        </form>
      )}

      <div className="user-list">
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={avatars[index % avatars.length]}
                      alt="Avatar"
                      style={{
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  </td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateUser(index)}
                      className=""
                      style={{
                        backgroundColor: "#4CAF50", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px", 
                        padding: "8px 12px", 
                        cursor: "pointer", 
                        marginRight: "8px", 
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(index)}
                      style={{
                        backgroundColor: "#f44336", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px", 
                        padding: "8px 12px", 
                        cursor: "pointer", 
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Confirmation Dialog for Update */}
      {confirmUpdate && (
        <>
          <div
            className="overlay"
            onClick={() => setConfirmUpdate(false)}
          ></div>
          <div className="confirmation-dialog">
            <FaExclamationTriangle style={{ color: "orange" }} size={30} />
            <h2>Confirm Update</h2>
            <p>Are you sure you want to update this user?</p>
            <div className="dialog-actions">
              <button onClick={confirmUpdateUser} className="confirm-button">
                Yes
              </button>
              <button
                onClick={() => setConfirmUpdate(false)}
                className="cancel-button"
              >
                No
              </button>
            </div>
          </div>
        </>
      )}

      {/* Confirmation Dialog for Delete */}
      {confirmDelete && (
        <>
          <div
            className="overlay"
            onClick={() => setConfirmDelete(false)}
          ></div>
          <div className="confirmation-dialog">
            <FaExclamationTriangle style={{ color: "orange" }} size={30} />
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="dialog-actions">
              <button onClick={confirmDeleteUser} className="confirm-button">
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="cancel-button"
              >
                No
              </button>
            </div>
          </div>
        </>
      )}

      {/* Success Messages */}
      {successMessage && (
        <div className="success-message success">
          <FaCheckCircle /> {successMessage}
        </div>
      )}
      {deleteSuccessMessage && (
        <div className="success-message delete">
          <FaCheckCircle /> {deleteSuccessMessage}
        </div>
      )}

      {/* Error Dialog */}
      {showDialog && (
        <>
          <div className="overlay" onClick={() => setShowDialog(false)}></div>
          <div className="confirmation-dialog">
            <FaExclamationTriangle style={{ color: "orange" }} size={30} />
            <h2>Error</h2>
            <p>{dialogMessage}</p>
            <div className="dialog-actions">
              <button
                onClick={() => setShowDialog(false)}
                className="confirm-button"
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
