



//################################################################################################################################
//
//									VERSION 2	-	MAMs med rettelser fra d. 07-01-2016
//
//################################################################################################################################ 

// Audio:
// http://www.w3schools.com/tags/ref_av_dom.asp
// http://www.w3schools.com/html/tryit.asp?filename=tryhtml5_audio_all

// Bootstrap input fields
// http://getbootstrap.com/components/#input-groups


// FRA MØDET D. 30/3-2016 MED KS FAGLÆRENE:
// ========================================
// step 1 - Man skal ikke kunne skrive sit eget nøgleproblem.
// step 2 - Kun tilføje et emne - ikke flere emner.
// step 3 - Brainstorm over dine emneord. Dette gøres ved at klikke på et emneord (feks "Nationalisme") og vælg ud fra 3 dropdowns (redegørende/diskuterende/vurderende) at brskrive/brainstorme sætninger på emneordene. Der skal være en knap der viswer "mesterlære eksempler".


// LYD-PROGRESSION DER TRIGGER TEKST - til brug i "Mester-lærer eksempler": 
// http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_av_prop_currenttime

// TAKSONMISKE FORMULERINGER:
// http://historiskmetode.weebly.com/-problemformulering-og-problemstillinger.html

// Beslutningsmøde i Aarhus d. 9.5.16:
// https://docs.google.com/document/d/1umqyQFODnYpJHPo2nmdQT-e62h6mqtxiGo_g8GuIt40/edit#

// Kode implementeringer d. 11.5.16:
// https://docs.google.com/document/d/1W-TFLVnbCYT1IS3nWkmjl60IqjPU6C4G2VM6yL4yxFI/edit#


function isUseragentSafari(){

	// SEE:  
	// http://sixrevisions.com/javascript/browser-detection-javascript/
	// http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
	// https://jsfiddle.net/9atsffau/

	console.log('isUseragentSafari - navigator.userAgent: ' + navigator.userAgent);
	
	// return (navigator.userAgent.indexOf('Safari')!==-1)?true:false;

	return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;   // SEE:  https://jsfiddle.net/9atsffau/
}
console.log('isUseragentSafari: ' + isUseragentSafari());


function getSelectedIndexNum(){
	for (var n in jsonData.studentSelectedProblems){
    	if (jsonData.studentSelectedProblems[n].selected){
    		return n;
    	}
    }
    return null;
}


function hasSelected(){
	for (var n in jsonData.studentSelectedProblems){
    	if (jsonData.studentSelectedProblems[n].selected){
    		return true;
    	}
    }
    return false;
}


function getSelected(varType){
	for (var n in jsonData.studentSelectedProblems){
    	if (jsonData.studentSelectedProblems[n].selected){
    		if (jsonData.studentSelectedProblems[n].hasOwnProperty(varType)){
    			return jsonData.studentSelectedProblems[n][varType];
    		} 
    		else {
    			alert('getSelected - ERROR: varType: "' + varType + '" does not exist!');
    		}
    	}
    }
    alert('getSelected - ERROR: No subject is selected by the student!');
}


// {name: studentSelectedProblems, val: [], selected: false}
function setSelected(varType, varValue){
	for (var n in jsonData.studentSelectedProblems){
    	if (jsonData.studentSelectedProblems[n].selected){
    		if (jsonData.studentSelectedProblems[n].hasOwnProperty(varType)){
    			jsonData.studentSelectedProblems[n][varType] = varValue;
    			break;
    		} else {
    			alert('setSelected - ERROR: varType: "' + varType + '" does not exist!');
    		}
    	}
    }
}



function setJsAudioEventLitsner2(){
	if (typeof(autoPlayNew) === 'undefined'){
		window.autoPlayNew = true;
		console.log("setJsAudioEventLitsner2 - autoPlay - SET");

		autoPlayNew = (isiniFrame())? false : true; 
	}

	// alert('setJsAudioEventLitsner2 - autoPlayNew: ' + autoPlayNew);
	console.log('setJsAudioEventLitsner2 - isiniFrame - autoPlayNew: ' + autoPlayNew);

	var audioObj = document.getElementById("audioPlayer");

	if (autoPlayNew){
		console.log("setJsAudioEventLitsner2 - NO EVENT - PLAY");
		audioObj.play();
	} else {
		console.log("setJsAudioEventLitsner2 - NO EVENT - PAUSE");
		audioObj.pause(); 
	}


    audioObj.onpause = function() {
    	console.log("setJsAudioEventLitsner2 - PAUSE");
    	if (!audioObj.ended){
    		autoPlayNew = false; 
    	}
    	
    }
    audioObj.onplay = function() {
    	console.log("setJsAudioEventLitsner2 - PLAY");
    	autoPlayNew = true;
    	
    }
}


function changeNavAndAudioToStepNo(stepNo){
	if (typeof(stepNoMem) === 'undefined'){
		console.log("changeNavAndAudioToStepNo - 1");
		window.stepNoMem = null;
	}

	// if (stepNoMem != stepNo){  // In some steps, the templates are called several times. This creates problems since the audio src is loaded each time, which causes the player to start playing. This if-clause prevents this...
		
	// 	stepNoMem = stepNo;

	// 	//====================
	// 	// HANDLE AUDIO:
	// 	//====================
	// 	var audio = jsonData.steps[stepNo].audioFiles;
	// 	var audioSrc;
	// 	for (var n in audio){
	// 		if (audio[n].type == 'mpeg'){  // We only use mpeg files - this makes the array of objects in jsonData.steps[stepNo].audioFiles obsolete.
	// 			audioSrc = audio[n].name;
	// 			break;
	// 		}
	// 	} 
	// 	var audioObj = document.getElementById("audioPlayer");
	// 	audioObj.src = audioSrc;  // When the "src" is set on the audioObj, the player starts to play automatically. This has to be prevented in "pause" has been pressed in a previous step.
	// 	if (typeof(autoPlayNew) !== 'undefined'){ 
	// 		if (autoPlayNew){
	// 			// audioObj.pause();	//  <--------  Slå Anne's stemme fra!!!
	// 			audioObj.play();   //  <--------  Slå Anne's stemme til!!!
	// 		} else {
	// 			audioObj.pause();
	// 		}
	// 	} else {
	// 		// audioObj.pause();	//  <--------  Slå Anne's stemme fra!!!
	// 		audioObj.play();   //  <--------  Slå Anne's stemme til!!!
	// 	}
	// }

	//====================
	// HANDLE BUTTONS:
	//====================
	var btns = jsonData.steps[stepNo].navBtns;
	console.log("changeNavAndAudioToStepNo - btns: " + JSON.stringify(btns));
	HTML = '';
	for (var n in btns){
		HTML += '<span id="'+((btns[n].hasOwnProperty('id'))?btns[n].id:'')+'" class="btn btn-lg btn-'+((btns[n].text.indexOf('Gå tilbage')!==-1)?'info':'primary')+((btns[n].hasOwnProperty('class'))?+' '+btns[n].class:'')+'">'+((btns[n].hasOwnProperty('text'))?btns[n].text:'')+'</span>';
	}
	console.log("changeNavAndAudioToStepNo - HTML: " + HTML);
	return HTML;
}


function returnAudioMarkup(stepNo){
	// $('#audioPlayer').hide();
	var audio = jsonData.steps[stepNo].audioFiles;
	var audioSrc;
	for (var n in audio){
		if (audio[n].type == 'mpeg'){  // We only use mpeg files - this makes the array of objects in jsonData.steps[stepNo].audioFiles obsolete.
			audioSrc = audio[n].name;
			break;
		}
	} 
	console.log("returnAudioMarkup - audioSrc: " + audioSrc);
	var HTML = '';
	HTML += '<div>';
	HTML += 	'<audio src="'+audioSrc+'" id="audioPlayer" controls="controls" autoplay="autoplay">';
    // HTML += 	'<source src="" type=""/>';
    HTML += 		'Your browser does not support the audio element';
    HTML += 	'</audio>';
    HTML += '</div>';
    return HTML;
}


function returnInputBoxes3(numOfBoxes, Class, placeholderText){
	var HTML = '';
	for (var i = 0; i < numOfBoxes; i++) {
		HTML += '<span class="input-group">';
		// HTML += 	'<span class="input-group-addon" id="sizing-addon2">@</span>';
		if (typeof(placeholderText) == 'string')
			HTML += 	'<input type="text" class="'+Class+' form-control" placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';
		if ((Array.isArray(placeholderText)) && (placeholderText.length == numOfBoxes))
			HTML += 	'<input type="text" class="'+Class+' form-control" value="'+placeholderText[i]+'" placeholder="'+placeholderText[i]+'" aria-describedby="sizing-addon2">';
		HTML += '</span>';
	};
	return HTML;
}


function returnProgressBar(stepNo){
	// var progress = Math.round(stepNo/(jsonData.steps.length-1)*100);  // This gives a stepsize of 17% over 6 steps in total where step 0 has 0% progress
	var progress = Math.round((stepNo+1)/(jsonData.steps.length)*100);   // This gives a stepsize of 17% over 6 steps in total where step 0 has 0% progress
	console.log("returnProgressBar - progress: " + progress + ", jsonData.steps.length: " + jsonData.steps.length);
	var HTML = '';
	HTML += '<div class="row">';
    HTML += 	'<div class="col-xs-12 col-md-12">';
	HTML += 		'<div id="processBarContainer"><div id="processBar" style="width:'+progress+'%;'+((progress==100)?'border-radius: 1px;':'')+'">&nbsp;</div></div> <div id="processVal">'+ String(progress) + '% </div>';
	HTML += 	'</div>';
	HTML += '</div>';
	return HTML;
}


// IMPORTANT NOTE:
// ===============
// A CSS solution to the problem of ajusting width and height by JS (JS-hack) might have been found - see the note for 
// '#processBarContainer' in the CSS-file for this E-learning object. This is why the function call has been commented 
// out in this program.
//
// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
function ajustProcessBarContainerLength(barContainerSelector, processBarSelector, processValSelector){
 
    $(document).ready(function() {
    	calc(barContainerSelector, processValSelector);
    });

    $(window).on('resize', function () {
    	calc(barContainerSelector, processValSelector);
    });

    function calc(barContainerSelector, processValSelector){
    	var barContainerWidth = $(barContainerSelector).width();
    	var barContainerParentWidth = $(barContainerSelector).parent().width();
        var processValWidth = $(processValSelector).width();
        console.log('ajustProcessBarContainerLength - barContainerWidth: ' + barContainerWidth + ', barContainerParentWidth: ' + barContainerParentWidth + ', processValWidth: ' + processValWidth);
        $(barContainerSelector).width(barContainerParentWidth-processValWidth-2+'px');
    }
}


function returnInputBoxes4(numOfBoxes, Class, savedValues, placeholderText){
	var HTML = '';
	for (var i = 0; i < numOfBoxes; i++) {
		HTML += '<span class="input-group">';
		// HTML += 	'<span class="input-group-addon" id="sizing-addon2">@</span>';
		if (typeof(placeholderText) == 'string')
			// HTML += 	'<input type="text" class="'+Class+' form-control" placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';                               // 16-02-2016        
			HTML += 	'<input type="text" class="'+Class+' form-control"'+((savedValues!=='')?' value="'+savedValues+'"':'')+' placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';   // 16-02-2016
		if ((Array.isArray(savedValues)) && (savedValues.length == numOfBoxes) && (Array.isArray(placeholderText)) && (placeholderText.length == numOfBoxes))
			HTML += 	'<input type="text" class="'+Class+' form-control"'+((savedValues[i]!=='')?' value="'+savedValues[i]+'"':'')+' placeholder="'+placeholderText[i]+'" aria-describedby="sizing-addon2">';
		HTML += '</span>';
	};
	return HTML;
}


function hasUniqueElements(Tarray){
	for (var i in Tarray){
		for (var j in Tarray){
			if (i != j){
				if (Tarray[i] === Tarray[j]){
					return false;
				}
			}
		}
	}
	return true;
}

function elementInArray(tArray, element){
    for (x in tArray){
        if (tArray[x] == element) return true 
    }
    return false;
}
console.log("elementInArray - true: " + elementInArray([1,2,3,4,5], 3));
console.log("elementInArray - false: " + elementInArray([1,2,3,4,5], 6));


function returnStudentTextArray(){
	var StudentSubjectArray = [];
	for (var n in jsonData.studentSelectedProblems){
		StudentSubjectArray.push(jsonData.studentSelectedProblems[n].selcNo);
	}
	return StudentSubjectArray;
}


function removeEmptyElements(Tarray){
	console.log('removeEmptyElements - Tarray: ' + JSON.stringify(Tarray));
	for (var i in Tarray){
		if (Tarray[i] === '') {
			Tarray.splice(i, 1);
		}
	}
	return Tarray;
}
console.log('removeEmptyElements: ' + JSON.stringify(removeEmptyElements([1,2,,3,,4,'',5,'',6])));


function removeElementIfExist(Tarray, element){
	console.log('removeElementIfExist - Tarray: ' + JSON.stringify(Tarray));
	for (var i in Tarray){
		if (Tarray[i] === element) {
			Tarray.splice(i, 1);
		}
	}
	return Tarray;
}
console.log('removeElementIfExist: ' + JSON.stringify(removeElementIfExist([1,2,,3,,4,'',5,'',6], 3)));



function returnElementNumInArray(tArray, element){
    for (x in tArray){
        if (tArray[x] == element) return x 
    }
    return false;
}
console.log("returnElementNumInArray - (returns 2): " + returnElementNumInArray([1,2,3,4,5], 3));
console.log("returnElementNumInArray - false: " + returnElementNumInArray([1,2,3,4,5], 6));


function isSimilar(array1, array2){
	if (array1.length != array1.length) return false;
	for (var n in array1){
		if (array1[n] !== array2[n]) return false;
	}
	return true;
}


function isLastStep(step) {
	for (var i = 0; i < jsonData.steps.length; i++) {
		if (jsonData.steps[i].step == step) {
			if (jsonData.steps.length-1 == i) {
				return true;
			} else {
				return false;
			}
		}
	}
}


// see: http://stackoverflow.com/questions/1960473/unique-values-in-an-array
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
// usage example:
var a = ['a', 1, 'a', 2, '1'];
console.log('onlyUnique: ' + a.filter( onlyUnique )); // returns ['a', 1, 2, '1']


function hasNonEmptyStrElm(Tarray) {
	console.log("hasNonEmptyStrElm - Tarray: " + Tarray);
	for (var n in Tarray) {
		if (Tarray[n] === '') return true;
		if (Tarray[n] === null) return true;
	}
	return false;
}

// This function replaces all "???" wildcards in strToReplace with the corrosponding "num" value translated into a string-word (between zero and twenty)
function replaceWildcard(strToReplace, num){
	var numArray = ['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tyve'];
	var strArray = strToReplace.split(" ??? ");
	if (num > numArray.length-1) {
		return strArray.join(' '+String(num)+' ');
	} else {
		return strArray.join(' '+numArray[num]+' ');
	}
	return strToReplace;
}
console.log('replaceWildcard: ' + replaceWildcard('Du har ??? gode cykler tilrådighed, eller ??? dårlige?', 20)); 


// This function replaces all "???" wildcards in strToReplace with the corrosponding "num" value translated into a string-word (between zero and twenty). 
// The function also allows for replacement of all "???-x" and "???+x" wildcards, where x is a number. 
// BUG: This version has to have a blank char " " after each wildcard - eg. "???+x " to work propery!  <---- BUG IS FIXED - see below.
function replaceWildcard2(strToReplace, num){
	var numArray = ['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tyve'];
	var Tstr = strToReplace.substring(0);
	var preStr = ''; var sumStr = '';
	var pos1 = strToReplace.indexOf(' ???');
	var pos2 = 0;
	var len = strToReplace.split(" ???").length-1;
	for (var i = 0; i < len; i++) {
		console.log('replaceWildcard2 - =====================');
		preStr = Tstr.substring(pos2, pos1);
		console.log('replaceWildcard2 - preStr:' + preStr);
		Tstr = Tstr.substring(pos1);
		console.log('replaceWildcard2 - Tstr 1:' + Tstr);
		pos2 = Tstr.indexOf(' ', 1);
		console.log('replaceWildcard2 - pos2:' + pos2);

		if (pos2 === -1) { // BUGFIX - by adding a blankspace the bug is removed.
			Tstr += ' ';
			pos2 = Tstr.indexOf(' ', 1);
			console.log('replaceWildcard2 - pos2:' + pos2);
		}

		if ((pos2 !== -1) && (pos2 >= 4)){
			var TTstr = Tstr.substring(0, pos2).replace(' ???', '');
			console.log('replaceWildcard2 - TTstr: _' + TTstr + '_');
			var val;
			if (TTstr.substring(0,1) == '+'){  // Addition operator
				val = num + parseInt(TTstr.substring(1));
			}
			if (TTstr.substring(0,1) == '-'){  // Subtraction operator
				val = num - parseInt(TTstr.substring(1));
			}
			if ((TTstr.substring(0,1) == '')){  // If there is no char in TTstr - eg. if the wildcard "???" does not have an attached number "+x" or "-x")
				val = num;
			}
			console.log('replaceWildcard2 - val:' + val);
		} 
		 
		if (val > numArray.length-1) {
			sumStr += preStr+' '+String(val);
		} else {
			sumStr += preStr+' '+numArray[val];
		}
		console.log('replaceWildcard2 - sumStr:' + sumStr);

		pos1 = Tstr.indexOf(' ???', pos2);
		console.log('replaceWildcard2 - Tstr 2:' + Tstr);
	};

	// var TpreStr = TTstr.substring(0,1);
	// console.log('replaceWildcard2 - TTstr: '+TTstr+', TpreStr:' + TpreStr);

	sumStr += (pos2 !== -1)? Tstr.substring(pos2):'';
	console.log('replaceWildcard2 - sumStr END:' + sumStr);

	return sumStr;
}
console.log('replaceWildcard2 - OUTPUT 1: ' + replaceWildcard2('Du har ???+3 gode cykler tilrådighed, eller ???-3 dårlige?', 10)); 
console.log('replaceWildcard2 - OUTPUT 2: ' + replaceWildcard2('Du har ???+3 gode cykler tilrådighed, eller ???-1 og ??? .', 20));
console.log('replaceWildcard2 - OUTPUT 3: ' + replaceWildcard2('Du har ???-13 gode cykler tilrådighed, eller ???-9 dårlige?', 30));
console.log('replaceWildcard2 - OUTPUT 4: ' + replaceWildcard2('Du har ???-23 gode cykler tilrådighed, eller ??? dårlige?', 30));
console.log('replaceWildcard2 - OUTPUT 5: ' + replaceWildcard2('Du har ???-23 gode cykler tilrådighed, eller ???-32.', 50)); 





function returnDropdownMarkup(DropdownObj){
    var Selected = -1;
    var DO = DropdownObj;
    console.log("DO: " + DO);
    var HTML = '<select'+((DO.hasOwnProperty("id"))?' id="'+DO.id+'"':"")+((DO.hasOwnProperty("class"))?' class="'+DO.class+'"':"")+'>';
    if (DO.hasOwnProperty("selected"))
            Selected = parseInt( DO.selected );
            console.log("returnDropdownMarkup - Selected: " + Selected);
    var DOO = DropdownObj.options;
    for (n in DOO){
        HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+((n == Selected)?' disabled selected':"")+' value="'+((n == Selected)?'':DOO[n].value)+'">'+DOO[n].value+'</option>';
        // HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+' value="'+((n == Selected)?'':DOO[n].value)+'">'+DOO[n].value+'</option>';
        
        // HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+' value="'+DOO[n].value+'">'+DOO[n].value+'</option>';
    };
    HTML += "</select>";
    return HTML;
}

var TDropdown = {id:"Dropdown1", class:"Dropdown", selected: "1",
                    options:[
                        {id:"id1", class:"class1", value:"val 1"},
                        {id:"id2", class:"class2", value:"val 2"},
                        {id:"id3", class:"class3", value:"val 2"}
                    ]
                };
var TDropdown2 = {options:[
                    {value:"val 1"},
                    {value:"val 2"},
                    {value:"val 2"}]
                };
// console.log("returnDropdownMarkup: " + returnDropdownMarkup(TDropdown));
// console.log("returnDropdownMarkup: " + returnDropdownMarkup(TDropdown2));




function getJsonDataArrayIndex(stepNo){
	console.log('getJsonDataArrayIndex - jsonData.steps: ' + JSON.stringify(jsonData.steps));
	for (var n in jsonData.steps){
		console.log('getJsonDataArrayIndex - jsonData.steps['+n+'].step: ' + jsonData.steps[n].step);
		if (jsonData.steps[n].step == stepNo){
			return n;
		}
	}
	alert("getJsonDataArrayIndex ERROR: stepNo not found!");
	return null;
}


