/*
Need to modify to save the states of each field and to load those states when refreshed.
*/


let savedData = JSON.parse(localStorage.getItem('thirdThingData'));   //load saved data

let patches = [];
let currentPatch = null;
let rows = 4;
let cols = 4;
let plantButton, waterButton, harvestButton;
let action = "none";

let seed = savedData.Acorns;
let score = savedData.Score;
let water = savedData.Water;
let tools = savedData.Tools;

function setup() {
  createCanvas(800, 600);
  // Creating patches of dirt
  let spacingX = width / (cols + 1);
  let spacingY = height / (rows + 1);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      patches.push(new Patch((j + 1) * spacingX, (i + 1) * spacingY, spacingX, spacingY));
    }
  }
  // Creating buttons

  backButton = createButton('Gallery');
  backButton.style('font-size', 30 + 'px');
  backButton.size(110, 50);
  backButton.position(width * 0.75, height*0.9);
  //backButton.hide();
  backButton.mouseClicked(toMain);

  plantButton = createButton("Plant");
  plantButton.style('font-size', 30 + 'px');
  plantButton.size(110, 50);
  plantButton.position(20, 10);

  waterButton = createButton("Water");
  waterButton.style('font-size', 30 + 'px');
  waterButton.size(110, 50);
  waterButton.position(140, 10);

  harvestButton = createButton("Harvest");
  harvestButton.style('font-size', 29 + 'px');
  harvestButton.size(110, 50);
  harvestButton.position(260, 10);

  if (seed > 0){
  plantButton.mousePressed(() => {
    action = "plant";
  });}
  if (tools > 0){
  harvestButton.mousePressed(() => {
    action = "harvest";
  });}
  if (water > 0){
  waterButton.mousePressed(() => {
    action = "water";
  });}
}

function draw() {
  background(220);

  // Displaying patches
  for (let patch of patches) {
    patch.display();
    patch.grow();
    if (patch.curSize == round(patch.maxSize/2))
    {
      patch.watered = false;
      this.plotColor = color(150, 75, 0);
    }
  }

  // Displaying current patch
  if (currentPatch !== null) {
    currentPatch.highlight();
  }

  // Displaying action
  fill(0);
  textSize(16);
  switch(action)
  {
    case 'plant':
      currentAction = 'plant: ' + seed;
      break;
    case 'water':
      currentAction = 'water: ' + water;
      break;
    case 'harvest':
      currentAction = 'harvest: ' + tools;
      break;
    default:
      currentAction = 'None';
  }

  noStroke();
  textSize(30);
  text(currentAction, 450, 45);

  if (seed == 0 && water == 0 && tools == 0)
    {
      action = 'None';
    }
}

function toMain()
{
  window.location.assign('index.html');
}

function mouseClicked() {
  // Checking if mouse is over a patch
  for (let patch of patches) {
    if (patch.contains(mouseX, mouseY)) {
      currentPatch = patch;
      if (action === "plant" && seed > 0) {
        currentPatch.plantSeed();
        seed--;
      } else if (action === "water" && water > 0) {
        currentPatch.water();
        water--;
      } else if (action === "harvest" && tools > 0) {
        currentPatch.harvest();
        tools--;
      }
      return;
    }
  }
  currentPatch = null;
}

class Patch {
  constructor(x, y, sizeX, sizeY) {
    this.x = x;
    this.y = y;
    this.planted = false;
    this.watered = false;
    this.grown = false;
    this.curSize = 0;
    this.plotSizeX = sizeX - 10;
    this.plotSizeY = sizeY - 10;
    this.maxSize = min(this.plotSizeX, this.plotSizeY) - 20;
    this.plotColor = color(150, 75, 0);
  }

  contains(x, y) {
    return (
      x > this.x - this.plotSizeX / 2 &&
      x < this.x + this.plotSizeX / 2 &&
      y > this.y - this.plotSizeY / 2 &&
      y < this.y + this.plotSizeY / 2
    );
  }

  display() {
    stroke(0);
    strokeWeight(1);
    fill(this.plotColor);
    rectMode(CENTER);
    rect(this.x, this.y, this.plotSizeX, this.plotSizeY);
    if (this.planted)
    {
        this.plotColor = color(170, 80, 35);
        if (this.watered) 
        {
          this.plotColor = color(100, 70, 35);
        }
        if (this.curSize > 0)
        {
          fill(0, 255, 0);
          ellipse(this.x, this.y - 5, this.curSize, this.curSize);
        }
    }  
  }

  highlight() {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(5);
    rectMode(CENTER);
    rect(this.x, this.y, this.plotSizeX, this.plotSizeY);
  }

  plantSeed() {
    this.planted = true;
  }

  water() {
    if (this.planted) {
      this.watered = true;
    }
  }

  harvest() {
    if (this.grown) {
      // Harvesting the crop
      this.planted = false;
      this.watered = false;
      this.grown = false;
      this.curSize = 0;
      this.plotColor = color(150, 75, 0);
    }
  }

  grow() {
    if (this.planted && this.watered && !this.grown) {
      this.curSize++;
      if (this.curSize > this.maxSize) {
        this.grown = true;
        this.curSize = this.maxSize;
      }
    }
  }
}
