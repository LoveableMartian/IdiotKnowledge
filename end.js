const playername = document.getElementById('playername');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const FinalScore = document.getElementById('FinalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
finalScore.innerText = mostRecentScore;

    //Disables the Save button if the user hasn't input anything in the form.
playername.addEventListener('keyup',() => {
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
//These two lines of codes are superfluous, having been used for local storage filing.
//    highScores.sort( (a,b) => b.score - a.score)
//    highScores.splice(10);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("index.html");

    // Following code sends the latest registered score to the database
    async function ScoreUpload() {
        try {
            const response = await fetch('http://localhost:3000/saveScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(score)
            });

            if (response.ok) {
                console.log('Score has been saved to the database');
            } else {
                console.error('Error saving score to the database');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    ScoreUpload().catch(console.error);
}

