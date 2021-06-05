// dependencies
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
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

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Get our entire database
app.get("/api/characters", (req, res) => {
  return res.json(characters);
});

// Gets a specific character from our database
app.get("/api/characters/:character", (req, res) => {
  // assign route parameter to variable
  const chosen = req.params.character;
  //find character in our array of characters
  const chosenCharacter = characters.find(
    // return the found object in the array
    (character) => character.routeName === chosen || false
  );

  return res.json(chosenCharacter);
});

app.post("/api/characters", (req, res) => {
  const newCharacter = req.body;
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  characters.push(newCharacter);
  res.json(newCharacter);
});

// start the server
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
