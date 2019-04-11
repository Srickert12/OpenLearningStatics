var $ = function(id) {
  return document.getElementById(id);
}

//animation on the page 89
// HINT ELEMENTS
var hint_button = $('hint_button');
var hint_box = $('hint_box');
var hint_text = $('hint_text');
var correct = $('correctSign');
var wrong = $('wrongSign');
var hintCheck = 0;
var displayHint = true;//for allowing hint button to only highlight one drop down at a time.


//Key value pair list that consists of elementId, and answer for that element
var answerList = {"boxAB": "NR", "boxAC": "NR", "boxAD": "NR", "boxAE": "3RD", "boxAF": "NR", "boxAG": "NR", "boxAH" :"NR",
"boxBC": "NR", "boxBD": "NR", "boxBE": "NR", "boxBF": "3RD", "boxBG": "NR", "boxBH": "NR",
"boxCD": "NR", "boxCE": "EQ", "boxCF": "NR", "boxCG": "3RD", "boxCH": "NR",
"boxDE": "NR", "boxDF": "EQ", "boxDG": "NR", "boxDH": "3RD",
"boxEF": "NR", "boxEG": "NR", "boxEH": "NR",
"boxFG": "NR", "boxFH": "NR",
"boxGH": "NR"};

var selectedList = {"boxAB": false, "boxAC": false, "boxAD": false, "boxAE": false, "boxAF": false, "boxAG": false, "boxAH" : false,
"boxBC": false, "boxBD": false, "boxBE": false, "boxBF": false, "boxBG": false, "boxBH": false,
"boxCD": false, "boxCE": false, "boxCF": false, "boxCG": false, "boxCH": false,
"boxDE": false, "boxDF": false, "boxDG": false, "boxDH": false,
"boxEF": false, "boxEG": false, "boxEH": false,
"boxFG": false, "boxFH": false,
"boxGH": false};

var selectedList2 = {"boxAB": true, "boxAC": true, "boxAD": true, "boxAE": false, "boxAF": false, "boxAG": false, "boxAH" : false,
"boxBC": false, "boxBD": false, "boxBE": false, "boxBF": false, "boxBG": false, "boxBH": false,
"boxCD": false, "boxCE": false, "boxCF": false, "boxCG": false, "boxCH": false,
"boxDE": false, "boxDF": false, "boxDG": false, "boxDH": false,
"boxEF": false, "boxEG": false, "boxEH": false,
"boxFG": false, "boxFH": false,
"boxGH": false};

/*Boxes that have different hint respones = AE, CE, BF, DF, AG, CG, DH
AE, ? = That is not quite right, 3RD = Good Job! These represent the equal and opposite forces of the pin on the left link (A) and the left link on the pin (E).
EQ = Not quite.  Theses two forces act on different bodies, so they are not related by equilibrium
NR = That is not quite right.

CE, ? = That is not quite right., 3RD = Not quite.  These forces act on the same body, so they could not be related by Newton's 3rd Law.
EQ = Good Job! These represent the two vertical forces on the pin, and must be equal in magniteude if the pin is to be in equilibrium.
NR = That is not quite right. 
 
 BF, ? = That is not quite right., 3RD = Good Job! These represent the equal and opposite forces of the pin on the left link (B) and the left link on the pin (F)
EQ = Not quite.  Theses two forces act on different bodies, so they are not related by equilibrium.
NR = That is not quite right.

DF, ? = That is not quite right.,  3RD = Not quite.  These forces act on the same body, so they could not be related by Newton's 3rd Law.
EQ = Good Job! These represent the two horizontal forces on the pin, and must be equal in magniteude if the pin is to be in equilibrium.
NR = That is not quite right.

AG, ? = That is not quite right., 3RD = That is not quite right. These forces act on two bodies that do not touch each other, so the forces could not be related by Newton's 3rd Law.
EQ = Not quite. These two forces act on different bodies, so they are not related by equilibrium.
NR = Good Job! 

CG =  ? = That is not quite right., 3RD = Good Job! These represent the equal and opposite forces of the right link on the pin (C) and pin on the right link (G).
EQ = That is not quite right., NR = That is not quite right.

DH =  ? = That is not quite right., 3RD = Good Job! These represent the equal and opposite forces of the pin on the left link (D) and the left link on the pin (H)
EQ = EQ = Not quite.  Theses two forces act on different bodies, so they are not related by equilibrium.
NR = That is not quite right.
*/

//This checks the output of each form in the HTML table, the element argument in check answer,
// is the element of the selected HTML form
var selectMostRecent = false;
var selectMostRecentID;

