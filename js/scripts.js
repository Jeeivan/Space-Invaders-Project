
// ! Variables and elements
// ? Add SpaceShip
// ? Add Alien
// Board


const board = document.getElementById('board')
const ctx = board.getContext('2d')


board.width = 600
board.height = 600


// Spaceship

class Ship {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        const img = new Image()
        img.src = './img/spaceship.png'
        img.onload = () => {
            this.image = img
            this.width = 50
            this.height = 50
            this.position = {
                x: board.width / 2 - this.width / 2,
                y: board.height - 100
            }
    
        }
        
    }

    draw() {
        if (this.image)
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    move() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x

            if (this.position.x < 0) {
                this.position.x = 0;
            } else if (this.position.x > board.width - this.width) {
                this.position.x = board.width - this.width
            }
        }
    }
}

const ship = new Ship()
ship.draw()


// ! Functions
function animate() {
    requestAnimationFrame(animate)
    ship.draw()
    ship.move()
}

animate()

function handleMovement(event) {
    const key = event.keyCode

    const left = 37
    const aLeft = 65
    const right = 39
    const dRight = 68

    if (key === left || key === aLeft) {
        console.log('Left')
        ship.velocity.x = -1.5
    } else if (key === right || key === dRight) {
        console.log('Right')
        ship.velocity.x = +1.5
    } else {
        console.log('INVALID KEY')
    }
}

// ! Events
document.addEventListener('keyup', handleMovement)

// ! Page Load