import React from "react";
import { useKeyDown } from "../../hooks/useKeyDown";
import "./styles.css";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = (props: ModalProps) => {
  useKeyDown(() => props?.onClose?.(), ["Escape"]);

  return (
    <div
      className="modal-overlay"
      style={{
        display: props.open ? "block" : "none",
      }}
    >
      <div className="modal-content">
        <div className="modal-close" onClick={props.onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
