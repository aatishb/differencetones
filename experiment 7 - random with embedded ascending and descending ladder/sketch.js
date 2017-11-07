var i = 0;
var maxSteps = 128;
var weight = 4;
var freqInterval;
var topFreq = 3000;
var lowFreq = 1500;

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
    if(i<maxSteps/2){
      freqInterval = map(Math.floor(i/8),0,8,200,600);
    }
    else{
      freqInterval = map(Math.floor(i/8),8,16,600,200);
    }
    var freq2 = freq1 - freqInterval;

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

    i++;
  }
  else{
    osc1.stop();
    osc2.stop();
  }

}
