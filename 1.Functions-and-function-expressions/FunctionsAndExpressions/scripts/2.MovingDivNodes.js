window.onload = function () {
    'use strict';

    var movingShapes = function () {
        var self,
            div = document.createElement('div'),
            divs,
            WINDOW_WIDTH = window.innerWidth / 2,
            WINDOW_HEIGHT = window.innerHeight / 1.3,
            CENTER = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2 - 30
            },
            direction = {
                left: 'left',
                right: 'right',
                up: 'up',
                down: 'down'
            },
            SPEED = 10,
            ROTATION_SPEED = 0.1,
            RADIUS = 200;
        

        div.style.width = '50px';
        div.style.height = '50px';

        function addDiv(shape) {
            var curDiv = div.cloneNode(true);
            setRandomStyles(curDiv);

            if (shape === 'rect') {
                addRectangularMovementDiv(curDiv);
            }
            else if (shape === 'ellipse') {
                addCircularMovementDiv(curDiv);
            }
        };

        function addRectangularMovementDiv(element) {
            if (!divs) {
                divs = [];
            }

            element['rect'] = true;
            element['direction'] = direction.right;
            divs.push(element);

            document.body.appendChild(element);
        };

        function addCircularMovementDiv(element) {
            if (!divs) {
                divs = [];
            }
            element.style.borderRadius = '50px';
            element.style.left = CENTER.x + 'px';
            element.style.top = CENTER.y + 'px';
            element['circle'] = true;
            element['angle'] = 10;
            divs.push(element);

            document.body.appendChild(element);
        };

        function moveElements() {
            var i,
                curDiv;

            for (i = 0; i < divs.length; i++) {
                curDiv = divs[i];
                if (curDiv.rect) {
                    moveInRect(curDiv);

                }
                else if (curDiv.circle) {
                    moveInCircle(curDiv);
                }
            }
        };

        function moveInRect(element) {
            switch (element.direction) {
                case direction.right: moveRight(element); break;
                case direction.down: moveDown(element); break;
                case direction.left: moveLeft(element); break;
                case direction.up: moveUp(element); break;
            }
        }

        function moveInCircle(element) {
            var cos = Math.cos(element.angle),
                sin = Math.sin(element.angle),
                left = (CENTER.x + RADIUS * cos) + 'px',
                top = (CENTER.y + RADIUS * sin) + 'px';

            element.style.left = left;
            element.style.top = top;
            element.angle += ROTATION_SPEED;
        }

        function moveRight(element) {
            var curElementPosition = element.getBoundingClientRect();

            element.style.left = curElementPosition.left + SPEED + 'px';

            if (curElementPosition.right >= WINDOW_WIDTH) {
                changeDirection(element);
            }
        };

        function moveDown(element) {
            var curElementPosition = element.getBoundingClientRect();

            element.style.top = curElementPosition.top + SPEED + 'px';

            if (curElementPosition.bottom >= WINDOW_HEIGHT) {
                changeDirection(element);
            }
        };

        function moveLeft(element) {
            var curElementPosition = element.getBoundingClientRect();

            element.style.left = curElementPosition.left - SPEED + 'px';

            if (curElementPosition.left <= 50) {
                changeDirection(element);
            }
        };

        function moveUp(element) {
            var curElementPosition = element.getBoundingClientRect();

            element.style.top = curElementPosition.top - SPEED + 'px';

            if (curElementPosition.top <= 50) {
                changeDirection(element);
            }
        };

        function changeDirection(element) {
            switch (element.direction) {
                case direction.right: element.direction = direction.down; break;
                case direction.down: element.direction = direction.left; break;
                case direction.left: element.direction = direction.up; break;
                case direction.up: element.direction = direction.right; break;
            }
        };

        function setRandomStyles(element) {
            element.style.position = 'absolute';
            element.style.backgroundColor = getRandomColor();
            element.style.font = getRandomColor();
            element.style.border = '10px' + ' solid ' + getRandomColor();
        };

        function getRandomNumber(min, max) {
            var randomNumber = Math.random() * (max - min) + min | 0;

            return randomNumber;
        };

        function getRandomColor() {
            var randomColor = 'rgb(' + getRandomNumber(0, 255) + ',' + getRandomNumber(0, 255) + ',' + getRandomNumber(0, 255) + ')';

            return randomColor;
        };

        self = {
            add: addDiv,
            move: moveElements
        }

        return self;
    }();

    movingShapes.add('rect');
    window.setInterval(movingShapes.move, 50);
    movingShapes.move();

    document.getElementById('rect').addEventListener('click', function () {
        movingShapes.add('rect');
    })

    document.getElementById('circle').addEventListener('click', function () {
        movingShapes.add('ellipse');
    })
};