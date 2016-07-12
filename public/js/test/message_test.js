describe('message controller', function () {
    beforeEach(module('app'));
    var _scope;
    var _httpBackend;

    beforeEach(inject(function ($controller, $rootScope, MessageService, $httpBackend) {
        _scope = $rootScope.$new();
        _httpBackend = $httpBackend;

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

        $controller('MessageCtrl', {
            $scope: _scope,
            MessageService: MessageService
        });
    }));

    it('should not allow add initially', function () {
        expect(_scope.addDisabled()).to.equal(true);
    });
    it('should allow add when message text has been set', function () {
        _scope.message = {
            text: 'Amor roma'
        };

        expect(_scope.addDisabled()).to.equal(false);
    });
});