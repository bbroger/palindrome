'use strict';

angular.module('app.message.service', [])
    .factory('MessageService', ['$resource', function ($resource) {
        return $resource('/messages/:messageId', {}, {
            update: {
                method: 'PUT'
            },
            add: {
                method: 'POST'
            },
            query: {
                method: 'GET',
                isArray: true
            },
        });
    }]);
