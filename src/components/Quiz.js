import { useContext, useEffect, useState } from 'react'
import QuizContext from '../store/quiz-context'
import DummyData from '../DummyData'
import GameButton from './GameButton'
import Question from './Question'

export default function () {
    const [isGameOver, setIsGameOver] = useState(false)
    const quizCtx = useContext(QuizContext)

    useEffect(() => {
        quizCtx.addData(DummyData)
        quizCtx.addCorrectAnswers(DummyData)
    }, [])

    function handleSubmit() {
        let selections = quizCtx.selections
        let correctAnswers = quizCtx.correctAnswers
        quizCtx.checkAnswers(selections, correctAnswers)
        setIsGameOver(true)
    }

    function handleReset() {
        console.log('resetting game...')
    }

    return (
        <>
            <div>
                {quizCtx.data.map((q, idx) => (
                    <Question id={idx} key={q.question} question={q.question} choices={q.choices} name={`question-${idx}`}/>
                ))}
            </div>
            {isGameOver && <p>{`You answered ${quizCtx.numberCorrect} question(s) correctly`}</p>}
            {!isGameOver ? <GameButton action={handleSubmit} text={"Check Answers"}/>  : <GameButton action={handleReset} text={"Play Again"}/>}
        </>
    )
}
