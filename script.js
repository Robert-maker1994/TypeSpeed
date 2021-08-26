
// define the time limit
let TIME_LIMIT = 60;
  
// define quotes to be used
let quotes_array = [
  "Push yourself, because no one else is going to do it for you.",
  "React Hooks are the best.",
  "Everything can be taken from a man but one thing: the last of the human freedoms—to choose one’s attitude in any given set of circumstances, to choose one’s own way.",
  "It's going to be hard, but hard does not mean impossible.",
  "Ever more people today have the means to live, but no meaning to live for.",
  "JavaScript is the best."
];
  
let count = 60;
let cancelled = false;
let isThisActive = false;
let correctWords = 0;
let incorrectWords = 0;
let currentWord = 0;
let index = 0;

const words = document.querySelector('.words');
const input = document.querySelector('.typing-input');
const seconds = document.querySelector('.seconds');
const redoButton = document.querySelector('.redo-button');
const startHelp = document.querySelector('.start-help');
const results = document.querySelector('.results');
const corrWords = document.querySelector('.correct-words');
const incorrWords = document.querySelector('.incorrect-words');
const accuracy = document.querySelector('.accuracy');
const wpm = document.querySelector('.wpm');
const reveal = document.querySelector('.reveal');

let wordArray = [
  "whistle",
  "rightful",
  "festive",
  "raspy",
  "flesh",
  "that",
  "I",
  "would",
  "like",
  "to",
  "wave",
  "hurried",
  "club",
  "deep",
  "rings",
  "separate",
  "fold",
  "descriptive",
  "overflow",
  "tasty",
  "laborer",
  "lying",
  "prickly",
  "head",
  "clumsy",
  "reason",
  "flippant",
  "spot",
  "provide",
  "cautious",
  "rice",
  "anxious",
  "energetic",
  "knock",
  "common",
  "school",
  "whirl",
  "wheel",
  "treat",
  "ubiquitous",
  "flash",
  "thoughtful",
  "airplane",
  "fancy",
  "zesty",
  "tawdry",
  "nasty",
  "strengthen",
  "canvas",
  "earth",
  "leather",
  "arrange",
  "stereotyped",
  "rule",
  "preach",
  "elite",
  "glow",
  "cloudy",
  "enter",
  "rapid",
];

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        
// while there remain elements to shuffle
while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // and swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
}

return array;
    }

    
shuffledWords = shuffle(wordArray);

function displayShuffledWords() {
	//display the array on-screen and add a class with the word number
	shuffledWords.forEach((word) => {
		const x = document.createElement('span');
		x.innerText = word;
		x.classList.add(`word-${index}`);
		words.appendChild(x);

		index++;
	});
}

displayShuffledWords();

//highlight the current word needing to be input by the user
function highlightCurrentWord() {
	activeWord = wordArray[currentWord];
	words.children[currentWord].classList.add('current-word');
}
highlightCurrentWord();

//check that the word inputted matches the current word -- increment correct or incorrect
function checkWord() {
	if (input.value === wordArray[currentWord]) {
		words.children[currentWord].classList.remove('current-word');
		words.children[currentWord].classList.add('correct');
		correctWords++;
		currentWord++;
		highlightCurrentWord();
		corrWords.innerText = `Correct Words: ${correctWords}`;
		input.value = '';
	} else {
		words.children[currentWord].classList.remove('current-word');
		words.children[currentWord].classList.add('wrong');
		incorrectWords++;
		currentWord++;
		highlightCurrentWord();
		incorrWords.innerText = `Incorrect Words: ${incorrectWords}`;
		input.value = '';
	}
}

//start the countdown when a letter is pressed, only if its not already counting down and break if the redo button is pressed
function countdown(e) {
	//this is to start the countdown again AFTER the redo button has been pressed
	if (
		(e.keyCode >= 65 && event.keyCode <= 90) ||
		(e.keyCode >= 97 && event.keyCode <= 122)
	) {
		if (cancelled) {
			cancelled = false;
		}

		if (!isThisActive) {
			isThisActive = true;
			seconds.classList.add('active-timer');
			startHelp.classList.add('end-help');

			function tick() {
				if (cancelled) {
					return;
				} else {
					count--;
					seconds.innerText = (count < 10 ? '0' : '') + String(count);

					if (count > 0) {
						setTimeout(tick, 1000);
					}

					if (count === 0) {
						input.value = '';
						input.disabled = true;
						input.classList.add('typing-end');
						redoButton.classList.add('redo-end');
						isThisActive = false;
						seconds.innerText = '00';
						results.classList.add('finished');
						reveal.classList.add('finished');
						calculateAccuracy();
						calculateWpm();
					}
				}
			}
			tick();
		}
	}
}

function calculateAccuracy() {
	x = correctWords + incorrectWords;
	y = correctWords / x;
	z = Math.floor(y * 100);

	accuracy.innerText = `Accuracy: ${z}%`;
}

function calculateWpm() {
	x = incorrectWords / 2;
	y = correctWords + x;
	z = Math.floor(y);

	wpm.innerText = `Words Per Minute: ${z}`;
}

//reset everything back to its original state to start again
function redo() {
        correctWords = 0;
        incorrectWords = 0;
        currentWord = 0;
        count = 60;
        cancelled = true;
        isThisActive = false;
        input.disabled = false;
        words.innerHTML = '';
        shuffle(wordArray);
        displayShuffledWords();
        highlightCurrentWord();
        input.value = '';
        seconds.innerText = count;
        seconds.classList.remove('active-timer');
        results.classList.remove('finished');
        reveal.classList.remove('finished');
        redoButton.classList.remove('redo-end');
        startHelp.classList.remove('end-help');
        input.classList.remove('typing-end');
        wpm.innerText = '';
        corrWords.innerText = '';
        incorrWords.innerText = '';
}

//Event Listeners
input.addEventListener('keypress', (e) => {
	countdown(e);
});

//keyCode 32 is spacebar
input.addEventListener('keypress', (e) => {
	if (e.keyCode === 32) {
		e.preventDefault();
		checkWord();
	}
});

// Reset the game or shuffle the words
redoButton.addEventListener('click', redo);