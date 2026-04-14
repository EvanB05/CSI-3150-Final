import { useState, useEffect } from 'react';
import he from 'he'; // Fixes &quot; symbols
import wrongSound from '../universfield-error-04-199275.mp3';

export default function QuestionCard({ data, onNext, isLast, onCorrect, currentPoints }) {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  const shake = () => {
    setIsShaking(true);
    // Remove the class after the animation ends (500ms)
    setTimeout(() => setIsShaking(false), 500);
  };

  useEffect(() => {
    // Combine and shuffle answers whenever the question data changes
    const answers = [data.correct_answer, ...data.incorrect_answers];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
  }, [data]);

  function verifyAnswer(answer) {
    //If the selected answer equals the correct answer, increase the score by 1
    setSelectedAnswer(answer);
    const correct = answer === data.correct_answer;
    setIsCorrect(correct)
    if (correct) {
      onCorrect();
    }else{
      new Audio(wrongSound).play();
      shake();
    }
  }

  const [isDisabled, setIsDisabled] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    setHasAnswered(false); // Reset answer state for the new question
    setTimeLeft(15);      // Reset clock to 15 seconds
    setSelectedAnswer(null); // Clear the previous answer selection
    setIsCorrect(null);   // Reset the correctness state
  }, [data]); // <--- Crucial: The effect triggers when 'data' changes

  const handleTimeOut = () => {
    onNext(); // Counts as wrong because player ran out of time
  };

  useEffect(() => {
    // Stop timer when user answers
    if (hasAnswered) return;

    // Exit when time is up
    if (timeLeft === 0) {
      handleTimeOut();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, hasAnswered]);

  return (
    <div className={`question-card ${isShaking ? 'screen-shake' : ''}`}>
      <div className="card-header">
      <div className='score'>Current Score: {currentPoints}</div>
      <h3>{he.decode(data.question)}</h3>
      <div className={`timer ${timeLeft < 5 ? 'critical' : ''}`}>
        Time Remaining: {timeLeft}s
      </div>
      </div>
      <div className="answers-list">
        {shuffledAnswers.map((answer, index) => {
          let btnClass = "answer-btn";
          if (selectedAnswer === answer) {
            btnClass += isCorrect ? " correct" : " incorrect";
          }
          
          return (
          <button key={index} className={btnClass} disabled = {isDisabled} onClick={ async () => {
            verifyAnswer(answer)
            setHasAnswered(true);
            setIsDisabled(true);
            await onNext();
            setIsDisabled(false);
          }}>
            {he.decode(answer)}
          </button>
          );
        }
        )}
      </div>
    </div>
  );
}
