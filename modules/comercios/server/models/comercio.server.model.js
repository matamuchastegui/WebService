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
  title: {
    type: String,
    default: '',
    trim: true
    //required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '0',
    trim: true
  },
  IdComercio: {
    type: Number,
    trim: true,
    required: 'IdComercio es requerido'
  },
  productos: [{
    IdProducto: {
      type: String,
      default:'',
      trim: true
    },
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
      type: String,
      default:'',
      trim: true
    },
    Puntuacion: {
      type: Number,
      default:'',
      trim: true
    },
    UrlPreviewPpal: {
      type: String,
      default:'',
      trim: true
    },
    ImagenGaleria: [{
      UrlImageGaleria: {
        type: String,
        default:'',
        trim: true
      },
    }],
    PrecioLista: {
      type: Number,
      default:'',
      trim: true
    },
    Oferta: {
      type: Boolean,
      default:'',
      trim: true
    },
    Temporizada: {
      type: Boolean,
      default:'',
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
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
});

mongoose.model('Comercio', ComercioSchema);
