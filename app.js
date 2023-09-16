// Getting the text data from API
var quoteText = "";
const MIN_LENGTH = 150;
const MAX_LENGTH = 250;
const API_URL = `https://api.quotable.io/random?minLength=${MIN_LENGTH}&maxLength=${MAX_LENGTH}`

async function getQuote(url) {

    // Get response from API
    const res = await fetch(url);

    // Get data as JSON format and extract the content element
    const data = await res.json();
    quoteText = data.content;

    // Check if the check boxes are checked
    if (!document.getElementById("include-uppercase").checked) {
        quoteText = quoteText.toLowerCase();
    }

    if (!document.getElementById("include-punctuation").checked) {
        quoteText = removePunctuation(quoteText);
    }
    
    // Reset textbox and input
    const textBox = document.querySelector('.textbox-text');
    textBox.innerHTML = ""
    const textInput = document.querySelector(".text-input")
    textInput.value = ""

    // Add each character from the quote as a span element
    for(let i = 0; i < quoteText.length; i++) {
        const spanItem = document.createElement('span');
        spanItem.innerText = quoteText[i];
        textBox.append(spanItem);
    }
}

getQuote(API_URL);

// Event listeners 
document.addEventListener("DOMContentLoaded", function () {
    // Event listeners for checkboxes
    document.getElementById("include-uppercase").addEventListener("change", function() {
        getQuote(API_URL);
    });
    document.getElementById("include-punctuation").addEventListener("change", function() {
        getQuote(API_URL);
    });

    // Event listeners for text focus
    const textInput = document.querySelector(".text-input")
    const blurOverlay = document.querySelector(".blur-overlay")
    const textOverlay = document.querySelector(".overlay-text")
    textInput.addEventListener("focus", function() {
        blurOverlay.classList.remove("blur");
        textOverlay.classList.add("disable");
    });
    textInput.addEventListener("blur", function() {
        blurOverlay.classList.add("blur");
        textOverlay.classList.remove("disable");
    });
});

// Removes the punctuation from the quote
function removePunctuation(quote) {
    const punctuation = [".", "\?", "!", ",", ";", ":", "—", "-", "(", ")", "[", "]", "{", "}", "\'", "\""];

    for (let i = 0; i < punctuation.length; i++) {
        quote = quote.replace(/[^a-zA-Z0-9\s]/g, "");
    }

    return quote;
}

// Toggle focus on the text input when the user clicks on the textwrapper
function toggleInputFocus() {
    const textInput = document.querySelector(".text-input");

    if (textInput === document.activeElement) {
        textInput.blur()
    } else {
        textInput.focus()
    }
}