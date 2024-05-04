let farmImg;

function preload()
{
farmImg = createImg('buttons.jpg');
}

function setup() 
{
createCanvas(windowWidth, windowHeight);
farmImg.size(width*0.2, height*0.25);
farmImg.position(width*0.707, height*0.09);
farmImg.mouseClicked(buttonUrl);
}

function draw()
{
}

function buttonUrl()
{
  print("Put the url for the FARM stuff here.")
  window.location.assign('index.html');
}