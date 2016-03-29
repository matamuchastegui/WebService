'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Comentario = mongoose.model('Comentario'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, comentario;

/**
 * Comentario routes tests
 */
describe('Comentario CRUD tests', function () {
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

    // Save a user to the test db and create new comentario
    user.save(function () {
      comentario = {
        title: 'Comentario Title',
        content: 'Comentario Content'
      };

      done();
    });
  });

  it('should be able to save an comentario if logged in', function (done) {
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

        // Save a new comentario
        agent.post('/api/comentarios')
          .send(comentario)
          .expect(200)
          .end(function (comentarioSaveErr, comentarioSaveRes) {
            // Handle comentario save error
            if (comentarioSaveErr) {
              return done(comentarioSaveErr);
            }

            // Get a list of comentarios
            agent.get('/api/comentarios')
              .end(function (comentariosGetErr, comentariosGetRes) {
                // Handle comentario save error
                if (comentariosGetErr) {
                  return done(comentariosGetErr);
                }

                // Get comentarios list
                var comentarios = comentariosGetRes.body;

                // Set assertions
                (comentarios[0].user._id).should.equal(userId);
                (comentarios[0].title).should.match('Comentario Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an comentario if not logged in', function (done) {
    agent.post('/api/comentarios')
      .send(comentario)
      .expect(403)
      .end(function (comentarioSaveErr, comentarioSaveRes) {
        // Call the assertion callback
        done(comentarioSaveErr);
      });
  });

  it('should not be able to save an comentario if no title is provided', function (done) {
    // Invalidate title field
    comentario.title = '';

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

        // Save a new comentario
        agent.post('/api/comentarios')
          .send(comentario)
          .expect(400)
          .end(function (comentarioSaveErr, comentarioSaveRes) {
            // Set message assertion
            (comentarioSaveRes.body.message).should.match('Title cannot be blank');

            // Handle comentario save error
            done(comentarioSaveErr);
          });
      });
  });

  it('should be able to update an comentario if signed in', function (done) {
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

        // Save a new comentario
        agent.post('/api/comentarios')
          .send(comentario)
          .expect(200)
          .end(function (comentarioSaveErr, comentarioSaveRes) {
            // Handle comentario save error
            if (comentarioSaveErr) {
              return done(comentarioSaveErr);
            }

            // Update comentario title
            comentario.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing comentario
            agent.put('/api/comentarios/' + comentarioSaveRes.body._id)
              .send(comentario)
              .expect(200)
              .end(function (comentarioUpdateErr, comentarioUpdateRes) {
                // Handle comentario update error
                if (comentarioUpdateErr) {
                  return done(comentarioUpdateErr);
                }

                // Set assertions
                (comentarioUpdateRes.body._id).should.equal(comentarioSaveRes.body._id);
                (comentarioUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of comentarios if not signed in', function (done) {
    // Create new comentario model instance
    var comentarioObj = new Comentario(comentario);

    // Save the comentario
    comentarioObj.save(function () {
      // Request comentarios
      request(app).get('/api/comentarios')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single comentario if not signed in', function (done) {
    // Create new comentario model instance
    var comentarioObj = new Comentario(comentario);

    // Save the comentario
    comentarioObj.save(function () {
      request(app).get('/api/comentarios/' + comentarioObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', comentario.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single comentario with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/comentarios/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Comentario is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single comentario which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent comentario
    request(app).get('/api/comentarios/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No comentario with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an comentario if signed in', function (done) {
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

        // Save a new comentario
        agent.post('/api/comentarios')
          .send(comentario)
          .expect(200)
          .end(function (comentarioSaveErr, comentarioSaveRes) {
            // Handle comentario save error
            if (comentarioSaveErr) {
              return done(comentarioSaveErr);
            }

            // Delete an existing comentario
            agent.delete('/api/comentarios/' + comentarioSaveRes.body._id)
              .send(comentario)
              .expect(200)
              .end(function (comentarioDeleteErr, comentarioDeleteRes) {
                // Handle comentario error error
                if (comentarioDeleteErr) {
                  return done(comentarioDeleteErr);
                }

                // Set assertions
                (comentarioDeleteRes.body._id).should.equal(comentarioSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an comentario if not signed in', function (done) {
    // Set comentario user
    comentario.user = user;

    // Create new comentario model instance
    var comentarioObj = new Comentario(comentario);

    // Save the comentario
    comentarioObj.save(function () {
      // Try deleting comentario
      request(app).delete('/api/comentarios/' + comentarioObj._id)
        .expect(403)
        .end(function (comentarioDeleteErr, comentarioDeleteRes) {
          // Set message assertion
          (comentarioDeleteRes.body.message).should.match('User is not authorized');

          // Handle comentario error error
          done(comentarioDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Comentario.remove().exec(done);
    });
  });
});
