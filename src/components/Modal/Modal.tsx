import React from "react";
import { useKeyDown } from "../../hooks/useKeyDown";

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
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: props.open ? "block" : "none",
        zIndex: 99999,
      }}
    >
      <div
        className="modal-content"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "600px",
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          className="modal-close"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
          }}
          onClick={props.onClose}
        >
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
