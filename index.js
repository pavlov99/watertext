const defaultOptions = {
  // Watermark image options
  text: '',
  textWidth: 130,
  textSize: 13,
  textFont: 'Sans-serif',
  textColor: 'rgb(255, 255, 255)',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',

  // Watermark positioning options
  position: 'bottom', // top | left | right | bottom
  margin: 0,
};

/**
 * Get canvas object with image corresponding to src
 */
const getResourceCanvas = function getResourceCanvas(src) {
  const img = window.document.createElement('img');
  img.src = src;

  const canvas = window.document.createElement('canvas');
  canvas.height = img.height;
  canvas.width = img.width;
  canvas.getContext('2d').drawImage(img, 0, 0);

  return canvas;
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
    case 'left': {
      ctx.rotate(-Math.PI / 2);
      sy = options.margin + options.margin >= 0 ? -w : w - watermarkCanvas.height;
      break;
    }
    case 'right': {
      ctx.rotate(Math.PI / 2);
      sy = options.margin + options.margin >= 0 ? -w : w - watermarkCanvas.height;
      break;
    }
    case 'top': {
      sy = options.margin + options.margin >= 0 ? -h : h - watermarkCanvas.height;
      break;
    }
    case 'bottom':
      sy = -options.margin + options.margin >= 0 ? h - watermarkCanvas.height : -h;
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
 * watertext(['http://lorempixel.com/100/100/'], {text: myWatermark})
 *   .then(function(watermarkedImageSrc){
 *     console.log(watermarkedImageSrc)
 *   })
 * @param {string} resource - an image url, File object, or Image.
 * @param {Object} options - a configuration object.
 * @returns {Promise} - a promise that returns image data URI if resolved or an
 * Error if rejected.
 */
export default function watertext(resource, options = {}) {
  const opts = Object.assign({}, defaultOptions, options);
  const canvas = applyWatermark(getResourceCanvas(resource), opts);
  const url = canvas.toDataURL();
  return url;
}
