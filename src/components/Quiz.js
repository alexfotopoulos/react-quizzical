import { useState } from 'react'
import DummyData from '../DummyData'
import GameButton from './GameButton'
import Question from './Question'

export default function () {
    const [data, setData] = useState(DummyData)
    console.log(data)
    function handleCheckAnswers() {
        console.log("checking answers...")
    }
    return (
        <>
            <ul>
                {data.map(q => (
                    <Question key={q.correct_answer} question={q.question} choices={q.choices} />
                ))}
            </ul>
            <GameButton action={handleCheckAnswers} text={"Check Answers"} />
        </>
    )
}
