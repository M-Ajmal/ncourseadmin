import React from "react";
import { FaCheck, FaTimes, FaQuestionCircle } from "react-icons/fa";
import { Modal, ModalContent, ActionButton } from "./styles";

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <Modal>
      <ModalContent>
        <FaQuestionCircle size={40} color="#17a2b8" />
        <h2>Are you sure you want to delete this review?</h2>
        <div>
          <ActionButton bg="#28a745" onClick={onConfirm}>
            <FaCheck size={16} />
          </ActionButton>
          <ActionButton bg="#dc3545" onClick={onCancel}>
            <FaTimes size={16} />
          </ActionButton>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
