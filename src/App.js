import { useState} from 'react';
import QuizSettings from './components/QuizSettings';
import QuestionCard from './components/QuestionCards';
import ResultsScreen from './components/ResultsScreen';
import correctSound from './universfield-new-notification-037-485898.mp3';

function App() {
  const [questions, setQuestions] = useState([]);
  const [gameState, setGameState] = useState('settings'); // 'settings', 'quiz', 'results'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);

  const startQuiz = async (category, difficulty) => {
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.response_code === 0) {
        setQuestions(data.results);
        setCurrentIndex(0); // Queue up the first question
        setGameState('quiz'); // Start the quiz
      } else {
        alert("No questions found for this combination!");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  function loadScoreBoard() {
     const storedString = localStorage.getItem('list');
     const scoreBoard = storedString ? storedString.split(',') : [];
     return scoreBoard;
    }
    const scoreBoard = loadScoreBoard();
    function updateScoreBoard() {
      scoreBoard.push(currentPoints);
      scoreBoard.sort((a, b) => b - a);
      if (scoreBoard.length > 5) {
        scoreBoard.pop();
      }
    }

  const delay = async (ms) => {
        return new Promise((resolve) => 
            setTimeout(resolve, ms));
    };

  const handleNext = async () => {
    await delay(1000); // Wait for 1 second before moving to the next question
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameState('results');
    }
  };

  const incrementScore = () => {
    setCurrentPoints(currentPoints + 1);
    new Audio(correctSound).play();

  }

  return (
    <div className="App">
      {gameState === "settings" && (
        <QuizSettings onStart={startQuiz} />
      )}
      {gameState === "quiz" && questions.length > 0 && (
        <QuestionCard 
          data={questions[currentIndex]} 
          onNext={handleNext} 
          onCorrect={incrementScore}
          currentPoints={currentPoints}
          isLast={currentIndex === questions.length - 1}
        />
      )}
      {gameState === "results" && (
        <ResultsScreen currentPoints={currentPoints} onRestart={() => {
          updateScoreBoard();
          localStorage.setItem('list', scoreBoard.join(','));
          setGameState('settings');
          setCurrentPoints(0);
          setQuestions([]);
          setCurrentIndex(0);
        }} />
      )}
    </div>
  );
}

export default App;