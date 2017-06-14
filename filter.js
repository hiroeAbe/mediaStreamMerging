var audioCtx = null;

$(function(){
  audioCtx = new AudioContext();
  console.log("audioCtx init");
});

var bufsize = 1024;
var play = 0;
var data = new Float32Array(bufsize);

var scrproc = audioCtx.createScriptProcessor(bufsize);
var filter = audioCtx.createBiquadFilter();
var osc = null;
scrproc.onaudioprocess = Process;
scrproc.connect(filter);

filter.connect(audioctx.destination);
//filter.frequency.value = 5000;
//filter.Q.value = 5;

var Filter = {
  FREQ_MUL: 5000,
  QUAL_MUL: 5,
};

Filter.setup = function() {
  // WebAudio API 関係の初期化
  console.log("filter setup");
  this.output = audioCtx.createMediaStreamDestination();
  this.filter = audioCtx.createBiquadFilter();
  this.filter.type = ["lowpass","highpass","bandpass","lowshelf","highshelf","peaking","notch","allpass"][document.getElementById("type").selectedIndex];
  this.filter.type = document.getElementById("type").selectedIndex;
  this.filter.frequency.value = document.getElementById("freqlabel").innerHTML = parseFloat(document.getElementById("freq").value);
  this.filter.Q.value = document.getElementById("qlabel").innerHTML = parseFloat(document.getElementById("q").value);
  this.filter.gain.value = document.getElementById("gainlabel").innerHTML = parseFloat(document.getElementById("gain").value);
}

Filter.setupFilter = function(audioStream) {
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  // エフェクトを掛けて(ローパス)
  this.mic.connect(this.filter);
  this.filter.connect(this.output);
}

Filter.toggleFilter = function(element) {
  this.mic.disconnect(0);
  this.filter.disconnect(0);
  if(element.checked) {
    this.mic.connect(this.filter);
    this.filter.connect(this.output);
  } else {
    this.mic.connect(this.output);
  }
}
