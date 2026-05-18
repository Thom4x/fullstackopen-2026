import React from 'react'
import Content from './content.jsx'
import Part from './part.jsx'
const Total = ({ parts }) => {
    const totalSuma = parts.reduce((acc, num) => acc + num.ejercicios, 0)
    return (
        <div>
            <p>Numero total de ejercicios {totalSuma}</p>
        </div>
    )
}

export default Total