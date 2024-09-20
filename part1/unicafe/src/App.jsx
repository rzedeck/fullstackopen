import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const DisplayStatistics = ({ value, text, units }) => (
  <p>{text} {value} {units}</p>
)

const Statistics = (props) => {
  if (props.total > 0){
    return (
      <>
        <h1>Statistics</h1>
        <DisplayStatistics value={props.good} text='Good'/>
        <DisplayStatistics value={props.neutral} text='Neutral'/>
        <DisplayStatistics value={props.bad} text='Bad'/>
        <DisplayStatistics value={props.total} text='All'/>
        <DisplayStatistics value={props.average} text='Average'/>
        <DisplayStatistics value={props.positive} text='Positive' units='%'/>
      </>
    )
  }else {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + neutral + bad
    setGood(updatedGood)
    setTotal(updatedTotal)
    calcAvgReviews(updatedGood, bad, updatedTotal)
    calcPositiveReviews(updatedGood, updatedTotal)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = updatedNeutral + good + bad
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
    calcAvgReviews(good, bad, updatedTotal)
    calcPositiveReviews(good, updatedTotal)
  }
  const handleBadClick = () => {
    
    const updatedBad = bad + 1
    const updatedTotal = updatedBad + good + neutral
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
    calcAvgReviews(good, updatedBad, updatedTotal)
    calcPositiveReviews(good, updatedTotal)
  }

  const calcPositiveReviews = (positiveReveiws, totalReviews) => {
    if (totalReviews > 0){
      const calculatedPositiveReviews = positiveReveiws/totalReviews*100
      setPositive(calculatedPositiveReviews)
    }
  }

  const calcAvgReviews = (positiveReveiws, negativeReviews, totalReviews) => {
    if (totalReviews > 0){
      const calculatedAvgReviews = (positiveReveiws-negativeReviews)/totalReviews
      setAverage(calculatedAvgReviews)
    }
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} positive={positive} average={average} />
    </div>
  )
}

export default App