let buzzezMany = 25;
let buzzez = [];
let inertia;
let c1;
let c2;

//we need a generative goal for the particles to head towards. Either one of the edges, the middle, or another square maybe?
function setup()
{
  let randX;
  let randY;
  createCanvas(1000, 1000);
  for(let i = 0; i < buzzezMany; i++)
  {
    objective = new createVector();
    randX = random(width);
    randY = random(height);
    buzzez.push( new Buzz(randX, randY));
    buzzez[i].globalBest = new createVector(buzzez[i].x, buzzez[i].y);
    // console.log(i);
    
  }
  // console.log("x = ", buzzez[24].x + "y = ", buzzez[24].y);
}

function draw() {
  background(220, 200, 100);
  // for(let i = 0; i < 10; i++){
    updateObjective();
    updateParticles(inertia, c1, c2);
    drawParticles();   
    // console.log("drawliupe");
    // console.log("inertia:", inertia, "c1:", c1, "c2:", c2);    
  // } 
  // mouseX = map(mouseX, 0., 1000, 0., 1.);
  // mouseY = map(mouseY, 0., 1000, 0., 1.);

  // c1 = mouseX;
  // c2 = mouseY;
  // console.log(c1, c2);
}

function updateParticles(inertia, c1, c2) {

  for(i = 0; i < buzzez; i++){
        buzzez[i].update(buzzez[i].globalBest.x, buzzez[i].globalBest.y, inertia, c1, c2);
        console.log(buzzez[i].globalBest.x, buzzez[i].globalBest.y);
    }

  updateGlobalBest();
  // console.log("partieUPdie")

}

function drawParticles(){  
  for(i = 0; i < buzzezMany; i++){
      buzzez.drawBuzz();
    }    
}

function updateGlobalBest(){
  for(i = 0; i < buzzezMany; i++){
    let currentDistance = dist(buzzez[i].x, buzzez[i].y, objective.x, objective.y);
    let gBestDistance = dist(buzzez[i].globalBest.x, buzzez[i].globalBest.y, objective.x, objective.y);
    if(currentDistance < gBestDistance){
      buzzez[i].globalBest.x = buzzez[i].x;
      buzzez[i].globalBest.y = buzzez[i].y;
    }
    // console.log(buzzez[i].globalBest.x, buzzez[i].globalBest.y);
  }
  // console.log("globalberst");
}


function updateObjective(){
      for(i = 0; i < buzzezMany; i++) {
        objective.x = mouseX;
        objective.y = mouseY;
        // console.log("objX =", objective.x,"objY =", objective.y);
      }   
}

