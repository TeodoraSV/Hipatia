//----------------------------------------------------------BACKGROUND-------------------------------------------------------------
//---------------------------------------------------Left side of background------------------------------------------------
var sketch1 = function (p) {
  var x = 100;
  var y = 100;
  p.setup = function () {
    var canvas = p.createCanvas(p.windowWidth / 2 - 320, p.windowHeight - 50);
    canvas.parent("#sketch1");
    canvas.position(0, 54);
  };

  p.draw = function () {
    p.noStroke();
    for (var x = 25; x < p.width; x += 200) {
      for (var y = 25; y < p.height; y += 200) {
        p.fill(50, 50, p.random(0, 50), 20);
        p.ellipse(
          x + p.random(-10, 10),
          y + p.random(-10, 10),
          p.random(5, 30),
          p.random(5, 30)
        );
      }
    }
  };
};

//------------------------------------------------Right side of background----------------------------------------------
var sketch3 = function (p) {
  var x = 100;
  var y = 100;
  p.setup = function () {
    var canvas = p.createCanvas(p.windowWidth / 2 - 320, p.windowHeight - 50);
    canvas.parent("#sketch1");
    canvas.position(p.windowWidth / 2 + 320, 54);
  };

  p.draw = function () {
    p.noStroke();
    for (var x = 25; x < p.width; x = x + 200) {
      for (var y = 25; y < p.height; y = y + 200) {
        p.fill(50, 50, p.random(0, 50), 20);
        p.ellipse(
          x + p.random(-10, 10),
          y + p.random(-10, 10),
          p.random(5, 30),
          p.random(5, 30)
        );
      }
    }
  };
};
//-----------------------------------------------Video effect-----------------------------------------------------------
var sketch2 = function (p) {
  var video;

  var vScale = 16;
//----------------------------------------------------SETUP-----------------------------------------------
  p.setup = function () {
    var canvas = p.createCanvas(640, 480);
    canvas.parent("#sketch2");
    canvas.position(p.windowWidth / 2 - 320, 300);
    p.pixelDensity(1);

    p.pixelDensity(1);
    video = p.createCapture(p.VIDEO);
    video.size(p.width / vScale, p.height / vScale);
    video.hide();

 //----------------------------------------------Geolocation-----------------------------------------
  let lat, lon;
  const button = document.getElementById('submit');
  button.addEventListener('click', async event => {
    const mood = document.getElementById('mood').value;
    canvas.loadPixels();
    const image64 = canvas.elt.toDataURL();
    //const image64 = video.canvas.toDataURL();
    const data = { lat, lon, mood, image64 };
    //const data = { lat, lon,mood};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
  });

  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat, lon);
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
    });
  } else {
    console.log('geolocation not available');
  }
    };
   //--------------------------------------DRAW FUNCTION----------------------------------
  p.draw = function () {
   p.background(51);

  video.loadPixels();
  p.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + y * video.width) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 3;

      var w = p.map(bright, 0, 255, 0, vScale);

      p.noStroke();
      p.fill(255);
      p.rectMode(p.CENTER);
      p.rect(x * vScale, y * vScale, w, w);
    }
  }
};
};
var myFirstSketch = new p5(sketch1);
var mySecondSketch = new p5(sketch2);
var myThirdSketch = new p5(sketch3);

