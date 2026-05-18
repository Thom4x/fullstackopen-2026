import React from 'react'
import Header from './components/header.jsx'
import Content from './components/content.jsx'
import Total from './components/total.jsx'

const App = () => {
  const curso = 'Desarrollo Web'
  const parte1 = {
    nombre: "Fundamentos de Programacion",
    ejercicios: 11
  }
  const parte2 = {
    nombre: "Preparacion de Comidas Avanzadas",
    ejercicios: 14
  }
  const parte3 = {
    nombre: 'Electiva 3',
    ejercicios: 18
  }
  return (
    <div>
      <Header titulo={curso} />
      <Content
        parte1={parte1}
        ejercicios1={ejercicios1}
        parte2={parte2}
        ejercicios2={ejercicios2}
        parte3={parte3}
        ejercicios3={ejercicios3}
      />
      <Total total={ejercicios1 + ejercicios2 + ejercicios3} />
    </div >
  )
}

export default App