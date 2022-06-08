import { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import QuizContext from '../store/quiz-context'
import DummyData from '../DummyData'
import GameButton from './GameButton'
import Question from './Question'
import { shuffle } from '../helpers'
import { b64DecodeUnicode } from '../helpers'
import './Quiz.css'
import Card from './Card'

export default function () {
    const [isGameOver, setIsGameOver] = useState(false)
    const [reset, setReset] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const quizCtx = useContext(QuizContext)

    useEffect(() => {
        async function fetchData() {
            let response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=base64')
            let data = await response.json()
            console.log(data.results)
            for (let result of data.results) {
                result.category = b64DecodeUnicode(result.category)
                result.question = b64DecodeUnicode(result.question)
                result.correct_answer = b64DecodeUnicode(result.correct_answer)
                result.difficulty = b64DecodeUnicode(result.difficulty)
                result.type = b64DecodeUnicode(result.type)
                let choices = []
                for (let answer of result.incorrect_answers) {
                    choices.push(b64DecodeUnicode(answer))
                }
                choices.push(result.correct_answer)
                shuffle(choices)
                result.choices = choices
            }
            quizCtx.addData(data.results)
            quizCtx.addCorrectAnswers(data.results)
            setIsLoading(false)
        }
        fetchData()
    }, [reset])

    function handleSubmit() {
        let selections = quizCtx.selections
        let correctAnswers = quizCtx.correctAnswers
        if (Object.keys(selections).length === 5) {
            quizCtx.checkAnswers(selections, correctAnswers)
            setIsGameOver(true)
        } else {
            alert("Answer all questions to submit!")
        }
    }

    function handleReset() {
        console.log('resetting game...')
        quizCtx.reset()
        setIsGameOver(false)
        setIsLoading(true)
        setReset(prevReset => (!prevReset))
    }

    const content = (
        <div>
            {quizCtx.data.map((q, idx) => (
                <Question id={idx} key={q.question} question={q.question} choices={q.choices} name={`question-${idx}`} gameover={isGameOver} />
            ))}
            <div className='Quiz-bottomGroup'>
                {isGameOver && <p>{`You answered ${quizCtx.numberCorrect} question(s) correctly`}</p>}
                {!isGameOver ? <GameButton action={handleSubmit} text={"Check Answers"} /> : <GameButton action={handleReset} text={"Play Again"} />}
            </div>
        </div>
    )

    return (
        <Card>
        <div className='Quiz'>
            {isLoading ? <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner> : content}
        </div>
        </Card>
    )
}
