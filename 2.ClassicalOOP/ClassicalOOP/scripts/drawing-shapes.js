window.onload = function () {
    'use strict';

    var drawShape,
        canvas,
        ctx,
        rect,
        circle,
        line;

    drawShape = (function () {
        var Shape,
            Rect,
            Circle,
            Line,
            rect,
            circle,
            line;

        //// This way is with Inheritance!!! Here we don't have big benefit!
        //Shape = (function () {
        //    function Shape(x, y, context) {
        //        this._x = x;
        //        this._y = y;
        //        this._context = context;
        //    }

        //    Shape.prototype = {
        //        draw: function () {}
        //    }

        //    return Shape;
        //}());

        //Rect = (function () {
        //    function Rect(x, y, width, height, context) {
        //        Shape.call(this, x, y, context);
        //        this._width = width;
        //        this._height = height;
        //    }

        //    Rect.prototype = new Shape();

        //    Rect.prototype.draw = function () {
        //        this._context.strokeRect(this._x, this._y, this._width, this._height);
        //    }

        //    return Rect;
        //}());

        //Circle = (function () {
        //    function Circle(x, y, radius, context) {
        //        Shape.call(this, x, y, context);
        //        this._radius = radius;
        //    }

        //    Circle.prototype = new Shape();

        //    Circle.prototype.draw = function () {
        //        this._context.beginPath();
        //        this._context.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
        //        this._context.stroke();
        //    }

        //    return Circle;
        //}());

        //Line = (function () {
        //    function Line(x1, y1, x2, y2, context) {
        //        Shape.call(this, x1, y1, context);
        //        this._x2 = x2;
        //        this._y2 = y2;
        //    }

        //    Line.prototype = new Shape();

        //    Line.prototype.draw = function () {
        //        this._context.moveTo(this._x, this._y);
        //        this._context.lineTo(this._x2, this._y2);
        //        this._context.stroke();
        //    }

        //    return Line;
        //}());

        //return {
        //    Shape: Shape,
        //    Rect: Rect,
        //    Circle: Circle,
        //    Line: Line
        //}

        rect = function (x, y, width, height, context) {
            context.strokeRect(x, y, width, height);
        }

        circle = function (x, y, radius, context) {
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI, true);
            context.stroke();
        }

        line = function (x1, y1, x2, y2, context) {
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
        }

        return {
            rect: rect,
            circle: circle,
            line: line
        }
    }());

    // I looked at some other homeworks, 
    // but I don't think that it is good idea to get the canvas from in the module
    // it is better to give it as a parameter
    canvas = document.getElementById('container');
    ctx = canvas.getContext('2d');

    //// Inheritance way!!!
    //rect = new drawShape.Rect(100, 100, 100, 200, ctx);
    //rect.draw();
    //circle = new drawShape.Circle(100, 100, 100, ctx);
    //circle.draw();
    //line = new drawShape.Line(30, 30, 200, 200, ctx);
    //line.draw();

    drawShape.rect(100, 100, 100, 200, ctx);
    drawShape.circle(100, 100, 50, ctx);
    drawShape.line(50, 50, 150, 150, ctx);
};