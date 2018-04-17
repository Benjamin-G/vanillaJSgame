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

// Varibles for Pig Game
let scores, roundScore, activePlayer, gamePlaying, prevDice

//Board reset Functions
const resetCurrentScore = () => {
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
}

const resetDice = () => {
  document.querySelector('.dice').style.display = 'none'
  document.querySelector('.dice2').style.display = 'none'}

const resetTurn = (currentPlayer) => {
  activePlayer = (currentPlayer === 0 ) ? 1 : 0
  roundScore = 0
  prevDice = undefined

  document.querySelector(`.player-0-panel`).classList.toggle('active')
  document.querySelector(`.player-1-panel`).classList.toggle('active')

  resetDice()
  resetCurrentScore()
}

//New Game
const initFunction = () => {
  scores = [0,0]
  roundScore = 0
  activePlayer = 0

  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'

  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'

  document.querySelector(`.player-0-panel`).classList.remove('winner')
  document.querySelector(`.player-1-panel`).classList.remove('winner')

  document.querySelector(`.player-0-panel`).classList.remove('active')
  document.querySelector(`.player-0-panel`).classList.add('active')
  document.querySelector(`.player-1-panel`).classList.remove('active')

  resetDice()
  resetCurrentScore()
  gamePlaying = true
}

//Reset Game HTML
initFunction()


//Roll Dice
document.querySelector('.btn-roll').addEventListener('click', () => {
  if(gamePlaying) {
    // Random Number
    const dice = Math.floor(Math.random() * 6) + 1    

    // Display the result
    const diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block'
    diceDOM.src = `dice-${dice}.png`

    // Set previous dice on UI
    if(prevDice) {
      const dice2DOM = document.querySelector('.dice2')
      dice2DOM.style.display = 'block'
      dice2DOM.src = `dice-${prevDice}.png`
    }

    // Lose score if roll two 6's
    if(dice === 6 && prevDice === 6){
      scores[activePlayer] = 0
      document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer]
      resetTurn(activePlayer)
    }

    // Update score IF roll != 1
    if(dice !== 1)  {
      //Add score
      roundScore += dice
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore

      //Set prevDice
      prevDice = dice
    } else {
      resetTurn(activePlayer)
    }
  }
})

//Hold score
document.querySelector('.btn-hold').addEventListener('click', () => {
  if(gamePlaying){
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore

    // Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer]

    // Checks the Final Score
    const input = parseInt(document.querySelector('.final-score').value) 
    let winningScore
    
    if(input && (input >= 0)){
      winningScore = input
    } else {
      winningScore = 100
    }

    // Check if player won the game and reset board
    if(scores[activePlayer] >= winningScore){
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner'
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
      resetDice()
      gamePlaying = false
    } else {
      resetTurn(activePlayer)
    }
  }
})

//New game 
document.querySelector('.btn-new').addEventListener('click', initFunction)