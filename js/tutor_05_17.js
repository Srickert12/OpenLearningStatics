// Get document elements
var fingerSlider = document.getElementById("fingerSlider");
var thetaVal = document.getElementById("theta_value");
var nVal = document.getElementById("n_value");
var tVal = document.getElementById("t_value");
var brownBar = document.getElementById("brown_bar");
var circle = document.getElementById("circle");
var boxes = document.getElementById("gray_boxes");

// Set initial number values
thetaVal.innerHTML = 80;
nVal.innerHTML = 0.5;
tVal.innerHTML = 3.04;

// when slider is moved
fingerSlider.oninput = function() {
    
    // Equation variables
    var d = 100 - (this.value);
    var h = 100;
    var n = h/(2*d);
    var theta = Math.atan((6*d)/h);
    theta = toDegrees(theta);
    var t = 3/Math.sin(toRad(theta));
    
    // set number values based on sliders current val
    thetaVal.innerHTML = (theta).toFixed(0);
    nVal.innerHTML = (n).toFixed(2);
    tVal.innerHTML =(t).toFixed(2);
                
    //Rotate brown pendulum based on slider val (theta)
    brownBar.style.transform = "rotate(" + (-10 - (80 - theta)) + "deg)";
    
    // Move boxes and circle with pendulum
    boxes.style.left = 29 + 130*Math.cos(toRad(theta)) + "px";
    boxes.style.top = 49 + 130*Math.sin(toRad(theta)) + "px";
    circle.style.left = 18 + 130*Math.cos(toRad(theta)) + "px";
    circle.style.top = 50 + 130*Math.sin(toRad(theta)) + (100 - this.value)/2 + "px";
    
    // Set values to infinity if finger is all the way up
    if(this.value == 100) {
        nVal.innerHTML = "Infinity";
        tVal.innerHTML = "Infinity";
        thetaVal.innerHTML = "0";
    }
    
    if(this.value == 0) {
        thetaVal.innerHTML = 80;
    }
}

// Changes degrees to radians for use with movement
function toRad(degrees) {
	var rad = degrees*Math.PI / 180;
	return rad;
}

// Changes radians to degrees
function toDegrees(rads) {
    var degrees = rads * 180 / Math.PI
    return degrees;
}

