
//TODO: Componente para crear usuarios

import React, { Component } from 'react'; //?importando react
import axios from 'axios';  //?Importando axios que nos permite hacer peticiones http(put, delete, post, get)

class CreateUser extends Component {

  state = { //El estado de nuestra aplicacion
    username: '', //Nombre del usuario
    users: [] //Numero de usuarios
  }

  async componentDidMount() {    //*Metodo para pedir los usuarios registrados en el servidor
    this.getUsers();
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users'); //Nos permite traer los datos del servidor
    this.setState({  //Cambiar el estado
      users: res.data
    });
  }

  onChangeUsername = e => { //Cambir el estado con un nuevo usuario
    this.setState({
      username: e.target.value
    })
  }

  onSubmit = async (e) => {
    e.preventDefault(); //Cancela el comportamiento de reinicio de pagina
    await axios.post('http://localhost:4000/api/users', {
      username: this.state.username
    });
    this.setState({ username: '' });
    this.getUsers();
  }

  deleteUser = async (userId) => {  //Nos permite eleminar usuarios
    const response = window.confirm('Quieres eliminar este usuario?');
    if (response) {
      await axios.delete('http://localhost:4000/api/users/' + userId);
      this.getUsers();
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header text-center">
              <h3>Crear un usuario</h3>
            </div>
            <form onSubmit={this.onSubmit} className="card-body"> {/*Crear usuarios */}
              <div className="form-group">
                <input
                  className="form-control"
                  value={this.state.username}
                  type="text"
                  onChange={this.onChangeUsername}
                />
              </div>
              <button type="submit" className="btn btn-secondary">  {/*Guardar usuarios */}
                <i>Guardar</i>
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">  {/*Mostrar usuarios guardados*/}
            {
              this.state.users.map(user => (
                <li
                  className="list-group-item list-group-item-action"
                  key={user._id}>
                  <b>Usuario:</b> {user.username}
                  <span>
                    <button className="btn btn-danger float-right text-light cursor-pointer rounded-pill"
                      onClick={() => this.deleteUser(user._id)}>
                      Eliminar
                    </button>
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default CreateUser;