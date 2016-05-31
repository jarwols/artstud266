
// window.history.pushState('facebook', 'Title', 'am i pretty?');

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI(response);
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1725244164384140',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI(response) {
  FB.api('/me', 'GET', {"fields":"photos{id}"}, function(response) {
      var val = getRandomIntInclusive(0, 25);
      var val2 = getRandomIntInclusive(0, 25);
      console.log(response.photos.data[val].id);
      FB.api("/" + response.photos.data[val].id + "/picture?height=1000", function (response) {
            if (response && !response.error) {
              editImage(response.data.url, response);
              setTimeout(function(){ location.reload(); }, 10000);
            }
        }
      );
      FB.api("/" + response.photos.data[val2].id + "/picture?height=1000", function (response) {
            if (response && !response.error) {
               editImage2(response.data.url, response);
               setTimeout(function(){ location.reload(); }, 15000);
            }
        }
      );
    }
  );

s
}

function editImage(url, response) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  // $("#login").remove();
  // $("#banner").remove();
  console.log(response);
  img.onload = function() {
    draw(this, response);
  };
}


function draw(img, response) {
  var canvas = document.getElementById('pic');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 300, 190);
  var imageData = ctx.getImageData(0,0, img.width, img.height);
  var data = imageData.data;
    
  var invert = function() {
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = 255 - data[i];     // red
      data[i + 1] = 255 - data[i + 1]; // green
      data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };

  var grayscale = function() {
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };
  // $("body").css('background-color', 'black'); 
  // $("#banner").remove(); 
  // invert();
}

function editImage2(url, response) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  // $("#login").remove();
  // $("#banner").remove();
  console.log(response);
  img.onload = function() {
    draw2(this, response);
  };
}


function draw2(img, response) {
  var canvas2 = document.getElementById('pic2');
  var ctx2 = canvas2.getContext('2d');
  ctx2.drawImage(img, 0, 0, 300, 190);
  var imageData2 = ctx2.getImageData(0,0, img.width, img.height);
  var data2 = imageData2.data;
    
  var invert = function() {
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = 255 - data[i];     // red
      data[i + 1] = 255 - data[i + 1]; // green
      data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };

  var grayscale = function() {
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };
  // $("body").css('background-color', 'black'); 
  // $("#banner").remove(); 
  // invert();
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
