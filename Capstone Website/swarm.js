let shapePoints = [];
let particles = [];
let stoppedParticles = [];
let shapeIsFilled = false;
let coveredArea = 0;
let totalArea = 0;
let threshold = 0.99; // Adjust threshold here
let canvasWidth = 1200; // Adjust canvas width here
let canvasHeight = 900; // Adjust canvas height here
let particleSize = 160; // Adjust particle size here
let shapeSize;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  particleSize = floor(min(width, height) /5); // Adjust particle size based on canvas size
  shapeSize = floor(min(width, height)/2); // Adjust shape size based on canvas size
  generateShape();
  calculateTotalArea();
  generateParticles(floor(totalArea / (particleSize * particleSize)) + floor(particleSize / 20));
}

function draw() {
  background(255);
  
  // Draw shape outline
  beginShape();
  stroke(0);
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

  // Display stopped particles
  for (let i = 0; i < stoppedParticles.length; i++) {
    stoppedParticles[i].display();
  }
  
  // Check if the shape is filled
  if (!shapeIsFilled && coveredArea / totalArea >= threshold) {
    shapeIsFilled = true;
    fill(155);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Shape filled! Click to reset.", width / 2, height / 2);
  }
}

function generateShape() {
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
    totalArea += (shapePoints[i].x * shapePoints[i+1].y - shapePoints[i+1].x * shapePoints[i].y);
  }
  totalArea += (shapePoints[shapePoints.length-1].x * shapePoints[0].y - shapePoints[0].x * shapePoints[shapePoints.length-1].y);
  totalArea = abs(totalArea) / 2;
}

function mouseClicked() {
  if (shapeIsFilled) {
    resetGame();
    return;
  }
  
  for (let i = particles.length - 1; i >= 0; i--) {
    if (dist(mouseX, mouseY, particles[i].pos.x, particles[i].pos.y) < particleSize / 2 && !particles[i].isStopped() && insideShape(particles[i].pos)) {
      stoppedParticles.push(new Particle(particles[i].pos.x, particles[i].pos.y));
      particles.splice(i, 1);
      coveredArea += sq(particleSize);
      //generateNewParticle(mouseX, mouseY);
    }
  }
}

function generateNewParticle(x, y) {
  let closestEmptySpot = getClosestEmptySpot(createVector(x, y));
  particles.push(new Particle(closestEmptySpot.x, closestEmptySpot.y));
  //coveredArea += sq(particleSize);
}

function resetGame() {
  shapeIsFilled = false;
  coveredArea = 0;
  particles = [];
  stoppedParticles = [];
  generateParticles(floor(totalArea / (particleSize * particleSize)) + floor(particleSize / 10));
}

function getClosestEmptySpot(point) {
  let minDist = Infinity;
  let closestSpot;
  for (let i = 0; i < shapePoints.length; i++) {
    let d = point.dist(shapePoints[i]);
    if (!isSpotOccupied(shapePoints[i]) && d < minDist) {
      minDist = d;
      closestSpot = shapePoints[i];
    }
  }
  return closestSpot;
}

function isSpotOccupied(point) {
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].pos.dist(point) < particleSize) {
      return true;
    }
  }
  for (let i = 0; i < stoppedParticles.length; i++) {
    if (stoppedParticles[i].pos.dist(point) < particleSize) {
      return true;
    }
  }
  return false;
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.acc = createVector(0, 0);
    this.area = sq(particleSize); // Area of the circle with radius particleSize / 2
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
    fill(0);
    ellipse(this.pos.x, this.pos.y, particleSize, particleSize);
  }
  
  isStopped() {
    return this.stopped;
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