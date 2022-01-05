import React, { useState } from 'react'


const Header = () => {
  return(
    <div>
      <h1>Give Feedback</h1>
    </div>
  )
}

const Results = (props) => {
  var activityflag = false
  const total = props.good + props.bad + props.neutral
  var avg = 0
  var percent = 0
  if (total != 0) {
    activityflag = true
    avg = (props.good - props.bad)/total
    percent = props.good/total
  }
  if (activityflag != true) {
      return(
        <div>
          <h2>Results</h2>
          <p>No Results found!</p>
        </div>
      )
  } else {
    return(  
      <div>
        <table>
          <thead>
            <tr>
              <th> Results </th>
            </tr>
          </thead>
          <tbody>
            <Result_Line text= "Good: " value= {props.good}/>
            <Result_Line text= "Neutral: " value= {props.neutral}/>
            <Result_Line text= "Bad: " value= {props.bad}/>
            <Result_Line text= "Total: " value= {total}/>
            <Result_Line text= "Average: " value= {avg}/>
            <Result_Line text= "Percent Good: " value= {percent*100}/>
          </tbody>
        </table>
        
      </div>
      )
  }
}

const Result_Line = (props) => {
  if (props.text == "Percent Good: ") {
    return(
      <tr> 
        <td>{props.text} </td> 
        <td>{props.value} % </td> 
      </tr>
    )
  }
  return(
    <tr>
      <td>{props.text} </td>
      <td>{props.value} </td>
    </tr>
  )
}


const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood = () => {
    setGood(good+1)
  }
  const handleBad = () => {
    setBad(bad+1)
  }
  const handleNeutral = () => {
    setNeutral(neutral+1)
  }


  return (
    <div>
      <Header/>

      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <Results good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

export default App