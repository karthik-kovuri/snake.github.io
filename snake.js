const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const snake = [{ x: 200, y: 200 }];
const food = { x: 0, y: 0 };
let dx = 0;
let dy = 0;
let score = 0;
let gameInterval;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
    food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
    snake.forEach(segment => {
        if (food.x === segment.x && food.y === segment.y) {
            generateFood();
        }
    });
}

function checkCollision() {
    if (
        snake[0].x < 0 || snake[0].x >= canvas.width ||
        snake[0].y < 0 || snake[0].y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
    ) {
        clearInterval(gameInterval);
        alert("Game Over!");
    }
}

function gameLoop() {
    moveSnake();
    checkCollision();
    draw();
}

generateFood();

document.addEventListener("keydown", event => {
    const key = event.keyCode;
    if (key === 37 && dx !== box) { // Left arrow
        dx = -box;
        dy = 0;
    } else if (key === 38 && dy !== box) { // Up arrow
        dx = 0;
        dy = -box;
    } else if (key === 39 && dx !== -box) { // Right arrow
        dx = box;
        dy = 0;
    } else if (key === 40 && dy !== -box) { // Down arrow
        dx = 0;
        dy = box;
    }
});

document.getElementById("startButton").addEventListener("click", () => {
    if (!gameInterval) {
        gameInterval = setInterval(gameLoop, 100);
    }
});

document.getElementById("pauseButton").addEventListener("click", () => {
    clearInterval(gameInterval);
    gameInterval = null;
});

document.getElementById("stopButton").addEventListener("click", () => {
    clearInterval(gameInterval);
    gameInterval = null;
    snake.length = 1;
    snake[0] = { x: 200, y: 200 };
    score = 0;
    dx = 0;
    dy = 0;
    generateFood();
    draw();
});


