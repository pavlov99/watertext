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
 * Return watermark canvas object to be placed on top of the image.
 *
 * @param {Object} options - a configuration object.
 * @param {} options.textSize
 * @param {} options.textFont
 * @param {} options.textColor
 * @returns {Canvas} - a canvas object to be placed on top of the image.
 */
const getWatertextCanvas = function getWatertextCanvas(options = {}) {
  const opts = Object.assign({}, defaultOptions, options);

  const canvas = window.document.createElement('canvas');
  canvas.width = opts.textWidth;
  canvas.height = 1.8 * opts.textSize;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = opts.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = opts.textColor;
  ctx.font = `${opts.textSize}px Sans-serif`;
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
export default function watertext(resource, options = {}) {
  const opts = Object.assign({}, defaultOptions, options);

  // Create new image element based on the resource
  const img = window.document.createElement('img');
  img.src = resource;

  const canvas = window.document.createElement('canvas');
  canvas.height = img.height;
  canvas.width = img.width;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  ctx.drawImage(getWatertextCanvas(opts), 0, 0);

  const url = canvas.toDataURL();
  return url;
}
