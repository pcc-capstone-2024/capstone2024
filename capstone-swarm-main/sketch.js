let swarm;
c2 = 1.3;
c1 = 0.5;
r1 = 0.4;
r2 = 0.2
inertia = 0.99;
buzzezMany = 20;

var kinectron = null;
var start = 30;
var target = 100;
var diameter = start;
var light = 255;
var dark = 100;
var hueValue = light;
var lerpAmt = 0.3;
var state = 'ascending';

//let headX;
//let headY;
//to connect to kinect not on same pac
/*let kinectron = new Kinectron("myusername", {  // enter the username to connect to
  "host": "myserver.com", // your personal peer server
  "port": "9001", // your portnumber
  "path": "/", // your path
  "secure": "true" // include parameters per peer.js documentation
});*/
function setup() {
  createCanvas(1000, 1000);
  kinectron = new Kinectron("192.168.1.16");
  kinectron.makeConnection();
  kinectron.startTrackedJoint(kinectron.HEAD, getHeadLoc)
  //kinectron.startTrackedBodies(bodyTracked);
  //swarm = new Swarm(c1, c2, inertia, r1, r2, buzzezMany);
  swarm = {};
}

function draw() {
  background(220, 200, 100);
  //swarm.updateObjective();
  for (let key in swarm) {
    swarm[key].updateParticles();
    swarm[key].drawParticles();
    fill(155, 50, 255);
    ellipse(swarm[key].headX, swarm[key].headY, 20, 20);
  }
}

function getHeadLoc(head)
{
  if (head.trackingId in swarm) {
    swarm[head.trackingId].headX = (head.depthX * width);
    swarm[head.trackingId].headY = (head.depthY * height);
  }
  else {
    // Create a new swarm if a new head is detected.
    swarm[head.trackingId] = new Swarm(c1, c2, inertia, r1, r2, buzzezMany);
    swarm[head.trackingId].headX = (head.depthX * width);
    swarm[head.trackingId].headY = (head.depthY * height);
  }
}

/*
function bodyTracked(body) {
  kinectron.getJoints(drawJoint);
  kinectron.getHands(drawHands);
}

function drawJoint(joint) {
  fill(100);

  // Kinect location data needs to be normalized to canvas size
  ellipse(joint.depthX * width, joint.depthY * height, 15, 15);

  fill(200);

  // Kinect location data needs to be normalized to canvas size
  ellipse(joint.depthX * width, joint.depthY * height, 3, 3);
}

// Draw hands
function drawHands(hands) {

  //check if hands are touching 
  if ((Math.abs(hands.leftHand.depthX - hands.rightHand.depthX) < 0.01) && (Math.abs(hands.leftHand.depthY - hands.rightHand.depthY) < 0.01)) {
    hands.leftHandState = 'clapping';
    hands.rightHandState = 'clapping';
  }

  // draw hand states
  updateHandState(hands.leftHandState, hands.leftHand);
  updateHandState(hands.rightHandState, hands.rightHand);
}

// Find out state of hands
function updateHandState(handState, hand) {
  switch (handState) {
    case 'closed':
      drawHand(hand, 1, 255);
      break;

    case 'open':
      drawHand(hand, 0, 255);
      break;

    case 'lasso':
      drawHand(hand, 0, 255);
      break;

      // Created new state for clapping
    case 'clapping':
      drawHand(hand, 1, 'red');
  }
}

// Draw the hands based on their state
function drawHand(hand, handState, color) {

  if (handState === 1) {
    state = 'ascending';
  }

  if (handState === 0) {
    state = 'descending';
  }

  if (state == 'ascending') {
    diameter = lerp(diameter, target, lerpAmt);
    hueValue = lerp(hueValue, dark, lerpAmt);
  }

  if (state == 'descending') {
    diameter = lerp(diameter, start, lerpAmt);
    hueValue = lerp(hueValue, light, lerpAmt);
  }

  fill(color);

  // Kinect location needs to be normalized to canvas size
  ellipse(hand.depthX * width, hand.depthY * height, diameter, diameter);
} */

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
