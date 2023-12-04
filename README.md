# SEI Unit 1 Project ReadMe

## Project Description

Following week 2 after beginning the SEI course at general assembly we were given the choice of different games to create as part of our week 3 project week. I decided to choose Space Invaders as this was a childhood favourite of mine. The aim of this project was to use all the fundamentals we had learned in HTML, CSS and JavaScript and apply these to create a game with a functioning win/lose mechanic.

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


