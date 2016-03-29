'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Comercio = mongoose.model('Comercio'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, comercio;

/**
 * Comercio routes tests
 */
describe('Comercio CRUD tests', function () {
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

    // Save a user to the test db and create new comercio
    user.save(function () {
      comercio = {
        title: 'Comercio Title',
        content: 'Comercio Content'
      };

      done();
    });
  });

  it('should be able to save an comercio if logged in', function (done) {
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

        // Save a new comercio
        agent.post('/api/comercios')
          .send(comercio)
          .expect(200)
          .end(function (comercioSaveErr, comercioSaveRes) {
            // Handle comercio save error
            if (comercioSaveErr) {
              return done(comercioSaveErr);
            }

            // Get a list of comercios
            agent.get('/api/comercios')
              .end(function (comerciosGetErr, comerciosGetRes) {
                // Handle comercio save error
                if (comerciosGetErr) {
                  return done(comerciosGetErr);
                }

                // Get comercios list
                var comercios = comerciosGetRes.body;

                // Set assertions
                (comercios[0].user._id).should.equal(userId);
                (comercios[0].title).should.match('Comercio Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an comercio if not logged in', function (done) {
    agent.post('/api/comercios')
      .send(comercio)
      .expect(403)
      .end(function (comercioSaveErr, comercioSaveRes) {
        // Call the assertion callback
        done(comercioSaveErr);
      });
  });

  it('should not be able to save an comercio if no title is provided', function (done) {
    // Invalidate title field
    comercio.title = '';

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

        // Save a new comercio
        agent.post('/api/comercios')
          .send(comercio)
          .expect(400)
          .end(function (comercioSaveErr, comercioSaveRes) {
            // Set message assertion
            (comercioSaveRes.body.message).should.match('Title cannot be blank');

            // Handle comercio save error
            done(comercioSaveErr);
          });
      });
  });

  it('should be able to update an comercio if signed in', function (done) {
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

        // Save a new comercio
        agent.post('/api/comercios')
          .send(comercio)
          .expect(200)
          .end(function (comercioSaveErr, comercioSaveRes) {
            // Handle comercio save error
            if (comercioSaveErr) {
              return done(comercioSaveErr);
            }

            // Update comercio title
            comercio.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing comercio
            agent.put('/api/comercios/' + comercioSaveRes.body._id)
              .send(comercio)
              .expect(200)
              .end(function (comercioUpdateErr, comercioUpdateRes) {
                // Handle comercio update error
                if (comercioUpdateErr) {
                  return done(comercioUpdateErr);
                }

                // Set assertions
                (comercioUpdateRes.body._id).should.equal(comercioSaveRes.body._id);
                (comercioUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of comercios if not signed in', function (done) {
    // Create new comercio model instance
    var comercioObj = new Comercio(comercio);

    // Save the comercio
    comercioObj.save(function () {
      // Request comercios
      request(app).get('/api/comercios')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single comercio if not signed in', function (done) {
    // Create new comercio model instance
    var comercioObj = new Comercio(comercio);

    // Save the comercio
    comercioObj.save(function () {
      request(app).get('/api/comercios/' + comercioObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', comercio.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single comercio with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/comercios/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Comercio is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single comercio which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent comercio
    request(app).get('/api/comercios/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No comercio with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an comercio if signed in', function (done) {
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

        // Save a new comercio
        agent.post('/api/comercios')
          .send(comercio)
          .expect(200)
          .end(function (comercioSaveErr, comercioSaveRes) {
            // Handle comercio save error
            if (comercioSaveErr) {
              return done(comercioSaveErr);
            }

            // Delete an existing comercio
            agent.delete('/api/comercios/' + comercioSaveRes.body._id)
              .send(comercio)
              .expect(200)
              .end(function (comercioDeleteErr, comercioDeleteRes) {
                // Handle comercio error error
                if (comercioDeleteErr) {
                  return done(comercioDeleteErr);
                }

                // Set assertions
                (comercioDeleteRes.body._id).should.equal(comercioSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an comercio if not signed in', function (done) {
    // Set comercio user
    comercio.user = user;

    // Create new comercio model instance
    var comercioObj = new Comercio(comercio);

    // Save the comercio
    comercioObj.save(function () {
      // Try deleting comercio
      request(app).delete('/api/comercios/' + comercioObj._id)
        .expect(403)
        .end(function (comercioDeleteErr, comercioDeleteRes) {
          // Set message assertion
          (comercioDeleteRes.body.message).should.match('User is not authorized');

          // Handle comercio error error
          done(comercioDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Comercio.remove().exec(done);
    });
  });
});
