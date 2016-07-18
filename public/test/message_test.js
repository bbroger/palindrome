describe('message controller', function () {
    var _scope,
        $httpBackend,
        $compile,
        $rootScope,
        spyEvent,
        $http;

    beforeEach(module('app'));


    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_, _$http_, _$httpBackend_, _$controller_, _$routeParams_, _MessageService_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        _scope = $rootScope.$new();
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        $routeParams = _$routeParams_;
        MessageService = _MessageService_;

        //$controller('MessageCtrl', ['$scope', '$routeParams', 'MessageService', '$route', '$location', function ($scope, $routeParams, service, $route, $location));
        //MessageCtrl = $controller('MessageCtrl', { '$scope': _scope, '$routeParams': $routeParams }); //LC TODO likely need to add all the other things
    }));


    beforeEach(inject(function ($controller, MessageService) {

        // setup the mock API
        $httpBackend.when('GET', '/messages').respond([{
            text: 'Amor roma',
            isPalindrome: true
        }, {
                text: 'Not a palindrome',
                isPalindrome: false
            }]);

        $httpBackend.when('POST', '/messages').respond({
            text: 'Amor roma',
            isPalindrome: true
        });

        $httpBackend.when('GET', '/messages/1234').respond({
            text: 'Amor roma',
            isPalindrome: true
        });

        $httpBackend.when('GET', '/messages/5678').respond({
            text: 'not a palindrome',
            isPalindrome: false
        });

        $httpBackend.when('GET', '/messages/invalid1234').respond(404, '');


        $controller('MessageCtrl', {
            $scope: _scope,
            MessageService: MessageService
        });
    }));


    // tests

    /*
        it("MessageCtrl should be defined", function () {
            console.log(MessageCtrl); //LC TODO this is defined but blank
            expect(MessageCtrl).toBeDefined();
        });
        */
    it('MessageService should be defined', function () {
        expect(MessageService).toBeDefined();
    });

    it('should not allow add initially', function () {
        expect(_scope.addDisabled()).toEqual(true);
    });

    it('should allow add when message text has been set', function () {
        _scope.message = {
            text: 'Amor roma'
        };

        expect(_scope.addDisabled()).toEqual(false);
    });


    /* Test for the following directive output:
    <div class="in-line-container">
        <div class="in-line-value" ng-hide="editing">{{message.text}}</div>
        <input class="in-line-input form-control" ng-show="editing" type="text" ng-model="message.text" />
    </div>
    */
    it('Replaces the element with the appropriate content', function () {
        _scope.message = {
            text: 'Amor roma'
        };

        //LC note - need to wrap in div or what you get back is the original
        var element = $compile('<div><edit-in-line value="message.text" editing="editing" /></div>')(_scope);
        _scope.$digest(); //{{ message.text}} should be replaced with Amor roma

        var divContainer = element.find("div.in-line-container");
        var divValue = element.find("div.in-line-value");
        var inputElement = element.find("input.in-line-input");

        expect(divContainer.length).toEqual(1);
        expect(divValue.length).toEqual(1);
        expect(inputElement.length).toEqual(1);
        expect(divValue.text()).toEqual(_scope.message.text);

    });



});