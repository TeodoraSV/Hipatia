//-----------------------------------------------BACKGROUND-------------------------------------------------------------
//-----------------------------------------Left side of background------------------------------------------------
var sketch1 = function (p) {
  var x = 100;
  var y = 100;
  p.setup = function () {
    var canvas = p.createCanvas(p.windowWidth / 2 - 350, p.windowHeight - 50);
    canvas.parent("#sketch1");
    canvas.position(50, 54);
  };

  p.draw = function () {
    p.noStroke();
    for (var x = 25; x < p.width; x += 200) {
      for (var y = 25; y < p.height; y += 200) {
        p.fill(50, 100, p.random(0, 255), 20);
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
    var canvas = p.createCanvas(p.windowWidth / 2 - 400, p.windowHeight - 50);
    canvas.parent("#sketch1");
    canvas.position(p.windowWidth / 2 + 400, 54);
  };

  p.draw = function () {
    p.noStroke();
    for (var x = 25; x < p.width; x = x + 200) {
      for (var y = 25; y < p.height; y = y + 200) {
        p.fill(50, 100, p.random(0, 255), 20);
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

  var x = 0;
  //-------------------------------------------------SETUP---------------------------------------------------
  p.setup = function () {
    var canvas = p.createCanvas(700, 240);
    canvas.parent("#sketch2");
    canvas.position(p.windowWidth / 2 - 400, 300);
     p.pixelDensity(1);
  video = p.createCapture(p.VIDEO);
  video.size(320, 240);
  p.background(51);
  video.hide();
    p.rectMode(p.CENTER);
   
   //--------------------------------------------Geolocation-----------------------------------------------
  let lat, lon;
  const button = document.getElementById('submit');
  button.addEventListener('click', async event => {
    const mood = document.getElementById('mood').value;
    canvas.loadPixels();
    const image64 = canvas.elt.toDataURL();
  
    const data = { lat, lon, mood, image64 };

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
    video.loadPixels();
 

  var w = video.width;
  var h = video.height;

  p.copy(video, w / 2, 0, 1, h, x, 0, 1, h);

  x = x + 1;

  if (x > p.width) {
    x = 0;
  }
};
};
var myFirstSketch = new p5(sketch1);
var mySecondSketch = new p5(sketch2);
var myThirdSketch = new p5(sketch3);
