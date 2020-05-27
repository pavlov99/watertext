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

  /** Copy form parameters to clipboard. */
  function copyParametersClipboard() {
    var input = window.document.createElement('textarea');
    window.document.body.appendChild(input);
    input.value = JSON.stringify(getFormParameters());
    input.focus();
    input.select();
    window.document.execCommand('Copy');
    input.remove();
  }

  function watermarkImage() {
    var options = getFormParameters();
    var el = window.document.getElementById('origImage');
    var elWatermarked = window.document.getElementById('watermarkedImage');

    watertext(el.src, options, function (err, src) {
      elWatermarked.src = src

      // update the "download" link.
      // NOTE: this mixes watermarking and downloading functionality but given
      // small codebase, this is OK.
      window.document.getElementById('download').href = src;
    });
  };

  function watermarkSelectedFile(file) {
    var reader = new FileReader();
    reader.onload = function() {
      var el = window.document.getElementById('origImage');
      var url = window.URL.createObjectURL(file);
      el.src = url;

      watermarkImage();
    }
    reader.readAsDataURL(file);
  }

  function dragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragOver(e) {
    e.dataTransfer.dropEffect = 'move';
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    watermarkSelectedFile(file);
  }

  function selectFile() {
    window.document.getElementById('selectedFile').click();
  }

  function handleSelectedFile() {
    var file = window.document.getElementById('selectedFile').files[0];
    watermarkSelectedFile(file);
  }

  // Events: form with library parameters
  window.document.getElementsByTagName('form')[0]
    .addEventListener('change', watermarkImage, {passive: true});
  window.document.getElementById('submit')
    .addEventListener('click', copyParametersClipboard);

  // Events: Select own image
  window.document.getElementById('selectFile')
    .addEventListener('click', selectFile)
  window.document.getElementById('selectedFile')
    .addEventListener('change', handleSelectedFile)

  // Events: drag-n-drop functionality
  window.document.getElementById('origImage')
    .addEventListener("dragenter", dragEnter, false);
  window.document.getElementById('origImage')
    .addEventListener("dragover", dragOver, false);
  window.document.getElementById('origImage')
    .addEventListener("drop", drop, false);

  watermarkImage();
})()
