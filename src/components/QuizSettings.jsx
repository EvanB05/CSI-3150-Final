import { useState, useEffect } from 'react';

function loadScoreBoard() {
   const storedString = localStorage.getItem('list');
   const scoreBoard = storedString ? storedString.split(',') : [];
   return scoreBoard;
}

function scoreBoard() {
  if (loadScoreBoard().length > 0) {
    return (
      <div className="scoreboard">
        <h2>Top Scores</h2>
        <ol>
          {loadScoreBoard().map((score, index) => (
          <li key={index}>{score} / 10</li>
        ))}
        </ol>
     </div>
    );
  }else {
    return null;
  }
}

export default function QuizSettings({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories));
  }, []);

  return (
    <div>
    <div className="settings-container">
      <h1>Welcome to the GrandMaster Trivia Game</h1>
      <div className='cat'>
      <label>Category:</label>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Any Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      </div>
      <div className='dif'>
      <label>Difficulty:</label>
      <select onChange={(e) => setSelectedDifficulty(e.target.value)}>
        <option value="">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      </div>
      <button className='start' onClick={() => onStart(selectedCategory, selectedDifficulty)}>
        Start Quiz
      </button>
    </div>
    {scoreBoard()}
    </div>
  );
}