function checkAnswer(element) {
      //displayHint = true;
      var elementId = element.id;
      document.getElementById(elementId).style.backgroundColor='white';
       if(element.value == answerList[elementId]) {
        selectMostRecent = false;
       	document.getElementById(elementId).style.color='green';//change font green because correct
        if(elementId == "boxAE" || elementId == "boxCE" || elementId == "boxBF" || elementId == "boxDF" || elementId == "boxAG" || elementId == "boxCG" || elementId == "boxDH"){
        	complex_hint_correct(elementId);
        } else{
        	hint_correct();
        }
        selectedList[elementId] = true;//make it already selected to it cannot be yellow
       }
       else {
        selectMostRecent = true;
        selectMostRecentID = elementId;
       	document.getElementById(elementId).style.color='red'; //change font red because it is wrong
       	    if(elementId == "boxAE" || elementId == "boxCE" || elementId == "boxBF" || elementId == "boxDF" || elementId == "boxAG" || elementId == "boxCG" || elementId == "boxDH"){
        		complex_hint_wrong(elementId, element.value);
        	} else{
        		hint_wrong();
        	}
        selectedList[elementId] = false;//make it unselected so it can be yellow again.
       }

}


function highLightDropDown() {//This highlights the drop down to be selected
  if(selectMostRecent) {  //too highlight the recently selected wrong answer. 
    if(displayHint) {
      document.getElementById(selectMostRecentID).style.background='yellow';
    } else if(!displayHint){
      document.getElementById(selectMostRecentID).style.background='white';
     // selectMostRecent =false;
  }
}


else { //highlight the next one to be completed. 
  if(displayHint){  // To display only one hint
     for (var k in selectedList){
        if (selectedList[k] == false) {
           // selectedList[k] = true;  //Removed this logic
            document.getElementById(k).style.backgroundColor='yellow';
            break;
          }
      }
     // displayHint = !displayHint; 
  } else if(!displayHint){  // To make hint unhighlighted
     for (var k in selectedList){
      // if (selectedList[k] == true) { //This does opposite of conditinal above, finds the first 
            //selectedList[k] = false;  // selected dropdown in list, and makes it unselected and turns white
            document.getElementById(k).style.backgroundColor='white';
            //break;
          //}
     }
     //displayHint = !displayHint; 
  }


}
}


function hint_wrong() {  //Standard Incorrect hint
  //displayHint = false; //to fix the bug
  correct.style.visibility = "hidden";
  wrong.style.visibility = "visible";
  hint_text.innerHTML = "That's not quite right."
  hint_box.style.visibility = "visible";
  hintRed();
  $("hint_box").style.height = "32px";
  $("hint_hat").style.visibility = "visible";
  $("hint_hat2").style.visibility = "hidden";

}


function hint_correct() { // Standard correct hint
  correct.style.visibility = "visible";
  wrong.style.visibility = "hidden";
  hint_text.innerHTML = "Good job."
  hint_box.style.visibility = "visible";
  //change the color of the hint box

  hintGreen();
  $("hint_box").style.height = "32px";
  $("hint_hat").style.visibility = "visible";
  $("hint_hat2").style.visibility = "hidden";

}

