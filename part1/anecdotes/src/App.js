import React, { useState } from 'react'
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
const Topvoted = (props) => {
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      {props.anecdotes[props.votes.indexOf(Math.max(...props.votes))]}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [votes,setVotes] = useState(new Uint8Array(anecdotes.length))
  const [selected, setSelected] = useState(0)


  const anecdote_handler = () => {
    setSelected(getRandomInt(0,anecdotes.length))
  }
  const vote_handler = () => {
    const copy = [...votes]
    copy[selected] +=1
    setVotes(copy)
    }

  return (
    <div>
      <p>
        {anecdotes[selected]}
      </p>
      <button onClick={anecdote_handler}>Get New Anecdote</button>
      <button onClick={vote_handler}>Vote for this anecdote</button>
      {console.log(selected)}
      {console.log(votes)} 
      <Topvoted anecdotes={anecdotes} votes={votes} />

    </div>
  )
}

export default App