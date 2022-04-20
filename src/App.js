import { useState } from 'react'
import './App.css';
import GameButton from './components/GameButton'
import Quiz from './components/Quiz'
import { QuizContextProvider } from './store/quiz-context'

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true)

  function handleStartQuiz() {
    setIsPlaying(true)
  }

  let content
  if (!isPlaying) {
    content = (
      <>
        <h1>Quizzical</h1>
        <h6 className='App-description'>Welcome to Quizzial! Click below to start your quiz!</h6>
        <GameButton action={handleStartQuiz} text="Start Quiz!" />
      </>
    )
  } else {
    content = (
      <QuizContextProvider>
        <Quiz />
      </QuizContextProvider>
    )
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}