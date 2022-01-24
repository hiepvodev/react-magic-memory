import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disable }) {

    const handleClick = () => {
        if(!disable) {
            handleChoice(card)
        }
    }

    return (
        <div className="card" key={card.id}>
            <div className={flipped ? 'flipped' : ''}>
            <img src={card.src} className="front" alt="card front"/>
            <img src="/img/cover.png" className="back" onClick={handleClick} alt="card back"/>
            </div>
        </div>
    )
}
