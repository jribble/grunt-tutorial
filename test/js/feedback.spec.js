describe('Feedback', function() {
    beforeEach(module('app'));

    describe('Feedback', function() {
        it('should add workshop to the scope', inject(function($rootScope, $controller) {
            var $scope = $rootScope.$new();
            var ctrl = $controller('Feedback', {$scope: $scope});
            expect($scope.workshop.score).toBe(10);
        }));

        it('should have a working save method', inject(function($rootScope, $controller, $httpBackend) {
            var $scope = $rootScope.$new();
            var response = $httpBackend.expectPOST(
                'http://openwebstack.aws.af.cm/feedback'
            );
            response.respond('tested');

            var ctrl = $controller('Feedback', {$scope: $scope});
            expect($scope.save).toBeDefined();
            $scope.save({score:5});

        }));
    });
});