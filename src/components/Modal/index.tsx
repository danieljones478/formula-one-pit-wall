import React from "react";
import "./Modal.css";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="Modal fade-in" role="dialog" aria-modal="true">
      <div className="Modal-content">
        {children}
        <button className="Modal-close-button" onClick={onClose}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default Modal;
