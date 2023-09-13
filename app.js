// Getting the text data from API
const MIN_LENGTH = 100;
const MAX_LENGTH = 200;
const API_URL = `https://api.quotable.io/random?minLength=${MIN_LENGTH}&maxLength=${MAX_LENGTH}`

async function getQuote(url) {
    const res = await fetch(url);

    const data = await res.json();
    const quoteText = data.content;
    console.log(quoteText);
}

getQuote(API_URL)

// Toggle focus on the text input when the user clicks on the textwrapper
function toggleInputFocus() {
    const textInput = document.querySelector(".text-input");

    if (textInput === document.activeElement) {
        textInput.blur()
    } else {
        textInput.focus()
    }
}