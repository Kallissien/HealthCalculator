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
function phaseOut(element){ 
	$(element).animate({
		left: "0",
		opacity: "1"		  
	}, 100);
}
// RADIO BOXES
$('input').change(function() {
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
		 case "gym":
		 	if(this.value === "1"){
				User.gymMember = true;
				phaseIn($('#Wgym'));
				}
		 	break;
		 case "exerciseLevel":
		 	User.exerciseLevel = this.value
		 	break;
		 case "exerciseDuration":
		 	User.exerciseDuration = this.value
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