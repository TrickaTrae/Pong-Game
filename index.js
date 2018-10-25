const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// initializing a starting point for my ball
let x = canvas.width / 2;
let y = canvas.height - 60;
// making the ball move
let moveX = 2;
let moveY = -2;

const ballRadius = 10;

// initializing the paddle
const paddleHeight = 15;
const paddleWidth = 115;
let paddleX = (canvas.width - paddleWidth) / 2;

// making the paddle move;
let rightPressed = false;
let leftPressed = false;

// bricks
const brickRowCount = 4;
const brickColumnCount = 8;
const brickWidth = 120;
const brickHeight = 28;
const brickPadding = 12;
const brickOffsetTop = 40;
const brickOffsetLeft = 29;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  // loops through the rows and columns to create new bricks
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

// function that draws my ball
function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "blue";
  context.fill();
  context.closePath();
}

// function that draws my paddle
function drawPaddle() {
  context.beginPath();
  context.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
  context.fillStyle = "blue";
  context.fill();
  context.closePath();
}

// function that draws my bricks
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    // looping through rows and columns to set the x and y position of each brick
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft; //changing the location of the bricks so they dont
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop; //all spawn in the same location
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = "purple";
        context.fill();
        context.closePath();
      }
    }
  }
}

// checking if ball hits brick, change direction
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          moveY = -moveY;
          b.status = 0;
        }
      }
    }
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if (x + moveX > canvas.width - ballRadius || x + moveX < ballRadius) {
    // checking if ball hits right and left wall, reverse direction
    moveX = -moveX;
  }

  if (y + moveY < ballRadius) {
    // checking if ball hits top
    moveY = -moveY;
  } else if (y + moveY == canvas.height - ballRadius) {
    // checking if the ball hits the bottom of the canvas
    if (x > paddleX && x < paddleX + paddleWidth) {
      // checking if the ball hits the paddle
      moveY = -moveY;
    } else {
      alert("GAME OVER");
      document.location.reload();
    }
  }

  if (rightPressed && paddleX <= canvas.width - paddleWidth) {
    paddleX += 8;
  }
  if (leftPressed && paddleX >= 0) {
    paddleX -= 8;
  }

  x += moveX;
  y += moveY; //making the ball move
}
setInterval(draw, 8);
