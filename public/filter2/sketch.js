//---------------------------------------------------BACKGROUND-------------------------------------------------------------
//------------------------------------------Left side of background------------------------------------------------
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

//---------------------------------------------------Right side of background----------------------------------------------
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
//----------------------------------------------------------Video effect-----------------------------------------------------------
var sketch2 = function (p) {
  let video;
  let vScale = 20;

  // array of buttons
  let buttonsArray = [];

  //for loop variables
  let sizeButton = vScale + 1;
  let startingPoint = vScale / 2;
  let spacing = vScale;
  let speed = 9;
  //-----------------------------------------------------------SETUP-----------------------------------------------
  p.setup = function () {

    var canvas = p.createCanvas(640, 480);
    canvas.parent("#sketch2");
    canvas.position(p.windowWidth / 2 - 320, 320);
    p.pixelDensity(1);
    video = p.createCapture(p.VIDEO);
    video.size(p.width / vScale, p.height / vScale);


    p.rectMode(p.CENTER);
    video.hide();
    for (let columns = startingPoint; columns < p.height; columns += spacing) {
      for (let row = startingPoint; row < p.width; row += spacing) {
        buttonsArray.push(new Buttons(row, columns, sizeButton, speed));
      }
    }
    let instructions = p.createElement(
      "h2",
      "Click and drag mouse over the circles"
      
    );
    
    
  //----------------------------------------------Geolocation-----------------------------------------
  let lat, lon;
  const button = document.getElementById('submit');
  
  //------------------------------------------Entering in database--------------------------------------
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
    p.background(51);

  video.loadPixels();
  p.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {

      let i = (x + y * video.width) * 4;
      
      let r = video.pixels[i + 0];
      let g = video.pixels[i + 1];
      let b = video.pixels[i + 2];

      p.fill(r, g, b);
      p.noStroke();

      p.ellipse(x * vScale + startingPoint, y * vScale + startingPoint, vScale, vScale);
    }
  }

  for (i = 0; i < buttonsArray.length; i++) {

    buttonsArray[i].move();
    buttonsArray[i].blackCircle();

    buttonsArray[i].button();

  }
  };

  //----------------------------------------BUTTONS--------------------------------------------
  class Buttons {

  constructor(xpos, y, diameter, _speed) {

    this.isPressed = false;
    this.xpos = xpos;
    this.y = y;
    this.diameter = diameter;

    this.c_motion_xpos = xpos;
    this.c_motion_y = y;
    this.c_motion_diameter = diameter;
    this._speed = _speed;
    this.gotColor = false;
    
    this.pixelColor = p.color(51,51,51);

    
  }

  button() {
    p.noFill();

    let distance = p.dist(p.mouseX, p.mouseY, this.xpos, this.y);
    this.radius = this.diameter / 2;

    if (p.mouseIsPressed) {
      if (distance < this.radius) {
        
        this.isPressed = true;
      }

    }

    p.circle(this.xpos, this.y, this.diameter);

  }

  blackCircle(xpos, y, diameter) {
    if (this.isPressed) {
      p.fill(51);
      p.circle(this.xpos, this.y, this.diameter);
    }
  }

  move(xpos, y, diameter) {
    
    if (this.isPressed) {
      
      if(this.gotColor == false){
        
        this.pixelColor = p.get(p.mouseX,p.mouseY);
        
        this.gotColor = true;
      }
      
      if (this.c_motion_y < p.height - 10) {
        
        this._speed = this._speed++;
        this.c_motion_y += this._speed;
      }
      
      p.fill(this.pixelColor);
      
      p.ellipse(this.c_motion_xpos, this.c_motion_y, this.c_motion_diameter, this.c_motion_diameter);
    }
 
  }

}
};

var myFirstSketch = new p5(sketch1);
var mySecondSketch = new p5(sketch2);
var myThirdSketch = new p5(sketch3);
