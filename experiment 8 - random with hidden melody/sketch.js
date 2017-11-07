var notes = [64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 64, 62, 62, 64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 62, 60, 60];

var i = 0;
var j = 0;

var osc1Started = false;
var osc2Started = false;

var numBeats = 16;
var maxSteps = notes.length * numBeats;
var weight = 4;
var freqInterval;
var topFreq = 2000;
var lowFreq = 600;

function setup() {

	createCanvas(700,700);
  background(255);
  strokeWeight(weight);
  blendMode(HARD_LIGHT);


  osc1 = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('sine');

  osc1.start();
  osc2.start();

  frameRate(32);
}

function draw() {

	if(i<maxSteps){


    var freq1 = random(lowFreq,topFreq);

    //freqInterval = 200*Math.sin(i*0.4)+400;

    var whichNote = Math.floor(i/numBeats)
    freqInterval = midiToFreq(notes[whichNote]-9);

    var freq2 = freq1 - freqInterval;

    if(i%numBeats == 0){
      console.log(freqInterval);
      osc1.fade(0,0.001);
      osc2.fade(0,0.001);
    }
    else{
      osc1.fade(1,0.001);
      osc2.fade(1,0.001);

      osc1.freq(freq1);
      osc2.freq(freq2);

      xi = map(i,0,maxSteps,0,width);
      xf = map(i+1,0,maxSteps,0,width);

      y1 = map(freq1,0,topFreq,height,0);
      y2 = map(freq2,0,topFreq,height,0);
      y3 = map(freqInterval,0,topFreq,height,0);

      stroke(255, 50, 50);
      line(xi,y1,xf-weight+1,y1);

      stroke(80, 150, 255);
      line(xi,y2,xf-weight+1,y2);

      stroke(50, 255, 50);
      line(xi,y3,xf-weight+1,y3);

    }



    i++;
	}
  else{
    osc1.stop();
    osc2.stop();
  }

}
