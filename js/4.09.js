var instructions = document.getElementById('instructions');
var leftWheel = document.getElementById('leftWheel');
var rightWheel = document.getElementById('rightWheel');

var leftBlueArrow1 = document.getElementById('leftBlueArrow1');
var leftBLueArrow2 = document.getElementById('leftBlueArrow2');

var applied2 = false;
var applied2_2 = false;
var forcesBox = document.getElementById('forcesBox');

document.getElementById('redDownArrow').style.visibility = "hidden"; // initial hide of arrow
/******************* dynamic string elements *******************/

/***Left side elements***/
var output = document.getElementById('force');

var applied1 = false;
var plus_pos = 0.0;

var spinWheels = false;

//var apply_force = document.getElementById('apply_force'); // grab a reference to your 
//TODO also save value of force upon reset. 
function forceDirection() {
    if(document.getElementById('upforce').checked) {
         document.getElementById('redUpArrow').style.visibility = "visible";
         document.getElementById('redDownArrow').style.visibility = "hidden";
        
    } else {
        document.getElementById('redDownArrow').style.visibility = "visible";
        document.getElementById('redUpArrow').style.visibility = "hidden";
    }
    
}

function spinWheel1() {
    var durationNum;  //  Edit this to make it work
    var rotationVar;
    var force = parseInt(document.getElementById('force').value);
    if(document.getElementById('upforce').checked) {
        rotationVar = "-360deg";
        durationNum = 50000/ (force * 3 + 10); // as duration num gets smaller it goes faster
    }
    else {  //  TODO Logic of this
        
        if(force == 0) {
            rotationVar = "-360deg";
            durationNum = 50000 / 10;
        }
        else if(force < 5) {
             rotationVar = "-360deg";
            durationNum = 50000 / (6 - force); //(1/force) - (.1 * (1/force ))); // make weaker duration num
        }
        else {
             rotationVar = "360deg";
            durationNum = 50000/ (force * 1.75 - 8.75);  
        }
    }

	reset.style.visibility = "visible";
	  //setTimeout(fadeOut,100); use fade functions for the arrows
	  Velocity(leftWheel, {
	    rotateZ: "-360deg"
	  }, {
	    duration: 50000 / 10, //should be force val here
			easing: 'linear',
			loop: true
	  });
    
    	  Velocity(rightWheel, {
	    rotateZ: rotationVar
	  }, {
	    duration: durationNum  , // change val of force
			easing: 'linear',
			loop: true
	  });
	fadeOut();
}

function apply(){
	//check if apply to wheel 1 or 2
	if(!applied2){
		apply_dynamic();
	}
      if (!applied2_2){
		  //apply_dynamic2();
	  }
	apply_force.style.visibility = "hidden";
}

var acc1 = 1;
var speed1 = 1;

// Animation for dynamic string appling force
function apply_dynamic(){
	applied1 = true;
	spinWheel1();
	
	if(!applied1){
		acc1++;
		speed1 = speed1 + acc1;
		setTimeout(apply_dynamic,20);
	}
}



function fadeOut() {  // add all the variables for fadeOut and fadeIn
  Velocity(leftBlueArrow1, "fadeOut", {
    duration: 1500
  });
  Velocity(leftBlueArrow2, "fadeOut", {
    duration: 1500
  });
  Velocity(rightBlueArrow1, "fadeOut", {
    duration: 1500
  });
  Velocity(rightBlueArrow2, "fadeOut", {
    duration: 1500
  });
  Velocity(left10N, "fadeOut", {
    duration: 1500
  });
  Velocity(left15N, "fadeOut", {
    duration: 1500
  });
  Velocity(right10N, "fadeOut", {
    duration: 1500
  });
  Velocity(right15N, "fadeOut", {
    duration: 1500
  });
     Velocity(redUpArrow, "fadeOut", {
    duration: 1500
  });
    Velocity(redDownArrow, "fadeOut", {
    duration: 1500
  });
}

function fadeIn() {
  Velocity(leftBlueArrow1, "fadeIn", {
    duration: 100
  });
  Velocity(leftBlueArrow2, "fadeIn", {
    duration: 100
  });
   Velocity(rightBlueArrow1, "fadeIn", {
    duration: 100
  });
  Velocity(rightBlueArrow2, "fadeIn", {
    duration: 100
  });
  Velocity(left10N, "fadeIn", {
    duration: 100
  });
  Velocity(left15N, "fadeIn", {
    duration: 100
  });
  Velocity(right10N, "fadeIn", {
    duration: 100
  });
  Velocity(right15N, "fadeIn", {
    duration: 100
  });
 Velocity(redUpArrow, "fadeIn", {
    duration: 100
  });
    Velocity(redDownArrow, "fadeIn", {
    duration: 100
  });
}



apply_force.onclick = function(){
	document.getElementById("upforce").disabled = true;
  document.getElementById("downforce").disabled = true;
   document.getElementById("force").disabled = true;
  apply()
} 
reset.onclick = function() {
  document.getElementById("upforce").disabled = false; 
  document.getElementById("downforce").disabled = false;
  document.getElementById("force").disabled = false;
  resetFunction();
}

function resetFunction() {
  fadeIn();
  //document.getElementById('force').value = 0;
  Velocity(leftWheel, "stop");
  Velocity(rightWheel, "stop");
  Velocity(leftWheel,{translateY:0, rotateZ: 0},{duration:0});
  Velocity(rightWheel,{translateY:0, rotateZ: 0},{duration:0});
  reset.style.visibility = "hidden";
  apply_force.style.visibility = "visible";
}

