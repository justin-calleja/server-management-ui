import React from "react";
import "./Button.css";

const Button = ({ onClick, children, className }) => (
  <button
    className={["Button", className].filter(Boolean).join(" ")}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
