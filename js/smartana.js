var uniqueID = null;

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(aIndex) {
  // This is a sample server that supports CORS.
  if (uniqueID == null) {
    uniqueID = Math.floor(Math.random() * 10000000);
  }

  var url = 'https://skyscannerplus.herokuapp.com/answer/' + uniqueID + '&' + encodeURIComponent(document.getElementById("questionText").value);

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    document.getElementById('a' + aIndex).innerHTML = text;
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

// Synthesizer part -----------------------
