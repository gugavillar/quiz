
interface StartProps {
  handleStart: () => void;
}

function Start({ handleStart }: StartProps) {
  return (
    <div className="start-quiz">
      <h1>Quizzical</h1>
      <h2>Response the questions and check your knowledge</h2>
      <button onClick={handleStart}>Start quiz</button>
    </div>
  );
}

export { Start };
