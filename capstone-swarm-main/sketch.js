let buzzezMany = 25;
let buzzez = [];
let inertia = 0.5;
let c1 = 0.4;
let c2 = 0.5;

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
    buzzez.push(new Buzz(randX, randY));
    globalBest = new createVector(buzzez[0].x, buzzez[0].y);
    // console.log(buzzez[i].x, buzzez[i].y);
    
  }
  // this.globalBest = createVector(this.globalBestX, this.globalBestY);
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

  for(let i = 0; i < buzzez; i++){
        buzzez[i].update(globalBest.x, globalBest.y, inertia, c1, c2);
        // console.log(globalBest.x, globalBest.y);
    }

  updateGlobalBest();
  // console.log("partieUPdie")

}

function drawParticles(){  
  for(let i = 0; i < buzzezMany; i++){
      buzzez[i].makeBuzz();
    }    
}

function updateGlobalBest(){
  for(let i = 0; i < buzzezMany; i++){
    let currentDistance = dist(buzzez[i].x, buzzez[i].y, objective.x, objective.y);
    let gBestDistance = dist(globalBest.x, globalBest.y, objective.x, objective.y);
    if(currentDistance < gBestDistance){
      globalBest.x = buzzez[i].x;
      globalBest.y = buzzez[i].y;
    }
    // console.log(globalBest.x, globalBest.y);
  }
  // console.log("globalberst");
}


function updateObjective(){
      for(let i = 0; i < buzzezMany; i++) {
        objective.x = mouseX;
        objective.y = mouseY;
        // console.log("objX =", objective.x,"objY =", objective.y);
      }   
}

