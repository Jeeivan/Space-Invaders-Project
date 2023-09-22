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
let gameComplete = false
let lives = 3
let waves = 1
const displayLives = document.getElementById('lives')
displayLives.innerText = `Lives = ${lives}`
const displayWave = document.getElementById('wave')
displayWave.innerText = `Wave ${waves}`

const startBtn = document.getElementById('start')

// To display after game is lost/won
const gameFinished = document.createElement('h1')
const playAgain = document.createElement('button')
playAgain.setAttribute('id', 'play-again')
playAgain.innerText = 'Play Again'
const wonGame = document.createElement('h1')
const gameOverDisplay = document.getElementById('gameOver')
const endDisplay = document.getElementById('display')
const box = document.getElementById('container')

// Audio
const missileSound= new Audio("./audio/raygun.mp3")
const gameOverSound = new Audio ("./audio/cod.mp3")
const startSound = new Audio ("./audio/start.mp3")
const invaderDestroyed = new Audio ("./audio/downed.mp3")
const winSound = new Audio ("./audio/victory.mp3")
const hitSound = new Audio ("./audio/hit.mp3")
const nextRound = new Audio ("./audio/next.mp3")
const bombDrop = new Audio ("./audio/bomb.mp3")

// Spaceship
const startingPosition = 104;
let currentPosition = startingPosition;

// Alien
let aliens = [];
let activeAliens = [];
const alienPosition = 1;
let direction = 1;
let goingRight = true;
let invaders = [
  13, 14, 15, 16, 17, 18, 19, 24, 25, 26, 27, 28, 29, 30, 35, 36, 37, 38, 39,
  40, 41,
];
let newInvaders = [
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
  if (this.position >= 0 && this.position < cells.length) {
    cells[this.position].classList.add("bomb");
  }
}

removeBomb() {
  if (this.position >= 0 && this.position < cells.length) {
    cells[this.position].classList.remove("bomb");
  }
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
    // cell.innerText = i;
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
  cells[currentPosition].classList.remove("ship");
}

// Adding Alien
function addAlien() {
  if (gameComplete !== true) {
    for (let i = 0; i < invaders.length; i++) {
      if (invaders[i] >= 0 && invaders[i] < cells.length && !aliensRemoved.includes(i)) {
        cells[invaders[i]].classList.add("alien");
      }
    }
  }
}

function removeAlien() {
  for (let i = 0; i < invaders.length; i++) {
    if (invaders[i] >= 0 && invaders[i] < cells.length) {
      cells[invaders[i]].classList.remove("alien");
    }
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
  if (gameComplete !== true) {
  const key = event.keyCode;

  const left = 37;
  const aLeft = 65;
  const right = 39;
  const dRight = 68;

  // Remove ship from previous position before updating current position to new cell
  removeShip();


  // Check which key was pressed and execute code
  if ((key === left || key === aLeft) && currentPosition % width !== 0) {
    currentPosition = Math.max(currentPosition - 1, currentPosition - width);
  } else if (
    (key === right || key === dRight) &&
    currentPosition % width !== width - 1
  ) {
    currentPosition = Math.min(currentPosition + 1, currentPosition + width);
  } else {
  }

  // Add ship class once currentPosition has been updated
  addShip(currentPosition);
}}

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
    bombDrop.play()
    bomb.move();
  }
}

// Function to shoot missile
function shoot(x) {
  let missile;
  let currentMissileIdx = currentPosition;

  function moveMissile() {
    if (
      currentMissileIdx >= 0 &&
      currentMissileIdx < cells.length &&
      cells[currentMissileIdx]
    ) {
      cells[currentMissileIdx].classList.remove("missile");
      currentMissileIdx -= width;

      if (cells[currentMissileIdx]) {
        cells[currentMissileIdx].classList.add("missile");

        if (cells[currentMissileIdx].classList.contains("alien")) {
          cells[currentMissileIdx].classList.remove("missile");
          cells[currentMissileIdx].classList.remove("alien");
          invaderDestroyed.play();
          let index = invaders.indexOf(currentMissileIdx);
          invaders.splice(index, 1);
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
          winGame();
        }
      }
    }
  }

  switch (x.key) {
    case " ":
      if (gameComplete !== true) {
        missileSound.play();
        missile = setInterval(moveMissile, 300);
      }
  }
}


// Game Over Function
function gameOver() {
  gameComplete = true
  // saveScoreToLocalStorage(score); 
  removeAllAliens()
  clearInterval(moveAliens)
  clearInterval(dropRandomBomb)
  gameOverSound.play()
  gameOverDisplay.style.display ='flex'
  endDisplay.innerText = `Game Over! You reached Wave ${waves} and achieved a score of ${score}`
  box.appendChild(playAgain)
}

// Win Game Function
function winGame() {
  if (score === 63) {
    gameComplete = true
    // saveScoreToLocalStorage(score);
    clearInterval(moveAliens)
    clearInterval(dropRandomBomb)
    winSound.play()
    gameOverDisplay.style.display ='flex'
    endDisplay.innerText = `Congrats! You have destroyed all aliens and saved Earth! You achieved a score of ${score}` 
    box.appendChild(playAgain)
  } else if (score % 21 === 0) {
    resetGame()
  }
}

function resetGame() {
  waves++
  displayWave.innerText = `Wave ${waves}`
  invaders = [...newInvaders]
  nextRound.play()
  clearInterval(moveAliens)
  clearInterval(dropRandomBomb)
  setInterval(moveAliens, 750)
  setInterval(dropRandomBomb, 1500)
}

// Function to get rid of all aliens on the screen
function removeAllAliens() {
  for (let i = 0; i < invaders.length; i++) {
    cells[invaders[i]].classList.remove("alien");
  }
  aliensRemaining = 0;
}

// ! Events
document.addEventListener("keyup", shoot);
document.addEventListener("keyup", handleMovement);
playAgain.addEventListener('click', () => {
  window.location.reload()
})
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none'
  startSound.play()
  createBoard()
})

// ! Page Load
// createBoard();


