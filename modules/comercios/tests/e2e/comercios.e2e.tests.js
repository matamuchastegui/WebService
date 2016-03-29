'use strict';

describe('Comercios E2E Tests:', function () {
  describe('Test comercios page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/comercios');
      expect(element.all(by.repeater('comercio in comercios')).count()).toEqual(0);
    });
  });
});