function complex_hint_wrong(element, choice){
  correct.style.visibility = "hidden";
  wrong.style.visibility = "visible";
  //Logic to check for what hint to give back
  if(element == "boxAE") {
  	if(choice == "?") {
  		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  	if(choice == "EQ") {
		hint_text.innerHTML = "Not quite.  Theses two forces act on different bodies, so they are not related by equilibrium.";
        $("hint_box").style.height = "64px";
  	}
  	if(choice == "NR") {
		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  }
  if(element == "boxCE") {
  	if(choice == "?") {
  		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  	if(choice == "3RD") {
		hint_text.innerHTML = "Not quite.  These forces act on the same body, so they could not be related by Newton's 3rd Law.";
        $("hint_box").style.height = "64px";
  	}
  	if(choice == "NR") {
		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  }
  if(element == "boxBF") {
  	if(choice == "?") {
  		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  	if(choice == "EQ") {
		hint_text.innerHTML = "Not quite.  Theses two forces act on different bodies, so they are not related by equilibrium.";
        $("hint_box").style.height = "64px";
  	}
  	if(choice == "NR") {
		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  }
  if(element == "boxDF") {
  	if(choice == "?") {
  		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  	if(choice == "3RD") {
		hint_text.innerHTML = "Not quite.  These forces act on the same body, so they could not be related by Newton's 3rd Law.";
        $("hint_box").style.height = "64px";
  	}
  	if(choice == "NR") {
		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  }
  if(element == "boxAG") {
  	if(choice == "?") {
  		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  	if(choice == "3RD") {
		hint_text.innerHTML = "That is not quite right. These forces act on two bodies that do not touch each other, so the forces could not be related by Newton's 3rd Law.";
        $("hint_box").style.height = "64px";
  	}
  	if(choice == "EQ") {
		hint_text.innerHTML = "Not quite. These two forces act on different bodies, so they are not related by equilibrium.";
        $("hint_box").style.height = "64px";
  	}
  }
  if(element == "boxCG") {
    if(choice == "?") {
  		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  	if(choice == "EQ") {
		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  	if(choice == "NR") {
		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  }
  if(element == "boxDH") {
  	if(choice == "?") {
  		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  	if(choice == "EQ") {
		hint_text.innerHTML = "Not quite.  Theses two forces act on different bodies, so they are not related by equilibrium.";
        $("hint_box").style.height = "64px";
  	}
  	if(choice == "NR") {
		hint_text.innerHTML = "That is not quite right.";
        $("hint_box").style.height = "32px";
  	}
  }
  //hint_text.innerHTML = "That's not quite right."
  hint_box.style.visibility = "visible";
  hintRed();
}

function complex_hint_correct(element) {
  correct.style.visibility = "visible";
  wrong.style.visibility = "hidden";
  //Logic to check for what hint to give back
  if(element == "boxAE") {
  	hint_text.innerHTML = "Good Job! These represent the equal and opposite forces of the pin on the left link (A) and the left link on the pin (E)."
    $("hint_box").style.height = "64px";
  }
  if(element == "boxCE") {
  	hint_text.innerHTML = "Good Job! These represent the two vertical forces on the pin, and must be equal in magniteude if the pin is to be in equilibrium.";
    $("hint_box").style.height = "64px";
  }
  if(element == "boxBF") {
  	hint_text.innerHTML = "Good Job! These represent the equal and opposite forces of the pin on the left link (B) and the left link on the pin (F)";
    $("hint_box").style.height = "64px";
  }
  if(element == "boxDF") {
  	hint_text.innerHTML = "Good Job! These represent the two horizontal forces on the pin, and must be equal in magniteude if the pin is to be in equilibrium.";
    $("hint_box").style.height = "64px";
  }
  if(element == "boxAG") {
  	hint_text.innerHTML = "Good Job!";
    $("hint_box").style.height = "32px";
  }
  if(element == "boxCG") {
  	hint_text.innerHTML = "Good Job! These represent the equal and opposite forces of the right link on the pin (C) and pin on the right link (G).";
    $("hint_box").style.height = "64px";
  }
  if(element == "boxDH") {
  	hint_text.innerHTML = "Good Job! These represent the equal and opposite forces of the pin on the left link (D) and the left link on the pin (H)";
    $("hint_box").style.height = "64px";
  }
  hint_box.style.visibility = "visible";
  hintGreen();
  
}

function hintGreen() {
  hint_box.style.background = "#DEFFDD";
  hint_box.style.borderColor = "#32AA33";
  $("close").style.visibility = "visible";
}

function hintRed() {
  hint_box.style.background = "#F4D0C9";
  hint_box.style.borderColor = "#E75C36";
  $("close").style.visibility = "visible";
}

function hint_display() {
  $("hint_box").style.visibility = "visible";
  $("close").style.visibility = "visible";
  $("hint_hat").style.visibility = "hidden";
  $("hint_hat2").style.visibility = "visible";
  hint_text.innerHTML = "Does a pair of forces act on the same body and must balance, or do they represent the equal and opposite forces that that two bodies exert on each other?";
  hint_box.style.borderColor = "#73716e";
  hint_box.style.background = "#FDEAA2";
  hint_box.style.height = "70px"; 
  correct.style.visibility = "hidden";
  wrong.style.visibility = "hidden";
  displayHint = true;//maybe
 highLightDropDown();
}

function hint_close() {
  correct.style.visibility = "hidden";
  wrong.style.visibility = "hidden";
  hint_box.style.visibility = "hidden";
  $("close").style.visibility = "hidden";
  $("hint_hat").style.visibility = "visible";
  $("hint_hat2").style.visibility = "hidden";
  hint_text.innerHTML = "Does a pair of forces act on the same body and must balance, or do they represent the equal and opposite forces that that two bodies exert on each other?";
  hint_box.style.borderColor = "#73716e";
  hint_box.style.background = "#FDEAA2";
  hint_box.style.height = "70px"; 
  correct.style.visibility = "hidden";
  wrong.style.visibility = "hidden";
  displayHint = false;
  highLightDropDown();
}
