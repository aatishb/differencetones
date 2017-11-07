var i = 0;
var j = 0;

var osc1Started = false;
var osc2Started = false;

var maxSteps = 102;
var weight = 4;
var freqInterval = 200;
var topFreq = 2000;
var lowFreq = 100;

function setup() {

	createCanvas(700,700);
  background(255);
  strokeWeight(weight);
  blendMode(HARD_LIGHT);


  osc1 = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('sine');

  frameRate(32);
}

function draw() {

  if(osc1Started || osc2Started){
  	if(i<maxSteps){

      // up and down
      if(i<maxSteps/2){
        var freq1 = map(i,0,maxSteps/2,lowFreq,topFreq);
        var freq2 = freq1 - freqInterval;
      }
      else{
        var freq1 = map(i,maxSteps/2,maxSteps,topFreq,lowFreq);
        var freq2 = freq1 - freqInterval;
      }

      osc1.freq(freq1);
      osc2.freq(freq2);

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

}

function mouseClicked(){

  background(255);

  if(j%3==0){

    osc1.start();
    osc1Started = true;
    osc2.stop();
    osc2Started = false;
    i = 0;

  }
  else if(j%3==1){

    osc1.stop();
    osc1Started = false;
    osc2.start();
    osc2Started = true;
    i = 0;

  }
  else if(j%3==2){

    osc1.start();
    osc1Started = true;
    osc2.start();
    osc2Started = true;
    i = 0;

  }

  j++;

}