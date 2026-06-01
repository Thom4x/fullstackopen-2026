import React from 'react'
import { useState } from 'react'

const Agenda = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState({ nombre: 'Arto Hellas', phone: '' })

    const handlerForm = (event) => {
        event.preventDefault()

        const duplicado = persons.some(user => user.nombre === newName.nombre)
        if (duplicado) {
            alert(`${newName.nombre} ya está en la agenda`)
        } if (newName.nombre.trim() === 'Arto Hellas') {
            alert('Arto Hellas is already in the agenda')
        } else {
            const nuevoRegistro = {
                ...newName,
                id: Date.now()
            }
            setPersons(persons.concat(nuevoRegistro))
            setNewName({ nombre: '', phone: '' })
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewName({ ...newName, [name]: value })
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handlerForm}>
                <div>
                    name: <input
                        name='nombre'
                        value={newName.nombre}
                        onChange={handleInputChange} />
                    phone: <input
                        name='phone'
                        type="number"
                        value={newName.phone}
                        onChange={handleInputChange} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((user) =>
                    <li key={user.id}>{`${user.nombre} has a ${user.phone}`}</li>
                )}
            </ul>
        </div>
    )
}

export default Agenda
