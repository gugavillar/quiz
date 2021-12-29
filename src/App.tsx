import { FormEvent, useEffect, useState } from 'react'

import { Questions } from './components/Questions'
import { Start } from './components/Start'

interface Answers {
  answer: string
}

interface QuestionsContent {
  question: string
  correct_answer: string
  incorrect_answers: Answers[]
  checked: string
  correct: string | boolean
}

interface QuestionData {
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

function App() {
  const [start, setStart] = useState(false)
  const [again, setAgain] = useState(false)
  const [total, setTotal] = useState(0)
  const [questions, setQuestions] = useState<QuestionsContent[]>([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=url3986')
      .then(results => results.json())
      .then(data =>
        setQuestions(
          data.results.map((question: QuestionData) => {
            question.incorrect_answers.unshift(question.correct_answer)
            const answers = question.incorrect_answers.map(answer => {
              return {
                answer: decodeURIComponent(answer)
              }
            })
            return {
              question: decodeURIComponent(question.question),
              incorrect_answers: answers.sort(() => Math.random() - 0.5),
              correct_answer: decodeURIComponent(question.correct_answer),
              checked: ''
            }
          })
        )
      )
  }, [again])

  function handleStart() {
    setStart(true)
  }

  function handleSelect(event: FormEvent) {
    const { id, name } = event.target as HTMLInputElement
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        name === question.question
          ? {
              ...question,
              checked: id
            }
          : question
      )
    )
  }

  function checkScore() {
    setTotal(
      questions.reduce((acc, question) => {
        if (question.checked === question.correct_answer) {
          acc++
        }
        return acc
      }, 0)
    )
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.checked === question.correct_answer
          ? { ...question, correct: true }
          : { ...question, correct: question.correct_answer }
      )
    )
  }

  function playAgain() {
    setAgain(prevAgain => !prevAgain)
    setTotal(0)
  }

  const questionElement = questions.map(question => {
    return (
      <Questions
        key={question.question}
        question={question.question}
        answers={question.incorrect_answers}
        onHandleSelect={handleSelect}
        checked={question.checked}
        correct={question.correct}
      />
    )
  })

  return (
    <>
      {!start ? (
        <Start handleStart={handleStart} />
      ) : (
        <div className='questions-container'>
          {questionElement}
          {total ? (
            <div className='score-container'>
              <h2>You scored {total}/5 correct answers</h2>
              <button onClick={playAgain}>Play again</button>
            </div>
          ) : (
            <button className='check' onClick={checkScore}>
              Check answers
            </button>
          )}
        </div>
      )}
    </>
  )
}

export { App }
