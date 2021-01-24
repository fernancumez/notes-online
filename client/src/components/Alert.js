import React from "react";

const Alert = ({ message, cssClass }) => (
  <div className="container">
    <div className={`alert alert-${cssClass} mt-2`}>{message}</div>
  </div>
);

export default Alert;
