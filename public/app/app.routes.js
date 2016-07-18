'use strict';

angular.module('app.routes', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/app/components/messages/messages.html',
                controller: 'MessagesCtrl'
            })
            .when('/new-message/', {
                templateUrl: '/app/components/message/add.html',
                controller: 'MessageCtrl'
            })
            .when('/palindromes', {
                templateUrl: '/app/components/messages/messages.html',
                controller: 'MessagesCtrl'
            })
            .when('/non-palindromes', {
                templateUrl: '/app/components/messages/messages.html',
                controller: 'MessagesCtrl'
            })
            .when('/messages/:messageId', {
                templateUrl: '/app/components/message/message.html',
                controller: 'MessageCtrl'
            })
            .when('/500-error', {
                templateUrl: '/app/components/errors/500.html'
            })
            .otherwise({
                templateUrl: '/app/components/errors/404.html'
            });
    }]);