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
		heartRate: 0,
		gymPrice: 0,
		bmr: 0,
		cpw: 0,
		cpd: 0,
		ppc:0,
		questionsAnswered: 0		
	};
var currentQuestion = 1;
var currentStep = 1;
var allAnswers = false;
var UserValue = [];
// Cookie Functions
function createCookie(name,value,days) {
  var expires = 0;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}
	else expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
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
// Stand alone Functions
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
function getHeight(element){
	var heightBoxVal = parseFloat($('#heightBox').val());		
		if($('#heightUnitBox').val() === "cm"){
			User.height = parseInt(heightBoxVal);
		}
		else if($('#heightUnitBox').val() === "feet"){
			var convertedHeight = 0;				
			if(heightBoxVal % 1 !== 0){
				var stringHeight = heightBoxVal.toString();
				var splitHeight = stringHeight.split('.');
				var feet = splitHeight[0];
				var inches = splitHeight[1] / 12;				
				var heightDecimal = parseFloat(feet) + inches;			
				convertedHeight = (heightDecimal/0.032808);
			}
			else {
				convertedHeight = heightBoxVal/0.032808;
			}
		User.height = Math.floor(convertedHeight);			
		
	}
	if (!isNumeric(User.height) && element !== "units"){
			infoText("Please enter a valid Number");
			infoTextColour("bad");
			questionComplete(false);
	}
	else if(User.height !== 0 && isNumeric(User.height)){
			infoText("Thanks, only two questions left!");
			infoTextColour("good");
			questionComplete(true);
			if(User.height <= 60 || User.height >= 250){
				infoText("Call up the Guinness World Book of Records! Don't waste your time here, you could be famous!");
				infoTextColour("bad");
				questionComplete(false);
			}
	}
	if(User.height <= 0){
		infoText("I can't see you!");
		infoTextColour("bad");
		questionComplete(false);
	}
}
function getWeight(element){
	var weightBoxVal = parseFloat($('#weightBox').val());
	if($('#weightUnitBox').val() === "kg"){
			User.weight = parseInt(weightBoxVal);
		}
	if($('#weightUnitBox').val() === "lb"){
		var stringWeight = weightBoxVal.toString();		
		var splitWeight = stringWeight.split('.');
		var stone = splitWeight[0];
		var lb = splitWeight[1];
		var weightInLb = 0;
		//convert all to lb
		if(lb !== null){
			weightInLb = (stone * 14) + parseInt(lb);
		} else {weightInLb = (stone * 14);}
		
		var weightInKg = weightInLb * 0.453592;
		User.weight = Math.floor(weightInKg);
	}
	if (!isNumeric(User.weight) && element !== "units"){
			infoText("Please enter a valid Number");
			infoTextColour("bad");
			questionComplete(false);
	}
	else if(User.weight !== 0){
			infoText("Thanks");
			infoTextColour("good");
			questionComplete(true);
	}
}
function getExerciseLevel(element){
	var exerciseLevelVal = parseFloat($('#exerL input').val());
	if($('#exerciseUnits').val() === "week"){
				User.exerciseLevel = exerciseLevelVal;
			}
			else{
				User.exerciseLevel = (exerciseLevelVal / 4);
			}
			if(User.exerciseLevel !== 0 && isNumeric(User.exerciseLevel)){
				questionComplete(true)
				if(User.exerciseLevel < 1 && User.exerciseLevel > 0){
					infoTextColour("maybe");
					infoText("Take it easy. All this clicking must be tiring you out!");					
				}
				if(User.exerciseLevel > 5){
					infoTextColour("maybe");
					infoText("Wow, I'm surprised you could find the time to do this!");					
				}
				else{
					infoTextColour("good");
					infoText("Thanks, now click next to continue, you know the drill!");		
				}				
			}
			if(element != "units"){
				if(User.exerciseLevel <= 0 || $('#exerL input').val() === ""){
						infoTextColour("bad");
						infoText("I can tell you now this thing won't work unless you do exercise.");
						questionComplete(false);				
				}
			}
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
function questionComplete(value){
	if(value){
		$("#progressDot" + currentQuestion + currentStep).css("background-color", "rgb(5, 163, 5)");
	}
	else if(!value){
		$("#progressDot" + currentQuestion + currentStep).css("background-color", "rgb(226, 226, 226)");
	}
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function generateUid(separator) {
    /// <summary>
    ///    Creates a unique id for identification purposes.
    /// </summary>
    /// <param name="separator" type="String" optional="true">
    /// The optional separator for grouping the generated segmants: default "-".    
    /// </param>

    var delim = separator || "-";

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
}
function populateAnswers(){
	var jsoncookie = readCookie("healthCalc");
	var healthCookie = JSON.parse(readCookie("healthCalc"));
		User.id = healthCookie.id;	
		User.name = healthCookie.name;
		User.age = healthCookie.age;
		User.gender = healthCookie.gender;
		User.gymMember = healthCookie.gymMember;
		User.gym = healthCookie.gym;
		User.gymPrice = healthCookie.gymPrice;
		User.exerciseLevel = healthCookie.exerciseLevel;
		User.exerciseDuration = healthCookie.exerciseDuration;
		User.height = healthCookie.height;
		User.weight = healthCookie.weight;
		User.heartRate = healthCookie.heartRate;
		User.bmr = healthCookie.bmr;
		User.cpw = healthCookie.cpw;
		User.cpd = healthCookie.cpd;
		User.ppc = healthCookie.ppc;
		User.questionsAnswered = healthCookie.questionsAnswered;		
		var inputBox = [
		$('input')[0],
		$('input')[1],
		$('input[name="gender"]'),
		$('input[name="gymMember"]'),
		$('#gymName'),
		$('input')[6],
		$('#exerD select'), 
		$('input')[7],
		$('input')[8],
		$('input')[9]
		]		
		for (var i in User) {
		    UserValue.push(User[i]);
		}
		// 
		for(var i = 0 ; i < inputBox.length ; i++){
			if(UserValue[i+1] != 0){
				// radio buttons
				if(i < 5 && i > 1){
					switch(i){
						// Gender
						case 2:
							if (UserValue[i + 1] === "boy"){
								$(inputBox[2][0]).prop('checked',true);
							}
							else {
								$(inputBox[2][1]).prop('checked',true);
							}
						break;
						// Gym Member
						case 3:
							if (UserValue[i + 1] === true){
								$(inputBox[3][0]).prop('checked',true);
							}
							else if (UserValue[i + 1] === false) {
								$(inputBox[3][1]).prop('checked',true);
							}
						break;
						// Gym
						case 4:						
							for(var n = 0 ; n < $('option[name="gym"]').length ; n++){
								if (UserValue[i + 1] === $($('option[name="gym"]')[n]).text()){
									$('option[name="gym"]')[n].selected = true;
								}
							}
						break;
					}
				}
				else{
					$(inputBox[i]).val(UserValue[i+1]);
				}
			}
		}
		checkAnswers();
}
function collectAnswers(element){
	 var inputName = $(element).attr("name");
	 switch(inputName){
		case "yourName":		
			if (isNumeric(element.value)){
				infoText("There's no way " + "'" + element.value + "'" + " is your real name!");
				infoTextColour("bad");
				} else {
					User.name = element.value;
					$('.aboutyou h2').text("About " + User.name);
					if(User.name !== 0){
						$("#progressDot11").css("background-color", "rgb(5, 163, 5)");
						infoText("Hi " + User.name + ", click 'Next' to move on:");
						infoTextColour("good");
					}
			}
		break;		 
		case "age":
			if (!isNumeric(element.value)){
				$(element).css("outline", "rgb(247, 62, 62) 2px solid;");
				element.value = "";
				infoText("Please enter a valid number");
				infoTextColour("bad");
				questionComplete(false);
			} else{
				User.age = parseInt(element.value);
				var MinHR = Math.round((70/100) * (225 - User.age));
				var MaxHR =  Math.round((75/100) * (225 - User.age));
				$("#heartRate").text(MinHR + "-" + MaxHR);
				if(User.age > 10 && User.age < 100){
					questionComplete(true);
					infoText("Thanks! Now click Next to move on:");
					infoTextColour("good");
				}
				else if(User.age >= 100){
					infoText("Wow, you're doing pretty well getting this far!");
					infoTextColour("maybe");
				}
				else if(User.age <= 10 && User.age >= 0){
					infoText("You're a bit young for this. The internet is a dark and scary place!");
					infoTextColour("maybe");
				}
				else if(User.age < 0){
					infoText("Are you from the future?");
					infoTextColour("maybe");
					questionComplete(false);
				}
			}
		 	break;
		case "gender":
		 	User.gender = element.value;
			if (User.gender === "girl"){
				$(".aboutyou img").attr("src", "images/youF.png");
			} else if (User.gender === "boy"){
				$(".aboutyou img").attr("src", "images/youM.png");
			}
			if(User.gender !== 0){
				questionComplete(true);
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
			if (User.gymMember === false){
				questionComplete(true);
			}
			else if(User.gymMember === true && User.gym !== 0){	
				questionComplete(true);			
			}
			else{	
				questionComplete(false);			
			}
		 	break;
		case "gym":
			var gymInputVal = $(element).attr("value");	
			switch(gymInputVal){
				case "0":
				User.gymPrice = 0;
				break;
				case "1":
				User.gymPrice = 84;
				break;
				case "2":
				User.gymPrice = 73;
				break;
				case "3":
				User.gymPrice = 55;
				break;
				case "4":
				User.gymPrice = 27;
				break;
				case "5":
				User.gymPrice = 56;
				break;
				case "6":
				User.gymPrice = 85;
				break;
				case "7":
				User.gymPrice = 0;
				break;
			}
			if(User.gymPrice !== 0){	
				User.gym = element.text();
			}				
			else {
				User.gym = 0;
			}
			if(User.gymMember === true && User.gym !== 0){
				questionComplete(true);
			}
			else {
				questionComplete(false);
			}
		break;
		case "exerciseLevel":			
			getExerciseLevel();
		break;
		case "exerciseUnits":
		getExerciseLevel("units");
		break;
		case "exerciseDuration":
		 	User.exerciseDuration = parseInt($(element).val());
			if(User.exerciseDuration !== 0){
				questionComplete(true);
			} else{
				questionComplete(false);
				infoTextColour("bad");
				infoText("Oops, please select again");
			}
		 	break;
		case "height":
			getHeight();
		break;
		case "heightUnits":
      		getHeight("units");
		 	break;
		case "weight":
			getWeight();
			break;
		case "weightUnits":
      		getWeight("units");
		 	break;
		case "heartRate":
		 	User.heartRate = parseInt(element.value);
			if(User.heartRate !== 0){
				$("#progressDot33").css("background-color", "rgb(5, 163, 5)");
			} else { $("#progressDot33").css("background-color", "rgb(226, 226, 226) "); }
		 	break;
		 }
		 checkAnswers();	 
}
function checkAnswers(){
	// Check if all questions answered
	// Loop through questions and check if there's anything in the inputs
	for (var i = 0 ; i < UserValue.length ; i++) {
		UserValue[i]
	};
		 var questionsAnswered = 0;
		 for( var i = 0 ; i< $(".progressDot").length ; i++){
			 var thisDot = $(".progressDot")[i];
			 if($(thisDot).css("background-color") === "rgb(5, 163, 5)"){
				 questionsAnswered ++;
				 }
			 }
			 if (questionsAnswered === 9){
				 $(".submit").css("transform", "scale(1)");
				 	allAnswers = true;
				 }
	eraseCookie('healthCalc');
	createCookie('healthCalc', JSON.stringify(User), 2);
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
	var currentQuestion = questions;
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
	
	// TODO - Make this work:
$(".questionInput").on('keypress', function(e) {
	var keyCode = e.keyCode || e.which; 
	if (keyCode == 9) { 
    	e.preventDefault(); 
    	// call custom function here
  	} 
});
function getFoodItem(){
	var foodStuffs = [
	"a Big Mac",
	"a Brilliant Byron Burger",
	"a slice of Dominos pepperoni pizza",
	"a good Sunday roast",
	"a cheeky chicken tikka masalla",
	"a Subway '6inch' Italian B.M.T",
	"a plain old chicken breast",
	"some nice, home made chips. Yum",
	"a glorious Baked Potato",
	"a satisfying pint after a hard days work",
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
	var number = getRandomInt(0, foodStuffs.length - 1); 
	return [foodStuffs[number] , foodCalories[number], number + 1];
}
	// Set Up function
function setUpCalc(){
	changeQuestion(1);
	changeStep(1);
	// TODO Check for cookie and populate data
	$(".resultsContainer").css("transition","0");
	$(".resultsContainer").css("transform","scale(0)");
	$(".resultsContainer").css("transition","0.3s");
	setTimeout(function() {
    $(".container").css("transform","scale(1)");   
	$(".circlePulseContainer").css("transform","scale(1)");
	}, 250);
	setTimeout(function() {
		$(".circlePulseSmall").css("transform","scale(1)");
	}, 600);	
		setTimeout(function() {
		 $(".circlePulse").css("transform","scale(1)");	
	}, 750);	
	// Give User unique Id
	User.id = generateUid();
	setTimeout(function() {
		if(readCookie("healthCalc") !== null){
		console.log("You have a cookie!");
		populateAnswers();
	}
	}, 1000);
	
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
	var pricePerCalorieLong = parseFloat(User.gymPrice) / caloriesPerMonth;
	User.ppc = parseFloat(pricePerCalorieLong);
	User.bmr = BMR;
	
	// Populate Results
	if(isNumeric(User.ppc)){
		var food = getFoodItem();
		if (User.gymPrice === 0){
			if (User.ppc < 0.01) {
				$("#pricepercalorie").text((User.ppc * 100).toFixed(2) + "p");
			}
			$("#pricepercalorie").text("£" + User.ppc.toFixed(2));
			$("#ifgym").text("");
			}
			else{
				if (User.ppc < 0.01) {
				$("#pricepercalorie").text((User.ppc * 100).toFixed(2) + "p");
				}
				else{
				$("#pricepercalorie").text("£" + User.ppc.toFixed(2));
				}
				var cph = User.cpd / 24;
				cph = cph.toFixed(2)
				var timeTaken = (food[1] / cph);
					if(timeTaken > 24){
						var timeInDays = timeTaken / 24;
						if (timeInDays === 1) {
							$("#timepercalorie").text(timeInDays.toFixed(2) + " day");
						}
						else{
							$("#timepercalorie").text(timeInDays.toFixed(2) + " days");
						}						
					}
					else{						
						$("#timepercalorie").text(timeTaken.toFixed(2) + " hours");
					}	
				var pricePerFood = User.ppc * food[1];
				pricePerFood = pricePerFood.toFixed(2);
			}
		$("#priceperfood").text("£" + pricePerFood);
		$(".targetFoodCal").text(food[1] + "kcal");
		$(".targetFood").text(food[0]);
		$(".foodPic img").attr("src", "images/food/" + food[2] + ".png");		
	}
	collectAnswers();
	$(".foodPic img").css("transform", "translateX(20em)");
	if(allAnswers){
		setUpResults();
		setTimeout(function() {
    $(".foodPic img").css("transform", "translateX(0em)");
	}, 1200);	
	}
	
	
});
$('.getAnswers').click(function(){
	setUpCalc();
});
setUpCalc();
});