'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Comercio = mongoose.model('Comercio'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  res.render('modules/core/server/views/index', {
    user: req.user || null
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Algo salió mal...'
  });
};

exports.getVouchers = function(req, res){
  res.json({
    respCode: 0,
    respMessage: "OK",
    vouchers: [
      {
        voucherCode: "20010003000400005W",
        currency: "€",
        voucherAmount: "10",
        validUntil: "2015-07-19T00:00:00",
        minSpendAmount: "50",
        bgColor: "#BFDC92",
        voucherType: "GIFT",
        promotionCode: "20010003000400005W",
        voucherStatus: "EXPIRED"
      },
      {
        voucherCode: "2001000300040000JQ",
        currency: "€",
        voucherAmount: "10",
        validUntil: "2015-07-19T00:00:00",
        minSpendAmount: "50",
        bgColor: "#BFDC92",
        voucherType: "GIFT",
        promotionCode: "2001000300040000JQ",
        voucherStatus: "REDEEMED"
      },
      {
        voucherCode: "2706770708107",
        currency: "",
        voucherAmount: "10%",
        validUntil: "2016-03-15T00:00:00",
        minSpendAmount: "0",
        bgColor: "#A8D3F3",
        voucherType: "WELCOME",
        promotionCode: "WLC10",
        voucherStatus: "VALID"
      }
    ]
  });
};

exports.getHome = function(req, res){
  Comercio.find().sort('-created').limit(8).populate('user', 'displayName').exec(function (err, comercios) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var UltimosAdheridos = [];
      for (var i = comercios.length - 1; i >= 0; i--) {
        UltimosAdheridos.push({
          NombreComercio: comercios[i].NombreComercio,
          Image: comercios[i].UrlImageLogo,
          _id: comercios[i]._id});
      }
      res.json({
        respCode: 0,
        respMessage: "OK",
        Banners: [
          {
            Image: 'https://s3-us-west-2.amazonaws.com/decomprasimg/home/banner1.png',
            Url: 'https://google.com'
          },
          {
            Image: 'https://s3-us-west-2.amazonaws.com/decomprasimg/home/banner2.jpg',
            Url: 'https://google.com'
          },
          {
            Image: 'https://s3-us-west-2.amazonaws.com/decomprasimg/home/banner3.jpg',
            Url: 'https://google.com'
          }
        ],
        UltimosAdheridos: UltimosAdheridos,
        OfertasDestacadas:[
          {
            Image: 'http://www.cordobashopping.com.ar/img/promos/1462371578_web_815x380_sinlegal-01.jpg',
            Url: 'https://google.com.ar'
          },
          {
            Image: 'http://www.cordobashopping.com.ar/img/promos/1462212638_my-card_slide_973x400_home1.png',
            Url: 'https://google.com.ar'
          }
        ],
        Favoritos: [
          {
            Label: 'Otoño',
            Items: [
              {
                Image: 'http://www.cordobashopping.com.ar/img/home/sliderprincipal/1457700961_cs_otinbannerhome_973x400px_orig-01.png',
                Precio: 550.00
              },
              {
                Image: 'https://romariofuentes22.files.wordpress.com/2014/05/4-for-8-worth-of-coffee-drinks-tea-smoothies-and-wine-at-cafe-mocha_fixedheight_display_image.jpg',
                Precio: 70.00
              },
              {
                Image: 'https://i.ytimg.com/vi/PyOFwjLmwDQ/maxresdefault.jpg',
                Precio: 99.90
              },
              {
                Image: 'http://www.nunatakmountain.com.ar/uploads/////////images/productos/libo_sherpa.jpg',
                Precio: 1390.00
              },
            ]
          },
          {
            Label: 'Mis Favoritos',
            Items: [
              {
                Image: 'https://rscustoms.files.wordpress.com/2013/03/blue-custom-roller-skates.jpg',
                Precio: 1730.00
              },
              {
                Image: 'http://imshopping.rediff.com/imgshop/800-1280/shopping/pixs/13643/s/skateboard._kamachi-roller-skate-board.JPG',
                Precio: 999.00
              },
              {
                Image: 'http://media.mxtotal.com/catalog/product/cache/1/small_image/300x400/9df78eab33525d08d6e5fb8d27136e95/2/2/22947.jpg',
                Precio: 349.00
              },
              {
                Image: 'http://www.windusados.com.ar/img/eventos/remera_manga_larga_rip_curl_hotskin_titanium_lined_talle_l_2.jpg',
                Precio: 500.00
              },
            ]
          },
          {
            Label: 'Tendencia',
            Items: [
              {
                Image: 'http://d243u7pon29hni.cloudfront.net/images/products/palo-bluetooth-para-selfies-ksix-negro-1258864_l.png',
                Precio: 280.00
              },
              {
                Image: 'https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iphone/iphone-iphone6plus-colors.jpg',
                Precio: 11000.00
              },
              {
                Image: 'http://images.ar.netshoes.net/ar/produtos/38/002-0175-038/002-0175-038_zoom1.jpg',
                Precio: 600.00
              },
              {
                Image: 'http://www.mundopremier.com/files/Product/Images/Hi-Res/2013/TV-5049LED.jpg',
                Precio: 6890.00
              },
            ]
          }
        ]
      });
    }
  });
  
};
/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
