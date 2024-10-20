import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaEye,
  FaTrashAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa"; // Added icons
import axios from "axios";

const buttonStyle = {
  display: "inline-block",
  width: "45px",
  height: "45px",
  borderRadius: "25px",
  outline: "none",
  border: "none",
  backgroundImage: "linear-gradient(to right, #32be8f, #38d39f, #32be8f)",
  backgroundSize: "200%",
  fontSize: "1.2rem",
  color: "#fff",
  fontFamily: "Poppins, sans-serif",
  textTransform: "uppercase",
  margin: "0.5rem",
  cursor: "pointer",
  transition: ".5s",
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getAvatarUrl = () => {
  const topTypes = [
    "LongHairMiaWallace",
    "ShortHairDreads",
    "ShortHairTheCaesar",
    "LongHairStraight",
    "LongHairBun",
  ];
  const accessoriesTypes = ["Blank", "Wayfarers", "Kurt", "Sunglasses"];
  const hairColors = ["Brown", "Black", "Blonde", "Auburn", "Red"];
  const facialHairTypes = ["Beard", "BeardLight", "Moustache", "Blank"];
  const facialHairColors = ["Brown", "Black", "Blonde", "Red"];
  const clotheTypes = [
    "CollarSweater",
    "BlazerShirt",
    "Hoodie",
    "GraphicShirt",
  ];
  const clotheColors = ["Blue", "Red", "Gray", "Green"];
  const eyeTypes = ["Default", "Happy", "Surprised"];
  const eyebrowTypes = ["Default", "RaisedExcited", "Sad"];
  const mouthTypes = ["Default", "Smile", "Sad"];
  const skinColors = ["Light", "Dark", "Tanned", "Pale"];

  return `https://avataaars.io/?avatarStyle=Circle&topType=${getRandomElement(
    topTypes
  )}&accessoriesType=${getRandomElement(
    accessoriesTypes
  )}&hairColor=${getRandomElement(
    hairColors
  )}&facialHairType=${getRandomElement(
    facialHairTypes
  )}&facialHairColor=${getRandomElement(
    facialHairColors
  )}&clotheType=${getRandomElement(clotheTypes)}&clotheColor=${getRandomElement(
    clotheColors
  )}&eyeType=${getRandomElement(eyeTypes)}&eyebrowType=${getRandomElement(
    eyebrowTypes
  )}&mouthType=${getRandomElement(mouthTypes)}&skinColor=${getRandomElement(
    skinColors
  )}`;
};

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch instructors data from the backend
    axios
      .get("http://localhost:5000/api/instructors")
      .then((response) => {
        const instructorsWithAvatars = response.data.map((instructor) => ({
          ...instructor,
          avatarUrl: getAvatarUrl(), // Assigning avatar URL to each instructor
        }));
        setInstructors(instructorsWithAvatars);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching instructors data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setDeleting(true);
    // Call API to delete instructor and refresh the list
    axios
      .delete(`http://localhost:5000/api/instructors/${id}`)
      .then(() => {
        setInstructors((prev) =>
          prev.filter((instructor) => instructor.ins_id !== id)
        );
        setDeleteSuccessMessage("Instructor successfully deleted.");
        setConfirmDelete(false);
        setDeleting(false);
        setTimeout(() => setDeleteSuccessMessage(""), 3000); // Hide after 3 seconds
      })
      .catch((error) => {
        console.error("Error deleting the instructor:", error);
        setDeleting(false);
      });
  };

  const handleConfirmDelete = (instructor) => {
    setInstructorToDelete(instructor.ins_id);
    setConfirmDelete(true);
  };

  const handleShowDetails = (instructor) => {
    setSelectedInstructor(instructor);
    setShowModal(true);
  };

  if (loading) {
    return <Spinner animation="border" className="loading-spinner" />;
  }

  return (
    <div className="instructor-content">
      <motion.div
        className="instructor-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1>Instructor Management</h1>
      </motion.div>

      {deleteSuccessMessage && (
        <div className="success-message delete">
          <FaCheckCircle /> {deleteSuccessMessage}
        </div>
      )}

      <motion.div
        className="instructor-grid-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="instructor-grid">
          {instructors.map((instructor) => (
            <motion.div
              key={instructor.ins_id}
              className="instructor-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card-header">
                <h3>
                  {instructor.ins_fname} {instructor.ins_lname}
                </h3>
                <img
                  src={instructor.avatarUrl}
                  alt="Instructor"
                  className="instructor-image"
                />
              </div>
              <div className="card-body">
                <p>
                  <strong>Username:</strong> {instructor.ins_user_name}
                </p>
                <p>
                  <strong>Email:</strong> {instructor.ins_gmail}
                </p>
              </div>
              <div className="card-footer">
                {/* Apply button styles to view and delete buttons */}
                <Button
                  variant="info"
                  className="icon-button"
                  style={buttonStyle}
                  onClick={() => handleShowDetails(instructor)}
                >
                  <FaEye size={20} />
                </Button>{" "}
                <Button
                  variant="danger"
                  className="icon-button"
                  style={{
                    ...buttonStyle,
                    backgroundImage:
                      "linear-gradient(to right, #e63946, #e63946)",
                  }} // Different color for delete
                  onClick={() => handleConfirmDelete(instructor)}
                  disabled={deleting}
                >
                  <FaTrashAlt size={20} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
            <p>Are you sure you want to delete this instructor?</p>
            <div className="dialog-actions">
              <button
                onClick={() => handleDelete(instructorToDelete)}
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

      {/* Instructor Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Instructor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInstructor && (
            <div className="instructor-details-content">
              <div className="instructor-header">
                <img
                  src={selectedInstructor.avatarUrl}
                  alt="Instructor Avatar"
                  className="instructor-avatar"
                />
                <h4>
                  {selectedInstructor.ins_fname} {selectedInstructor.ins_lname}
                </h4>
              </div>
              <div className="instructor-body">
                <div className="instructor-info">
                  <strong>ID:</strong> <span>{selectedInstructor.ins_id}</span>
                </div>
                <div className="instructor-info">
                  <strong>First Name:</strong>{" "}
                  <span>{selectedInstructor.ins_fname}</span>
                </div>
                <div className="instructor-info">
                  <strong>Last Name:</strong>{" "}
                  <span>{selectedInstructor.ins_lname}</span>
                </div>
                <div className="instructor-info">
                  <strong>Username:</strong>{" "}
                  <span>{selectedInstructor.ins_user_name}</span>
                </div>
                <div className="instructor-info">
                  <strong>Email:</strong>{" "}
                  <span>{selectedInstructor.ins_gmail}</span>
                </div>
                <div className="instructor-info">
                  <strong>Password:</strong>{" "}
                  <span>{selectedInstructor.ins_password}</span>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center", // Center the button horizontally
          }}
        >
          <Button
            style={{
              padding: "10px 20px", // Add padding to the button
              width: "100px",
              height: "40px",
              borderRadius: "20px",
              backgroundColor: "red", // Set the background color to red
              border: "none",
              color: "#fff",
              fontSize: "1rem",
              fontFamily: "Poppins, sans-serif",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.5s ease-in-out",
              marginTop: "10px",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#cc0000")} // Darker red on hover
            onMouseLeave={(e) => (e.target.style.backgroundColor = "red")} // Reset color on hover leave
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Instructor;
