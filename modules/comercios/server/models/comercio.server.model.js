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
    trim: true,
    required: 'Imagen del comercio requerida'
  },
  UrlImageLogo: {
    type: String,
    trim: true,
    required: 'Logo requerido'
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
  PuntuacionEstrellas: {
    type: Number,
    default: 0,
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
  Direccion: {
    type: String,
    trim: true,
    required: "Dirección es requerido."
  },
  Horarios: {
    Lunes: {
        Corrido: {
          type: Boolean,
          default: false
        },
        DM: {
          type: Date,
          required: 'Horarios requeridos'
        },
        HM: {
          type: Date,
          required: 'Horarios requeridos'
        },
        HT: {
          type: Date,
          required: 'Horarios requeridos'
        },
        DT: {
          type: Date,
          required: 'Horarios requeridos'
        }
    },
    Sabado: {
        Corrido: {
          type: Boolean,
          default: false
        },
        DM: {
          type: Date,
          required: 'Horarios requeridos'
        },
        HM: {
          type: Date,
          required: 'Horarios requeridos'
        },
        HT: {
          type: Date,
          required: 'Horarios requeridos'
        },
        DT: {
          type: Date,
          required: 'Horarios requeridos'
        }
    },
    DomingoFeriado: {
        Corrido: {
          type: Boolean,
          default: false
        },
        DM: {
          type: Date
        },
        HM: {
          type: Date
        },
        HT: {
          type: Date
        },
        DT: {
          type: Date
        }
    },
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
      Acepta: {
        type: Boolean,
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
