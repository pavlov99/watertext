/**
 * Image watermarking with text.
 *
 * @author Kirill Pavlov <k@p99.io>
 * @copyright Copyright (c) 2017, Kirill Pavlov
 * @license MIT
 */

import watertextCallback from './core';

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
