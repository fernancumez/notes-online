import React, { useContext } from "react";
import { Link } from "react-router-dom";

import alertContext from "../context/alerts/alertContext";
import Alert from "../components/Alert";

const Navigation = () => {
  const alertsContext = useContext(alertContext);
  const { showAlert } = alertsContext;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="material-icons">Notas en Línea </i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Notas
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Crear Notas
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  Crear Usuario
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showAlert ? (
        <Alert message={showAlert.message} cssClass={showAlert.cssClass} />
      ) : (
        ""
      )}
    </>
  );
};

export default Navigation;
