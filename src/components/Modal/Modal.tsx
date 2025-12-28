import type React from "react";
import "./Modal.css";

export const Modal: React.FC<
  React.PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    title: string;
  }>
> = ({ children, open, onClose, title }) => {
  return (
    <div
      className={`modal-overlay ${open ? "open" : ""}`}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          onClose();
        }
      }}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
};
