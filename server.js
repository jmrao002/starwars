// you always have to kill your server when you want to make chances to your index.js file
// can check results in thunder client by putting in what you would put in chrome (http://localhost:3001) and it should return the res.send - make sure you have it as GET request when checking the get methods
// get GETS data from the database, post sends data to the database

// Dependencies //////////////////////////////////
// not using http like we did previously, using express, which uses http
const express = require("express");
const path = require("path");

// new object that uses express
const app = express();
// tells heroku to use whatever port you can, or use 3001
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
// we want to push the new character into the array but it must be pushed in as an object, not as a json string (which is how it comes in)
// express automatically stringifies/parses it
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data //////////////////////////////////
// these were initially individual objects with no routeName listed - condensed into an array added the routeName to the object so we can reference it for a function that generates the route so we can not repeat ourselves
// this array exists in memory - when you add items to it you won't see the character here, it will just be in memory
// when you kill the server that memory goes away
const characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000,
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200,
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350,
  },
];

// Routes //////////////////////////////////
app.get("/", (req, res) => {
  // server is sending this back to the user
  // homepage; using __dirname: doesn't matter where you are in your directory, it finds the view.html file - important because you'll be using the heroku directory, it'll just use the absolute path of the file structure
  res.sendFile(path.join(__dirname, "view.html"));
});

// add form to add a character
app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "add.html"));
});

// get our entire database - should show the characters array in thunder client
app.get("/api/characters", (req, res) => {
  res.json(characters);
});

// get one character from our array of characters
// : indicates that this is a variable - we want to be able to pass in any name we want
app.get("/api/characters/:character", (req, res) => {
  // assign route paramater to variable
  const chosen = req.params.character;
  // finding character in our array of characters
  // basically trying to see if the character the user types after / matches an actual character in our array of characters - returns false if there's no match and you can use that to do something about it later
  const chosenCharacter =
    characters.find((character) => character.routeName === chosen) || false;
  // return found object in array
  return res.json(chosenCharacter);
});

// create a new character using POST
// when you send a message to the server the variable comes in a req object/variable
app.post("/api/characters", (req, res) => {
  // the .body is the contents of the request? when you put the info in on the front end, .body holds the user inputs
  const newCharacter = req.body;
  // creating a routename
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  // adds new character to the database (our characters array)
  characters.push(newCharacter);
  // returning new character as json
  res.json(newCharacter);
  // test this by sending a POST with a JSON body in thunder client
});

// Listener //////////////////////////////////
// npm run start will run whatever "start" you included in your package.json, in our case start is "node index.js" which just runs this file
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}...`));
