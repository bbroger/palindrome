'use strict';
angular.module('app.directives.editInLine', [])
    .directive('editInLine', function ($compile) {
        var exports = {};

        function link(scope, element, attrs) {
            var template = '<div class="in-line-container">';
            var newElement;
            var displayValue;
            var options;

            // This is a switch as we may, in the future, want to handle different types of inline edits (e.g. select boxes, number boxes etc.)
            switch (attrs.editType) {
                default:
                    template += '<div class="in-line-value" ng-hide="editing">{{value}}</div>';
                    template += '<input class="in-line-input form-control" ng-show="editing" type="text" ng-model="value" />';
            }

            //close the outer div
            template += '</div>';
            newElement = $compile(template)(scope);
            element.replaceWith(newElement);

            scope.$on('$destroy', function () {
                newElement = undefined;
                element = undefined;
            });
        }

        exports.scope = {
            value: '=',
            editing: '=',
            editList: '=',
            displayValue: '='
        };
        exports.restrict = 'E'; //match element name only (e.g. <edit-in-line>)
        exports.link = link;

        return exports;
    });