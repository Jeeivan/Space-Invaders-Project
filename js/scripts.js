// ! Variables and elements
// Board
const board = document.querySelector(".board");
const width = 11;
const height = 10;
const cellCount = width * height;
let cells = [];
let score = 0;
const scoreDisplay = document.getElementById("score");
loseRow = [99,100,101,102,103,104,105,106,107,108,109];
gameComplete = false
lives = 3
const displayLives = document.getElementById('lives')
displayLives.innerText = `Lives = ${lives}`

// To display after game is lost/won
const gameFinished = document.createElement('h1')
const playAgain = document.createElement('button')
playAgain.innerText = 'Play Again'
const wonGame = document.createElement('h1')

// Audio
const missileSound= new Audio("../audio/raygun.mp3")
const gameOverSound = new Audio ("../audio/cod.mp3")
const startSound = new Audio ("../audio/start.mp3")
const invaderDestroyed = new Audio ("../audio/downed.mp3")
const winSound = new Audio ("../audio/victory.mp3")
const hitSound = new Audio ("../audio/hit.mp3")

// Spaceship
const startingPosition = 104;
let currentPosition = startingPosition;

// Alien
let aliens = [];
let activeAliens = [];
const alienPosition = 1;
let direction = 1;
let goingRight = true;
const invaders = [
  13, 14, 15, 16, 17, 18, 19, 24, 25, 26, 27, 28, 29, 30, 35, 36, 37, 38, 39,
  40, 41,
];
let aliensRemoved = [];
let aliensRemaining = invaders.length;

// Alien Bombs
class Bomb {
  constructor(position) {
    this.position = position;
    this.interval = null;
  }

  move() {
    this.interval = setInterval(() => {
      this.removeBomb();
      this.position += width;
      if (this.position >= cellCount) {
        this.removeBomb();
        clearInterval(this.interval);
      } else {
        this.addBomb();
        this.checkCollision();
      }
    }, 300); // Adjust the speed of the bomb
  }

  addBomb() {
    cells[this.position].classList.add("bomb");
  }

  removeBomb() {
    cells[this.position].classList.remove("bomb");
  }

  checkCollision() {
    if (this.position === currentPosition) {
      // Only trigger game over if bomb hits the ship
      this.removeBomb();
      lives--
      hitSound.play()
      displayLives.innerText = `Lives = ${lives}`
      if (lives === 0) {
        cells[currentPosition].classList.remove("ship");
        gameOver();
      }
      // cells[currentPosition].classList.remove("ship");
      // gameOver();
    }
  }
}

// ! Functions
// CREATE GRID CELLS
function createBoard() {
  // Use the cellCount to create our grid cells
  for (let i = 0; i < cellCount; i++) {
    // Create div cell
    const cell = document.createElement("div");
    // Add index to div element
    cell.innerText = i;
    // Add index to an attribute
    // cell.dataset.index= i - another way of doing below
    cell.setAttribute("data-index", i);
    // Add the height and width to each grid cell (div)
    cell.style.height = `${100 / height}%`;
    cell.style.width = `${100 / width}%`;

    // Add cell to grid
    board.appendChild(cell);
    // Add newly created cell to cells array
    cells.push(cell);
  }
  // Add Ship, alien and set intervals
  addShip(startingPosition);
  addAlien();
  setInterval(moveAliens, 1000);
  setInterval(dropRandomBomb, 1500);
}

// Adding Ship
function addShip(position) {
  currentPosition = position;
  cells[position].classList.add("ship");
}

// Removing Ship
function removeShip() {
  console.log("SHIP REMOVED");
  cells[currentPosition].classList.remove("ship");
}

// Adding Alien
function addAlien() {
  if (gameComplete !== true) {
    for (let i = 0; i < invaders.length; i++) {
      if (!aliensRemoved.includes(i)) {
        cells[invaders[i]].classList.add("alien");
      }
    }
  }
}

// Removing Alien
function removeAlien() {
  for (let i = 0; i < invaders.length; i++) {
    cells[invaders[i]].classList.remove("alien");
  }
  aliensRemaining--; // Reduce the count of remaining aliens
}

// Moving Alien
function moveAliens() {
  const leftEdge = invaders[0] % width === 0;
  const rightEdge = invaders[invaders.length - 1] % width === width - 1;
  removeAlien();

  if (rightEdge && goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < invaders.length; i++) {
    invaders[i] += direction;
  }

  addAlien();

  if (cells[currentPosition].classList.contains("alien", "ship")) {
    removeShip();
    gameOver();
  } else if (loseRow.some(cellIndex => cells[cellIndex].classList.contains('alien'))) {
    removeShip();
    gameOver();
  }
}

