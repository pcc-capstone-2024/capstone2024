let savedData = JSON.parse(localStorage.getItem('thirdThingData'));   //load saved data

let shapePoints = [];
let particles = [];
let shapeIsFilled = false;
let saveScore = false;
let coveredArea = 0;
let totalArea = 0;
let threshold = 0.9; // Adjust threshold here
let canvasWidth = 1200; // Adjust canvas width here
let canvasHeight = 900; // Adjust canvas height here
let particleSize = 100; // Adjust particle size here
let shapeSize;
let shapeColor;
let resetCounter = 0;
let tool = 0;

let backButton;
let restartButton;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  particleSize = floor(min(width, height) / 5); // Adjust particle size based on canvas size
  shapeSize = floor(min(width, height) / 2); // Adjust shape size based on canvas size
  generateShape();
  calculateTotalArea();
  generateParticles(floor(totalArea / (particleSize * particleSize)) + floor(particleSize / 5));
  backButton = createButton('Gallery');
  backButton.style('font-size', 30 + 'px');
  backButton.size(110, 50);
  backButton.position(width * 0.3, height*0.55);
  backButton.hide();
  backButton.mouseClicked(toMain);
  restartButton = createButton('Restart');
  restartButton.style('font-size', 30 + 'px');
  restartButton.size(110, 50);
  restartButton.position(width * 0.55, height*0.55);
  restartButton.hide();
  restartButton.mouseClicked(resetGame);
}

function draw() {
  background(0);

  // Draw shape outline
  beginShape();
  stroke(255);
  noFill();
  for (let i = 0; i < shapePoints.length; i++) {
    vertex(shapePoints[i].x, shapePoints[i].y);
  }
  endShape(CLOSE);

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    particles[i].constrain();
  }

  // Check if the shape is filled
  if (coveredArea / totalArea >= threshold) {
    shapeIsFilled = true;
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Shape filled! Click to reset.", width / 2, height / 2);
    resetCounter++;
    saveFunction();
    backButton.show();
    restartButton.show();
  }
}

function saveFunction()
{
  if (!saveScore)
    {
      tool++;
      print(tool);
      savedData.Tools = tool;
      localStorage.setItem('thirdThingData', JSON.stringify(savedData));
      saveScore  = true;
    }
}

function toMain()
{
  window.location.assign('index.html');
}

function generateShape() {
  shapeColor = createVector(int(random(256)), int(random(256)), int(random(256)));
  let numPoints = floor(random(3, 20)); // Generate a polygon with 5 to 10 points
  for (let angle = 0; angle < TWO_PI; angle += TWO_PI / numPoints) {
    let x = canvasWidth / 2 + cos(angle) * shapeSize;
    let y = canvasHeight / 2 + sin(angle) * shapeSize;
    shapePoints.push(createVector(x, y));
  }
}

function generateParticles(num) {
  for (let i = 0; i < num; i++) {
    let x = random(canvasWidth);
    let y = random(canvasHeight);
    while (!insideShape(createVector(x, y))) {
      x = random(canvasWidth);
      y = random(canvasHeight);
    }
    particles.push(new Particle(x, y));
  }
}

function insideShape(point) {
  let result = false;
  let j = shapePoints.length - 1;
  for (let i = 0; i < shapePoints.length; i++) {
    if ((shapePoints[i].y < point.y && shapePoints[j].y >= point.y || shapePoints[j].y < point.y && shapePoints[i].y >= point.y) &&
      (shapePoints[i].x <= point.x || shapePoints[j].x <= point.x)) {
      if (shapePoints[i].x + (point.y - shapePoints[i].y) / (shapePoints[j].y - shapePoints[i].y) * (shapePoints[j].x - shapePoints[i].x) < point.x) {
        result = !result;
      }
    }
    j = i;
  }
  return result;
}

function calculateTotalArea() {
  totalArea = 0;
  for (let i = 0; i < shapePoints.length - 1; i++) {
    totalArea += (shapePoints[i].x * shapePoints[i + 1].y - shapePoints[i + 1].x * shapePoints[i].y);
  }
  totalArea += (shapePoints[shapePoints.length - 1].x * shapePoints[0].y - shapePoints[0].x * shapePoints[shapePoints.length - 1].y);
  totalArea = abs(totalArea) / 2;
}

function mouseClicked() {
  if (shapeIsFilled && resetCounter >= 60) {
    resetGame();
    return;
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    if (dist(mouseX, mouseY, particles[i].pos.x, particles[i].pos.y) < particleSize / 2 && !particles[i].isStopped() && insideShape(particles[i].pos)) {
      particles[i].stopAndRecolor(shapeColor);
      particles[i].moveAwayFromOtherParticles(i);
      coveredArea += sq(particleSize / 1.5);
      //print("% covered" + coveredArea/totalArea);
      break;
    }
  }
}

function resetGame() {
  shapePoints = [];
  totalArea = 0;
  shapeIsFilled = false;
  coveredArea = 0;
  particles = [];
  resetCounter = 0;
  generateShape();
  calculateTotalArea();
  generateParticles(floor(totalArea / (particleSize * particleSize)) + floor(particleSize / 5));
  saveScore = false;
  restartButton.hide();
  backButton.hide();
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.acc = createVector(0, 0);
    this.area = sq(particleSize); // Area of the circle with radius particleSize / 2
    this.colour = createVector(int(random(256)), int(random(256)), int(random(256)));
    while (dist(shapeColor, this.colour) < 100) {
      this.colour = createVector(int(random(256)), int(random(256)), int(random(256)));
    }
  }

  update() {
    if (!this.stopped) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  }

  display() {
    noStroke();
    fill(this.colour.x, this.colour.y, this.colour.z);
    ellipse(this.pos.x, this.pos.y, particleSize, particleSize);
  }

  isStopped() {
    return this.stopped;
  }

  stopAndRecolor(color) {
    this.stopped = true;
    this.colour = color;
    //this.moveAwayFromOtherParticles();
  }

  moveAwayFromOtherParticles(pNum) {
    let minDist = particleSize*0.75;
    let newPos = this.pos;
    let moved = true;
    while (moved)
    {
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].isStopped() && i != pNum) {
          let d = newPos.dist(particles[i].pos);
          while (d < minDist) {
            minDist = d;
            newPos.x += random(-particleSize, particleSize);
            newPos.y += random(-particleSize, particleSize);
            moved = true;
            d = newPos.dist(particles[i].pos);
          }
        }
        else{
          moved = false;
        }
      }
    }
    this.pos = newPos;
  }

  constrain() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }
}
