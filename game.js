
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
/*score is the display of the player's current score.*/
let questionCounter = 0;
/*questioncounter lets you keep track on what question you're on. Intended maximum is 4.*/
let availableQuestions = [];

/*Listed here is the pool of questions that will be pulled at random.*/
let questions = [
{
    "question": "When did we start using Schampoo for the first time?",
    "choice1": "The 1930s",
    "choice2": "The 1760s",
    "choice3": "The 1880s",
    "choice4": "2800 BC",
    "answer": 1
},
{
    "question": "How many people in the world share the same birth day as you?",
    "choice1": "Around 8 Thousand",
    "choice2": "No one",
    "choice3": "Around 19 Million",
    "choice4": "Around 50 Million",
    "answer": 3
},
{
    "question": "What book, published 1966, has been printed in roughly as many editions as the bible throughout the ages?",
    "choice1": "The Magic Finger, by Roald Dahl",
    "choice2": "Tai Pan, by James Clavell",
    "choice3": "Quotations from Chairman Mao Zedong, by Mao Zedong",
    "choice4": "Heroes, Gods and Monsters of the Greek Myths, by Bernard Evslin",
    "answer": 3 
},
{
    "question": "In which country are the most people executed each year?",
    "choice1": "The United States of America",
    "choice2": "China",
    "choice3": "Arabia",
    "choice4": "Russia",
    "answer": 2
},
{
    "question": "At what time of day do most elderly people die?",
    "choice1": "In the morning",
    "choice2": "In the afternoon",
    "choice3": "In the evening",
    "choice4": "At night",
    "answer": 1
},
{
    "question": "Why are brown eggs more expensive than white eggs?",
    "choice1": "Brown hens are rarer and therefore more expensive than white hens",
    "choice2": "There is no difference between brown and white eggs",
    "choice3": "Brown eggs are more durable than white eggs",
    "choice4": "Hens nesting brown eggs are bigger and more expensive to raise",
    "answer": 4
},
{
    "question": "Roughly what percentage of all books published are loss-making ventures?",
    "choice1": "Around 100%",
    "choice2": "Around 54%",
    "choice3": "Around 80%",
    "choice4": "Around 25%",
    "answer": 3
},
{
    "question": "Would you be able to surgically replace your eyes and be able to use them?",
    "choice1": "Yes, but there would be risks of your brain becoming aware of the new eyes",
    "choice2": "No, the connection can't be manually recreated",
    "choice3": "No, because eyes are uniquely wired from person to person",
    "choice4": "Yes, there would be little to no risk",
    "answer": 4
},
{
    "question": "A lot of people recognize the smell of leather. But what exactly is the source of that smell?",
    "choice1": "Materials used in the bleaching process",
    "choice2": "The cowhide",
    "choice3": "Smoke from the tanning process",
    "choice4": "Oil used to soften the leather",
    "answer": 1
},
{
    "question": "An american police officer will say “You have the right to remain silent. Anything you say can and will be used against you in a court of law” when arresting somebody. What does a Swedish police officer say in the same situation?",
    "choice1": "The swedish equivalent of the same phrase",
    "choice2": "“Nu åker du in i häktet”",
    "choice3": "They say nothing",
    "choice4": "They laugh at you",
    "answer": 3
},
{
    "question": "Why do snakes shed their skin?",
    "choice1": "Because they grow, but the skin doesn't",
    "choice2": "Because the skin stiffens and becomes harder to move around in",
    "choice3": "Because they need to repair",
    "choice4": "Because the skin is a nutricious snack to distract other predators",
    "answer": 1
},
{
    "question": "In how many Km/h does the world's fastest elevator travel in?",
    "choice1": "Around 40 Km/h",
    "choice2": "Around 88 Km/h",
    "choice3": "Around 100 Km/h",
    "choice4": "Around 60 Km/h",
    "answer": 4
},
{
    "question": "Can an astronaut call home to Earth with a cellphone while in outer space?",
    "choice1": "Yes, with the right provider",
    "choice2": "No, there'd be too much interference",
    "choice3": "Yes, but with constant breaking audio breakup",
    "choice4": "No, cellphones do not work in outer space",
    "answer": 2
},
{
    "question": "On which weekday are most bank robberies commited?",
    "choice1": "Monday",
    "choice2": "Saturday",
    "choice3": "Wednesday",
    "choice4": "Friday",
    "answer": 4
},
{
    "question": "How long does it take to record 5 minutes of action for a feature film?",
    "choice1": "A day",
    "choice2": "5 minutes",
    "choice3": "10 minutes",
    "choice4": "1 Hour",
    "answer": 1
},
{
    "question": "How many of the almost 7 billion people on Earth have never seen snow?",
    "choice1": "Roughly 6 Billion",
    "choice2": "Roughly 2 Billion",
    "choice3": "Roughly 4 Billion",
    "choice4": "Roughly 1 Billion",
    "answer": 3
},
{
    "question": "What food can you store for several hundred years without it going bad?",
    "choice1": "Bread",
    "choice2": "Grapes",
    "choice3": "Jelly",
    "choice4": "Honey",
    "answer": 4
},
{
    "question": "How old is the oldest known pornographic film?",
    "choice1": "From around 1800s",
    "choice2": "From around 1900s",
    "choice3": "From around 1950s",
    "choice4": "From around 1850s",
    "answer": 2
},
{
    "question": "According to research, how much time of their lives do men spend in total spying on women?",
    "choice1": "Half their life",
    "choice2": "20 Years",
    "choice3": "1 Year",
    "choice4": "13 Years",
    "answer": 3
},
{
    "question": "Do you hear better or worse when your stomach is full?",
    "choice1": "You hear better",
    "choice2": "You hear worse",
    "choice3": "There is no difference",
    "choice4": "It varies from person to person",
    "answer": 2
},
{
    "question": "Police officers will often say “We've got a 10-71” in American movies. What does this code mean?",
    "choice1": "A Shooting",
    "choice2": "A Murder",
    "choice3": "A Bomb threat",
    "choice4": "Nothing",
    "answer": 1
}
];

//Questions are fetched from a json file where it's written out as a ready array.

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
startGame();