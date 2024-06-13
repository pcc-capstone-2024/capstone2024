const SCREEN_SIZE = 1400; // adjust this to the area you want it to START in, the code later fills the entire display
const NUM_BIRDS = 15; // change this to adjust the number of followers. multiples of 2 or 5 work best 
const CLAMP_VAL = 100; // adjust this to adjust the reactivity of the followers
const MAX_SPEED = 20; // what it says on the tin


const sunSize = 375; // freeball these
const planetSize = 100;
let followCount = 0; // global variable to be used with an iterator later

let movers = []; // the array that holds the movers

let isFullScreen = false; // what it says on the tin
let sunMove = false;

let kinectron;
//          **************** IMAGE STUFF STUFF ****************
let kitten; // "kitten" is whatever image is being used for the leader object. rename if you want to but you shouldnt cause kittens are great
let fish = []; // fish and bird are both arrays that hold images for the follower objects
let bird = []; // you can create as many arrays as you like and switch between them based on scene changes, etc


const ARRAY_SIZE = 100; // **************** STAR MOVER BACKGROUND STUFF ****************
var ranArrX = [ARRAY_SIZE]; // this is older, unmodularized code
var ranArrY = [ARRAY_SIZE]; // if you aren't using the stars, you can take it out
var ranSize = [ARRAY_SIZE]; // ugh this should be a class X#3

/*******************************************************************/

class Target { /*************** ~ Target class ~ ***************/
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = sunSize;
  }
  
  Move() {
    this.pos.x = mouseX;
    this.pos.y = mouseY;
  }
  
  Display() {
    push();
      translate(this.pos.x, this.pos.y);
      //ellipseMode(CENTER);
      imageMode(CENTER);
      //fill(255, 250, 40);
      //circle(0, 0, this.size);
      kitten.resize(this.size, 0); // resizes whatever image you're using to the global size, leave the second argument blank to preserve the original aspect ratio
      image(kitten, 0, 0); // displays the image
    pop();
  }
}

class Mover { /*************** ~ Mover class ~ ***************/
  constructor(x, y, inX, inY, r, g, b, s, n) { 
              //posx, posy, velx, vely, r, g, b, size, and number
    this.pos = createVector(x, y);
    this.vel = createVector(inX, inY);
    this.dif = createVector(0, 0); // tracks the difference in distance between mover object and target object 
    this.size = planetSize + s;
    this.r = r;
    this.g = g;
    this.b = b;
    //this.num = n % 5; // change this number based on the amount of images you want to switch between
    this.num = n % 4;
    this.count = 1; // THIS is only necessary if you have a multi-frame animation you want to play. Comment it out if you only want one image per object.
  }
  
  Seek(target) { // this is all a whole bunch of math, just. trust me on it. but hell if you can optimize it, please do and let me know how
    this.dif = p5.Vector.sub(target.pos, this.pos);
    this.dif.mult(0.001);
    this.vel.add(this.dif);
    this.vel.limit(MAX_SPEED);
    this.vel.add((2 * this.vel/CLAMP_VAL) + (1/CLAMP_VAL));
    this.pos.add(this.vel);
  }
  
  Display() {
    this.count++; 
    this.count %= 4; // see note about variable in constructor
    
    push();
      translate(this.pos.x, this.pos.y);
      //ellipseMode(CENTER);
      imageMode(CENTER);
      let mod = 1 /( abs(this.dif.x + this.dif.y) * 2); // adjusts the color saturation based on distance from the target object
      // fill(this.r * mod, 
      //      this.g * mod, 
      //      this.b * mod); // <- largely deprecated, only used if using shapes instead of imaged
      //circle(0, 0, this.size);
      tint(255 * mod, 255);
      if(this.vel.x < 0) {
        scale(-1, 1) // turns objects around based on their x-acix velocity
      }
      //fish[this.num].resize(60, 0);
      //image(fish[this.num], this.size, 0);
      bird[this.count].resize(planetSize, 0);
      image(bird[this.count], 0, 0);
    pop();
  }
}

