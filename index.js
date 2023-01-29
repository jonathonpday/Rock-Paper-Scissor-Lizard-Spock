// Order in which the options are available
const optionsArray = [
  {
    image: "rock.png",
    name: "Rock",
  },
  {
    image: "paper.png",
    name: "Paper",
  },
  {
    image: "scissor.png",
    name: "Scissor",
  },
  {
    image: "lizard.png",
    name: "Lizard",
  },
  {
    image: "spock.png",
    name: "Spock",
  },
];

// Rule for who has won
const rule = {
  Rock: ["Lizard", "Scissor"],
  Paper: ["Rock", "Spock"],
  Scissor: ["Lizard", "Spock"],
  Lizard: ["Spock", "Paper"],
  Spock: ["Scissor", "Rock"]
} 

// Folder in which images are stored
const imageFolderPath = "assets";

// All the options of player 1
const player1Options = document.querySelectorAll("#player1 .available-options .option");

// All bot options
const botOptions = document.querySelectorAll("#player2 .available-options .option")

// Where selected option of player 1 shown:
const playerShowArea = document.querySelector("#player1 .selected-option .option");

// Where selected option of bot is shown
const botShowArea = document.querySelector("#player2 selected-option .option")

// Player 1 and bot score
const player1Score = document.querySelector("#player1-score");
const player2Score = document.querySelector("#player2-score");

// Where message will be shown 
const roundMessage = document.querySelector("#round-message");

player1Options.forEach((e) => {
  e.addEventListener("click", () => {
    play(e);
  });
});

const play = (e) => {
  // get the index of the option slected by the player
  const player1 = e.getAttribute("data-index");

  // Number of options available
  const length = optionsArray.length

  // Generate a random number between number of options available for bot
  const player2 = Math.floor(Math.random() * length);

  // Show the player1 selected option and highlight it
  showPlayerOption(player1, playerShowArea);
  highlightSelectedOption(player1, player1Options);

  // Show the bot selected option
  showPlayerOption(player2, botShowArea);
  highlightSelectedOption(player2, botOptions);

  // Calculate the result
  calulateScore(player1, player2);
}

// Generate an image element
const generateImgElement = (index) => {
  const { image, name } = optionsArray[index];
  const imgElement = document.createElement("img");
  imgElement.src = `${imageFolderPath}/${image}`;
  imgElement.alt = name;
  imgElement.title = name;
  return imgElement
};

// Show selected option
const showPlayerOption = (index, showArea) => {
  // Append genrated image to show area
  const imgElement = generateImgElement(index);
  showArea.innerHTML = "";
  showArea.append(imgElement);
}

const highlightSelectedOption = (index, options) => {
  // Remove the class from all options
  options.forEach((e) => {
    e.classList.remove("active");
  });

  // Add the active class to the selected option
  options[index].classList.add("active");
}

// Change the score
const addScore = (player) => {
  const { innerHTML } = player;
  player.innerHTML = Number(innerHTML) + 1;
};

// Show the message 
const 