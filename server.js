"use strict";

const express = require("express");
const app = express();
const path = require("path");
const port = 1776;

require("dotenv").config();
const cors = require("cors");
const corsOptions = {
    origin: `http://localhost:1776`,
};
app.use(cors(corsOptions));

app.use("", express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function getRandomPhoto() {
    const url = `https://api.unsplash.com/photos/random/?client_id=${process.env.CLIENT_ID}`; // Ensures it uses HTTP or matches your server protocol
    try {
        const response = await fetch(url); // Request the random image from the server
        const data = await response.json(); // Parse the JSON response
        const receivedPhoto = data.urls.regular;
        return receivedPhoto;
    } catch (error) {
        console.log(error); // Log any errors to the console
    }
}

app.get("/api/getRandomImage", (request, response) => {
    getRandomPhoto().then((returnedPhoto) => {
        response.status(200).json({
            status: 200,
            data: returnedPhoto // returnedPhoto is the actual image URL
        });
    }).catch((error) => {
        console.log(error);
        response.status(500).json({ error: "Error fetching the photo" });
    });
});

app.listen(port || 8080, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press CTRL+C to end this process.");
});
