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

/**
 * Image watermarking with text.
 *
 * @author Kirill Pavlov <k@p99.io>
 * @copyright Copyright (c) 2017, Kirill Pavlov
 * @license MIT
 */
var defaultOptions = {
  // Watermark image options
  text: '',
  textWidth: undefined,
  textSize: 12,
  textFont: 'Sans-serif',
  textColor: 'rgb(255, 255, 255)',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  // Watermark positioning options
  position: 'bottom',
  // top | left | right | bottom
  margin: 10
};
/**
 * Get canvas object with image corresponding to src.
 *
 * @param {string} - an image source url or file path.
 * @returns {Canvas} - a canvas object with image defined by src.
 */

var getResourceCanvas = function getResourceCanvas(src) {
  var img = window.document.createElement('img');
  img.src = src;
  var canvas = window.document.createElement('canvas');
  canvas.height = img.height;
  canvas.width = img.width;
  canvas.getContext('2d').drawImage(img, 0, 0);
  return canvas;
};
/**
 * Return watermark canvas object to be placed on top of the image.
 *
 * @param {Object} options - a configuration object.
 * @param {number} options.textWidth - watermark width.
 * @param {number} options.textSize - watermarked text size.
 * @param {string} options.textFont - watermarked text font.
 * @param {string} options.textColor - watermarked text color.
 * @param {string} options.backgroundColor - watermark background color.
 * @returns {Canvas} - a canvas object to be placed on top of the image.
 */


var getWatermarkCanvas = function getWatermarkCanvas(options) {
  var canvas = window.document.createElement('canvas');
  canvas.width = options.textWidth;
  canvas.height = 1.8 * options.textSize;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = options.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = options.textColor;
  ctx.font = "".concat(options.textSize, "px ").concat(options.textFont);
  ctx.textAlign = 'center';
  ctx.fillText(options.text, canvas.width / 2, options.textSize + 2);
  return canvas;
};
/**
 * Place watermark on top of canvas with original image.
 */


var applyWatermark = function applyWatermark(canvas, options) {
  var watermarkCanvas = getWatermarkCanvas(options);
  var ctx = canvas.getContext('2d'); // Move to canvas center.All of the following calculations are relative to it.

  var w = canvas.width / 2;
  var h = canvas.height / 2;
  ctx.translate(w, h); // Shift watermark image 50% to the left regardless canvas orientation.

  var sx = -watermarkCanvas.width / 2;
  var sy;

  switch (options.position) {
    case 'left':
      ctx.rotate(-Math.PI / 2);
      sy = options.margin + (options.margin >= 0 ? -w : w - watermarkCanvas.height);
      break;

    case 'right':
      ctx.rotate(Math.PI / 2);
      sy = options.margin + (options.margin >= 0 ? -w : w - watermarkCanvas.height);
      break;

    case 'top':
      sy = options.margin + (options.margin >= 0 ? -h : h - watermarkCanvas.height);
      break;

    case 'bottom':
      sy = -options.margin + (options.margin >= 0 ? h - watermarkCanvas.height : -h);
      break;

    default:
      throw new Error("Unknown \"position\" option: \"".concat(options.position, "\""));
  }

  ctx.drawImage(watermarkCanvas, sx, sy);
  return canvas;
};
/**
 *
 * @example
 * var el = document.getElementsByTagName('img')[0];
 * el.src = watertext.default(el.src, {text: 'myWatermark'});  // In browser.
 *
 * @param {string} resource - an image url, File object, or Image.
 * @param {Object} options - a configuration object.
 * @param {number} [options.textWidth=<image width>] - watermark width.
 * @param {number} [options.textSize=12] - watermarked text size.
 * @param {string} [options.textFont='Sans-serif'] - watermarked text font.
 * @param {string} [options.textColor='rgb(255, 255, 255)'] - watermarked
 * text color.
 * @param {string} [options.backgroundColor='rgba(0, 0, 0, 0.4)'] - watermark
 * background color.
 * @param {string} [options.position='bottom'] - position of watermark.
 * One of 'top', 'bottom', 'left', 'right'.
 * @param {number} [options.margin=10] - watermark margin from the border.
 * Negarive margin is calculated from the opposite side of the image.
 * @returns {string} - image data URI.
 */


function watertext(resource) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var resourceCanvas = getResourceCanvas(resource);
  var computedOptions = {
    textWidth: ['left', 'right'].includes(options.position) ? resourceCanvas.height : resourceCanvas.width
  };
  var opts = Object.assign({}, defaultOptions, computedOptions, options);
  var canvas = applyWatermark(resourceCanvas, opts);
  var url = canvas.toDataURL();
  return url;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=watertext.js.map