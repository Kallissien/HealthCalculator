var User = {
		id: 0,
		name: 0,
		age : 0,
		gender: 0,
		gymMember: 0,
		gym: 0,
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
			break;
		case "exerciseLevel":
			if(element.value === "1"){
				phaseOut($('exerL'));
			} else {
				phaseIn($('exerL'));
			}
		 	User.exerciseLevel = element.value
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
$('input').change(function() {
	collectAnswers(this);
});
$('option').change(function() {
	collectAnswers(this);
});
// Calculation Function
$('.getResults').click(function(){
	//Collect all values
	var Answers = [];	
	console.log(User);
	// Calculate Calories
	// Men - Calories Burned = [(Age x 0.2017) — (Weight x 0.09036) + (Heart Rate x 0.6309) — 55.0969] x Time / 4.184.
	// Women - Calories Burned = [(Age x 0.074) — (Weight x 0.05741) + (Heart Rate x 0.4472) — 20.4022] x Time / 4.184.
	$('.question input:checked').each(function(){
		this.value;
	});
});
//Run Functions	
SetQuestionColour();
});