'use strict';

angular.module('app.messages.controller', ['app.message.service'])
    .controller('MessagesCtrl', ['$scope', 'MessageService', '$location', function ($scope, service, $location) {
        $scope.filterTypes = {
            ALL: 0,
            PALINDROMES: 1,
            NONPALINDROMES: 2
        };

        service.query(function (data, headers) {
            $scope.allMessages = data;
            $scope.showFilter = false;
            $scope.filter = $scope.filterTypes.ALL;

            $scope.allFilteredMessages = filterMessages($scope.allMessages, $scope.filter);

            $scope.messages = [];

            //setup pagination
            $scope.itemsPerPage = 10;
            $scope.setPage(1);
            $scope.numPages = Math.ceil($scope.allFilteredMessages.length / $scope.itemsPerPage);


        }, function (response) {
            if (response.status == 404) {
                $scope.pageIs404 = true;
            }

            _handleError(response, $location);
        });

        function filterMessages(messages, filterType) {
            var filteredMessages;

            switch (filterType) {
                case $scope.filterTypes.PALINDROMES:
                    filteredMessages = messages.filter(function (message) {
                        return message.isPalindrome;
                    });
                    break;

                case $scope.filterTypes.NONPALINDROMES:
                    filteredMessages = messages.filter(function (message) {
                        return !message.isPalindrome;
                    });
                    break;

                default:
                    filteredMessages = messages;
                    break;

            }
            return filteredMessages;
        }

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
            var begin = $scope.itemsPerPage * ($scope.currentPage - 1);
            var end = begin + $scope.itemsPerPage;

            $scope.messages = $scope.allFilteredMessages.slice(begin, end);

        };

        $scope.pageChanged = function () {
            $scope.setPage($scope.currentPage);
        };

        $scope.applyFilters = function () {
            $scope.allFilteredMessages = filterMessages($scope.allMessages, $scope.filter);
            $scope.setPage(1);
        };
    }]);

function _handleError(response, $location) { //LC TODO move _handleError to a service

    switch (response.status) {
        case 404:
            break; //do nothing, let our pages handle this

        default:
            $location.path('/500-error');
            break;
    }
}