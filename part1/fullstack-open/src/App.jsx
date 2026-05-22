import React from 'react'
import { useState } from 'react'


const Button = ({ onclick, text }) => {
  return (
    <button onClick={onclick}>{text}</button>
  )
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleParams = (statusValoration) => {
    if (statusValoration === "good") {
      setGood(good + 1)
      console.log("Presionaron good")
    }
    if (statusValoration === "neutral") {
      setNeutral(neutral + 1)
      console.log("Presionaron neutral")
    }
    if (statusValoration === "bad") {
      setBad(bad + 1)
      console.log("Presionaron bad")
    }
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <div style={{ display: 'inline-block' }}>
        <Button onclick={() => handleParams("good")} text="good" />
        <Button onclick={() => handleParams("neutral")} text="neutral" />
        <Button onclick={() => handleParams("bad")} text="bad" />
      </div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App
