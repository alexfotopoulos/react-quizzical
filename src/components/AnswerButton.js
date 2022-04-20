import { useState } from 'react'
import './AnswerButton.css'

export default function AnswerButton(props) {
    const [selected, setSelected] = useState(null);

    function handleSelect() {
        props.onSelect(props.answerText)
    }

    return (
        <button className={props.classText} onClick={handleSelect}>{props.answerText}</button>
    )
}
