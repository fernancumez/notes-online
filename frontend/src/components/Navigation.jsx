
/*
  En este componenete haremos todo lo realicionado 
  con el diseño de la barra de navegacion, de nuestro 
  proyecto
*/

import React, { Component } from 'react'  //importamos react
import { Link } from 'react-router-dom'  //importamos link de react-router-dom

class Navigation extends Component {
  render() {
    return ( //Aqui retornaremos el componente
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">{/*Barra de navegación*/}
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="material-icons">Notas en Línea </i>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Notas</Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">Crear Notas</Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">Crear Usuario</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">Acerca de</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation;