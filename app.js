//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

//For using the ejs module for the usage of templating.
app.set("view engine", "ejs");

// Body Parser
// To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.

// body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.

// This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request. Install body-parser using NPM as shown below
app.use(bodyParser.urlencoded({ extended: true }));

// For asking express to load the local static files like css and others because by default it does not load them.
app.use(express.static("public"));



mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// registering encrypt plugin to our schema to for encryption of our database
userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

// Setting up a new user model. Creation of User collection using user schema
const User = new mongoose.model("User", userSchema);


app.get("/", function (req, res) {
    res.render("home");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/login", function (req, res) {
    res.render("login");
});


app.post("/register", function (req, res) {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.render("secrets");
        }
    });
});

app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                }
            }
        }
    });
});


app.listen(3000, function () {
    console.log("Server started on port 3000!");
});