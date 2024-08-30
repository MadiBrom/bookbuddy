import React from "react";

function Toast({ message, show }) {
  return <div className={`toast ${show ? "show" : ""}`}>{message}</div>;
}

export default Toast;