function htmlEntities(str) {
    return String(str).replace(/\$/g, '&#36;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


function returnLastStudentSession() {
	window.osc = Object.create(objectStorageClass);
	osc.init('studentSession_2');
	osc.exist('jsonData');

	// osc.startAutoSave('test1', [1,2,3], 500);
	// osc.setAutoSaveMaxCount('test1', 5);

	// osc.startAutoSave('test2', [4,5,6], 1000);
	// osc.setAutoSaveMaxCount('test2', 10);

	// osc.startAutoSave('test3', [7,8,9], 1500);
	// osc.setAutoSaveMaxCount('test3', 15);

	var TjsonData = osc.load('jsonData');
	console.log('returnLastStudentSession - TjsonData: ' + JSON.stringify(TjsonData));

	// IMPORTANT: 
	// In this exercise, the user has to download a word-document in the last step. This is not possible when using Safari - this is why this if-clause has been added.
	if ((isUseragentSafari()) && (typeof(safariUserHasAgreed) === 'undefined')){

		window.safariUserHasAgreed = false;

		UserMsgBox("body", '<h4>OBS</h4> <p>Du arbejder på en Mac og bruger browseren Safari. <br> Denne øvelse virker desværre ikke optimalt på Safari-platformen. Du vil ikke kunne downloade wordfilen til sidst i øvelsen.</p><br> <p>Brug i stedet <b>Chrome</b> (<a href="https://www.google.dk/chrome/browser/desktop/">Hent den her</a>) eller <b>Firefox</b>  (<a href="https://www.mozilla.org/da/firefox/new/">Hent den her</a>).</p><br> <p>Mvh <a href="https://www.vucdigital.dk">vucdigital.dk</a> </p>');
		
		$('#UserMsgBox').addClass('UserMsgBox_safari');
		$('.MsgBox_bgr').addClass('MsgBox_bgr_safari');

		$( document ).on('click', ".UserMsgBox_safari", function(event){
			$(".UserMsgBox_safari").fadeOut(200, function() {
	            $(this).remove();
	        });
			safariUserHasAgreed = true;
	        returnLastStudentSession();
		});

		$( document ).on('click', ".MsgBox_bgr_safari", function(event){
			$(".MsgBox_bgr_safari").fadeOut(200, function() {
	            $(this).remove();
	        });
	        safariUserHasAgreed = true;
	        returnLastStudentSession();
		});

		return 0;
	}
	
	if ((TjsonData !== null) && (typeof(TjsonData) !== 'undefined')){
		console.log('returnLastStudentSession - getTimeStamp: ' + osc.getTimeStamp());
	// if (TjsonData !== null){
		var HTML = '';
		HTML += '<h4>OBS</h4> Du har lavet denne øvelse før og indtastet data allerede.';
		HTML += '<div> <span id="objectStorageClass_yes" class="objectStorageClass btn btn-info">Jeg vil fortsætte, hvor jeg slap</span> <span id="objectStorageClass_no" class="objectStorageClass btn btn-info">Jeg vil starte forfra</span> </div>';
		UserMsgBox("body", HTML);

		$('.CloseClass').remove(); // <---- removes the "X" in the UserMsgBox.
		$('.container-fluid').hide();  // Hide all program-content.

	    $('#UserMsgBox').unbind('click');
	    $('.MsgBox_bgr').unbind('click');

	    $( document ).on('click', "#objectStorageClass_yes", function(event){
	        console.log("objectStorageClass.init - objectStorageClass_yes - CLICK" );
	        $(".MsgBox_bgr").fadeOut(200, function() {
	            $(this).remove();
	            $('.container-fluid').fadeIn('slow');  // Fade in all program-content.
	        });
	       
	        jsonData = TjsonData;
			$('#DataInput').html(eval('step_'+TjsonData.currentStep+'_template()'));
			// if (!isLastStep(TjsonData.currentStep)) {  <----  Commented out since this version "Skønlitterær analyse" has a soundfile at the last step.
			// 	console.log('returnLastStudentSession - NOT LAST STEP');
			// 	setJsAudioEventLitsner2();  
			// } else {
			// 	console.log('returnLastStudentSession - LAST STEP');
			// }
			// setJsAudioEventLitsner2();  // Commented out 11/4-2016  // <----  Added since this version "Skønlitterær analyse" has a soundfile at the last step.
			
	    });

	    $( document ).on('click', "#objectStorageClass_no", function(event){
	    	// osc.stopAutoSave('test1');
	        console.log("objectStorageClass.init - objectStorageClass_no - CLICK" );
	        osc.delete(osc.localStorageObjName);
	        $(".MsgBox_bgr").fadeOut(200, function() {
	            $(this).remove();
	            $('.container-fluid').fadeIn('slow');  // Fade in all program-content.
	        });

	        step_0_template();
	        // setJsAudioEventLitsner2();  // Commented out 11/4-2016
	    });
	} else {
		step_0_template();
		// setJsAudioEventLitsner2();  // Commented out 11/4-2016
	}
}



function returnMissingElements(arrayName, elementName){
	// var JSN = jsonData.studentSelectedProblems[jsonData.selectedselcNo];
	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var wordArray = [];
	for (var n in JST[arrayName]){  // Find the missing words:
		// var t = JST.textQuotes[n];
		if ((typeof(JST[arrayName][n]) === 'undefined') || (JST[arrayName][n] == '')){
			// if (JSN.subjectTexts[t] != btnPrimaryText){
				
				// wordArray.push(elementName +' '+String(parseInt(n)+1));   // <------- OLD - WORKING OK!

				if (Array.isArray(elementName)) {  // <------- NEW: IF-ELSE CLAUSE
					wordArray.push(elementName[n]);
				} else { // Assume "elementName" is a string:
					wordArray.push(elementName +' '+String(parseInt(n)+1));
				}

			// }
		}
	}
	console.log("returnMissingWords - wordArray 1: " + wordArray );
	// wordArray = removeElement(wordArray, btnPrimaryText);
	wordArray = removeEmptyElements(wordArray);
	var k = wordArray.length;
	var count = 0;
	var HTML = '"';
	console.log("returnMissingWords - k: "+k+", wordArray 2: " + wordArray );
	for (var i in wordArray) {  // Construct a sentence containing the missing words:
		// console.log("returnMissingWords - wordArray["+i+"]: " + wordArray[i] + ", btnPrimaryText: " + btnPrimaryText);

		// if (wordArray[i] != btnPrimaryText){
			if (k-count > 2) HTML += wordArray[i] + '", "';
			if (k-count == 2) HTML += wordArray[i] + '" og "';
			if (k-count == 1) HTML += wordArray[i];
		// }
		++count;
	};
	HTML += '"';
	return HTML;
}


// Due to the use of $(document).ready() and $(window).resize() inside the function, detectBootstrapBreakpoints needs to be called outside 
// $(document).ready() and $(window).resize() statements and only once.
function detectBootstrapBreakpoints(){  

	window.bdv = function(displaySize){  // bdv = bootstrapDisplayValue
		var bsArr = ['xs','sm','md','lg'];
		for (var n in bsArr){
			if (bsArr[n] == displaySize) return n;
		}
	}
    
    window.bootstrapBreakpointSize = null;
 
    $(document).ready(function() {
        console.log('detectBootstrapBreakpoints - document.ready.');
        $('body').append('<div id="bootstrapBreakpointWrapper"> <span class="visible-xs-block"> </span> <span class="visible-sm-block"></span> <span class="visible-md-block"> </span> <span class="visible-lg-block"> </span> </div>');
        bootstrapBreakpointSize = $( "#bootstrapBreakpointWrapper>span:visible" ).prop('class').split('-')[1];
        console.log('detectBootstrapBreakpoints - bootstrapBreakpointSize: ' + bootstrapBreakpointSize);
    });

    $(window).on('resize', function () {
        console.log('detectBootstrapBreakpoints - window.resize.');
        bootstrapBreakpointSize = $( "#bootstrapBreakpointWrapper>span:visible" ).prop('class').split('-')[1];
        console.log('detectBootstrapBreakpoints - bootstrapBreakpointSize: ' + bootstrapBreakpointSize + ', typeof(bootstrapBreakpointSize): ' + typeof(bootstrapBreakpointSize));
    });
}


$( document ).on( "dynamicTextEvent", function (event, data) {
	if (typeof(thisStepNoMem) === 'undefined'){
		window.thisStepNoMem = null;
	}
	
	console.log("dynamicTextEvent - thisStepNoMem: " + thisStepNoMem + ", jsonData.currentStep: " + jsonData.currentStep);

	// if (thisStepNoMem != data.currentStep){
	if (thisStepNoMem != jsonData.currentStep){
	   	console.log("dynamicTextEvent: " + data.testdata); 
	   
		var stepNo = jsonData.currentStep;
		console.log("dynamicTextEvent - stepNo: " + stepNo);

		console.log("dynamicTextEvent - typeof(jsonData.steps["+stepNo+"].instruction): " + typeof(jsonData.steps[stepNo].instruction));

		if (typeof(jsonData.steps[stepNo].instruction) === 'object'){ // Only if the JSON instruction is an object, otherwise dynamicTextClass fails...
			replaceWildcardsInCmdObj(jsonData.steps[stepNo].instruction);

			window.DTO = Object.create(dynamicTextClass); 
			DTO.init('#dynamicText', jsonData.steps[stepNo].instruction);
		}

		thisStepNoMem = jsonData.currentStep;
	}
});



//////////////////////
//  	STEP 0 		//
//////////////////////


function step_0_template(){
	
	console.log("step_0_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 0;
	// jsonData.autoPlay = true;
	// osc.save('jsonData', jsonData);  // Not necessary to save step 0! 
	// osc.exist('jsonData');	// Not necessary to save step 0!

	if ((typeof(DTO) !== 'undefined') && (DTO !== null)){ // Stop dynamic text ecexution.
		DTO.stopExec(0);
		DTO = null;
	}

	var stepNo = 0;
	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#audioPlayerContainer').html(returnAudioMarkup(stepNo));
	// setJsAudioEventLitsner2();  
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));
	var HTML = '';
	HTML += '<div id="step_0" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_0" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('img'))?'<img id="stepImg_0" class="img-responsive" src="'+jsonData.steps[stepNo].img.src+'" alt="'+jsonData.steps[stepNo].img.alt+'"/>':'');
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);

	$('#DataInput').html(HTML);

	setJsAudioEventLitsner2(); 

	window.scrollTo(0, 0);
}

$( document ).on('click', "#step_0_goOn", function(event){
	step_1_template();
	// setJsAudioEventLitsner2();  // Commented out 11/4-2016
});


//////////////////////
//  	STEP 1 		//	CHOOSE YOUR TEKST
//////////////////////

// "texts" : [
// 		{"author" : "Peter Seeberg", "title" : "Patienten", "year": "1962", "src" : "pdf/Patienten.pdf", "studentMsg" : "<b>Din lærer skal give dig en kopi af teksten.</b>", "themes": ["Sundhed", "Identitet", "Moderne videnskab"], "textSnippet" : "<p>&quot;Da lægerne første gang stiftede bekendtskab med min sygdom, beroligede de mig meget inderligt og erklærede, at et amputeret ben ikke var noget at snakke om i vor tid, hvor proteserne jo ikke mere var en lidelse, som i træbenenes dage, men snarere en lettelse. De lovede mig, at jeg skulle komme til at gå nærmest bedre end før, idet de påstod, at iveren efter at gå igen ville tilføre mig kæmpekræfter. De fik ret. Da jeg først var kommet i gang, gik jeg bedre end nogen sinde, men længe varede det ikke, så dukkede sygdommen, som lægerne nu betegnede som den uhyre sjældne &quot;almindeligt bortfald&quot; op i det andet ben, der også måtte sættes af...&quot;</p>"},
// 		{"author" : "Klaus Rifbjerg", "title" : "Det er blevet os pålagt", "year": "1960", "src" : "pdf/det_er_blevet_os_paalagt_2.pdf", "externalSrc": "https://materialeplatform.emu.dk/materialer/bogkort/86467329", "studentMsg" : "Link til materialet: ", "themes": ["En kritik af det moderne liv", "En kritik af velfærdsstaten", "Fremmedgørelse", "Kedsomhed"], "textSnippet" : "<p>&quot;Det er blevet os p&aring;lagt<br/> af statistikken<br/> i et gennemsnitsliv<br/> at &aring;bne et meget stort antal<br/> d&oslash;re, konservesd&aring;ser,<br/> punge, tegneb&oslash;ger, check.konti<br/> at lukke et meget stort antal<br/> samme...&quot;</p>"}	],


function step_1_template(){
	window.editText = false;
	console.log("step_1_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 1;
	osc.save('jsonData', jsonData);
	if ((typeof(DTO) !== 'undefined') && (DTO !== null)){ // Stop dynamic text ecexution.
		DTO.stopExec(0);
		DTO = null;
	}

	// // Set backgroundcolors by inline CSS-style:
	// window.colorObj = {g1: null, g2: null, g3: null, f1: null};
	// $('body').append('<span class="g1 hide"> XXXX </span><span class="g2 hide"> XXXX </span><span class="g3 hide"> XXXX </span><span class="f1 hide"> YYYY </span>');
	// colorObj.g1 = $('.g1').css('background-color');
	// colorObj.g2 = $('.g2').css('background-color');
	// colorObj.g3 = $('.g3').css('background-color');
	// colorObj.f1 = $('.f1').css('background-color');
	// console.log("step_3_template - colorObj: " + JSON.stringify(colorObj));


	var stepNo = 1;
	$('#processContainer').html(returnProgressBar(stepNo));
	// $('#audioPlayerContainer').html(returnAudioMarkup(stepNo));     // <---------- Audio 
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));
	var selcNo = null;

	// if (jsonData.hasOwnProperty("selectedProblemNo")){
	//     	selcNo = jsonData.selectedProblemNo[jsonData.selectedIndexNum].selcNo;
 	// }

    if (!jsonData.hasOwnProperty("originalNumOfProblems")){ 
    	jsonData.originalNumOfProblems = jsonData.keyProblems.length;
    }
    console.log('step_1_template - jsonData.originalNumOfProblems: ' + jsonData.originalNumOfProblems);

    if (!jsonData.hasOwnProperty("studentSelectedProblems")){
    	jsonData.studentSelectedProblems = [];
    	// jsonData.studentSelectedProblems.push({selcNo: selcNo, selected: false });
    }
    console.log('step_1_template - studentSelectedProblems 1: ' + JSON.stringify(jsonData.studentSelectedProblems));

	console.log("step_1_template - selcNo: " + selcNo); 
	var HTML = '';
	HTML += '<div id="step_1" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_1" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	// HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction + insertMasterExample()):'')+'</div><div class="clear"></div>'; 
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction( '<span id="dynamicText"></span><span class="cursor">|</span>' +  insertMasterExample()):'')+'</div><div class="clear"></div>';  // + '<span id="dynamicText"></span><span class="cursor">|</span>' + 
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	
	HTML += 			'<div class="problemFormulationBtnWrap">';
	HTML += 				'<span class="problemFormulationBtn btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET DIN PROBLEMFORMULERING </span>';
	HTML += 			'</div>';

	HTML += 			'<div id="TextContainer" class="btnActions">';
			var JT = jsonData.keyProblems;
			var selcNo = (hasSelected())? jsonData.studentSelectedProblems[getSelectedIndexNum()].selcNo : selcNo ;
			for (var n in JT){
				HTML += 	'<span class="keyProblems problemFormulationBtn btn btn-'+((parseInt(selcNo) == n)?'primary':'info')+'" >'+JT[n].name+'</span>';
			}
	HTML += 			'</div>';

	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	
	$('#DataInput').html(HTML);

	$('#audioPlayerContainer').html('');
	// setJsAudioEventLitsner2(); 

	setColorObj();
	setCssObj($('.problemFormulationBtnWrap > .problemFormulationBtn')[0]);

	$('.problemFormulationBtnWrap .problemFormulationBtn:first-child').hide();

	window.DTO = Object.create(dynamicTextClass); 
	DTO.init('#dynamicText', jsonData.steps[stepNo].instruction); 

	window.scrollTo(0, 0);
}


// $( document ).on('click', ".problemFormulationBtn", function(event){
// 	$( ".problemFormulationBtn" ).trigger( "click" );
// });


$( document ).on('focusin', ".TextInputField", function(event){
	$('.keyProblems').removeClass('btn-primary').addClass('btn-info');
});

$( document ).on('focusout', ".TextInputField", function(event){
	if (jsonData.hasOwnProperty("studentSelectedProblems")){
    	var selcNo = jsonData.studentSelectedProblems[jsonData.selectedIndexNum].selcNo;
    	$('.keyProblems').eq(selcNo).addClass('btn-primary').removeClass('btn-info');
    }
});


$( document ).on('click', ".keyProblems", function(event){

	window.studentTextPressed = true;
    console.log("Subjects - PRESSED");
    $('.keyProblems').removeClass('btn-primary').addClass('btn-info');
    $(this).addClass('btn-primary');

    hideCssObj($('.problemFormulationBtnWrap > .problemFormulationBtn')[0]);

    $('.keyProblems').val('');

    var studentSelectedProblems = $(this).text();
    var selcNo = $(this).index();
    console.log("Subjects - selcNo: " + selcNo); 

    if (!jsonData.hasOwnProperty("studentSelectedProblems")){
    	jsonData.studentSelectedProblems = [];
    }

    if (!elementInArray(returnStudentTextArray(), selcNo)) {  // If studentSelectedProblems is not allready in studentSelectedProblems.selcNo, then add it: 
    	// jsonData.studentSelectedProblems.push({selcNo: studentSelectedProblems, selected: false, subjectTexts: [] });
    	jsonData.studentSelectedProblems.push({selcNo: selcNo, selected: false });
	}

    console.log("Subjects - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 

    // if (!studentChangeSubject(studentSelectedProblems)){
	    for (var n in jsonData.studentSelectedProblems){
	    	if (selcNo == jsonData.studentSelectedProblems[n].selcNo){
	    		jsonData.studentSelectedProblems[n].selected = true;
	    	} else {
	    		jsonData.studentSelectedProblems[n].selected = false;
	    	}
	    }
	// }

	// jsonData.selectedselcNo = selcNo; // = returnElementNumInArray(returnStudentTextArray(), studentSelectedProblems);
	jsonData.selectedIndexNum = getSelectedIndexNum();
	console.log("Subjects - jsonData.selectedIndexNum: " + jsonData.selectedIndexNum);  // <------- ########  SE HER !!! ##############

    console.log("Subjects - jsonData.studentSelectedProblems 2: " + JSON.stringify(jsonData.studentSelectedProblems)); 

    // $( ".problemFormulationBtn" ).trigger( "click" );
});


$( document ).on('click', "#step_1_goOn", function(event){

	if (!jsonData.hasOwnProperty("selectedIndexNum")) {
		UserMsgBox("body", "<h4>OBS</h4> Du skal vælge et nøgleproblem før du kan gå videre!");
	} else {
		if (jsonData.hasOwnProperty("studentSelectedProblems")) {
		 	step_2_template();
		} 
	}

});




//////////////////////
//  	STEP 2 		//   // FRA SKRIVEPROCES 1
//////////////////////

function step_2_template(){
	console.log("step_2_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_2_template - selectedIndexNum: " + jsonData.selectedIndexNum + ", studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems));
	jsonData.currentStep = 2;
	osc.save('jsonData', jsonData);

	if ((typeof(DTO) !== 'undefined') && (DTO !== null)){ // Stop dynamic text ecexution.
		DTO.stopExec(0);
		DTO = null;
	}

	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var selcNo = JS.selcNo;

	console.log("step_2_template - JS: " + JSON.stringify(JS)); 

	if (!jsonData.hasOwnProperty("originalNumOfThemes")){
    	JS.originalNumOfThemes = jsonData.keyProblems[selcNo].themes.length;
    }

    if (!JS.hasOwnProperty("studentThemes")){
    	JS.studentThemes = [];			// Contains student supplied themes (text) written in the input field
    } 

    if (!JS.hasOwnProperty("studentSelectedThemes")){
    	JS.studentSelectedThemes = [];  // Contains index numbers of the pressed ".keyThemes" buttons
    }

    if (!JS.hasOwnProperty("totStudentThemes")){
    	JS.totStudentThemes = [];  // Contains student supplied themes (text) written in the input field
    }

    if (!JS.hasOwnProperty("totStudentThemes_selectOrder")){
    	JS.totStudentThemes_selectOrder = [];  // Contains student supplied themes (text) written in the input field
    }

    if (!JS.hasOwnProperty('taxonomyObj')){
		JS.taxonomyObj = {"describe": [], "analyse": [], "assess": []};    // NEW STRUCTURE - IN USE!
	}

    console.log("step_2_template - JS: " + JSON.stringify(JS)); 

    var keyProblem = jsonData.keyProblems[selcNo].name;

	// var studentSubjectArray = returnStudentSubjectArray();
	// var subjectName = getSelected('subjectName');
	// jsonData.selectedSubjectElementNum = returnElementNumInArray(studentSubjectArray, subjectName);  // Save selectedSubjectElementNum in jsonData. selectedIndexNum

	var stepNo = 2;
	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#audioPlayerContainer').html(''); // Empty the audioPlayerContainer, so the audio-tag from the privious step does not start to play.
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));
	var HTML = '';
	HTML += '<div id="step_2" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_2" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	// HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction('Du valgte nøgleproblemet <span class="e2 label label-default">' + keyProblem + '</span>. '+ jsonData.steps[stepNo].instruction + insertMasterExample()):'')+'</div><div class="clear"></div>';  // OLD 17-05-2016
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction('Du valgte <span class="e1 label label-default">' + keyProblem + '</span> som dit overordnede emne. '+ '<span id="dynamicText"></span><span class="cursor">|</span>' + insertMasterExample()):'')+'</div><div class="clear"></div>';	// NEW 17-05-2016
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div class="problemFormulationBtnWrap">';
	HTML += 				'<span class="problemFormulationBtn btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET DIN PROBLEMFORMULERING </span>';
	HTML += 			'</div>';

	HTML += 			'<div id="subjectWordContainer" class="btnActions">';


				console.log("step_2_template - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 

				var JT = jsonData.keyProblems[selcNo].themes

				console.log("step_2_template - JT: " + JSON.stringify(JT));

				console.log("step_2_template - elementInArray: " + JSON.stringify(JS.studentSelectedThemes));

				for (var n in JT){
					console.log("step_2_template - n: " + n + ", elementInArray: " + elementInArray(JS.studentSelectedThemes, n));
					// HTML += 	'<span class="keyThemes btn btn-'+((elementInArray(JS.studentSelectedThemes, n))?'primary':'info')+'" >'+JT[n]+'</span>';  // totStudentThemes
					HTML += 	'<span class="keyThemes btn btn-'+((elementInArray(JS.totStudentThemes, JT[n]))?'primary':'info')+'" >'+JT[n]+'</span>';
				}

	HTML += 			'</div>';

	HTML += 			'<div class="stepInput">';
	// HTML += 					returnInputBoxes4(1, 'keyThemesByStudent', JS.studentThemes, 'Skriv evt. dit eget emne');
	HTML += 					returnInputBoxes4(1, 'keyThemesByStudent', '', 'Skriv evt. dit eget emne');
	HTML +=						'<span id="addSubject" class="vuc-primary btn btn-primary">Tilføj emne</span>';
	HTML += 			'</div>';

	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 2 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);


	// replaceWildcard2()

	replaceWildcardsInCmdObj(jsonData.steps[stepNo].instruction);
	
	window.DTO = Object.create(dynamicTextClass); 
	DTO.init('#dynamicText', jsonData.steps[stepNo].instruction); 

	window.scrollTo(0, 0);
}


function hasBeenExecOnce(checkArr, checkVal) {
	console.log('hasBeenExecOnce - CALLED');
	if (eval('typeof('+checkArr+') === "undefined"')){
		console.log('hasBeenExecOnce - TRUE: ' + checkArr);
		eval('window.'+checkArr+' = []');
	} else {
		console.log('hasBeenExecOnce - FALSE: ' + checkArr);
	}
	var varArr = eval(checkArr);
	if (!elementInArray(varArr, checkVal)){
		varArr.push(checkVal);
		return false;
	} else {
		return true;
	}
	// eval(checkArr+'.push('+checkVal+')');
}

console.log('hasBeenExecOnce - RESULT 1: ' + hasBeenExecOnce("testArr_1", 0));  // <----- Should be false!
console.log('hasBeenExecOnce - RESULT 2: ' + hasBeenExecOnce("testArr_1", 0));  // <----- Should be true!

console.log('hasBeenExecOnce - RESULT 1: ' + hasBeenExecOnce("testArr_2", 0));  // <----- Should be false!
console.log('hasBeenExecOnce - RESULT 2: ' + hasBeenExecOnce("testArr_2", 0));  // <----- Should be true!


// $( document ).on('click', "#stepNavContainer span", function(event){
// 	if ((typeof(DTO) !== 'undefined') && (DTO !== null)){
// 		DTO.stopExec(0);
// 		DTO = null;
// 	}
// });


function replaceWildcardsInCmdObj(cmdObj){
	for (var n in cmdObj) {
		console.log("replaceWildcardsInCmdObj - cmdObj["+n+"][Object.keys("+cmdObj[n]+")]: " + cmdObj[n][Object.keys(cmdObj[n])]);
		if (typeof(cmdObj[n][Object.keys(cmdObj[n])]) == "string") { // Only look for wildcards in strings, since replaceWildcard2 return a string...
			cmdObj[n][Object.keys(cmdObj[n])] = replaceWildcard2(cmdObj[n][Object.keys(cmdObj[n])], jsonData.numOfChoosenWords);
		}
	}
	console.log("replaceWildcardsInCmdObj - cmdObj["+n+"][Object.keys("+cmdObj+")]: " + JSON.stringify(cmdObj) );
}


function insertMasterExample(){
	// window.insertMasterExampleActive = true;
	var HTML = '';
	HTML += '<div class="masterStudentBtnWrap">';  // EKSEMPEL: PROBLEMFORMULERING - MED UNDERSPØRGSMÅL
	if (jsonData.currentStep == 5) {
		HTML += 	'<span class="masterStudentBtn btn btn-info"><span class="glyphicons glyphicons-eye-open"></span>EKSEMPEL: PROBLEMFORMULERING - MED UNDERSPØRGSMÅL</span>';
	} else {
		HTML += 	'<span class="masterStudentBtn btn btn-info"><span class="glyphicons glyphicons-eye-open"></span>EKSEMPEL: UDVÆLG UNDEREMNER</span>';
	}
	HTML += '</div>';
	return HTML;
}


$( document ).on('click', ".masterStudentBtn", function(event){

	window.insertMasterExampleActive = true;
	console.log("masterStudentBtn - insertMasterExampleActive: " + insertMasterExampleActive);

	var HTML = '';
	HTML += '<h3>Eksempel</h3>';

	var stepNo = jsonData.currentStep;  // <----------  ORIGINAL LIVE!
	var masterExVideo = jsonData.steps[stepNo].masterExVideo;
	console.log("masterStudentBtn - stepNo: " + stepNo + ", masterExVideo: " + masterExVideo);

	HTML += '<div class="embed-responsive embed-responsive-16by9 col-xs-12 col-md-12 vid_container">';
    HTML += 	'<iframe class="embed-responsive-item" src="'+masterExVideo+'?rel=0" allowfullscreen="1"></iframe>';
    HTML += '</div>';

	UserMsgBox("body", HTML);

	$(".MsgBox_bgr").fadeOut(0);
	$(".MsgBox_bgr").delay(200).fadeIn(200);

	$('#UserMsgBox').unbind('click');
	$('.MsgBox_bgr').unbind('click');

	$('#UserMsgBox').addClass('masterExampleClass');

});


$( document ).on('click', ".masterExampleClass .CloseClass", function(event){
	$(".MsgBox_bgr").fadeOut(200, function() {
	    $(this).remove();
	});
});



function keyThemeMaxAmountController() {  // <------   20/4-2016: SKAL TAGE HØJDE FOR SELV INTASTEDE TEMAGER/EMNER OGSÅ!!!!
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];

	console.log("addSubject - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems));

	console.log('keyThemeMaxAmountController -X- JS.totStudentThemes_selectOrder 0: ' + JSON.stringify(JS.totStudentThemes_selectOrder));
	if (JS.totStudentThemes_selectOrder.length > jsonData.numOfChoosenWords){
		var indexNo = JS.totStudentThemes_selectOrder[0];  
		console.log('keyThemeMaxAmountController -X- indexNo: ' + indexNo + ', JS.totStudentThemes 1: ' + JSON.stringify(JS.totStudentTheme) + ', JS.totStudentThemes_selectOrder 2: ' + JSON.stringify(JS.totStudentThemes_selectOrder));
		$('.keyThemes').eq(indexNo).addClass('btn-info').removeClass('btn-primary');
		JS.totStudentThemes.splice(0, 1);
		JS.totStudentThemes_selectOrder.splice(0, 1);
		console.log('keyThemeMaxAmountController -X- indexNo: ' + indexNo + ', JS.totStudentThemes 2: ' + JSON.stringify(JS.totStudentTheme) + ', JS.totStudentThemes_selectOrder 2: ' + JSON.stringify(JS.totStudentThemes_selectOrder));
	}

	console.log("addSubject - jsonData.studentSelectedProblems 2: " + JSON.stringify(jsonData.studentSelectedProblems));
}


