window.onload = function () {
    'use strict';

    var specialConsole = function () {
        var message;

        function writeFormatLine(args) {
            var i,
                l,
                find,
                format,
                message = args[0].toString(),
                curString,
                curIndex;

            for (i = 1, l = args.length; i < l; i++) {
                curIndex = i - 1;
                find = '\\{' + curIndex + '\\}';
                // This 'g' means to replace all matching substrings
                format = new RegExp(find, 'g');
                curString = args[i].toString();

                message = message.replace(format, curString);
            }

            return message;
        };

        function writeLine() {
            // 'arguments' is build in JS
            if (arguments.length === 1) {
                message = arguments[0].toString();
                console.log(message);
            }
            else if (arguments.length > 1) {
                message = writeFormatLine(arguments);
                console.log(message);
            }
        };

        function writeError() {
            // 'arguments' is build in JS
            if (arguments.length === 1) {
                message = arguments[0].toString();
                console.error(message);
            }
            else if (arguments.length > 1) {
                message = writeFormatLine(arguments);
                console.error(message);
            }
        };

        function writeWarning() {
            // 'arguments' is build in JS
            if (arguments.length === 1) {
                message = arguments[0].toString();
                console.warn(message);
            }
            else if (arguments.length > 1) {
                message = writeFormatLine(arguments);
                console.warn(message);
            }
        };

        return {
            writeLine: writeLine,
            writeError: writeError,
            writeWarning: writeWarning
        }
    }();

    specialConsole.writeLine('Message: {0} {1} {2}', 'Hello,', 'I am', 'Pesho ;)');
    specialConsole.writeError('Message: {0} {1} {2}', 'Hello,', 'I am', 'Gosho ;)');
    specialConsole.writeWarning('Message: {0} {1} {2}', 'Hello,', 'I am', 'Mariika ;)');
};