import { createContext, useState } from "react";

const QuizContext = createContext({
    data: [],
    correctAnswers: [],
    numberCorrect: 0,
    selections: {},
    addData: (data) => {},
    addCorrectAnswers: (answer) => {},
    addSelections: (selection) => {},
    checkAnswers: (answer) => {},
});

export function QuizContextProvider(props) {
    const [data, setData] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [numberCorrect, setNumberCorrect] = useState(null)
    const [selections, setSelections] = useState({})

    function handleAddData(data) {
        setData(data)
    }

    function handleAddCorrectAnswers(data) {
        let newCorrectAnswers = []
        data.map(q => {
            newCorrectAnswers.push(q.correct_answer)
        })
        setCorrectAnswers(newCorrectAnswers)
    }

    function handleAddSelections(selection, questionId) {
        setSelections(prevSelections => {
            return {...prevSelections, [questionId]: selection}
        })
    }

    function handleCheckAnswers(selections, correctAnswers) {
        let counter = 0;
        for (let selection in selections) {
            if (Object.values(correctAnswers).includes(selections[selection])) {
                counter++
            }
        }
        setNumberCorrect(counter)
    }
    const context = {
        data,
        correctAnswers,
        numberCorrect,
        selections,
        addData: handleAddData,
        addCorrectAnswers: handleAddCorrectAnswers,
        addSelections: handleAddSelections,
        checkAnswers: handleCheckAnswers
    }

    return <QuizContext.Provider value={context}>{props.children}</QuizContext.Provider>
}

export default QuizContext