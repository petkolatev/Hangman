import { useState, useRef } from 'react'

export default function Hangman() {
    const [word, setWord] = useState('')
    const [guessedLetters, setGuessedLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const inputRef = useRef(null)
    const guessRef = useRef(null)
    const guestLenght = wrongLetters.length

    const handleWordSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const inputWord = formData.get('newWord').toLowerCase()
        setWord(inputWord)
        setGuessedLetters([])
        inputRef.current.value = ''
        setWrongLetters([])
    }

    const handleGuess = (e) => {
        e.preventDefault()
        const guess = guessRef.current.value.toLowerCase()
        if (guess && !guessedLetters.includes(guess)) {
            setGuessedLetters((prev) => [...prev, guess])
        }
        if (!word.includes(guess)) {
            setWrongLetters((prev) => [...prev, guess])
        }
        guessRef.current.value = ''
    }

    const getDisplayWord = () => {
        return word
            .split('')
            .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
            .join(' ')
    }

    const isWon = word && word.split('').every((l) => guessedLetters.includes(l))

    return (
        <>

            <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
                <h2>Създай дума</h2>
                <form onSubmit={handleWordSubmit}>
                    <input type="text" name="newWord" ref={inputRef} placeholder="Въведи дума" />
                    <button>Запази</button>
                </form>

                {word && (
                    <>
                        <h1 style={{ letterSpacing: '0.5rem' }}>{getDisplayWord()}</h1>

                        {isWon ? (
                            <h2 style={{ color: 'green' }}>Поздравления! Позна думата!</h2>
                        ) : (
                            <form onSubmit={handleGuess}>
                                <input type="text" maxLength="1" ref={guessRef} placeholder="Буква" />
                                <button>Познай</button>
                            </form>
                        )}

                        <p>Предположени букви: {guessedLetters.join(', ') || 'няма'}</p>
                        {guestLenght > 6 ?
                           (<h2 style={{ color: 'red' }}>Съжaлявам , но загуби!Опитай пак</h2>
                            ): ''}
                    </>
                )}
            </div>
            <div class="hangman">
                <div class="gallows">
                    <div class="pole"></div>
                    <div class="beam"></div>
                    {guestLenght > 0 &&  <div class="rope"></div>}
                </div>
                <div class="man">
                    {guestLenght > 1 && < div class="head"></div>}
                    {guestLenght > 2 && <div class="body"></div>}
                    {guestLenght > 3 && <div class="arm left"></div>}
                    {guestLenght > 4 && <div class="arm right"></div>}
                    {guestLenght > 5 && <div class="leg left"></div>}
                    {guestLenght > 6 && <div class="leg right"></div>}
                </div>
            </div >
        </>
    )
}
