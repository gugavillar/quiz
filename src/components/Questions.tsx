import { FormEvent } from 'react'

import { Button, Container } from './Button/Button'

interface Answers {
  answer: string
}

interface QuestionProps {
  question: string
  answers: Answers[]
  onHandleSelect: (event: FormEvent) => void
  checked: string
  correct: boolean | string
}

function Questions({ question, answers, checked, correct, onHandleSelect }: QuestionProps) {
  const responses = answers.map((response, index) => (
    <Container key={index} isHeld={checked === response.answer} correct={correct} title={response.answer}>
      <Button
        id={response.answer}
        type='radio'
        name={question}
        value={response.answer}
        checked={checked === response.answer}
        onChange={onHandleSelect}
      />
      <label htmlFor={response.answer}>{response.answer}</label>
    </Container>
  ))
  return (
    <>
      <section className='questions'>
        <h3>{question}</h3>
        <div className='answers'>{responses}</div>
      </section>
    </>
  )
}

export { Questions }
