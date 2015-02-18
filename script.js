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
		heartRate: 0,
		bmr: 0,
		cpw: 0,
		cpd: 0,
		ppc:0
		
	};
var currentQuestion = 1;
var currentStep = 1;
var allAnswers = false;

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
$(document).ready(function(){
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
function infoText(text){
	$("#infoText" + currentQuestion + currentStep).text(text);
}
function infoTextColour(colourChoice){
	var colour = 0;
	if (colourChoice === "good"){colour = "rgb(15, 163, 67)";}
	else if (colourChoice === "bad"){colour = "rgb(249, 68, 68)";}
	if (colourChoice === "maybe"){colour = "rgb(207, 207, 207)";}	
	$("#infoText" + currentQuestion + currentStep).css("color", colour);
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function collectAnswers(element){
	 var inputName = $(element).attr("name");
	 switch(inputName){
		case "yourName":
		// Catch bad entries
		if (isNumeric(element.value)){
			infoText("There's no way " + "'" + element.value + "'" + " is your real name!");
			infoTextColour("bad");
			} else {
				User.name = element.value;
				$('.aboutyou h2').text("About " + User.name);
				if(User.name != 0){
					$("#progressDot11").css("background-color", "rgb(5, 163, 5)");
					infoText("Hi " + User.name + ", click 'Next' to move on:");
					infoTextColour("good");
				}
			}
		 	break;		 
		case "age":
		//Catch Bad Entries
			if (!isNumeric(element.value)){
				$(element).css("outline", "rgb(247, 62, 62) 2px solid;");
				element.value = "";
				infoText("Please enter a valid number");
				infoTextColour("bad");
				$("#progressDot12").css("background-color", "rgb(226, 226, 226)");
			} else{
				User.age = parseInt(element.value);
				var MinHR = Math.round((70/100) * (225 - User.age));
				var MaxHR =  Math.round((75/100) * (225 - User.age));
				$("#heartRate").text(MinHR + "-" + MaxHR);
				if(User.age > 10 && User.age < 100){
					$("#progressDot12").css("background-color", "rgb(5, 163, 5)");
					infoText("Thanks! Now click Next to move on:");
					infoTextColour("good");
				} else if(User.age >= 100){
					infoText("Wow, you're doing pretty well getting this far!");
					infoTextColour("maybe");
					}
					else if(User.age <= 10){
					infoText("You're a bit young for this. The internet is a dark and scary place!");
					infoTextColour("maybe");
					}
			}
		 	break;
		case "gender":
		 	User.gender = element.value
			if (User.gender === "girl"){
				$(".aboutyou img").attr("src", "images/youF.png")
			} else if (User.gender === "boy"){
				$(".aboutyou img").attr("src", "images/youM.png")
			}
			if(User.gender != 0){
				$("#progressDot13").css("background-color", "rgb(5, 163, 5)");
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
			if (User.gymMember != 0 || User.gymMember === false){
				if(User.gymMember === true && User.gym === 0){				
				} else {
					$("#progressDot21").css("background-color", "rgb(5, 163, 5)");
				}
			}
		 	break;
		case "gym":
			if($(element).attr("value") === "1"){
				User.gym = "Virgin"
				User.gymPrice = 84;
				} else if($(element).attr("value") === "2"){
					User.gym = "GymBox"
				User.gymPrice = 73;
				} else {User.gym = 0;}
				if(User.gymMember === true && User.gym != 0){
					$("#progressDot21").css("background-color", "rgb(5, 163, 5)");	
				} else { $("#progressDot21").css("background-color", "rgb(226, 226, 226)");	}
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
			if(User.exerciseLevel != 0){
				$("#progressDot22").css("background-color", "rgb(5, 163, 5)");
			}
		 	break;
		case "exerciseDuration":
		 	User.exerciseDuration = parseInt($(element).val());
			if(User.exerciseDuration != 0){
				$("#progressDot23").css("background-color", "rgb(5, 163, 5)");
			}
		 	break;
		case "height":
		var baseHeight = element.value;
			if (!isNumeric(baseHeight)){
					infoText("Please enter a valid Number");
					infoTextColour("bad");
			}
			else{	
				if($(element).parent().children('select').val() === "feet"){			
					var splitHeight = baseHeight.split('.');
					var feet = splitHeight[0];
					var inches = splitHeight[1] / 12;
					var heightDecimal = parseInt(feet) + inches;			
					var convertedHeight = (heightDecimal/0.032808);
					User.height = Math.floor(convertedHeight);
					}
			else{
				User.height = parseInt(element.value);
				}
			if(User.height != 0){
				$("#progressDot31").css("background-color", "rgb(5, 163, 5)");
				}
	 		}
		 	break;
		case "heightUnits":
		 	if(element.val() === "cm"){
			User.height = parseInt(element.parent().parent().children("input[type='text']").val());
			} else if(element.val() === "feet"){
				var baseHeight = parseFloat(element.parent().parent().children("input[type='number']").val());
				if (!isNumeric(baseHeight)){
					infoText("Please enter a valid Number");
					infoTextColour("bad");
					}					
				else{
					if(baseHeight.indexOf(".") != -1){
					var splitHeight = baseHeight.split('.');
					var feet = splitHeight[0];
					var inches = splitHeight[1] / 12;				
					var heightDecimal = parseInt(feet) + inches;			
					var convertedHeight = (heightDecimal/0.032808);
					} else { var convertedHeight = baseHeight/0.032808}
					User.height = Math.floor(convertedHeight);
				}
			}
		 	break;
		case "weight":
			if($(element).parent().children('select').val() === "lb"){	
				var baseWeight = element.value;
				var splitWeight = baseWeight.split('.');
				var stone = splitWeight[0];
				var lb = splitWeight[1];
				//convert all to lb
				if(lb != null){
					var weightInLb = (stone * 14) + parseInt(lb);
				} else {var weightInLb = (stone * 14);}
				
				var weightInKg = weightInLb * 0.453592;
				User.weight = Math.floor(weightInKg);
			} else{
				User.weight = element.value;		 	
			}
			if(User.weight != 0){
				$("#progressDot32").css("background-color", "rgb(5, 163, 5)");
			}
			break;
		case "heartRate":
		 	User.heartRate = parseInt(element.value);
			if(User.heartRate != 0){
				$("#progressDot33").css("background-color", "rgb(5, 163, 5)");
			} else { $("#progressDot33").css("background-color", "rgb(226, 226, 226) "); }
		 	break;
		 }
		 // Check if all questions answered
		 var questionsAnswered = 0;
		 for( var i = 0 ; i< $(".progressDot").length ; i++){
			 var thisDot = $(".progressDot")[i];
			 if($(thisDot).css("background-color") === "rgb(5, 163, 5)"){
				 questionsAnswered ++;
				 }
			 }
			 if (questionsAnswered === 9){
				 $(".submit").css("transform", "scale(1)");
				 if(allAnswers != null){
				 	allAnswers = true;
				 }
				 }
		// erase previous cookie & create updated one
		eraseCookie('healthCookie');
		createCookie('healthCookie', JSON.stringify(User), 2);
}
$('input').change(function() {
	collectAnswers(this);
});
$('select').change(function() {
	collectAnswers($(this).find(":selected"));
});
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
			fadeOutQuestions();
			$("#question" + nextQuestion).css("opacity", 1);
			$("#question" + nextQuestion).css("z-index", 1);
			changeStep(nextStep);
			currentQuestion = nextQuestion;			
		}
	}
function changeStep(nextStep){
	if(nextQuestion === null){var nextQuestion=0;}
	if(currentStep === nextStep && currentQuestion === nextQuestion){}
	else{ 
			$(".breadcrumb").each(function(){
				$(this).css("transform", "scale(1)");
				$(this).css("background", "white");
			});
		var questionContainer = $("#question" + currentQuestion);
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
		if (nextStep === 4 && currentQuestion != 3){
			var nextQuestion = currentQuestion + 1;
			rotateRight();
			changeQuestion(nextQuestion, 1);
			}
			else if(nextStep === 4 && currentQuestion === 3){}
			else{
				changeStep(nextStep);
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
// Get Random Food Item
function getFoodItem(){
	var foodStuffs = [
	"a Big Mac",
	"a Brilliant Byron Burger",
	"a slice of Dominos pepperoni pizza",
	"a good Sunday roast",
	"a cheeky chicken tikka masalla",
	"a Subway '6inch' Italian B.M.T",
	"a plain old chicken breast",
	"some nice, home made fries. Yum",
	"a glorious Baked Potato",
	"a satisfying pint of beer",
	"a small glass of Baileys Irish Cream",
	"a glass of red",
	"a glass of white",
	"a refreshing dose of Irn Bru",
	"a revitalizing spray of powerade",
	"a boring glass of almond milk",
	"a bannannnnanaa",
	"a bagel, just the bagel...",
	"a slice of cheddar cheese (the best cheese)",
	"a delicious apple",
	"a warming cup of Coffee",
	"a very British chocolate hobnob",
	"a jam doughnut",
	"a pack of Walkers cheese & onion crisps",
	"a can of tuna (without the can)",
	"just one slice of chocolate cake",
	"a bowl of Museli fruit & nut",
	"a bowl of Frosties (theyrrrreee not that good for you)"	
	];
	var foodCalories = [
	234,700,300,430,1338,410,193,267,128,182,129,77,76,43,16,60,105,289,113,72,15,79,289,106,102,506,289,143
	];
	var number = getRandomInt(0, foodStuffs.length); 
	return [foodStuffs[number] , foodCalories[number]];
}
	// Set Up function
function setUpCalc(){
	changeQuestion(1);
	changeStep(1);
	// TODO Check for cookie and populate data
	setTimeout(function() {
    $(".container").css("transform","scale(1)");
	$(".circlePulseContainer").css("transform","scale(1)");
	}, 100);
	setTimeout(function() {
		$(".circlePulseSmall").css("transform","scale(1)");
	}, 300);	
		setTimeout(function() {
		 $(".circlePulse").css("transform","scale(1)");	
	}, 500);	
}
function setUpResults(){
	setTimeout(function() {
		$(".circlePulseSmall").css("transform","scale(0)");
	}, 100);	
		setTimeout(function() {
		 $(".circlePulse").css("transform","scale(0)");	
	}, 220);	
	setTimeout(function() {
    $(".container").css("transform","scale(0)");
	$(".circlePulseContainer").css("transform","scale(0)");
	}, 450);	
	setTimeout(function() {
    $(".resultsContainer").css("transform","scale(1)");
	}, 800);	
}
// Calculation Function
$('.getResults').click(function(){
	allAnswers = false;
	//Collect all values
	if(User.gender === "boy"){
		var caloriesBurned = Math.round((((User.age * 0.2017) + (User.weight * 0.1988) + (User.heartRate * 0.6309) - 55.0969) * User.exerciseDuration / 4.184));	
		var BMR =  Math.round(66 + (6.23 * (User.weight * 2.20462)) + (12.7 * (User.height * 0.393700787)) - (6.8 * User.age));
	}
	else if(User.gender === "girl"){
		var caloriesBurned = Math.round((((User.age * 0.074) + (User.weight * 0.1263) + (User.heartRate * 0.4472) - 20.4022) * User.exerciseDuration / 4.184));
		var BMR = Math.round(655 + (4.35 * (User.weight * 2.20462)) + (4.7 * (User.height * 0.393700787)) - (4.7 * User.age));
	}
	// Calculate Calories Per week
	User.cpw = caloriesBurned * User.exerciseLevel;
	User.cpd = User.cpw / 7;
	var caloriesPerMonth = User.cpw * 4;
	// Calculate price per calorie
	var pricePerCalorieLong = parseInt(User.gymPrice) / caloriesPerMonth;
	User.ppc = parseFloat(pricePerCalorieLong.toFixed(2));
	// Calculate BMR
	User.bmr = BMR;
	
	// Populate Results
	if(isNumeric(User.ppc)){
		var food = getFoodItem();
		if (User.gymPrice === 0){
			$("#pricepercalorie").text("£" + User.ppc);
			$("#ifgym").text("");
			}
			else{
				$("#pricepercalorie").text("£" + User.ppc);
				var timeTaken = Math.round(food[1] / User.cpd);
				$("#timepercalorie").text(timeTaken + " days");		
				var pricePerFood = User.ppc * food[1];
				pricePerFood = pricePerFood.toFixed(2);
			}
		$("#priceperfood").text("£" + pricePerFood);
		$(".targetFoodCal").text(food[1] + "kcal");
		$(".targetFood").text(food[0]);
		$(".foodPic img").attr("src", "images/food/" + 1 + ".png");		
	}
	/*
	For women: 655 + (4.35 × weight) + (4.7 × height) – (4.7 × age) = BMR For men: 66 + (6.23 × weight) + (12.7 × height) – (6.8 × age) = BMR Although this can be a helpful guideline, other variables can make your BMR higher or lower.
	*/
	
	collectAnswers();	
	if(allAnswers){
		setUpResults();
		setTimeout(function() {
    $(".foodPic img").css("transform", "translateX(0em)");
	}, 1200);	
	}
	
	
});
setUpCalc();
createCookie('healthCookie', '', 2);
});