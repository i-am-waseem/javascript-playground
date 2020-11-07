'use strict';

// 1. Generate a random Number between 1 and 20


const messageDOM = document.querySelector('.message')
const secretNumberDOM = document.querySelector('.number')
const highScoreDOM = document.querySelector('.highscore')
const scoreDOM = document.querySelector('.score')
let score = 20
let highScore = 0
let secretNumber

const initGame = function(){
    score = 20
    scoreDOM.textContent = 20
    messageDOM.textContent = "Start Guessing ..."
    document.querySelector('.guess').value = ''
    secretNumberDOM.style.backgroundColor = 'gray';
    secretNumberDOM.textContent = '?';
    secretNumber = Math.floor(Math.random()*20+1)
    console.log(secretNumber)
    
}
initGame();
document.querySelector('.check').addEventListener('click', function(){
    
    
    const number = Number(document.querySelector('.guess').value)
    
    console.log("Entered : "+number)
    const showMessage = function(message){
        messageDOM.textContent = message
    }
    // 2. Compare the input number with secret Random Number.
    if(number === 0 || number === NaN ){
        // console.log('No number')
        showMessage("No Number")
    }
    else if(number === secretNumber){
        showMessage("Wohooooo.. ")
        secretNumberDOM.style.backgroundColor = 'lime';
        secretNumberDOM.textContent = secretNumber;
        if(highScore < score){
            highScore = score
            highScoreDOM.textContent = score
        }
    }else{
       
        if(score > 0){
            score--
            scoreDOM.textContent = score
            if(number < secretNumber) 
            showMessage("Too Low !")
        else
            showMessage("Too High !")
        }
        else{
            showMessage("You lost. Try Again ?")
        }
        
    }

    
})

document.querySelector('.again').addEventListener('click', initGame)