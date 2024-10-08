import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [mostVotedIndex, setmostVotedIndex] = useState(0)

  const handleNextClick = () => {
    //console.log('Votes array ', votes)
    const randomNum = Math.floor(Math.random() * anecdotes.length) -1
    if(randomNum >= 0){
      setSelected(randomNum)
    }else{
      setSelected(anecdotes.length - 1)//the last joke is used for out of bounds instead the first one [0]
    }
    
  }

  const handleVoteClick = () => {
    const pointsCopy = [...votes]
    pointsCopy[selected] += 1
    setVotes(pointsCopy)
    const maxVoteValue = Math.max(...pointsCopy)
    const maxVoteIndex = pointsCopy.indexOf(maxVoteValue)
    setmostVotedIndex(maxVoteIndex)
  }

  return (
    <div>
      <h1>Anedocte of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVoteClick} text='Vote' />
      <Button handleClick={handleNextClick} text='Next Anedocte' />
      <h1>Anedocte with most votes</h1>
      <p>{anecdotes[mostVotedIndex]}</p>
      <p>has {votes[mostVotedIndex]} votes</p>
    </div>
  )
}

export default App