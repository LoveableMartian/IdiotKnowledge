const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
//score is the display of the player's current score
let score = 0;
//questioncounter lets you keep track on what question you're on. Intended maximum is 4.
let questionCounter = 0;

let availableQuestions = [];
let questions = [];

//Questions are fetched from the questions.json file.
fetch("./questions.json")
.then(res => {
    return res.json();
})
/* The questions are then mapped to match the required format for the code.
This is a step after having written the code for how the data needed to be formatted to be used.*/
.then(loadedQuestions => {
    questions = loadedQuestions.map( loadedQuestions => {
        const formattedQuestion = {
            question: loadedQuestions.question
        };
        const answerChoices = [...loadedQuestions.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestions.correct_answer);

        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
        });

        return formattedQuestion;
})

    startGame();
})
.catch(err => {
    console.error(err);
});

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score);
            //This if branch checks if the question counter has reached the MAX_QUESTIONS value of 4. When it does, it directs the player to the end page.
            return window.location.assign("end.html")
        }
    //These two lines will update the HUD's question counter.
    questionCounter++;
    questionCounterText.innerText = questionCounter + '/' + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    //This fetches the text data for each choice listed with the respective question.
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number]
    });
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        // Takes the selected answer and apples either the correct or incorrect class, leading to the corresponding styling in the css files, giving visual feedback to the player's choice for 2 seconds before moving onto the next question.
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            // If the applied class is equal to correct, the value of CORRECT_BONUS is added onto the score's current value.
            if (classToApply === 'correct') {
              incrementScore(CORRECT_BONUS);
            }

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 2000);

    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};
