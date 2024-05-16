let savedData = JSON.parse(localStorage.getItem('thirdThingData'));   //load saved data

let acornNum = savedData.Acorns;
let difficulty = savedData.PlotsMade;

let player;
let acorns = [];
let obstacles = [];
let score = 0;
let maxAcorns = 10;
let timer = 0;
let maxTime = 15;
let dataToSave = false;

let backButton;
let restartButton;

function setup() {
  createCanvas(600, 400);
  player = new Player();
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
  background(220);

  // Display score and time
  textSize(32);
  fill(0);
  text("Acorns: " + score, 10, 30);
  text("Time Left: " + round(maxTime - timer, 2), width*0.5, 30);

  timer += 0.01;
  if (timer >= maxTime || score >= maxAcorns)
    {
      gameOver();
      timer = maxTime;
      return;
    }
  // Create new acorns randomly
  if (random(1) < 0.03) {
    acorns.push(new Acorn());
  }
  
  // Create new obstacles randomly
  if (random(1) < 0.01) {
    obstacles.push(new Obstacle());
  }
  
  // Update and display acorns
  for (let i = acorns.length - 1; i >= 0; i--) {
    acorns[i].update();
    acorns[i].show();
    
    // Check if acorn is caught
    if (acorns[i].hits(player)) {
      score++;
      acorns.splice(i, 1);
    } else if (acorns[i].offscreen()) {
      acorns.splice(i, 1);
    }
  }
  
  // Update and display obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();
    
    // Check if obstacle hits player
    if (obstacles[i].hits(player)) {
      score = 0; // Reset score if hit
      obstacles.splice(i, 1);
    } else if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }
  
  // Update and display player
  player.show();
  player.update();
}

function gameOver()
{
  textSize(40);
  if(score >= maxAcorns)
  {
    text("You got some seed!", width/3, height/2);
    saveData();
  }
  else
  {
    text("You didn't get enough. Try Again", width/4, height/2);
  }
  restartButton.show();
  backButton.show();
}
function saveData()
{
  if (!dataToSave)
    {
      acornNum++;
      print(acornNum);
      savedData.Acorns = acornNum;
      localStorage.setItem('thirdThingData', JSON.stringify(savedData));
      dataToSave  = true;
    }
}
function resetGame()
{
  timer = 0;
  score = 0;
  dataToSave = false;
  backButton.hide();
  restartButton.hide();
}

function toMain()
{
  window.location.assign('index.html');
}

class Player {
  constructor() {
    this.width = 60;
    this.height = 10;
    this.x = width / 2 - this.width / 2;
    this.y = height - 20;
    this.xspeed = 0;
    this.speed = 8;
  }
  
  update() {
    this.x += this.xspeed;
    this.x = constrain(this.x, 0, width - this.width);
  }
  
  show() {
    fill(50, 150, 255);
    rect(this.x, this.y, this.width, this.height);
  }
  
  move(dir) {
    this.xspeed = this.speed * dir;
  }
  
  stop() {
    this.xspeed = 0;
  }
}

class Acorn {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.r = 15;
    this.speed = 5;
  }
  
  update() {
    this.y += this.speed;
  }
  
  show() {
    fill(255, 204, 0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2 + this.r*0.2);
    fill(200, 100, 50);
    ellipse(this.x, this.y - this.r * 0.5, this.r *2, this.r);
  }
  
  offscreen() {
    return (this.y >= height);
  }
  
  hits(player) {
    let d = dist(this.x, this.y, player.x + player.width * 0.51, player.y);
    return (d < this.r + player.height / 2);
  }
}

class Obstacle {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.width = random(30, 60);
    this.height = 20;
    this.speed = 5;
  }
  
  update() {
    this.y += this.speed;
  }
  
  show() {
    fill(150);
    rect(this.x, this.y, this.width, this.width);
    fill(0);
    rect(this.x + this.width*0.15, this.y + this.width*0.15, this.width*0.7, this.width*0.7);
  }
  
  offscreen() {
    return (this.y > height);
  }
  
  hits(player) {
    return (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    );
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(1);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.stop();
  }
}


