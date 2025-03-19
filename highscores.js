const highScoresList = document.getElementById('highScoresList');
// Fetches the highscore list from playerScore.json. If no highscore list can be fetched, it'll show an empty list.




fetch('/playerScore.json')
    .then(response => response.json())
    .then(data => {
        const highScores = data || [];
        highScoresList.innerHTML = highScores
            .map(score => {
                return `<li class="high-score">${score.name} - ${score.score}</li>`;
            })
            .join("");
    })
    .catch(error => {
        console.error('Error fetching high scores:', error);
        highScoresList.innerHTML = '';
    });