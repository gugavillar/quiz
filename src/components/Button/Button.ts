import styled from 'styled-components'

interface InputProps {
  isHeld: boolean
  correct: boolean | string
}

const Container = styled.div<InputProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.8rem;
  padding: 0 1.5rem;
  background: ${props => (props.isHeld ? '#D6DBF5' : 'transparent')};
  background: ${props =>
    props.correct === true && props.isHeld ? '#94D7A2' : props.title === props.correct ? '#F8BCBC' : ''} !important;
  border: ${props => (props.isHeld ? 'none' : '1px solid #293264')};
  border-radius: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
  color: #293264;
`

const Button = styled.input`
  appearance: none;
`

export { Button, Container }
