'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cupon = mongoose.model('Cupon'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, Cupon;

/**
 * Cupon routes tests
 */
describe('Cupon CRUD tests', function () {
  this.timeout(10000);

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Cupon
    user.save(function () {
      Cupon = {
        title: 'Cupon Title',
        content: 'Cupon Content'
      };

      done();
    });
  });

  it('should be able to save an Cupon if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cupon
        agent.post('/api/cupones')
          .send(Cupon)
          .expect(200)
          .end(function (CuponSaveErr, CuponSaveRes) {
            // Handle Cupon save error
            if (CuponSaveErr) {
              return done(CuponSaveErr);
            }

            // Get a list of cupones
            agent.get('/api/cupones')
              .end(function (cuponesGetErr, cuponesGetRes) {
                // Handle Cupon save error
                if (cuponesGetErr) {
                  return done(cuponesGetErr);
                }

                // Get cupones list
                var cupones = cuponesGetRes.body;

                // Set assertions
                (cupones[0].user._id).should.equal(userId);
                (cupones[0].title).should.match('Cupon Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Cupon if not logged in', function (done) {
    agent.post('/api/cupones')
      .send(Cupon)
      .expect(403)
      .end(function (CuponSaveErr, CuponSaveRes) {
        // Call the assertion callback
        done(CuponSaveErr);
      });
  });

  it('should not be able to save an Cupon if no title is provided', function (done) {
    // Invalidate title field
    Cupon.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cupon
        agent.post('/api/cupones')
          .send(Cupon)
          .expect(400)
          .end(function (CuponSaveErr, CuponSaveRes) {
            // Set message assertion
            (CuponSaveRes.body.message).should.match('Title cannot be blank');

            // Handle Cupon save error
            done(CuponSaveErr);
          });
      });
  });

  it('should be able to update an Cupon if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cupon
        agent.post('/api/cupones')
          .send(Cupon)
          .expect(200)
          .end(function (CuponSaveErr, CuponSaveRes) {
            // Handle Cupon save error
            if (CuponSaveErr) {
              return done(CuponSaveErr);
            }

            // Update Cupon title
            Cupon.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Cupon
            agent.put('/api/cupones/' + CuponSaveRes.body._id)
              .send(Cupon)
              .expect(200)
              .end(function (CuponUpdateErr, CuponUpdateRes) {
                // Handle Cupon update error
                if (CuponUpdateErr) {
                  return done(CuponUpdateErr);
                }

                // Set assertions
                (CuponUpdateRes.body._id).should.equal(CuponSaveRes.body._id);
                (CuponUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of cupones if not signed in', function (done) {
    // Create new Cupon model instance
    var CuponObj = new Cupon(Cupon);

    // Save the Cupon
    CuponObj.save(function () {
      // Request cupones
      request(app).get('/api/cupones')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Cupon if not signed in', function (done) {
    // Create new Cupon model instance
    var CuponObj = new Cupon(Cupon);

    // Save the Cupon
    CuponObj.save(function () {
      request(app).get('/api/cupones/' + CuponObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', Cupon.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Cupon with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/cupones/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Cupon is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Cupon which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Cupon
    request(app).get('/api/cupones/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Cupon with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Cupon if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cupon
        agent.post('/api/cupones')
          .send(Cupon)
          .expect(200)
          .end(function (CuponSaveErr, CuponSaveRes) {
            // Handle Cupon save error
            if (CuponSaveErr) {
              return done(CuponSaveErr);
            }

            // Delete an existing Cupon
            agent.delete('/api/cupones/' + CuponSaveRes.body._id)
              .send(Cupon)
              .expect(200)
              .end(function (CuponDeleteErr, CuponDeleteRes) {
                // Handle Cupon error error
                if (CuponDeleteErr) {
                  return done(CuponDeleteErr);
                }

                // Set assertions
                (CuponDeleteRes.body._id).should.equal(CuponSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Cupon if not signed in', function (done) {
    // Set Cupon user
    Cupon.user = user;

    // Create new Cupon model instance
    var CuponObj = new Cupon(Cupon);

    // Save the Cupon
    CuponObj.save(function () {
      // Try deleting Cupon
      request(app).delete('/api/cupones/' + CuponObj._id)
        .expect(403)
        .end(function (CuponDeleteErr, CuponDeleteRes) {
          // Set message assertion
          (CuponDeleteRes.body.message).should.match('User is not authorized');

          // Handle Cupon error error
          done(CuponDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Cupon.remove().exec(done);
    });
  });
});
