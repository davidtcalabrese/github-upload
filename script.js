const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const authorDisplayElement = document.querySelector("#author");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.querySelector('#timer');

quoteInputElement.addEventListener("input", () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    });
    if (correct) {renderNewQuote()};
});


function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

function getAuthor() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.author);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  const author = await getAuthor();
  quoteDisplayElement.innerText = "";
  authorDisplayElement.innerText = "";
  authorDisplayElement.innerText = '-' + author;
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.classList.add("correct");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan).innerText = character;
  });
  quoteInputElement.value = null;
  startTimer();
}

let startTime;
function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime();
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}
renderNewQuote();
