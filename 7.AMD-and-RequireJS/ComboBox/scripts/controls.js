/// <reference path="references.js" />

define(['handlebars', 'jquery'], function () {
    var ComboBox = function (people) {
        function render(template) {
            var $container = $('<div/>'),
                $selected = $('#selected'),
                templ = Handlebars.compile(template),
                firstTemplateChild = $(templ(people[0])).children();

            $selected.append(firstTemplateChild);
            setStyles($selected);

            for (var i = 0; i < people.length; i++) {
                $container.append(templ(people[i]));
            }

            var $persons = $container.find('.person-item')
                .on('mouseover', onPersonMouseover)
                .on('mouseout', onPersonMouseout);

            setStyles($persons);

            $container.hide();

            $selected.on('click', onSelectedClick);
            $persons.on('click', onPersonClick);

            function setStyles($element) {
                $element.css('width', '100px')
                        .css('border', '3px solid red')
                        .css('textAlign', 'center');

                return $element;
            };

            function onSelectedClick() {
                $container.slideDown();
            }

            function onPersonClick() {
                var $this = $(this);
                $selected.html($this.html());
                $container.slideUp();
            }

            function onPersonMouseover() {
                $this = $(this);
                $this.css('backgroundColor', 'pink');
            }

            function onPersonMouseout() {
                $this = $(this);
                $this.css('backgroundColor', '#fff');
            }

            return $container;
        }

        return { render: render };
    }

    return { ComboBox: ComboBox };
});