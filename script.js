//Global Variables :s
(function ($) {
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
		tff: 0,
		cpd: 0,
		ppc:0,
		questionsAnswered: [[false,false,false],[false,false,false],[false,false,false]]	
	};
var currentQuestion = 1;
var nextQuestion = 0;
var currentStep = 1;
var nextStep = 0;
var allAnswers = false;
var UserValue = [];
$(document).ready(function(){	
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
	function shakeForm(form) {
	   var l = 5;  
	   for( var i = 0; i < 6; i++ )   
	     $(form).animate( { 'margin-left': "+=" + ( l = -l ) + 'px' }, 20);  
	 }
	function infoText(text, question, step){
		if(question !== null && step !== null){
			$("#infoText" + question + step).text(text);
		} else{
			$("#infoText" + currentQuestion + currentStep).text(text);
		}
	}
	function infoTextColour(colourChoice, question, step){
		var colour = 0;
		if (colourChoice === "good"){colour = "rgb(15, 163, 67)";}
		else if (colourChoice === "bad"){colour = "rgb(249, 68, 68)";}
		if (colourChoice === "maybe"){colour = "rgb(207, 207, 207)";}
		if(question !== null && step !== null){	
			$("#infoText" + question + step).css("color", colour);
		} else{ $("#infoText" + currentQuestion + currentStep).css("color", colour); }
	}
	function questionComplete(value, question, step){
		if(value){
			$("#progressDot" + question + step).css("background-color", "rgb(5, 163, 5)");
			User.questionsAnswered[question -1][step -1] = true;
		}
		else if(!value){
			$("#progressDot" + question + step).css("background-color", "rgb(226, 226, 226)");
			User.questionsAnswered[question -1][step -1] = false;		
		}
	}
	function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	function generateUid(separator) {
	    /// Not Actually used yet

	    var delim = separator || "-";

	    function S4() {
	        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	    }

	    return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
	}
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function rotateRight(){
		var sections = $(".healthCalculator section");
			for(var i=0 ; i<sections.length ; i++){
				var thisSection = sections[i];
				if(thisSection.className.indexOf("deg1") != -1){			
					$(thisSection).addClass("deg3");
					$(thisSection).removeClass("deg1");
				} else if(thisSection.className.indexOf("deg2") != -1){				
					$(thisSection).addClass("deg1");
					$(thisSection).removeClass("deg2");
				} else if(thisSection.className.indexOf("deg3") != -1){
					$(thisSection).addClass("deg2");
					$(thisSection).removeClass("deg3");				
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
		while($("section")[nextQuestion - 1].className.indexOf("deg1") === -1){
			rotateRight();
		}
	}
	function changeStep(nextStep){ // Paint
		if(nextQuestion === null){
			nextQuestion=0;
		}
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
				$(questionContainer).css("transform", "translateX(-66%)");
			}
			currentStep = nextStep;		
			}
		$("#breadcrumb" + currentStep).css("transform", "scale(1.2)");
		$("#breadcrumb" + currentStep).css("background", "rgb(60, 133, 244)");
	}
	// Question Functions
	function getName(){
		var nameVal = $('input[name="yourName"]').val();
		if (isNumeric(nameVal)){
			infoText("There's no way " + "'" + nameVal + "'" + " is your real name!",1,1);
			infoTextColour("bad",1,1);
			questionComplete(false,1,1);
			} else {
				User.name = nameVal;
				$('.aboutyou h2').text("About " + User.name);
				if(User.name !== 0){
					questionComplete(true,1,1);
					infoText("Hi " + nameVal + ", click 'Next' to move on:",1,1);
					infoTextColour("good",1,1);
				}
		}
		checkAnswers();
	}
	function getAge(){
		var ageVal = $('input[name="age"]').val();
		if (!isNumeric(ageVal)){			
				$('input[name="age"]').val("");
				infoText("Please enter a valid number", 1, 2);
				infoTextColour("bad",1,2);
				questionComplete(false,1,2);
				} else{
				User.age = parseInt(ageVal);
				var MinHR = Math.round((70/100) * (225 - User.age));
				var MaxHR =  Math.round((75/100) * (225 - User.age));
				$("#heartRate").text(MinHR + "-" + MaxHR);
				if(User.age > 10 && User.age < 100){
					questionComplete(true,1,2);
					infoText("Thanks! Now click Next to move on:",1,2);
					infoTextColour("good",1,2);
				}
				else if(User.age >= 100){
					infoText("Wow, you're doing pretty well getting this far!",1,2);
					infoTextColour("maybe",1,2);
				}
				else if(User.age <= 10 && User.age >= 0){
					infoText("You're a bit young for this. The internet is a dark and scary place!",1,2);
					infoTextColour("maybe",1,2);
				}
				else if(User.age < 0){
					infoText("Are you from the future?",1,2);
					infoTextColour("maybe",1,2);
					questionComplete(false,1,2);
				}
			}
			checkAnswers();
	}
	function getGender(){
		var genderVal = $('input[name="gender"]:checked').val();
		User.gender = genderVal;
				if (User.gender === "girl"){
					$(".aboutyou img").attr("src", "images/sections/youF.png");
				} else if (User.gender === "boy"){
					$(".aboutyou img").attr("src", "images/sections/youM.png");
				}
				if(User.gender !== 0){
					questionComplete(true, 1, 3);
				}
				checkAnswers();
	}
	function getGym(element){
		if(element === "gymMember"){
				var gymInputVal = $('input[name="gymMember"]:checked').val();	
				if(gymInputVal === "1"){
					User.gymMember = true;
					phaseIn($('#whichGym'));
				}
				if(gymInputVal === "0"){
					User.gymMember = false;
					phaseOut($('#whichGym'));
				}
		}
		if(element === "gym"){
			var gymVal = $('#gymName').val();
				switch(gymVal){
					case "0":
					User.gymPrice = 0;
					questionComplete(false,2,1);
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
					User.gymPrice = 30;
					break;
				}
				if(gymVal !== 0){
					User.gym = $('#gymName').find(":selected").text();
				} else{
					User.gym = 0;
				}
			}
			if (User.gymMember === false){
					questionComplete(true,2,1);
				}
				else if(User.gymMember === true && User.gym !== "Please Select"){
					questionComplete(true,2,1);			
				}
				else{	
					questionComplete(false,2,1);			
				}
				checkAnswers();
	}
	function getExerciseLevel(element){
		var exerciseLevelVal = parseFloat($('#exerL input').val());
		if(element !== "units"){			
			if($('#exerciseUnits').val() === "month"){
				exerciseLevelVal = (exerciseLevelVal / 4);
			}
			if (exerciseLevelVal <= 7 && exerciseLevelVal > 0) {
				User.exerciseLevel = exerciseLevelVal;
				infoTextColour("good",2,2);
				infoText("Question Complete",2,2);
				questionComplete(true,2,2);
			}
			else if(exerciseLevelVal < 0){
				infoTextColour("bad",2,2);
				infoText("I can tell you now this thing won't work unless you do exercise.", 2, 2);
				questionComplete(false,2,2);
			}
			else if(exerciseLevelVal > 7){
				infoTextColour("bad",2,2);
				infoText("I'm surprised you could find the time to do that!", 2, 2);
				questionComplete(false,2,2);
			}
		}
		else if(element === "units"){			
			if($('#exerciseUnits').val() === "month"){
				exerciseLevelVal = (exerciseLevelVal * 4);
				$('#exerL input').val(exerciseLevelVal);
				getExerciseLevel();
			} 
			else if($('#exerciseUnits').val() === "week"){
				exerciseLevelVal = (exerciseLevelVal / 4);
				$('#exerL input').val(exerciseLevelVal);
				getExerciseLevel();
			}
		}
		checkAnswers();
	}
	function getExerciseDuration(){
		var exerciseDurationVal = parseInt($('#exerD select').find(":selected").val());
		if(exerciseDurationVal !== 0){
					questionComplete(true,2,3);
					User.exerciseDuration = exerciseDurationVal;
				} else{
					questionComplete(false,2,3);
					infoTextColour("bad");
					infoText("Oops, please select again");
				}
				checkAnswers();
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
				infoText("Please enter a valid Number", 3, 1);
				infoTextColour("bad", 3, 1);
				questionComplete(false,3,1);
		}
		else if(User.height !== 0 && isNumeric(User.height)){
				infoText("Thanks, only two questions left!", 3, 1);
				infoTextColour("good", 3, 1);
				questionComplete(true, 3, 1);
				if(User.height <= 60 || User.height >= 250){
					infoText("Call up the Guinness World Book of Records! Don't waste your time here, you could be famous!", 3, 1);
					infoTextColour("bad", 3, 1);
					questionComplete(false, 3, 1);
				}
		}
		if(User.height <= 0){
			infoText("I can't see you!");
			infoTextColour("bad");
			questionComplete(false, 3, 1);
		}
		checkAnswers();
	}
	function getWeight(element){
		var weightBoxVal = parseFloat($('#weightBox').val());

		if($('#weightUnitBox').val() === "kg"){
				infoText("Please enter your weight",3,2);
				User.weight = parseInt(weightBoxVal);
			}
		if($('#weightUnitBox').val() === "lb"){
			var stringWeight = weightBoxVal.toString();	
			var stone = 0;
			var lb = 0;
			var weightInLb = 0;
			if(stringWeight.indexOf(".") != -1){
				var splitWeight = stringWeight.split('.');
				stone = splitWeight[0];
				lb = splitWeight[1];
				weightInLb = 0;
			} else{
				stone = stringWeight;
			}
			//convert all to lb
			if(lb !== 0){
				weightInLb = (stone * 14) + parseInt(lb);
			} else {
				weightInLb = (stone * 14);
			}		
			var weightInKg = weightInLb * 0.453592;
			User.weight = Math.floor(weightInKg);
		}
		if (!isNumeric(User.weight) && element !== "units"){
				infoText("Please enter a valid Number", 3, 2);
				infoTextColour("bad", 3, 2);
				questionComplete(false, 3, 2);
		}
		else if(User.weight !== 0 && isNumeric(User.weight)){
				infoText("Thanks", 3, 2);
				infoTextColour("good", 3, 2);
				questionComplete(true, 3, 2);
		} else if (element === "units") {
			if($('#weightUnitBox').val() === "lb"){
			infoText("Use the following format: st.pounds",3,2);
			infoTextColour("maybe",3,2);	
			}
		}
		checkAnswers();
	}
	function getHeartRate(){
		var heartRateVal = parseInt($('input[name="heartRate"]').val());
		if (!isNumeric(heartRateVal)){			
				$('input[name="heartRate"]').val("");
				infoText("Please enter a valid number", 3, 3);
				infoTextColour("bad",3,3);
				questionComplete(false,3,3);
				}
		else{
			User.heartRate = heartRateVal;			
		}
		if(User.heartRate >= 50 && User.heartRate <= 200){
			questionComplete(true,3,3);
			infoTextColour("good",3,3);
			infoText("Question Complete", 3, 3);
		} 
		else { 
			questionComplete(false,3,3);
			infoText("Please enter a number between 50 & 200", 3, 3);
			infoTextColour("bad",3,3);
		}
		checkAnswers();
	}
	// Answer Functions
	function cookieAnswers(){
		$(".loaderContainer").css("transform", "scale(1)");
		$("#loaderText").text("Cookie found, loading previous answers");
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
			//User.questionsAnswered = healthCookie.questionsAnswered;		
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
			];
			for (var e in User) {
				if (User.hasOwnProperty(e)) {
	        		UserValue.push(User[e]);
	    		}		    
			}
			// 
			for(var i = 0 ; i < inputBox.length ; i++){
				if(UserValue[i+1] !== 0){
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
			checkAnswers("cookie");
			setTimeout(function() {
			$(".loaderContainer").css("transform", "scale(0)");
			}, 2000);
	}
	function collectAnswers(element){
		 var inputName = $(element).attr("name");
		 switch(inputName){
			case "yourName":
				getName();
			break;		 
			case "age":
				getAge();			
			 break;
			case "gender":	
			getGender();	 	
			 break;
			case "gymMember":
				getGym("gymMember");
			 break;
			case "gym":
				getGym("gym");
			break;
			case "exerciseLevel":			
				getExerciseLevel();
			break;
			case "exerciseUnits":
				getExerciseLevel("units");
			break;
			case "exerciseDuration":
			 	getExerciseDuration();			
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
			 	getHeartRate();
			 break;
			 }
			 checkAnswers(element);	 
	}
	function checkAnswers(element){ // Paints
		if(element === "cookie"){
			getName();
			getAge();
			getGender();
			getGym();
			getExerciseLevel();
			getExerciseDuration();
			getWeight();
			getHeight();
			getHeartRate();
		}
		var questionsAnswered = 0;
		allAnswers = false;
			for (var i=0; i<User.questionsAnswered.length; i++) { // iterate on the array
			   var obj = User.questionsAnswered[i];
			   for (var key in obj) { // iterate on object properties
			      var value = obj[key];
			      if (value === true){
			      	questionsAnswered++;
			      }
			   }
			}
			 if (questionsAnswered === 9){
			 	allAnswers = true;			 	
				 	$(".submit").css("transform", "scale(1)");
				 	allAnswers = true;
				 	infoTextColour("good", currentQuestion, currentStep);
				 	infoText("You've answered all the questions! Click 'Get Results' below to find out how much you're really spending!", currentQuestion, currentStep);
				}
			else if (questionsAnswered !== 9 && currentQuestion === 3 && currentStep === 3) {
				$(".submit").css("transform", "scale(0)");
				infoTextColour("bad", currentQuestion, currentStep);
				infoText("Whoops, it looks like you've missed some questions. Please answer all questions." , currentQuestion, currentStep);
			} else if (questionsAnswered !== 9){
				$(".submit").css("transform", "scale(0)");
			}
		eraseCookie('healthCalc');
		createCookie('healthCalc', JSON.stringify(User), 2);
	}
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
		"a satisfying pint after a hard day's work",
		"a small glass of Baileys Irish Cream",
		"a glass of red",
		"a glass of white",
		"a refreshing dose of Irn Bru",
		"a revitalizing spray of powerade",
		"a boring glass of almond milk",
		"a large banana",
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
		234,700,300,430,1338,410,193,267,128,182,129,125,120,43,16,60,105,289,113,72,15,79,289,106,102,506,289,143
		];
		var number = getRandomInt(0, foodStuffs.length - 1); 
		return [foodStuffs[number] , foodCalories[number], number + 1];
	}
	function getSport(){
		var sports = [
		"Beach volleyball",	
		"Football",
		"Rugby",
		"Tennis",
		"Squash",
		"Table tennis",
		"Golf"	
		];
		var sportInfo = [
		"You're at the peak of physical form, you just need to find an excuse to show it off",
		"You like being part of a team, but deep down you know you're the best",
		"You're a big one and you like a bit of rough and tumble",
		"Nimble and fit, but you've got power where it counts",	
		"You like doing exercise, and you're pretty fit, but you don't like getting your hair wet",
		"You know, it is suprisingly tiring once you get into it",	
		"You like to get outside, but anything more than walking is a bit too much exercise."
		];
		if(User.cpd > 3000){
			return [sports[0] , sportInfo[0], 1];
		} else if(User.height > 150 && User.weight > 70){
			return [sports[2] , sportInfo[2], 3];
		} else if(User.weight < 70 && User.cpd > 2000){
			return [sports[3] , sportInfo[3], 4];
		} else if(User.exerciseLevel > 3 && User.cpd > 1500){
			return [sports[4] , sportInfo[4], 5];
		}else if(User.cpd < 1500 && User.weight < 80){
			return [sports[5] , sportInfo[5], 6];
		}else if(User.cpd < 1500 && User.weight > 80){
			return [sports[6] , sportInfo[6], 7];
		} else{
			return [sports[1] , sportInfo[1], 2];
		}
	}
	// Set Up functions
	function setUpCalc(second){
		var secondTime = second;
		$(".loaderContainer").css("transform", "scale(1)");
		$("#loaderText").text("Loading...");
		changeQuestion(1);
		changeStep(1);
		// Select kg & cm
		//if($("#heightUnitBox").val() === "feet"){$("#heightUnitBox").val("cm");}
		//if($("#weightUnitBox").val() === "st"){$("#weightUnitBox").val("kg");}
		//if($("#exerciseUnits").val() === "month"){$("#exerciseUnits").val("week");}		
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
		if(secondTime !== true){
			setTimeout(function() {
			$(".loaderContainer").css("transform", "scale(0)");		
			}, 1000);
		} else {$(".loaderContainer").css("transform", "scale(0)");}
		setTimeout(function() {
			if(readCookie("healthCalc") !== null){
				if(secondTime !== true){
			 		cookieAnswers();
			 		$(".selectors").css("transform", "scale(1)");
				}
			} else {$(".selectors").css("transform", "scale(1)");}
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
	function getResultPosition(){
		var sliderPosition;
		if($(".resultSlider").css("top") !== "0px"){
			sliderPosition = 1;
			requestAnimationFrame(function(){
				shiftResults("0");
			});			
		}else{
			sliderPosition = 0;
			requestAnimationFrame(function(){
				shiftResults("-100%");
			});
		};
	}
	function shiftResults(sliderPosition){
			$(".resultSlider").css("top", sliderPosition);
	}
	function getCaloriesBurned(){
		var caloriesBurned = 0;
		var BMR = 0;
		if(User.gender === "boy"){
			caloriesBurned = Math.round((((User.age * 0.2017) + (User.weight * 0.1988) + (User.heartRate * 0.6309) - 55.0969) * User.exerciseDuration / 4.184));	
			BMR =  Math.round(66 + (13.7 * User.weight) + (5 * User.height) - (6.8 * User.age));
		}
		else if(User.gender === "girl"){
			caloriesBurned = Math.round((((User.age * 0.074) + (User.weight * 0.1263) + (User.heartRate * 0.4472) - 20.4022) * User.exerciseDuration / 4.184));
			BMR = Math.round(655 + (9.6 * User.weight) + (5 * User.height * 0.393700787) - (4.7 * User.age));
		}		
		return caloriesBurned;
	}
	function getPricePerCalorie(){
		var pricePerCalorie;
		var caloriesPerMinuteOfExercise = Math.round((((User.age * 0.2017) + (User.weight * 0.1988) + (User.heartRate * 0.6309) - 55.0969) * 1 / 4.184));
		 // get price per calorie
			User.ppc = parseFloat(parseFloat(User.gymPrice) / (User.cpw) * 4); // set price per calorie based on gym cost
			$(".costUnits").text("paying");
			$(".foodCost").css("display","inline");
			if(isNumeric(User.ppc))
			{ // If ppc is a number
				if (User.ppc < 0.1)
				{ // If small ppc, change to pence
				pricePerCalorie = (User.ppc * 100).toFixed(2) + "p";
				}
				else
				{ // Use pounds
				pricePerCalorie = "£" + User.ppc.toFixed(2);
				}
			}	
			return pricePerCalorie;
	}
	function getTimePerCalorie(){
		var timePerCalorie;
		var caloriesPerMinuteOfExercise = Math.round((((User.age * 0.2017) + (User.weight * 0.1988) + (User.heartRate * 0.6309) - 55.0969) * 1 / 4.184));
		// get time per calorie
			
			var timepercalorie = 1 / caloriesPerMinuteOfExercise;
			if(timepercalorie > 1440){	// If over a day
			var caloriesInDay = (timepercalorie / 60) / 24;			
				if (caloriesInDay === 1) { // If a day
					timePerCalorie = caloriesInDay.toFixed(2) + " day";
				}
				else{ // If over a day
					timePerCalorie = caloriesInDay.toFixed(2) + " days";
				}
			}
			else if (timepercalorie > 60) { // If over an hour
			caloriesInHours = (timepercalorie / 60);
			var caloriehours = Math.floor(caloriesInHours);
			var calorieminutes = Math.floor((caloriesInHours - caloriehours) * 100);	
				timePerCalorie = caloriehours + " hours, " + calorieminutes + " minutes";
			}
			else if (timepercalorie >= 1) { // If over a minute
			var calorieminutes = Math.floor(timepercalorie);
			var calorieseconds = Math.floor((timepercalorie - calorieminutes) * 100);	
				timePerCalorie = calorieminutes + " minutes, " + calorieseconds + " seconds";
			} else{ // time in seconds
			var calorieseconds = Math.floor(timepercalorie * 100);	
				timePerCalorie = calorieseconds + " seconds";
			}
			return timePerCalorie;
	}
	function getTimeForFood(food){
		var timeForFood = 0;
		var caloriesPerMinuteOfExercise = (((User.age * 0.2017) + (User.weight * 0.1988) + (User.heartRate * 0.6309) - 55.0969) * 1 / 4.184);
		var timepercalorie = 1 / caloriesPerMinuteOfExercise;
		var timeForFood = (food[1] / caloriesPerMinuteOfExercise);
		User.tff = timeForFood; 
		if(timeForFood > 1440){	// If over a day
		var foodtimeInDays = (timeForFood / 60) / 24;			
			if (foodtimeInDays === 1) { // If a day
				timeForFood = foodtimeInDays.toFixed(2) + " day";
			}
			else{ // If over a day
				timeForFood = foodtimeInDays.toFixed(2) + " days";
			}
		}
		else if (timeForFood > 60) { // If over an hour
		foodtimeInHours = (timeForFood / 60);
		var foodhours = Math.floor(foodtimeInHours);
		var foodminutes = Math.floor((foodtimeInHours - foodhours) * 60);
		var unithours	= 0;
		var unitminutes	= 0;
			if(foodhours === 1){
				unithours = " hour, ";			
			} else{
				unithours = " hours, ";
			}
			if(foodminutes === 1){
				unitminutes = " minute ";			
			} else{
				unitminutes = " minutes ";
			}
			timeForFood = foodhours + unithours + foodminutes + unitminutes;
		}
		else if (timeForFood >= 1) { // If over a minute
		var foodminutes = Math.floor(timeForFood);
		var foodseconds = Math.floor((timeForFood - foodminutes) * 60);
		var unitseconds	= 0;
		var unitminutes	= 0;
			if(foodminutes === 1){
				unitminutes = " minute, ";		
			} else{
				unitminutes = " minutes, ";
			}
			if(foodseconds === 1){
				unitseconds = " second ";		
			} else{
				unitseconds = " seconds ";
			}
			timeForFood = foodminutes + unitminutes + foodseconds + unitseconds;
		} else{ // time in seconds
		var foodseconds = Math.floor(timeForFood * 60);
		var unitseconds	= 0;
		if (foodseconds == 1) {
			unitseconds = " second ";		
		} else{
			unitseconds = " seconds ";		
		}
			timeForFood = foodseconds + unitseconds;
		}
		return timeForFood;
	}
	function getPriceForFood(food, timeforfood){
		var gymPricePerVisit = User.gymPrice / (User.exerciseLevel * 4);
		var foodprice = User.exerciseDuration / User.tff;

		var priceForFoodBase = gymPricePerVisit /foodprice; // price in pounds		
			priceForFoodBase = priceForFoodBase.toFixed(2);
			if(priceForFoodBase > 0.1){
				priceForFood = "£" + priceForFoodBase;
			} 
			else if(priceForFoodBase < 0.1){
				priceForFood = Math.floor(priceForFoodBase * 100) + "p";
			}
		return priceForFood;
	}
	function getResults(food){
		User.cpw = getCaloriesBurned();
		var caloriesPerMinuteOfExercise = Math.round((((User.age * 0.2017) + (User.weight * 0.1988) + (User.heartRate * 0.6309) - 55.0969) * 1 / 4.184));
		var ppc = getPricePerCalorie();	
		var tpc = getTimePerCalorie();
		var tff = getTimeForFood(food);
		var pff = getPriceForFood(food);		
		var sport = getSport();
		if (User.gymMember)
		{						
			$("#pricepercalorie").text(ppc);
			$(".costUnits").text("paying");
			$(".foodCost").css("display","inline-block");
			displayResults(true, ppc, pff,tff,food, sport);
		}
		else
		{ 			
			$("#pricepercalorie").text(tpc);
			$(".costUnits").text("losing");
			$(".foodCost").css("display","none");
			requestAnimationFrame(function(){
				displayResults(false, tpc, pff,tff,food, sport);
			}			
			);
		}		
	}
	function displayResults(gym, price, foodPrice, foodTime, food, sport){
		$("#pricepercalorie").text(price);
		$("#timepercalorie").text(foodTime);
		$("#priceperfood").text(foodPrice);
		$(".targetFood").text(food[0]);
		$(".targetFoodCal").text(food[1] + "kcal");
		$(".foodPic img").attr("src", "images/food/" + food[2] + ".png");
		$(".foodPic img").css("transform", "translateX(20em)");
		$("#yourSport").text(sport[0]);
		$(".sportPic img").attr("src", "images/sport/" + sport[2] + ".png");
		$(".sportInfo").text(sport[1]);
		$(".foodPic img").css("transition", "0.1s");
			$(".foodPic img").css("opacity", "0");
			setTimeout(function() {
				$(".foodPic img").css("opacity", "1");
				$(".foodPic img").css("transition", "0.5s");
	    $(".foodPic img").css("transform", "translateX(0em)");
		}, 1200);	
	}
	function collectResults(){
		checkAnswers("cookie");
		if(allAnswers){		
			//User.bmr = getBMR();			
			User.cpd = User.cpw / 7;					
			var food = getFoodItem();		
			getResults(food);
			var sport = getSport();		
			setUpResults();
		}
	}
	// Event Handlers

	$(".healthCalculator section").click(function(){
		var thisSection = this.className;	
		if(thisSection.indexOf("deg1") != -1){
		} else if(thisSection != -1){
			while(thisSection.indexOf("deg1") === -1){
				rotateRight();
				thisSection = this.className;
			}
			if (thisSection.indexOf("aboutyou") != -1){
				nextQuestion = 1;
					changeQuestion(nextQuestion, 1);
			}else if (thisSection.indexOf("Fitness") != -1){
				nextQuestion = 2;
				changeQuestion(nextQuestion, 1);
			} else if (thisSection.indexOf("Health") != -1){
				nextQuestion = 3;
					changeQuestion(nextQuestion, 1);
			}
		}
	});

	$(".healthCalculator button").click(function(){
		if (this.id === "next"){
			if (currentQuestion) {
				if (User.questionsAnswered[currentQuestion - 1][currentStep - 1] === true) {
					nextStep = currentStep + 1;
				if (nextStep === 4 && currentQuestion != 3){
					nextQuestion = currentQuestion + 1;
					rotateRight();
					changeQuestion(nextQuestion, 1);
					}
				else if(nextStep === 4 && currentQuestion === 3){}
				else{
					changeStep(nextStep);
						}
				} else{shakeForm($("#infoText" + currentQuestion + currentStep));}		
			}
		}
		else if (this.id === "previous"){
			nextStep = currentStep - 1;
			if (nextStep < 1){
				nextStep = 1;
				} else{
			changeStep(nextStep)	;
						}
		}
	});
	$(".healthCalculator .breadcrumb").click(function(){
		nextStep = parseInt(this.id.substring(this.id.length - 1, this.id.length));
		changeStep(nextStep);
		});	
		// TODO - Make this work:
	$(".healthCalculator .questionInput").on('keypress', function(e) {
		var keyCode = e.keyCode || e.which; 
		if (keyCode == 9) { 
	    	e.preventDefault(); 
	    	// call custom function here
	  	} 
	});
	$('.healthCalculator input[type=text]').focus(function(){
		if (this.value.indexOf('Enter') != -1 || this.value.indexOf('Whoops') != -1){
		this.value = "";
		}
	});
	$('.healthCalculator input').change(function() {
		collectAnswers(this);
	});
	$('.healthCalculator select').change(function() {
		collectAnswers($(this).find(":selected"));
	});
	$('.healthCalculator .getAnswers').click(function(){
		setUpCalc(true);
	});
	$('.healthCalculator .moreResults').click(function(){		
		getResultPosition();
	});
	// Calculation Function
	$('.healthCalculator .getResults').click(function(){
		allAnswers = false;
		collectResults();
	});
	// Prevent Tab
	$('.healthCalculator input').keydown(function(event){
    if (event.keyCode === 9) {
        event.preventDefault();
    }
	});
	window.requestAnimationFrame(setUpCalc);
});
}(jQuery));