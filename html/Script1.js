// Manipulating the DOM | Finds the element by id and assigns it to the variable

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
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}


// Get Quotes From API
async function getQuotes() {
  
    const apiUrl =  'https://raw.githubusercontent.com/DaraPhillips/IDM2RWD/fe9dde975b9e199493bbcac8f96a357615d3cf0a/Script.3.js'; //change to github url that has local quotes
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(apiQuotes);
  } catch (error) {
    // Catch Error Here
  }
}

// Insta Quote
function InstaQuote() {
  const InstaUrl = `https://www.instagram.com/${quoteText.innerText} - ${authorText.innerText}`;
  window.open(InstaUrl, '_blank');
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
instaBtn.addEventListener('click',InstaQuote)
// On Load
getQuotes();