$( document ).on('click', ".keyThemes", function(event){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var index = $(this).index();
	console.log("keyThemes -X- studentSelectedThemes 0: " + JSON.stringify(JS.studentSelectedThemes) + ", totStudentThemes_selectOrder 0: " + JSON.stringify(JS.totStudentThemes_selectOrder) + ", totStudentThemes 0: " + JSON.stringify(JS.totStudentThemes));
	if ($(this).hasClass('btn-primary')){
		JS.studentSelectedThemes.splice(returnElementNumInArray(JS.studentSelectedThemes, index), 1);
		JS.totStudentThemes_selectOrder.splice(returnElementNumInArray(JS.totStudentThemes_selectOrder, index), 1);
		JS.totStudentThemes.splice(returnElementNumInArray(JS.totStudentThemes, $(this).text().trim()), 1);
		$('.keyThemes').eq(index).addClass('btn-info').removeClass('btn-primary');
	} else {
		if (JS.studentSelectedThemes.length >= jsonData.numOfChoosenWords){
			JS.studentSelectedThemes.splice(returnElementNumInArray(JS.studentSelectedThemes, index), 1);
		}
		JS.studentSelectedThemes.push(index);
		JS.totStudentThemes.push($(this).text().trim());
		JS.totStudentThemes_selectOrder.push(index);
		$('.keyThemes').eq(index).addClass('btn-primary').removeClass('btn-info');
		console.log("keyThemes -X- studentSelectedThemes: " + JSON.stringify(JS.studentSelectedThemes));
	}
	console.log("keyThemes -X- studentSelectedThemes 1: " + JSON.stringify(JS.studentSelectedThemes) + ", totStudentThemes_selectOrder 1: " + JSON.stringify(JS.totStudentThemes_selectOrder) + ", totStudentThemes 1: " + JSON.stringify(JS.totStudentThemes));
	keyThemeMaxAmountController();
});


// This keypress eventhandler listens for the press of the return-key. If a return-key event is encountered the 
// first empty input-field is found and focus is given to that field.
$( document ).on('keypress', ".keyThemesByStudent", function(event){
	console.log("keypress - keyThemesByStudent - PRESSED");
	if ( event.which == 13 ) {  // If a press on the return-key is encountered... (NOTE: "13" equals the "return" key)
		event.preventDefault(); // ...prevents the normal action of the return-key.
		console.log("keypress - keyThemesByStudent - PRESSED RETURN");
		if ($(this).val().length > 0){
			$( "#addSubject" ).trigger( "click" );
		} else { // If the input-field is empty...
			console.log("keypress - keyThemesByStudent - PRESSED");
			$(this).focus(); // ...give the input-field focus...
		} 
	}
});


$( document ).on('click', "#addSubject", function(event){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var totStudentThemesMem = [];
	if (typeof(totStudentThemesMem)==='undefined'){
		window.totStudentThemesMem = [];
	}
	
	console.log('addSubject -  $(this).val(): _' + $('.keyThemesByStudent').val() + '_');
	if ($('.keyThemesByStudent').val().trim().length > 0) { // Only inset entered values > 0
		console.log('addSubject - TEST 1');
		if ((!elementInArray(jsonData.keyProblems[JS.selcNo].themes, $('.keyThemesByStudent').val().trim())) && 
			(!elementInArray(totStudentThemesMem, $('.keyThemesByStudent').val().trim()))){
			console.log('addSubject - TEST 2');

			$('#subjectWordContainer').append('<span class="keyThemes btn btn-primary">'+htmlEntities($('.keyThemesByStudent').val().trim())+'</span>');
			$('#subjectWordContainer .keyThemes').last().hide().fadeIn('slow');

			if (htmlEntities($('.keyThemesByStudent').val().trim()).length > 0){
				JS.studentThemes.push(htmlEntities($('.keyThemesByStudent').val().trim()));
				JS.totStudentThemes.push(htmlEntities($('.keyThemesByStudent').val().trim()));
				var selcNo = jsonData.studentSelectedProblems[jsonData.selectedIndexNum].selcNo;
				jsonData.keyProblems[selcNo].themes.push(htmlEntities($('.keyThemesByStudent').val().trim())); // <------- NEW 02-06-2016
			}
			$('.keyThemesByStudent').val('');

			// removeEmptyElements(JS.studentThemes); // When addSubject is triggered by keyThemesByStudent, then empty elements are added

			JS.totStudentThemes_selectOrder.push( $('.keyThemes').length-1);

		}
	}
	
	console.log("addSubject - totStudentThemesMem: " + JSON.stringify(totStudentThemesMem));
	console.log("addSubject - jsonData.selectedIndexNum: " + jsonData.selectedIndexNum); 
	console.log("addSubject - jsonData.studentSelectedProblems: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	
	keyThemeMaxAmountController();
});


// This function is nor needed:
function getDomIndex(targetSelector, value){
	$( targetSelector ).each(function( index, element ) { // ".keyThemes"
		console.log("getDomIndex - index: " + index + ", element.val(): _" + $(element).val() + "_, value: _" + value + "_");
		if ($(element).val() == value) {
			return index;
		}
	});
}



// NOT IN USE:  
// "if ($(element).val().trim().length > 0)" in the above event-litsener fixes the issue of students adding pure blank spaces.
function hasCharsDiffrentFromBlankSpaces(word){
	var len = word.length;
	var numOfBlankSpaces = (word.match(/\s/g) || []).length;
	console.log('hasCharsDiffrentFromBlankSpaces word: "' + word + '", len: ' + len + ', numOfBlankSpaces: ' + numOfBlankSpaces );
	if ((len > 0) && (len !== numOfBlankSpaces)) {
		return true;
	} else {
		return false;
	}
}
console.log('hasCharsDiffrentFromBlankSpaces 1: ' + hasCharsDiffrentFromBlankSpaces('a') );
console.log('hasCharsDiffrentFromBlankSpaces 2: ' + hasCharsDiffrentFromBlankSpaces('a ') );
console.log('hasCharsDiffrentFromBlankSpaces 3: ' + hasCharsDiffrentFromBlankSpaces('a  ') );
console.log('hasCharsDiffrentFromBlankSpaces 4: ' + hasCharsDiffrentFromBlankSpaces(' ') );
console.log('hasCharsDiffrentFromBlankSpaces 5: ' + hasCharsDiffrentFromBlankSpaces('  ') );
console.log('hasCharsDiffrentFromBlankSpaces 6: ' + hasCharsDiffrentFromBlankSpaces(' a') );
console.log('hasCharsDiffrentFromBlankSpaces 7: ' + hasCharsDiffrentFromBlankSpaces('  a') );




$( document ).on('click', "#step_2_goBack", function(event){
	step_1_template();
});


$( document ).on('click', "#step_2_goOn", function(event){

	// var subjectTextsArray = getSelected('subjectTexts');
	// subjectTextsArray = removeEmptyElements(subjectTextsArray); // Remove the empty elements
	// setSelected('subjectTexts', subjectTextsArray);

	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];

	console.log("step_2_goOn - studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	removeEmptyElements(JS.studentThemes);
	console.log("step_2_goOn - studentSelectedProblems 2: " + JSON.stringify(jsonData.studentSelectedProblems)); 

	// var numOfThemes = jsonData.keyProblems[JS.selcNo].themes.length  // Number of themes in the the selected problem.

	if (JS.studentThemes.length > 0) { // If the studen has choosen his/her own keyProblem...
		for (var n in JS.studentThemes){
			// jsonData.keyProblems[JS.selcNo].themes.push(JS.studentThemes[n]);  // then insert the studentThemes into the keyProblems JSON data-structure.
			// var lastThemeIndex = jsonData.keyProblems[JS.selcNo].themes.length - 1;  // Number of themes in the the selected problem.
			// JS.studentSelectedThemes.push(lastThemeIndex);
		}
	}

	if (JS.studentSelectedThemes.length + JS.studentThemes.length >= jsonData.numOfChoosenWords){
		step_3_template();
		console.log("step_2_goOn - studentSelectedProblems 3: " + JSON.stringify(jsonData.studentSelectedProblems));
	} else {
		UserMsgBox("body", '<h4>OBS</h4> Du skal markere, eller skrive, mindst '+jsonData.numOfChoosenWords+' emner før du kan gå videre. Du har kun angivet '+String(JS.studentSelectedThemes.length+JS.studentThemes.length)+' ord.');
	}

});



//////////////////////
//  	STEP 3 		//  PUT WORDS ON YOUR THEME 
//////////////////////


function step_3_template(){
	jsonData.previousStep = jsonData.currentStep;
	jsonData.currentStep = 3;

	window.hasBeenExecBool = false;
	if ((jsonData.previousStep == 2) && (showNaggingBox) && !hasBeenExecOnce("stepCheckArr", jsonData.currentStep)) {
		hasBeenExecBool = true;
		problemFormulationBtn_pressed = true;  // Only for step 3 and 4.
		$( ".problemFormulationBtn" ).trigger( "click" );
	}

	console.log("step_3_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_3_template - studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems));
	console.log("step_3_template - keyProblems 1: " + JSON.stringify(jsonData.keyProblems)); 
	
	osc.save('jsonData', jsonData);
	if ((typeof(DTO) !== 'undefined') && (DTO !== null)){ // Stop dynamic text ecexution.
		DTO.stopExec(0);
		DTO = null;
	}

	// // Set backgroundcolors by inline CSS-style:
	// window.colorObj = {g1: null, g2: null, g3: null, f1: null};
	// $('body').append('<span class="g1 hide"> XXXX </span><span class="g2 hide"> XXXX </span><span class="g3 hide"> XXXX </span><span class="f1 hide"> YYYY </span>');
	// colorObj.g1 = $('.g1').css('background-color');
	// colorObj.g2 = $('.g2').css('background-color');
	// colorObj.g3 = $('.g3').css('background-color');
	// colorObj.f1 = $('.f1').css('background-color');
	// console.log("step_3_template - colorObj: " + JSON.stringify(colorObj));
	setColorObj();

	var stepNo = 3;
	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));

	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];

	var studentSelectedThemes = [];
	for (var n in JS.studentSelectedThemes) {
		studentSelectedThemes.push(jsonData.keyProblems[JS.selcNo].themes[JS.studentSelectedThemes[n]]);
	}
	var JSS = JS.studentThemes.concat(studentSelectedThemes);
	// var JSS = JS.studentThemes.concat(JS.studentSelectedThemes);
	console.log("step_3_template - JSS: " + JSON.stringify(JSS));

	console.log("step_3_template - JS 1: " + JSON.stringify(JS)); 

	// if (!JS.hasOwnProperty('taxonomyObjArray')){
	// 	JS.taxonomyObjArray = [];
	// 	JS.taxonomyObj = {};

	// 	for (var n in JSS) {
	// 		JS.taxonomyObjArray.push({"studentSelectedTheme": JSS[n], "describe": [], "analyse": [], "assess": [], selected: true});  // OLD STRUCTURE - NOT IN USE!
	// 	}
	// 	JS.taxonomyObj = {"describe": [], "analyse": [], "assess": []};    // NEW STRUCTURE - IN USE!
	// }

	if (!JS.hasOwnProperty('taxonomyObj')){
		JS.taxonomyObj = {"describe": [], "analyse": [], "assess": []};    // NEW STRUCTURE - IN USE!
	}

	console.log("step_3_template - JS 2: " + JSON.stringify(JS));

	var HTML = '';
	HTML += '<div id="step_3" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_3" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction('Lav dine ??? underemner om til underspørgsmål. Find på så mange spørgsmål som muligt. <span id="dynamicText"></span><span class="cursor">|</span>' + insertMasterExample()):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectTextThemeContainer" >';
			
	HTML += 			'<div class="problemFormulationBtnWrap">';
	HTML += 					'<span class="problemFormulationBtn btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET DIN PROBLEMFORMULERING</span>';
	HTML += 			'</div>';

			// var studentSelectedThemes = [];
			// for (var n in JS.studentSelectedThemes) {
			// 	studentSelectedThemes.push(jsonData.keyProblems[JS.selcNo].themes[JS.studentSelectedThemes[n]]);
			// }
			// var JSS = JS.studentThemes.concat(studentSelectedThemes);
			// console.log("step_3_template - JSS: " + JSON.stringify(JSS)); 

			// window.taxonomytabHeadings = ['Faktuelle spørgsmål', 'Undersøgende spørgsmål', 'Diskuterende/vurderende spørgsmål'];
			window.taxonomytabHeadings = ['Redegørende spørgsmål', 'Undersøgende/analyserende spørgsmål', 'Diskuterende/vurderende spørgsmål'];
			HTML += '<ul class="nav nav-tabs">';  // <-----  NATIVE BOOTSTRAP TABS
			// for (var n in JSS){
			for (var n in taxonomytabHeadings){
				// HTML += '<li id="tabHeading_'+n+'" class="tabHeading'+((n==0)?' active':'')+'"><a href="#">'+JSS[n]+'</a></li>';    // <-----  NATIVE BOOTSTRAP TABS
				HTML += '<li id="tabHeading_'+n+'" class="tabHeading'+((n==0)?' active':'')+'"><a href="#">'+taxonomytabHeadings[n]+'</a></li>';    // <-----  NATIVE BOOTSTRAP TABS
			}
			HTML += '</ul>';    // <-----  NATIVE BOOTSTRAP TABS


// var count = 0;
// for (var n in JS.taxonomyObjArray) { 
// 	var taxonomyObjkey = Object.keys(JS.taxonomyObjArray[n]);
// 	for (var k in taxonomyObjkey) { 
// 		var key = taxonomyObjkey[k];
// 		if (key != 'studentSelectedTheme'){ // studentSelectedTheme has to be ignored...
// 			for (var t in JS.taxonomyObjArray[n][key]) { 
// 				var arrLen = JS.taxonomyObjArray[n][key].length-1;
// 				HTML += '<div id="Sort_'+count+'" class="taxonomy Sortable sortable_text_container">'+JS.taxonomyObjArray[n][key][arrLen-t]+'</div>';
// 				++count;
// 			}
// 		}
// 	}
// }

// <span class="contentEdit glyphicon glyphicon-pencil"></span>

			// insertStudentSelectedThemes(dropdownMarkup, index)
			for (var n in taxonomytabHeadings) { 
				HTML += 	'<div id="tabBody_'+n+'" class="tabBody">';


				HTML += 		'<div class="row">';
				HTML += 			'<div class="tabBodyDropdownContainer col-md-12 col-xs-12">';

				HTML += 			'<h4>';
									for (var p in JS.totStudentThemes) { 
				HTML += 				'<span class="e1 label label-default">'+JS.totStudentThemes[p]+'</span>';
									}
				HTML += 			'</h4>';

				HTML += 				'<div class="DropdownWrap">';
				HTML += 					(n == 0)? returnDropdownMarkup(jsonData.sentenceStarters_taxonomy_describing) : '';
				HTML += 					(n == 1)? returnDropdownMarkup(jsonData.sentenceStarters_taxonomy_analysing) : '';
				HTML += 					(n == 2)? returnDropdownMarkup(jsonData.sentenceStarters_taxonomy_assessing) : '';
				HTML += 				'</div>';

				HTML += 				'<textarea class="tabInput">';
				HTML += 				'</textarea>';
		
				HTML += 					(n == 0)? returnDivs(JS.taxonomyObj.describe, colorObj['g'+parseInt(3-n)]) : '';
				HTML += 					(n == 1)? returnDivs(JS.taxonomyObj.analyse, colorObj['g'+parseInt(3-n)]) : '';
				HTML += 					(n == 2)? returnDivs(JS.taxonomyObj.assess, colorObj['g'+parseInt(3-n)]) : '';

				HTML += 			'</div>';
				HTML += 		'</div>';

				HTML += 	'</div>';
			}

	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 3 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);

	// setJsAudioEventLitsner2();

	$('.tabBody').hide();
	// $('#tabBody_0').show();
	$('#tabBody_0').fadeIn( "slow" );

	window.tabHeading_index = 0;

	// replaceWildcardsInCmdObj(jsonData.steps[stepNo].instruction);

	// window.DTO = Object.create(dynamicTextClass); 
	// DTO.init('#dynamicText', jsonData.steps[stepNo].instruction);

	if (!hasBeenExecBool) {
		$( document ).trigger( "dynamicTextEvent", [{testdata: hasBeenExecBool}] );
	}

	window.scrollTo(0, 0);
}


// <div class="taxonomy sortable_text_container" style="background-color:rgb(223, 248, 248)">www<span class="contentEdit glyphicon glyphicon-pencil"></span></div>

function returnDivs(btnTextArr, style){
	var HTML = '';
	for (var n in btnTextArr){
		HTML += '<div style="background-color:'+style+'" class="taxonomy sortable_text_container">'+btnTextArr[n]+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>';
	}
	return HTML;
}


$( document ).on('click', ".tabHeading", function(event){
	event.preventDefault(); // ... prevents the normal action anchor-tag.
	// window.tabHeading_index = $(this).index(); // index() is the same number as "n"
	tabHeading_index = $(this).index(); // index() is the same number as "n"
	var text = $(this).text();

	$('.tabBody').hide();
	// $('#tabBody_'+tabHeading_index).show();
	$('#tabBody_'+tabHeading_index).fadeIn( "slow" );
	$('.tabHeading').removeClass('active');
	$('#tabHeading_'+tabHeading_index).addClass('active');
});


// $( document ).on('focusin', ".tabInput", function(event){
// 	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
// 	if (!JS.hasOwnProperty('taxonomyObjArray')){
// 		JS.taxonomyObjArray = [];

// 		for (var n in JS.studentSelectedThemes) {
// 			JS.taxonomyObjArray.push({"studentSelectedTheme": null, "describe": [], "analyse": [], "assess": []});
// 		}
// 	}
// });


