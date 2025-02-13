"use strict";

const el = {
    quote: document.getElementById("quote"),
    author: document.getElementById("author")
};

async function getRandomPhoto() {
    const url = "http://localhost:1776/api/getRandomImage"; // Ensures it uses HTTP or matches your server protocol
    try {
        const response = await fetch(url); // Request the random image from the server
        const data = await response.json(); // Parse the JSON response

        if (data.status === 200) {
            const receivedPhoto = data.data; // Access the image URL from 'data'

            const imgDiv = document.querySelector(".background-img");
            imgDiv.style.backgroundImage = `url(${receivedPhoto})`; // Set the background image of the div
        } else {
            console.error("Failed to fetch image data");
        }
    } catch (error) {
        console.log(error); // Log any errors to the console
    }
}

getRandomPhoto(); // Call the function to get a random photo when the page loads


// Iterating through objects
const quotes = [
    {
        quote: "Not until we're totally crushed do we show what we are made of.",
        author: "Bohumil Hrabal"
    },

    {
        quote: "In the depth of winter, I finally learned that within me there lay an invincible summer.",
        author: "Albert Camus"
    },

    {
        quote: "All we have to decide is what to do with the time that is given us.",
        author: "J.R.R. Tolkien"
    },
];

// Looping through the quotes array every 3 seconds
function loopThroughQuotes() {
    let currentIndex = 0;
    setInterval(() => {
        if (currentIndex < quotes.length) {
            el.quote.innerText = quotes[currentIndex].quote;
            el.author.innerText = quotes[currentIndex].author;
            currentIndex++;
        } else {
            currentIndex = 0; // Restart the loop if we reach the end of the array
        }
    }, 3000)
}

// Start the quote loop immediately
loopThroughQuotes(); 