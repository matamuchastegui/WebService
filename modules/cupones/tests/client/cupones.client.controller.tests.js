'use strict';

(function () {
  // Cupones Controller Spec
  describe('Cupones Controller Tests', function () {
    // Initialize global variables
    var CuponesController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Cupones,
      mockCupon;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Cupones_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Cupones = _Cupones_;

      // create mock Cupon
      mockCupon = new Cupones({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Cupon about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Cupones controller.
      CuponesController = $controller('CuponesController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one Cupon object fetched from XHR', inject(function (Cupones) {
      // Create a sample cupones array that includes the new Cupon
      var sampleCupones = [mockCupon];

      // Set GET response
      $httpBackend.expectGET('api/cupones').respond(sampleCupones);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.cupones).toEqualData(sampleCupones);
    }));

    it('$scope.findOne() should create an array with one Cupon object fetched from XHR using a CuponId URL parameter', inject(function (Cupones) {
      // Set the URL parameter
      $stateParams.CuponId = mockCupon._id;

      // Set GET response
      $httpBackend.expectGET(/api\/cupones\/([0-9a-fA-F]{24})$/).respond(mockCupon);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.Cupon).toEqualData(mockCupon);
    }));

    describe('$scope.create()', function () {
      var sampleCuponPostData;

      beforeEach(function () {
        // Create a sample Cupon object
        sampleCuponPostData = new Cupones({
          title: 'An Cupon about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Cupon about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Cupones) {
        // Set POST response
        $httpBackend.expectPOST('api/cupones', sampleCuponPostData).respond(mockCupon);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the Cupon was created
        expect($location.path.calls.mostRecent().args[0]).toBe('cupones/' + mockCupon._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/cupones', sampleCuponPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock Cupon in scope
        scope.Cupon = mockCupon;
      });

      it('should update a valid Cupon', inject(function (Cupones) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/cupones\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/cupones/' + mockCupon._id);
      }));

      it('should set scope.error to error response message', inject(function (Cupones) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/cupones\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(Cupon)', function () {
      beforeEach(function () {
        // Create new cupones array and include the Cupon
        scope.cupones = [mockCupon, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/cupones\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockCupon);
      });

      it('should send a DELETE request with a valid CuponId and remove the Cupon from the scope', inject(function (Cupones) {
        expect(scope.cupones.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.Cupon = mockCupon;

        $httpBackend.expectDELETE(/api\/cupones\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to cupones', function () {
        expect($location.path).toHaveBeenCalledWith('cupones');
      });
    });
  });
}());
