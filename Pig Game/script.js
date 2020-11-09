'use strict';

// TODO: 
/*
1. Roll Dice - 
    Get a random number. - Done
    show proper image. - Done
    add the number to current score - Done
    update the current score - Done
    show current score. - Done

    activePlayer ?
    if score == 1, change the turn.
    if hold, then, add curr score 
    to global score of active player.

    if global score of active player reaches 
    100 , declare winner.

    restart the game.
*/

let number
let activePlayer = 0
let score= [0, 0]
let currentScore = 0
let playing = true

const dice = document.querySelector('.dice')
const score0 = document.getElementById('score--0')
const score1 = document.getElementById('score--1')
const current0 = document.getElementById('current--0')
const current1 = document.getElementById('current--1')
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')
const name0 = document.getElementById('name--0')
const name1 = document.getElementById('name--1')

// console.log(current0, current1)
const initGame = function(){
    console.log("Initializing game")
    dice.style.display = 'none'
    current0.textContent = 0
    current1.textContent = 0
    score0.textContent = 0
    score1.textContent = 0
    activePlayer = 0
    currentScore = 0
    score = [0,0]
    playing = true
    name0.textContent = 'Player 1'
    name1.textContent = 'Player 2'
    player0.classList.remove('player--active')
    player1.classList.remove('player--active')
    player0.classList.add('player--active')
}

// Change player if the user gets 1 or clicks on hold button.
const changePlayer = function(){
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0
    currentScore = 0
    dice.style.display = 'none'
    // Reset the score of current activeplayer.
    player0.classList.remove('player--active')
    player1.classList.remove('player--active')
    current0.textContent = 0
    current1.textContent = 0
    if(activePlayer == 0)
        player0.classList.add('player--active')     
    else
        player1.classList.add('player--active')
}

initGame();
document.querySelector('.btn--roll').addEventListener('click', function(){

    if(playing === false)
        return;

    number = Math.floor(Math.random()*6+1)
    dice.style.display = 'block'
    console.log(number)
    dice.src = `dice-${number}.png`
    if(number === 1){
        changePlayer();
        return;
    }
    currentScore += number
    document.getElementById('current--'+activePlayer).textContent = currentScore
    document.getElementById('score--'+activePlayer).textContent = score[activePlayer]

})

document.querySelector('.btn--hold').addEventListener('click', function(){

    if(playing === false)
    return;

    score[activePlayer] += currentScore

    if(score[activePlayer] >= 20){
        if(activePlayer == 0){
            name0.textContent = "Winner!"
            playing = false

        }else{
            name1.textContent = "Winner!"
            playing = false
        }
    }
    if(activePlayer === 0){
        score0.textContent = score[activePlayer]
    }else{
        score1.textContent = score[activePlayer]
    }
    changePlayer();
})

document.querySelector('.btn--new').addEventListener('click', initGame)