// InstructorCard.js
import React from "react";
import { Button } from "react-bootstrap";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const buttonStyle = {
  // Your button styles
};

const InstructorCard = ({ instructor, onViewDetails }) => {
  return (
    <motion.div
      className="instructor-card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-header">
        <h3>{instructor.ins_fname} {instructor.ins_lname}</h3>
        <img
          src={instructor.avatarUrl}
          alt="Instructor"
          className="instructor-image"
        />
      </div>
      <div className="card-body">
        <p><strong>Username:</strong> {instructor.ins_user_name}</p>
        <p><strong>Email:</strong> {instructor.ins_gmail}</p>
      </div>
      <div className="card-footer">
        <Button
          variant="info"
          className="icon-button"
          style={buttonStyle}
          onClick={() => onViewDetails(instructor)}
        >
          <FaEye size={20} />
        </Button>
        {/* Add delete button logic as needed */}
      </div>
    </motion.div>
  );
};

export default InstructorCard;
