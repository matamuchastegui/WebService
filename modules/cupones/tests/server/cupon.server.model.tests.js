'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cupon = mongoose.model('Cupon');

/**
 * Globals
 */
var user, Cupon;

/**
 * Unit tests
 */
describe('Cupon Model Unit Tests:', function () {
  this.timeout(10000);

  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save(function () {
      Cupon = new Cupon({
        title: 'Cupon Title',
        content: 'Cupon Content',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      return Cupon.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without title', function (done) {
      Cupon.title = '';

      return Cupon.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Cupon.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});
