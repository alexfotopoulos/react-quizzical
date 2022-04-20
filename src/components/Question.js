import { useState, useContext } from 'react'
import QuizContext from '../store/quiz-context'
import AnswerButton from "./AnswerButton"
import './Question.css'

export default function Question(props) {
    const [selected, setSelected] = useState(null);
    const quizCtx = useContext(QuizContext);
    const questionId = props.id
    function handleSelect(choice) {
        setSelected(choice)
        quizCtx.addSelections(choice, questionId)
    }
    return (
        <div className='Question'>
            <h4>{props.question}</h4>
            <div className='Question-answerButtonGroup'>
            {props.choices.map(choice => (
                <AnswerButton
                    key={choice}
                    answerText={choice}
                    classText={
                        props.gameover ? ((choice === selected && quizCtx.correctAnswers.includes(choice)) ? 'AnswerButton-correct' : (choice === selected ? 'AnswerButton-incorrect' : (quizCtx.correctAnswers.includes(choice) ? 'AnswerButton-correct' : 'AnswerButton'))) : 
                        (choice === selected ? 'AnswerButton-selected' : 'AnswerButton')
                    }
                    onSelect={handleSelect}
                    correct={quizCtx.correctAnswers.includes(choice) ? true : false}
                />
            ))}
            </div>
        </div>
    )
}
