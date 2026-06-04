import React from 'react'
import axios from 'axios'
import '../App.css'
import { useState, useEffect } from 'react'
import personServices from '../services/persons.js'

const Message = ({ message, status }) => {
    if (message === '') {
        return null
    }
    const className = status === 'success' ? 'exit' : 'error';

    return (
        <div className={className}>
            {message}
        </div>
    );
}

const Filter = ({ searchTerm, onChange }) => {
    return (
        <input
            type="text"
            value={searchTerm}
            onChange={onChange} />
    )
}

const InputForm = ({ name, type, value, onChange, placeholder }) => {
    return (
        <input
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange} />
    )
}



const PersonForm = ({ onSubmit, formData, onChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name:
                <InputForm name='nombre' type='text' value={formData.nombre} onChange={onChange} placeholder='nombre de la persona...' />
                <br />
                phone:
                <InputForm name='phone' type='number' value={formData.phone} onChange={onChange} placeholder='numero telefonico...' />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

const Persons = ({ persons, busqueda, deletePerson }) => {
    return (
        <ul>
            {persons && persons.length > 0 ? (
                persons.filter(user => user.nombre.toLowerCase().includes(busqueda.toLowerCase())).map((user) =>
                    <li key={user.id}>{`${user.nombre} - ${user.phone} - ${user.id}`} <button onClick={() => deletePerson(user.id)}>Delete</button> </li>
                )
            ) : (
                <p>No hay personas en la agenda</p>
            )
            }
        </ul>
    )
}

const Agenda = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState({ nombre: '', phone: '' })
    const [busqueda, setBusqueda] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('success');

    useEffect(() => {
        personServices
            .getAll()
            .then((data) => {
                setPersons(data)
            })
            .catch((error) => {
                console.log("Error al obtener los datos", error)
            })
    }, [])


    const handlerForm = (event) => {
        event.preventDefault()

        const nuevoRegistro = {
            ...newName,
            id: Date.now()
        }

        const usuarioEncontrado = persons.find(user => user.nombre === newName.nombre);

        if (usuarioEncontrado) {
            if (window.confirm(`${newName.nombre} ya está agregada, ¿Deseas actualizar su número telefónico?`)) {
                personServices
                    .updateData(usuarioEncontrado.id, nuevoRegistro)
                    .then((updateData) => {
                        setPersons(persons.map(p => p.id === usuarioEncontrado.id ? updateData : p))
                        setNewName({ nombre: '', phone: '' })
                        setMessage(`${newName.nombre} actualizado correctamente`)
                        setTimeout(() => {
                            setMessage('')
                        }, 3000);
                    }).catch((error) => {
                        setMessageType('error')
                        setMessage(`Information of ${newName.nombre} has already been removed from server`)
                        setTimeout(() => {
                            setMessage('')
                            setMessageType('success')
                        }, 2000);
                    })
            }
        } else {
            personServices
                .create(nuevoRegistro)
                .then((newData) => {
                    setPersons(persons.concat(newData))
                    setNewName({ nombre: '', phone: '' })
                    setMessage(`${newName.nombre} agreg ado correctamente`)
                    setTimeout(() => {
                        setMessage('')
                    }, 3000);
                }).catch((error) => {
                    setMessageType('error')
                    setMessage(`Error intentando añadir al usuario`)
                    setTimeout(() => {
                        setMessage('')
                        setMessageType('success')
                    }, 3000);
                })
        }
    }

    const handleDelete = (id) => {
        if (window.confirm(`Deseas eliminar al usuario ${persons.find(p => p.id === id)?.nombre}?`)) {
            personServices
                .deleteData(id)
                .then((dataDelete) => {
                    console.log(dataDelete)
                    setPersons(persons.filter(p => p.id !== id))
                }).catch((error) => {
                    console.log("error en...", error)
                })
        } else {
            console.log("Eliminación cancelada")
        }
    }


    const handleInputChange = (event) => {
        console.log("Nombre del campo:", event.target.name);
        console.log("Valor nuevo:", event.target.value);

        const { name, value } = event.target
        setNewName({ ...newName, [name]: value })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Message message={message} status={messageType} />
            <Filter searchTerm={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <h2>Add a New</h2>
            <PersonForm onSubmit={handlerForm} formData={newName} onChange={handleInputChange} />

            <h2>Numbers</h2>
            <Persons busqueda={busqueda} persons={persons} deletePerson={handleDelete} />
            <button onClick={() => personServices.updateData(1, { nombre: "Arto Hellas", phone: "555", id: 1 })}>UPDATE</button>
        </div>
    )
}

export default Agenda