function tabInput(thisObj){  // taxonomytabHeadings
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	console.log("tabInput - studentSelectedProblems 1: " + JSON.stringify(JS)); 

	var tabObjLookup = ["describe", "analyse", "assess"];  // <----- ['Faktuelle spørgsmål', 'Undersøgende spørgsmål', 'Diskuterende/vurderende spørgsmål']
	window.tabBodyDropdown_index = $(thisObj).closest('.tabBodyDropdownContainer').index();

	console.log('focusout - tabBodyDropdown_index: _'+tabBodyDropdown_index+'_');

	// var tabHeading_index = tabHeading_index || 0;
	console.log('focusout - tabHeading_index: _'+tabHeading_index+'_');

	// var taxonomyObjArray = Object.keys(JS.taxonomyObjArray[tabHeading_index]);
	// console.log('focusout - taxonomyObjArray: _'+taxonomyObjArray+'_');

	// var taxonomyObjKey = taxonomyObjArray[parseInt(tabBodyDropdown_index+1)];  	  // <-------- OLD !
	var taxonomyObjKey = tabObjLookup[tabHeading_index];							  // <-------- NEW !
	console.log('focusout - taxonomyObjKey: _'+taxonomyObjKey+'_');

	console.log('focusout - string: '+parseInt(tabBodyDropdown_index+1));

	console.log('focusout - jquery: ' + '#tabBody_'+tabHeading_index+' .tabBodyDropdownContainer:eq('+String(parseInt(tabBodyDropdown_index+1))+') .tabInput');
	var text = $('#tabBody_'+tabHeading_index+' .tabBodyDropdownContainer:eq('+String(parseInt(tabBodyDropdown_index))+') .tabInput').val();
	// var text = $('#tabBody_'+tabHeading_index+' .tabBodyDropdownContainer:eq('+String(parseInt(tabBodyDropdown_index))+') .tabInput').html();
	text = htmlEntities(text);

	if (text.length > 0){
		$('#tabBody_'+tabHeading_index+' .tabBodyDropdownContainer:eq('+String(parseInt(tabBodyDropdown_index))+') .tabInput').val('');
		
		console.log('focusout - text: _'+text+'_');

		// JS.taxonomyObjArray[tabHeading_index][taxonomyObjKey].push(text);	// <-------- OLD !
		// JS.taxonomyObjArray[tabBodyDropdown_index][taxonomyObjKey].push(text);	// <-------- NEW !
		// console.log('focusout - taxonomyObjArray: ' + JSON.stringify(JS.taxonomyObjArray));

		JS.taxonomyObj[taxonomyObjKey].push(text);
		console.log('focusout - taxonomyObj: ' + JSON.stringify(JS.taxonomyObj));

		// $('#tabBody_'+tabHeading_index+' .tabBodyDropdownContainer:eq('+String(parseInt(tabBodyDropdown_index))+') .tabInput').after('<div class="taxonomy sortable_text_container">'+text+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>');
		$('#tabBody_'+tabHeading_index+' .tabBodyDropdownContainer:eq('+String(parseInt(tabBodyDropdown_index))+') .tabInput').after('<div style="background-color:'+colorObj['g'+parseInt(3-tabHeading_index)]+'" class="taxonomy sortable_text_container">'+text+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>');
	}
}


$( document ).on('focusout', ".tabInput", function(event){
	tabInput($(this));
});

// This keypress eventhandler listens for the press of the return-key. If a return-key event is encountered the 
// first empty input-field is found and focus is given to that field.
$( document ).on('keypress', ".tabInput", function(event){
	if ( event.which == 13 ) {  // If a press on the return-key is encountered... (NOTE: "13" equals the "return" key)
		event.preventDefault(); // ...prevents the normal action of the return-key.
		tabInput($(this));
	}
});


$( document ).on('click', ".taxonomy", function(event){
	
	console.log('TAXONOMYTEST - click');

	console.log('TAXONOMYTEST: taxonomyTextEdit.length: ' + $('.taxonomyTextEdit').length + ', jsonData.currentStep: ' + jsonData.currentStep);

	// PROBLEMS BETWEEN JQUERY-UI-SORTABLE, CLICK AND FOCUSOUT:
	// --------------------------------------------------------
	// JQuery UI "sortable" creates a problem between the "click" event and the 
	// "focusout" event - the "click" event is fired before the "focusout" event when "sortable" is active. 
	// This is why the special case for step 4 (below) has been made. It works for firefox and chrome, but not safari. In
	// safari, one has to tab once on a new div for "closeing" the editing-mode of the old div, and then once more on 
	// the new div to begining the editing the new div. In all, you have to tab twice on the new div. In setp 3, one need 
	// only tab _ONCE_ on a new div to close the old div, and start editing the new div.
	//
	// if (($('.taxonomyTextEdit').length > 0) && (jsonData.currentStep == 4)) {  
	// if (jsonData.currentStep == 4) {  // UGLY SPECIAL CASE FOR STEP 4 !!!  There is an issue of ".taxonomy click" being fired before ".taxonomyEdit focusout" - this is a genereal issue with click and focusout - SEE:  http://stackoverflow.com/questions/13980448/jquery-focusout-click-conflict
		
	// 	// alert('TEST 1');  // <------ VIRKER ALENE I ALLE BROWSERE!!! Alert-kaldet gør at nedenstående trigger bliver kørt - hvis . 
		
	// 	console.log('TAXONOMYTEST - before run trigger');

	// 	$( ".taxonomyEdit" ).trigger( "focusout" );  // <----- Virker i Firefox og chrome, men ikke i safari.
	// 	// $( ".taxonomyEdit" ).triggerHandler( "focusout" );  // <---- Virker ikke!!!

	// 	console.log('TAXONOMYTEST - after run trigger');

	// 	updateSortableOrderArray(1);
	// 	colorSubQuestions();

	// 	// alert('TEST 2');
	// }
	// alert('TEST 3');

	var text = $(this).text();
	text = htmlEntities(text);

	$(this).removeClass('taxonomy');
	$(this).addClass('taxonomyEdit');
	console.log('taxonomy - text: _'+text+'_');

	$(this).html(returnInputBoxes4(1, 'taxonomyTextEdit', text, 'Skriv dit underspørgsmål her'));     // <-------  Text changed 07-06-2016: TLY does not want the delete-feature.
	// $(this).html(returnInputBoxes4(1, 'taxonomyTextEdit', '<span class="taxonomyTextEditContainer">'+text+'</span>', 'Skriv eller klik væk for at slette...'));
	// $(this).html('<input type="text" class="taxonomyTextEdit form-control" value="'+text+'" placeholder="Skriv eller klik væk for at slette..." aria-describedby="sizing-addon2">');

	$('.input-group', this).append('<span class="contentDelete glyphicon glyphicon-trash"></span>');
	window.contentDelete = false;


	// $('.taxonomyTextEdit', this).focus();  // This jus sets the focus. To set the focus at the end, see the following:

	// SET FOCUS AT THE END:
	// SEE: http://stackoverflow.com/questions/19568041/set-focus-and-cursor-to-end-of-text-input-field-string-w-jquery 
	var searchInput = $('.taxonomyTextEdit', this);

	// Multiply by 2 to ensure the cursor always ends up at the end;
	// Opera sometimes sees a carriage return as 2 characters.
	var strLength = searchInput.val().length * 2;

	searchInput.focus();
	searchInput[0].setSelectionRange(strLength, strLength);

	// UGLY SPECIAL CASE FOR STEP 4 !!! This has been implemented as a solution to the problem of the .sortable(): // UGLY SPECIAL CASE FOR STEP 4 !!!  There is an issue of ".taxonomy click" being fired before ".taxonomyEdit focusout" - this is a genereal issue with click and focusout - SEE:  http://stackoverflow.com/questions/13980448/jquery-focusout-click-conflict
	// By deactivating sortability on the "on click" click event, then the "on focusout" event will fire BEFORE the "on click" event as it should (when you edit one div an click on another div to edit this div). 
	// By reactivating sortability on the "on focusout" event, then the sortability will be active if the user chooses to sort the divs.
	if ((jsonData.currentStep == 4)) {  
		$( "#subjectSentenceSortableContainer" ).sortable({  
			disabled: true
		});
	}
	
});


$( document ).on('click', ".contentDelete", function(event){
	console.log('TAXONOMYTEST -x- contentDelete.click');
	// var HTML = '';
	// HTML += '<div class="label label-primary deleteCallOut">';
	// HTML += '<h5>Slet?</h5>';
	// HTML += '</div>';
	// HTML += '<span class="glyphicon glyphicon-arrow-down"></span>';
	// $(this).after(HTML);
});

$( document ).on('mouseover', ".contentDelete", function(event){
	console.log('TAXONOMYTEST -x- contentDelete.mouseover');
	// $('.taxonomyEdit').unbind('focusout');
});

$( document ).on('mousedown', ".contentDelete", function(event){  // <----- EVENT SEQUENCE: mousedown > focusout > click
	console.log('TAXONOMYTEST -x- contentDelete.mousedown');
	// $('.taxonomyEdit').unbind('focusout');

	// $(this).closest('.taxonomyEdit').css('background-color','blue'); // append('<span class="contentEdit glyphicon glyphicon-trash"></span>');

	contentDelete = true;

	var HTML = '';
	HTML += '<div class="label label-primary deleteCallOut">';
	HTML += '<h5>Slet?</h5>';
	HTML += '</div>';
	HTML += '<span class="glyphicon glyphicon-arrow-down"></span>';
	$(this).after(HTML);

});


// $( document ).on('click', "body:not(.contentDelete .taxonomyEdit)", function(event){
$( document ).on('click', "body", function(event){
	
	console.log('TAXONOMYTEST -x- event.target.nodeName: ' + event.target.nodeName + ', event.target.className: ' + event.target.className); 

	var clickClass = event.target.className;

	if ((clickClass.indexOf('contentEdit') === -1) && (clickClass.indexOf('contentDelete') === -1) && (clickClass.indexOf('taxonomyEdit') === -1) && (clickClass.indexOf('taxonomyTextEdit') === -1)){
		// var thisObj = $(this);
		if ($('.taxonomyEdit').length > 0){  // It has to be in edit mode...
			var thisObj = $('.taxonomyEdit');
			contentDeleteController(thisObj);
		}
	}

	if ((clickClass.indexOf('taxonomyTextEdit') !== -1)){
		$('.contentDelete').remove();
		$('.deleteCallOut').remove();
		$('.glyphicon-arrow-down').remove();
		$('.input-group', this).append('<span class="contentDelete glyphicon glyphicon-trash"></span>');
	}
});

$( document ).on('click', ".deleteCallOut", function(event){

	// taxonomyEdit($('.taxonomyTextEdit').val(), $(this).closest('.taxonomyEdit'));  // <----- "sortable_text_container" instead of "taxonomyEdit"

	$(this).closest('.sortable_text_container').remove();
});


$( document ).on('click', ".contentDelete", function(event){
	console.log('TAXONOMYTEST -x- contentDelete.focusout');
	// $( ".taxonomyEdit" ).trigger( "focusout" ); 
});


$( document ).on('click', ".sortable_text_container", function(event){
	console.log('TAXONOMYTEST -x- sortable_text_container.click');
});


// $( document ).on('focusout', ".taxonomyEdit", function(event){
$( document ).on('focusout', ".taxonomyEdit", function(event){   // Added 07-06-2016

	console.log('TAXONOMYTEST -x- taxonomyEdit.focusout');

	var thisObj = $(this);
	contentDeleteController(thisObj);
	
});


function contentDeleteController(thisObj){

	// if (!thisObj.hasClass('newSubQuestion')) {  // UGLY SPECIAL CASE FOR STEP 5 !!! 

		if (!contentDelete){

			// UGLY SPECIAL CASE FOR STEP 4 !!! This has been implemented as a solution to the problem of the .sortable(): // UGLY SPECIAL CASE FOR STEP 4 !!!  There is an issue of ".taxonomy click" being fired before ".taxonomyEdit focusout" - this is a genereal issue with click and focusout - SEE:  http://stackoverflow.com/questions/13980448/jquery-focusout-click-conflict
			// By deactivating sortability on the "on click" click event, then the "on focusout" event will fire BEFORE the "on click" event as it should (when you edit one div an click on another div to edit this div). 
			// By reactivating sortability on the "on focusout" event, then the sortability will be active if the user chooses to sort the divs.
			if ((jsonData.currentStep == 4)) {  // UGLY SPECIAL CASE FOR STEP 4 !!! 
				$( "#subjectSentenceSortableContainer" ).sortable({
					disabled: false
				});
			}

			var text = $('.taxonomyTextEdit').val();  
			console.log('taxonomyEdit - focusout - text: _'+text+'_');
			$('.input-group', thisObj).remove();
			// $(this).append('<span class="contentEdit glyphicon glyphicon-pencil"></span>');
			// $(this).css('background-color','blue');
			
			if (jsonData.currentStep == 3){ // Prevent manipulation of the step 3 datastructure in step 4...
				console.log('focusout - A1');
				// taxonomyEdit(text, $(thisObj));   // <--- 2/5-2016 
			}

			if (text.length > 0) {
				console.log('focusout - A2 - TAXONOMYTEST');
				$(thisObj).closest('.sortable_text_container').addClass('taxonomy');
				$(thisObj).text(text);
				$(thisObj).removeClass('taxonomyEdit');
				// taxonomyEdit(text, $(this));
			} else {
				// $(thisObj).remove();   // <-------  Commented out 07-06-2016: TLY does not want this delete-feature. 
				$(thisObj).addClass('taxonomy').removeClass('taxonomyEdit');  //  Added 07-06-2016 to compensate for the delete-feature. 
				console.log('focusout - A3 - TAXONOMYTEST');
				if ((jsonData.currentStep == 4)) {  // UGLY SPECIAL CASE FOR STEP 4 !!! 
					console.log('focusout - A4 - TAXONOMYTEST');
					// colorSubQuestions();   // <----- COMMENTED OUT 23-05-2016
				}
			}
		
			console.log('TAXONOMYTEST -x- TRASH FALSE');
			$(thisObj).append('<span class="contentEdit glyphicon glyphicon-pencil"></span>');
		}

		contentDelete = false;
	// }

}


// This keypress eventhandler listens for the press of the return-key. If a return-key event is encountered the 
// first empty input-field is found and focus is given to that field.
$( document ).on('keypress', ".taxonomyEdit", function(event){
	if ( event.which == 13 ) {  // If a press on the return-key is encountered... (NOTE: "13" equals the "return" key)
		event.preventDefault(); // ...prevents the normal action of the return-key.

		var text = $('.taxonomyTextEdit').val();  
		// var text = $('.taxonomyTextEditContainer').val();  

		console.log('taxonomyEdit - return - text: _'+text+'_');
		$('.input-group', this).remove();
		
		if (jsonData.currentStep == 3){ // Prevent manipulation of the step 3 datastructure in step 4...
			// taxonomyEdit(text, $(this));     // <--- 2/5-2016 
		}

		if (text.length > 0) {
			$(this).closest('.sortable_text_container').addClass('taxonomy');
			$(this).text(text);
			$(this).removeClass('taxonomyEdit');
			// taxonomyEdit(text, $(this));
		} else {
			// $(this).remove();   // <-------  Commented out 07-06-2016: TLY does not want this delete-feature.
			$(this).addClass('taxonomy').removeClass('taxonomyEdit');  //  Added 07-06-2016 to compensate for the delete-feature.
			if ((jsonData.currentStep == 4)) {  // UGLY SPECIAL CASE FOR STEP 4 !!! 
				console.log('keypress - TAXONOMYTEST');
				// colorSubQuestions();   // <----- COMMENTED OUT 23-05-2016
			}
		}

		$(this).append('<span class="contentEdit glyphicon glyphicon-pencil"></span>');  // Added 07-06-2016 - it was missing!
	}
});

// // This function edits the datastructure in step 3 - it adds data to the structure. It is important that it does not run in other steps than step 3, since this will make inconsistent data for step 3 (if the student chooses to go back to step 3).
// function taxonomyEdit(text, thisObj){
// 	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
// 	console.log('taxonomyEdit - taxonomyObjArray 1: ' + JSON.stringify(JS.taxonomyObjArray));

// 	var index = $(thisObj).closest('.sortable_text_container').index() - 2;  // "-2" becauce .index() counts the textarea an dropdown...
// 	var tabBodyDropdown_index = $(thisObj).closest('.tabBodyDropdownContainer').index();  
// 	var tabBody_index = parseInt($(thisObj).closest('.tabBody').prop('id').replace('tabBody_',''));
// 	console.log('taxonomyEdit - index: ' + index + ', tabBodyDropdown_index: ' + tabBodyDropdown_index + ', tabBody_index: ' + tabBody_index);
	
// 	var taxonomyObjArray = Object.keys(JS.taxonomyObjArray[tabBody_index]);
// 	// var taxonomyObjKey = taxonomyObjArray[parseInt(tabBodyDropdown_index+1)];
// 	var tabObjLookup = ["describe", "analyse", "assess"];  // <----- ['Faktuelle spørgsmål', 'Undersøgende spørgsmål', 'Diskuterende/vurderende spørgsmål']
// 	var taxonomyObjKey = tabObjLookup[tabHeading_index];
// 	console.log('taxonomyEdit - taxonomyObjArray: ' + taxonomyObjArray + ', taxonomyObjKey: ' + taxonomyObjKey);

// 	console.log('taxonomyEdit - taxonomyObjArray 2: ' + JSON.stringify(JS.taxonomyObjArray[tabBody_index]));
	
// 	var len = JS.taxonomyObjArray[tabBody_index][taxonomyObjKey].length;
// 	console.log('taxonomyEdit - len: ' + len + ', index: ' + index + ', res: ' + String(len - 1 - index));

// 	if (text.length > 0) {
// 		// JS.taxonomyObjArray[tabBody_index][taxonomyObjKey][index] = text;
// 		// JS.taxonomyObjArray[tabBody_index][taxonomyObjKey][len - 1 - index] = text;  // <---- OLD !!!
// 		JS.taxonomyObjArray[tabBodyDropdown_index][taxonomyObjKey][len - 1 - index] = text;  // <---- NEW !!!
// 	} else {
// 		// JS.taxonomyObjArray[tabBody_index][taxonomyObjKey].splice(index, 1);  // Dette virker, men arrayet skal reverses, så der slettes fra den rigtige ende!
// 		// JS.taxonomyObjArray[tabBody_index][taxonomyObjKey].splice(len - 1 - index, 1);  // <---- OLD !!!
// 		JS.taxonomyObjArray[tabBodyDropdown_index][taxonomyObjKey].splice(len - 1 - index, 1);
// 	}
// 	console.log('taxonomyEdit - taxonomyObjArray 3: ' + JSON.stringify(JS.taxonomyObjArray));
// }


// function taxonomyEdit_2(){
// 	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
// 	console.log('taxonomyEdit_2 - taxonomyObjArray 1: ' + JSON.stringify(JS.taxonomyObjArray));

// 	// JS.taxonomyObjArray.push({"studentSelectedTheme": JSS[n], "describe": [], "analyse": [], "assess": [], selected: true});

// 	$( ".tabBody" ).each(function( index1, element1 ) {   // describe / analyse / assess...
		
// 		$( ".tabBodyDropdownContainer", element1 ).each(function( index2, element2 ) {  //  each of the themes...
// 			var elemArr = [];
// 			$( ".sortable_text_container", element2 ).each(function( index3, element3 ) {  // each of the subquestions...
// 				elemArr.push($(element3).text());
// 			});

// 			var objKeys = Object.keys(JS.taxonomyObjArray[index2]);
// 			console.log('taxonomyEdit_2 - index2 : ' + index2 + ', objKeys: '+JSON.stringify(objKeys)+', index1+1: ' + String(index1+1) + ', elemArr: ' + JSON.stringify(elemArr));
// 			JS.taxonomyObjArray[index2][objKeys[index1+1]] = elemArr;
// 		});
// 	});	

// 	console.log('taxonomyEdit_2 - taxonomyObjArray 2: ' + JSON.stringify(JS.taxonomyObjArray));
// }


function taxonomyEdit_3(){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	// console.log('taxonomyEdit_2 - taxonomyObjArray 1: ' + JSON.stringify(JS.taxonomyObjArray));

	var objKeys = Object.keys(JS.taxonomyObj);
	$( ".tabBody" ).each(function( index1, element1 ) {   // describe / analyse / assess...
		
		var elemArr = [];
		$( ".sortable_text_container", element1 ).each(function( index2, element2 ) {  // each of the subquestions...
			elemArr.push($(element2).text());
		});

		JS.taxonomyObj[objKeys[index1]] = elemArr;
	});	

	// console.log('taxonomyEdit_2 - taxonomyObjArray 2: ' + JSON.stringify(JS.taxonomyObjArray));
	console.log('taxonomyEdit_2 - taxonomyObj: ' + JSON.stringify(JS.taxonomyObj));
}



$(document).on('change', '.taxonomyDropdown', function(){
	var tagName = $(this).prop("tagName")
	console.log("taxonomyDropdown - tagName: " + tagName);
	var taxonomyDropdown = $(this).val();
	console.log("taxonomyDropdown - taxonomyDropdown: " + taxonomyDropdown);
	var tabBodyObj = $(this).closest('.tabBodyDropdownContainer'); 
	$('.tabInput', tabBodyObj).val(taxonomyDropdown);
	$('.tabInput', tabBodyObj).focus();

	var HTML = '';
	HTML += ($(this).prop("id").indexOf('describing') !== -1)? returnDropdownMarkup(jsonData.sentenceStarters_taxonomy_describing) : '';
	HTML += ($(this).prop("id").indexOf('analysing') !== -1)? returnDropdownMarkup(jsonData.sentenceStarters_taxonomy_analysing) : '';
	HTML += ($(this).prop("id").indexOf('assessing') !== -1)? returnDropdownMarkup(jsonData.sentenceStarters_taxonomy_assessing) : '';
	console.log("taxonomyDropdown - HTML: " + HTML);
	$(this).parent().html(HTML);
});


function insertStudentSelectedThemes(dropdownMarkup, JSS, index){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	// var indexNo = JS.studentSelectedThemes[index];
	// var studentSelectedTheme = jsonData.keyProblems[JS.selcNo].themes[indexNo];
	var studentSelectedTheme = JSS[index];
	console.log('insertStudentSelectedThemes - studentSelectedTheme: ' + studentSelectedTheme);
	return dropdownMarkup.replace(/\?\?\?/g, studentSelectedTheme.toLowerCase());
}


function insertKeyProblem(dropdownMarkup){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var keyProblem = jsonData.keyProblems[JS.selcNo].name;
	console.log('insertThemes - keyProblem: ' + keyProblem);
	// return dropdownMarkup.replace(/\?\?\?/g, keyProblem.toLowerCase());
	return dropdownMarkup.replace(/\?\?\?/g, keyProblem);
}
// console.log('insertThemes: '+insertThemes('Det valgte tema er ???, som er et tama der aktuelt ift...'));

function showHideNavbtns(){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	if ((JS.problemFormulationMem.length == 0) || (problemFormulationMemNum == 0)) {
		$('.problemFormulation_goBack').hide();
	} else {
		$('.problemFormulation_goBack').show();
	}
	if ((JS.problemFormulationMem.length == problemFormulationMemNum) || (JS.problemFormulationMem.length-1 == problemFormulationMemNum)){
		$('.problemFormulation_goOn').hide();
	} else {
		$('.problemFormulation_goOn').show();
	}
}

function saveProblemFormulation(){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var textInputProblemFormulation = $('#textInputProblemFormulation').val();
	console.log('problemFormulation_saveHide - textInputProblemFormulation: ' + textInputProblemFormulation);
	console.log('problemFormulation_goOn - problemFormulationMem 1: ' + JS.problemFormulationMem);
	if (textInputProblemFormulation.length > 0)	{
		JS.problemFormulationMem.push(textInputProblemFormulation);
	}
}



function setColorObj() {
	window.colorObj = {g1: null, g2: null, g3: null, f1: null, none: null};
	$('body').append('<span class="g1 hide"> &nbsp; </span><span class="g2 hide"> &nbsp; </span><span class="g3 hide"> &nbsp; </span><span class="f1 hide"> &nbsp; </span> <span id="noColor" class="sortable_text_container hide"> &nbsp; </span>');
	colorObj.g1 = $('.g1').css('background-color');
	colorObj.g2 = $('.g2').css('background-color');
	colorObj.g3 = $('.g3').css('background-color');
	colorObj.f1 = $('.f1').css('background-color');
	colorObj.none = $('#noColor').css('background-color');
	console.log("setColorObj - colorObj: " + JSON.stringify(colorObj));
}


function setCssObj(thisObj) {
	window.cssObj = $(thisObj).css(['padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'font-size']);
	console.log('problemFormulationBtn - cssObj: ' + JSON.stringify(cssObj));
	window.cssObjZero = {}; window.cssObjXL = {};
	var objKeys = Object.keys(cssObj);
	for (var n in objKeys){
		var size1 = parseInt(cssObj[objKeys[n]].replace('px', ''));
		var size2 = Math.ceil(parseInt(cssObj[objKeys[n]].replace('px', ''))*1.1);
		console.log('problemFormulationBtn - objKeys['+n+']: ' + objKeys[n] + ', size1: ' + size1 + ', size2: ' + size2);
		cssObjZero[objKeys[n]] = '0px';
		cssObjXL[objKeys[n]] = size2+'px';
	}
}

function hideCssObj(thisObj) {
	$(thisObj).animate(cssObjZero, 300, function() {
		$(thisObj).hide();
	});
}

function showCssObj() {
	$(".problemFormulationBtn").show().animate(cssObjXL, 300).animate(cssObj, 300);
}


// Functionality for the UserMsgBox containing the "Problem Formulation".
$( document ).on('click', ".problemFormulationBtn", function(event){
	var HTML = '';
	// HTML += insertKeyProblem('<h4>Du valgte nøgleproblemet "???"</h4>');

	// HTML += insertKeyProblem('<h4>Du valgte nøgleproblemet <span class="e1 label label-default"> ??? </span></h4>');

	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var keyProblem = jsonData.keyProblems[JS.selcNo].name;

	console.log('problemFormulationBtn - jsonData.currentStep: ' + jsonData.currentStep);

	if (jsonData.currentStep == 1) {
		HTML += insertKeyProblem('<h4>Du valgte emnet: <span class="e1 label label-default"> ??? </span></h4>');
	}
	if (jsonData.currentStep == 2) {
		HTML += insertKeyProblem('<h4>Ret din problemformulering</h4>');
		HTML += '<p>Når du vælger underemner får du automatisk hjælp til at afgrænse din problemformulering. Har du rettelser eller tilføjelser til din problemformulering?</p>';
	}
	if (jsonData.currentStep == 3) {
		HTML += insertKeyProblem('<h4>Ret din problemformulering</h4>');
		if (JS.taxonomyObj.describe.length + JS.taxonomyObj.analyse.length + JS.taxonomyObj.assess.length > 0) {  // If you have added some text as content to you subQuestions, then you get the following usrMSG
			HTML += '<p>Underspørgsmålene er en slags plan for, hvordan du vil besvare din problemformulering. Har du rettelser eller tilføjelser til din problemformulering efter at have brainstormet over underspørgsmål?</p>';
		} else { // If you have NOT added some text as content to you subQuestions (this will be in the "naggingbox" as well), then you get the following usrMSG:
			HTML += '<p>Når du vælger underemner får du automatisk hjælp til at afgrænse din problemformulering. Har du rettelser eller tilføjelser til din problemformulering?</p>';
		}
	}
	if (jsonData.currentStep == 4) {
		HTML += insertKeyProblem('<h4>Ret din problemformulering</h4>');
		HTML += '<p>Underspørgsmålene hjælper dig med at besvare din problemformulering. Er du nødt til at gøre dit hovedspørgsmål skarpere? Bringer problemformuleringen alle tre fag i spil? Husk at “limen” for din problemformulering er det overordnede emne<span class="e1 label label-default">'+keyProblem+'</span> </p>';
	}

	// HTML += '<div class="DropdownWrap">';  // <-----   NOT NEEDED AS OF 06-04-2016
	// HTML += 	returnDropdownMarkup(jsonData.sentenceStarters_problemFormulation);
	// HTML += '</div>';
	HTML += '<textarea id="textInputProblemFormulation" class="textInput" val="">';
			// if ((JST.hasOwnProperty('textQuotes')) && (typeof(JST.textQuotes[quoteCount]) !== 'undefined')) {
			// 	HTML += JST.textQuotes[quoteCount];
			// }			
	HTML += '</textarea>';
	// HTML += '<span class="problemFormulation_goBack btn btn-info"><span class="glyphicon glyphicon-chevron-left"></span>Se din forrige</span><span class="problemFormulation_goOn btn btn-info">Se din nye<span class="glyphicon glyphicon-chevron-right"></span></span><span class="problemFormulation_saveHide btn btn-info">Gem og luk</span>';  // <-----   NOT NEEDED AS OF 06-04-2016 
	HTML += '<span class="problemFormulation_saveHide btn btn-info">Gem</span>';
	HTML += '<div class="Clear"></div>';
	


	UserMsgBox("body", HTML);
	console.log('problemFormulationBtn - hasBeenExecBool: ' + hasBeenExecBool);
	if (hasBeenExecBool) {  // If the nagging box is activated...
		$(".MsgBox_bgr").fadeOut(0);
		$(".MsgBox_bgr").delay(750).fadeIn(200);
	} else {   // If the student presses the problemFormulationBtn...
		$(".MsgBox_bgr").fadeOut(0);
		$(".MsgBox_bgr").delay(200).fadeIn(200);
	}

	$('#UserMsgBox').unbind('click');
	$('.MsgBox_bgr').unbind('click');

	// SPECIAL STUDENT MESSAGES
	console.log('problemFormulationBtn - jsonData: ' + JSON.stringify(jsonData));
	if (jsonData.currentStep == 1) {
		console.log('problemFormulationBtn - ADD');
		HTML = 'Gennem hele øvelsen kan du rette i din problemformulering ved at klikke på ';
		HTML += '<div style="margin-bottom: 0px;">';
		HTML += 	'<span class="btn btn-sm btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET DIN PROBLEMFORMULERING </span>';
		HTML += '</div>';
		HTML += 'Nu skal du i gang med at skrive din første idé til en problemformulering:';
		$('#textInputProblemFormulation').before(HTML);
		$('#textInputProblemFormulation').prop('placeholder','Skriv dit første udkast til din problemformulering her.');
	}

	if (jsonData.currentStep == 3) {
		$('#textInputProblemFormulation').prop('placeholder','Gå igang med at formulere dit hovedspørgsmål her - i løse træk.');
	}

	// MAKE ANIAMTIONS
	if (!$(this).hasClass('keyProblems')){  // keyProblems has problemFormulationBtn, why this exception has been added...
		// window.cssObj = $(this).css(['padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'font-size']);
		// console.log('problemFormulationBtn - cssObj: ' + JSON.stringify(cssObj));
		// window.cssObjZero = {}; window.cssObjXL = {};
		// var objKeys = Object.keys(cssObj);
		// for (var n in objKeys){
		// 	var size1 = parseInt(cssObj[objKeys[n]].replace('px', ''));
		// 	var size2 = Math.ceil(parseInt(cssObj[objKeys[n]].replace('px', ''))*1.1);
		// 	console.log('problemFormulationBtn - objKeys['+n+']: ' + objKeys[n] + ', size1: ' + size1 + ', size2: ' + size2);
		// 	cssObjZero[objKeys[n]] = '0px';
		// 	cssObjXL[objKeys[n]] = size2+'px';
		// }
		
		// $(this).animate(cssObjZero, 300, function() {
		// 	$(this).hide();
		// });

		setCssObj(this);
		hideCssObj(this);
	}
	

	// ADD DATASTRUCTURE
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	if (!JS.hasOwnProperty('problemFormulationMem')){
		JS.problemFormulationMem = [];
	}
	window.problemFormulationMemNum = JS.problemFormulationMem.length-1;

	console.log('problemFormulationBtn - problemFormulationMem: ' + JS.problemFormulationMem);

	// if (problemFormulationMemNum > 0){
		var lastText = JS.problemFormulationMem[problemFormulationMemNum];
		console.log('problemFormulationBtn - lastText: ' + lastText);
		$('#textInputProblemFormulation').val(lastText);
	// }
	
	// showHideNavbtns();
});

// Functionality for the UserMsgBox containing the "Problem Formulation".
$( document ).on('click', ".problemFormulation_goBack", function(event){	// <-----   NOT NEEDED AS OF 06-04-2016 
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	console.log('problemFormulation_goBack - problemFormulationMem: ' + JS.problemFormulationMem);
	console.log('problemFormulation_goBack - problemFormulationMemNum 1: ' + problemFormulationMemNum);
	if ((0 < problemFormulationMemNum) && (problemFormulationMemNum <= JS.problemFormulationMem.length)){
		--problemFormulationMemNum;
		console.log('problemFormulation_goBack - problemFormulationMemNum 2: ' + problemFormulationMemNum);
		$('#textInputProblemFormulation').val(JS.problemFormulationMem[problemFormulationMemNum]);
		// showHideNavbtns();
	}


	// var textInputProblemFormulation = $('#textInputProblemFormulation').val();
	// if ((textInputProblemFormulation.length > 0) && (JS.problemFormulationMem.length == problemFormulationMemNum)){   //  (JS.problemFormulationMem.length-1 == problemFormulationMemNum)
	// 	saveProblemFormulation();
	// 	showHideNavbtns();
	// }	
});

// Functionality for the UserMsgBox containing the "Problem Formulation".
$( document ).on('click', ".problemFormulation_goOn", function(event){		// <-----   NOT NEEDED AS OF 06-04-2016 
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	console.log('problemFormulation_goOn - problemFormulationMem: ' + JS.problemFormulationMem);
	console.log('problemFormulation_goOn - problemFormulationMemNum 1: ' + problemFormulationMemNum);
	if ((0 <= problemFormulationMemNum) && (problemFormulationMemNum < JS.problemFormulationMem.length-1)){
		++problemFormulationMemNum;
		console.log('problemFormulation_goOn - problemFormulationMemNum 2: ' + problemFormulationMemNum);
		$('#textInputProblemFormulation').val(JS.problemFormulationMem[problemFormulationMemNum]);
		// showHideNavbtns();
	}
});

// Functionality for the UserMsgBox containing the "Problem Formulation".
$( document ).on('click', ".problemFormulation_saveHide", function(event){
	// var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	// var textInputProblemFormulation = $('#textInputProblemFormulation').val();
	// console.log('problemFormulation_saveHide - textInputProblemFormulation: ' + textInputProblemFormulation);
	// console.log('problemFormulation_goOn - problemFormulationMem 1: ' + JS.problemFormulationMem);
	// if (textInputProblemFormulation.length > 0)	{
	// 	JS.problemFormulationMem.push(textInputProblemFormulation);
	// }

	console.log('problemFormulation_saveHide - CLICKED');

	if (typeof(insertMasterExampleActive) === 'undefined'){
		window.insertMasterExampleActive = false;
	}
	console.log("problemFormulation_saveHide - insertMasterExampleActive: " + insertMasterExampleActive);

	saveProblemFormulation();

	// if (hasBeenExecBool){  // hasBeenExecBool is set to true ine step 3 and 4.
	if ((hasBeenExecBool) && (problemFormulationBtn_pressed)) {  // hasBeenExecBool is set to true ine step 3 and 4.
		if (!$(".problemFormulationBtn").hasClass('keyProblems')){
 			$('.problemFormulationBtn').hide();
 		}
	}

	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	console.log('problemFormulation_saveHide - problemFormulationMem 2: ' + JS.problemFormulationMem);
	$(".MsgBox_bgr").fadeOut(200, function() {
	    $(this).remove();
	    if ((!$(".problemFormulationBtn").hasClass('keyProblems')) && (!insertMasterExampleActive)){  // keyProblems has problemFormulationBtn, why this exception has been added...
	    	console.log('problemFormulation_saveHide - animate 1');
	    	$(".problemFormulationBtn").show().animate(cssObjXL, 300).animate(cssObj, 300);
	    }

	    if ((jsonData.currentStep == 1) && (!insertMasterExampleActive)){  // keyProblems has problemFormulationBtn, why this exception has been added...
	    	console.log('problemFormulation_saveHide - animate 2');
	    	$(".problemFormulationBtnWrap .problemFormulationBtn").show().animate(cssObjXL, 300).animate(cssObj, 300);
	    }

	    console.log("UserMsgbox - problemFormulation_saveHide - jsonData.currentStep: " + jsonData.currentStep + ", hasBeenExecBool: " + hasBeenExecBool);
	 	// if ((hasBeenExecBool) && ((jsonData.currentStep != 3) || (jsonData.currentStep != 4))) {  // hasBeenExecBool is set to true ine step 3 and 4.
	 	if (hasBeenExecBool) { 
	 		$( document ).trigger( "dynamicTextEvent", [{testdata: 'problemFormulation_saveHide'}] );
		}
	});

	insertMasterExampleActive = false;
});

// Functionality for the UserMsgBox containing the "Problem Formulation".
$( document ).on('click', ".CloseClass", function(event){

	console.log('CloseClass - CLICKED');

	if (typeof(insertMasterExampleActive) === 'undefined'){
		window.insertMasterExampleActive = false;
	}
	console.log("CloseClass - insertMasterExampleActive 2: " + insertMasterExampleActive);

	if ((hasBeenExecBool) && (problemFormulationBtn_pressed)) {  // hasBeenExecBool is set to true ine step 3 and 4.
		if (!$(".problemFormulationBtn").hasClass('keyProblems')){
 			$('.problemFormulationBtn').hide();
 		}
	}

	$(".MsgBox_bgr").fadeOut(200, function() {
	    $(this).remove();
	    	
	    $(".problemFormulationBtnWrap .problemFormulationBtn").show().animate(cssObjXL, 300).animate(cssObj, 300);

	    console.log("UserMsgbox - CloseClass - jsonData.currentStep: " + jsonData.currentStep + ", hasBeenExecBool: " + hasBeenExecBool);
	    // if ((hasBeenExecBool) && ((jsonData.currentStep != 3) && (jsonData.currentStep != 4))) { 	// hasBeenExecBool is set to true ine step 3 and 4.
	    if (hasBeenExecBool) { 
	 		$( document ).trigger( "dynamicTextEvent", [{testdata: 'CloseClass'}] );
		}
	});

	
});


$( document ).on('mousedown', ".btn", function(event){ // This prevents the problemFormulationBtn to hide in step 3 and 4
	window.problemFormulationBtn_pressed = ($(this).hasClass('problemFormulationBtn'))? true : false;
});


// Functionality for the UserMsgBox containing the "Problem Formulation".
$(document).on('change', '#Dropdown1', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var textInputTheme = $('#Dropdown1').val();
	console.log("textInputTheme - textInputTheme: " + textInputTheme);
	$('#textInputProblemFormulation').val(textInputTheme);
});


$( document ).on('click', "#step_3_goBack", function(event){
	step_2_template();
	// setJsAudioEventLitsner2();  // Commented out 11/4-2016
	// $(".studentTheme").focus();  // Sets the focus in the inputfield when the template loades.
});


$( document ).on('click', "#step_3_goOn", function(event){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];

	// taxonomyEdit_2();
	taxonomyEdit_3();

	var TextTheme = htmlEntities($('#textInputTheme').val());

	// TextTheme = 'TEST'; // <--------------------------------   VIGTIGT: FIND UD AF HVILKET MINIMUMSKRAV FAGREDAKTØRENE HAR TIL DETTE SKRIDT!!!
	
	if ((JS.taxonomyObj.describe.length >= 2) && (JS.taxonomyObj.analyse.length >= 2) && (JS.taxonomyObj.assess.length >= 2)){

		ajustMarkedThemes(); 

		JS.taxonomyObj_old = JSON.parse(JSON.stringify(JS.taxonomyObj)); // Make a copy 
		console.log("step_3_goOn - taxonomyObj: " + JSON.stringify(JS.taxonomyObj) + "\ntaxonomyObj_old: " + JSON.stringify(JS.taxonomyObj_old)); 

		// JS.taxonomyObj_mark = objectfyThemes();  // <------- taxonomyObj_mark NOT IN USE 02-06-2016
	
		step_4_template();
		
	} else {
		UserMsgBox("body", '<h4>OBS</h4> Du skal som minimum skrive to spørgsmål til hvert niveau.');
	}
});


function ajustMarkedThemes(){  // <---- This function ajust the marked themes in step 4 if changes has been made to the themes.

	var count = 0;
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var TSortableOrderArray = [];
	if (typeof(JS.markedThemes) !== 'undefined') {  // If the user has marked themes AND been at step 5 and gone back to this step, then...
		var TmarkedThemes = [];
		console.log("ajustMarkedThemes - taxonomyObj 1: " + JSON.stringify(JS.taxonomyObj) + "\ntaxonomyObj_old 1: " + JSON.stringify(JS.taxonomyObj_old)); 
		var taxonomyObjkey = Object.keys(JS.taxonomyObj);
		for (var k in taxonomyObjkey) { 
			var key = taxonomyObjkey[k];
			console.log('objectfyThemes - k: ' + k + ', key: ' + key);
			for (var t in JS.taxonomyObj[key]) { 
				// if (elementInArray(JS.markedThemes, count)) { // If the index "count" is in markedThemes, then we might need to remove it...
				// 	if (typeof(JS.taxonomyObj_old[key][t]) !== 'undefined') { 
				// 		if (!elementInArray(JS.taxonomyObj_old[key], JS.taxonomyObj[key][t])){ // If the new value is NOT a mamber of the old array, then we need to remove the index:
				// 			JS.markedThemes = removeElementIfExist(JS.markedThemes, count);
				// 		} else {
				// 			// var index = returnElementNumInArray(JS.taxonomyObj_old[key], JS.taxonomyObj[key][t]);
				// 			// var index = returnElementNumInArray(JS.SortableOrderArray, JS.taxonomyObj[key][t]);  // SortableOrderArray containes all the values in a sorted manner.
				// 			// TmarkedThemes.push(count);
				// 		}
				// 	} else {  // If the new taxonomyObj does not contain the t value, then the index "count" in markedThemes needs to be removed...
				// 		JS.markedThemes = removeElementIfExist(JS.markedThemes, count);
				// 	}

				// 	// if (elementInArray(JS.taxonomyObj_old[key], JS.taxonomyObj[key][t])){
				// 	// 	var index = returnElementNumInArray(, JS.taxonomyObj[key][t]);  // SortableOrderArray containes all the values in a sorted manner.
				// 	// 	TmarkedThemes.push(index);
				// 	// }
				// }

				TSortableOrderArray.push(JS.taxonomyObj[key][t]);
				++count;
			}
		}
		console.log("ajustMarkedThemes - SortableOrderArray: " + JSON.stringify(JS.SortableOrderArray) + ", TSortableOrderArray: " + JSON.stringify(TSortableOrderArray)); 

		// for (var n in TSortableOrderArray){
		// 	if (elementInArray(JS.SortableOrderArray, TSortableOrderArray[n])) {
		// 		TmarkedThemes.push(n);
		// 	}
		// }

		for (var n in JS.markedThemes){
			if (elementInArray(TSortableOrderArray, JS.SortableOrderArray[JS.markedThemes[n]])) {
				var index = returnElementNumInArray(TSortableOrderArray, JS.SortableOrderArray[JS.markedThemes[n]]);
				TmarkedThemes.push(index);
			}
		}
			
		JS.markedThemes = TmarkedThemes;
	}
} 


function objectfyThemes(){  // NOT IN USE 02-06-2016
	var count = 0;
	var Tobj = {"describe": [], "analyse": [], "assess": []}; 
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var taxonomyObjkey = Object.keys(JS.taxonomyObj);
	for (var k in taxonomyObjkey) { 
		var key = taxonomyObjkey[k];
		console.log('objectfyThemes - k: ' + k + ', key: ' + key);
		for (var t in JS.taxonomyObj[key]) { 
			// var arrLen = JS.taxonomyObj[key].length;
			// Tobj[key][arrLen-t] =  JS.taxonomyObj[key][arrLen-t]
			Tobj[key].push({id: count, val: JS.taxonomyObj[key][t], mark: false, sortNo: count});
			++count;
		}
	}
	console.log('objectfyThemes - taxonomyObj: ' + JSON.stringify(JS.taxonomyObj) + ', Tobj: ' + JSON.stringify(Tobj));
	
	return Tobj;
} 




//////////////////////
//  	STEP 4 		//	
//////////////////////



function step_4_template(){
	console.log("step_4_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_4_template - studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems));
	jsonData.previousStep = jsonData.currentStep;
	jsonData.currentStep = 4;

	window.hasBeenExecBool = false;
	if ((jsonData.previousStep == 3) && (showNaggingBox) && !hasBeenExecOnce("stepCheckArr", jsonData.currentStep)) {
		hasBeenExecBool = true;
		problemFormulationBtn_pressed = true;  // Only for step 3 and 4.
		$( ".problemFormulationBtn" ).trigger( "click" );
	}
	
	osc.save('jsonData', jsonData);

	if ((typeof(DTO) !== 'undefined') && (DTO !== null)){ // Stop dynamic text ecexution.
		DTO.stopExec(0);
		DTO = null;
	}

	// // Set backgroundcolors by inline CSS-style:
	// window.colorObj = {g1: null, g2: null, g3: null, f1: null};
	// $('body').append('<span class="g1 hide"> XXXX </span><span class="g2 hide"> XXXX </span><span class="g3 hide"> XXXX </span><span class="f1 hide"> YYYY </span>');
	// colorObj.g1 = $('.g1').css('background-color');
	// colorObj.g2 = $('.g2').css('background-color');
	// colorObj.g3 = $('.g3').css('background-color');
	// colorObj.f1 = $('.f1').css('background-color');
	// console.log("step_4_template - colorObj: " + JSON.stringify(colorObj));
	setColorObj();

	var stepNo = 4;
	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));

	// // Set backgroundcolors by inline CSS-style:
	// var colorObj = {g1: null, g2: null, g3: null, f1: null};
	// $('body').append('<span class="g1 hide"> XXXX </span><span class="g2 hide"> XXXX </span><span class="g3 hide"> XXXX </span><span class="f1 hide"> YYYY </span>');
	// colorObj.g3 = $('.g1').css('background-color');
	// colorObj.g3 = $('.g2').css('background-color');
	// colorObj.g3 = $('.g3').css('background-color');
	// colorObj.f1 = $('.f1').css('background-color');
	// console.log("step_4_template - colorObj: " + JSON.stringify(colorObj));

	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	// console.log("step_4_template - JS.taxonomyObjArray: " + JSON.stringify(JS.taxonomyObjArray));

	var TSortableOrderArray = [];
	var SortableOrderArray_is_new = false;
	if (!JS.hasOwnProperty('SortableOrderArray')){
		JS.SortableOrderArray = [];
		SortableOrderIndexArray = [];
		SortableOrderArray_is_new = true;
	}

	console.log('step_4_template - ARRAY - jsonData.previousStep : ' + jsonData.previousStep);
	console.log("step_4_template - ARRAY - SortableOrderArray 1: " + JSON.stringify(JS.SortableOrderArray + ", SortableOrderArray.length: " + JS.SortableOrderArray.length));
	console.log("step_4_template - ARRAY - SortableOrderArray_is_new: " + SortableOrderArray_is_new);
	
	var HTML = '';
	HTML += '<div id="step_4" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_4" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction('Nu skal du sortere i alle dine spørgsmål. Træk sætningerne op eller ned og leg med deres rækkefølge og sammenhæng. Vælg de bedste spørgsmål ud ved at klikke på stjerneikonet. <span id="dynamicText"></span><span class="cursor">|</span>' + insertMasterExample()):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	
	HTML += 			'<div class="problemFormulationBtnWrap">';
	// HTML += 					'<span class="problemFormulationBtn btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET PROBLEMFORMULERING</span><span class="masterStudentBtn btn btn-info"><span class="glyphicons glyphicons-eye-open"></span>EKSEMPEL: SORTER UNDERSPØRGSMÅL</span>';
	HTML += 					'<span class="problemFormulationBtn btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET DIN PROBLEMFORMULERING</span>';
	HTML += 			'</div>';

	HTML += 			'<div id="subjectSentenceSortableContainer" class="btnActions">';

	window.barHeight = jsonData.numOfSubQuestions - 1; 
	console.log('step_4_template - jsonData.numOfSubQuestions: ' + jsonData.numOfSubQuestions + ', barHeight: ' + barHeight + ', typeof(barHeight): ' + typeof(barHeight));

	// var count = 0;
	// for (var n in JS.taxonomyObjArray) { 
	// 	var taxonomyObjkey = Object.keys(JS.taxonomyObjArray[n]);
	// 	for (var k in taxonomyObjkey) { 
	// 		var key = taxonomyObjkey[k];
	// 		if (key != 'studentSelectedTheme'){ // studentSelectedTheme has to be ignored...
	// 			for (var t in JS.taxonomyObjArray[n][key]) { 
	// 				var arrLen = JS.taxonomyObjArray[n][key].length-1;
	// 				// HTML += '<div id="Sort_'+count+'" data-address="{n:'+n+',key:'+key+',t:'+t+'}" class="taxonomy Sortable sortable_text_container">'+JS.taxonomyObjArray[n][key][arrLen-t]+'</div>';
	// 				// HTML += '<div style="background-color:'+((count <= barHeight)? colorObj.g3 : colorObj.f1)+'" id="Sort_'+count+'" data-address="{_n_:'+n+',_key_:_'+key+'_,_t_:'+t+'}" class="taxonomy Sortable sortable_text_container">'+JS.taxonomyObjArray[n][key][arrLen-t]+'</div>';
	// 				// HTML += '<div id="Sort_'+count+'" data-address="{_n_:'+n+',_key_:_'+key+'_,_t_:'+t+'}" class="taxonomy Sortable sortable_text_container">'+((SortableOrderArray_is_new || jsonData.previousStep == 3)? JS.taxonomyObjArray[n][key][arrLen-t] : JS.SortableOrderArray[count] )+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>';  // <---- OLD 4/5-2016
	// 				HTML += '<div id="Sort_'+count+'" data-address="{_n_:'+n+',_key_:_'+key+'_,_t_:'+t+'}" class="taxonomy Sortable sortable_text_container">'+((SortableOrderArray_is_new || jsonData.previousStep == 3)? JS.taxonomyObjArray[n][key][t] : JS.SortableOrderArray[count] )+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>';            // <---- NEW 4/5-2016
	// 				// HTML += (count == barHeight)? '<div id="barHeight">----------------------------------</div>' : '';
	// 				// JS.SortableOrderArray.push(JS.taxonomyObjArray[n][key][arrLen-t]);  															// <------ OLD! 
	// 				TSortableOrderArray.push(((SortableOrderArray_is_new || jsonData.previousStep == 3)? JS.taxonomyObjArray[n][key][arrLen-t] : JS.SortableOrderArray[count] ));	// <------ NEW!
	// 				++count;
	// 			}
	// 		}
	// 	}
	// }

	console.log('step_4_template - taxonomyObjkey: ' + taxonomyObjkey);

	var count = 0;
	var taxonomyObjkey = Object.keys(JS.taxonomyObj);
	console.log('step_4_template - taxonomyObjkey: ' + taxonomyObjkey);
	for (var k in taxonomyObjkey) { 
		var key = taxonomyObjkey[k];
		console.log('step_4_template - k: ' + k + ', key: ' + key);
		for (var t in JS.taxonomyObj[key]) { 
			var arrLen = JS.taxonomyObj[key].length;
			
			// HTML += '<div id="Sort_'+count+'" data-address="{_n_:'+n+',_key_:_'+key+'_,_t_:'+t+'}" class="taxonomy Sortable sortable_text_container">'+((SortableOrderArray_is_new || jsonData.previousStep == 3)? JS.taxonomyObj[key][t] : JS.SortableOrderArray[count] )+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>';            // <---- NEW 4/5-2016

			// HTML += '<div id="Sort_'+count+'" style="background-color:'+colorObj['g'+String(3-k)]+'" class="markStar Sortable sortable_text_container">'+((SortableOrderArray_is_new || jsonData.previousStep == 3)? JS.taxonomyObj[key][t] : JS.SortableOrderArray[count] )+'<span class="contentMark glyphicon '+(((JS.hasOwnProperty('markedThemes')) && (elementInArray(JS.markedThemes, count)))?'glyphicon-star':'glyphicon-star-empty')+'"></span></div>';            // <---- NEW 23/5-2016
			HTML += '<div id="Sort_'+((SortableOrderArray_is_new || jsonData.previousStep == 3)? count : JS.SortableOrderIndexArray[count])+'" style="background-color:'+
					((SortableOrderArray_is_new || jsonData.previousStep == 3)? colorObj['g'+String(3-k)] : returnSavedColor(count) )+
					'" class="markStar Sortable sortable_text_container">'+
					// '" class="markStar taxonomy Sortable sortable_text_container">'+
					((SortableOrderArray_is_new || jsonData.previousStep == 3)? JS.taxonomyObj[key][t] : JS.SortableOrderArray[count] )+
					'<span class="contentMark glyphicon '+(((JS.hasOwnProperty('markedThemes')) && (elementInArray(JS.markedThemes, count)))?'glyphicon-star':'glyphicon-star-empty')+'"></span></div>';            // <---- NEW 24/5-2016

			TSortableOrderArray.push(((SortableOrderArray_is_new || jsonData.previousStep == 3)? JS.taxonomyObj[key][arrLen-t] : JS.SortableOrderArray[count] ));	// <------ NEW!
			++count;
		}
	}

	// JS.SortableOrderArray = TSortableOrderArray;					   // Commented out 09-06-2016.
	JS.SortableOrderArray = removeEmptyElements(TSortableOrderArray);  // Added 09-06-2016. This has been added to remove empty elements (seen as null with command=printAll when errorLogClass is used)

	console.log("step_4_template - ARRAY - SortableOrderArray 2: " + JSON.stringify(JS.SortableOrderArray + ", SortableOrderArray.length: " + JS.SortableOrderArray.length)); 

			// for (var n in JS.taxonomyObjArray[tabBody_index][taxonomyObjKey]) {
			// 	HTML += 	'<div id="Sort_"'+n+' class="Sortable sortable_text_container">'+JSNS[n]+'</div>';
			// }

	HTML += 			'</div>';

	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 4 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);

	// setJsAudioEventLitsner2();

	makeSortable();

	// colorSubQuestions();   // <----- COMMENTED OUT 23-05-2016

	addDragAndMarkCallOut();

	// replaceWildcardsInCmdObj(jsonData.steps[stepNo].instruction);

	// window.DTO = Object.create(dynamicTextClass); 
	// DTO.init('#dynamicText', jsonData.steps[stepNo].instruction);

	if (!hasBeenExecBool) {
		$( document ).trigger( "dynamicTextEvent", [{testdata: hasBeenExecBool}] );
	}

	// var scroll = $( ".container-fluid" ).scrollTop( 0 );
	// console.log('step_4_template - scroll: ' + scroll);
	window.scrollTo(0, 0);
}


