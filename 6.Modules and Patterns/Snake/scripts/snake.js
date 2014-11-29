/// <reference path="_references.js" />

var snakes = (function () {
    'use strict';

    var PartSize = 10,
        directions = [{
            // Left
            dx: -1,
            dy: 0
        }, {
            // Up
            dx: 0,
            dy: -1
        }, {
            // Right
            dx: +1,
            dy: 0
        }, {
            // Down
            dx: 0,
            dy: +1
        }];

    function GameObject(x, y) {
        this.x = x;
        this.y = y;
        this.size = PartSize;
    };

    GameObject.prototype = {
        getPosition: function () {
            return {
                x: this.x,
                y: this.y
            };
        },
        getSize: function () {
            return this.size
        }
    };

    function SnakePart(x, y) {
        GameObject.call(this, x, y);
    };

    SnakePart.prototype = new GameObject();
    SnakePart.prototype.constructor = SnakePart;

    SnakePart.prototype.changePosition = function (x, y) {
        this.x = x;
        this.y = y;
    };

    function SnakeHead(x, y) {
        SnakePart.call(this, x, y);
    };

    SnakeHead.prototype = new SnakePart();
    SnakePart.prototype.constructor = SnakeHead;

    function Snake(x, y, size) {
        var part,
            partX,
            partY,
            i;

        this.parts = [];
        this.direction = 2;

        for (i = 0; i < size; i++) {
            partX = x - i * PartSize;
            partY = y;
            part = new SnakePart(partX, partY);
            this.parts.push(part);
        }
    };

    Snake.prototype = new GameObject();
    Snake.prototype.constructor = Snake;

    Snake.prototype.head = function () {
        return this.parts[0];
    };

    Snake.prototype.move = function () {
        var curPart,
            position,
            head,
            headPosition,
            newHeadPosition,
            dx,
            dy;

        for (var i = this.parts.length - 1; i >= 1; i--) {
            curPart = this.parts[i];
            position = this.parts[i - 1].getPosition();
            curPart.changePosition(position.x, position.y);
        }

        head = this.head();
        headPosition = head.getPosition();

        dx = directions[this.direction].dx;
        dy = directions[this.direction].dy;

        newHeadPosition = {
            x: headPosition.x + dx * PartSize,
            y: headPosition.y + dy * PartSize
        };

        head.changePosition(newHeadPosition.x, newHeadPosition.y);
    };

    Snake.prototype.changeDirection = function (newDirection) {
        if (0 <= newDirection && newDirection < directions.length && (this.direction + newDirection) % 2) {
            this.direction = newDirection;
        }
    };

    Snake.prototype.getPosition = function () {
        return this.head().getPosition();
    };

    function Food(x, y) {
        GameObject.call(this, x, y);
    };

    Food.prototype = new GameObject();
    Food.prototype.constructor = Food;

    return {
        get: function (x, y, size) {
            return new Snake(x, y, size);
        },
        getFood: function (x, y, size) {
            return new Food(x, y, size);
        },
        SnakePartType: SnakePart,
        SnakeType: Snake,
        FoodType: Food
    };
}());