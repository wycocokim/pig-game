'use strict';

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');

//initial state
let inProgress, active, score, currentScore;

const initialState = () => {
  inProgress = true;
  active = 0;
  score = [0, 0];
  currentScore = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
};

initialState();

//switch function
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${active}`).textContent = currentScore;
  active = active === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  if (inProgress) {
    const dice = Math.floor(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');

    document.querySelector('.dice').src = `dice-${dice}.png`;

    if (dice != 1) {
      //add to current
      currentScore += dice;

      //display current
      document.getElementById(`current--${active}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

//hold btn
holdBtn.addEventListener('click', function () {
  if (inProgress) {
    score[active] += currentScore;
    document.getElementById(`score--${active}`).textContent = score[active];

    if (score[active] >= 100) {
      //finish the game
      inProgress = false;

      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//new game
newBtn.addEventListener('click', initialState);
