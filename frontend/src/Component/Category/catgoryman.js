import React, { useState, useEffect } from "react";
import "./category_pio.css";
import axios from "axios";

const CategoryManagement = () => {
  const API_URL = "http://localhost:5000/api/category"; // Base API URL for category-related operations

  const [view, setView] = useState("graphic");
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    category_name: "",
    cat_img: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Store category ID to be deleted
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const toggleView = () => {
    setView(view === "graphic" ? "table" : "graphic");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setNewCategory({ category_name: "", cat_img: "" });
    setImagePreview(null);
    setErrorMessage("");
    setEditMode(false); // Reset edit mode
    setEditingCategoryId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0]; // Ensure the file is an image
      if (fileType === "image") {
        setNewCategory({ ...newCategory, cat_img: file }); // Set the file for upload
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result); // Preview the image
        };
        reader.readAsDataURL(file);
      } else {
        setErrorMessage("Please upload a valid image file.");
      }
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setNewCategory({ category_name: "", cat_img: "" });
    setShowDemo(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(""); // Clear the success message after 3 seconds
      }, 2500); // Duration in milliseconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [successMessage]);

  useEffect(() => {
    if (deleteSuccessMessage) {
      const timer = setTimeout(() => {
        setDeleteSuccessMessage(""); // Clear the success message after 3 seconds
      }, 2500); // Duration in milliseconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [deleteSuccessMessage]);

  // Handle edit button click
  const handleEditClick = (category) => {
    setNewCategory({
      category_name: category.category_name,
      cat_img: category.cat_img, // Image path from the current category
    });

    // Set image preview using the server path
    if (category.cat_img) {
      setImagePreview(`http://localhost:5000/img/Category/${category.cat_img}`);
    } else {
      setImagePreview(null); // or set to a default image if none exists
    }

    setEditMode(true);
    setEditingCategoryId(category.category_id);
    setIsModalOpen(true);
  };

  const handleAddCategory = async () => {
    // Check for empty category name
    if (!newCategory.category_name) {
      setErrorMessage("Please enter the category name.");
      return;
    }

    // Check for edit mode with no changes
    if (
      editMode &&
      newCategory.category_name ===
        categories.find(
          (category) => category.category_id === editingCategoryId
        ).category_name &&
      newCategory.cat_img ===
        categories.find(
          (category) => category.category_id === editingCategoryId
        ).cat_img
    ) {
      setErrorMessage(
        "No changes detected. Please modify the category before updating."
      );
      return;
    }

    const formData = new FormData();
    formData.append("category_name", newCategory.category_name);

    // Check if an image file is uploaded; if not, set to default image
    if (newCategory.cat_img) {
      formData.append("cat_img", newCategory.cat_img);
    } else {
      formData.append("cat_img", "no-image.png"); // Set a default image if none is uploaded
    }

    try {
      let updatedCategory;
      if (editMode && editingCategoryId !== null) {
        // Update existing category using PUT request
        const response = await axios.put(
          `${API_URL}/${editingCategoryId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        updatedCategory = response.data;

        // Update the category in the state using the correct category_id
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.category_id === editingCategoryId
              ? { ...category, ...updatedCategory }
              : category
          )
        );

        setSuccessMessage("Category updated successfully!"); // Success message for update
      } else {
        // Add new category using POST request
        const response = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        updatedCategory = response.data;
        setCategories((prevCategories) => [...prevCategories, updatedCategory]);
        setSuccessMessage("Category added successfully!"); // Success message for addition
      }

      toggleModal(); // Close modal after operation
    } catch (error) {
      console.error("Error adding/updating category:", error);
      setErrorMessage("Failed to add/update category. Please try again.");
    }
  };

  const handleFileInputClick = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click(); // Trigger file input click
  };

  const handleDeleteClick = (categoryId) => {
    setCategoryToDelete(categoryId);
    setConfirmDelete(true);
  };

  const confirmDeleteCategory = async () => {
    if (categoryToDelete === null) return; // Ensure there's a category to delete

    try {
      // Send delete request to the backend
      const response = await axios.delete(`${API_URL}/${categoryToDelete}`);

      if (response.status === 200) {
        // Update categories after successful deletion
        setCategories(
          categories.filter(
            (category) => category.category_id !== categoryToDelete
          )
        );
        setDeleteSuccessMessage("Category deleted successfully!"); // Success message
      } else {
        setErrorMessage("Failed to delete category. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setErrorMessage("Failed to delete category. Please try again."); // Error message
    } finally {
      // Reset deletion state
      setConfirmDelete(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="main-content">
      <div className="title">
        <h1>Category Management</h1>
        <button className="add-category-button" onClick={toggleModal}>
          <i className="fas fa-plus-circle"></i>{" "}
          {editMode ? "Update Category" : "Add Category"}
        </button>
        <button className="view-toggle-button" onClick={toggleView}>
          <img
            src="img/curve-arrow.png"
            alt="Toggle View"
            className={`curved-arrow-icon ${
              view === "graphic" ? "rotate-left" : "rotate-right"
            }`}
          />
          {view === "graphic"
            ? " Switch to Table View"
            : " Switch to Graphic View"}
        </button>
      </div>

      {view === "graphic" && (
        <div className="card-container">
          {categories.map((category, index) => {
            return (
              <div key={category.category_id} className="category-card">
                <div className="image-container">
                  <img
                    src={`http://localhost:5000/img/Category/${category.cat_img}`} // Change this line to use imageUrl
                    alt={category.category_name}
                  />
                  <div className="icon-buttons">
                    <button
                      className="icon-btn edit-btn"
                      onClick={() => handleEditClick(category)}
                    >
                      <i className="fas fa-edit red-icon"></i>
                    </button>
                    <button
                      className="icon-btn delete-btn"
                      onClick={() => handleDeleteClick(category.category_id)}
                    >
                      <i className="fas fa-trash blue-icon"></i>
                    </button>
                  </div>
                </div>
                <h2>{category.category_name}</h2>
                <p>No: {index + 1}</p>
              </div>
            );
          })}
        </div>
      )}

      {view === "table" && (
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>NO</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.category_id}>
                  <td>{index + 1}</td> {/* Change this line */}
                  <td>{category.category_name}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/img/Category/${category.cat_img}`}
                      alt={category.category_name}
                      width="50"
                    />
                  </td>
                  <td>
                    <div className="table-btn-container">
                      <button
                        className="icon-btn table-edit-btn"
                        onClick={() => handleEditClick(category)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="icon-btn table-delete-btn"
                        onClick={() => handleDeleteClick(category.category_id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="4">Total Categories: {categories.length}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editMode ? "Update Category" : "Add Category"}</h2>
            <p className="category-id-text">
              No:{" "}
              {editMode
                ? categories.findIndex(
                    (cat) => cat.category_id === editingCategoryId
                  ) + 1
                : categories.length + 1}
            </p>

            <input
              type="text"
              name="category_name"
              placeholder="Category Name"
              value={newCategory.category_name}
              onChange={handleInputChange}
            />
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }} // Hide the input
            />
            <button
              className="custom-file-button"
              onClick={handleFileInputClick}
            >
              <i className="fas fa-upload"></i> Choose File
            </button>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" className="preview-img" />
                <div className="bottom-box">
                  <div
                    className={`slide-to-remove ${
                      showDemo ? "demo-animation" : ""
                    }`}
                  >
                    <i
                      className="fas fa-arrow-right"
                      onClick={handleImageRemove}
                    ></i>
                  </div>
                </div>
              </div>
            )}
            {/* Error Message */}
            {errorMessage && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <div className="error-content">
                  <p className="error-text">{errorMessage}</p>
                </div>
                <button
                  className="close-btn"
                  onClick={() => setErrorMessage("")}
                >
                  ×
                </button>
              </div>
            )}
            <div className="button-group">
              <button
                onClick={handleAddCategory}
                className="action-btn add-btn"
              >
                <i className="fas fa-check-circle"></i>{" "}
                {editMode ? "Update" : "Add"}
              </button>
              <button onClick={toggleModal} className="action-btn cancel-btn">
                <i className="fas fa-times-circle"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation Dialog for Delete */}
      {confirmDelete && (
        <>
          <div
            className="overlay"
            onClick={() => setConfirmDelete(false)}
          ></div>
          <div className="confirmation-dialog">
            <i
              className="fas fa-exclamation-triangle"
              style={{ color: "orange", fontSize: "30px" }}
            ></i>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this category?</p>
            <div className="dialog-actions">
              <button
                onClick={confirmDeleteCategory}
                className="confirm-button"
              >
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

      {successMessage && (
        <div className="success-message">
          <span className="success-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="green"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14.5c-1.8 0-3.4-.8-4.5-2.1-1.1 1.3-2.7 2.1-4.5 2.1-1.4 0-2.7-.5-3.7-1.5-.2-.2-.2-.5-.1-.7.1-.2.4-.3.6-.3 1 0 2 .4 2.8 1 1.3-1.1 3-1.1 4.3 0 1-.8 2-1 3.1-1 1.2 0 2.2.4 3 1 .2.2.2.5.1.7-.1.2-.4.2-.6.2zM8.5 10c-.8 0-1.5-.7-1.5-1.5S7.7 7 8.5 7 10 7.7 10 8.5 9.3 10 8.5 10zm7 0c-.8 0-1.5-.7-1.5-1.5S14.7 7 15.5 7 17 7.7 17 8.5 16.3 10 15.5 10z" />
            </svg>
          </span>
          <div className="success-content">
            <p className="success-text">{successMessage}</p>
          </div>
          <button className="close-btn" onClick={() => setSuccessMessage("")}>
            ×
          </button>
        </div>
      )}

      {deleteSuccessMessage && (
        <div className="success-message">
          {deleteSuccessMessage} {/* Removed the icon here */}
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
