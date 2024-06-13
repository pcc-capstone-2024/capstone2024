let swarm;
let c2 = 1.3;
let c1 = 0.5;
let r1 = 0.4;
let r2 = 0.8;
let inertia = 0.99;
let buzzezMany = 20;
let flork = true;

var kinectron = null;
var start = 30;
var target = 100;
var diameter = start;
var light = 255;
var dark = 100;
var hueValue = light;
var lerpAmt = 0.3;
var state = 'ascending';
let SwFlThresh = 10;
let prevHeadX;
let prevHeadY;

function setup() {
  createCanvas(windowWidth, windowHeight);                   //IMPORTANT INFO BELOW
  kinectron = new Kinectron("192.168.1.49");  //change the quotes befoe running the program to the new IP!
  kinectron.makeConnection();                 //connects to the kinect at specified IP address. (must be running Kinectitron software)
  kinectron.startTrackedJoint(kinectron.HEAD, getHeadLoc);
  //we are only tracking the head and each time one is found the getHeadLoc function runs

  //swarm = new Swarm(c1, c2, inertia, r1, r2, buzzezMany);
  swarm = {};
}

function draw() {
  background(220, 200, 100);
  //swarm.updateObjective();
  for (let key in swarm) {

    if (millis() - swarm[key].timeStamp > 1000) { //if it hasn't been updated for 1 second
      delete swarm[key];  //delete the object
    }
    else {
      //console.log(swarm[key].timeStamp);    //used in debugging to display timestamp
      swarm[key].updateParticles();
      swarm[key].drawParticles();
      //re-enable the next two lines to view where the kinect is tracking.
      //fill(155, 50, 255);
      //ellipse(swarm[key].headX, swarm[key].headY, 20, 20);
    }
  }
}

function getHeadLoc(head)   //this will tell the program what to do when it detects a head.
{
  //first store our previous headx and heady
  
  if (!(head.trackingId in swarm)) {   //if the assigned ID is NOT linked to the swarm already
    swarm[head.trackingId] = new Swarm(c1, c2, inertia, r1, r2, buzzezMany); //create a new swarm with that ID number
  }
  //update the headX and headY aka the locations the swarm is tracking
  // push();
  //     prevHeadX = swarm.headX;
  //     prevHeadY = swarm.headY;
  //   pop();
    swarm[head.trackingId].headX = (head.depthX * width);
    swarm[head.trackingId].headY = (head.depthY * height);
    swarm[head.trackingId].timeStamp = millis();  //used to know if the head hasn't been tracked recently in Draw

}

// function vibeCheck(){ // supposedly to make sure flock and swarm arent called at the same time?
//   if(flork){
//     swarmupdateParticles1();
//     return;
//   }else{
//     updateParticles2(swarm[key].headX, swarm[key].headY);
//     return;
//   }


// }



