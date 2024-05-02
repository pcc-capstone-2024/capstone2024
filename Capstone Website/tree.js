
let treeImg;

function preload()
{
  treeImg = createImg('tree.jpg');
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  treeImg.size(width*0.25, height*0.5);
  treeImg.position(width*0.2, height*0.25);
  treeImg.mouseClicked(treeUrl);
}

function draw() 
{
  
}

function treeUrl()
{
  print("This is where the code to load the url for the tree.");
  window.location.assign('index.html');
}