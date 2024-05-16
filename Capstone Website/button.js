let savedData = JSON.parse(localStorage.getItem('thirdThingData'));   //load saved data

let containerHeight = 300; // Height of the container
let waterHeight = 0; // Initial water level
let increment = 20; // Increment of water level
let timer = 0;
let timeThreshold = 20;
let water = 0;
let gameOver = false; // Game over flag
let saveGame = false;
let restartButton;
let backButton;

function setup() {
  createCanvas(400, 400);
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

  // Draw container
  fill(200);
  rect(150, 50, 100, containerHeight);

  // Draw water
  fill(0, 0, 255);
  rect(150, 50 + containerHeight - waterHeight, 100, waterHeight);

  // Draw text
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Click to fill the container", width / 2, height - 20);

  // Check if game over
  if (waterHeight >= containerHeight) {
    gameOver = true;
  }
  if (gameOver)
  {
    fill(255, 0, 0);
    textSize(30);
    text("Game Over!", width / 2, height / 2);
    saveFunction();
    backButton.show();
    restartButton.show();
  }
  
  timer++;
  if (timer > timeThreshold)
    {
      if (waterHeight > 0 && !gameOver)
      {  waterHeight--;}
      timer = 0;
    }
}

function mouseClicked() {
  if (!gameOver && waterHeight < containerHeight) {
    waterHeight += increment;
    timeThreshold--;
  }
}

function saveFunction()
{
  if (!saveGame)
    {
      water++;
      print(water);
      savedData.Water = water;
      localStorage.setItem('thirdThingData', JSON.stringify(savedData));
      saveGame  = true;
    }
}

function toMain()
{
  window.location.assign('index.html');
}

function resetGame()
{
  waterHeight = 0; // Initial water level
  timer = 0;
  timeThreshold = 20;
  gameOver = false;
  saveGame = false;
  backButton.hide();
  restartButton.hide();
}
