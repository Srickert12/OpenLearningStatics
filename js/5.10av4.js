// buttons
var show_motion = document.getElementById('start');
show_motion.addEventListener("click", apply);
var reset = document.getElementById('reset');
reset.addEventListener("click", resetButton);

// Range slider (yellow triangle)
var triangleSlide = document.getElementById("triangleSlide");

// X value below arrow that shows current triangle position
var x_value = document.getElementById("x_value");
var right_arrow_x = document.getElementById("right_arrow_x");
var line_between_x = document.getElementById("line_between_x");

// text to disappear when button is clicked
var right_arrow_2h = document.getElementById("right_arrow_2h");
var left_arrow_2h = document.getElementById("left_arrow_2h");
var line_between_2h = document.getElementById("line_between_2h");
var left_arrow_x = document.getElementById("left_arrow_x");
var top_arrow_h = document.getElementById("top_arrow_h");
var bottom_arrow_h = document.getElementById("bottom_arrow_h");
var line_between_h = document.getElementById("line_between_h");
var x = document.getElementById("x");
var h = document.getElementById("h");
var h2 = document.getElementById("h2");

// gray boxes to move
var boxes = document.getElementById('boxes');

// sets initial x value to .8h
x_value.innerHTML = triangleSlide.value/100 + "h";

// updates x value and x arrow to current triangle value when triangle is moved
triangleSlide.oninput = function() {
    x_value.innerHTML = this.value/100 + "h";
    right_arrow_x.style.left = 50 + this.value*1.3 + "px";
    line_between_x.style.width = this.value*1.3 + "px";
    // If range slider value is 0, x arrow disappears
    if (this.value == 0) {
        right_arrow_x.style.visibility = "hidden";
        left_arrow_x.style.visibility = "hidden";
        line_between_x.style.visibility = "hidden";
    }
    else {
        right_arrow_x.style.visibility = "visible";
        left_arrow_x.style.visibility = "visible";
        line_between_x.style.visibility = "visible";
    }
}

function apply() {
    // change button to reset
    show_motion.style.visibility = "hidden";
    reset.style.visibility = "visible";
    
    // disable movement of slider
    triangleSlide.disabled = true;
    
    // remove all text and arrows
    right_arrow_2h.style.visibility = "hidden";
    left_arrow_2h.style.visibility = "hidden";
    line_between_2h.style.visibility = "hidden";
    top_arrow_h.style.visibility = "hidden";
    bottom_arrow_h.style.visibility = "hidden";
    line_between_h.style.visibility = "hidden";
    x.style.visibility = "hidden";
    h.style.visibility = "hidden";
    h2.style.visibility = "hidden";
    x_value.style.visibility = "hidden";
    right_arrow_x.style.visibility = "hidden";
    left_arrow_x.style.visibility = "hidden";
    line_between_x.style.visibility = "hidden";
    
    // Sets duration of animation (speed increases farther out from middle of boxes triangle is)
    var duration1 =  3000 + ((triangleSlide.value) * 80);
    var duration2 = 10060 - ((triangleSlide.value - 67)*50);
    // If triangle slider is less than .68h, rotate right, else rotate left
    if (triangleSlide.value < 67) {
        boxes.style.transformOrigin = triangleSlide.value/(2*1.1) + 10 +"% 18%";
        Velocity(boxes, {rotateZ: 57}, {duration: duration1, easing: 'easeInCirc'});
    }
    else {
        boxes.style.transformOrigin = triangleSlide.value/(2*1.1) + 10 +"% 22%";
        Velocity(boxes, {rotateZ: -57}, {duration: duration2, easing: 'easeInCirc'});
    }
}

function resetButton() {
    // change button to show motion
    reset.style.visibility = "hidden";
    show_motion.style.visibility = "visible";
    
    // enable movement of slider
    triangleSlide.disabled = false;
    
    // re-add all text and arrows
    right_arrow_2h.style.visibility = "visible";
    left_arrow_2h.style.visibility = "visible";
    line_between_2h.style.visibility = "visible";
    top_arrow_h.style.visibility = "visible";
    bottom_arrow_h.style.visibility = "visible";
    line_between_h.style.visibility = "visible";
    x.style.visibility = "visible";
    h.style.visibility = "visible";
    h2.style.visibility = "visible";
    x_value.style.visibility = "visible";
    right_arrow_x.style.visibility = "visible";
    left_arrow_x.style.visibility = "visible";
    line_between_x.style.visibility = "visible";
    triangleSlide.style.visibility = "visible";
    
    // If slider value is 0 when reset, keep x arrow hidden
    if(triangleSlide.value == 0) {
        right_arrow_x.style.visibility = "hidden";
        left_arrow_x.style.visibility = "hidden";
        line_between_x.style.visibility = "hidden";
    }
    // reset boxes
    Velocity(boxes, "stop");
    Velocity(boxes, {rotateZ: 0}, {duration: 0});
}

