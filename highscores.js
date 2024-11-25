const highScoresList = document.getElementById('highScoresList');
//Fetches the highscore list from local storage. If no highscore list can be fetched, it'll show an empty list.
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
 
highScoresList.innerHTML = highScores
.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join("");