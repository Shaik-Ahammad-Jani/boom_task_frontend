import React from "react";

const Button = ({ children, onClick, className = "", type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`btn btn-primary ${className}`}
  >
    {children}
  </button>
);

export default Button;

