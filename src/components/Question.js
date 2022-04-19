import AnswerButton from "./AnswerButton"

export default function Question(props) {

    return (
        <>
            <h3>{props.question}</h3>
            {props.choices.map(choice => (
                <AnswerButton key={choice} answerText={choice} />
            ))}
        </>
    )
}
