var video;
var vScale = 20;
var cols = 25;
var rows = 20;
var img;

var adverts = [];
var cycleNum = 1;
var j = 0;

function preload(){
  img = loadImage('Like.png');
}

function setup() {
  createCanvas(400,500);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  video.hide();

}

function draw() {
  background(999);
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (x + y * video.width)*4;
      var r = video.pixels[index+0]; //  Red
      var g = video.pixels[index+1]; //  Green
      var b = video.pixels[index+2]; //  Blue
      var a = video.pixels[index+3]; //  Alpha

      var bright = (r+g+b)/3;

      var threshold = 64;

      var checkIndex = x + y * cols;

      image(img,x*vScale, y*vScale, vScale, vScale);
      imageMode(CENTER);
      // Like button

      if (bright > threshold) {
        tint(255,bright)
        console.log('$',x+random(1,1000),'Like');
      } else {
        tint(255,0)
        //number of likes contributing to the Like economy
      }
      for (var i = 0; i < adverts.length; i++) {
        adverts[i].display();
        adverts[i].move();
        adverts[j].fixTimeLoop(cycleNum);
      }

    }
  }
}
// Ideer: for every ($) Like, an advert object appears on the canvas.
// the reason for this is because of the mere presence of the user.
// the user is turned into a like machine which generates a data flow
// from the captured data. The Console is essentialy turned into the like stockmarket
// where you can see each like turned into a commodity, this commodity then
// manifest itself an advertizement which is visable for the user, however the user
// may never discover the hidden stockmarket in the console, and is thus left with
// a mosiac of likes which they may or may not know is generated by themselves and
// controlled via individual pixels captured from their webcam. this unknowningly
// and  uncontrollable presseing of multiple Like button is meant to symbolice
// the way that we interact with social buttons and how we are unaware of it's causalities.
function Advert(x,y) {
  this.x = x;
  this.y = y;

  this.display = function() {
    stroke(1)
    rect(this.x,this.y, 40,24);
  }

  this.move = function() {
    this.x = this.x;
    this.y = this.y;
  }

this.fixTimeLoop = function(num) {
  let n = frameCount % num;
  if (n == 0) {
    j++
    adverts.push(new Advert(random(0,300),random(0,300)));
  }
}
}
