/**
 * Image watermarking with text.
 *
 * @author Kirill Pavlov <k@p99.io>
 * @copyright Copyright (c) 2017, Kirill Pavlov
 * @license MIT
 */

import watertextCallback from './core';

/** Watermark image and return Promise.
 * @async
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
 * @returns {Promise} promise which resolves into watermarked image base64 url.
 */
export default function watertext(resource, options) {
  return new Promise((resolve, reject) => {
    watertextCallback(resource, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
