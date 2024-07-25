const express = require("express");
const { exec } = require("child_process");
const app = express();

// List of available cowsay animals
const animals = [
  "beavis.zen",
  "bud-frogs",
  "bunny",
  "cheese",
  "cower",
  "default",
  "dragon",
  "dragon-and-cow",
  "elephant",
  "elephant-in-snake",
  "eyes",
  "flaming-sheep",
  "ghostbusters",
  "hellokitty",
  "kiss",
  "kitty",
  "koala",
  "kosh",
  "luke-koala",
  "milk",
  "moofasa",
  "moose",
  "ren",
  "sheep",
  "skeleton",
  "small",
  "sodomized",
  "stegosaurus",
  "stimpy",
  "supermilker",
  "surgery",
  "three-eyes",
  "turkey",
  "turtle",
  "tux",
  "vader",
  "vader-koala",
  "www",
];

// Function to get a random animal
function getRandomAnimal() {
  return animals[Math.floor(Math.random() * animals.length)];
}

app.get("/fortune", (req, res) => {
  const animal = getRandomAnimal();
  exec(`fortune | cowsay -f ${animal}`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      res.status(500).send(`Stderr: ${stderr}`);
      return;
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
