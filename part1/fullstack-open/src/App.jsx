import React from 'react'
import Header from './components/header.jsx'
import Content from './components/content.jsx'
import Total from './components/total.jsx'

const App = () => {
  const curso = {
    nombreCurso: "Half Stack application development",
    parts: [
      {
        nombre: "Fundamentos de Programacion",
        ejercicios: 11
      },
      {
        nombre: "Preparacion de Comidas Avanzadas",
        ejercicios: 14
      },
      {
        nombre: 'Electiva 3',
        ejercicios: 18
      }
    ]
  }
  return (
    <div>
      <Header titulo={curso.nombreCurso} />
      <Content parts={curso.parts} />
      <Total parts={curso.parts} />
    </div >
  )
}

export default App