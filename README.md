# SEI Unit 1 Project ReadMe

## Project Description

Following week 2 after beginning the SEI course at general assembly we were given the choice of different games to create as part of our week 3 project week. I decided to choose Space Invaders as this was a childhood favourite of mine. The aim of this project was to use all the fundamentals we had learned in HTML, CSS and JavaScript and apply these to create a game with a functioning win/lose mechanic.

## Table of Contents

- [Deployment Link](#deployment-link)
- [Technologies Used](#technologies-used)
- [Brief](#brief)
- [Planning](#planning)
- [Build Process](#build-process)
- [Challenges](#challenges)
- [Wins](#wins)
- [Key Learnings/Takeaways](#key-learningstakeaways)
- [Bugs](#bugs)
- [Future Improvements](#future-improvements)

## Deployment Link

(https://jeeivan.github.io/Space-Invaders-Project/)

## I was given a full week to work on this project and I worked independently to do this with the help of our instructors if I was facing any difficulties. 

## Technologies Used

Front End- CSS, HTML
Back End- Vanilla JavaScript ES6

## Brief

Game Objective:

Shoot an invading alien armada before it reaches the planet's surface using a mounted gun turret.
Player Controls:

Move the player left or right.
Shoot at the aliens and avoid their bombs.
Game Flow:

Aliens move from left to right and descend when reaching screen edges.
Periodic alien bomb drops towards the player.
Player progresses by clearing waves of aliens, restarting the game after each wave.
Scoring:

Display the player's score at the end of the game.
Aim to achieve the highest score possible before losing to aliens or letting them reach the planet's surface.

Requirements:

Enable the player to clear at least one wave of aliens.
Display the player's score at the end of the game.

## Planning

[Screenshot of plan using excalidraw]

Have barriers that aliens and spaceship cannot go past
When 0 aliens are left then it will go to the next level
Have the image of spaceship change for each level and with each level the spaceship bullet travels faster
Aliens will all be the same image and size
Grid will have individual squares ?10x10
Each spaceship/alien can move on grid square at a time
Grid will be divided into 100 squares
Top 10 will be for Header- that will contain level/scores
Bottom 20 will be for spaceship
Rest of grid will be for the aliens
Each alien will take up 1 cells
The spaceship will take up 2 cells
The line for alien bullet/spaceship bullet will be different colour/images to differentiate

Bullets-
Alien bullets will be fired randomly from any alive alien every ~2 seconds, this will be quicker as user goes up each level;
A shot will be a hit if the bullet hits a square that the  alien/spaceship if occupying
Spaceship bullets can only be fired by user pressing space key, there will be a delay of ~1 second per shot

Ship-
Ship will be a JS object that has the x,y coordinates and also their width and height

Alien-
Have an array for aliens
Have variables for:
Width, height, X axis, Y axis, no. of alien for each row and column, an alien count

Have a function to move the ship
Use an event listener to move the ship using key down
Use event listener to fire bullet
Have a function to create aliens
Have an if statement for alien touching borders to have them start moving in another direction and as they change direction they start moving down
Have a restart function that resets the game
Have this only appear once the lose game is lost

## Build Process

**Setting up the board**

The game board is created using a grid layout with specified dimensions (width and height). The grid cells are represented using an array called ‘cells’, and the spaceship's starting position is set.

```
const board = document.querySelector(".board");
const width = 11;
const height = 10;
const cellCount = width * height;
let cells = [];
let score = 0;
```

To initialize the game board, the ‘createBoard’ function is employed, which utilizes the cell count to dynamically create grid cells and set up the initial game state.

```
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
```

**Moving Aliens on the Game Board**

The movement of aliens on the game board is achieved by the ‘moveAliens’ function. It considers the edges of the grid, determines the direction of movement, updates the alien positions, and visually reflects these changes by calling the ‘addAlien’ function.

```
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
```

**Handling Spaceship Movement**

Spaceship movement is controlled by the ‘handleMovement’ function, responding to key events for left and right movements. It removes the spaceship from its previous position, updates the current position based on the key pressed, and adds the spaceship class to the new position.

```
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
```

**Game Over and Win Conditions**

The game includes well-defined conditions for game over and winning. The ‘gameOver function’ is triggered when the player loses all lives, while the ‘winGame’ function is called when either all aliens are destroyed or a specific score is reached.

```
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
```

## Challenges

One of the project's main hurdles emerged when I initially chose to use canvas, inspired by visually appealing games. Researching its implementation, I managed to set up a canvas with a ship and one alien, achieving smooth lateral movement.

However, adding more aliens in specific places proved unexpectedly complex, highlighting my limited canvas experience. After consulting with an instructor, we agreed it would be challenging to proceed with canvas. Opting to start afresh with grid on the project's first day, I efficiently caught up by the next day.

## Wins

- I was extremely happy with solving bugs in my game that were happening after I wanted the game to be won or lost
- I was able to solve these issues through creating a variable for the game being complete and using control flow so that functions of the game would no longer run once the game was complete
[Insert code here]

## Key Learnings/Takeaways

- I feel much more confident in my skills of using the DOM and adding event listeners
- I feel more comfortable in using JavaScript and being able to find bugs and be able to go through my code to fix them
- I am now much more comfortable when delivering my standups and having a plan of what I am going to be doing with my day


## Bugs

- One of the bugs I encountered is that sometimes when missiles are being fired it would hit the middle row of aliens first rather than the bottom row
- Another bug I encountered is that as the waves increase from 2 to 3 the speed of the aliens and bombs increased even further than the set amount, which should have stayed the same


## Future Improvements

- I would have aimed to add more emphasis in the planning stage and implement more pseudo code for future projects
- I would have used this approach when building my projects, prioritizing understanding the logic of what I was meant to do before writing the actual code


