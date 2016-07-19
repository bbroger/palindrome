describe('message controller', function () {
    var _scope,
        $httpBackend,
        $compile,
        $rootScope,
        spyEvent,
        $http;

    beforeEach(module('app'));

    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _MessageService_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;

        $location = {
            path: function () { //do nothing
            }
        };
        MessageService = _MessageService_;

        newMessagesController = function () {
            return $controller('MessagesCtrl', {
                '$scope': $scope,
                "MessageService": MessageService,
                "$location": $location
            });
        };
    }));

    /*
        beforeEach(inject(function ($controller, MessageService) {
    
            // setup the mock API
            $httpBackend.when('GET', '/messages').respond([{
                messageId: '1234',
                text: 'Amor roma',
                isPalindrome: true
            }, {
                    messageId: '5678',
                    text: 'Not a palindrome',
                    isPalindrome: false
                }]);
        }));*/


    // tests

    it('should test messages query', function () {
        var messages = [{
            messageId: '1234',
            text: 'Amor roma',
            isPalindrome: true
        }, {
                messageId: '5678',
                text: 'Not a palindrome',
                isPalindrome: false
            }];
        $httpBackend.when('GET', '/messages').respond(messages);

        var messagesController = newMessagesController();

        $httpBackend.expectGET('/messages');
        $httpBackend.flush();

        for (var i = 0; i < messages.length; i++) {
            expect($scope.messages[i].messageId).toEqual(messages[i].messageId);
            expect($scope.messages[i].text).toEqual(messages[i].text);
        }
    });

    it('should test messages applyFilters all', function () {
        var messages = [{
            messageId: '1234',
            text: 'Amor roma',
            isPalindrome: true
        }, {
                messageId: '5678',
                text: 'Not a palindrome',
                isPalindrome: false
            }];
        $httpBackend.when('GET', '/messages').respond(messages);

        var messagesController = newMessagesController();

        $httpBackend.expectGET('/messages');
        $httpBackend.flush();
        $scope.applyFilters();
        for (var i = 0; i < messages.length; i++) {
            expect($scope.messages[i].messageId).toEqual(messages[i].messageId);
            expect($scope.messages[i].text).toEqual(messages[i].text);
        }

    });

    it('should test messages applyFilters palindromes', function () {
        var messages = [{
            messageId: '1234',
            text: 'Amor roma',
            isPalindrome: true
        }, {
                messageId: '5678',
                text: 'Not a palindrome',
                isPalindrome: false
            }];

        var expectedMessages = [];
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].isPalindrome) {
                expectedMessages.push(messages[i]);
            }
        }
        $httpBackend.when('GET', '/messages').respond(messages);

        var messagesController = newMessagesController();

        $httpBackend.expectGET('/messages');
        $httpBackend.flush();
        $scope.filter = $scope.filterTypes.PALINDROMES;
        $scope.applyFilters();

        for (var i = 0; i < expectedMessages.length; i++) {
            expect($scope.messages[i].messageId).toEqual(expectedMessages[i].messageId);
            expect($scope.messages[i].text).toEqual(expectedMessages[i].text);
        }
        expect($scope.messages.length).toEqual(expectedMessages.length);

    });

    it('should test messages applyFilters nonpalindromes', function () {
        var messages = [{
            messageId: '1234',
            text: 'Amor roma',
            isPalindrome: true
        }, {
                messageId: '5678',
                text: 'Not a palindrome',
                isPalindrome: false
            }];

        var expectedMessages = [];
        for (var i = 0; i < messages.length; i++) {
            if (!messages[i].isPalindrome) {
                expectedMessages.push(messages[i]);
            }
        }
        $httpBackend.when('GET', '/messages').respond(messages);

        var messagesController = newMessagesController();

        $httpBackend.expectGET('/messages');
        $httpBackend.flush();
        $scope.filter = $scope.filterTypes.NONPALINDROMES;
        $scope.applyFilters();

        for (var i = 0; i < expectedMessages.length; i++) {
            expect($scope.messages[i].messageId).toEqual(expectedMessages[i].messageId);
            expect($scope.messages[i].text).toEqual(expectedMessages[i].text);
        }
        expect($scope.messages.length).toEqual(expectedMessages.length);

    });

    //LC TODO add a test for the pagination



});