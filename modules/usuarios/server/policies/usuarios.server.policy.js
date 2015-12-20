'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Usuarios Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/usuarios',
      permissions: '*'
    }, {
      resources: '/api/usuarios/:usuarioId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/usuarios',
      permissions: ['get', 'post']
    }, {
      resources: '/api/registrarusuario',
      permissions: ['get', 'post']
    }, {
      resources: '/api/login',
      permissions: ['get', 'post']
    }, {
      resources: '/api/recuperarcontrasenia',
      permissions: ['get', 'post']
    }, {
      resources: '/api/editarperfil',
      permissions: ['get', 'post']
    }, {
      resources: '/api/usuarios/:usuarioId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/usuarios',
      permissions: ['get']
    }, {
      resources: '/api/usuarios/:usuarioId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Usuarios Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an usuario is being processed and the current user created it then allow any manipulation
  if (req.usuario && req.user && req.usuario.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
