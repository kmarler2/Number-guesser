var userInput = document.querySelector(".guess__input");
var guessButton = document.querySelector(".guess__btn");
var clearButton = document.querySelector(".clear__btn");
var displayInput = document.querySelector(".results__number");
var displayText = document.querySelector(".display__text");
var resetButton = document.querySelector(".reset__btn");
var bottomSection = document.querySelector(".section__results");
var setMaximum = document.querySelector(".max__input");
var setMinimum = document.querySelector(".min__input");
var allInputs = document.querySelector('.all__inputs');
var minimum = 0;
var maximum = 100;
var randomNumber = randomInput(maximum, minimum);
var clickCount = 0;

userInput.addEventListener('keyup', enableButtons);
clearButton.addEventListener('click', clearField);
resetButton.addEventListener('click', resetPage);
guessButton.addEventListener('click', addMinimum);
guessButton.addEventListener('click', countGuess);

function countGuess() {
  clickCount++;
  if ((clickCount < 3) && (displayText.innerText === 'BOOM!')) {
    alert('Wow, only ' + clickCount + " tries!!!")
  } else if ((clickCount < 6) & (displayText.innerText === 'BOOM!')) {
    alert('Nice work, only ' + clickCount + ' tries!')
  } else  if ((clickCount > 9) & (displayText.innerText === 'BOOM!')) {
    alert('You got it in ' + clickCount + ' tries');
  }
  event.preventDefault();
}

function addMinimum() {
  if (minimum !== undefined) {
      minimum = parseInt(setMinimum.value);
  } else {
      minimum = 1;
  }
  addMaximum();
  validateEntry();
  return minimum;
};

function addMaximum() {
  if (maximum !== undefined) {
    maximum = parseInt(setMaximum.value);
  } else {
    maximum = 100;
  }
  return maximum;
};

function randomInput(maximum, minimum) {
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
};

function validateEntry() {
  if ((userInput.value < minimum) || (userInput.value > maximum)) {
    alert('Please enter a number within the range')
  } else {
    displayResults();
  }
  randomNumber = randomInput(maximum, minimum);
};

function displayResults() {
  var userGuess = userInput.value;
  bottomSection.hidden = false;
  displayInput.innerText = userGuess;
  if (userGuess < randomNumber) {
    displayText.innerText = 'That is too low!';
  } else if (userGuess > randomNumber) {
    displayText.innerText = 'That is too high!';
  } else {
    displayText.innerText = 'BOOM!'
  }
  evaluateResults();
};

function evaluateResults() {
  if (displayText.innerText === 'BOOM!') {
    var newMax = maximum + 10;
    alert('You won! Your maximum has been increased by 10.');
  } else {
    var newMin = minimum - 10;
    alert('Better luck next time! Your minimum has been increased by 10.'); 
  }
};

function enableButtons() {
  guessButton.disabled = false;
  clearButton.disabled = false;
  resetButton.disabled = false;
};

function disableButtons() {

  if (userInput.value = '') {
    guessButton.disabled = true;
    clearButton.disabled = true;
    resetButton.disabled = true;
  } else {
    enableButtons();
  }
};

function clearField() {
  userInput.value = '';
  setMaximum.value = '';
  setMinimum.value ='';
};

function resetPage() {
  location.reload();
};