function makeSortable() {
	// Sort function are placed here due to readiness issues of the DOM:
	$( "#subjectSentenceSortableContainer" ).sortable({
		axis: 'y',
		sortAnimateDuration: 500,
	    sortAnimate: true,
	    distance: 25,
	    update: function(event, ui) {
	    	console.log('makeSortable - UPDATE');
	    	updateSortableOrderArray(2);
	    	updateSortableOrderIndexArray(2);
	    	// $( "#subjectSentenceSortableContainer" ).sortable( "refresh" );  // "Refresh" anvende ikke således.
	    	// repositionBarHeight();
	    	// colorSubQuestions();   // <----- COMMENTED OUT 23-05-2016
	    },
	    start: function(event, ui) {
	    	console.log('makeSortable - START');
	        console.log('makeSortable - ui.item.index: ' + ui.item.index());
	    },
	    stop: function(event, ui) {
	        console.log('makeSortable - STOP');
	    }
	});
}


function returnSavedColor(index) {
	console.log('returnSavedColor - CALLED');
	// console.log("returnSavedColor - studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems));
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var count = 0;
	var taxonomyObjkey = Object.keys(JS.taxonomyObj);
	var sortedIndex = JS.SortableOrderIndexArray[index];
	console.log('returnSavedColor - taxonomyObjkey: ' + taxonomyObjkey);
	var totLen = 0;
	var count = 0;
	for (var k in taxonomyObjkey) { 
		var key = taxonomyObjkey[k];
		totLen += JS.taxonomyObj[key].length;
		console.log('returnSavedColor - k: ' + k + ', key: ' + key + ', count: ' + count + ', totLen: ' + totLen);
		if (sortedIndex < totLen){
			return colorObj['g'+String(3-count)];
		}
		++count;
	}
}


