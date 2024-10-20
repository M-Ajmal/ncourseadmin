// InstructorModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const InstructorModal = ({ show, onHide, instructor }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Instructor Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="instructor-details-content">
          <div className="instructor-header">
            <img
              src={instructor.avatarUrl}
              alt="Instructor Avatar"
              className="instructor-avatar"
            />
            <h4>
              {instructor.ins_fname} {instructor.ins_lname}
            </h4>
          </div>
          <div className="instructor-body">
            <div className="instructor-info">
              <strong>ID:</strong> <span>{instructor.ins_id}</span>
            </div>
            <div className="instructor-info">
              <strong>First Name:</strong> <span>{instructor.ins_fname}</span>
            </div>
            <div className="instructor-info">
              <strong>Last Name:</strong> <span>{instructor.ins_lname}</span>
            </div>
            <div className="instructor-info">
              <strong>Username:</strong> <span>{instructor.ins_user_name}</span>
            </div>
            <div className="instructor-info">
              <strong>Email:</strong> <span>{instructor.ins_gmail}</span>
            </div>
            <div className="instructor-info">
              <strong>Password:</strong> <span>{instructor.ins_password}</span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InstructorModal;
