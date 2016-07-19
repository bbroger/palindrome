describe('message controller', function () {

    beforeEach(module('app'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_, _$controller_, _MessageService_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        $routeParams = {
        };
        $route = {
            reload: function () { //do nothing

            }
        };

        $location = {
            path: function () { //do nothing
            }
        };
        MessageService = _MessageService_;

        newMessageController = function (params) {
            if (!params) {
                params = $routeParams; //use default
            }
            return $controller('MessageCtrl', {
                '$scope': $scope,
                '$routeParams': params,
                "MessageService": MessageService,
                "$route": $route,
                "$location": $location
            });
        };
    }));


    beforeEach(inject(function ($controller, MessageService) {

        $httpBackend.when('POST', '/messages').respond({
            messageId: '1234',
            text: 'Amor roma',
            isPalindrome: true
        });

        $httpBackend.when('GET', '/messages/1234').respond({
            messageId: '1234',
            text: 'Amor roma',
            isPalindrome: true
        });

        $httpBackend.when('PUT', '/messages/1234').respond({
            messageId: '1234',
            text: 'new text',
            isPalindrome: false
        });

        $httpBackend.when('GET', '/messages/5678').respond({
            text: 'not a palindrome',
            isPalindrome: false
        });

        $httpBackend.when('GET', '/messages/invalid1234').respond(404, '');

    }));


    // tests
    it('MessageService should be defined', function () {
        expect(MessageService).toBeDefined();
    });

    it('should not allow add initially', function () {
        var messageController = newMessageController();
        expect($scope.addDisabled()).toEqual(true);
    });

    it('should allow add when message text has been set', function () {
        var messageController = newMessageController();
        $scope.message = {
            text: 'Amor roma'
        };

        expect($scope.addDisabled()).toEqual(false);
    });


    /* Test for the following directive output:
    <div class="in-line-container">
        <div class="in-line-value" ng-hide="editing">{{message.text}}</div>
        <input class="in-line-input form-control" ng-show="editing" type="text" ng-model="message.text" />
    </div>
    */
    it('Replaces the element with the appropriate content', function () {
        var messageController = newMessageController();
        $scope.message = {
            text: 'Amor roma'
        };

        //LC note - need to wrap in div or what you get back is the original
        var element = $compile('<div><edit-in-line value="message.text" editing="editing" /></div>')($scope);
        $scope.$digest(); //{{ message.text}} should be replaced with Amor roma

        var divContainer = element.find("div.in-line-container");
        var divValue = element.find("div.in-line-value");
        var inputElement = element.find("input.in-line-input");

        expect(divContainer.length).toEqual(1);
        expect(divValue.length).toEqual(1);
        expect(inputElement.length).toEqual(1);
        expect(divValue.text()).toEqual($scope.message.text);

    });

    it('test toggle edit mode', function () {
        var messageController = newMessageController();
        expect($scope.editing).toEqual(false); //intially
        $scope.edit();
        expect($scope.editing).toEqual(true); //toggle on
        $scope.edit();
        expect($scope.editing).toEqual(false); //toggle off

    });

    it('should test updating a message', function () {
        var message = {
            messageId: '1234',
            text: 'Amor roma',
            isPalindrome: true
        };
        var expectedMessage = {
            messageId: '1234',
            text: 'new text',
            isPalindrome: false
        };
        $routeParams = {
            messageId: message.messageId
        };
        var messageController = newMessageController($routeParams);

        $httpBackend.expectGET('/messages/' + message.messageId);
        $httpBackend.flush();

        $scope.edit();
        $scope.message.text = "new text"; //update scope

        message.isPalindrome = false; //update to new expected value


        $httpBackend.expectPUT('/messages/' + message.messageId);
        $scope.$apply(function () {
            $scope.save();
        });
        $httpBackend.flush();
        expect($scope.message.text).toEqual(expectedMessage.text);
        expect($scope.message.isPalindrome).toEqual(expectedMessage.isPalindrome);
    });



});