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
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'https://skyscannerplus.herokuapp.com/hello';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    alert('Response from CORS request to ' + text);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

// Synthesizer part -----------------------

// Add command (Short code artisan way)
artyom.on(['Good morning','Good afternoon']).then(function(i){
    switch (i) {
        case 0:
            artyom.say("Good morning, how are you?");
        break;
        case 1:
            artyom.say("Good afternoon, how are you?");
        break;
    }
});

// Smart command (Short code artisan way), set the second parameter of .on to true
artyom.on(['Repeat after me *'] , true).then(function(i,wildcard){
    artyom.say("You've said : " + wildcard);
});

// or add some commands in the normal way

artyom.addCommands([
    {
        indexes: ['Hello','Hi','is someone there'],
        action: function(i){
            artyom.say("Hello, it's me");
        }
    },
    {
        indexes: ['Repeat after me *'],
        smart:true,
        action: function(i,wildcard){
            artyom.say("You've said : "+ wildcard);
        }
    }
]);

// Start the commands !
artyom.initialize({
    lang:"en-GB", // GreatBritain english
    continuous:true, // Listen forever
    soundex:true,// Use the soundex algorithm to increase accuracy
    debug:true, // Show messages in the console
    executionKeyword: "and do it now",
    listen:true // Start to listen commands !
});
