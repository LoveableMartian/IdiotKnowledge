const playername = document.getElementById('playername');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const FinalScore = document.getElementById('FinalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
finalScore.innerText = mostRecentScore;

    //Disables the Save button if the user hasn't input anything in the form.
playername.addEventListener('keyup',() =>{
    console.log(playername.value);
    saveScoreBtn.disabled = !playername.value;
})

saveHighScore = (e) => {
    console.log("clicked the button");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: playername.value
    };
    highScores.push(score);
//Sorts the scores. If b score is higher than a score, then b goes first.
    highScores.sort( (a,b) => b.score - a.score)
    highScores.splice(10);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("/");
};