import React from 'react'
import Part from './part.jsx'

const Content = (props) => {

    return (
        <div>
            <Part parteCurso={props.parte1} numeroEjercicios={props.ejercicios1} />
            <Part parteCurso={props.parte2} numeroEjercicios={props.ejercicios2} />
            <Part parteCurso={props.parte3} numeroEjercicios={props.ejercicios3} />

        </div>
    )
}
export default Content