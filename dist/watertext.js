(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["watertext"] = factory();
	else
		root["watertext"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = watertext;
var defaultOptions = {
  // Watermark image options
  text: '',
  textWidth: 130,
  textSize: 13,
  textFont: 'Sans-serif',
  textColor: 'rgb(255, 255, 255)',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  // Watermark positioning options
  position: 'bottom',
  // top | left | right | bottom
  margin: 0
};
/**
 * Return watermark canvas object to be placed on top of the image.
 *
 * @param {Object} options - a configuration object.
 * @param {} options.textSize
 * @param {} options.textFont
 * @param {} options.textColor
 * @returns {Canvas} - a canvas object to be placed on top of the image.
 */

var getWatertextCanvas = function getWatertextCanvas() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opts = Object.assign({}, defaultOptions, options);
  var canvas = window.document.createElement('canvas');
  canvas.width = opts.textWidth;
  canvas.height = 1.8 * opts.textSize;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = opts.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = opts.textColor;
  ctx.font = "".concat(opts.textSize, "px Sans-serif");
  ctx.textAlign = 'center';
  ctx.fillText(opts.text, canvas.width / 2, opts.textSize + 2);
  return canvas;
};
/**
 *
 * @example
 * watertext(['http://lorempixel.com/100/100/'], {text: myWatermark})
 *   .then(function(watermarkedImageSrc){
 *     console.log(watermarkedImageSrc)
 *   })
 * @param {string} resource - an image url, File object, or Image.
 * @param {Object} options - a configuration object.
 * @returns {Promise} - a promise that returns image data URI if resolved or an
 * Error if rejected.
 */


function watertext(resource) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var opts = Object.assign({}, defaultOptions, options); // Create new image element based on the resource

  var img = window.document.createElement('img');
  img.src = resource;
  var canvas = window.document.createElement('canvas');
  canvas.height = img.height;
  canvas.width = img.width;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  ctx.drawImage(getWatertextCanvas(opts), 0, 0);
  var url = canvas.toDataURL();
  return url;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=watertext.js.map