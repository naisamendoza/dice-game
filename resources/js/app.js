/*eslint-env browser*/
/*jshint esnext: true */
var scores, roundScore, activePlayer;

var diceDOM = document.querySelector('.control__dice');
var player1 = document.querySelector('.player--1');
var player2 = document.querySelector('.player--2');

init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    
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
}

function checkActive() {
    document.querySelector('.active .player__score--2').textContent = roundScore = 0;
    
    player1.classList.toggle('active');
    player2.classList.toggle('active');    
    activePlayer = activePlayer === 0 ? 1 : 0;
    diceDOM.classList.toggle('hide');
}

/* roll dice */

document.querySelector('.control__roll').addEventListener('click', function() {
    var dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector('.control__dice img').setAttribute('src', 'resources/img/dice-' + dice + '.png');

    if (diceDOM.classList.contains('hide'))
        diceDOM.classList.toggle('hide');
    diceDOM.classList.add('animated', 'wobble');

    setTimeout(function() {
        diceDOM.classList.remove('animated', 'wobble');
    }, 500);

    if (dice <= 1) {
        alert('Oops! You lose all your current score.');
        checkActive();
    } else {
        roundScore += dice;
        document.querySelector('.active .player__score--2').textContent = roundScore;
    }
});

/* hold */

document.querySelector('.control__hold').addEventListener('click', function() {
    //add current to total score
    scores[activePlayer] += roundScore;
    document.querySelector('.active .player__dice').textContent = scores[activePlayer];

    
    if(scores[activePlayer] >= 10) {
        var winner = document.querySelector('.player--' + (activePlayer + 1));
        alert('Player ' + (activePlayer + 1) + ' won!');
        document.querySelector('.player__title--' + (activePlayer + 1) + ' h1').textContent = 'winner!';
        winner.classList.remove('active');
        winner.classList.add('winner');
        this.disabled = true;
        document.querySelector('.control__roll').disabled = true;
    } else {
       checkActive(); 
    }
});

/* new game */

document.querySelector('.control__reset').addEventListener('click', init);

