var yourName = null;
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

// Clear Text Box when focus
var inputBoxes = $('input');
var textBoxes = $('input[type=text]');
textBoxes.focus(function(){
	if (this.value.indexOf('Enter') != -1 || this.value.indexOf('Whoops') != -1){
	this.value = "";
	}
});
textBoxes.focusout(function(){
	if (this.value === ""){
	this.value = "Whoops, try again";
	} else if (this.id === 'yourName'){
		yourName = this.value;
		console.log(yourName);
	}
});

// Calculation Function
$('.getResults').click(function(){
	//Collect all values
	var age = $('input[name="age"]:checked').val();
	var gender = $('input[name="gender"]:checked').val();
	
	for(var i = 0 ; i< $('.question').length ; i++){		
		console.log(inputBoxes[i].value);
		}	
});
//Run Functions	
SetQuestionColour();

if($('#gymY').prop("checked") === true){
	alert('Booyah');
	}
});

/* Calculation
Men use the following formula:

Calories Burned = [(Age x 0.2017) — (Weight x 0.09036) + (Heart Rate x 0.6309) — 55.0969] x Time / 4.184.

Women use the following formula:

Calories Burned = [(Age x 0.074) — (Weight x 0.05741) + (Heart Rate x 0.4472) — 20.4022] x Time / 4.184.
*/