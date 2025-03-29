import React, { useEffect, useState } from "react";
import "./Modal.css";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onClose();
    }, 500); // Match the fade-out animation duration
  };

  useEffect(() => {
    if (!isVisible) {
      setIsFadingOut(false);
    }
  }, [isVisible]);

  return (
    <div
      className={`Modal ${isVisible ? "fade-in" : ""} ${isFadingOut ? "fade-out" : ""}`}
    >
      <div className="Modal-content">
        {children}
        <button className="Modal-close-button" onClick={handleClose}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default Modal;
