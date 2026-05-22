import React from 'react'
import { useState } from 'react'


const Button = ({ onclick, text }) => {
  return (
    <button onClick={onclick}>{text}</button>
  )
}

const Stadistics = ({ good, neutral, bad, feedback, feedbackAverage, goodPercentage }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {feedback}</p>
      <p>average {feedbackAverage}</p>
      <p>positive {goodPercentage}%</p>
    </div>
  )
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedback, setFeedback] = useState([])

  const handleParams = (statusValoration) => {
    if (statusValoration == "good") {
      setGood(good + 1)
      console.log("Agregado good")
      setFeedback(feedback.concat(1))
    }
    if (statusValoration === "neutral") {
      setNeutral(neutral + 1)
      console.log("Agregado neutral")
      setFeedback(feedback.concat(0))

    }
    if (statusValoration === "bad") {
      setBad(bad + 1)
      console.log("Agregado bad")
      setFeedback(feedback.concat(-1))
    }
  }

  const averageFeedback = feedback.reduce((acc, num) => acc + num, 0);
  const feedbackAverage = averageFeedback / feedback.length;

  const goodFeedbacks = feedback.filter((score) => score == 1);
  const neutralFeedbacks = feedback.filter((score) => score == 0);
  const badFeedbacks = feedback.filter((score) => score == -1);

  const totalFiltered = goodFeedbacks.length + neutralFeedbacks.length + badFeedbacks.length;
  const goodPercentage = (goodFeedbacks.length / totalFiltered) * 100;

  return (
    <div>
      <h1>Give feedback</h1>
      <div style={{ display: 'inline-block' }}>
        <Button onclick={() => handleParams("good")} text="good" />
        <Button onclick={() => handleParams("neutral")} text="neutral" />
        <Button onclick={() => handleParams("bad")} text="bad" />
      </div>
      <h1>statistics</h1>
      <Stadistics
        good={good}
        bad={bad}
        neutral={neutral}
        feedback={feedback.length}
        feedbackAverage={isNaN(feedbackAverage) ? 0 : feedbackAverage.toFixed(2)}
        goodPercentage={isNaN(goodPercentage) ? 0 : goodPercentage.toFixed(2)} />
    </div>
  )
}

export default App
