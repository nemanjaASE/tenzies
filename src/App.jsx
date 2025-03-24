import { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

import Die from './components/Die/Die'
import './App.css'

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())

  const firstDiceValue = dice[0].value
  const isAllDiceSame = dice.every(die => die.value === firstDiceValue)
  const isAllDiceHeld = dice.every(die => die.isHeld)
  const buttonRef = useRef(null)
  let gameWon = isAllDiceHeld && isAllDiceSame

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
    const newDice = []

    for (let i = 0; i < 10; i++) {
        const randNum = Math.floor(Math.random() * 6) + 1
        newDice.push({
          value: randNum, 
          isHeld: false,
          id: nanoid(),
          hold: (id) => {
            setDice(oldDice => {
              return oldDice.map(die => {
                  return die.id === id ? { ...die, isHeld: !die.isHeld } : die 
              })
          })}
      })
    }

    return newDice
  }

  function rollDice() {
    if (gameWon){
      setDice(generateAllNewDice())
      gameWon = false
    } else {
      setDice(oldDice => oldDice.map(die =>
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      ))
    }
  }

  const firstRow = dice.slice(0, 5).map(dieObj => {
    return <Die key={dieObj.id} props={dieObj} />
  })

  const secondRow = dice.slice(5, 10).map(dieObj => {
    return <Die props={dieObj} />
  })

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className='sr-only'>
        {gameWon && <p>Congrulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die-container'>  
        <div className='die-row'>
          {firstRow}
        </div>
        <div className='die-row'>
          {secondRow}
        </div>
      </div>
      <button ref={buttonRef} className='btn-roll' onClick={rollDice}>{ gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
