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
    highScores.sort( (a,b) => b.score - a.score)
    highScores.splice(10);

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

    // In order to update the local leaderboard, the fetchAndSaveData function is called immediately afterwards.
async function fetchNewScores() {
    try {
      await client.connect();
      const database = client.db('IdiotKnowledge');
      const collection = database.collection('playerScore');
  
      const playerScores = await collection.find().toArray();
  
      fs.writeFile('playerScore.json', JSON.stringify(playerScores, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been written to playerScore.json');
      });

      const collection2 = database.collection('gamequestions');
  
      const gameQuestionsFormat = await collection2.find().toArray();
  
      fs.writeFile('questions.json', JSON.stringify(gameQuestionsFormat, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been written to questions.json');
      });
    } finally {
      await client.close();
    }
  }
fetchNewScores().catch(console.error);

}