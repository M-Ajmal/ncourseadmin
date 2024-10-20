import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmationDialog = ({ onConfirm, onCancel }) => {
  return (
    <>
      <div className="overlay" onClick={onCancel}></div>
      <div className="confirmation-dialog">
        <FaExclamationTriangle style={{ color: "orange" }} size={30} />
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this course?</p>
        <div className="dialog-actions">
          <button onClick={onConfirm} className="confirm-button">
            Yes
          </button>
          <button onClick={onCancel} className="cancel-button">
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationDialog;
