/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

  document.querySelector(`#current-${activePlayer}`).textContent = dice
  document.querySelector(`#current-${activePlayer}`).innerHTML = `<em>${dice}</em>`
*/

let scores, roundScore, activePlayer

scores = [0,0]
roundScore = 0
activePlayer = 0

//Board reset Functions
const resetCurrentScore = () => {
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
}
const changeSelectedPlayer = (activePlayer) => {
  otherPlayer = (activePlayer === 0 ) ? 1 : 0

  document.querySelector(`.player-${otherPlayer}-panel`).classList.remove('active')
  document.querySelector(`.player-${activePlayer}-panel`).classList.add('active')
}

//Reset Game HTML
document.querySelector('.dice').style.display = 'none'

document.getElementById('score-0').textContent = '0'
document.getElementById('score-1').textContent = '0'
resetCurrentScore()


document.querySelector('.btn-roll').addEventListener('click', () => {
  // Random Number
  const dice = Math.floor(Math.random() * 6) + 1

  // Display the result
  const diceDOM = document.querySelector('.dice')
  diceDOM.style.display = 'block'
  diceDOM.src = `dice-${dice}.png`

  // Update score IF roll != 1
  if(dice !== 1) {
    //Add score
    roundScore += dice
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore
  } else {
    //Next player
    activePlayer = (activePlayer === 0 ) ? 1 : 0
    roundScore = 0
    resetCurrentScore()    
    changeSelectedPlayer(activePlayer)
  }
})