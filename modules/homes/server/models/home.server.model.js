'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Home Schema
 */
var HomeSchema = new Schema({
  Banners: [{
    Image: {
      type: String,
      trim:true
    },
    Url: {
      type: String,
      trim:true
    }
  }],
  UltimosAdheridos: [{
    NombreComercio: {
      type: String,
      trim: true
    },
    Image: {
      type: String,
      trim: true
    },
    _id: {
      type: String,
      trim: true
    }
  }],
  OfertasDestacadas: [{
    Image: {
      type: String,
      trim: true
    },
    Url: {
      type: String,
      trim: true
    }
  }],
  Favoritos: [{
    Label: {
      type: String,
      trim: true
    },
    Items: [{
      Image: {
        type: String,
        trim: true
      },
      Precio: {
        type: Number,
        trim: true
      }
    }]
  }],
  Orden: {
    type: Number,
    default: 0
  }

});

mongoose.model('Home', HomeSchema);
