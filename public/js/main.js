var STATUS_OK = 200;

function pullPhotos(username, callback) {
  console.log("here");
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(event) {
    if (request.status === STATUS_OK) {
      callback(null, request.responseText); 
    } else {
      callback(request.responseText, null); 
    }
  });
  request.open('GET', 'http://localhost:3000/user?username=' + username);
  request.send();
}

$("#leggo").click(function() {
  pullPhotos($("#username").val(), function(error, info) {
    try {
      var json = JSON.parse(info);
      var val = getRandomIntInclusive(0, 20);
      var val2 = getRandomIntInclusive(0, 20);
      while(val2 == val) val2 = getRandomIntInclusive(0, 20);
      console.log(json.items[val].images.standard_resolution.url);
      editImage(json.items[val].images.standard_resolution.url); 
      console.log(json.items[val2].images.standard_resolution.url);
      editImage2(json.items[val2].images.standard_resolution.url);  
    } catch (e) {
      console.log("fail");
      var i = info.indexOf("\"standard_resolution\"\: \{\"url\"\: \"");
      var s1 = info.substring(i+32); 
      var i2 = s1.indexOf("\""); 
      var URL = s1.substring(0, i2); 
      console.log(URL); 
      editImage(URL);

      var i = s1.indexOf("\"standard_resolution\"\: \{\"url\"\: \"");
      var s2 = s1.substring(i+32); 
      var i2 = s2.indexOf("\""); 
      var URL = s2.substring(0, i2); 
      console.log(URL); 
      editImage2(URL);
    }
  });
});

function editImage(url) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  // $("#login").remove();
  // $("#banner").remove();
  img.onload = function() {
    draw(this);
  };
}


function draw(img) {
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

  var fuck = function() {
    for (var i = 0; i < data.length; i += 4) {
      // var avg = (data[i] + data[i +1] + data[i +2]) / 3;
      data[i]     += 30; // red
      data[i + 1] += 30; // green
      data[i + 2] += 30; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };
  // $("body").css('background-color', 'black'); 
  // $("#banner").remove(); 
  // fuck();
}

function editImage2(url) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  // $("#login").remove();
  // $("#banner").remove();
  img.onload = function() {
    draw2(this);
  };
}


function draw2(img) {
  var canvas2 = document.getElementById('pic2');
  var ctx2 = canvas2.getContext('2d');
  ctx2.drawImage(img, 0, 0, 300, 190);
  var imageData2 = ctx2.getImageData(0,0, img.width, img.height);
  var data2 = imageData2.data;
    
  var fuck = function() {
    for (var i = 0; i < data2.length; i += 4) {
      data2[i] = data2[i+1];     // red
      // data2[i + 1] = 255 - data2[i + 1]; // green
      // data2[i + 2] = 255 - data2[i + 2]; // blue
    }
    ctx2.putImageData(imageData2, 0, 0);
    // ctx2.translate(80);
  };

  var grayscale = function() {
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData2, 0, 0);
  };
  // $("body").css('background-color', 'black'); 
  // $("#banner").remove(); 
  fuck();
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
