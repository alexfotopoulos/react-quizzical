import { useContext, useEffect, useState } from 'react'
import QuizContext from '../store/quiz-context'
import DummyData from '../DummyData'
import GameButton from './GameButton'
import Question from './Question'

export default function () {
    const [isGameOver, setIsGameOver] = useState(false)
    const quizCtx = useContext(QuizContext)

    function b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

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
                result.choices = choices
            }
            quizCtx.addData(data.results)
            quizCtx.addCorrectAnswers(data.results)
        }
        fetchData()
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
