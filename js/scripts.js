// ! Variables and elements
// Board
const board = document.querySelector(".board");

const width = 11;
const height = 10;
const cellCount = width * height;
let cells = [];

// Spaceship
const startingPosition = 104;
let currentPosition = startingPosition;

// Alien
let aliens = [];
let activeAliens = [];
const alienPosition = 1;
let alienDirection = 1;

// Missile
class Missile {
  constructor(position) {
    this.position = position;
    this.interval = null;
  }

  move() {
    this.interval = setInterval(() => {
      // Remove missile from current position
      this.removeMissile();

      // Calculate new position
      this.position -= width;

      // Check if missile reached the top
      if (this.position < 0) {
        this.removeMissile();
        clearInterval(this.interval);
      } else {
        // Add missile to new position
        this.addMissile();
        // Add collision detection
        this.checkCollision();
      }
    }, 500); // Adjust the interval as per your preference
  }

  // Add Missile
  addMissile() {
    cells[this.position].classList.add("missile");
  }

  // Removing Missile
  removeMissile() {
    cells[this.position].classList.remove("missile");
  }

  // Checking Collision with alien
  checkCollision() {
    const alienIndex = aliens.indexOf(this.position);
    if (alienIndex !== -1) {
      this.removeMissile();
      cells[this.position].classList.remove("alien");
      aliens.splice(alienIndex, 1);
      clearInterval(this.interval);
      winGame();
    }
  }
}

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
      cells[currentPosition].classList.remove("ship");
      gameOver();
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
  // Add cat character class to starting position
  addShip(startingPosition);
  addAlien(alienPosition);
  setInterval(moveAlien, 1000);
  setInterval(dropRandomBomb, 1500);
}

// Adding Ship
function addShip(position) {
  console.log("Ship being added to the following cell ->", position);
  cells[position].classList.add("ship");
}

// Removing Ship
function removeShip() {
  console.log("SHIP REMOVED");
  cells[currentPosition].classList.remove("ship");
}

// Adding Alien
function addAlien(position) {
  for (let i = 11; i < 43; i++) {
    const col = i % width;
    if (col !== 0 && col !== 1 && col !== width - 2 && col !== width - 1) {
      console.log("Alien being added to the following cell ->", i);
      cells[i].classList.add("alien");
      aliens.push(i);
      activeAliens.push(i); // Add to activeAliens
    }
  }
}

// Removing Alien
function removeAlien() {
  console.log("Alien REMOVED");
  cells[currentPosition].classList.remove("alien");
}

// Moving Alien
function moveAlien() {
  const leftEdge = activeAliens[0] % width === 0;
  const rightEdge = activeAliens[activeAliens.length - 1] % width === width - 1;
  console.log(activeAliens.length);
  console.log(leftEdge);
  console.log(rightEdge);
  console.log(activeAliens);
  aliens.forEach((currentAlienPosition, index) => {
    // Remove alien from current position
    cells[currentAlienPosition].classList.remove("alien");

    // Calculate new position (move right by one cell)
    const newAlienPosition = currentAlienPosition + 1;

    // Check if alien reached the right border
    if (rightEdge) {
      // Move down and change direction to left
      const newDownPosition = newAlienPosition + width;
      cells[newDownPosition].classList.add("alien");
      aliens[index] = newDownPosition;
      alienDirection = -1;
      activeAliens = activeAliens.map((alien) => alien + 11);
    } else if (leftEdge) {
      // Move down and change direction to right
      const newDownPosition = newAlienPosition + width;
      cells[newDownPosition].classList.add("alien");
      aliens[index] = newDownPosition;
      alienDirection = 1;
    } else {
      // Add alien to new position
      cells[newAlienPosition].classList.add("alien");
      aliens[index] = newAlienPosition;
    }
  });
  if (aliens.includes(currentPosition)) {
    removeShip();
    cells[currentPosition].classList.remove("ship");
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
  const spacebar = 32;

  // Remove ship from previous position before updating current position to new cell
  removeShip();

  console.log(currentPosition, width, currentPosition % width);

  // Check which key was pressed and execute code
  if (key === left || (key === aLeft && currentPosition % width !== 0)) {
    console.log("LEFT");
    currentPosition--;
  } else if (
    key === right ||
    (key === dRight && currentPosition % width !== width - 1)
  ) {
    console.log("RIGHT");
    currentPosition++;
  } else if (key === spacebar) {
    console.log("FIRE!");
    const missile = new Missile(currentPosition - width);
    missile.addMissile();
    missile.move();
  } else {
    console.log("INVALID KEY");
  }

  // Add ship class once currentPosition has been updated
  addShip(currentPosition);
}

// Get random alien index
function getRandomAlienIndex() {
  return Math.floor(Math.random() * aliens.length);
}

// Function to drop bombs from random aliens
function dropRandomBomb() {
  const randomAlienIndex = getRandomAlienIndex();
  const randomAlienPosition = aliens[randomAlienIndex];
  const bomb = new Bomb(randomAlienPosition);
  bomb.addBomb();
  bomb.move();
}

// Game Over Function
function gameOver() {
  alert("Game Over! You were hit by an alien!");
}

// Win Game Function
function winGame() {
  if (activeAliens.length === 0) {
    alert("Congrats! You have destroyed all aliens and saved Earth!");
  }
}

// ! Events
document.addEventListener("keyup", handleMovement);

// ! Page Load
createBoard();
