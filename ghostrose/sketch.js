let v = [];
let cols = 600, rows = 30;
let density_default = 8;
let curve2_default = 1.3;
let t_D = 180*15 / cols;
let r_D =  1 / rows;


//0 = rose 1 , 1 = rose 2, 2 = mix 
let mode = 0;
//which rose is selected
let selected = 0;

var clr1 = [0,0,0];
var clr2 = [0,0,0];
var sat = [0,0,0];
var range = [0,0,0];

let glitch = true;

let myShader;

let cam;
let delta = 3;

let yMod = 0;
let lastYTarg = 0;

let rangeThresholds = [10,11,8,6,5,3,9,7,4,2];

let lastLerp = 0;
let lerpTarg = 1;


function preload(){
  loadScene();
}

function loadScene(){
 //load from json
 fetch("midictrl_ghost_rose.json")
  .then((res) => res.text())
  .then((text) => {
    var arr = JSON.parse(text);
    console.log(arr);

    arr.ctrls.forEach(async (ctrl) => {
      var proto = new MidiCtrl();
      var res = Object.assign(proto,ctrl);
      console.log(res);
      addCtrl(res);
    });

   })
  .catch((e) => console.error(e));
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);

  colorMode(HSB);
  angleMode(DEGREES);
  noStroke();

  noCursor();

   // Create a p5.Camera object.
   cam = createCamera();

   // Place the camera at the top-center.
   cam.setPosition(0, -666, 333);
 
   // Point the camera at the origin.
   cam.lookAt(0, -10, 0);

   background(0);
}

function draw(){

  for (let [key, value] of Object.entries(ctrls)) {
    getCtrl(key).update();
  }

  var smear = getCtrl("Smear");

  if(!smear.active){
    background(0);
  }

  yMod += delta * getCtrl("LFO1").val;
  yMod = yMod % 360;

  rotateY(yMod);

  rotateX(getCtrl("X1").val);

  rotateZ(getCtrl("Z1").val);

  var ctrl = getCtrl("LFO1");
  if(abs(ctrl.val) < .2){
    ctrl.val = ctrl.val / 5;
  }

  ctrl = getCtrl("Color1");
  if(millis() - ctrl.lastUpdate < 100){
    clr1[selected] = ctrl.val;
  }

  ctrl = getCtrl("Color2");
  if(millis() - ctrl.lastUpdate < 100){
    clr2[selected] = ctrl.val;
  }

  ctrl = getCtrl("Saturation");
  if(millis() - ctrl.lastUpdate < 100){
    sat[selected] = ctrl.val;
  }

  //Lerp values between two roses

  let lerpAmt = lerp(lastLerp, lerpTarg, .2);
  lastLerp = lerpAmt;
  if(abs(lerpAmt - lerpTarg) < .01){
     lerpTarg = lerpTarg == 0 ? 1 : 0;
  }

  clr1[2] = lerp(clr1[0],clr1[1],lerpAmt);
  clr2[2] = lerp(clr2[0],clr2[1],lerpAmt);
  sat[2] = lerp(sat[0],sat[1],lerpAmt);

  ctrl = getCtrl("Range");
  if(millis() - ctrl.lastUpdate < 100){
    range[selected] = rangeThresholds[floor(ctrl.val)];
  }

  range[2] = lerp(range[0],range[1],lerpAmt);

  console.log(lerpAmt);

  ctrl = getCtrl("Glitch");
  glitch = ctrl.active;

  ctrl = getCtrl("Toggle Rose");
  if(ctrl.active){
    mode = ++mode % 3;
    if(mode != 2){
      selected = mode;
    }
    ctrl.active = false;
  }

  let opening = getCtrl("Opening").val;
  let align = getCtrl("Align").val;
  let curve = getCtrl("Curve1").val;
  
  for(let r = 0; r <= rows; r++){
    v.push([]);
    for(let theta = 0; theta <= cols; theta++){
      let phi = (180/opening)*Math.exp(-theta*t_D/(density_default*180));
      let petalCut = 1 - (1/2) * pow((5/4)*pow(1-((align*theta*t_D%360)/180), 2)-1/4, 2);
      let hangDown = curve*pow(r*r_D, 2)*pow(curve2_default*r*r_D-1, 2)*sin(phi);

      let pX = 260 * petalCut * (r*r_D * sin(phi)+hangDown*cos(phi)) * sin(theta*t_D);
      let pY = -260 * petalCut * (r*r_D * cos(phi)-hangDown*sin(phi));
      let pZ = 260 * petalCut * (r*r_D * sin(phi)+hangDown*cos(phi)) * cos(theta*t_D);
      let pos = createVector(pX, pY, pZ);
      v[r].push(pos);
    }
  }

  for(let r = 0; r < v.length; r++){
    let mainColor = color(clr1[mode],sat[mode],-30+r*r_D*120);
    fill(mainColor);

    let clr = clr1[mode] + clr2[mode];
    altColor = color(clr % 360,sat[mode] * 5,-30+r*r_D*120);


    let lerpAmt = .33;


    if(frameCount % floor(getCtrl("LFO2").val) == 0){
      if(r %  floor(range[mode]) <= 1){
      if(glitch){ lerpAmt += random(-.1,.2);}
      }
    }

    if(r %  floor(range[mode]) <= 1){
      let finalClr = lerpColor(mainColor,altColor,lerpAmt);
      fill(finalClr);
    }


    for(let theta = 0; theta < v[r].length; theta++){
	     if(r < v.length-1 && theta < v[r].length-1){
         beginShape();
         vertex(v[r][theta].x, v[r][theta].y, v[r][theta].z);
         vertex(v[r+1][theta].x, v[r+1][theta].y, v[r+1][theta].z);
         vertex(v[r+1][theta+1].x, v[r+1][theta+1].y, v[r+1][theta+1].z);
         vertex(v[r][theta+1].x, v[r][theta+1].y, v[r][theta+1].z);
         endShape(CLOSE);
       }
    }
  }


  v = [];
}


