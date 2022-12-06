const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');


// Making apiQuotes a global variable that is declared outside a function but can be used in any function
let apiQuotes = [];



// show new quote

function newQuote() {

  // Pick a random quote from array 

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  authorText.textContent = quote.author;
  quoteText.textContent = quote.text;


  if (!quote.author) {
    authorText.textContent = 'Unknown';
} else {
    authorText.textContent = quote.author;
}
// Check Quote length to determine styling
if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}
// Set Quote 
quoteText.textContent = quote.text; 

}



// Get Quotes From API
async function getQuotes() {
  
    const apiUrl =  'https://raw.githubusercontent.com/DaraPhillips/IDM2RWD/main/Script.3.js'; //change to github url that has local quotes
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(apiQuotes);
  } catch (error) {
    // Catch Error Here
  }
}

newQuoteBtn.addEventListener('click', newQuote);


// On Load
getQuotes();
