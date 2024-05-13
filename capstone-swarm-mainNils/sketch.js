let buzzezMany = 25;
let buzzez = [];
const inertia = 0.5;
const c1 = 0.9;
const c2 = 0.5;

//we need a generative goal for the particles to head towards. Either one of the edges, the middle, or another square maybe?
function setup()
{
  let randX;
  let randY;
  createCanvas(1000, 1000);
  for(let i = 0; i < buzzezMany; i++)
  {
    randX = random(1000);
    randY = random(1000);
    buzzez[i] = new Buzz(randX, randY);
    buzzez[i].globalBest = new createVector(buzzez[i].x, buzzez[i].y);
    objective = new createVector();
    //console.log('i');
  }
}

function draw() {
  background(220, 200, 100);
  for(i = 0; i < buzzezMany; i++){
    updateObjective();
    drawParticles();
        updateParticles(inertia, c1, c2);
    updateGlobalBest();
  } 
}

function updateParticles(inertia, c1, c2) {

  for(i = 0; i < buzzez; i++){
        buzzez[i].update(buzzez[i].globalBest.x, buzzez[i].globalBest.y, inertia, c1, c2);
    }
  updateGlobalBest();
}

function drawParticles(){  
  for(i = 0; i < buzzez; i++){
      buzzez[i].drawNew();
    }
    
}

function updateGlobalBest(){
  for(i = 0; i < buzzezMany; i++){
    let currentDistance = dist(buzzez[i].x, buzzez[i].y, objective.x, objective.y);
    let gBestDistance = dist(buzzez[i].globalBest.x, buzzez[i].globalBest.y, objective.x, objective.y);
    if(currentDistance < gBestDistance){
      globalBest.x = buzzez[i].x;
      globalBest.y = buzzez[i].y;
    }
  }
  

}


function updateObjective(){
      for(i = 0; i < buzzezMany; i++) {
        objective.x = mouseX;
        objective.y = mouseY;
        console.log(objective.x, objective.y);
      }   
}




