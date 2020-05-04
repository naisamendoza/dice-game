/*eslint-env browser*/
/*jshint esnext: true */
var scores, roundScore, activePlayer;

var diceDOM = document.querySelector('.control__dice');
var player1 = document.querySelector('.player--1');
var player2 = document.querySelector('.player--2');

resetVars();

function resetVars() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
}

function checkActive() {
    document.querySelector('.active .player__score--2').textContent = roundScore = 0;
    
    player1.classList.toggle('active');
    player2.classList.toggle('active');    
    activePlayer = activePlayer === 0 ? 1 : 0;
    diceDOM.style.display = 'none';
}

/* roll dice */

document.querySelector('.control__roll').addEventListener('click', function() {
    var dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector('.control__dice img').setAttribute('src', 'resources/img/dice-' + dice + '.png');

    diceDOM.style.display = 'block';
    diceDOM.classList.add('animated', 'wobble');

    setTimeout(function() {
        diceDOM.classList.remove('animated', 'wobble');
    }, 500);

    if (dice <= 1) {
        alert('Oops! You lose.');
        checkActive();
    } else {
        roundScore += dice;
        document.querySelector('.active .player__score--2').textContent = roundScore;
    }
});

/* hold */

document.querySelector('.control__hold').addEventListener('click', function() {
    scores[activePlayer] += roundScore;
    document.querySelector('.active .player__dice').textContent = scores[activePlayer];

    
    if(scores[activePlayer] >= 100) {
        alert('Player ' + (activePlayer + 1) + ' won!');
        document.querySelector('.player__title--' + (activePlayer + 1) + ' h1').textContent = 'winner';
    } else {
       checkActive(); 
    }
});

/* new game */

document.querySelector('.control__reset').addEventListener('click', function() {
    resetVars();
    diceDOM.style.display = 'none';
    document.querySelectorAll('.player__dice').forEach((el) => el.textContent = 0);
    document.querySelectorAll('.player__score--2').forEach((el) => el.textContent = 0);
    player2.classList.remove('active');
    player1.classList.add('active');
});

