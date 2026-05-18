import React from 'react'
import Part from './part.jsx'

const Content = ({ parts }) => {

    return (
        <div>
            <Part parteCurso={parts[0].nombre} numeroEjercicios={parts[0].ejercicios} />
            <Part parteCurso={parts[1].nombre} numeroEjercicios={parts[1].ejercicios} />
            <Part parteCurso={parts[2].nombre} numeroEjercicios={parts[2].ejercicios} />

        </div>
    )
}
export default Content