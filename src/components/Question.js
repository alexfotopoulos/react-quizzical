import { useState, useContext } from 'react'
import QuizContext from '../store/quiz-context'
import AnswerButton from "./AnswerButton"

export default function Question(props) {
    const [selected, setSelected] = useState(null);
    const quizCtx = useContext(QuizContext);
    const questionId = props.id
    function handleSelect(choice) {
        setSelected(choice)
        quizCtx.addSelections(choice, questionId)
    }
    return (
        <>
            <h3>{props.question}</h3>
            {props.choices.map(choice => (
                <AnswerButton
                    key={choice}
                    answerText={choice}
                    classText={choice === selected ? 'AnswerButton-selected' : ''}
                    onSelect={handleSelect}
                />
            ))}
        </>
    )
}
