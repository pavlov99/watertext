# Watertext - text watermarking library

[![CircleCI](https://circleci.com/gh/pavlov99/watertext/tree/master.svg?style=svg)](https://circleci.com/gh/pavlov99/watertext/tree/master)
[![API Doc](https://doclets.io/pavlov99/watertext/master.svg)](https://doclets.io/pavlov99/watertext/master)

### Features
* Zero dependencies library, works with NodeJS and in the browser.
* 1.7kb minified (481B gzipped) version.

### Quickstart
1. Install library:
```bash
npm install --save watertext
```
2. Watermark regular image with awesome text:
```javascript
var el = document.getElementsByTagName('img')[0];

// Version 1: callback based (watertext.core.umd.min.js)
watertext(el.src, {text: 'Awesome cat'}, function(err, src){
  el.src = src;
});
// Version 2: promise based (watertext.umd.min.js)
watertext(el.src, {text: 'Awesome cat'})
  .then(function(url){el.src = url;});
```
| Original image | Watermarked image |
|:---:|:---:|
| ![orig-image](./demo/cat.jpeg) | ![watermarked-image](./demo/watermarkedCat.jpeg) |

### Versions
There are two main versions:
1. Callback-based vanilla js core.
2. Promise-based (via core-js polyfill) regular.

Depending on usage, there are 3 build options: CommonJS, ES6 module and [UMD](https://github.com/umdjs/umd) library. All build are handled by [rollup](https://github.com/rollup/rollup). Backend specific versions (CommonJS and ES6 module) are not minified (~5 Kb) and browser specific UMD comes in minified version only (~1.7 Kb).

| Name | CommonJS | ES6 module | UMD |
|---|---|---|---|
| Core (Callback based) | watertext.core.cjs.js | watertext.core.esm.js | watertext.core.umd.min.js |
| Regular (Promise based) | watertext.cjs.js | watertext.esm.js | watertext.umd.min.js |

### Development
The library is tiny and the whole source code is in `index.js` file. It uses ES6 syntax with [AirBnB style-guide](https://github.com/airbnb/javascript). Make sure to `eslint` your code and write jsdoc for every method.

##### Supported Browsers
```bash
npx browserslist
```

### Deployment
Webpack builds both regular and minified versions to `dist` folder. It uses [rollup](https://github.com/rollup/rollup) + [bublé](https://github.com/Rich-Harris/buble) because they are faster than webpack + buble and result into smaller build size (~30% reduction).
```bash
yarn build
```

Publish new version with `yarn`:
```bash
yarn publish
```

### Watermarking options
All of the parameters except `text` are optional. By default, the watermark is placed at the bottom of the image with 10px margin.

| Name | Type | Default | Description |
|---|---|---|---|
| text | string | '' | Watermark text. |
| textWidth | number | undefined | Width of watermark in pixels. By default watermark uses 100% of the image width if positioned at the top/bottom and 100% of hight if positioned on the left/right. |
| textSize | number | 12 | Watermark text size. |
| textFont | string | 'Sans-serif' | Watermark text font. |
| textColor | string | 'rgb(255, 255, 255)' | Watermark text color. |
| backgroundColor | string | 'rgba(0, 0, 0, 0.4)' | Watermark background color. Default is gray. |
| position | string | 'bottom' | Position of watermark text, one of "top", "left", "right" or "bottom". |
| margin | number | 10 | Margin from the nearest edge. Negative margin positions watermark at the opposite edge. Useful for text orientation control for "left" and "right" positioning. |

### Links

* [base64 to image](https://codebeautify.org/base64-to-image-converter) converter.
* [image to base64](https://www.base64-image.de/) converter.

### Acknowledgement

* [baivong/watermark](https://github.com/baivong/watermark) library hugely inspired this project. While there are a lot of similarities, this library does not require jQuery to watermark images.
* [brianium/watermarkjs](https://github.com/brianium/watermarkjs) good multi-purpose watermarking library, inspired ES6 adoption and Webpack usage.
* [Cat image](https://www.pexels.com/photo/adorable-animal-animal-photography-blur-259803/) is provided by [pexels](https://www.pexels.com/).
