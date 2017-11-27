# Watertext - text watermarking library

[![CircleCI](https://circleci.com/gh/pavlov99/watertext/tree/master.svg?style=svg)](https://circleci.com/gh/pavlov99/watertext/tree/master)
[![API Doc](https://doclets.io/pavlov99/watertext/master.svg)](https://doclets.io/pavlov99/watertext/master)

### Features
* Zero dependencies library, works with NodeJS and in the browser.
* 2.3kb minified (76B gzipped) version.

### Quickstart
1. Install library:
```bash
npm install --save watertext
```
2. Watermark regular image with awesome text:
```javascript
var el = document.getElementsByTagName('img')[0];

// Version 1: callback based (watertext.core.js)
watertext.default(el.src, {text: 'Awesome cat'}, function(err, data){
  el.src = data;
});
// Version 2: promise based (watertext.js)
watertext.default(el.src, {text: 'Awesome cat'})
  .then(function(url){el.src = url;});
```
| Original image | Watermarked image |
|:---:|:---:|
| ![orig-image](./demo/cat.jpeg) | ![watermarked-image](./demo/watermarkedCat.jpeg) |

### Versions

There are two main versions:
1. Callback-based vanilla js core.
2. Promise-based (via core-js polyfill) regular.

| Name | regular | minified |
|---|---|---|
| Core (Callback based) | watertext.core.js<br> (8.16 kB) | watertext.core.min.js<br> (2.27 kB)|
| Regular (Promise based) | watertext.js<br> (57.4 kB) | watertext.min.js<br> (20.1 kB) |


### Development
The library is tiny and the whole source code is in `index.js` file. It uses ES6 syntax with [AirBnB style-guide](https://github.com/airbnb/javascript). Make sure to `eslint` your code and write jsdoc for every method.

##### Supported Browsers
```bash
npx browserslist
```

### Deployment
Webpack builds both regular and minified versions to `dist` folder.
```bash
yarn build
```

Publish new version with `npm`:
```bash
npm publish
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
