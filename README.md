Evan Bruce

Triva App

Live App: https://csi-3150-final-falx-sigma.vercel.app/

GitHub Repo: https://github.com/EvanB05/CSI- 3150 - Final


## Overview ##

The purpose of the GrandMaster Trivia Game, as implemented in this project, is to give
PC and mobile users a free, engaging, and user-friendly way to interact with the Open Trivia
Database in their web browser. The app creates a quiz consisting of 10 random questions from
the user’s choice of any of the categories and difficulties provided by the Open Trivia Database,
effectively utilizing the entire community-driven database, which includes 5193 total questions
at the time of writing this report, although only the multiple choice questions are used. Users are
required to select the correct answer to each question within 15 seconds of the question
appearing on screen, and at the end of each quiz, a result screen is displayed with the score out of
10 and a message depending on how well the user performed.


## Component Architecture ##

- App.js: The main application file, which stores the global state for the app, with the
    possible states being QuizSettings, QuestionCard, and ResultsScreen
- QuestionCards.js: Defines the QuestionCard state and builds the quiz itself, displaying
    each question, the timer, the current score, and the answer options. When a question is
answered, the next question is displayed. When the last question is answered,s the state
changes to ResultsScreen.

- ResultsScreen.jsx: Displays the final score out of ten, a button to switch the state back to
    QuizSettings, and a message that depends on how well the player performed.
- QuizSettings.jsx: Displays the dropdown menu input items for selecting a category and
    difficulty, the start button that switches the state to QuestionCard, and the scoreboard if
    available.

## Detailed Functionality ##

1. API: This app uses the Open Trivia DB API. The API is called from the URL
    “https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficult
    y}&type=multiple” where category and difficulty are variables set by “selectedCategory”
    and “selectedDifficulty” in QuizSettings.jsx
2. Timer: The timer is contained within the question card and counts down from 15 seconds
    whenever a new question loads. The the useEffect in QuestionCards contains a call to set
    the timer to 15 seconds, that way the timer resets whenever the question card updates. It
    also pauses whenever an answer is selected in order to prevent last-second button clicks
    from being dropped during the one second pause between selecting an answer and
    loading the next question. When the timer reaches zero, the function onNext is called,
    loading the next question.
3. Persistence: localStorage for the scoreboard is loaded in the return statement of the main
    function in QuizSettings so that it persists in the game’s start screen, but is contained in a
    div that’s only visible if the scoreboard is not empty. On the results screen, the score is
    added to the scoreboard array, which is sorted in descending order and all entries with an
ID of 5 are removed. The scoreboard array is then converted to a string and saved to
localStorage.

4. Shuffle Logic: The shuffle logic for the answers to each question is handled by a simple
    sort function where a number between - 0.5 and 0.5 is assigned to each answer, and the
    order is based on whether that number is positive, negative, or zero.
5. Audiovisual Feedback: The animations and sounds for when a question is answered
    correctly or incorrectly are tied to the checkAnswer function. The screen shake on
    incorrect answers shakes the entire question card, which is scaled up during the animation
    to prevent white gaps around the view window.


## User Guide ##

- Step 1: Click “Any Category” and select a category from the drop-down menu, then click
    “Any Difficulty” and select a difficulty from the drop-down menu.
- Step 2: Press the “Start Quiz” button to switch to the QuestionCard state and begin the
    quiz.
- Step 3: Click the button corresponding to the correct answer before the 15 second timer
    runs out. Repeat until the results screen is displayed.
- Step 4: Press the “Play Again” button to return to the start screen (QuizSettings) and have
    your score displayed unless there are already five stored scores that are higher.



## Technical Challenges and Solutions ##

The biggest technical challenge in the development of this app was implementing the
scoreboard function. What made it so difficult was the fact that the fact that it was the very last
thing I implemented after all the other code had been finalized. As a result, I had to find a way to
incorporate it effectively without disrupting the rest of my code. I initially had it set to save
scores to local storage as part of a useEffect() in ResultsScreen.jsx, but this resulted in each new
score printing twice due to React being in Strict Mode. Instead, I tried bundling the code to save
the scores to storage into the “else” statement in the handleNext function, but this resulted in the
final point scored if the last question was correct to not be counted, so a 10/10 on the results
screen translated to a 9/10 on the scoreboard. The best solution I could find was to tie the
scoreboard update to clicking the “Play Again” button on the results screen. From this I learned
about Strict Mode, and how it’s very helpful for developers to see potential bugs, but can also
interfere with certain functionalities of the code in edge cases like this one.


## Video Demo ##
https://drive.google.com/file/d/1viwUzvhlvHURDHMynlwWafwPo21rfdzB/view?usp=sharing


