//============== Selectors ==============

//Game display
const imgSelections = document.querySelectorAll(".p_move");
const p1ScoreDisplay = document.querySelector(".p1_score");
const p2ScoreDisplay = document.querySelector(".p2_score");
const p1Name = document.querySelectorAll(".p1_name");
const p2Name = document.querySelectorAll(".p2_name");

//Log
const logWrapper = document.querySelector(".log_wrapper");

//Footer
const handBtns = document.querySelectorAll(".hand_btn");
const roundDisplay = document.querySelector(".round_number");

//============== Global values ==============

//Rock, paper, scissors object
const RPS = [
  {
    name: "rock",
    beats: "scissors",
    img: "./images/rock.png",
  },
  {
    name: "paper",
    beats: "rock",
    img: "./images/paper.png",
  },
  {
    name: "scissors",
    beats: "paper",
    img: "./images/scissors.png",
  },
];

//Round Number
let round = 0;

//P1 Object
const P1 = {
  name: "Player",
  score: 0,
  incrementScore() {
    this.score++;
    p1ScoreDisplay.textContent = this.score;
  },
  resetScore() {
    this.score = 0;
    p1ScoreDisplay.textContent = this.score;
  },
};

//P2 Object (Computer)
const P2 = {
  name: "Computer",
  score: 0,
  makeMove() {
    let getRandomNumber = (num) => Math.floor(Math.random() * num);
    let index = getRandomNumber(RPS.length);
    return RPS[index];
  },
  incrementScore() {
    this.score++;
    p2ScoreDisplay.textContent = this.score;
  },
  resetScore() {
    this.score = 0;
    p2ScoreDisplay.textContent = this.score;
  },
};

//============== Functions ==============

const displayNames = (nameP1, nameP2) => {
  p1Name.forEach((name) => (name.textContent = nameP1));
  p2Name.forEach((name) => (name.textContent = nameP2));
};
displayNames(P1.name, P2.name);

const countRounds = () => {
  round++;
  roundDisplay.textContent = round;
};
const resetRounds = () => {
  round = 0;
  roundDisplay.textContent = round;
};

const displayLog = () => {
  //Create elements
  const li = document.createElement("li");
  const imgSelectionP1 = document.createElement("img");
  const imgSelectionP2 = document.createElement("img");
  const h3 = document.createElement("h3");

  //Add respective classes to created elements
  li.classList.add("log");
  imgSelectionP1.classList.add("p_move");
  imgSelectionP2.classList.add("p_move");

  //Assign the players selection img to the log
  imgSelectionP1.src = imgSelections[0].src;
  imgSelectionP2.src = imgSelections[1].src;

  h3.textContent = "VS";

  //Append all to the li
  li.append(imgSelectionP1, h3, imgSelectionP2);
  //Append the li to the ul (logWrapper)
  logWrapper.append(li);
};

const resetLog = () => (logWrapper.innerHTML = "");

const playRound = (p1, p2) => {
  //Start round when players make their selections
  let p1Selection = RPS.find((selection) => p1.move === selection.name);
  let p2Selection = p2.makeMove();

  //Display the players selections in the game display
  imgSelections[0].src = p1Selection.img;
  imgSelections[1].src = p2Selection.img;

  //Round logic
  /*
    1.If they make the same selection, nothing happens
    2.If P1 selection beats P2 selecion, increment score to P1
    3.Else increment score to P2
  */

  p1Selection.name === p2Selection.name
    ? ""
    : p1Selection.beats === p2Selection.name
    ? p1.incrementScore()
    : p2.incrementScore();
};

const disableSelections = (bool) => {
  //If true disable buttons
  if (bool) {
    handBtns.forEach((btn) => {
      btn.classList.add("disabled");
      btn.disabled = true;
    });

    //Else remove disable state
  } else {
    handBtns.forEach((btn) => {
      btn.classList.remove("disabled");
      btn.disabled = false;
    });
  }
};

const resetSelections = () => {
  imgSelections[0].src = "";
  imgSelections[1].src = "";
};

const gameOver = (p1, p2) => {
  disableSelections(true);
  if (p1.score > p2.score) {
    console.log(`${p1.name} won the game!`);
  } else {
    console.log(`${p2.name} won the game!`);
  }
};

const restartGame = (p1, p2) => {
  p1.resetScore();
  p2.resetScore();
  resetLog();
  resetRounds();
  resetSelections();
  disableSelections(false)
};

const playGame = (scoreToWin) => {
  handBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let selection = btn.dataset.selection;
      P1.move = selection;

      playRound(P1, P2);
      countRounds();
      displayLog();

      if (P1.score >= scoreToWin || P2.score >= scoreToWin) {
        gameOver(P1, P2);
      }
    });
  });
};

playGame(5);
