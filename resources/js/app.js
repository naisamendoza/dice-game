/*eslint-env browser*/
/*jshint esnext: true */
var scores, roundScore, activePlayer, gamePlaying;

var diceDOM = document.querySelector('.control__dice');
var player1 = document.querySelector('.player--1');
var player2 = document.querySelector('.player--2');

init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    if (!player1.classList.contains('hide'))
        diceDOM.classList.add('hide');
    
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
    
    player1.classList.toggle('active');
    player2.classList.toggle('active');    
    activePlayer = activePlayer === 0 ? 1 : 0;
}

/* roll dice */

document.querySelector('.control__roll').addEventListener('click', function() {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.control__dice img').setAttribute('src', 'resources/img/dice-' + dice + '.png');
        
        if (diceDOM.classList.contains('hide'))
            diceDOM.classList.remove('hide');
        
        //add animation
        diceDOM.classList.add('animated', 'wobble');
        setTimeout(function() {
            diceDOM.classList.remove('animated', 'wobble');
        }, 500);

        //if dice is greater than 1 continue game else pass active player to opponent and set current score to 0
        if (dice > 1) {
            roundScore += dice;
            document.querySelector('.active .player__score--2').textContent = roundScore;
        } else {
            alert('Oops! You lose all your current score.');
            switchPlayer();
            diceDOM.classList.add('hide');
        }
    }
});

/* hold */

document.querySelector('.control__hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current to total score
        scores[activePlayer] += roundScore;
        document.querySelector('.active .player__dice').textContent = scores[activePlayer];

        //check if current player wins
        if(scores[activePlayer] >= 100) {
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
        
        if (!player1.classList.contains('hide'))
            diceDOM.classList.add('hide');
    }
});

/* new game */

document.querySelector('.control__reset').addEventListener('click', init);

