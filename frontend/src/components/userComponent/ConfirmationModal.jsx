import React, { useState } from "react";
import Modal from "react-modal";

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div>
        <p>Are you sure you want to remove this plan?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
