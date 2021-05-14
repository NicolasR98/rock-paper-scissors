//============== Selectors ==============

//Game display 
const moves = document.querySelectorAll(".p_move");
const p1ScoreDisplay = document.querySelector(".p1_score")
const p2ScoreDisplay = document.querySelector(".p2_score")

//Footer
const handBtns = document.querySelectorAll(".hand_btn");
const roundNum = document.querySelector(".round_number");


//1.Make two objects refering player and computer
//--a.Keep track of the score
//--b.Function to make a move
//--c.Function to reset their scores
//--d.Name of each one

const Player = {
  name: "Player",
  score: 0,
  makeMove() {
    let index = parseInt(prompt("1.Rock/2.Paper/3.Scissors"));
    return RPS[index - 1];
  },
  incrementScore() {
    return this.score++;
  },
  resetScore() {
    return (this.score = 0);
  },
};

const Computer = {
  name: "Computer",
  score: 0,
  makeMove() {
    let getRandomNumber = (num) => Math.floor(Math.random() * num);
    let index = getRandomNumber(RPS.length);
    return RPS[index];
  },
  incrementScore() {
    this.score++;
  },
  resetScore() {
    this.score = 0;
  },
};

//2.Make an array with RPS(rock,paper,scissors) objects with the next properties
//--a. name = 'rock',
//--a. beats = 'scissors' (The rock beats the scissors)

const RPS = [
  {
    name: "rock",
    beats: "scissors",
  },
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
];

//3.Make a function to start a round between the player and the computer
//--a.Compare their moves (rock vs scissors)
//--b.Define the winner of the round.
//--c.Increment the score of the winner

function playRound(player, oponent) {
  //Start the moves
  let playerMove = player.makeMove();
  let oponentMove = oponent.makeMove();

  if (playerMove.beats === oponentMove.name) {
    Player.incrementScore();
    return console.log(
      `Player with ${playerMove.name} beats Computer ${oponentMove.name}`
    );
  }
  if (oponentMove.beats === playerMove.name) {
    Computer.incrementScore();
    return console.log(
      `Computer with ${oponentMove.name} beats Player ${playerMove.name}`
    );
  }

  return console.log(
    `is a tie! player: ${playerMove.name} / computer: ${oponentMove.name}`
  );
}

//4.Make a function to check the player and computer scores to define who is the winner or if is a tie
function checkWinner(player, oponent) {
  if (player.score === oponent.score) {
    return `is a tie! ${player.name} ${player.score} : ${oponent.name} ${oponent.score}`;
  }

  if (player.score > oponent.score) {
    return `${player.name} won the game! - ${player.score} : ${oponent.score}`;
  } else {
    return `${oponent.name} won the game! - ${oponent.score} : ${player.score}`;
  }
}

//5.Make a function to start a game with several rounds, keep track of the scores and define the winner
//--a.Has a param that defines the number of rounds
//--b.Keep the track of the scores and displays them
//--c.Displays the winner of the game
//--d.Resets the stats
function startGame(rounds) {
  let round = 0;
  while (round < rounds) {
    playRound(Player, Computer);
    round++;
  }
  console.log(checkWinner(Player, Computer));
}

startGame(5);