/*******************************************************************/

function setup() {
  createCanvas(displayWidth, displayHeight); 
  noCursor(); // cursor is ugly
  
  kinectron = new Kinectron("192.168.1.49");  //change the quotes befoe running the program to the new IP!
  kinectron.makeConnection();                 //connects to the kinect at specified IP address. (must be running Kinectitron software)
  kinectron.startTrackedJoint(kinectron.HEAD, getHeadLoc);

  kitten = loadImage("assets/kitten_leader.png"); // load the target object image
  loadFish(); // these functions load arrays of images for followers, see comments at functions below
  loadBird();
  
  tgt = new Target(SCREEN_SIZE/2, SCREEN_SIZE/2);
  for (i = 0; i < NUM_BIRDS; i++) {
    movers[i] = new Mover(random(SCREEN_SIZE), 
                          random(SCREEN_SIZE),
                          random(-5, 5),
                          random(-5, 5),
                          random(50, 180),
                          random(50, 180),
                          random(0, 255),
                          random(-15, 10),
                          followCount);
    followCount++;
  }
  
  GenRanArray();
}

function draw() {
  background(30);
  push() // **************** STAR MOVING BACKGROUND ****************
  fill(255);
  for(let i = 0; i < ARRAY_SIZE; i++){ 
    circle(ranArrX[i], ranArrY[i], 5 + ranSize[i]);
  }
  for (let y = 0; y < ARRAY_SIZE; y++){
    ranArrY[y] = ranArrY[y] + 1;
    if (ranArrY[y] >= displayHeight) {
      ranArrY[y] = 0;
    }
  }
  pop();
  
  // **************** PLANETS AND SUN **************** 
  if (sunMove) { // checks to see if the target object can be moved or is locked (click)
    tgt.Move();
  }
  
  for (i = 0; i < NUM_BIRDS; i++) { // target objects seek the target object
    movers[i].Seek(tgt); // target object is fed through function, can set up multiple target objects for different followers
  }
  
  for (i = 0; i < 8; i++) { // DISPLAY FIRST HALF OF BIRDS
    movers[i].Display(); // can change the for loop to adjust the number of follower objects you want behind or in front of the target object
  }
  
  tgt.Display(); // displays target object between two follower object draw layers for added and controllable depth
  
  for (j = 8; j < NUM_BIRDS; j++) { // DISPLAY SECOND HALF OF BIRDS
    movers[j].Display();
  }
}

function GenRanArray() { // used for the star background. remove if unused.
  for (let i = 0; i < ARRAY_SIZE; i++){
    ranArrX[i] = random(displayWidth);
    ranArrY[i] = random(displayHeight);
    ranSize[i] = random(-1, 2);
  }
}

function loadFish() { // loads set of images and stores them in various arrays
  for (i = 0; i < 5; i++) {
    fish.push(loadImage("assets/fish" + i + ".png")); // do it like this, trust me
  }
}

function getHeadLoc(head)   //this will tell the program what to do when it detects a head.
{
    tgt.pos.x = head.depthX*width;
    tgt.pos.y = head.depthY*height;
}

function loadBird() {
  for (i = 0; i < 4; i++) {
    bird.push(loadImage("assets/GreyBird" + (i + 1) + ".png")); // PLEASE name objects starting from 0
  }
}

function mouseClicked() {
  sunMove = !sunMove;
}

function keyPressed() {
  if (keyCode === ENTER) { //ENTER resets the followers to a random position
    for (i = 0; i < NUM_BIRDS; i++) {
    movers[i].pos.x = random(SCREEN_SIZE);
    movers[i].pos.y = random(SCREEN_SIZE);
    }
  }
  if (keyCode === UP_ARROW) { // UP ARROW makes the sketch full screen
    isFullScreen = !isFullScreen;
    
    fullscreen(isFullScreen);
  }
}
