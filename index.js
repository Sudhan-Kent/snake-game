const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const restartButton = document.getElementById('restart')
const finishButton = document.getElementById('finish')
const onceAgain = document.getElementById('startAgain')
const instButton = document.getElementById('inst-button')
const goBack = document.getElementById('go-back')
const score = document.getElementById('score')
const lost = document.querySelector('#overlay1')
const thanking = document.querySelector('#overlay2')
const instruction = document.querySelector('#inst-overlay')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let playerScore = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function startGame(){
    timerId = setInterval(move, intervalTime)
}

function restartGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    playerScore = 0
    //re add new score to browser
    score.textContent = playerScore
    direction = 1
    intervalTime = 1000
    generateApple()
    //readd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
    lost.style.display = "none"
    thanking.style.display = "none"

}


function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < width*width; i++) {
     //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        lost.style.display = "block"
        return clearInterval(timerId)
    }

    
    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it
    
    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        console.log(currentSnake)
        //grow our snake array
        
        //generate new apple
        generateApple()
        //add one to the score
        playerScore ++
        //display our score
        score.textContent = playerScore
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    }
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', restartGame)
onceAgain.addEventListener('click', restartGame)
finishButton.addEventListener('click', function() {
    lost.style.display = "none"
    thanking.style.display = "block"
})
instButton.addEventListener('click', function() {
    instruction.style.display = "block"  
})
goBack.addEventListener('click', function() {
    instruction.style.display = "none"  
})