function colorSubQuestions(){ // Set backgroundcolors by inline CSS-style:
	if (typeof(colorObj) === 'undefined'){
		// window.colorObj = {g1: null, g2: null, g3: null, f1: null, none: null};
		// $('body').append('<span class="g1 hide"> &nbsp; </span><span class="g2 hide"> &nbsp; </span><span class="g3 hide"> &nbsp; </span><span class="f1 hide"> &nbsp; </span> <span id="noColor" class="sortable_text_container hide"> &nbsp; </span>');
		// colorObj.g1 = $('.g1').css('background-color');
		// colorObj.g2 = $('.g2').css('background-color');
		// colorObj.g3 = $('.g3').css('background-color');
		// colorObj.f1 = $('.f1').css('background-color');
		// colorObj.none = $('#noColor').css('background-color');
		// console.log("colorSubQuestions - colorObj: " + JSON.stringify(colorObj));
		setColorObj();
	}
	var numOfSubQuestions = $('#subjectSentenceSortableContainer div').length;
	console.log("colorSubQuestions - jsonData.numOfSubQuestions: " + jsonData.numOfSubQuestions);
	$( "#subjectSentenceSortableContainer div" ).each(function( index, element ) {
		if (index < jsonData.numOfSubQuestions){
			// $(element).css('background-color',colorObj.g3);    // g3: GREEN COLOR
			$(element).animate({'background-color': colorObj.g3}, 500 );
		} else {
			// $(element).css('background-color',colorObj.f1); // f1: RED COLOR
			// $(element).css('background-color',colorObj.none);  // none: DEFAULT .sortable_text_container COLOR
			$(element).animate({'background-color': colorObj.none}, 500 );
		}
	});	
}


function updateSortableOrderArray(callNo){ 
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	// JS.taxonomyObjArray;
	var SortableOrderArray = [];
	$( ".Sortable" ).each(function( index, element ) {
		SortableOrderArray.push($(element).text());

		// var eds = $(element).attr('data-address');
		// console.log('updateSortableOrderArray - callNo: '+callNo+', eds 1: _' + eds + '_');

		// eds = eds.replace(/_/g, '"'); 
		// console.log('updateSortableOrderArray - callNo: '+callNo+', eds 2: _' + eds + '_');

		// var edo = JSON.parse(eds);
		// // var edo = JSON.parse(eds);
		// console.log('updateSortableOrderArray - callNo: '+callNo+', edo: ' + edo + ', typeof(edo): ' + typeof(edo));
		// console.log('updateSortableOrderArray - callNo: '+callNo+', edo.n: ' + edo.n);

		// IMPORTANT:
		// ========== 
		// The commented out code below makes user-alterations in step 4 data go back to setp 3 data (if the user choose to go back). It has been commented out
		// because this might NOT be desireble due to the "student-progression" philosophy in the other guided writing-apps in Dansk A.
		// It has the following problems, which needs to be fixed: 
		// 	(1) when edited, it does not update the step 3 data (due to the updateSortableOrderArray(1) call and the click-focusout problem).
		//		It updates when sorted (but the sorted order can not be seen in setp 3).
		//  (2) When a div is deleted by editing, the deleted div is still present in step 3.
		// 
		// var arrLen = JS.taxonomyObjArray[edo.n][edo.key].length-1;
		// JS.taxonomyObjArray[edo.n][edo.key][arrLen - edo.t] = $(element).text();
		// console.log('updateSortableOrderArray - callNo: '+callNo+', JS.taxonomyObjArray['+edo.n+']['+edo.key+']['+String(arrLen - edo.t)+']: ' + JS.taxonomyObjArray[edo.n][edo.key][arrLen - edo.t]);

	}); 
	console.log('updateSortableOrderArray - callNo: '+callNo+', SortableOrderArray: ' + JSON.stringify(SortableOrderArray));
	JS.SortableOrderArray = SortableOrderArray;
}


function updateSortableOrderIndexArray(callNo){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var SortableOrderIndexArray = [];
	$( ".Sortable" ).each(function( index, element ) {
		SortableOrderIndexArray.push($(element).prop('id').replace('Sort_', ''));
	}); 
	console.log('updateSortableOrderIndexArray - callNo: '+callNo+', SortableOrderIndexArray: ' + JSON.stringify(SortableOrderIndexArray));
	JS.SortableOrderIndexArray = SortableOrderIndexArray;
}


function updateMarkedThemes(){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var markedArr = [];
	$( ".Sortable" ).each(function( index, element ) {
		if ($(element).children().hasClass('glyphicon-star')){
			// markedArr.push($(element).prop('id').replace('Sort_', ''));
			markedArr.push(index);
		}
	}); 
	console.log('updateSortableOrderIndexArray - markedArr: ' + JSON.stringify(markedArr));
	JS.markedThemes = markedArr;
}


$( document ).on('click', ".markStar", function(event){
	console.log('markStar - click');
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	window.markedArr = (typeof(markedArr) !== 'undefined')? markedArr : (JS.hasOwnProperty('markedThemes')? JS.markedThemes : []);
	if ($(this).children().hasClass('glyphicon-star-empty')){
			console.log('markStar - A0');
			$(this).children().removeClass('glyphicon-star-empty').addClass('glyphicon-star');
			markedArr.push(parseInt($(this).prop('id').replace('Sort_', '')));
		if (markedArr.length > 5){  // <----------------   The maximal number og star-marked subquestions are presently 5!
			console.log('markStar - A1');
			var starIndex = markedArr[0]
			markedArr = markedArr.slice(1,markedArr.length);
			// $(this).children().removeClass('glyphicon-star').addClass('glyphicon-star-empty');  // <--- OLD
			// $('.markStar').eq(starIndex).children().removeClass('glyphicon-star').addClass('glyphicon-star-empty');  // <--- NEW

			console.log('markStar - ID: ' + $(this).parent().prop('id') + ', starIndex: ' + starIndex); // subjectSentenceSortableContainer
			console.log('markStar - Sort_ID: ' + $(this).parent().find('#Sort_'+starIndex).prop('id'));

			$(this).parent().find('#Sort_'+starIndex).children().removeClass('glyphicon-star').addClass('glyphicon-star-empty');    // <--- NEWEST
			// $(this).parent().find('Sort_'+starIndex).children().css('background-color:#F00');    // <--- NEWEST
		}
	} else {
		console.log('markStar - A2');
		$(this).children().removeClass('glyphicon-star').addClass('glyphicon-star-empty');
		markedArr = markedArr.slice(1,markedArr.length);
	}
	console.log('markStar - markedArr: ' + markedArr);
	JS.markedThemes = markedArr;
});


function addDragAndMarkCallOut(){  // <----- EVENT SEQUENCE: mousedown > focusout > click
	console.log('addNotesOnStars - CALLED');
	var HTML = '';
	HTML += '<div class="label label-primary dragCallOut">';
	HTML += 	'<h5>Træk op/ned</h5>';
	HTML += '</div>';
	HTML += '<span class="glyphicon glyphicon-arrow-down dragCallOutArrow"></span>';
	HTML += '<div class="label label-primary markCallOut">';
	HTML += 	'<h5>Marker</h5>';
	HTML += '</div>';
	HTML += '<span class="glyphicon glyphicon-arrow-down markCallOutArrow"></span>';
	// $('.markStar:first-child').after(HTML);
	
	// $('.contentMark:first-child').after(HTML); 
	$('.contentMark').eq(0).after(HTML);
}


function countTaxonomyAndMarkings(){
	console.log('checkCriteriaTaxonomyAndMarkings - CALLED ');
	var colorArr = [String(colorObj.g1),String(colorObj.g2),String(colorObj.g3)];  // g1 = assess, g2 = analyse, g3 = describe
	var taxObj = {"describe": 0, "analyse": 0, "assess": 0};
	$( ".Sortable" ).each(function( index, element ) {
		if ($(element).children().hasClass('glyphicon-star')){
			console.log('countTaxonomyAndMarkings - STAR ');
			if ($(this).css('background-color') == colorArr[0]) ++taxObj.assess;
			if ($(this).css('background-color') == colorArr[1]) ++taxObj.analyse;
			if ($(this).css('background-color') == colorArr[2]) ++taxObj.describe;
		}
	}); 
	console.log('countTaxonomyAndMarkings - taxObj: ' + JSON.stringify(taxObj) );

	return taxObj;
}


$( document ).on('mousedown', ".markStar", function(event){ 
	$('.dragCallOut').fadeOut(500, function() {
        $(this).remove();
    });
	$('.dragCallOutArrow').fadeOut(300, function() {
        $(this).remove();
    });
	$('.markCallOut').fadeOut(500, function() {
        $(this).remove();
    });
	$('.markCallOutArrow').fadeOut(300, function() {
        $(this).remove();
    });
});


$( document ).on('click', "#step_4_goBack", function(event){
	step_3_template();
	// setJsAudioEventLitsner2();  // Commented out 11/4-2016
	// $("#textInputTheme").focus();  // Sets the focus in the textarea when the template loades.
});


$( document ).on('click', "#step_4_goOn", function(event){

	var taxObj = countTaxonomyAndMarkings();

	// if (taxObj.describe + taxObj.analyse + taxObj.assess >= 4){  // The criteria is at least 4 subquestions in total (de to the number between step 5 and 6). 
	if (taxObj.describe + taxObj.analyse + taxObj.assess >= 3){  // As of 06-06-2016 (approved by Mikkel Kryel), the criteria is at least 3 subquestions in total. 

		// if (taxObj.assess + taxObj.analyse > 0){  // The criteria is at least ONE subquestion at a higher level of taxonomy (e.g. "analyse" OR "assessing") 
		if (taxObj.assess > 0){  // As of 06-06-2016 (approved by Mikkel Kryel), the criteria is at least ONE subquestion at the highest level of taxonomy (e.g. "assessing") 

			// All callOuts has to be removed before the following updates are called.
			$('.dragCallOut').remove();
			$('.dragCallOutArrow').remove();
			$('.markCallOut').remove();
			$('.markCallOutArrow').remove();

			updateSortableOrderArray(3);
			updateSortableOrderIndexArray(3);
			updateMarkedThemes();
			step_5_template();

		} else {
			// UserMsgBox("body", '<h4>OBS</h4> Du skal som minimum tilføje en stjerne til andet end redegørende niveau.');
			UserMsgBox("body", '<h4>OBS</h4> Du skal som minimum tilføje en stjerne til et underspørgsmål på et diskuterende/vurderende niveau.');
		}

	} else {
		UserMsgBox("body", '<h4>OBS</h4> Du skal som minimum markere 3 underspørgsmål.');
	}
});



//////////////////////
//  	STEP 5		//	FIND QUOTES IN THE TEXT
//////////////////////

function step_5_template(){
	jsonData.previousStep = jsonData.currentStep;
	jsonData.currentStep = 5;

	// if ((jsonData.previousStep == 4) && (showNaggingBox) && !hasBeenExecOnce("stepCheckArr", jsonData.currentStep)) {
	// 	$( ".problemFormulationBtn" ).trigger( "click" );
	// }

	if ((typeof(DTO) !== 'undefined') && (DTO !== null)){ // Stop dynamic text ecexution.
		DTO.stopExec(0);
		DTO = null;
	}
	
	osc.save('jsonData', jsonData);
	console.log("step_5_template - quoteCount: " + ((typeof(quoteCount) !== 'undefined')?quoteCount:'undefined'));
	console.log("step_5_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_5_template - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];  

	var TsubQuestionArray = [];
	var subQuestionArray_is_new = false;
	if (!JS.hasOwnProperty('subQuestionArray')){
		JS.subQuestionArray = [];
		subQuestionArray_is_new = true;
	}

	console.log('step_4_template - ARRAY - jsonData.previousStep : ' + jsonData.previousStep);
	console.log("step_5_template - ARRAY - SortableOrderArray: " + JSON.stringify(JS.SortableOrderArray + ", SortableOrderArray.length: " + JS.SortableOrderArray.length));
	console.log("step_5_template - ARRAY - subQuestionArray 1: " + JSON.stringify(JS.subQuestionArray + ", subQuestionArray.length: " + JS.subQuestionArray.length));
	console.log("step_5_template - ARRAY - subQuestionArray_is_new: " + subQuestionArray_is_new); 
	
	var stepNo = 5;
	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));
	var HTML = '';
	HTML += '<div id="step_5" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div id="subQuestionContainer" class="col-xs-12 col-md-12">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_5" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	// HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction('<span id="dynamicText"></span><span class="cursor">|</span>' + returnAudioMarkup(stepNo)):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction('<span id="dynamicText"></span><span class="cursor">|</span>'+ insertMasterExample() ):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	// HTML += 			'<div class="problemFormulationBtnWrap">';
	// HTML += 					'<span class="masterStudentBtn btn btn-info"><span class="glyphicons glyphicons-eye-open"></span>EKSEMPEL: PROBLEMFORMULERING - MED UNDERSPØRGSMÅL</span>';
	// HTML += 			'</div>';

						var placeholderText = 'Hvis du endnu ikke har skrevet et udkast til din problemformulering, skal du gøre det her.';
	HTML += 			'<textarea id="textInputProblemFormulation" class="textInput" val="" placeholder="'+placeholderText+'">';
							window.problemFormulationMemNum = JS.problemFormulationMem.length-1;
							console.log('step_5_template - JS.problemFormulationMem: ' + JSON.stringify(JS.problemFormulationMem));
							HTML += (problemFormulationMemNum < 0)? '' : JS.problemFormulationMem[problemFormulationMemNum];
	HTML += 			'</textarea>';

						// for (var i = 0; i < jsonData.numOfSubQuestions; i++) {
						// 	HTML += '<div class="taxonomy subQuestion sortable_text_container">'+((subQuestionArray_is_new || jsonData.previousStep == 4)? JS.SortableOrderArray[i] : JS.subQuestionArray[i] )+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>';	
						// 	TsubQuestionArray.push(((subQuestionArray_is_new || jsonData.previousStep == 4)? JS.SortableOrderArray[i] : JS.subQuestionArray[i] ));
						// }
						// JS.subQuestionArray = TsubQuestionArray;

						var supQuestionNum = (subQuestionArray_is_new || jsonData.previousStep == 4)? JS.markedThemes.length :JS.subQuestionArray.length;
						for (var i = 0; i < supQuestionNum; i++) {
							var index = JS.markedThemes[i];
							HTML += '<div class="taxonomy subQuestion sortable_text_container">'+((subQuestionArray_is_new || jsonData.previousStep == 4)? JS.SortableOrderArray[index] : JS.subQuestionArray[i] )+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>';	
							TsubQuestionArray.push(((subQuestionArray_is_new || jsonData.previousStep == 4)? JS.SortableOrderArray[index] : JS.subQuestionArray[i] ));
						}
						JS.subQuestionArray = TsubQuestionArray;

	HTML += 		'</div>';

	HTML += 	'<span id="addSubQuestion" class="btn btn-info"> <span class="glyphicon glyphicon-plus"></span> Tilføj underspørgsmål </span>';

	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 5 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);

	// setJsAudioEventLitsner2();

	replaceWildcardsInCmdObj(jsonData.steps[stepNo].instruction);

	window.DTO = Object.create(dynamicTextClass); 
	DTO.init('#dynamicText', jsonData.steps[stepNo].instruction);

	window.scrollTo(0, 0);
}


function updateSubQuestionArray(){ 
	var TsubQuestionArray = [];
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	$( ".subQuestion" ).each(function( index, element ) {
		TsubQuestionArray.push($(element).text());
	}); 
	JS.subQuestionArray = TsubQuestionArray;
	console.log('updateSubQuestionArray - subQuestionArray: ' + JSON.stringify(JS.subQuestionArray));
}


$( document ).on('click', "#addSubQuestion", function(event){
	window.subQuestionDefaultText  = "(Klik for at skrive dit nye underspørgsmål)";
	$('#subQuestionContainer').append('<div class="taxonomy subQuestion newSubQuestion sortable_text_container">'+subQuestionDefaultText+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>');
});


$( document ).on('click', ".newSubQuestion", function(event){
	// console.log('newSubQuestion - tagName: ' + $(this).children().children().prop("tagName") + ', id: ' + $(this).children().children().prop("id") + ', class: ' + $(this).children().children().prop("class"));
	// window.newSubQuestionDefaultText = $(this).text();
	if ($(this).has( ".glyphicon-trash" ).length > 0){
		var text = $('.newSubQuestion .taxonomyTextEdit').val().trim();
		if (text == subQuestionDefaultText){
			$('input', this).attr('value', '');
		}
		// $(this).has('input').css( "background-color", "red" );
	}
});

// $( document ).on('focusout', ".newSubQuestion .taxonomyTextEdit", function(event){
// 	var text = $(this).val();
// 	console.log('focusout -x- newSubQuestion - text: _' + text + '_ typeof(text): ' + typeof(text));
// 	if ((typeof(text) === 'undefined') || (text.length == 0)){ //  || (text.length == 0)
// 		console.log('focusout -x- newSubQuestion - TRUE');
//     	$(this).text(subQuestionDefaultText);
//     	// $('.taxonomyTextEdit').unbind('focusout');

//     	var obj = $(this).closest('.newSubQuestion');
//     	console.log('focusout -x- newSubQuestion - tagName: ' + obj.prop("tagName") + ', id: ' + obj.prop("id") + ', class: ' + obj.prop("class"));
//     	// $('.newSubQuestion').text(subQuestionDefaultText);  // <------  GIVER FEJL!!!
//     	obj.html('');
//     	obj.html(subQuestionDefaultText+'XXX <span class="contentEdit glyphicon glyphicon-pencil"></span>');
//     	obj.removeClass('taxonomyEdit').addClass('taxonomy');
//     }
// });

// // This keypress eventhandler listens for the press of the return-key. If a return-key event is encountered the 
// // first empty input-field is found and focus is given to that field.
// $( document ).on('keypress', ".newSubQuestion .taxonomyTextEdit", function(event){
// 	if ( event.which == 13 ) {  // If a press on the return-key is encountered... (NOTE: "13" equals the "return" key)
// 		// event.preventDefault(); // ...prevents the normal action of the return-key.
// 		var text = $(this).val();
// 		console.log('keypress - newSubQuestion - text: _' + text + '_ typeof(text): ' + typeof(text));
// 		if ((typeof(text) === 'undefined') || (text.length == 0)){ //  || (text.length == 0)
// 			console.log('keypress - newSubQuestion - TRUE');
// 	    	$('.newSubQuestion').text(subQuestionDefaultText);
// 	    }
// 	}
// });


$( document ).on('click', "#step_5_goBack", function(event){
	updateSubQuestionArray();
	step_4_template();
});

$( document ).on('click', "#step_5_goOn", function(event){
	var problemFormulation = $('#textInputProblemFormulation').val();
	console.log('step_5_goOn - problemFormulation : ' + problemFormulation);

	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];

	console.log('step_5_goOn - JS.subQuestionArray : ' + JS.subQuestionArray);
	
	if (problemFormulation.length > 0) {

		saveProblemFormulation();
		updateSubQuestionArray();

		if (JS.subQuestionArray.length >= 3){
			// saveProblemFormulation();
			// updateSubQuestionArray();
			
			step_6_template();
		} else {
			UserMsgBox("body", "<h4>OBS</h4> Du skal som minimum skrive 3 underspørgsmål.");
		}

	} else {
		UserMsgBox("body", "<h4>OBS</h4> Du skal skrive en problemformulering, før du kan gå videre.");
	}

});



//////////////////////
//  	STEP 6		//	WRITE TEXTS TO YOUR QUOTES
//////////////////////

function step_6_template(){
	jsonData.previousStep = jsonData.currentStep;
	jsonData.currentStep = 6;

	// if ((jsonData.previousStep == 5) && (showNaggingBox) && !hasBeenExecOnce("stepCheckArr", jsonData.currentStep)) {
	// 	$( ".problemFormulationBtn" ).trigger( "click" );
	// }

	if ((typeof(DTO) !== 'undefined') && (DTO !== null)){ // Stop dynamic text ecexution.
		DTO.stopExec(0);
		DTO = null;
	}
	
	osc.save('jsonData', jsonData);
	console.log("step_6_template - quoteCount: " + ((typeof(quoteCount) !== 'undefined')?quoteCount:'undefined'));
	console.log("step_6_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_6_template - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];  

	var keyProblem = jsonData.keyProblems[JS.selcNo].name;
	
	var stepNo = 6;
	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));
	var HTML = '';
	HTML += '<div id="step_6" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_6" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	// HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction + returnAudioMarkup(stepNo)):'')+'</div><div class="clear"></div>';
	// HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction('<span id="dynamicText"></span><span class="cursor">|</span>'):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="TextAndQuoteContainer">';
			
	// HTML +=				'<span class="Texts btn btn-info" >'+jsonData.texts[JST.textNo].author+': "'+jsonData.texts[JST.textNo].title+'", '+jsonData.texts[JST.textNo].year+'</span>';

	// 1 nøgleproblem
	// 3 emner
	// 4 underspørgsmål
	// 1 problemformulering
	HTML += 				'<div>';
				HTML += 		'<h3>Overordnet emne: <span class="e1 label label-default">' + keyProblem + '</span></h3>';

				// HTML += 		'<h4>Nøgleproblem</h4> ';
				// HTML += 		'<p >'+jsonData.keyProblems[JS.selcNo].name+'</p>';

				// HTML += 		'<h4>Valgte temaer</h4> ';
				// 				for (var n in JS.studentSelectedThemes){
				// HTML += 			'<p>'+jsonData.keyProblems[JS.selcNo].themes[JS.studentSelectedThemes[n]]+'</p>';
				// 				}

				HTML += 		'<h4>Problemformulering</h4> ';

				HTML += 		'<p>'+JS.problemFormulationMem[JS.problemFormulationMem.length - 1]+'</p>';

				HTML += 		'<h4>Underspørgsmål</h4> ';
								for (var n in JS.subQuestionArray){
				HTML += 			'<p>'+JS.subQuestionArray[n]+'</p>';
								}
								
				
	HTML += 				'</div>';

	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 6 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);

	// setJsAudioEventLitsner2();

	// replaceWildcardsInCmdObj(jsonData.steps[stepNo].instruction);

	// window.DTO = Object.create(dynamicTextClass); 
	// DTO.init('#dynamicText', jsonData.steps[stepNo].instruction);

	window.scrollTo(0, 0);
}


$(document).on('change', '#Dropdown1', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var textInputTheme = $('#Dropdown1').val();
	console.log("textInputTheme - textInputTheme: " + textInputTheme);
	$('.textInputQuoteNote').val(textInputTheme);
});


