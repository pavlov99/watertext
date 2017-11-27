/**
 * Core functionality of watermarking library.
 * No dependencies, node style callback functions.
 *
 * @author Kirill Pavlov <k@p99.io>
 * @copyright Copyright (c) 2017, Kirill Pavlov
 * @license MIT
 */

const defaultOptions = {
  // Watermark image options
  text: '',
  textWidth: undefined,
  textSize: 12,
  textFont: 'Sans-serif',
  textColor: 'rgb(255, 255, 255)',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',

  // Watermark positioning options
  position: 'bottom', // top | left | right | bottom
  margin: 10,
};

/**
 * Get canvas object with image corresponding to src.
 *
 * @async
 * @param {string} src - an image source url or file path.
 * @param {requestCallback} callback - a callback that handles result resource
 * canvas (defined by @param src) or error.
 */
const getResourceCanvas = function getResourceCanvas(src, callback) {

  const img = window.document.createElement('img');
  img.onload = () => {
    const canvas = window.document.createElement('canvas');
    canvas.height = img.height;
    canvas.width = img.width;
    canvas.getContext('2d').drawImage(img, 0, 0);
    callback(null, canvas);
  };
  img.onerror = e => callback(e);
  img.src = src;
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
const getWatermarkCanvas = function getWatermarkCanvas(options) {
  const canvas = window.document.createElement('canvas');
  canvas.width = options.textWidth;
  canvas.height = 1.8 * options.textSize;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = options.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = options.textColor;
  ctx.font = `${options.textSize}px ${options.textFont}`;
  ctx.textAlign = 'center';
  ctx.fillText(options.text, canvas.width / 2, options.textSize + 2);

  return canvas;
};

/**
 * Place watermark on top of canvas with original image.
 */
const applyWatermark = function applyWatermark(canvas, options) {
  const watermarkCanvas = getWatermarkCanvas(options);

  const ctx = canvas.getContext('2d');
  // Move to canvas center.All of the following calculations are relative to it.
  const w = canvas.width / 2;
  const h = canvas.height / 2;
  ctx.translate(w, h);

  // Shift watermark image 50% to the left regardless canvas orientation.
  const sx = -watermarkCanvas.width / 2;
  let sy;

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
      throw new Error(`Unknown "position" option: "${options.position}"`);
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
 * @param {string} options.text - watermark text.
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
 * @param {requestCallback} callback - a callback that handles result url.
 */
export default function watertext(resource, options, callback) {
  getResourceCanvas(resource, (err, resourceCanvas) => {
    if (err) {
      callback(err);
      return;
    }

    const computedOptions = {
      textWidth: ['left', 'right'].includes(options.position) ? resourceCanvas.height : resourceCanvas.width,
    };
    const opts = Object.assign({}, defaultOptions, computedOptions, options);
    const canvas = applyWatermark(resourceCanvas, opts);
    const url = canvas.toDataURL();
    callback(null, url);
  });
}
