let swarm;
c2 = 1.3;
c1 = 0.5;
r1 = 0.4;
r2 = 0.2
inertia = 0.4
buzzezMany = 20;


function setup() {
  createCanvas(1000, 1000);
  swarm = new Swarm(c1, c2, inertia, r1, r2, buzzezMany);
}


function draw() {
  background(220, 200, 100);
  
  //swarm.updateObjective();
  swarm.updateParticles();
  swarm.drawParticles();
}

// function updateParticles() {
//   for (let i = 0; i < buzzezMany; i++) {
//       buzzez[i].update(globalBest, inertia, c1, c2, r1, r2);
//   }
//   updateGlobalBest();
// }

// function drawParticles() {
//   for (let i = 0; i < buzzezMany; i++) {
//       buzzez[i].makeBuzz();
//   }
// }

// function updateGlobalBest() {
//   let objective = createVector(mouseX, mouseY);
//   for (let i = 0; i < buzzezMany; i++) {
//       let currentDistance = dist(buzzez[i].loc.x, buzzez[i].loc.y, objective.x, objective.y);
//       let gBestDistance = dist(globalBest.x, globalBest.y, objective.x, objective.y);
//       if (currentDistance < gBestDistance) {
//           globalBest = createVector(buzzez[i].loc.x, buzzez[i].loc.y);
//       }
//   }
// }

// function updateObjective() {
//   // Here you can define any specific behavior for the objective if needed
// }
