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
    speak(text);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

// Synthesizer part -----------------------

function speak(message) {
  var msg = new SpeechSynthesisUtterance(message);
  msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Samantha'; })[0];
  speechSynthesis.speak(msg);
}

if (annyang) {

  // Speech recognition with commands
  var commands = {
    // annyang will capture anything after a splat (*) and pass it to the function.
    // e.g. saying "Show me Batman and Robin" is the same as calling showFlickr('Batman and Robin');
    'show me *tag': showFlickr,

    // A named variable is a one word variable, that can fit anywhere in your command.
    // e.g. saying "calculate October stats" will call calculateStats('October');
    'calculate :month stats': calculateStats,

    // By defining a part of the following command as optional, annyang will respond to both:
    // "say hello to my little friend" as well as "say hello friend"
    'say hello (to my little) friend': greeting,

    '*everything': writeToConsole
  };

  var showFlickr = function(tag) {
    var url = 'http://api.flickr.com/services/rest/?tags='+tag;
    $.getJSON(url);
  }

  var calculateStats = function(month) {
    $('#stats').text('Statistics for '+month);
  }

  var greeting = function() {
    $('#greeting').text('Hello!');
  }

  var writeToConsole = function(everything) {
    console.log(everything);
  }

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
