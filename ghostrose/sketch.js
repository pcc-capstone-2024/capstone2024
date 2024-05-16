let v = [];
let cols = 600, rows = 30;

let t_D = 180*15 / cols;
let r_D =  1 / rows;

let opening, density, align, curve1, curve2,clr1,clr2,sat,range,altColor,z1,x1,lfo1,lfo2,glitch;
let opening_default = 2;
let density_default = 8;
let align_default = 3.35;
let z1_default = 20;
let x1_default = 0;
let lfo1_default = 1;
let lfo2_default = 1;
let curve1_default = 2;
let curve2_default = 1.3;
let clr1_default = 340;
let sat_default = 340;
let clr2_default = 0;
let range_default = 7;
let threshold_default = 0;

//0 = rose 1 , 1 = rose 2, 2 = mix 
let selected = 0;

let ctrls = [];

const CC_OPENING = 41;
const CC_LFO1 = 42;
const CC_LFO2 = 54;
const CC_Z1 = 43;
const CC_X1 = 44;
const CC_ALIGN = 51;
const CC_CURVE1 = 52;
const CC_COLOR1 = 61;
const CC_COLOR2 = 62;
const CC_COLOR_SAT = 63;
const CC_COLOR_RANGE = 64;
const CC_COLOR_THRESHOLD = 54;
const CC_GLITCH = 24;

let canvas;

let myShader;

let cam;
let delta = 3;

let yMod = 0;
let lastYTarg = 0;

let rangeThresholds = [10,11,8,6,5,3,9,7,4,2];

function setup(){
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);

  colorMode(HSB);
  angleMode(DEGREES);
  noStroke();

  noCursor();

   // Create a p5.Camera object.
   cam = createCamera();

   // Place the camera at the top-center.
   cam.setPosition(0, -400, 333);
 
   // Point the camera at the origin.
   cam.lookAt(0, -10, 0);


  opening = opening_default;
  density = density_default;
  align = align_default;
  curve1 = curve1_default;
  curve2 = curve2_default;
  clr1 = clr1_default;
  clr2 = clr2_default;
  range = range_default;
  threshold = threshold_default;
  z1 = z1_default;
  x1 = x1_default;
  lfo1 = lfo1_default;
  lfo2 = lfo2_default;
  glitch = false;

  //temp MIDI controls
  var ctrl = new MidiCtrl(CC_OPENING,'Opening','',opening_default);
  ctrl.min = 9;
  ctrl.max = 3;
  ctrl.lerpAmt = 1;
  addCtrl(ctrl);

  var ctrl = new MidiCtrl(CC_ALIGN,'Align','',align_default);
  ctrl.min = 3.35;
  ctrl.max = 21;
  ctrl.lerpAmt = .03;
  addCtrl(ctrl);


  var ctrl = new MidiCtrl(CC_CURVE1,'Curve1','',curve1_default);
  ctrl.min = -2.4;
  ctrl.max = 3.25;
  ctrl.lerpAmt = 1;
  addCtrl(ctrl);


  var ctrl = new MidiCtrl(CC_COLOR1,'Color1','',clr1_default);
  ctrl.min = 0;
  ctrl.max = 360;
  ctrl.lerpAmt = .085;
  addCtrl(ctrl);

  //
  var ctrl = new MidiCtrl(CC_COLOR2,'Color2','',clr2_default);
  ctrl.min = -127;
  ctrl.max = 127;
  ctrl.lerpAmt = .7;
  addCtrl(ctrl);


  var ctrl = new MidiCtrl(CC_COLOR_SAT,'Saturation','',sat_default);
  ctrl.min = 22;
  ctrl.max = 99;
  ctrl.lerpAmt = .7;
  addCtrl(ctrl);

  var ctrl = new MidiCtrl(CC_COLOR_RANGE,'Color Range','',range_default);
  ctrl.min = 0;
  ctrl.max = rangeThresholds.length - 1;
  ctrl.lerp = false;
  addCtrl(ctrl);

  var ctrl = new MidiCtrl(CC_Z1,'Z1','',z1_default);
  ctrl.min = -40;
  ctrl.max = 40;
  addCtrl(ctrl);
  var ctrl = new MidiCtrl(CC_X1,'X1','',x1_default);
  ctrl.min = -50;
  ctrl.max = 50;
  addCtrl(ctrl);
  var ctrl = new MidiCtrl(CC_LFO1,'LFO1','',lfo1_default);
  ctrl.min = -5;
  ctrl.max = 5;
  ctrl.lerp = false;
  addCtrl(ctrl);
  var ctrl = new MidiCtrl(CC_LFO2,'LFO2','',lfo2_default);
  ctrl.min = 33;
  ctrl.max = 1;
  ctrl.lerp = false;
  addCtrl(ctrl);

  var cue = new MidiCtrl(CC_GLITCH,'Glitch Mode','',true);
  cue.isBoolean = true;
  addCtrl(cue);

  //TODO do this automatically as part of midictrl library
  var cue = new MidiCtrl(CC_CUE,'CUE','',0);
  cue.isBoolean = true;
  addCtrl(cue);

  
}

