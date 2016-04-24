'use strict';

(function () {
  // Comercios Controller Spec
  describe('Comercios Controller Tests', function () {
    // Initialize global variables
    var ComerciosController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Comercios,
      mockComercio;

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
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Comercios_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Comercios = _Comercios_;

      // create mock comercio
      mockComercio = new Comercios({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Comercio about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Comercios controller.
      ComerciosController = $controller('ComerciosController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one comercio object fetched from XHR', inject(function (Comercios) {
      // Create a sample comercios array that includes the new comercio
      var sampleComercios = [mockComercio];

      // Set GET response
      $httpBackend.expectGET('api/comercios').respond(sampleComercios);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.comercios).toEqualData(sampleComercios);
    }));

    it('$scope.findOne() should create an array with one comercio object fetched from XHR using a IdComercio URL parameter', inject(function (Comercios) {
      // Set the URL parameter
      $stateParams.IdComercio = mockComercio._id;

      // Set GET response
      $httpBackend.expectGET(/api\/comercios\/([0-9a-fA-F]{24})$/).respond(mockComercio);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.comercio).toEqualData(mockComercio);
    }));

    describe('$scope.create()', function () {
      var sampleComercioPostData;

      beforeEach(function () {
        // Create a sample comercio object
        sampleComercioPostData = new Comercios({
          title: 'An Comercio about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Comercio about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Comercios) {
        // Set POST response
        $httpBackend.expectPOST('api/comercios', sampleComercioPostData).respond(mockComercio);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the comercio was created
        expect($location.path.calls.mostRecent().args[0]).toBe('comercios/' + mockComercio._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/comercios', sampleComercioPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock comercio in scope
        scope.comercio = mockComercio;
      });

      it('should update a valid comercio', inject(function (Comercios) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/comercios\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/comercios/' + mockComercio._id);
      }));

      it('should set scope.error to error response message', inject(function (Comercios) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/comercios\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(comercio)', function () {
      beforeEach(function () {
        // Create new comercios array and include the comercio
        scope.comercios = [mockComercio, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/comercios\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockComercio);
      });

      it('should send a DELETE request with a valid IdComercio and remove the comercio from the scope', inject(function (Comercios) {
        expect(scope.comercios.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.comercio = mockComercio;

        $httpBackend.expectDELETE(/api\/comercios\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to comercios', function () {
        expect($location.path).toHaveBeenCalledWith('comercios');
      });
    });
  });
}());
