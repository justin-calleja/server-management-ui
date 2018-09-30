import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

const Modal = ({ show, onBackdropClick, children }) => (
  <React.Fragment>
    <Backdrop show={show} onClick={onBackdropClick} />
    <div
      className="Modal"
      style={{
        transform: show ? "translateY(0)" : "translateY(-100vh)",
        opacity: show ? "1" : "0"
      }}
    >
      {children}
    </div>
  </React.Fragment>
);

export default Modal;