function draw(){
  background(0);
  

  yMod += delta * lfo1;
  yMod = yMod % 360;

  rotateY(yMod);

  rotateX(x1);

  rotateZ(z1);

  ctrl = getCtrl(CC_OPENING);
  opening = ctrl.val;

  ctrl = getCtrl(CC_ALIGN);
  align = ctrl.val;

  ctrl = getCtrl(CC_Z1);
  z1 = ctrl.val;

  ctrl = getCtrl(CC_LFO1);

  if(abs(ctrl.val) < .2){
    lfo1 = ctrl.val / 5;
  }
  else{
    lfo1 = ctrl.val;
  }

  ctrl = getCtrl(CC_LFO2);
  lfo2 = ctrl.val;

  ctrl = getCtrl(CC_X1);
  x1 = ctrl.val;

  ctrl = getCtrl(CC_CURVE1);
  curve1 = ctrl.val;

  ctrl = getCtrl(CC_COLOR1);
  clr1 = ctrl.val;

  ctrl = getCtrl(CC_COLOR2);
  clr2 = ctrl.val;

  ctrl = getCtrl(CC_COLOR_SAT);
  sat = ctrl.val;

  ctrl = getCtrl(CC_COLOR_RANGE);
  range = rangeThresholds[floor(ctrl.val)];

  ctrl = getCtrl(CC_GLITCH);
  glitch = ctrl.active;

  ctrls.forEach((element) => element.update());


  
  for(let r = 0; r <= rows; r++){
    v.push([]);
    for(let theta = 0; theta <= cols; theta++){
      let phi = (180/opening)*Math.exp(-theta*t_D/(density*180));
      let petalCut = 1 - (1/2) * pow((5/4)*pow(1-((align*theta*t_D%360)/180), 2)-1/4, 2);
      let hangDown = curve1*pow(r*r_D, 2)*pow(curve2*r*r_D-1, 2)*sin(phi);

      let pX = 260 * petalCut * (r*r_D * sin(phi)+hangDown*cos(phi)) * sin(theta*t_D);
      let pY = -260 * petalCut * (r*r_D * cos(phi)-hangDown*sin(phi));
      let pZ = 260 * petalCut * (r*r_D * sin(phi)+hangDown*cos(phi)) * cos(theta*t_D);
      let pos = createVector(pX, pY, pZ);
      v[r].push(pos);
    }
  }

  for(let r = 0; r < v.length; r++){
    let mainColor = color(clr1[selected],sat[selected],-30+r*r_D*120);
    fill(mainColor);

    let clr = clr1[selected] + clr2[selected];
    altColor = color(clr[selected] % 360,sat[selected] * 2,-30+r*r_D*120);


      let lerpAmt = .25;


    if(frameCount % floor(lfo2) == 0){
      if(r %  floor(range[selected]) <= 1){
      if(glitch){ lerpAmt += random(-.1,.2);}
      }
    }

    if(r %  floor(range[selected]) <= 1){
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


