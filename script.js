(function(){
  /** Return parameters Object based on form field values. */
  function getFormParameters() {
    var form = window.document.getElementsByTagName('form')[0];
    var params = {};
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];
      if (field.name && field.value) {
        var value = field.value;
        if (['textWidth', 'textSize', 'margin'].indexOf(field.name) !== -1) {
          value = parseInt(value);
        }
        params[field.name] = value;
      }
    }
    return params;
  };

  function watermarkImage() {
    var options = getFormParameters();
    var el = window.document.getElementById('origImage');
    var elWatermarked = window.document.getElementById('watermarkedImage');
    watertext.default(el.src, options, function(err, data) {
      elWatermarked.src = data;
    });
  };

  function copyParametersClipboard() {
    var input = window.document.createElement('textarea');
    window.document.body.appendChild(input);
    input.value = JSON.stringify(getFormParameters());
    input.focus();
    input.select();
    window.document.execCommand('Copy');
    input.remove();
  }

  window.document.getElementsByTagName('form')[0].addEventListener(
    "change", watermarkImage, {passive: true});
  window.document.getElementById('submit').addEventListener(
    "click", copyParametersClipboard);

  watermarkImage();
})()
