
// ! Variables and elements
// ? Add SpaceShip
// ? Add Alien
// Board
let rows = 16
let columns = 16
let tile = 32

const board = document.getElementById('board')
const ctx = board.getContext('2d')
let boardWidth = tile * columns
let boardHeight = tile * rows

// Spaceship
let shipHeight = tile
let shipWidth = tile * 2
let shipY = tile * rows
let shipX = tile * columns/2

let ship = {
    width : shipWidth,
    height : shipHeight,
    y : shipY,
    x : shipX
}

// ! Functions

// ! Events

// ! Page Load