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
const botShowArea = document.querySelector("#player2 .selected-option .option")

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
  calculateScore(player1, player2);
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
const showMessage = (msg) => {
  roundMessage.innerHTML = "";
  roundMessage.innerHTML = msg;
};

const calculateScore = (player1, player2) => {
  // player 1 choice
  const player1Choice = optionsArray[player1].name;

  // bot choice
  const player2Choice = optionsArray[player2].name;

  // get player 1 selected choice rule
  const player1Strength = rule[player1Choice];

  // Check the case and who wins the round
  if (player1Choice === player2Choice) {
    showMessage("Draw")
  } else if (player1Strength.includes(player2Choice)) {
    addScore(player1Score);
    showMessage("Player 1 wins!");
  } else {
    addScore(player2Score);
    showMessage("Bot wins!");
  }
};

const reset = () => {
  botShowArea.innerHTML = "";
  playerShowArea.innerHTML = "";
  roundMessage.innerHTML = "Choose Your Option";
  player2Score.innerHTML = "0";
  player1Score.innerHTML = "0";
  player1Options.forEach((e) => {
    e.classList.remove("active");
  });
  botOptions.forEach((e) => {
    e.classList.remove("active");
  });
};

document.querySelector(".reset").addEventListener("click", reset);