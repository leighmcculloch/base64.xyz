(function(window, document){
  var $encoded, $decoded;

  function initialize() {
    $encoded = document.getElementById('encoded');
    $decoded = document.getElementById('decoded');

    $encoded.addEventListener('input', encodedUpdated);
    $decoded.addEventListener('input', decodedUpdated);

    var encoded = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    if (encoded.length > 0) {
      $encoded.value = encoded;
    }
    encodedUpdated();
  }

  function encodedUpdated() {
    try {
      $decoded.value = atob($encoded.value);
    } catch (err) {
      console.log($encoded.value + " is not valid base64 encoded.");
    }
    updatePushState($encoded.value)
  }

  function decodedUpdated() {
    $encoded.value = btoa($decoded.value);
    updatePushState($encoded.value)
  }

  function updatePushState(encoded) {
    window.history.pushState(null, null, '#' + encodeURIComponent(encoded));
  }

  initialize();
})(window, document);