$( document ).on('click', ".quoteNoteBtn", function(event){
	var index = $(this).index();
	console.log("quoteBtn - index: " + index);
	 
	// -----------------------
	console.log("quoteNoteBtn - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	if (!JST.hasOwnProperty('textQuoteNotes')){
		JST.textQuoteNotes = [];
		for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
			JST.textQuoteNotes.push('');
		};
	}

	var sentence = htmlEntities($('#textInput_'+quoteNoteCount).val());
	console.log("quoteNoteBtn - quoteNoteCount: " + quoteNoteCount + ", sentence: " + sentence);
	console.log("quoteNoteBtn - $('#textInput_'+quoteCount).val(): " + $('#textInput_'+quoteNoteCount).val());
	
	if (quoteNoteCount < jsonData.numOfChoosenWords){
		// JSN.subjectTexts_sentences.push(sentence);
		JST.textQuoteNotes[quoteNoteCount] = sentence;
		// step_4_template();
		console.log("quoteBtn - jsonData.studentSelectedProblems 2: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	} 
	// else {
	// 	JST.subjectTexts_sentences[quoteCount] = sentence;
	// 	// step_4b_template();
	// 	console.log("quoteBtn - jsonData.studentSelectedProblems 3: " + JSON.stringify(jsonData.studentSelectedProblems));
	// 	// makeSortable();
	// }

	// -----------------------
	quoteNoteCount = index-1; 
	step_6_template();   // 12-01-2016  <-----------  DATA SKAL GEMMENS HER!!!
	// setJsAudioEventLitsner2();  // Commented out 11/4-2016
	// $(".textInputQuoteNote").focus();  // Sets the focus in the textarea when the template loades.
});


$( document ).on('click', "#step_6_goBack", function(event){
	
	step_5_template();
		
});

$( document ).on('click', "#step_6_download", function(event){
	
	var HTML = wordTemplate();
	// console.log("step_10_download - wordTemplate: " + HTML);
	// UserMsgBox("body", HTML);

	var converted = htmlDocx.asBlob(HTML);
    console.log("step_10_download - converted: " + JSON.stringify(converted));
	saveAs(converted, 'Min analyse.docx');

});


// 1 nøgleproblem 
// 3 emner
// 4 underspørgsmål
// 1 problemformulering
function wordTemplate() {
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var keyProblem = jsonData.keyProblems[JS.selcNo].name;
	var HTML = '';
	HTML += '<!DOCTYPE html>';
	HTML += '<html>';
	HTML += 	'<head>';
	HTML += 	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';  // Fixes issue with danish characters on Internet Explore 
	HTML += 		'<style type="text/css">';
	HTML += 			'body {font-family: arial}';
	HTML += 			'h1 {}';
	HTML += 			'h2 {}';
	HTML += 			'h3 {color: #333}';
	HTML += 			'h4 {color: #56bfc5}';
	HTML += 			'h5 {}';
	HTML += 			'h6 {}';
	HTML += 			'.selected {color: #56bfc5; width: 25%}';
	HTML += 			'p {font-size: 14px; margin-bottom: 5px}';
	HTML += 			'table {width:95%; margin-left:12px}';
	HTML += 			'td {padding:10px 10px 10px 10px}';
	HTML += 			'ol {color: #000}';
	HTML += 			'.checkQuestion{background-color: #acefed; padding: 10px 10px 10px 10px; margin-bottom: 25px}';  // g2
	HTML += 			'.useMaterial{background-color: #d2d4ec; padding: 10px 10px 10px 10px; margin-bottom: 25px}';  // e2
	HTML += 			'.innerSpacer{margin: 10px}';
	HTML +=				'.spacer{}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>';
	HTML += 		'<h1>'+keyProblem+'</h1>';

	HTML += 		'<h3>Problemformulering</h3> ';
	HTML += 		'<p>'+JS.problemFormulationMem[JS.problemFormulationMem.length - 1]+'</p>';

	HTML += 		'<h3>Underspørgsmål</h3> ';
	HTML += 		'<ul>';
					for (var n in JS.subQuestionArray){
	HTML += 			'<li>'+JS.subQuestionArray[n]+'</li>';
					}
	HTML += 		'</ul>';

	HTML += 		'<h3>Tjekspørgsmål til problemformuleringen:</h3> '; 
	HTML += 		'<table class="checkQuestion">';
	HTML += 			'<tr><td><p><b>Rød tråd:</b> Hænger problemformulering og underspørgsmål sammen? Dvs. kan problemformuleringen besvares ved hjælp af underspørgsmålene? Og er der en sammenhæng mellem underspørgsmålene?</p>';
	HTML += 			'<p><b>Taksonomi:</b> Lægger problemformuleringen op til undersøgelse, diskussion og vurdering - dvs. ikke kun til redegørelse?</p>';
	HTML += 			'<p><b>Tværfaglighed:</b> Kan viden fra historie, religion og samfundsfag inddrages i den samlede besvarelse af problemformulering og underspørgsmål?</p></td></tr>';
	HTML += 		'</table>';

	HTML += 		'<div class="spacer">&nbsp;</div>'

	HTML += 		'<table class="useMaterial">';
	HTML += 			'<p><b>Anvendelse af materiale:</b> Til KS-eksamen er det vigtigt, at spørgsmålene også lægger op til at inddrage det udleverede materiale i besvarelsen!</p>';
	HTML += 		'</table>';

	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}



function sortThemesAlphabetically(){  // This function sorts the themes alphabetically
	console.log('sortThemesAlphabetically 1: ' + JSON.stringify(jsonData.keyProblems));
	for (var n in jsonData.keyProblems){
		jsonData.keyProblems[n].themes.sort();
	}
	console.log('sortThemesAlphabetically 2: ' + JSON.stringify(jsonData.keyProblems));
}


//============================================================================================================ 
//      					THE CODE BELOW NEED ONLY TO BE ACTIVE DURING SCREENCAST
//============================================================================================================


// IMPORTANT NOTES:
// ================
// This is code used at screencasts - it neesd to be commented out under normal circumstances!!! 
$(document).on('change', 'textarea', function(){

	if (screenCastMode) {

		window.autoTextActive = true;

		var inputText =  $(this).val().split('(#)');
		console.log('textarea - change - inputText: ' + inputText);

		$(this).val('');
		$(this).attr('placeholder', '');

		$('.cursor').addClass('OLD_cursor').removeClass('cursor'); // "removes" the cursor of old dynamic template texts...

		var HTML = '';
		HTML += '<div id="XdynamicTextContainer">';   										   // <-----------------------  No overlay: Comment out!!!
		// HTML += '<div id="XdynamicTextContainer" class="XdynamicTextContainerClass" contenteditable="true">'; // <-----  No overlay: Unomment!!!
	    HTML += 	'<span id="XdynamicText"></span>';
	    HTML += 	'<span class="cursor">|</span>';
	    HTML += '</div>';
	    $(this).before(HTML);
	    // $(this).remove();                                                                   // <-----------------------  No overlay: Unomment!!!

	    $('#XdynamicTextContainer').css({height: $(this).height()+20, width: $(this).width()+20});   // <-----------------------  No overlay: Comment out!!!

	    if (inputText.length == 1){
	    	var cmdObj = [{"wait": 1000},{"add": inputText[0]}];    // TEST:   Hænger problemformulering og underspørgsmål sammen?
	    } else {
	    	var cmdObj = [{"insert": inputText[0]},{"wait": 1000},{"add": inputText[1]}];  // TEST:   Hænger problemformulering og underspørgsmål sammen? <br><br>(#) Dvs. kan problemformuleringen besvares ved hjælp af underspørgsmålene?
	    }

		window.XDTO = Object.create(dynamicTextClass); 
		XDTO.init('#XdynamicText', cmdObj);

	}
});


// IMPORTANT NOTES:
// ================
// This is code used at screencasts - it neesd to be commented out under normal circumstances!!! 
$(document).on('click', '#XdynamicTextContainer', function(){

	if (screenCastMode) {
	
		var HTML = $('#XdynamicText').html();
		console.log('XdynamicTextContainer - HTML: ' + HTML);

		$(this).next().val(HTML);

		$(this).remove();

	}
});



//====================================================== 
//      local storage test
//======================================================



/*******************************************************
 * 		objectStorageClass documentation
 *******************************************************
 *
 * BASIC USAGE:
 * ============
 *
 *	1.	Initialize a local storage object "lsObj" by using the two commands:
 *
 *			var lsObj = Object.create(objectStorageClass);
 *			lsObj.init("my_local_storage_object_name");
 *
 *		- where "my_local_storage_object_name" is a name of the object of your own choosing.
 *		You always need to initialize a local storage object before you can use any commands like "load", "save", "delete" etc. You only need to
 *		initialize a local storage object (eg. "lsObj") once in your program.
 *
 *	2.	Next, load the name of a PREVIOUSLY stored/saved variable - e.g. "myVarName1":
 *
 *			var myVarName1 = lsObj.load("myVarName1");
 *
 *	3.	If myVarName1 == null, then the student has not made the e-learning exercise before: load your e-learning exercise start-scenario. 
 *		If myVarName1 != null, then the student has made the e-learning exercise before: myVarName1 has whatever value you have stored 
 *		in it from the last/previous "session" - load therefor the appropriate e-learning exercise scenario.
 *
 *	4.	To save a variable like "myVarName1" (do that at a appropriate point in your e-learning exercise), you do:
 *	
 *			lsObj.save("myVarName1", myVarName1);
 *
 *		"myVarName1" is now stored in "my_local_storage_object_name", and can be retrieved by the "load" shown step 2 above. You can save 
 *		as many variables inside "my_local_storage_object_name" as you nedd – you just do: 
 *
 *			lsObj.save("myVarName1", myVarName1);
 *			lsObj.save("myVarName2", myVarName2);
 *				...
 *			lsObj.save("myVarNameN", myVarNameN);
 *
 *	5.	If you need to remove/delete the session, you do:
 *
 *			lsObj.delete():
 *
 *		- which will remove/delete the local storage object "my_local_storage_object_name".
 *
 * AUTOSAVE:
 * =========
 *
 *	1.	Initialize a local storage object "lsObj" by using the two commands:
 *
 *			var lsObj = Object.create(objectStorageClass);
 *			lsObj.init("my_local_storage_object_name");
 *
 *		- where "my_local_storage_object_name" is a name of the object of your own choosing.
 *		You always need to initialize a local storage object before you can use any commands like "load", "save", "delete" etc. You only need to
 *		initialize a local storage object (eg. "lsObj") once in your program.
 *
 *	2.	To start autosaving a variable "myVarName1", you do:
 *			
 *			lsObj.startAutoSave("myVarName1", myVarName1, timeInMilliSec);
 * 		
 *		- where "timeInMilliSec" is the time (in milliseconds) between each saving action of "myVarName1". You can have autosave on as many 
 *		variables as you need - you just do: 
 *
 *			lsObj.startAutoSave("myVarName1", myVarName1, timeInMilliSec_1);
 *			lsObj.startAutoSave("myVarName2", myVarName2, timeInMilliSec2);
 *				...
 *			lsObj.startAutoSave("myVarNameN", myVarNameN, timeInMilliSecN);
 *
 *	3.	If you for some reason need to limit the duration/number of times the startAutoSave-function performs its saving-action on a given 
 *		variable, you do:
 *
 *			lsObj.setAutoSaveMaxCount("myVarName1", maxSaveCount);
 *
 *		- where maxSaveCount is the maximum number of times the startAutoSave-function performs its saving-action.
 *
 *	4.	To stop the startAutoSave-function, you do:
 *
 *			lsObj.stopAutoSave("myVarName1");
 */

var objectStorageClass = {
    // defaultMsg : 'Du har lavet denne øvelse før.',
    localStorageObjName : null, // The name of the storage object.
    localStorageObjData : {timeStamp: null},  // The default storage object.
    init : function(localStorageObjName){
        if(typeof(Storage) !== "undefined"){
        	console.log("objectStorageClass.init - LocalStorage supported!");
            this.localStorageObjName = localStorageObjName;
            this.localStorageObjData.timeStamp = this.setTimeStamp();
            var localStorageObjData =  JSON.parse(localStorage.getItem(this.localStorageObjName));
            console.log("objectStorageClass.init - localStorageObjName: " + this.localStorageObjName + ", localStorageObjData: " + JSON.stringify(localStorageObjData));
        } else {
            console.log("objectStorageClass.init - LocalStorage NOT supported!");
        } 
    },
    save : function(varName, varData) {
        if(typeof(Storage) !== "undefined"){
            console.log("objectStorageClass.save - LocalStorage supported!");

            this.localStorageObjData.timeStamp = this.setTimeStamp();
            console.log('objectStorageClass.save - timeStamp: ' + this.localStorageObjData.timeStamp);

            if (!this.localStorageObjData.hasOwnProperty(varName)) {
            	console.log("objectStorageClass.save - 0");
                this.localStorageObjData[varName] = '';
            } 

            console.log('objectStorageClass.save - varData: '+JSON.stringify(varData));

            console.log("objectStorageClass.save - this.localStorageObjData 1 : " + JSON.stringify(this.localStorageObjData));
            this.localStorageObjData[varName] = varData;
            console.log("objectStorageClass.save - this.localStorageObjData 2 : " + JSON.stringify(this.localStorageObjData));
            console.log("objectStorageClass.save - typeof(this.localStorageObjData): " + typeof(this.localStorageObjData));


            try {
                localStorage.setItem(this.localStorageObjName, JSON.stringify(this.localStorageObjData));
            }

            catch(error) {
                console.log("objectStorageClass.save - LocalStorage error: " + error.message);
            }
            
        } else {
            console.log("objectStorageClass.save - LocalStorage NOT supported!");
        }
    },
    load : function(varName) {
        if(typeof(Storage) !== "undefined"){
        	console.log("objectStorageClass.load - 0");
            var localStorageObjData = JSON.parse(localStorage.getItem(this.localStorageObjName));
            console.log("objectStorageClass.load - localStorageObjName: " + this.localStorageObjName + ", localStorageObjData: " + JSON.stringify(localStorageObjData));
            if (localStorageObjData !== null) {  // If the variable exists, then return it:
            	console.log("objectStorageClass.load - A1");
            	console.log("objectStorageClass.load - typeof(localStorageObjData):" + typeof(localStorageObjData) + 
            		", localStorageObjData.length: " + localStorageObjData.length +
            		", localStorageObjData: " + JSON.stringify(localStorageObjData) + 
            		", localStorageObjData: " + localStorageObjData);

                // this.localStorageObjData = localStorageObjData;  // only needs overwriting when saving.
                if (localStorageObjData.hasOwnProperty(varName)){
                	console.log("objectStorageClass.load - A2");
                    return localStorageObjData[varName];       
                } else {
                	console.log("objectStorageClass.load - A3");
                    return null;
                }   
            } else {
            	console.log("objectStorageClass.load - A4");
            	return null;
            }
        } else {
            console.log("objectStorageClass.load - LocalStorage NOT supported!");
            return null;
        } 
    },
    delete : function(localStorageVarName) {
        if(typeof(Storage) !== "undefined"){
            console.log("objectStorageClass.delete - LocalStorage supported!");
            localStorage.removeItem(localStorageVarName);
        } else {
            console.log("objectStorageClass.delete - LocalStorage NOT supported!");
        }
    },
    exist : function(varName){
        if(typeof(Storage) !== "undefined"){
            console.log("objectStorageClass.exist - LocalStorage supported!");
            var localStorageObjData = JSON.parse(localStorage.getItem(this.localStorageObjName));
            if (localStorageObjData !== null) {
            	console.log("objectStorageClass.exist - this.localStorageObjName exist!!!");
            	console.log('objectStorageClass.exist - typeof(localStorageObjData): '+typeof(localStorageObjData)+', localStorageObjData: '+JSON.stringify(localStorageObjData));
                if (localStorageObjData.hasOwnProperty(varName)) {
	                console.log("objectStorageClass.exist."+varName+" - TRUE ");
	                return true;
	            } else {
	                console.log("objectStorageClass.exist."+varName+" - FALSE ");
	                return false;
	            }
            } else {
                console.log("objectStorageClass.exist - this.localStorageObjName does NOT exist!!!");
                return false;
            }
        } else {
            console.log("objectStorageClass.exist - LocalStorage NOT supported!");
            return false;
        }
    },
    setTimeStamp : function(){
        return new Date().getTime(); 
    },
    getTimeStamp : function(){
        return this.localStorageObjData.timeStamp;
    },
    startAutoSave : function(varName, varData, timeInMilliSec){  // Starts "auto save" of a variable "varName".
    	console.log("objectStorageClass.startAutoSave - localStorageObjData 1: " + JSON.stringify(this.localStorageObjData));
    	if (!this.localStorageObjData.hasOwnProperty('autoSaveTimeIdObj')) {
        	console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj - OK!!");
            this.localStorageObjData.autoSaveTimeIdObj = {};
        } 
        if (!this.localStorageObjData.autoSaveTimeIdObj.hasOwnProperty(varName)) {
        	console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj."+varName+" - OK!");
            this.localStorageObjData.autoSaveTimeIdObj[varName] = {id: 0, saveCount: 0, maxSaveCount : null};  // "maxSaveCount = null" makes it save indefinitely.
        } 
        console.log("objectStorageClass.startAutoSave - jsonData 2: " + JSON.stringify(this.localStorageObjData));
        console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj."+varName+" - START");
        var xthis = this;
        var LSA = this.localStorageObjData.autoSaveTimeIdObj[varName];
    	LSA.id = setInterval(function(){ 
    		xthis.save(varName, varData); 
    		++LSA.saveCount;
    		console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj."+varName+" - SAVE "+ LSA.saveCount);
    		if ((LSA.maxSaveCount !== null) && (LSA.saveCount >= LSA.maxSaveCount)){
    			xthis.stopAutoSave(varName);
    		}
    	}, timeInMilliSec);
    }, 
    stopAutoSave : function(varName){  // Stops "auto save" of a variable "varName".
    	if (this.localStorageObjData.hasOwnProperty('autoSaveTimeIdObj')) {
        	if (this.localStorageObjData.autoSaveTimeIdObj.hasOwnProperty(varName)) {
	        	console.log("objectStorageClass.stopAutoSave - autoSaveTimeIdObj."+varName+" - STOP");
	            clearInterval(this.localStorageObjData.autoSaveTimeIdObj[varName].id);
	        } 
        }
    },
    setAutoSaveMaxCount : function(varName, maxSaveCount){  // Sets the maximum number of times the function startAutoSave saves the variable varName. Set maxSaveCount to null for making it save indefinitely.
    	if (this.localStorageObjData.hasOwnProperty('autoSaveTimeIdObj')) {
        	if (this.localStorageObjData.autoSaveTimeIdObj.hasOwnProperty(varName)) {
	        	console.log("objectStorageClass.setAutoSaveMaxCount - autoSaveTimeIdObj."+varName+".maxSaveCount - SET");
	            this.localStorageObjData.autoSaveTimeIdObj[varName].maxSaveCount = maxSaveCount;
	        } 
        }
    }
}



// VIRKER OK:
// var testJsonObj_2 = {"A": {"A1": 1, "A2": 2, "A3": 3}, "B": {"B1": 1, "B2": 2, "B3": 3}};
// var osc = Object.create(objectStorageClass);
// osc.init('TEST_testJsonObj_2');
// osc.save('testJsonObj_2', testJsonObj_2);
// var testJsonObj = osc.load('A');
// console.log("testJsonObj_2: " + JSON.stringify(testJsonObj));



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  							RUN CODE...
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


detectBootstrapBreakpoints();  // This function call has to be here, due to the use of $(document).ready() and $(window).resize() inside the function.


$(window).on('resize', function() {
	console.log('bootstrapBreakpointSize: '+bootstrapBreakpointSize+', bdv(bootstrapBreakpointSize): ' + bdv(bootstrapBreakpointSize));

	// if (bdv(bootstrapBreakpointSize) < bdv('sm')){ 
	// 	// $('audio').before('<br/>');
	// 	// $('audio').addClass('left');
	// 	$('audio').css('float','left');
	// } else {
	// 	// $('.stepNav br').remove();
	// 	// $('audio').addClass('left');
	// 	$('audio').css('float','right');
	// }
});

$(document).ready(function() {

	sortThemesAlphabetically();  // This sorts the themes alphabetically.

	window.screenCastMode = false;  // If set to true, all textareas will be in screencast mode: e.g. text copied or written will be overlayed in typemode once you focus out of the textarea. 

	window.hasBeenExecBool = false; // Step 3 an 4 onetime runs.

	window.showNaggingBox = true; // If true this shows "the NaggingBox"/problemformulationbox. It is set to false during development.

	returnLastStudentSession(); // This function gives the student the possibility of loading the last "session".

	// setJsAudioEventLitsner2();  // Commented out 11/4-2016   // <------------  Commented out d. 08-04-2016

	// window.DTO = Object.create(dynamicTextClass); 



	//====================================================================================

	console.log("====================  objectStorageClass  ====================");

	window.errSO = Object.create(objectStorageClass);	// Create a new storage object errSO
	errSO.init('errorStorage');  // initialize the new storage object errSO

	window.errObj = Object.create(errorLogClass);
	errObj.initErrorObj(errSO, 'Bugtest af errorLogClass.');  // Use the new storage object errSO to store the error-log-info.
	// errObj.updateErrorObj("a", 1);
	// errObj.updateErrorObj("b", 2);
	// errObj.updateErrorObj("c", 3);
	// console.log('printErrorObj: ' + errObj.printErrorObj());
	// console.log('dumpErrorObj: ' + errObj.dumpErrorObj());

	// errObj.returnUrlPerameters();

	// errObj.saveErrorObj();
	// console.log('loadErrorObj: ' + JSON.stringify(errObj.loadErrorObj()));

	// $('body').append('<span class="testErrorObj btn btn-info">Test errorObj</span> <span class="deleteErrorObj btn btn-info">delete errorObj</span>');

	$( document ).on('click', ".testErrorObj", function(event){
		errObj.updateErrorObj("c", 3);
		console.log('testErrorObj - loadErrorObj: ' + JSON.stringify(errObj.loadErrorObj()));
	});

	$( document ).on('click', ".deleteErrorObj", function(event){
		errObj.deleteErrorObj();
		console.log('deleteErrorObj - loadErrorObj: ' + JSON.stringify(errObj.loadErrorObj()));
	});

	//====================================================================================


	// if (bootstrapBreakpointSize )


	// STEP 5:
	// jsonData = {"headerAndWordTemplateHeader":"Skriv en skønlitterær analyse","texts":[{"author":"Peter Seeberg","title":"Patienten","year":"1962","src":"pdf/Patienten.pdf","themes":["Tema 1a","Tema 2a","Tema 3a","Tema 4a","Tema 5a","Tema 6a"],"textSnippet":"<p>Da lægerne første gang stiftede bekendtskab med min sygdom, beroligede de mig meget in- derligt og erklærede, at et amputeret ben ikke var noget at snakke om i vor tid, hvor prote- serne jo ikke mere var en lidelse, som i træbe- nenes dage, men snarere en lettelse. De love- de mig, at jeg skulle komme til at gå nærmest bedre end før, idet de påstod, at iveren efter at gå igen ville tilføre mig kæmpekræfter. De fik ret. Da jeg først var kommet i gang, gik jeg bedre end nogen sinde, men længe varede det ikke, så dukkede sygdommen, som lægerne nu betegnede som den uhyre sjældne ,,alminde- ligt bortfald” op i det andet ben, der også måtte sættes af. Heller ikke denne gang fornægtede lægekunsten sig. Det viste sig, at jeg gik bedre med to kunstige ben end med to naturlige.</p><p>Derpå havde jeg en kort frist, så dukkede sygdommen op i den højre arm og bredte sig hastigt helt op til skulderen, hvad lægerne badmig om ikke at tage alt for tungt på, for også arme lå det inden for protesekunstens mulig- heder at fremstille bedre end naturen, og snart var jeg da udstyret ikke blot med en, men med to kunstige arme, som var mig til udmærket nyt- te. Ved den højre arm var lægerne nogle dage i et dilemma, for her begyndte syg¬dommen ved albuen, og det faldt dem først ind at bort- save dette led og derpå forbinde de to dele med det kunstige led, men da sygdommen så tog fart, således at det havde været skulderen og hånden, der måtte forbindes, blev denne tanke straks opgivet...</p>"},{"author":"Jonathan Swift","title":"Et beskedent forslag","year":"1729","src":"pdf/test.pdf","themes":["Tema 1b","Tema 2b","Tema 3b","Tema 4b","Tema 5b","Tema 6b"],"textSnippet":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..."},{"author":"Amanda Hertz","title":"Stjernedrengen","year":"1989","src":"pdf/test.pdf","url":"https://www.fyldepennen.dk/tekster/61092/stjernedrengen","themes":["Tema 1c","Tema 2c","Tema 3c","Tema 4c","Tema 5c","Tema 6c"],"textSnippet":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..."},{"author":"Laila Jørgensen","title":"Stormen","year":"2016","src":"pdf/test.pdf","url":"https://www.fyldepennen.dk/tekster/61094/stormen","themes":["Tema 1d","Tema 2d","Tema 3d","Tema 4d","Tema 5d","Tema 6d"],"textSnippet":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..."}],"themes":["Tema 1","Tema 2","Tema 3","Tema 4","Tema 5","Tema 6","Tema 7","Tema 8","Tema 9","Tema 10"],"sentenceStarters_theme":{"id":"Dropdown0","class":"Dropdown","options":[{"value":"Hvis nogen skulle være i tvivl om at det er et problem at ..., så bør man tænke på at ..."},{"value":"Debatten handler om ..."},{"value":"For det første er det vigtigt at huske på ..."},{"value":"Mange mener at ..., men man kan også argumentere for ..."},{"value":"Mit hovedsynspunkt er ..."},{"value":"På den ene side ..., men på den anden side ..."},{"value":"Det er vigtigt at ..., men det er også vigtigt ..."}]},"analyticalFocus":[{"name":"Analytisk fokuspunkt 1","description":"<b>Analytisk fokuspunkt 1</b> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>"},{"name":"Analytisk fokuspunkt 2","description":"<b>Analytisk fokuspunkt 2</b> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>"},{"name":"Analytisk fokuspunkt 3","description":"<b>Analytisk fokuspunkt 3</b> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>"},{"name":"Analytisk fokuspunkt 4","description":"<b>Analytisk fokuspunkt 4</b> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>"},{"name":"Analytisk fokuspunkt 5","description":"<b>Analytisk fokuspunkt 5</b> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>"}],"numOfChoosenWords":3,"sentenceStarters_quoteNote":{"id":"Dropdown1","class":"Dropdown","options":[{"value":"Hvis nogen skulle være i tvivl om at det er et problem at ..., så bør man tænke på at ..."},{"value":"Debatten handler om ..."},{"value":"For det første er det vigtigt at huske på ..."},{"value":"Mange mener at ..., men man kan også argumentere for ..."},{"value":"Mit hovedsynspunkt er ..."},{"value":"På den ene side ..., men på den anden side ..."},{"value":"Det er vigtigt at ..., men det er også vigtigt ..."}]},"sentenceStarters_conclusion":{"id":"Dropdown2","class":"Dropdown","options":[{"value":"Alle kan blive enige om at det er et problem at ... (generel vinkel)"},{"value":"Det er et velkendt standpunkt i debatten om ..., at .... (generel vinkel)"},{"value":"Sidst jeg var i supermarkedet overhørte jeg en samtale omkring ..., hvilket fik mig til at tænke på, at det er et stort problem at vi .... (konkret vinkel)"}]},"sentenceStarters_begin":{"id":"Dropdown3","class":"Dropdown","options":[{"value":"Alle kan blive enige om at det er et problem at ... (generel vinkel)"},{"value":"Det er et velkendt standpunkt i debatten om ..., at .... (generel vinkel)"},{"value":"Sidst jeg var i supermarkedet overhørte jeg en samtale omkring ..., hvilket fik mig til at tænke på, at det er et stort problem at vi .... (konkret vinkel)"}]},"sentenceStarters_end":{"id":"Dropdown4","class":"Dropdown","options":[{"value":"Afslutningsvis kan man sige at ..."},{"value":"Når alt kommer til alt er der meget som taler for at ..."},{"value":"Til sidst vil jeg bare sige at jeg synes at det er totalt for dårligt at ..."}]},"steps":[{"step":0,"header":"(step 0) - Guidet skriveproces","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/_analyse/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) - Guidet skriveproces","instruction":"Vælg den tekst du vil arbejde med (klik og vælg)","audioFiles":[{"name":"audio/_analyse/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) - Guidet skriveproces","instruction":"Vælg et tema til teksten: ","audioFiles":[{"name":"audio/_analyse/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) - Guidet skriveproces","instruction":"Formuler hvad dit tema handler om. Brug evt. sætningsstarterne herunder","audioFiles":[{"name":"audio/_analyse/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) - Guidet skriveproces","instruction":"Vælg analytisk fokuspunkt","audioFiles":[{"name":"audio/_analyse/step_4.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) - Guidet skriveproces","instruction":"Find og indsæt ??? citater fra teksten","audioFiles":[{"name":"audio/_analyse/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) - Guidet skriveproces","instruction":"Forklar dine citater","audioFiles":[{"name":"audio/_analyse/step_6.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) - Guidet skriveproces","instruction":"Skriv ???-1 sætninger, der forbinder dine tekstafsnit","audioFiles":[{"name":"audio/_analyse/step_7.mp3","type":"mpeg"}]},{"step":8,"header":"(step 8) - Guidet skriveproces","instruction":"Skriv et par afsluttende sætninger","audioFiles":[{"name":"audio/_analyse/step_8.mp3","type":"mpeg"}]},{"step":9,"header":"(step 9) - Guidet skriveproces","instruction":"Skriv en overskrift og indledning til din analyse","audioFiles":[{"name":"audio/_analyse/step_9.mp3","type":"mpeg"}]},{"step":10,"header":"(step 10) - Guidet skriveproces","instruction":"Skriv en overskrift og indledning til din analyse","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din skønlitterær analyse.","audioFiles":[{"name":"audio/_analyse/step_10.mp3","type":"mpeg"}]}],"currentStep":5,"autoPlay":true,"studentSelectedProblems":[{"selcNo":2,"selected":true,"subjectTexts":[],"studentTheme":"Tema 2c","TextTheme":"aaaaaa","analyticalFocus":3}],"selectedIndexNum":"0"};
	// step_5_template();

	
	////////////////////////////////////////////
	//  	TEST	
	////////////////////////////////////////////


	// STEP 0:
	// step_0_template();

	// STEP 1:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedProblems":[{"selcNo":"aaa","selected":true,"subjectTexts":[]}]};
	// step_1_template();

	// STEP 2:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedProblems":[{"selcNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"]}],"selectedselcNo":"0"};
	// step_2_template();

	// STEP 3:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedProblems":[{"selcNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7]}],"selectedselcNo":"0"};
	// step_3_template();

	// STEP 4:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedProblems":[{"selcNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"]}],"selectedselcNo":"0"};
	// step_4_template();

	// STEP 4b:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedProblems":[{"selcNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"]}],"selectedselcNo":"0"};
	// step_4b_template();
	// makeSortable(); // VIGTIG: DENNE SKAL VÆRE AKTIV VED TEST (ellers er DOM-elementer ikke tilstæde!)

	// STEP 5:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedProblems":[{"selcNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"]}],"selectedselcNo":"0"};
	// step_5_template();

	// STEP 6:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedProblems":[{"selcNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning"}],"selectedselcNo":"0"};
	// step_6_template();

	// STEP 6b:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedProblems":[{"selcNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning","sentenceStarters_end_text":"afsluttende sætning"}],"selectedselcNo":"0"};
	// step_6b_template();

	// STEP 7:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"value":"Hvis nogen skulle være i tvivl om at det er et problem at ..., så bør man tænke på at ..."},{"value":"Debatten handler om ..."},{"value":"For det første er det vigtigt at huske på ..."},{"value":"Mange mener at ..., men man kan også argumentere for ..."},{"value":"Mit hovedsynspunkt er ..."},{"value":"På den ene side ..., men på den anden side ..."},{"value":"Det er vigtigt at ..., men det er også vigtigt ..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"value":"Alle kan blive enige om at det er et problem at ... (generel vinkel)"},{"value":"Det er et velkendt standpunkt i debatten om ..., at .... (generel vinkel)"},{"value":"Sidst jeg var i supermarkedet overhørte jeg en samtale omkring ..., hvilket fik mig til at tænke på, at det er et stort problem at vi .... (konkret vinkel)"}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"value":"Afslutningsvis kan man sige at ..."},{"value":"Når alt kommer til alt er der meget som taler for at ..."},{"value":"Til sidst vil jeg bare sige at jeg synes at det er totalt for dårligt at ..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"currentStep":0,"studentSelectedProblems":[{"selcNo":"Kvantemekanik","selected":true,"subjectTexts":["Oscillator","Partikel i brønd","Bølgefunktioner","Diffrentialligninger","dualitet","singlet","triplet","Heisenberg","schrödinger"],"subjectTexts_selected":[0,3,7],"subjectTexts_sentences":["Ocillator sætninger","Diffrentialligning sætning","Heisenberg sætning"],"subjectTexts_sentences_2":["Diffrentialligning sætning","Ocillator sætninger","Heisenberg sætning"],"sentenceStarters_begin_text":"Niels Bohr betragtes som en af kvantemekanikkens fædre...","sentenceStarters_end_text":"Kvantemekanikken kan slutteligt siges at være ejendommelig.","studentSubjectTitel":["Kvantemekanikkens elementer"]}],"selectedselcNo":"0"};
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedProblems":[{"selcNo":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning","sentenceStarters_end_text":"afsluttende sætning","studentSubjectTitel":["overskrift"]}],"selectedselcNo":"0"};
	// step_7_template();


	//#####################  DESIGN  #####################


	// step_6_template();

	// step_6b_template();

	// step_7_template();
	
});