// Control Movement
function handleMovement(event) {
  const key = event.keyCode;
  console.log(event.keyCode);

  const left = 37;
  const aLeft = 65;
  const right = 39;
  const dRight = 68;

  // Remove ship from previous position before updating current position to new cell
  removeShip();

  console.log(currentPosition, width, currentPosition % width);

  // Check which key was pressed and execute code
  if ((key === left || key === aLeft) && currentPosition % width !== 0) {
    console.log("LEFT");
    currentPosition = Math.max(currentPosition - 1, currentPosition - width);
  } else if (
    (key === right || key === dRight) &&
    currentPosition % width !== width - 1
  ) {
    console.log("RIGHT");
    currentPosition = Math.min(currentPosition + 1, currentPosition + width);
  } else {
    console.log("INVALID KEY");
  }

  // Add ship class once currentPosition has been updated
  addShip(currentPosition);
}

// Get random alien index
function getRandomAlienIndex() {
  return Math.floor(Math.random() * invaders.length);
}

// Function to drop bombs from random aliens
function dropRandomBomb() {
  if (gameComplete !== true) {
    const randomAlienIndex = getRandomAlienIndex();
    const randomAlienPosition = invaders[randomAlienIndex];
    const bomb = new Bomb(randomAlienPosition);
    bomb.addBomb();
    bomb.move();
  }
}

// Function to shoot missile
function shoot(x) {
  let missile;
  let currentMissileIdx = currentPosition;
  function moveMissile() {
    cells[currentMissileIdx].classList.remove("missile");
    currentMissileIdx -= width;
    cells[currentMissileIdx].classList.add("missile");

    if (cells[currentMissileIdx].classList.contains("alien")) {
      cells[currentMissileIdx].classList.remove("missile");
      cells[currentMissileIdx].classList.remove("alien");
      invaderDestroyed.play()
      let index = invaders.indexOf(currentMissileIdx)
      invaders.splice(index, 1)
      cells[currentMissileIdx].classList.add("explosion");

      setTimeout(
        () => cells[currentMissileIdx].classList.remove("explosion"),
        300
      );
      clearInterval(missile);

      const alienRemoved = invaders.indexOf(currentMissileIdx);
      aliensRemoved.push(alienRemoved);
      score++;
      scoreDisplay.innerHTML = `Score = ${score}`;
      console.log(aliensRemoved);
      winGame()
    }
  }
  switch (x.key) {
    case " ":
      missileSound.play() // This will play audio file for each time missile is fired
      missile = setInterval(moveMissile, 300);
  }
}

// Game Over Function
function gameOver() {
  gameComplete = true
  saveScoreToLocalStorage(score);
  removeAllAliens()
  gameFinished.innerText = `Game Over! You achieved a score of ${score}`
  gameOverSound.play()
  board.appendChild(gameFinished)
  board.appendChild(playAgain)
}

// Win Game Function
function winGame() {
  if (score === 21) {
    gameComplete = true
    saveScoreToLocalStorage(score);
    winSound.play()
    wonGame.innerText = `Congrats! You have destroyed all aliens and saved Earth! You achieved a score of ${score}` 
    board.appendChild(wonGame)
    board.appendChild(playAgain)
  }
}

// Function to get rid of all aliens on the screen
function removeAllAliens() {
  for (let i = 0; i < invaders.length; i++) {
    cells[invaders[i]].classList.remove("alien");
  }
  aliensRemaining = 0;
}

// Function to save score to storage
function saveScoreToLocalStorage(score) {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push(score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function getLeaderboardFromLocalStorage() {
  return JSON.parse(localStorage.getItem("leaderboard")) || [];
}

function displayLeaderboard() {
  const leaderboardList = document.getElementById("leaderboard-list");
  const leaderboard = getLeaderboardFromLocalStorage();
  
  leaderboardList.innerHTML = "";
  leaderboard.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `Score ${index + 1}: ${score}`;
    leaderboardList.appendChild(listItem);
  });
}

// Reset Leaderboard
function resetLeaderboard() {
  localStorage.removeItem("leaderboard");
  displayLeaderboard(); // Update the displayed leaderboard
}



// ! Events
document.addEventListener("keyup", shoot);
document.addEventListener("keyup", handleMovement);
playAgain.addEventListener('click', () => {
  window.location.reload()
})
document.getElementById("reset-leaderboard").addEventListener("click", resetLeaderboard);

// ! Page Load
createBoard();
displayLeaderboard()
