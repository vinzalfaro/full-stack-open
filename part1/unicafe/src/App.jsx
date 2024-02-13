import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.statistics.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.statistics.good}</p>
      <p>neutral {props.statistics.neutral}</p>
      <p>bad {props.statistics.bad}</p>
      <p>all {props.statistics.all}</p>
      <p>average {props.statistics.average}</p>
      <p>positive {props.statistics.positive} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log('good before:', {good})
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    console.log('neutral before:', {neutral})
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    console.log('bad before:', {bad})
    setBad(bad + 1)
  }

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good * 100 / all

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App