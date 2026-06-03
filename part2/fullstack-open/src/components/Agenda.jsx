import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

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

const Persons = ({ persons, busqueda }) => {
    return (
        <ul>
            {persons && persons.length > 0 ? (
                persons.filter(user => user.nombre.toLowerCase().includes(busqueda.toLowerCase())).map((user, i) =>
                    <li key={i}>{`${user.nombre} - ${user.phone}`}</li>)
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

    const handlerForm = (event) => {
        event.preventDefault()

        const esDuplicado = persons.some(user => user.nombre === newName.nombre)
        if (esDuplicado) {
            alert(`${newName.nombre} ya está en la agenda`)
            return
        }
        const nuevoRegistro = {
            ...newName,
            id: Date.now()
        }
        axios.post('http://localhost:3001/persons/', nuevoRegistro)
            .then((response) => {
                console.log(response.data);
                setPersons(persons.concat(response.data));
                setNewName({ nombre: '', phone: '' });
            }).catch((error) => {
                console.log("Error..", error);
            })
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
            <Filter searchTerm={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

            <h2>Add a New</h2>
            <PersonForm onSubmit={handlerForm} formData={newName} onChange={handleInputChange} />

            <h2>Numbers</h2>
            <Persons busqueda={busqueda} persons={persons} />

        </div>
    )
}

export default Agenda
