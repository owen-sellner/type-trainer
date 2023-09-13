// Getting the text data from API
var quoteText = "";
const MIN_LENGTH = 150;
const MAX_LENGTH = 250;
const API_URL = `https://api.quotable.io/random?minLength=${MIN_LENGTH}&maxLength=${MAX_LENGTH}`

async function getQuote(url) {
    const res = await fetch(url);

    const data = await res.json();
    quoteText = data.content;
    console.log(quoteText);

    for(let i = 0; i < quoteText.length; i++) {
        const textBox = document.querySelector('.textbox-text');
        const spanItem = document.createElement('span');
        spanItem.innerText = quoteText[i];
        console.log(spanItem);
        textBox.append(spanItem);
    }
}

getQuote(API_URL);



// Toggle focus on the text input when the user clicks on the textwrapper
function toggleInputFocus() {
    const textInput = document.querySelector(".text-input");

    if (textInput === document.activeElement) {
        textInput.blur()
    } else {
        textInput.focus()
    }
}