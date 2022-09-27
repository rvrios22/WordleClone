import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {
    const {gameOver, currAttempt, correctWord} = useContext(AppContext)

  return (
    <div className='gameOver'>
        <h3>{gameOver.guessedWord ? 'Congradulations, you guessed the word!' : 'Sorry, you did not guess the correct word.'} </h3>
        <h3>The Correct word was: {correctWord.toUpperCase()}.</h3>
        {gameOver.guessedWord && (<h3>You guessed in {currAttempt.attempt} attempts. <a href='http://localhost:3000'>Play again</a>?</h3>)}
        {!gameOver.guessedWord && (<h3><a href='http://localhost:3000'>Click here</a> to play again.</h3>)}
    </div>
  )
}

export default GameOver