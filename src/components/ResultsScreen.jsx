import myGif from '../patrick-gallon.gif';
export default function ResultsScreen({ currentPoints, onRestart }) {
  return (
    <div className="results-container">
      <h1>Quiz Completed!</h1>
      <h2>Final score: {currentPoints} / 10</h2>
      <p>
        {currentPoints >= 10 ? "Congratulations, you're a GrandMaster!":
         currentPoints >= 8 ? "This guy knows ball!":
         currentPoints >= 6 ? "Not bad, but you can do better!" :
         currentPoints >= 4 ? "Look's like trivia isn't for you. Maybe try underwater basket weaving?" :
        <img src={myGif} alt="lmao" className="lmao" />}
      </p>
      {}
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}