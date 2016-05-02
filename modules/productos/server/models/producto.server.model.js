'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Producto Schema
 */
var ProductoSchema = new Schema({
  // IdProducto: {
  //   type: String,
  //   default:'',
  //   trim: true
  // },
  NombreProducto: {
    type: String,
    default:'',
    trim: true
  },
  Descripcion: {
    type: String,
    default:'',
    trim: true
  },
  FechaUltimaActualizacion: {
    type: Date,
    default: Date.now
  },
  Puntuacion: {
    type: Number,
    default: 0,
    trim: true
  },
  UrlPreviewPpal: {
    type: String,
    default:'',
    trim: true
  },
  ImagenGaleria: [{
    type: String,
    default:'',
    trim: true
  }],
  PrecioLista: {
    type: Number,
    default: 0,
    trim: true
  },
  Oferta: {
    type: Boolean,
    default:'',
    trim: true
  },
  Temporizada: {
    type: Boolean,
    default: false,
    trim: true
  },
  OfertaValidaHasta: {
    type: Date,
    default:'',
    trim: true
  },
  OfertaValidaDesde: {
    type: Date,
    default:'',
    trim: true
  },
  PrecioOferta: {
    type: Number,
    default:'',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Producto', ProductoSchema);
