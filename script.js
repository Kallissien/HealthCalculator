var User = {
		id: 0,
		name: 0,
		age : 0,
		gender: 0,
		gymMember: 0,
		gym: 0,
		gymPrice: 0,
		exerciseLevel: 0,
		exerciseDuration: 0,
		height: 0,
		weight: 0,
		heartRate: 0
	};
$(document).ready(function(){
	
var randomColour = '#'+Math.floor(Math.random()*16777215).toString(16);
var questions = document.getElementsByClassName('question');

var SetQuestionColour = function(){
		for (var i = 0 ; i < questions.length ; i++){
			questions[i].style.background = randomColour;
			randomColour = '#'+Math.floor(Math.random()*16777215).toString(16);
		}
	}
// Clear Text Box when focus
var inputBoxes = $('input');
var textBoxes = $('input[type=text]');
textBoxes.focus(function(){
	if (this.value.indexOf('Enter') != -1 || this.value.indexOf('Whoops') != -1){
	this.value = "";
	}
});
// Functions
function phaseIn(element){ 
	$(element).animate({
		left: "0",
		opacity: "1"		  
	}, 100);
}
function phaseOut(element){ 
	$(element).animate({
		left: "50%",
		opacity: "0"
	}, 100);
}
function collectAnswers(element){
	 var inputName = element.name;
	 switch(inputName){
		case "yourName":
		 	User.name = element.value
			$('.aboutyou h2').text("About " + User.name)
		 	break;		 
		case "age":
		 	User.age = element.value
		 	break;
		case "gender":
		 	User.gender = element.value
		 	break;
		case "gymMember":
		 	if(element.value === "1"){
				User.gymMember = true;
				phaseIn($('#whichGym'));
				}
			if(element.value === "0"){
				User.gymMember = false;
				phaseOut($('#whichGym'));
				}
		 	break;
		case "gym":
			if(element.value === "1"){
				User.gymPrice = 84;
				}
				if(element.value === "2"){
				User.gymPrice = 73;
				}
			break;
		case "exerciseLevel":
			if(element.value === "0"){
				phaseOut($('#exerD'));
				$('input:text[name="exerciseLevel"]').val("");
			} else {
				phaseIn($('#exerD'));
				$('input:radio[name="exerciseLevel"]').prop('checked', false);
			}
			if($(element).parent().children('select').val() === "week"){
				User.exerciseLevel = element.value
			} else{	User.exerciseLevel = (element.value / 4);
			}
		 	break;
		case "exerciseDuration":
		 	User.exerciseDuration = element.value
		 	break;
		case "height":
		 	if($(element).parent().children('select').val() === "feet"){
				// Get Entered Weight	
				var baseHeight = element.value;
				var splitHeight = baseHeight.split('.');
				var feet = splitHeight[0];
				var inches = splitHeight[1] / 12;
				var heightDecimal = parseInt(feet) + inches;			
				var convertedHeight = (heightDecimal/0.032808);
				User.height = Math.floor(convertedHeight);
			} else{
				User.height = element.value;
			}
		 	break;
		case "heightUnits":
		 	console.log("feet");
		 	break;
		case "weight":
			if($(element).parent().children('select').val() === "lb"){	
				var baseWeight = element.value;
				var splitWeight = baseWeight.split('.');
				var stone = splitWeight[0];
				var lb = splitWeight[1];
				//convert all to lb
				var weightInLb = (stone * 14) + parseInt(lb);
				var weightInKg = weightInLb * 0.453592;
				User.weight = Math.floor(weightInKg);
			} else{
				User.weight = element.value;		 	
			}
			break;
		case "heartRate":
		 	User.heartRate = element.value
		 	break;
		 }
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
$('input').change(function() {
	collectAnswers(this);
});
$('select').change(function() {
	collectAnswers(this);
});
function rotateRight(){
	var sections = $("section");
	for(var i=0 ; i<sections.length ; i++){
		var thisSection = sections[i];
		if(thisSection.className.indexOf("deg1") != -1){
			$(thisSection).removeClass("deg1");
			$(thisSection).addClass("deg3");
		} else if(thisSection.className.indexOf("deg2") != -1){
			$(thisSection).removeClass("deg2");
			$(thisSection).addClass("deg1");
		} else if(thisSection.className.indexOf("deg3") != -1){
			$(thisSection).removeClass("deg3");
			$(thisSection).addClass("deg2");
		}		
	}
}
// Input Functions
$("section").click(function(){
	var thisSection = this.className;
	if(thisSection != -1){
		while(thisSection.indexOf("deg1") === -1){
			rotateRight();
			thisSection = this.className;
		}
	}
});
// Calculation Function
$('.getResults').click(function(){
	//Collect all values
	var Answers = [];	
	console.log(User);
	if(User.gender === "Boy"){
		var caloriesBurned = Math.round((((parseInt(User.age) * 0.2017) + (parseInt(User.weight) * 0.1988) + (User.heartRate * 0.6309) - 55.0969) * parseInt(User.exerciseDuration) / 4.184));
		console.log(caloriesBurned);
	}
	else if(User.gender === "Girl"){
		var caloriesBurned = Math.round((((parseInt(User.age) * 0.074) + (parseInt(User.weight) * 0.1263) + (User.heartRate * 0.4472) - 20.4022) * parseInt(User.exerciseDuration) / 4.184));
	}
	var caloriesPerWeek = caloriesBurned * User.exerciseLevel;
	var caloriesPerMonth = caloriesPerWeek * 4;
	var pricePerCalorie = parseInt(User.gymPrice) / caloriesPerMonth;
	console.log(caloriesBurned);
	console.log(Math.round(pricePerCalorie));
});
//Run Functions	
SetQuestionColour();
});