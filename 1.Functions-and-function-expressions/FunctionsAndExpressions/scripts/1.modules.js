window.onload = function () {
    "use strict";

    var domModule = function () {
        var self,
            selectorBuffer, //We need separate array, because the selector may contain spaces, which will lead to problems
            elementBuffer;

        function appendChild(element, parent) {
            var parentElement = document.querySelector(parent);

            parentElement.appendChild(element);
        };

        function removeChild(parent, child) {
            var parentElement = document.querySelector(parent),
                // we have to ensure that it is the correct child element
                childElement = document.querySelector(parent + ' ' + child);

            parentElement.removeChild(childElement);
        };

        function addHandler(selector, eventType, eventHandler) {
            var elements = document.querySelectorAll(selector),
                element,
                currentElement;

            for (element in elements) {
                currentElement = elements[element];

                if (currentElement.nodeName) {
                    currentElement.addEventListener(eventType, eventHandler);
                }
            }
        };

        function appendToBuffer(container, element) {
            var currentElement,
                currentSelector,
                i,
                l;

            if (!elementBuffer || !selectorBuffer) {
                elementBuffer = [];
                selectorBuffer = [];
            }

            selectorBuffer.push(container);
            elementBuffer.push(element);

            if (selectorBuffer.length >= 100) {
                for (i = 0, l = selectorBuffer.length; i < l; i += 1) {
                    currentSelector = selectorBuffer[i];
                    currentElement = elementBuffer[i];

                    document.querySelector(currentSelector).appendChild(currentElement);
                }

                elementBuffer = [];
                selectorBuffer = [];
            }
        };

        self = {
            appendChild: appendChild,
            removeChild: removeChild,
            appendToBuffer: appendToBuffer,
            addHandler: addHandler
        };

        return self;
    }();

    var strong = document.createElement('strong');
    strong.innerHTML = 'This is strong';

    domModule.appendChild(strong, 'div');
    domModule.removeChild('div', 'p');
    // Click on the first strong to see if it works
    domModule.addHandler('strong', 'click', function () {
        alert('Clicked!');
    });

    for (var i = 0; i < 100; i++) {
        domModule.appendToBuffer('div', strong.cloneNode(true));
    }
}