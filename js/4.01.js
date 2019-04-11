
var apply_force = document.getElementById('start');
apply_force.addEventListener("click", apply);
var reset = document.getElementById("reset");
reset.addEventListener("click", resetFunction);

var orangeBall = document.getElementById("circle1");
var blueBall = document.getElementById("circle2");
var purpleBall = document.getElementById("circle3");

var poolstick1 = document.getElementById('poolstick1');
var poolstick2 = document.getElementById('poolstick2');
var poolstick3 = document.getElementById('poolstick3');

function apply() {
    apply_force.style.visibility = "hidden";
    Velocity(poolstick1,{translateY:50},{duration:2000});
    Velocity(poolstick2,{translateX:-50},{duration:2000});
    Velocity(poolstick3,{translateX:-30,translateY:18},{duration:2000});

    setTimeout(stickBack,2800);
    setTimeout(move,3100);
    setTimeout(function(){reset.style.visibility = "visible"},3200);
}

function stickBack() {
    Velocity(poolstick1,{translateY:0},{duration:300});
    Velocity(poolstick2,{translateX:0},{duration:300});
    Velocity(poolstick3,{translateX:0,translateY:0},{duration:300});
}



function move() {

  Velocity(orangeBall,{translateX:89},{duration:1800, easing: 'linear'});
  Velocity(blueBall,{translateX:89, translateY:-61},{duration:1800, easing: 'linear'});
  Velocity(purpleBall,{translateY:-61},{duration:1800, easing: 'linear'});

}


function resetFunction() {
    
    Velocity(orangeBall,{translateX:0},{duration:0});
    Velocity(blueBall,{translateX:0, translateY:0},{duration:0});
    Velocity(purpleBall,{translateY:0},{duration:0});

    apply_force.style.visibility = "visible";
    reset.style.visibility = "hidden";

}
