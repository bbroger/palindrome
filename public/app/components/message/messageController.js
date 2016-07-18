'use strict';

angular.module('app.message.controller', ['app.message.service'])
    .controller('MessageCtrl', ['$scope', '$routeParams', 'MessageService', '$route', '$location', function ($scope, $routeParams, service, $route, $location) {

        // if we have a messageId, we are viewing/editing an existing Message
        if ($routeParams.messageId) {
            service.get({
                messageId: $routeParams.messageId
            }, function (data, headers) {
                $scope.message = data;
            }, function (response) {
                if (response.status == 404) {
                    $scope.pageIs404 = true;
                }

                _handleError(response, $location);
            });
        }

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
            }, function (response) {
                if (response.status == 404) {
                    $scope.pageIs404 = true;
                }

                _handleError(response, $location);
            });

            $location.path("/");
        };

        $scope.isPalindrome = isPalindrome;
    }]);

function _handleError(response, $location) { //LC TODO move this to a service

    switch (response.status) {
        case 404:
            break; //do nothing, let our pages handle this

        default:
            $location.path('/500-error');
            break;
    }
}

var isPalindrome = function (text) { //LC TODO move this to a service

    if (!text) {
        return false;
    }

    text = text.replace(/[^\w]/g, ""); //remove all characters except a-z
    text = text.toLowerCase();
    if (text.length === 0) {
        return false;
    }

    return text == text.split('').reverse().join('');
};