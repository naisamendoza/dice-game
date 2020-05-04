/*eslint-env browser*/
/*jshint esnext: true */
var scores, roundScore, activePlayer;

var activeScore = document.querySelector('.active .player__score--2');
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
    if (player1.classList.contains('active')) {
            player1.classList.remove('active');
            player2.classList.add('active');
            activePlayer = 1;
        } else {
            player2.classList.remove('active');
            player1.classList.add('active');
            activePlayer = 0;
        }
}

/* roll dice */

document.querySelector('.control__roll').addEventListener('click', function() {
    var dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector('.control__dice img').setAttribute('src', 'resources/img/dice-' + dice + '.png');

    diceDOM.style.display = 'block';
    diceDOM.classList.add('animated', 'wobble');

    setTimeout(function() {
        diceDOM.classList.remove('animated', 'wobble');
    }, 1000);

    if (dice === 1) {
        alert('Oops! You lose.');
        activeScore.textContent = roundScore = 0;
        checkActive();
    } else {
        roundScore += dice;
        activeScore.textContent = roundScore;
    }
});

/* hold */

document.querySelector('.control__hold').addEventListener('click', function passActive() {
    scores[activePlayer] += roundScore;
    document.querySelector('.active .player__dice').textContent = scores[activePlayer];
    diceDOM.style.display = 'none';

    /*clear content*/
    activeScore.textContent = 0;
    roundScore = 0;
    checkActive();
});

/* new game */

document.querySelector('.control__reset').addEventListener('click', function newGame() {
    resetVars();
    diceDOM.style.display = 'none';
    document.querySelectorAll('.player__dice').forEach((el) => el.textContent = 0);
    document.querySelectorAll('.player__score--2').forEach((el) => el.textContent = 0);
    player2.classList.remove('active');
    player1.classList.add('active');
});

