// Getting the text data from API
var quoteText = "";
const MIN_LENGTH = 100;
const MAX_LENGTH = 200;
const API_URL = `https://api.quotable.io/random?minLength=${MIN_LENGTH}&maxLength=${MAX_LENGTH}`

async function getQuote(url) {

    // Get response from API
    const res = await fetch(url);

    // Get data as JSON format and extract the content element
    const data = await res.json();
    quoteText = data.content;

    // Remove em dashes
    quoteText = quoteText.replace(/—/g, "-");

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
    for (let i = 0; i < quoteText.length; i++) {
        const spanItem = document.createElement('span');

        if (quoteText[i] === " ") {
            spanItem.innerHTML = "&#9141;";
        } else {
            spanItem.innerText = quoteText[i];
        }

        if (i === 0) {
            spanItem.classList.add("current");
        }

        textBox.append(spanItem);
    }
}

getQuote(API_URL);

// Event listeners 
document.addEventListener("DOMContentLoaded", function () {
    // Event listeners for checkboxes
    document.getElementById("include-uppercase").addEventListener("change", function () {
        getQuote(API_URL);
    });
    document.getElementById("include-punctuation").addEventListener("change", function () {
        getQuote(API_URL);
    });

    // Event listeners for text focus
    const textInput = document.querySelector(".text-input")
    const blurOverlay = document.querySelector(".blur-overlay")
    const textOverlay = document.querySelector(".overlay-text")
    textInput.addEventListener("focus", function () {
        blurOverlay.classList.remove("blur");
        textOverlay.classList.add("disable");
    });
    textInput.addEventListener("blur", function () {
        blurOverlay.classList.add("blur");
        textOverlay.classList.remove("disable");
    });

    // Event listener for typing
    textInput.addEventListener("input", onType);
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

// Set accuracy value
let accuracy = 100;


// Change letter styles based on user input
function onType() {
    const textInput = document.querySelector(".text-input");
    const spanList = document.getElementsByTagName("span");

    const textLength = textInput.value.length;
    const spanLength = spanList.length;

    if (textLength < spanLength) {
        // Set the current letter style
        for (let i = 0; i < spanLength; i++) {
            spanList[i].classList.remove("current");
        }
        spanList[textLength].className = "current";

        // Set correct and error
        for (let j = 0; j < textLength; j++) {
            // Convert non-breaking spaces to regular spaces
            // Non-breaking spaces were used in the HTML to keep consistant spacing size
            const spanItemValue = spanList[j].innerText.replace(/\u23b5/g, " ");

            // Compare span item to input value
            if (spanItemValue === textInput.value[j]) {
                spanList[j].className = "correct";
            } else {
                spanList[j].className = "incorrect";
            }
        }
    }

    // Reset the quote as well as update WPM and Accuracy 
    if (textLength === spanLength) {
        // Update Accuracy 
        let currentAccuracy = (document.querySelectorAll(".correct").length / spanLength) * 100;
        accuracy = Math.ceil((accuracy + currentAccuracy) / 2);
        
        document.getElementById("accuracy").innerText = `Accuracy: ${accuracy}%`

        // Update WPM


        getQuote(API_URL);
    }
}
