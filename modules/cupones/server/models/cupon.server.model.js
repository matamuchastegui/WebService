'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Cupon Schema
 */
var CuponSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  NombreCupon: {
    type: String,
    default: '',
    trim: true,
    required: 'Nombre requerido'
  },
  CuponBarcode:{
    type: Number,
    trim: true,
    required: 'El código de barras es requerido'
  },
  ValidFrom: {
    type: Date,
    trim: true,
    required: 'La fecha de validez es requerida'
  },
  ValidTo: {
    type: Date,
    trim: true,
    required: 'La fecha de vencimiento es requerida'
  },
  Description: {
    type: String,
    trim: true,
    required: 'La descripción es requerida'
  },
  CuponType: {
    type: String,
    trim: true,
    required: 'Tipo de cupón es requerido'
  },
  CuponStatus: {
    type: String,
    trim: true
  },
  CuponUrl: {
    type: String,
    trim: true
  },
  CuponUsado: {
    type: Boolean,
    trim: true,
    default: false
  },
  Temporizado: {
    type: Boolean,
    trim: true,
    default: false
  },
  UrlImage: {
    type: String,
    trim: true
  },
  Comercio: {
    type: Schema.ObjectId,
    ref: 'Comercio'
  }
});

mongoose.model('Cupon', CuponSchema);


