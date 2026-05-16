import React from 'react'
import Header from './components/header.jsx'
import Content from './components/content.jsx'
import Total from './components/total.jsx'

const App = () => {
  const curso = 'Desarrollo Web'
  const parte1 = "Fundamentos de Programacion"
  const ejercicios1 = 11
  const parte2 = 'Preparacion de Comidas Avanzadas'
  const ejercicios2 = 14
  const parte3 = 'Electiva 3'
  const ejercicios3 = 18

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