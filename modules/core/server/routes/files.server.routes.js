'use strict';

module.exports = function (app) {
  // Root routing
  var files = require('../controllers/files.server.controller');

  app.route('/api/files/upload')
  		.post(files.uploadImage);

  app.route('/api/files/crop')
		.post(files.crop);

};
