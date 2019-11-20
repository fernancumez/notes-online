import React, { Component } from 'react';//importando react
import DatePicker from 'react-datepicker';  //Importar calendario
import 'react-datepicker/dist/react-datepicker.css';  //Importar js del calendario 
import axios from 'axios';  //importando el mandejar de peticiones http

export default class CreateNote extends Component {

  state = { //estado de nuestro componente
    title: '',
    content: '',
    date: new Date(),
    userSelected: '',
    users: [],
    editing: false,
    _id: ''
  }

  async componentDidMount() {  //Pedir los datos al backend
    const res = await axios.get('http://localhost:4000/api/users');
    if (res.data.length > 0) {
      this.setState({ //Cambiar el estado de nuestra aplicacion
        users: res.data.map(user => user.username),
        userSelected: res.data[0].username
      })
    }
    if (this.props.match.params.id) {
      console.log(this.props.match.params.id)
      const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
      console.log(res.data)
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        _id: res.data._id,
        editing: true
      });
    }
  }

  onSubmit = async (e) => {  //Metodo para enviar los datos al backend
    e.preventDefault();  //Evitar que la pagina se refresque
    if (this.state.editing) {
      const updatedNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.userSelected,
        date: this.state.date
      };
      await axios.put('http://localhost:4000/api/notes/' + this.state._id, updatedNote);
    } else {
      const newNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.userSelected,
        date: this.state.date
      };
      axios.post('http://localhost:4000/api/notes', newNote);
    }
    window.location.href = '/';

  }

  onInputChange = (e) => { //Metodo para capturar los tados que se ingresen en el titulo y el contenido
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeDate = date => {  //Metodo para manipular el cambio de fecha 
    this.setState({ date });
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3">  {/*Contenedor a la mitad de la pantalla*/}
        <div className="card">
          <div className="card-header text-center">
            <h4>Crear una nota</h4>
          </div>
          <form onSubmit={this.onSubmit} className="card-body">
            {/*Seleccionar usuario */}
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.userSelected}
                onChange={this.onInputChange}
                name="userSelected"
                required>
                {
                  this.state.users.map(user => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))
                }
              </select>
            </div>
            {/*Ingreso del titulo*/}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Título"
                onChange={this.onInputChange}
                name="title"
                value={this.state.title}
                required />
            </div>
              {/*Ingreso de contenido variado*/}
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Contenido"
                name="content"
                onChange={this.onInputChange}
                value={this.state.content}
                required>
              </textarea>
            </div>
              {/*Componenete de calendario de react*/}
            <div className="form-group">
              <DatePicker 
                className="form-control" 
                selected={this.state.date} 
                onChange={this.onChangeDate} />
            </div>
            <button className="btn btn-primary">
              <i className="material-icons">Guardar</i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}
