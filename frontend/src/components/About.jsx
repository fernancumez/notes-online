import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>Acerca de</h1>
        <hr />
        <div className="btn btn-light text-left">
          <h5>Este es el sistema de notas que maneja la empresa Notas en Línea</h5>
          <h5>la cual se encarga de que las personas puedan crear un usuario propio</h5>
          <h5>y así poder anotar cualquier acontecimimeto importante.</h5>
        </div>
        <div className="mt-5">
          <h5>Luis Fernando Cúmez Quiná - 1990-18-12101</h5>
          <h5>Daniel Alexander Vicente Sanic - 1990-18-21636</h5>
        </div>
      </div>
    );
  }
}

export default About;