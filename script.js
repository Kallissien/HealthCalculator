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
// Find Radio and run function
var radios = $('input[type=radio]');
/*
radios.click(function(){
	if(this.checked === true){
		var currentRadio = this;
			// If Member of gym
			if (this.id === "gymY" && $('#Wgym').css('opacity') === '0'){
					$('#Wgym').animate({
						left: "0",
						opacity: "1"		  
					}, 100);
				} else if(this.id === "gymN" && $('#Wgym').css('opacity') != '0'){
					$('#Wgym').animate({
					  left: "50%",
					  opacity: "0"
					}, 100 );
				}
			if (this.id === "exerN" && $('#exerL').css('opacity') != '0'){
					$('#exerL').animate({
					  left: "50%",
					  opacity: "0"
					}, 100 );
				} else if(this.className === "exerO" && this.id != "exerN" && $('#exerL').css('opacity') === '0'){
					$('#exerL').animate({
					  left: "0",
					  opacity: "1"
					}, 100 );
					}
			}
	});
	*/
// TEXT BOXES
// Clear Text Box when focus
var inputBoxes = $('input');
var textBoxes = $('input[type=text]');
textBoxes.focus(function(){
	if (this.value.indexOf('Enter') != -1 || this.value.indexOf('Whoops') != -1){
	this.value = "";
	}
});
/*
textBoxes.focusout(function(){
	if (this.value === ""){
	this.value = "Whoops, try again";
	}
	var inputName = this.id;
	switch(inputName){
		case "yourName":
		 	User.name = this.value
			$('.aboutyou h2').text("About " + User.name)
		 break;
		 case "height":
		 	User.height = this.value
		 break;
		 case "weight":
		 	User.weight = this.value
		 break;
		 case "heartrate":
		 	User.heartRate = this.value
		 break;
		}
});
*/
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
function collectAnswers(){
	 var inputName = this.name;
	 switch(inputName){
		case "yourName":
		 	User.name = this.value
			$('.aboutyou h2').text("About " + User.name)
		 	break;		 
		case "age":
		 	User.age = this.value
		 	break;
		case "gender":
		 	User.gender = this.value
		 	break;
		case "gymMember":
		 	if(this.value === "1"){
				User.gymMember = true;
				phaseIn($('#whichGym'));
				}
			if(this.value === "0"){
				User.gymMember = false;
				phaseOut($('#whichGym'));
				}
		 	break;
		case "gym":
			break;
		case "exerciseLevel":
		 	User.exerciseLevel = this.value
		 	break;
		case "exerciseDuration":
		 	User.exerciseDuration = this.value
		 	break;
		case "height":
		 	if($(this).parent().children('select').val() === "feet"){
				// Get Entered Weight	
				var baseHeight = this.value;
				var splitHeight = baseHeight.split('.');
				var feet = splitHeight[0];
				var inches = splitHeight[1] / 12;
				var heightDecimal = parseInt(feet) + inches;			
				var convertedHeight = (heightDecimal/0.032808);
				User.height = Math.floor(convertedHeight);
			} else{
				User.height = this.value;
			}
		 	break;
		case "weight":
			if($(this).parent().children('select').val() === "lb"){	
				var baseWeight = this.value;
				var splitWeight = baseWeight.split('.');
				var stone = splitWeight[0];
				var lb = splitWeight[1];
				//convert all to lb
				var weightInLb = (stone * 14) + lb;
				var weightInKg = weightInLb * 0.453592;
				User.weight = weightInKg;
			} else{
				User.weight = this.value;		 	
			}
			break;
		case "heartrate":
		 	User.heartRate = this.value
		 	break;
		 }
}
$('input').change(function() {
	collectAnswers();
});
$('option').change(function() {
	collectAnswers();
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