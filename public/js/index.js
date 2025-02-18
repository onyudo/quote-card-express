"use strict";

const el = {
    quote: document.getElementById("quote"),
    author: document.getElementById("author")
};

// variables for local storage
const IMAGE_STORAGE_KEY = "randomImageURL"; // Local storage key for the image
const IMAGE_TIMESTAMP_KEY = "imageTimestamp"; // Timestamp for caching expiration
const CACHE_EXPIRATION_TIME = 300000; // 5 minutes in milliseconds

async function getRandomPhoto() {
    const currentTime = new Date().getTime();
    const storedImage = localStorage.getItem(IMAGE_STORAGE_KEY);
    const storedTimestamp = localStorage.getItem(IMAGE_TIMESTAMP_KEY);

    // Check if the cached image is still valid (not expired)
    if (storedImage && storedTimestamp && currentTime - storedTimestamp < CACHE_EXPIRATION_TIME) {
        // Use the cached image
        console.log("Using cached image.");
        const imgDiv = document.querySelector(".background-img");
        imgDiv.style.backgroundImage = `url(${storedImage})`; // Set the background image from localStorage
    } else {
        // No valid cached image, fetch a new one
        try {
            const response = await fetch("http://localhost:1776/api/getRandomImage");
            const data = await response.json();

            // checks if the server responded with a successful status (200)
            // If the response is successful, extract the photo from the data.data field and store it in the receivedPhoto variable
            if (data.status === 200) {
                const receivedPhoto = data.data; // Get the image URL

                // Cache the new image URL and the current timestamp in localStorage
                localStorage.setItem(IMAGE_STORAGE_KEY, receivedPhoto);
                localStorage.setItem(IMAGE_TIMESTAMP_KEY, currentTime);

                const imgDiv = document.querySelector(".background-img");
                imgDiv.style.backgroundImage = `url(${receivedPhoto})`; // Set the background image from the API
            } else {
                console.error("Failed to fetch image data");
            }
        } catch (error) {
            console.error(error); // Log any errors to the console
        }
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
    }, 3000);
}

// Start the quote loop immediately
loopThroughQuotes();

