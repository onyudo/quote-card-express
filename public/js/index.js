//JavaScript
"use strict";

const quotes = [
    { quote: "Not until we're totally crushed do we show what we are made of.", author: "Bohumil Hrabal" },
    { quote: "In the depth of winter, I finally learned that within me there lay an invincible summer.", author: "Albert Camus" },
    { quote: "All we have to decide is what to do with the time that is given us.", author: "J.R.R. Tolkien" },
    // add more quotes here
];

const quoteElement = document.getElementsByClassName("random-quote")[0]; // Access the first element of this class
const authorElement = document.getElementsByClassName("source")[0]; // Access the first element of this class

// Array to store indices of used quotes
let usedIndexes = []; 

/*
// This was my original code and starting point prior to creating the cycleQuotes function
// function generate random quote
// IS THIS FUNCTION EVEN NEEDED ANYMORE?
// Seems redundant, so I commented it out
function getRandomQuote() {

    // randomly choose a quote from the array of quotes. The random # generator from the JS final is a starting point
    const randomIndex = Math.floor(Math.random() * quotes.length); // use length to count the number of quote indexes

    // assign the randomly chosen index to another constant variable?
    const quote = quotes[randomIndex];

    // use innerText to output quote to HTML document
    quoteElement.innerText = quote.quote;

    // user innerText to output author to HTML document
    authorElement.innerText = quote.author;
}
*/

// Is there a way to have the quotes "play" for a short amount of time and rotate randomly? YES
// Integrate the randomization from the getRandomQuote function above
function cycleQuotes() {
    // Check if all quotes have been shown
    if (usedIndexes.length === quotes.length) {
        usedIndexes = []; // Reset the usedIndexes array if all quotes have been shown
    }

    // Generate a random index that hasn't been used yet
    // If the random index has been used, the do...while loop will generate another one until it finds one that hasn't been used.
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (usedIndexes.includes(randomIndex)); // Keep generating a new random index until it's not been used

    // Get the random quote
    const quote = quotes[randomIndex];

    // Display the quote and author
    quoteElement.innerText = quote.quote;
    authorElement.innerText = quote.author;

    // Add the selected index to the usedIndexes array
    // Keep track of indices
    usedIndexes.push(randomIndex);
}
    
/*
    // Move to the next quote in the array
    // This is no longer needed
    currentQuoteIndex++;

    // If we reach the end of the array, reset the index to 0 (start over)
    // This is no longer needed
    if (currentQuoteIndex >= quotes.length) {
        currentQuoteIndex = 0;
    }
}
*/   

// render and cycle through the quotes and author combo to the HTML document
// found this on Stack Overflow
window.addEventListener('load', function() {
    cycleQuotes(); // Display the first quote immediately
    setInterval(cycleQuotes, 9000); // Rotate quotes every 9 seconds (9000 milliseconds)
});