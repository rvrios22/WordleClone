import './App.css';
import Keyboard from './components/Keyboard';
import Board from './components/Board';
import GameOver from './components/GameOver';
import Swal from 'sweetalert2';
import { boardDefault, generateWordSet } from './Words'
import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 })
  const [wordSet, setWordset] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [correctWord, setCorrectWord] = useState('')



  useEffect(() => {
    generateWordSet().then(words => {
      setWordset(words.wordSet)
      setCorrectWord(words.todaysWord)
      console.log(words.todaysWord)
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
  }
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ''
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
  }
  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return

    let currWord = ''
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i]
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })

    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })

      Toast.fire({
        icon: 'warning',
        title: 'Oops, that word is not in our dictionary',
        background: '#474747',
        color: '#fff'
      })
    }

    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true })
      setTimeout(() => {
        document.location.reload()
      }, 2500)
    }

    if (currAttempt.attempt === 5 && currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true })
      setTimeout(() => {
        document.location.reload()
      }, 2500)
    } else if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false })
      setTimeout(() => {
        document.location.reload()
      }, 2500)
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        onEnter,
        onDelete,
        onSelectLetter,
        correctWord,
        disabledLetters,
        setDisabledLetters,
        setGameOver,
        gameOver
      }}>
        <div className='game'>

          <Board />

          {gameOver.gameOver ? <GameOver className='gameOver' /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
