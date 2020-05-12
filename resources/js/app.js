/*eslint-env browser*/
/*jshint esnext: true */
var scores, roundScore, activePlayer, gamePlaying, previousRoll;

var diceDOM = document.querySelectorAll('.control__dice');
var player1 = document.querySelector('.player--1');
var player2 = document.querySelector('.player--2');

init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousRoll = [0, 0];
    
    if (!diceDOM[0].classList.contains('hide'))
        diceDOM.forEach((el) => el.classList.add('hide'));
    
    if (!player1.classList.contains('active')) {
        player1.classList.add('active');
        player2.classList.remove('active');
    }
    
    player1.classList.remove('winner');
    player2.classList.remove('winner');    
    
    document.querySelectorAll('.player__dice').forEach((el) => el.textContent = 0);
    document.querySelectorAll('.player__score--2').forEach((el) => el.textContent = 0);
    document.querySelector('.player__title--1 h1').textContent = 'player 1';
    document.querySelector('.player__title--2 h1').textContent = 'player 2';
    document.querySelector('.control__roll button').classList.remove('disabled');
    document.querySelector('.control__hold button').classList.remove('disabled');
}

function switchPlayer() {
    document.querySelector('.active .player__score--2').textContent = roundScore = 0;
    
    previousRoll = [0, 0];
    player1.classList.toggle('active');
    player2.classList.toggle('active');    
    activePlayer = activePlayer === 0 ? 1 : 0;
    diceDOM.forEach((el) => el.classList.add('hide'));
}

/* roll dice */

document.querySelector('.control__roll').addEventListener('click', function() {
    if (gamePlaying) {
        var dice, isLoseCurrentScore;
        dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        isLoseCurrentScore = false;
        
        for(let [i, die] of dice.entries()) {
            document.querySelector('#dice-' + i + ' img').setAttribute('src', 'resources/img/dice-' + die + '.png');   
            if (i === 1 && (dice[0] === 1 ^ die === 1))
                isLoseCurrentScore = true;    
        
            roundScore += die;
        }
        
        if (diceDOM[0].classList.contains('hide'))
            diceDOM.forEach((el) => el.classList.remove('hide'));
        
        //add animation
        diceDOM.forEach((el) => el.classList.add('animated', 'wobble'));
        setTimeout(function() {
            diceDOM.forEach((el) => el.classList.remove('animated', 'wobble'));
        }, 500);

        //compare previous roll to current [6, 6] [6, 6]
        roll6: for (let previousDie of previousRoll) {
            if (previousDie === 6) {
                for (let die of dice) {
                    if (die === 6) {
                        alert('Oops! You\'ve rolled 6 twice in a row. You lose all your total score.');
                        document.querySelector('.active .player__dice').textContent = 0;
                        switchPlayer();
                        break roll6;
                    }
                }
            }
        }
        previousRoll = dice;
        
        //if once of the die is equal 1, pass active player to opponent and set current score to 0
        if (isLoseCurrentScore) {
            alert('Oops! One of the dice is 1. You lose all your current score.');
            switchPlayer();
        } else 
            document.querySelector('.active .player__score--2').textContent = roundScore;

    }
});

/* hold */

document.querySelector('.control__hold').addEventListener('click', function() {
    if (gamePlaying) {
        var input, winningScore;
        //add current to total score
        scores[activePlayer] += roundScore;
        document.querySelector('.active .player__dice').textContent = scores[activePlayer];
        
        input = document.getElementById('winning-score').value;
        
        if (input) 
            winningScore = input;
        else 
            winningScore = 100;

        //check if current player wins
        if(scores[activePlayer] >= winningScore) {
            if (scores[0] > scores[1])
                activePlayer = 0;
            else
                activePlayer = 1;
            var playerNumber = (activePlayer + 1);
            var winner = document.querySelector('.player--' + playerNumber);

            //set winner and add disabled css to buttons
            alert('Player ' + playerNumber + ' won!');
            document.querySelector('.player__title--' + playerNumber + ' h1').textContent = 'winner!';
            document.querySelector('.control__roll button').classList.add('disabled');
            document.querySelector('.control__hold button').classList.add('disabled');
            winner.classList.remove('active');
            winner.classList.add('winner');
            gamePlaying = false;
        } else 
            switchPlayer(); 
    }
});

/* new game */

document.querySelector('.control__reset').addEventListener('click', init);

