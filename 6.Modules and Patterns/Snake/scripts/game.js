/// <reference path="_references.js" />

function GameEngine() {
    'use strict';
    var game,
        canvas,
        snake,
        render,
        minX,
        maxX,
        minY,
        maxY,
        food,
        score;

    function generateFood(foodCount) {
        var randCoords,
            apple,
            i;

        for (i = 0; i < foodCount; i++) {
            randCoords = getRandomCoord();
            apple = new snakes.getFood(randCoords.x, randCoords.y);
            food.push(apple);
        }
    };

    function drawFood(foods) {
        var curFood,
            i,
            l;

        for (i = 0, l = foods.length; i < l; i++) {
            curFood = foods[i];
            render.draw(curFood);
        }
    };

    function getRandomCoord() {
        var x = ((Math.random() * 10) | 0) * maxX / 10;
        var y = ((Math.random() * 10) | 0) * maxY / 10;

        return {
            x: x,
            y: y
        };
    };

    function initializeVariables() {
        snake = new snakes.get(250, 250, 5);
        canvas = document.querySelector('#the-snake-canvas');
        render = renderer.getRenderer(canvas);
        minX = render.getDimensions().minX;
        maxX = render.getDimensions().maxX;
        minY = render.getDimensions().minY;
        maxY = render.getDimensions().maxY;
        food = [];
        score = 0;
    }

    function isGameOver(snakePosition) {
        var isGameOver = false;

        if (snakePosition.x >= maxX ||
            snakePosition.x <= minX - 1 ||
            snakePosition.y >= maxY ||
            snakePosition.y <= minY - 1) {
            isGameOver = true;
        }

        return isGameOver;
    };

    function isFoodEaten(snakePosition) {
        var isFoodEaten = false,
            curFood,
            i,
            l;

        for (i = 0, l = food.length; i < l; i++) {
            curFood = food[i];

            if (snakePosition.x === curFood.x && snakePosition.y === curFood.y) {
                food.splice(i, 1);
                isFoodEaten = true;

                return isFoodEaten;
            }
        }
    };

    function start() {
        var snakePosition = snake.getPosition();

        if (food.length === 0) {
            generateFood(3);
        }

        render.clear();
        drawFood(food);
        snake.move();

        if (isFoodEaten(snakePosition)) {
            score += 1;
        }

        if (isGameOver(snakePosition)) {
            clearInterval(game);
            render.showScore('Score: ' + score, 50, 50);
        }

        render.draw(snake);

        document.body.addEventListener('keydown', function (ev) {
            var keyCode = ev.keyCode;

            if (37 <= keyCode && keyCode <= 40) {
                snake.changeDirection(keyCode - 37);
            }
        });
    };

    function startGame() {
        clearInterval(game);
        initializeVariables();
        game = setInterval(start, 200);
    };

    function stopGame() {
        clearInterval(game);
    };

    return {
        startGame: startGame,
        stopGame: stopGame
    };
};