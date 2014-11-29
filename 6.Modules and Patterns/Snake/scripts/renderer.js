/// <reference path="_references.js" />

var renderer = (function () {
    'use strict';

    var canv,
        ctx;

    function Renderer(canvas) {
        canv = canvas;
        ctx = canvas.getContext('2d');
    };

    var drawSnakePart = function (part) {
        var x = part.getPosition().x,
            y = part.getPosition().y,
            size = part.getSize();

        ctx.strokeStyle = 'red';
        ctx.strokeRect(x, y, size, size);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x, y, size, size);
    };

    var drawSnake = function (snake) {
        for (var i = 0; i < snake.parts.length; i++) {
            drawSnakePart(snake.parts[i]);
        }
    };

    var drawFood = function (food) {
        var x = food.getPosition().x,
            y = food.getPosition().y,
            size = food.getSize();

        ctx.fillStyle = 'green';
        ctx.fillRect(x, y, size, size);
    };

    Renderer.prototype = {
        draw: function (obj) {
            if (obj instanceof snakes.SnakePartType) {
                drawSnakePart(obj);
            } else if (obj instanceof snakes.SnakeType) {
                drawSnake(obj);
            } else if (obj instanceof snakes.FoodType) {
                drawFood(obj);
            }
        },
        clear: function () {
            ctx.clearRect(0, 0, canv.width, canv.height);
        },
        getDimensions: function () {
            return {
                minX: 0,
                maxX: canv.width,
                minY: 0,
                maxY: canv.height
            }
        },
        showScore: function (text, x, y) {
            ctx.font = "35px Verdana";
            // Create gradient
            var gradient = ctx.createLinearGradient(0, 0, canv.width, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // Fill with gradient
            ctx.fillStyle = gradient;
            ctx.fillText(text, x, y);
        }
    };

    return {
        getRenderer: function (canvas) {
            return new Renderer(canvas);
        }
    };
}());
