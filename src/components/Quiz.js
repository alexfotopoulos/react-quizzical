import { useContext, useEffect, useState } from 'react'
import QuizContext from '../store/quiz-context'
import DummyData from '../DummyData'
import GameButton from './GameButton'
import Question from './Question'
import { shuffle } from '../helpers'
import { b64DecodeUnicode } from '../helpers'
import { fetchData } from '../helpers'
import './Quiz.css'

export default function () {
    const [isGameOver, setIsGameOver] = useState(false)
    const [reset, setReset] = useState(false)
    const quizCtx = useContext(QuizContext)

    useEffect(() => {
        async function getData() {
            let res = await fetchData()
            quizCtx.addData(res)
            quizCtx.addCorrectAnswers(res)
        }
        getData()
    }, [reset])

    function handleSubmit() {
        let selections = quizCtx.selections
        let correctAnswers = quizCtx.correctAnswers
        quizCtx.checkAnswers(selections, correctAnswers)
        setIsGameOver(true)
    }

    function handleReset() {
        console.log('resetting game...')
        quizCtx.reset()
        setIsGameOver(false)
        setReset(prevReset => (!prevReset))
    }

    return (
        <div className='Quiz'>
            {quizCtx.data.map((q, idx) => (
                <Question id={idx} key={q.question} question={q.question} choices={q.choices} name={`question-${idx}`} gameover={isGameOver}/>
            ))}
            <div className='Quiz-bottomGroup'>
            {isGameOver && <p>{`You answered ${quizCtx.numberCorrect} question(s) correctly`}</p>}
            {!isGameOver ? <GameButton action={handleSubmit} text={"Check Answers"} /> : <GameButton action={handleReset} text={"Play Again"} />}
            </div>
        </div>
    )
}
