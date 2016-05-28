'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  Comercio = mongoose.model('Comercio'),
  Usuario = mongoose.model('Usuario'),
  multer = require('multer'),
  fs = require('fs'),
  _ = require('lodash'),
  im = require('imagemagick'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.uploadImage = function (req, res) {
  var user = req.user;
  var message = null;
  var dir = './public/uploads/' + req.user._id + '/';
  if (!fs.existsSync(dir))
    fs.mkdirSync(dir);
  fs.writeFile(dir + req.files.file.name, req.files.file.buffer, function (uploadError) {
    if (uploadError) {
      return res.status(400).send({
        message: 'Error al subir la imagen'
      });
    } else {
      res.json({ message:'Imagen subida con éxito', url: 'uploads/' + req.user._id + '/' + req.files.file.name });
    }
  });
};

exports.uploadImage2 = function (req, res) {  
  var message = null;

  var upload = multer({ dest:'./public/uploads/', limits: { fileSize: 1048576 } }).single('newProfilePicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  upload.fileFilter = profileUploadFileFilter;
  upload(req, res, function (uploadError) {    
    if(uploadError) {
      return res.status(400).send({
        message: 'Error al subir la imagen'
      });
    } else {
      res.json({ message:'Imagen subida con éxito', url: '/uploads/' + req.file.filename });
    }
  });
};

// var path = __dirname+'\\test.jpg';

// (function () {
// 	console.log('pat',path);
//   var opt, timeStarted = new Date();
//   im.crop(opt = {
//     srcPath: path,
//     dstPath: 'cropped.jpg',
//     width: 200,
//     height: 90,
//     quality: .3
//   }, function (err, stdout, stderr){
//     if (err) return console.error(err.stack || err);
//     console.log('crop(',opt,') ->', stdout);
//     console.log('Real time spent: '+(new Date() - timeStarted) + ' ms');
//   });
// })();
function crop (image,width,height,quality){
	var path = __dirname.split('modules')[0]+'public/uploads/';
	var dest = path + 'crop/';
    if (!fs.existsSync(dest))
      fs.mkdirSync(dest);
	im.crop({
	  srcPath: path + image,
	  dstPath: dest + dest,
	  width: width,
	  height: height,
	  quality: quality
	}, function(err, stdout, stderr){
		if(err)
			return err;
		else
			return true;
	});
}

exports.crop = function (req, res){
	// console.log('crop',im);
	var path = __dirname.split('modules')[0]+'public/uploads/';
	console.log('path',path,req.body.image);
	var dest = path + 'crop/';
    if (!fs.existsSync(dest))
      fs.mkdirSync(dest);
	im.crop({
	  srcPath: path + req.body.image,
	  dstPath: dest + req.body.dest,
	  width: 256,
	  height: 256,
	  quality: 0.5
	}, function(err, stdout, stderr){		
  	res.json({Result: (err?false:true),Err:err});
	});
	

};