errorLogClass = {
	errorObj : {timeStr: null, timeStamp: null, note: null, logArray: []},
	errorObjStorageArray : [],   // This array is stored in loacalStorage and will contain a number of errorObj's: each errorObj is generated each time the e-learning application is reloaded.
	localStorageObj : null,
	initErrorObj : function (localStorageObj, note){
		this.errorObj.timeStamp = this.setTimeStamp();
		this.errorObj.timeStr = this.setTimeStr();
		this.errorObj.note = note;
		this.localStorageObj = localStorageObj;
		this.errorObjStorageArray = (this.loadErrorObj() !== null)?this.loadErrorObj():[]; // If this.loadErrorObj() == null, then the errorObjStorageArray does not exist. 
		this.urlCommandHandler();  // init the urlCommandHandler, eg. listen to URL commands on load.
	},
	saveErrorObj : function(){
		var l = this.errorObjStorageArray.length;
		console.log('saveErrorObj - l: ' + l);
		if (l > 0) { // if there are at least one errorObj in errorObjStorageArray ...
			console.log('saveErrorObj - A1 ');
			if (this.getTimeStamp() == this.errorObjStorageArray[l-1].timeStamp) { // If the timestamps on the last errorObj match current errorObj, then they are identical... 
				console.log('saveErrorObj - A2 ');
				this.errorObjStorageArray[l-1] = this.errorObj;
				console.log('saveErrorObj - this.errorObjStorageArray[l-1]: '+ JSON.stringify(this.errorObjStorageArray[l-1]));
			} else { // 
				this.errorObjStorageArray.push(this.errorObj);
				console.log('saveErrorObj - A3 ');
			}
		} else {  // else errorObjStorageArray is empty - this is the first run...
			console.log('saveErrorObj - A4 ');
			this.errorObjStorageArray.push(this.errorObj);
		}
		this.localStorageObj.save('errorObjStorageArray', this.errorObjStorageArray);  // Save to localStorage
		console.log('saveErrorObj - errorObjStorageArray[l-1]: ' + JSON.stringify(this.errorObjStorageArray[l-1]));
	},
	loadErrorObj : function(){
		return this.localStorageObj.load('errorObjStorageArray');
	},
	deleteErrorObj : function(){
		this.errorObjStorageArray = [];
		this.localStorageObj.delete('errorObjStorageArray');
		this.localStorageObj.save('errorObjStorageArray', this.errorObjStorageArray);  // Save to localStorage
	},
	updateErrorObj : function (varName, varValue) {
		console.log('updateErrorObj - varName: '+ varName + ', varValue: '+ JSON.stringify(varValue));
		this.errorObj.logArray.push({logNo : this.errorObj.logArray.length+1, name: varName, value: JSON.stringify(varValue)});
		console.log('updateErrorObj - this.errorObj.logArray: '+ JSON.stringify(this.errorObj.logArray));  // <---------------- FEJLEN SES HER!!! - FEJLEN ER RETTET!! - JSON.stringify(varValue) var løsningen i linjen foroven
		this.saveErrorObj();
	},
	printErrorObj : function (n) {
		console.log('printErrorObj - errorObjStorageArray.length: '+this.errorObjStorageArray.length);
		var arrayOfObj = (typeof(this.errorObjStorageArray[n]) !== 'undefined')? this.errorObjStorageArray[n].logArray : null;
		arrayOfObj = (typeof(n) === 'undefined')? this.errorObj.logArray : arrayOfObj;
		if (arrayOfObj !== null){
			console.log('printErrorObj - n: '+n+', arrayOfObj: ' + JSON.stringify(arrayOfObj));
			return this.printTable(arrayOfObj);
		} else {
			return null;
		}
	},
	tableStyling: '<style type="text/css"> #eObjs .column{float: left; border: 1px solid #000; margin: 0px 2px 0px 2px; padding: 2px;} #eObjs td {border-width: 1px; padding: 2px; border-style: inset; border-color: #000;} </style>',
	printErrorObjStorageArray : function () {
		var l = this.errorObjStorageArray.length;
		var HTML = this.tableStyling;
		HTML += '<div id="eObjs">';
		HTML += 		'<div>Number of errorObjs: '+l+'</div>';
		for (var n in this.errorObjStorageArray){
			console.log('printErrorObjStorageArray - timeStamp: ' + this.errorObjStorageArray[n].timeStr);
			var t = this.errorObjStorageArray[n].timeStr.split(' ');
			HTML += 		'<div class="column">';
			HTML += 			'<div>'+t[4]+'</div>'+'<div>'+t[1]+' '+t[2]+'</div>'+'<b>n = '+n+'</b>';
			HTML += 			this.printTable(this.errorObjStorageArray[n].logArray);	
								console.log('printErrorObjStorageArray - this.errorObjStorageArray['+n+'].logArray: ' + JSON.stringify(this.errorObjStorageArray[n].logArray));
			HTML += 		'</div>';
		}
		HTML += 		'<div style="clear: both;"></div>';
		HTML += '</div>';
		return HTML;
	},
	printTable : function (arrayOfObj) {  // arrayOfObj = [{},{},{},... ,{}]
		var HTML = '<table>';
		for (var i in arrayOfObj){
			HTML += '<tr>';
			for (var j in arrayOfObj[i]){
				console.log('printTable - i: '+i+', j: ' + j);
				// HTML += '<td>'+JSON.stringify(arrayOfObj[i][j])+'</td>';
				HTML += '<td>'+arrayOfObj[i][j]+'</td>';  // <--- There is no need for JSON.stringify() here, if it is added when the variable is stored in updateErrorObj
			}
			HTML += '</tr>';
		}
		HTML += '</table>';
		return HTML;
	},
	dumpErrorObj : function(){
		return JSON.stringify(this.errorObj, null, 4);
	},
	dumpErrorObjStorageArray : function(){
		return JSON.stringify(this.errorObjStorageArray, null, 4);
	},
    setTimeStamp : function(){
        return new Date().getTime(); 
    },
    getTimeStamp : function(){
        return this.errorObj.timeStamp;
    },
    setTimeStr : function (){  // Converts the timeStamp to the format-example: "Wed Jan 25 2016 15:42:46 GMT+0100 (CET)"
    	var date = new Date(this.errorObj.timeStamp);
		return date.toString(); 
    },
    returnUrlPerameters : function(){
    	this.UlrVarObj = {}; 
	    var UrlVarStr = window.location.search.substring(1);
	    console.log("returnUrlPerameters - UrlVarStr: " + UrlVarStr);
	    var UrlVarPairArray = decodeURIComponent(UrlVarStr).split("&");  // decodeURIComponent handles %26" for the char "&" AND "%3D" for the char "=".
	    console.log("returnUrlPerameters - UrlVarPairArray: " + UrlVarPairArray);
	    for (var i in UrlVarPairArray){
	        var UrlVarSubPairArray = UrlVarPairArray[i].split("=");  // & = %3D
	        if (UrlVarSubPairArray.length == 2){
	            this.UlrVarObj[UrlVarSubPairArray[0]] = UrlVarSubPairArray[1];
	        }
	    }
	    console.log("returnUrlPerameters - UlrVarObj: " + JSON.stringify( this.UlrVarObj ));
	    return this.UlrVarObj;
	},
	urlCommandHandler : function(){
		this.returnUrlPerameters();
		if (this.UlrVarObj.hasOwnProperty('command')){  
			if (this.UlrVarObj.command == 'delete') this.deleteErrorObj();
			if (this.UlrVarObj.command == 'print') {   // EXAMPLES: "?command=print", "?command=print&n=3"
				var l = this.errorObjStorageArray.length;
				var HTML = this.tableStyling;
				HTML += '<div>Number of errorObjs: '+l+'</div>';
				HTML += '<div id="eObjs">';
				if (this.UlrVarObj.hasOwnProperty('n')){ // If a parameter "n" specifying the index number of the n'th errorObj of errorObjStorageArray is supplied...
					if ((0 <= this.UlrVarObj.n) && (this.UlrVarObj.n < l)){
						var t = this.errorObjStorageArray[this.UlrVarObj.n].timeStr.split(' ');
						HTML += '<div>'+t[4]+'</div>'+'<div>'+t[1]+' '+t[2]+'</div>'+'<b>n = '+this.UlrVarObj.n+'</b>';
						HTML += this.printErrorObj(this.UlrVarObj.n);
					}
				} else {  // else no papameter is given - then return the privious errorObj:
					console.log("urlCommandHandler - errorObjStorageArray[l-2].timeStr: " + this.errorObjStorageArray[l-2].timeStr);
					var t = this.errorObjStorageArray[l-2].timeStr.split(' ');
					HTML += 	'<div>'+t[4]+'</div>'+'<div>'+t[1]+' '+t[2]+'</div>'+'<b>n = '+String(l-2)+'</b>';
					HTML +=		this.printErrorObj(l-2); // Load the privious errorObj. Note: since it requires a new reload to load the peramerters in the URL, the l-2 step needs to be loaded.
				}
				HTML += 	'</div>';
				$('body').append(HTML);
			}
			if (this.UlrVarObj.command == 'printAll') {
				var HTML = this.printErrorObjStorageArray();
				$('body').append(HTML);
			}
			if (this.UlrVarObj.command == 'dump'){ 
				var l = this.errorObjStorageArray.length;
				if (this.UlrVarObj.hasOwnProperty('n')){
					if ((0 <= this.UlrVarObj.n) && (this.UlrVarObj.n < l)){
						alert(JSON.stringify(this.errorObjStorageArray[this.UlrVarObj.n], null, 4));
					}
				} else {
					alert(JSON.stringify(this.errorObjStorageArray[l-2], null, 4));
				}
			}
			if (this.UlrVarObj.command == 'dumpAll'){alert(this.dumpErrorObjStorageArray())}
		}
	}
}




// HOW TO USE dynamicTextClass
// ===========================
//
// SETUP:
// ------
// Setup of dynamicTextClass requires two HTML empty span-tags (or div-tags with display: inline) - the first needs the id "dynamicText", 
// and the next the class "cursor":
//
//      <span id="dynamicText"></span><span class="cursor">|</span>
// 
// DEMO:
// -----
// To run a default demo do the following:
//
//      var DTO = Object.create(dynamicTextClass); 
//      DTO.init('#dynamicText');
//
// This will run dynamicTextClass in demo mode, showing the textediting features insert(), add(), cut(), del() and wait().
//
// RUNNING OWN COMMANDS:
// ---------------------
// To run you own text commands do the following:
//
//      var DTO = Object.create(dynamicTextClass); 
//      DTO.init('#dynamicText', you_own_cmdObj);
//
// - where you_own_cmdObj is an array of commands seen in the cmdObj demo below.
//
var dynamicTextClass = {
    delimiter: {begin: "#", end: "#"},  // Not in use yet...
    typeSpeed: 75,     // Time in milliseconds between each keystroke.
    timeout: 0,         // Default time in milliseconds between each command.
    cursorBlink: 300,   // Cursor blink speed.
    cmdObj: [ // This is a small default demo of how to use the dynamicTextClass program.
        {"insert": "Dette er en lille tekst editeringstest. Vi venter 3 sekunder mellem handlinger - dette gøres med kommandoen wait()..."},
        {"wait": 3000},
        {"insert": " Man kan indsætte lidt tekst via kommandoen insert()."},
        {"wait": 3000},
        {"add": " Man kan imitere at der skrives tekst via add(), og man kan slette tekst via del(): bla bla bla bla..."},
        {"wait": 3000},
        {"del": "4w1c"}, // XXw = delete "XX words", YYc = delete "YY chars", XXwYYc = delete "XX words" AND "YY chars".
        {"wait": 3000},
        {"add": ". Man kan også cutte tekst væk via cut(): bla bla bla bla..."},
        {"wait": 3000},
        {"cut": "4w1c"},  // XXw = cut "XX words", YYc = cut "YY chars", XXwYYc = cut "XX words" AND "YY chars".
        {"wait": 1000},
        {"add": " - således."},
        {"wait": 3000},
        {"add": " Dette er enden på denne lille præsentation :-)"},
        {"wait": 3000},
        {"removeCursor": 300}
    ],
    interval : null,
    init : function(){ // ARGUMENTS: 1: tagetSelector, 2: cmdObj (which is optional. If cmdObj is omitted, the default cmdObj above is loaded).
        this.tagetSelector = arguments[0];
        if (typeof(arguments[1]) !== 'undefined') this.cmdObj = arguments[1];

        this.findCmd();             // <-------- IMPORTANT: UNCOMMENT TO ACTIVATE!!!  02-06-2016
        this.startCursorBlink();    // <-------- IMPORTANT: UNCOMMENT TO ACTIVATE!!!  02-06-2016
    },
    add : function(text){   // This method types the text given as argument. The typing speed is given by "typeSpeed".
        console.log('add - CALLED');
        var count = 0;
        var chars = text.split('');
        console.log('add - chars: ' + chars);
        xthis = this;
        this.timeId_add = setInterval(function(){ 
            if (count < chars.length){
                console.log('add - count: ' + count + ', chars['+count+']: ' + chars[count]);
                $(xthis.tagetSelector).append(String(chars[count])); 
                ++count;
            } else {
                console.log('add - clearInterval');
                clearInterval(xthis.timeId_add);         // Clear the "write timer" timeId
                xthis.findCmd();
            }
        }, xthis.typeSpeed);
    },
    insert: function(text){ // This method inserts the text given as argument.
        console.log('insert - CALLED');
        $(this.tagetSelector).append(text);
        this.findCmd(); 
    },
    del : function(cmd){   // This method deletes some text based on the command "cmd": XXw = delete "XX words", YYc = delete "YY chars", XXwYYc = delete "XX words" AND "YY chars". The speed by which text is deleted is given by "typeSpeed".
        console.log('del - CALLED');
        var numOfWords = (cmd.indexOf('w') !== -1)? parseInt(cmd.match(/(\d+)w/)[0].replace('w', '')) : 0;
        var numOfChars = (cmd.indexOf('c') !== -1)? parseInt(cmd.match(/(\d+)c/)[0].replace('c', '')) : 0;
        console.log('del - numOfWords: ' + typeof(numOfWords) + ', numOfChars: ' + typeof(numOfChars));
        var text = $(this.tagetSelector).text();
        var spaceArr = this.helper_spaceIndexes(text).reverse();
        var textlen = text.length;
        var numOfWordChars = (numOfWords == 0)? textlen : spaceArr[numOfWords-1];
        console.log('del - text: ' + text + ', textlen: ' + textlen + ', spaceArr: ' + spaceArr + ', numOfWordChars: ' + numOfWordChars);
        xthis = this;
        var count = 0;
        this.timeId_del = setInterval(function(){ 
            if (count < textlen-numOfWordChars+numOfChars){
                console.log('del - count: ' + count);
                text = text.slice(0,-1);
                $(xthis.tagetSelector).html(text); 
                ++count;
            } else {
                console.log('del - clearInterval');
                clearInterval(xthis.timeId_del);         // First, clear the "write timer" timeId
                xthis.findCmd();
            }
        }, xthis.typeSpeed);
    },
    cut: function(cmd){ // This method cuts away some text based on the command "cmd": XXw = delete "XX words", YYc = delete "YY chars", XXwYYc = delete "XX words" AND "YY chars".
        console.log('cut - CALLED');
        var numOfWords = (cmd.indexOf('w') !== -1)? parseInt(cmd.match(/(\d+)w/)[0].replace('w', '')) : 0;
        var numOfChars = (cmd.indexOf('c') !== -1)? parseInt(cmd.match(/(\d+)c/)[0].replace('c', '')) : 0;
        console.log('cut - numOfWords: ' + typeof(numOfWords) + ', numOfChars: ' + typeof(numOfChars));
        var text = $(this.tagetSelector).text();
        var spaceArr = this.helper_spaceIndexes(text).reverse();
        var textlen = text.length;
        var numOfWordChars = (numOfWords == 0)? textlen : spaceArr[numOfWords-1];
        console.log('cut - text: ' + text + ', textlen: ' + textlen + ', spaceArr: ' + spaceArr + ', numOfWordChars: ' + numOfWordChars);
        text = text.slice(0,-(textlen-numOfWordChars+numOfChars));
        $(this.tagetSelector).html(text);
        this.findCmd(); 
    },
    mark : function(text){  // Not in use yet...
        console.log('mark - CALLED');
    }, 
    wait : function(timeout){  // This method waits a number of milliseconds given by the argument "timeout", before the next command/method is executed.
        console.log('wait - CALLED');
        xthis = this;
        this.timeId_wait = setTimeout(function(){ 
            xthis.findCmd(); 
        }, timeout);
    }, 
    findCmd : function(milliSec){  // This method finds the next command in cmdObj and executes it. 
        console.log('findCmd - CALLED');
        xthis = this;
        this.cmdCount = (typeof(this.cmdCount) === 'undefined')? 0 : this.cmdCount + 1;
        if (this.cmdCount < this.cmdObj.length){
            console.log('findCmd - cmdCount: ' + this.cmdCount + ", Object.keys(this.cmdObj): " + Object.keys(this.cmdObj));
            var cmd = Object.keys(this.cmdObj[this.cmdCount]);
            var arg = this.cmdObj[this.cmdCount][cmd];
            arg = (typeof(arg) === "string")? '"'+arg+'"' : arg;
            console.log('findCmd - eval('+cmd+'('+arg+')'+')');
            eval('this.'+cmd+'('+arg+')');
        }
        console.log('findCmd - cmdCount 2: ' + this.cmdCount);
    },
    startCursorBlink: function() { // This method initiates cursor blink with a "blink speed" given by cursorBlink.
        console.log('startCursorBlink - CALLED');
        var xthis = this;
        this.timeId_cursor = setInterval(function(){
            $('.cursor').fadeOut(xthis.cursorBlink).fadeIn(xthis.cursorBlink);
        }, xthis.cursorBlink*2);
    }, 
    removeCursor: function(fadeTime){ // This method removes the cursor from the application - the speed by which it is removed is determined by "fadeTime".
        console.log('removeCursor - CALLED');
        clearInterval(this.timeId_cursor);
        $('.cursor').fadeOut(fadeTime);
    },
    helper_spaceIndexes: function(str){  // this method is a helper method - it returns an array containing the positions of blank space chars in a string "str" given as argument.
        spaceArr = [];
        var pos = 0; var count = -1;
        while ((str.indexOf(' ', pos) !== -1)) {
            pos = str.indexOf(' ', pos);
            if (pos !== -1) spaceArr.push(pos);
            pos += 1;
        }
        return spaceArr;
    },
    stopExec: function(timeout){ // This method stops the object instantiated from dynamicTextClass. When used, the object instantiated needs to be instantiated again.
        console.log('stopExec - CALLED');
        var xthis = this;
        setTimeout(function(){  // Remove all timers...
            xthis.removeCursor(0);
            clearInterval(xthis.timeId_del);
            clearInterval(xthis.timeId_add);
            clearInterval(xthis.timeId_cursor);
            clearTimeout(xthis.timeId_wait);
        }, timeout);
    }
}

