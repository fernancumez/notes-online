import React from "react";
import "../styles/Errors.css";
import NotFoundImg from "../images/404.png";

const NotFound = () => (
  <div className="text-center">
    <h1 className="error-text">Error: 404 Page Not Found</h1>
    <img src={NotFoundImg} alt="404 NotFound" className="error-image" />
  </div>
);

export default NotFound;
