// let buzzezMany = 5;
// let buzzez = [];
// let inertia = 0.5; //inertia value between 0 and 1 (non inclusive)
// let c1 = 0.9; //c1 and c2 value between 0 and 2
// let c2 = 0.3;
// let r1 = 0.04;
// let r2 = 0.5;
// let globalBest;
let buzzRed = [0, 100, 175, 225, 255];
let buzzGr = [0, 255, 50, 0, 100];
let buzzBl = [255, 0, 255, 125, 0];
// let objective;
let swarm = []

//we need a generative goal for the particles to head towards. Either one of the edges, the middle, or another square maybe?
function setup()
{
  let randX = random(0, width);
  let randY = random(0, height);
  let randCol = int(random(5));
  createCanvas(1000, 1000);
  for(let i = 0; i < 1; i++){
    swarm = new Swormn(20);
    swarm.setupBuzzez(randX, randY, randX - 50, randY - 50, buzzRed[randCol], buzzGr[randCol], buzzBl[randCol])
  }
  // console.log("x = ", buzzez[24].x + "y = ", buzzez[24].y);
}

function draw() {
  background(220, 200, 100);
    // swarm.updateObjective();
    swarm.updateParticles();
    swarm.drawParticles();   
}

// function updateParticles() {

//   for(let i = 0; i < buzzezMany; i++){
//         buzzez[i].update(globalBest.x, globalBest.y, inertia, c1, c2, r1, r2);
//         // console.log(globalBest.x, globalBest.y);
//     }

//   updateGlobalBest();
//   // console.log("partieUPdie")
//       // console.log(globalBest.x, globalBest.y);

// }

// function drawParticles(){  
//   for(let i = 0; i < buzzezMany; i++){
//       buzzez[i].makeBuzz();
//     }    
// }

// function updateGlobalBest(){
//   let currentDistance;
//   let gBestDistance;
//   for(let i = 0; i < buzzezMany; i++){
//     currentDistance = dist(objective.x, objective.y, buzzez[i].loc.x, buzzez[i].loc.y);
//     gBestDistance = dist(objective.x, objective.y, globalBest.x, globalBest.y);
//     if(currentDistance < gBestDistance){
//       globalBest.x = buzzez[i].loc.x;
//       globalBest.y = buzzez[i].loc.y;
//     }

//   }
//   // console.log("globalberst");
// }


// function updateObjective(){
//       // for(let i = 0; i < buzzezMany; i++) {
//         objective.x = mouseX;
//         objective.y = mouseY;
//         // console.log("objX =", objective.x,"objY =", objective.y);
//       // }   
// }