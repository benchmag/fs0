import { useState } from 'react'

const Button = ( { onClick, label, type } ) => {
  return (
    <button onClick={() => onClick(type)} type={type}>
      {label}
    </button>
  )
}

const Heading = ( { text } ) => {
  return <h1>{text}</h1>
}

const Statistic = ( { good, neutral, bad, total, positive } ) => {
  const sum = good + neutral + bad
  if (sum === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <table>
      <tbody>
        <tr>
        <td>Good</td>
        <td>{good}</td>
        </tr>
        <tr>
        <td>Neutral</td>
        <td>{neutral}</td>
        </tr>
        <tr>
        <td>Bad</td>
        <td>{bad}</td>
        </tr>
        <tr>
        <td>Total</td>
        <td>{total}</td>
        </tr>
        <tr>
        <td>Average</td>
        <td>{total > 0 ? Math.round((sum / total) * 10) / 10 : 0}</td>
        </tr>
        <tr>
        <td>Positive</td>
        <td>{total > 0 ? Math.round((good / total) * 100) : 0}%</td>
        </tr>
      </tbody>
      </table>
    )
  }
}

const App = () => {
  // store all feedback counts in one state object
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0
  })

  const handleClick = (type) => {
    setFeedback(prev => ({
      ...prev,
      [type]: prev[type] + 1,
      total: prev.total + 1
    }))
  }

  return (
    <div>
      <Heading text='Give feedback'/>
      <Button onClick={handleClick} label='Good' type='good'/>
      <Button onClick={handleClick} label='Neutral' type='neutral'/>
      <Button onClick={handleClick} label='Bad' type='bad'/>
      <Heading text='Statistics'/>
      <Statistic
        good={feedback.good}
        neutral={feedback.neutral}
        bad={feedback.bad}
        total={feedback.total}
        positive={feedback.good}
      />
    </div>
  )
}

export default App