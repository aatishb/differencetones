var notes = [64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 64, 62, 62, 62];

var i;
var osc1Started = false;
var osc2Started = false;
var revealInterval = false;
var pause = false;

var mode = 'flat';

var maxSteps = 128;
var weight = 4;
var freqInterval;
var topFreq = 3000;
var lowFreq = 1500;

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
  sel.option('flat');
  sel.option('rising');
  sel.option('falling');
  sel.option('rise and fall');
  sel.option('sine slow');
  sel.option('sine medium');
  sel.option('sine fast');
  sel.option('tune');
  sel.changed(modeChanged);

  frameRate(32);
}

function draw() {

    if(i<maxSteps){

    var freq1 = random(lowFreq,topFreq);

    if(mode=='flat'){
      freqInterval = 200;
    }
    else if(mode=='rising'){
      freqInterval = map(Math.floor(i/16),0,8,200,800);
    }
    else if(mode=='falling'){
      freqInterval = map(Math.floor(i/16),0,8,800,200);
    }
    else if(mode=='rise and fall'){
      if(i<maxSteps/2){
        freqInterval = map(Math.floor(i/8),0,8,200,800);
      }
      else{
        freqInterval = map(Math.floor(i/8),8,16,800,200);
      }
    }
    else if(mode=='sine slow'){
      var frequency = 1
      freqInterval = 200*Math.sin(2*Math.PI*frequency*i/32)+400;
    }
    else if(mode=='sine medium'){
      var frequency = 2
      freqInterval = 200*Math.sin(2*Math.PI*frequency*i/32)+400;
    }
    else if(mode=='sine fast'){
      var frequency = 3
      freqInterval = 200*Math.sin(2*Math.PI*frequency*i/32)+400;
    }
    else if(mode=='tune'){
      var numBeats = maxSteps/notes.length;
      var whichNote = Math.floor(i/numBeats)
      freqInterval = midiToFreq(notes[whichNote]);
      if(i%numBeats == 0){pause = true;}
      else{pause = false;}
    }

    var freq2 = freq1 - freqInterval;

    osc1.fade(0,0.001);
    osc2.fade(0,0.001);

    if(!pause){
      osc1.freq(freq1);
      osc2.freq(freq2);

      osc1.fade(1,0.001);
      osc2.fade(1,0.001);

      xi = map(i,0,maxSteps,0,width);
      xf = map(i+1,0,maxSteps,0,width);

      y1 = map(freq1,0,topFreq,height,0);
      y2 = map(freq2,0,topFreq,height,0);
      y3 = map(freqInterval,0,topFreq,height,0);

      if(osc1Started){
        stroke(255, 50, 50);
        line(xi,y1,xf-weight+1,y1);
      }

      if(osc2Started){
        stroke(80, 150, 255);
        line(xi,y2,xf-weight+1,y2);
      }

      if(osc1Started && osc2Started && revealInterval){
        stroke(50, 255, 50);
        line(xi,y3,xf-weight+1,y3);
      }
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

  if(key == 'r'){
    revealInterval = true;
  }

}

function modeChanged() {
  mode = sel.value();
  osc1.start();
  osc2.start();
  resetScreen();
}

function resetScreen(){
  background(255);
  i = 0;
  revealInterval = false;
}