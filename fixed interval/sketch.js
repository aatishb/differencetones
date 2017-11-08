var i;

var osc1Started = false;
var osc2Started = false;

var mode = 'rise';

var maxSteps = 102;
var weight = 4;
var freqInterval = 200;
var topFreq = 2000;
var lowFreq = 300;

function setup() {

	createCanvas(700,700);
  resetScreen();
  strokeWeight(weight);
  blendMode(HARD_LIGHT);

  osc1 = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('sine');

  osc1.start();
  osc1Started = true;

  osc2.start();
  osc2Started = true;

  sel = createSelect();
  sel.position(600, 10);
  sel.option('rise');
  sel.option('fall');
  sel.option('rise and fall');
  sel.changed(modeChanged);

  frameRate(32);
}

function draw() {

  	if(i<maxSteps){

    var freq1;
    // descending
    if(mode=='fall'){
      freq1 = map(i,0,maxSteps,topFreq,lowFreq);
    }
    else if(mode=='rise'){
      freq1 = map(i,0,maxSteps,lowFreq,topFreq);
    }
    else if(mode=='rise and fall'){
      if(i<maxSteps/2){
        freq1 = map(i,0,maxSteps/2,lowFreq,topFreq);
      }
      else{
        freq1 = map(i,maxSteps/2,maxSteps,topFreq,lowFreq);
      }
    }

    var freq2 = freq1 - freqInterval;

    osc1.fade(0,0.001);
    osc2.fade(0,0.001);

    osc1.freq(freq1);
    osc2.freq(freq2);

    osc1.fade(1,0.001);
    osc2.fade(1,0.001);

    xi = map(i,0,maxSteps,0,width);
    xf = map(i+1,0,maxSteps,0,width);

    y1 = map(freq1,lowFreq,topFreq,height,0);
    y2 = map(freq2,lowFreq,topFreq,height,0);

    if(osc1Started){
      stroke(255, 50, 50);
      line(xi,y1,xf-weight+1,y1);
    }

    if(osc2Started){
      stroke(80, 150, 255);
      line(xi,y2,xf-weight+1,y2);
    }

    i++;
	}
  else{
    osc1.stop();
    osc2.stop();
  }

}

function keyTyped() {
  if (key === '1') {
    osc1.start();
    osc1Started = true;
    osc2.stop();
    osc2Started = false;
  } else if (key === '2') {
    osc1.stop();
    osc1Started = false;
    osc2.start();
    osc2Started = true;
  }
  else{
    osc1.start();
    osc1Started = true;
    osc2.start();
    osc2Started = true;
  }
  resetScreen();
}

function modeChanged() {
  mode = sel.value();
  osc1.start();
  osc2.start();
  osc1Started = true;
  osc2Started = true;
  resetScreen();
}

function resetScreen(){
  background(255);
  i = 0;

}