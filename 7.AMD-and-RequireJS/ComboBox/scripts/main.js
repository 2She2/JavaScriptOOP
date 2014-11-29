/// <reference path="references.js" />

(function () {
    'use strict';

    require.config({
        paths: {
            'jquery': 'libs/jquery-2.1.1',
            'handlebars': 'libs/handlebars-v1.3.0',
            'data': 'data',
            'controls': 'controls'
        }
    });

    require(['data', 'controls', 'jquery'], function (data, controls, $) {
        var people = data,
            comboBox = controls.ComboBox(people),
            template = $("#post-template").html(),
            comboBoxHtml = comboBox.render(template);

        $('#list').append(comboBoxHtml);
    });
}());