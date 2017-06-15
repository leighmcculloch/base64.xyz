(function(window, document){
  var $encoded, $decoded;

  function initialize() {
    $encoded = document.getElementById('encoded');
    $decoded = document.getElementById('decoded');

    $encoded.addEventListener('input', updateDecoded);
    $decoded.addEventListener('input', updateEncoded);

    updateDecoded();
  }

  function updateDecoded() {
    $decoded.value = atob($encoded.value);
  }

  function updateEncoded() {
    $encoded.value = btoa($decoded.value);
  }

  window.addEventListener("load", initialize);
})(window, document);
