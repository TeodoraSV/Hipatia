//------------------------------------------------------BACKGROUND-------------------------------------------------------------
//------------------------------------------------Left side of background-------------------------------------------------------
var sketch1 = function (p) {
  var x = 100;
  var y = 100;
  p.setup = function () {
    var canvas = p.createCanvas(p.windowWidth / 2 - 320, p.windowHeight - 60);
    canvas.parent('#sketch1');
    canvas.position(50, 60);
  };

  p.draw = function () {

    p.noStroke();
    for (var x = 25; x < p.width; x += 200) {
      for (var y = 25; y < p.height; y += 200) {
        p.fill(50, 100, p.random(0, 255), 20);
        p.ellipse(x + p.random(-10, 10), y + p.random(-10, 10), p.random(5, 30), p.random(5, 30));
      }
    }
  };
};
//---------------------------------------------------Right side of background------------------------------------------------
var sketch3 = function (p) {
  var x = 100;
  var y = 100;
  p.setup = function () {
    var canvas = p.createCanvas(p.windowWidth / 2 - 320, p.windowHeight - 60);
    canvas.parent('#sketch1');
    canvas.position(p.windowWidth / 2 + 320 + 30, 60);
  };

  p.draw = function () {
    p.noStroke();
    for (var x = 25; x < p.width; x = x + 200) {
      for (var y = 25; y < p.height; y = y + 200) {
        p.fill(50, 100, p.random(0, 255), 20);
        p.ellipse(x + p.random(-10, 10), y + p.random(-10, 10), p.random(5, 30), p.random(5, 30));
      }
    }
  };
};
//------------------------------------------------------------Video effect-----------------------------------------------------------
var sketch2 = function (p) {
  var video;
  var vScale = 16;
  var particles = [];
  var b;
  var slider;
  //-------------------------------------SETUP-----------------------------------------------
  p.setup = function () {
    var canvas = p.createCanvas(640, 480);
    canvas.parent("#sketch2");
    canvas.position(p.windowWidth / 2 - 320, 300)
    p.pixelDensity(1);
    video = p.createCapture(p.VIDEO);
    video.size(p.width / vScale, p.height / vScale);
    video.hide();
    for (var i = 0; i < 200; i++) {
      particles[i] = new p.Particle(p.random(p.width), p.random(p.height));
    }
    slider = p.createSlider(0, 255, 127);
    p.background(51);
    //--------------------------------------------------------Geolocation-----------------------------------------------
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
  //---------------------------------------DRAW-----------------------------------------------
  p.draw = function () {
    video.loadPixels();
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].show();
    }
  };
  p.Particle = function (x, y) {
    this.x = x;
    this.y = y;
    this.r = p.random(4, 32);

    this.update = function () {
      this.x += p.random(-10, 10);
      this.y += p.random(-10, 10);

      this.x = p.constrain(this.x, 0, p.width);
      this.y = p.constrain(this.y, 0, p.height);
    };

    this.show = function () {
      p.noStroke();
      var px = p.floor(this.x / vScale);
      var py = p.floor(this.y / vScale);
      var col = video.get(px, py);
      //console.log(col);
      p.fill(col[0], col[1], col[2], slider.value());
      p.ellipse(this.x, this.y, this.r, this.r);
    };
  };
};

var myFirstSketch = new p5(sketch1);
var mySecondSketch = new p5(sketch2);
var myThirdSketch = new p5(sketch3);