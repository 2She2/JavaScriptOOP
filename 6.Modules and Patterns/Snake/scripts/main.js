/// <reference path="_references.js" />

(function () {
    'use strict';
    var start = document.getElementById('start-button'),
        stop = document.getElementById('stop-button'),
        game = new GameEngine();

    start.addEventListener('click', game.startGame);
    stop.addEventListener('click', game.stopGame);
}());