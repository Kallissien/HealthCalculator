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
var currentQuestion = 1;
var currentStep = 1;

$(document).ready(function(){
/*
var randomColour = '#'+Math.floor(Math.random()*16777215).toString(16);
var questions = document.getElementsByClassName('question');

var SetQuestionColour = function(){
		for (var i = 0 ; i < questions.length ; i++){
			questions[i].style.background = randomColour;
			randomColour = '#'+Math.floor(Math.random()*16777215).toString(16);
		}
	}
	*/
// Clear Text Box when focus
$('input[type=text]').focus(function(){
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
			if (User.gender === "girl"){
				$(".aboutyou img").attr("src", "images/youF.png")
			} else if (User.gender === "boy"){
				$(".aboutyou img").attr("src", "images/youM.png")
			}
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
	var questions = $(".questionContainer");
	var currentQuestion = questions
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
function fadeOutQuestions(){
	$(".questionContainer").each(function(){
			$(this).css("opacity", 0);
			$(this).css("z-index", 0);
		});
	}
function changeQuestion(nextQuestion, nextStep){
	if (currentQuestion === nextQuestion){}
		else{
			$("#question" + nextQuestion).css("opacity", 1);
			$("#question" + nextQuestion).css("z-index", 1);
			currentQuestion = nextQuestion;
			if(currentStep === nextStep){}
			else{changeStep(nextStep);}
		}
	}
function changeStep(nextStep){
	if(currentStep === nextStep){		
		}
	else{ 
			$(".breadcrumb").each(function(){
				$(this).css("transform", "scale(1)");
				$(this).css("background", "white");
			});
		var questionContainer = 	$("#question" + currentQuestion);
		if(nextStep === 1){
			$(questionContainer).css("transform", "translateX(0%)");
		} else if(nextStep === 2){
			$(questionContainer).css("transform", "translateX(-33%)");
		} else if(nextStep === 3){
			$(questionContainer).css("transform", "translateX(-65%)");
		}
		currentStep = nextStep;		
		}
	$("#breadcrumb" + currentStep).css("transform", "scale(1.2)");
	$("#breadcrumb" + currentStep).css("background", "rgb(60, 133, 244)");
}
// Input Functions
$("section").click(function(){
	var thisSection = this.className;	
	if(thisSection.indexOf("deg1") != -1){
	} else if(thisSection != -1){
		fadeOutQuestions();
		while(thisSection.indexOf("deg1") === -1){
			rotateRight();
			thisSection = this.className;
		}
		if (thisSection.indexOf("aboutyou") != -1){
			var nextQuestion = 1;
				changeQuestion(nextQuestion, 1);
		}else if (thisSection.indexOf("Fitness") != -1){
			var	nextQuestion = 2;
			changeQuestion(nextQuestion, 1);
		} else if (thisSection.indexOf("Health") != -1){
			var nextQuestion = 3;
				changeQuestion(nextQuestion, 1);
		}
	}
});
$("button").click(function(){
	if (this.id === "next"){
		var nextStep = currentStep + 1;
		if (nextStep === 4){
			nextQuestion = currentQuestion + 1;
			changeQuestion(nextQuestion, 1);
			} else{
		changeStep(nextStep)	;
					}
	} else if (this.id === "previous"){
		var nextStep = currentStep - 1;
		if (nextStep < 1){
			nextStep = 1;
			} else{
		changeStep(nextStep)	;
					}
	}
});
$(".breadcrumb").click(function(){
	var nextStep = parseInt(this.id.substring(this.id.length - 1, this.id.length));
	changeStep(nextStep);
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
changeQuestion(1);
changeStep(1);
});