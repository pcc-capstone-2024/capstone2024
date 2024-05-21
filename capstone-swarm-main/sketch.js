let buzzezMany = 5;
let buzzez = [];
let inertia = 0.5; //inertia value between 0 and 1 (non inclusive)
let c1 = 0.1; //c1 and c2 value between 0 and 2
let c2 = 1.3;
let r1 = 0.2;
let r2 = 0.5;
let globalBest;
let buzzRed = [0, 100, 175, 225, 255];
let buzzGr = [0, 255, 50, 0, 100];
let buzzBl = [255, 0, 255, 125, 0];
let objective;

//we need a generative goal for the particles to head towards. Either one of the edges, the middle, or another square maybe?
function setup()
{
  let randX;
  let randY;
  let randCol;
  createCanvas(1000, 1000);
  for(let i = 0; i < buzzezMany; i++)
  {
    randCol = int(random(5));
    objective = new createVector();
    randX = random(0, width);
    randY = random(0, height);
    //for(let i = 0; i < buzzezMany; i++){
      buzzez[i] = new Buzz(randX, randY, randX - random(3 - 20), randY - random(3 - 20), buzzRed[randCol], buzzGr[randCol], buzzBl[randCol]);
     
    //  console.log(buzzez[i].loc.x, buzzez[i].loc.y);
    //}
  }
  objective = createVector();
  globalBest = new createVector(buzzez[0].loc.x, buzzez[0].loc.y);
  // console.log("x = ", buzzez[24].x + "y = ", buzzez[24].y);
}

function draw() {
  background(220, 200, 100);
    updateObjective();
    updateParticles();
    drawParticles();   
    // console.log("drawliupe");
    // console.log("inertia:", inertia, "c1:", c1, "c2:", c2);    
  // } 
  // mouseX = map(mouseX, 0., 1000, 0., 500.);
  // mouseY = map(mouseY, 0., 1000, 0., 500.);

  // c1 = mouseX;
  // c2 = mouseY;
  // console.log(c1, c2);
}

function updateParticles() {

  for(let i = 0; i < buzzezMany; i++){
        buzzez[i].update(globalBest.x, globalBest.y, inertia, c1, c2, r1, r2);
        // console.log(globalBest.x, globalBest.y);
    }

  updateGlobalBest();
  // console.log("partieUPdie")
      console.log(globalBest.x, globalBest.y);

}

function drawParticles(){  
  for(let i = 0; i < buzzezMany; i++){
      buzzez[i].makeBuzz();
    }    
}

function updateGlobalBest(){
  let currentDistance;
  let gBestDistance;
  for(let i = 0; i < buzzezMany; i++){
    currentDistance = dist(buzzez[i].loc.x, buzzez[i].loc.y, objective.x, objective.y);
    gBestDistance = dist(globalBest.x, globalBest.y, objective.x, objective.y);
    if(currentDistance < gBestDistance){
      globalBest.x = buzzez[i].loc.x;
      globalBest.y = buzzez[i].loc.y;
    }

  }
  // console.log("globalberst");
}


function updateObjective(){
      // for(let i = 0; i < buzzezMany; i++) {
        objective.x = mouseX;
        objective.y = mouseY;
        // console.log("objX =", objective.x,"objY =", objective.y);
      // }   
}