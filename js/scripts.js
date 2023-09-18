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
let aliens = []
const alienPosition = 1;

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
      }
    }, 500); // Adjust the interval as per your preference
  }

  addMissile() {
    cells[this.position].classList.add("missile");
  }

  removeMissile() {
    cells[this.position].classList.remove("missile");
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
    // Add newly created cell to cells arrya
    cells.push(cell);
  }
  // Add cat character class to starting position
  addShip(startingPosition);
  addAlien(alienPosition);
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
      aliens.push(i)
    }
  }
}

// Moving Alien

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

  // Add cat class once currentPosition has been updated
  addShip(currentPosition);
}

// ! Events
document.addEventListener("keyup", handleMovement);

// ! Page Load
createBoard();

console.log(aliens);