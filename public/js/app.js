'use strict';
var app = angular.module('app', ['ngRoute', 'ngResource']);

var isPalindrome = function (text) {

    if (!text) {
        return false;
    }

    text = text.replace(/[^\w]/g, ""); //remove all characters except a-z
    text = text.toLowerCase();
    if (text.length === 0)
    {
        return false;
    }

    return text == text.split('').reverse().join('');
};

app.config(['$routeProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/messages', {
            templateUrl: 'messages.html',
            controller: 'MessagesCtrl'
        })
        .when('/messages/:messageId', {
            templateUrl: 'message.html',
            controller: 'MessageCtrl'
        })
        .when('/new-message/', {
            templateUrl: 'add.html',
            controller: 'MessageCtrl'
        })
        .when('/palindromes', {
            templateUrl: 'messages.html',
            controller: 'MessagesCtrl'
        })
        .when('/non-palindromes', {
            templateUrl: 'messages.html',
            controller: 'MessagesCtrl'
        })
        .otherwise({
            redirectTo: '/messages'
        });
}]);

app.factory('MessageService', ['$resource', function ($resource) {
    return $resource('/messages/:messageId', {}, {
        update: {
            method: 'PUT'
        },
        add: {
            method: 'POST'
        }
    });
}]);

app.controller('MessagesCtrl', ['$scope', 'MessageService', function ($scope, service) {
    service.query(function (data, headers) {
        $scope.messages = data;
    }, _handleError);

    $scope.isPalindrome = isPalindrome;
}]);

app.controller('MessageCtrl', ['$scope', '$routeParams', 'MessageService', '$route', '$location', function ($scope, $routeParams, service, $route, $location) {
    // if we have a messageId, we are modifying
    if ($routeParams.messageId) {
        service.get({
            messageId: $routeParams.messageId
        }, function (data, headers) {
            $scope.message = data;
        }, _handleError);

        $scope.editing = false;

        $scope.edit = function () {
            $scope.editing = !$scope.editing;
        };

        $scope.save = function () {

            service.update({
                messageId: $routeParams.messageId
            }, $scope.message, function () {
                $scope.editing = !$scope.editing;
            });
        };

        $scope.cancel = function () {
            $route.reload();
        };

        $scope.delete = function () {
            service.delete({
                messageId: $routeParams.messageId
            }, function (data, headers) {
                $scope.message = data;
            }, _handleError);

            $location.path("/messages/");
        };
    }
    else { // no messageId = adding
        $scope.add = function () {
            if ($scope.message && $scope.message.text) {
                var newMessage = {
                    text: $scope.message.text,
                    isPalindrome: isPalindrome($scope.message.text)
                };
                service.add(newMessage, function (data) {
                    if (data) {
                        $location.path("/messages/" + data.id); //redirect to newly created item
                    }
                });
            }
        };
        $scope.addDisabled = function () {
            return !($scope.message && $scope.message.text && $scope.message.text.trim().length);
        };
    }

    $scope.isPalindrome = isPalindrome;
}]);

/* Create a directive to enable editing of messages in line */
app.directive('editInLine', function ($compile) {
    var exports = {};

    function link(scope, element, attrs) {
        var template = '<div class="in-line-container">';
        var newElement;
        var displayValue;
        var options;

        /* This is a switch as we may, in the future, want to handle different types of inline edits (e.g. select boxes, number boxes etc.)*/
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
    exports.restrict = 'E'; //LC TODO review this whole section...
    exports.link = link;

    return exports;
});

function _handleError(response) {
    // TODO: Do something here. Probably just redirect to error page
    //console.log('%c ' + response, 'color:red');
}