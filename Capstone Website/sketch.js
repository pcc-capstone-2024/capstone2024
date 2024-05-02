/*Make a map of the space, include pictures of the
exhibit that link to their own page.
*/

let bgImg;
let treeImg;
let farmImg;
let buttonImg;
let swarmImg;

let imgHeight;
let imgWidth;

let isClicked = false;

//need images for swarm, parth, and threshold

function preload()
{
  bgImg = loadImage('floorPlan.png');
  treeImg = createImg('tree.jpg');
  farmImg = createImg('farm.jpeg');
  buttonImg = createImg('buttons.jpg');
  swarmImg = createImg('swarm.jpg');
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  imgWidth = width-width*0.1;
  imgHeight = (width-(width*0.1))*0.5;
  image(bgImg, imgWidth/30, imgWidth/60, imgWidth, imgHeight);
  treeImg.size(imgWidth*0.25, imgHeight*0.5);
  treeImg.position(imgWidth*0.25, imgHeight*0.25);
  treeImg.hide();
  treeImg.mouseClicked(treeUrl);
  farmImg.size(imgWidth*0.2, imgHeight*0.25);
  farmImg.position(imgWidth*0.77, imgHeight*0.1);
  farmImg.mouseClicked(farmUrl);
  farmImg.hide();
  buttonImg.size(imgWidth*0.2, imgHeight*0.2);
  buttonImg.position(imgWidth*0.8, imgHeight*0.74);
  buttonImg.hide();
  swarmImg.size(imgWidth*0.15, imgHeight*0.3);
  swarmImg.position(imgWidth*0.71, imgHeight*0.4);
  swarmImg.hide();
}

function draw() 
{
  if ((winMouseX >= imgWidth*0.25 && winMouseX <= imgWidth*0.5) && (winMouseY >= imgHeight*0.25 && winMouseY <= imgHeight*0.75))
  {
    treeImg.show();
  }
  else if ((winMouseX >= imgWidth * 0.8 && winMouseX <= imgWidth * 0.97) && (winMouseY >= imgHeight * 0.1 && winMouseY <= imgHeight * 0.35))
  {
    farmImg.show();
  }
  else if ((winMouseX >= imgWidth * 0.8 && winMouseX <= imgWidth * 1) && (winMouseY >= imgHeight * 0.74 && winMouseY <= imgHeight * 0.94))
  {
    buttonImg.show();
  }
  else if ((winMouseX >= imgWidth * 0.71 && winMouseX <= imgWidth * 0.86) && (winMouseY >= imgHeight * 0.4 && winMouseY <= imgHeight * 0.7))
  {
    swarmImg.show();
  }
  else
  {
    treeImg.hide();
    farmImg.hide();
    buttonImg.hide();
    swarmImg.hide();
  }
}

function treeUrl()
{
  print("This is where the code to load the url for the tree.");
  window.location.assign('tree.html');
}

function farmUrl()
{
  print("Put the url for the FARM stuff here.")
  window.location.assign('farm.html');
}

function windowResized()
{
  createCanvas(windowWidth, windowHeight);
  let imgWidth = width-width*0.1;
  let imgHeight = (width-(width*0.1))*0.5;
  image(bgImg, imgWidth/30, imgWidth/60, imgWidth, imgHeight);
  treeImg.size(imgWidth*0.25, imgHeight*0.5);
  treeImg.position(imgWidth*0.25, imgHeight*0.25);
  farmImg.size(imgWidth*0.2, imgHeight*0.25);
  farmImg.position(imgWidth*0.77, imgHeight*0.1);
  buttonImg.size(imgWidth*0.2, imgHeight*0.2);
  buttonImg.position(imgWidth*0.8, imgHeight*0.74);
  swarmImg.size(imgWidth*0.15, imgHeight*0.3);
  swarmImg.position(imgWidth*0.71, imgHeight*0.4);
}