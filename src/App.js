import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src" : "/img/helmet-1.png", match: false },
  { "src" : "/img/potion-1.png", match: false },
  { "src" : "/img/ring-1.png", match: false },
  { "src" : "/img/scroll-1.png", match: false },
  { "src" : "/img/shield-1.png", match: false },
  { "src" : "/img/sword-1.png", match: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turn, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disable, setDisable] = useState(false)

  const shuffleCard = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map(card => ({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisable(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(cards => {
          return cards.map(card => {
            if(card.src === choiceOne.src) {
              return { ...card, match: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    shuffleCard()
  }, [])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(preTurn => preTurn + 1)
    setDisable(false)
  }

  // console.log(cards, turn);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>

      <div className="card-grid">
        {
          cards.map((card) => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.match === true }
              disable={disable}
            />
          ))
        }
      </div>
      <p>Turn: {turn}</p>
    </div>
  );
}

export default App