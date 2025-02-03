"use strict";

const express = require("express");
const app = express();
const path = require ("path");
const port = 1776;

// Serves the front-end content in the public directory
app.use("", express.static(path.join(__dirname, "./public")));

// The app.use() function adds a new middleware to the app.
// Middleware functions are responsible for handling the request and crafting a response. 
// Essentially, whenever a request hits your backend,
// Express will execute the functions you passed to app.use() in order.
app.use(express.json());
// This middleware is for handling URL-encoded data (key-value pairs),
// which can come from form submissions or other HTTP requests that send data this way (e.g., API clients).
app.use(express.urlencoded({extended: false}));

// Serves the whole app
app.listen(port || 8080, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press CTRL+C to end this process.");
})