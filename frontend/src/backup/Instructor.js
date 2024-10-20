import React, { useState, useEffect } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import './Instructor.css'; // Custom styles for the Instructor component

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Fetch instructors data from the backend
    axios.get('http://localhost:5000/api/instructors')
      .then(response => {
        setInstructors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching instructors data:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setDeleting(true);
    // Call API to delete instructor and refresh the list
    axios.delete(`http://localhost:5000/api/instructors/${id}`)
      .then(() => {
        setInstructors(prev => prev.filter(instructor => instructor.ins_id !== id));
        setShowModal(false);
        setDeleting(false);
      })
      .catch(error => {
        console.error('Error deleting the instructor:', error);
        setDeleting(false);
      });
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

      <motion.div
        className="instructor-grid-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="instructor-grid">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.ins_id}
              className="instructor-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card-header">
                <h3>{instructor.ins_fname} {instructor.ins_lname}</h3>
                <img
                  src={`https://randomuser.me/api/portraits/men/${index + 1}.jpg`}
                  alt="Instructor"
                  className="instructor-image"
                />
              </div>
              <div className="card-body">
                <p><strong>Username:</strong> {instructor.ins_user_name}</p>
                <p><strong>Email:</strong> {instructor.ins_gmail}</p>
              </div>
              <div className="card-footer">
                <Button variant="info" className="icon-button" onClick={() => handleShowDetails(instructor)}>
                  <FaEye size={20} />
                </Button>{' '}
                <Button
                  variant="danger"
                  className="icon-button"
                  onClick={() => handleDelete(instructor.ins_id)}
                  disabled={deleting}
                >
                  {deleting ? <Spinner as="span" animation="border" size="sm" /> : <FaTrashAlt size={20} />}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Instructor Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Instructor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInstructor && (
            <>
              <p><strong>ID:</strong> {selectedInstructor.ins_id}</p>
              <p><strong>First Name:</strong> {selectedInstructor.ins_fname}</p>
              <p><strong>Last Name:</strong> {selectedInstructor.ins_lname}</p>
              <p><strong>Username:</strong> {selectedInstructor.ins_user_name}</p>
              <p><strong>Email:</strong> {selectedInstructor.ins_gmail}</p>
              <p><strong>Password:</strong> {selectedInstructor.ins_password}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Instructor;
