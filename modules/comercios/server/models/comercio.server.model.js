'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Comercio Schema
 */
var ComercioSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  NombreComercio: {
    type: String,
    default: '',
    trim: true,
    required: 'El nombre del comercio no puede estar vacío'
  },
  UbicacionLat: {
    type: Number,
    trim: true
  },
  UbicacionLon: {
    type: Number,
    trim: true
  },
  UrlImageComercio: {
    type: String,
    trim: true
  },
  UrlImageLogo: {
    type: String,
    trim: true
  },
  ImagenesPromociones: [{
    UrlImageGaleria: {
      type: String,
      default:'',
      trim: true
    },
  }],
  Slogan: {
    type: String,
    trim: true
  },
  CantSeguidores: {
    type: Number,
    default: 0,
    trim: true
  },
  CantPublicaciones: {
    type: Number,
    default: 0,
    trim: true
  },
  PuntuaciónEstrellas: {
    type: Number,
    trim: true
  },
  Email: {
    type: String,
    required: 'Email es requerido',
    trim: true
  },
  Web: {
    type: String,
    trim: true
  },
  Facebook: {
    type: String,
    trim: true
  },
  FacebookLiked: {
    type: Boolean,
    default: false,
    trim: true
  },
  Instagram: {
    type: String,
    trim: true
  },
  Twitter: {
    type: String,
    trim: true
  },
  TwitterFallow: {
    type: Boolean,
    default: false,
    trim: true
  },
  IdComercio: {
    type: Number,
    trim: true
  },
  EnvioADomicilio: {
    type: Boolean,
    default: false,
    trim: true
  },
  Telefonos: [{
    type: String,
    trim: true
  }],   
  Tarjeta: [{
      NombreTarjeta: {
        type: String,
        trim: true
      },
      Descripcion: {
        type: String,
        trim: true
      },
  }],
  Productos: [{
    type: Schema.ObjectId,
    ref: 'Producto'
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
});

mongoose.model('Comercio', ComercioSchema);
