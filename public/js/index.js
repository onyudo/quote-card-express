"use strict";

const el = {
    quote: document.getElementById("quote"),
    author: document.getElementById("author")
};

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
]

function loopThroughQuotes() {
    let index = 0;
    setInterval(() => {
        if (index < quotes.length) {
            el.quote.innerText = quotes[index].quote;
            el.author.innerText = quotes[index].author;
            index++;
        } else {
            index = 0;
        }
    }, 3000)
}

/*
// Dan's code which causes an initial 6 second delay at first
setTimeout(loopThroughQuotes, 3000);
*/

// No delay while looping through the quotes
loopThroughQuotes();