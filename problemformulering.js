



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

function getSelected(varType){
	for (var n in jsonData.studentSelectedProblems){
    	if (jsonData.studentSelectedProblems[n].selected){
    		if (jsonData.studentSelectedProblems[n].hasOwnProperty(varType)){
    			return jsonData.studentSelectedProblems[n][varType];
    		} else {
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
	var progress = Math.round(stepNo/(jsonData.steps.length-1)*100);
	console.log("returnProgressBar - progress: " + progress + ", jsonData.steps.length: " + jsonData.steps.length);
	var HTML = '';
	HTML += '<div class="row">';
    HTML += 	'<div class="col-xs-12 col-md-12">';
	HTML += 		'<div id="processBarContainer"><div id="processBar" style="width:'+progress+'%;'+((progress==100)?'border-radius: 2px;':'')+'">&nbsp;</div></div> <div id="processVal">'+ String(progress) + '% </div>';
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

		UserMsgBox("body", '<h4>ADVARSEL</h4> <p>Du arbejder på en Mac og bruger browseren Safari. <br> Denne øvelse virker desværre ikke optimalt på Safari-platformen. Du vil ikke kunne downloade wordfilen til sidst i øvelsen.</p><br> <p>Brug i stedet <b>Chrome</b> (<a href="https://www.google.dk/chrome/browser/desktop/">Hent den her</a>) eller <b>Firefox</b>  (<a href="https://www.mozilla.org/da/firefox/new/">Hent den her</a>).</p><br> <p>Mvh <a href="https://www.vucdigital.dk">vucdigital.dk</a> </p>');
		
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



//////////////////////
//  	STEP 0 		//
//////////////////////


function step_0_template(){
	
	console.log("step_0_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 0;
	// jsonData.autoPlay = true;
	// osc.save('jsonData', jsonData);  // Not necessary to save step 0! 
	// osc.exist('jsonData');	// Not necessary to save step 0!
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

	console.log("step_1_template - selcNo: " + selcNo); 
	var HTML = '';
	HTML += '<div id="step_1" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_1" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction + insertMasterExample()):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			'<div id="TextContainer" class="btnActions">';
			var JT = jsonData.keyProblems;
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
	}

	
	if (jsonData.hasOwnProperty("studentSelectedProblems")) {
	 	step_2_template();
	 	// setJsAudioEventLitsner2();  // Commented out 11/4-2016
	} 

});




//////////////////////
//  	STEP 2 		//   // FRA SKRIVEPROCES 1
//////////////////////

function step_2_template(){
	console.log("step_2_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_2_template - studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems));
	jsonData.currentStep = 2;
	osc.save('jsonData', jsonData);

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

    if (!JS.hasOwnProperty("totStudentThemes_selectOrder")){
    	JS.totStudentThemes_selectOrder = [];  // Contains student supplied themes (text) written in the input field
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
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction('Du valgte nøgleproblemet <span class="e1 label label-default">' + keyProblem + '</span> '+ '<span id="dynamicText"></span><span class="cursor">|</span>' + insertMasterExample()):'')+'</div><div class="clear"></div>';	// NEW 17-05-2016
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div class="masterStudentBtnWrap">';
	HTML += 					'<span class="problemFormulationBtn btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET PROBLEMFORMULERING</span>';
	HTML += 			'</div>';

	HTML += 			'<div id="subjectWordContainer" class="btnActions">';


				console.log("step_2_template - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 

				var JT = jsonData.keyProblems[selcNo].themes

				console.log("step_2_template - JT: " + JSON.stringify(JT));

				console.log("step_2_template - elementInArray: " + JSON.stringify(JS.studentSelectedThemes));

				for (var n in JT){
					console.log("step_2_template - n: " + n + ", elementInArray: " + elementInArray(JS.studentSelectedThemes, n));
					HTML += 	'<span class="keyThemes btn btn-'+((elementInArray(JS.studentSelectedThemes, n))?'primary':'info')+'" >'+JT[n]+'</span>';
				}

	HTML += 			'</div>';

	HTML += 			'<div class="stepInput">';
	// HTML += 				'<span class="helperText helperTextInput">Tilføj evt. et ekstra emne:</span>';
								// returnInputBoxes4(numOfBoxes, Class, savedValues, placeholderText)
	// HTML += 					returnInputBoxes4(JS.studentThemes.length, 'keyThemesByStudent', JS.studentThemes, 'skriv tema her...');
	HTML += 					returnInputBoxes4(1, 'keyThemesByStudent', JS.studentThemes, 'Skriv evt. dit eget emne');
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
	DTO.init('#dynamicText', jsonData.steps[stepNo].instruction); 

}


function replaceWildcardsInCmdObj(cmdObj){
	for (var n in cmdObj) {
		console.log("replaceWildcardsInCmdObj - cmdObj["+n+"][Object.keys("+cmdObj[n]+")]: " + cmdObj[n][Object.keys(cmdObj[n])]);
		if (typeof(cmdObj[n][Object.keys(cmdObj[n])]) == "string") { // Only look for wildcards in strings, since replaceWildcard2 return a string...
			cmdObj[n][Object.keys(cmdObj[n])] = replaceWildcard2(cmdObj[n][Object.keys(cmdObj[n])], jsonData.numOfChoosenWords);
		}
	}
}


function insertMasterExample(){
	var HTML = '';
	HTML += '<div class="masterStudentBtnWrap">';
	HTML += 	'<span class="masterStudentBtn btn btn-info"><span class="glyphicons glyphicons-eye-open"></span>EKSEMPEL: UDVÆLG UNDEREMNER</span>';
	HTML += '</div>';
	return HTML;
}


$( document ).on('click', ".masterStudentBtn", function(event){
	var HTML = '';
	HTML += '<h3>Eksempel</h3>';
	// HTML += '<div class="DropdownWrap">';
	// HTML += 	returnDropdownMarkup(jsonData.sentenceStarters_problemFormulation);
	// HTML += '</div>';
	// HTML += '<textarea id="textInputProblemFormulation" class="textInput" val="">';
	// 		// if ((JST.hasOwnProperty('textQuotes')) && (typeof(JST.textQuotes[quoteCount]) !== 'undefined')) {
	// 		// 	HTML += JST.textQuotes[quoteCount];
	// 		// }			
	// HTML += '</textarea>';

	var stepNo = jsonData.currentStep;  // <----------  ORIGINAL LIVE!
	stepNo = 2; 						// <----------  ONLY FOR TEST


	HTML += '<div id="masterStudentTextContainer">&nbsp;</div>';

	HTML += '<audio id="audioPlayer_masterExample" controls="controls" autoplay="autoplay">';
    HTML += 	'<source src="'+jsonData.steps[stepNo].audioFiles+'" type=""/>';
    HTML += 	'Your browser does not support the audio element';
    HTML += '</audio>';

	UserMsgBox("body", HTML);

	var audio = jsonData.steps[stepNo].audioFiles;
		var audioSrc;
		for (var n in audio){
			if (audio[n].type == 'mpeg'){  // We only use mpeg files - this makes the array of objects in jsonData.steps[stepNo].audioFiles obsolete.
				audioSrc = audio[n].name;
				break;
			}
		} 
	var audioObj = document.getElementById("audioPlayer_masterExample");
	audioObj.src = audioSrc;  // When the "src" is set on the audioObj, the player starts to play automatically. This has to be prevented in "pause" has been pressed in a previous step.


	$('#UserMsgBox').unbind('click');
	$('.MsgBox_bgr').unbind('click');

	$('#UserMsgBox').addClass('masterExampleClass');

	var masterEx = jsonData.steps[stepNo].masterEx;

	var pollTimerCount = 0;
	window.pollTimer = setInterval(function() {
		var timetampedWord = returnTimetampedWord(masterEx, audioObj.currentTime, 0.5);
		if (timetampedWord !== false){
			$( "#masterStudentTextContainer" ).animate({"margin-bottom":"1em"}, 
				500, function() {
			    // Animation complete.
			    $( "#masterStudentTextContainer" ).css("margin-bottom","inherit");
			    $('#masterStudentTextContainer').append('<div class="masterExWord" style="display:none;">'+timetampedWord+'</div>');
				$('.masterExWord').fadeIn( 600 );
			});
		}
		console.log("masterStudentBtn pollTimerCount: " + pollTimerCount + ", audioObj.currentTime: " + audioObj.currentTime+ ", typeof(currentTime): " + typeof(audioObj.currentTime));
		++pollTimerCount;
	}, 500);

});



$( document ).on('click', ".masterExampleClass .CloseClass", function(event){
	clearInterval(pollTimer);
	var masterExArr = jsonData.steps[jsonData.currentStep].masterEx;
	for (var n in masterExArr){ // Remove the "done" property, so objects in the masterEx array are reset for "playing" once again...
		delete masterExArr[n].done;
	}
});


function returnTimetampedWord(masterExArr, playerTime, timeTolerance){
	console.log("returnTimetampedWord X");
	for (var n in masterExArr){
		console.log("returnTimetampedWord playerTime: "+playerTime+", masterExArr["+n+"]: " + JSON.stringify(masterExArr[n]));
		if ((!masterExArr[n].hasOwnProperty('done')) && (playerTime - timeTolerance <= masterExArr[n].time) && (masterExArr[n].time < playerTime + timeTolerance)) {
			console.log("returnTimetampedWord - OK");
			masterExArr[n].done = true;  // This ensures that each masterExArr[n].word is only returned once.
			return masterExArr[n].word;
		}
	}
	return false;
}


function keyThemeMaxAmountController() {  // <------   20/4-2016: SKAL TAGE HØJDE FOR SELV INTASTEDE TEMAGER/EMNER OGSÅ!!!!
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];

	// if (typeof(studentThemesIndexes) == "undefined"){
	// 	window.studentThemesIndexes = [];
	// }

	// if ($('.keyThemes').length > JS.originalNumOfThemes + JS.studentThemes.length){
	// 	studentThemesIndexes.push(parseInt(JS.originalNumOfThemes-1) + JS.studentThemes.length);			// <---- NEW
	// }
	// console.log("keyThemeMaxAmountController - studentThemesIndexes: " + JSON.stringify(studentThemesIndexes));	

	var keyThemeIndexes = [];
	$( ".keyThemes" ).each(function( index, element ) { 
		if ($(element).hasClass('btn-primary')) {
			keyThemeIndexes.push($(element).index());
			// JS.totStudentThemes.push($(element).index());
		}
	});
	console.log("keyThemeMaxAmountController - keyThemeIndexes 1: " + JSON.stringify(keyThemeIndexes));	
	keyThemeIndexes = keyThemeIndexes.reverse();
	console.log("keyThemeMaxAmountController - keyThemeIndexes 2: " + JSON.stringify(keyThemeIndexes));

	if (keyThemeIndexes.length > jsonData.numOfChoosenWords){
		var indexNo = keyThemeIndexes[0];  
		$('.keyThemes').eq(indexNo).addClass('btn-info').removeClass('btn-primary');
		keyThemeIndexes.splice(keyThemeIndexes.length-1, 1);

		// for (var n in JS.studentThemes){
		// 	if (elementInArray(JS.totStudentThemes_selectOrder, JS.studentThemes[n])){

		// 	}
		// }
	}

	
	// if (JS.studentSelectedThemes.length + JS.studentThemes.length > jsonData.numOfChoosenWords){
	// 	console.log("keyThemeMaxAmountController - A1");

	// 	// var indexNo = JS.studentSelectedThemes[0];  									// <---- OLD

	// 	var totstudentThemes = studentThemesIndexes.concat(JS.studentSelectedThemes);   // <---- NEW
	// 	var indexNo = totstudentThemes[0];  	
	// 									    // <---- NEW
	// 	console.log("keyThemeMaxAmountController - totstudentThemes: " + JSON.stringify(totstudentThemes));
	// 	console.log("keyThemeMaxAmountController - jsonData.studentSelectedProblems: " + JSON.stringify(jsonData.studentSelectedProblems)); 
		
	// 	console.log("keyThemeMaxAmountController - studentSelectedThemes 1: " + JSON.stringify(JS.studentSelectedThemes));
	// 	console.log("keyThemeMaxAmountController - indexNo: " + indexNo);
	// 	$('.keyThemes').eq(indexNo).addClass('btn-info').removeClass('btn-primary');
	// 	JS.studentSelectedThemes.splice(0, 1);
	// 	console.log("keyThemeMaxAmountController - studentSelectedThemes 2: " + JSON.stringify(JS.studentSelectedThemes));
	// } else {
	// 	console.log("keyThemeMaxAmountController - A2");
	// }
}


$( document ).on('click', ".keyThemes", function(event){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var index = $(this).index();
	if ($(this).hasClass('btn-primary')){
		JS.studentSelectedThemes.splice(returnElementNumInArray(JS.studentSelectedThemes, index), 1);
		$('.keyThemes').eq(index).addClass('btn-info').removeClass('btn-primary');
		console.log("keyThemes - studentSelectedThemes 2: " + JSON.stringify(JS.studentSelectedThemes));
	} else {
		if (JS.studentSelectedThemes.length >= jsonData.numOfChoosenWords){
			JS.studentSelectedThemes.splice(returnElementNumInArray(JS.studentSelectedThemes, index), 1);
		}
		JS.studentSelectedThemes.push(index);
		JS.totStudentThemes_selectOrder.push(index);
		$('.keyThemes').eq(index).addClass('btn-primary').removeClass('btn-info');
		console.log("keyThemes - studentSelectedThemes 1: " + JSON.stringify(JS.studentSelectedThemes));
	}
	keyThemeMaxAmountController();
});


// This keypress eventhandler listens for the press of the return-key. If a return-key event is encountered the 
// first empty input-field is found and focus is given to that field.
$( document ).on('keypress', ".keyThemesByStudent", function(event){
	if ( event.which == 13 ) {  // If a press on the return-key is encountered... (NOTE: "13" equals the "return" key)
		event.preventDefault(); // ...prevents the normal action of the return-key.
		$( ".keyThemesByStudent" ).each(function( index, element ) { // for each input-field...
			if ($(element).val().length == 0) { // If the input-field is empty...
				$(element).focus(); // ...give the input-field focus...
				return false;  // ... and break the each-loop.
			}
		});
	}
});



$( document ).on('focusout', ".keyThemesByStudent", function(event){   // COMMENTED OUT DUE TO 
	// // Save the choosen words 1:
	// var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	// var studentThemes = [];
	// $( ".keyThemesByStudent" ).each(function( index, element ) {
	// 	console.log("keyThemesByStudent - index: " + index + ', $(element).val(): _' + $(element).val() + '_');
	// 	if ($(element).val().trim().length > 0) { // Only inset entered values > 0
	// 		if (!elementInArray(jsonData.keyProblems[JS.selcNo].themes, $(element).val().trim())){
	// 			studentThemes.push(htmlEntities($(element).val().trim()));
	// 			// jsonData.keyProblems[JS.selcNo].themes.push(htmlEntities($(element).val()));
	// 			// JS.studentSelectedThemes.push(jsonData.keyProblems[JS.selcNo].themes.length-1);
	// 		}
	// 	}
	// });
	// console.log("keyThemesByStudent - studentThemes: " + JSON.stringify(studentThemes));
	// console.log("focusout - jsonData.selectedIndexNum: " + jsonData.selectedIndexNum); 
	// JS.studentThemes = studentThemes;
	// console.log("focusout - jsonData.studentSelectedProblems: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	
	// keyThemeMaxAmountController();
});


$( document ).on('click', "#addSubject", function(event){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var studentThemes = [];
	if (typeof(studentThemes)==='undefined'){
		window.studentThemes = [];
	}
	
	$( ".keyThemesByStudent" ).each(function( index, element ) {  // <--- This "each-staement" is a leftover from when the need was to collect btns from many input-fields...
		console.log("addSubject - index: " + index + ', $(element).val(): _' + $(element).val() + '_');
		if ($(element).val().trim().length > 0) { // Only inset entered values > 0
			if (!elementInArray(jsonData.keyProblems[JS.selcNo].themes, $(element).val().trim())){

				// jsonData.keyProblems[JS.selcNo].themes.push(htmlEntities($(element).val()));
				// JS.studentSelectedThemes.push(jsonData.keyProblems[JS.selcNo].themes.length-1);

				// if (JS.studentSelectedThemes.length >= jsonData.numOfChoosenWords){   // NEW!!!!
				// 	JS.studentSelectedThemes.splice(0, 1);
				// }
				// console.log('addSubject  - (keyThemes) - studentSelectedThemes: ' + JS.studentSelectedThemes);

				$('#subjectWordContainer').append('<span class="keyThemes btn btn-primary">'+htmlEntities($(element).val().trim())+'</span>');
				$('#subjectWordContainer .keyThemes').last().hide().fadeIn('slow');
				$(element).val('');
				console.log('addSubject - TEST');

				// studentThemes.push(htmlEntities($(element).val().trim()));
				JS.studentThemes.push(htmlEntities($(element).val().trim()));
				JS.totStudentThemes_selectOrder.push(getDomIndex(".keyThemes" , htmlEntities($(element).val().trim())));

				// window.studentThemesIndexes = [];	
				// for (var i = 0; i < JS.studentThemes.length; i++) {
				// 	studentThemesIndexes.push(parseInt(JS.originalNumOfThemes) + i);			// <---- NEW
				// }
			}
		}
	});
	console.log("addSubject - studentThemes: " + JSON.stringify(studentThemes));
	console.log("addSubject - jsonData.selectedIndexNum: " + jsonData.selectedIndexNum); 
	// JS.studentThemes = studentThemes;
	console.log("addSubject - jsonData.studentSelectedProblems: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	
	keyThemeMaxAmountController();
});


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




// $( document ).on('focusin', ".keyThemesByStudent", function(event){  // <------  VIGTIGT 31/3-2016: Hvis der ønskes auto-genererede FLERE input-boxes, så fjern udkommenteringen af dette ".on('focusin')".

// 	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];

// 	// var subjectTextsArray = [];
// 	var filledKeyThemesByStudent = 0;
// 	var numOfKeyThemesByStudent = $('.keyThemesByStudent').length;
// 	$( ".keyThemesByStudent" ).each(function( index, element ) {
// 		if ($(element).val().length > 0){
// 			++filledKeyThemesByStudent;
// 		}
// 	});
// 	console.log("focusin - numOfKeyThemesByStudent: " + numOfKeyThemesByStudent + ", filledKeyThemesByStudent: " + filledKeyThemesByStudent); 
// 	console.log("focusin - jsonData.studentSelectedProblems[jsonData.selectedIndexNum] 1: " + JSON.stringify(jsonData.studentSelectedProblems[jsonData.selectedIndexNum])); 

// 	var Ajust = 0;
// 	if ($(this).val().length > 0) {  // This prevents an extra field of being added if an old field with text inside is being edited.
// 		Ajust = 1;
// 	}

// 	if (filledKeyThemesByStudent == numOfKeyThemesByStudent-1+Ajust){
// 		// returnInputBoxes4(numOfBoxes, Class, savedValues, placeholderText)
// 		$('.stepInput').append(returnInputBoxes4(1, 'keyThemesByStudent', '', 'skriv tema her...'));
// 	}
// });


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
	// $( ".problemFormulationBtn" ).trigger( "click" );
	console.log("step_3_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_3_template - studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems));
	console.log("step_3_template - keyProblems 1: " + JSON.stringify(jsonData.keyProblems)); 
	jsonData.currentStep = 3;
	osc.save('jsonData', jsonData);
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

	if (!JS.hasOwnProperty('taxonomyObjArray')){
		JS.taxonomyObjArray = [];

		for (var n in JSS) {
			JS.taxonomyObjArray.push({"studentSelectedTheme": JSS[n], "describe": [], "analyse": [], "assess": [], selected: true});
		}
	}

	console.log("step_3_template - JS 2: " + JSON.stringify(JS));

	var HTML = '';
	HTML += '<div id="step_3" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_3" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(insertKeyProblem(jsonData.steps[stepNo].instruction) + insertMasterExample()):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectTextThemeContainer" >';
			
	HTML += 			'<div class="masterStudentBtnWrap">';
	HTML += 					'<span class="problemFormulationBtn btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET PROBLEMFORMULERING</span>';
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
									for (var k in JS.taxonomyObjArray){
				HTML += 				'<div class="tabBodyDropdownContainer col-md-6 col-xs-12">';
											// for (var k in JS.taxonomyObjArray){
				HTML += 						'<div class="DropdownWrap">';
				HTML += 							(n == 0)? insertStudentSelectedThemes(returnDropdownMarkup(jsonData.sentenceStarters_taxonomy_describing), JSS, k) : '';
				HTML += 							(n == 1)? insertStudentSelectedThemes(returnDropdownMarkup(jsonData.sentenceStarters_taxonomy_analysing), JSS, k) : '';
				HTML += 							(n == 2)? insertStudentSelectedThemes(returnDropdownMarkup(jsonData.sentenceStarters_taxonomy_assessing), JSS, k) : '';
				HTML += 						'</div>';
											// }

				HTML += 					'<textarea class="tabInput">';
												// if ((JS.hasOwnProperty('textQuoteNotes')) && (typeof(JS.textQuoteNotes[quoteNoteCount]) !== 'undefined')) {
												// 	HTML += JS.textQuoteNotes[quoteNoteCount];
												// }			
				HTML += 					'</textarea>';
											if (n == 0){
												for (var p in JS.taxonomyObjArray[k].describe) {
													var arrLen = JS.taxonomyObjArray[k].describe.length-1;
													// HTML += (arrLen > 0)? '<div class="taxonomy sortable_text_container">'+JS.taxonomyObjArray[k].describe[arrLen-p]+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>' : ''; // <--- OLD 4/5-2016
													HTML += (arrLen > 0)? '<div class="taxonomy sortable_text_container">'+JS.taxonomyObjArray[k].describe[p]+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>' : ''; // <--- NEW 4/5-2016
												}
											}
											if (n == 1){
												for (var p in JS.taxonomyObjArray[k].analyse) {
													var arrLen = JS.taxonomyObjArray[k].analyse.length-1;
													// HTML += (arrLen > 0)? '<div class="taxonomy sortable_text_container">'+JS.taxonomyObjArray[k].describe[arrLen-p]+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>' : ''; // <--- OLD 4/5-2016
													HTML += (arrLen > 0)? '<div class="taxonomy sortable_text_container">'+JS.taxonomyObjArray[k].describe[p]+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>' : ''; // <--- NEW 4/5-2016
												}
											}
											if (n == 2){
												for (var p in JS.taxonomyObjArray[k].assess) {
													var arrLen = JS.taxonomyObjArray[k].assess.length-1;
													// HTML += (arrLen > 0)? '<div class="taxonomy sortable_text_container">'+JS.taxonomyObjArray[k].describe[arrLen-p]+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>' : ''; // <--- OLD 4/5-2016
													HTML += (arrLen > 0)? '<div class="taxonomy sortable_text_container">'+JS.taxonomyObjArray[k].describe[p]+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>' : ''; // <--- NEW 4/5-2016
												}
											}
				HTML += 				'</div>';
									}

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

	var taxonomyObjArray = Object.keys(JS.taxonomyObjArray[tabHeading_index]);
	console.log('focusout - taxonomyObjArray: _'+taxonomyObjArray+'_');

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
		JS.taxonomyObjArray[tabBodyDropdown_index][taxonomyObjKey].push(text);	// <-------- NEW !
		console.log('focusout - taxonomyObjArray: ' + JSON.stringify(JS.taxonomyObjArray));

		$('#tabBody_'+tabHeading_index+' .tabBodyDropdownContainer:eq('+String(parseInt(tabBodyDropdown_index))+') .tabInput').after('<div class="taxonomy sortable_text_container">'+text+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>');
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

	$(this).html(returnInputBoxes4(1, 'taxonomyTextEdit', text, 'Skriv eller klik væk for at slette...'));
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


$( document ).on('focusout', ".taxonomyEdit", function(event){

	console.log('TAXONOMYTEST -x- taxonomyEdit.focusout');

	var thisObj = $(this);
	contentDeleteController(thisObj);

});


function contentDeleteController(thisObj){

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
			$(thisObj).remove();
			console.log('focusout - A3 - TAXONOMYTEST');
			if ((jsonData.currentStep == 4)) {  // UGLY SPECIAL CASE FOR STEP 4 !!! 
				console.log('focusout - A4 - TAXONOMYTEST');
				colorSubQuestions();
			}
		}
	
		console.log('TAXONOMYTEST -x- TRASH FALSE');
		$(thisObj).append('<span class="contentEdit glyphicon glyphicon-pencil"></span>');
	}

	contentDelete = false;

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
			$(this).remove();
			if ((jsonData.currentStep == 4)) {  // UGLY SPECIAL CASE FOR STEP 4 !!! 
				console.log('keypress - TAXONOMYTEST');
				colorSubQuestions();
			}
		}
	}
});

// This function edits the datastructure in step 3 - it adds data to the structure. It is important that it does not run in other steps than step 3, since this will make inconsistent data for step 3 (if the student chooses to go back to step 3).
function taxonomyEdit(text, thisObj){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	console.log('taxonomyEdit - taxonomyObjArray 1: ' + JSON.stringify(JS.taxonomyObjArray));

	var index = $(thisObj).closest('.sortable_text_container').index() - 2;  // "-2" becauce .index() counts the textarea an dropdown...
	var tabBodyDropdown_index = $(thisObj).closest('.tabBodyDropdownContainer').index();  
	var tabBody_index = parseInt($(thisObj).closest('.tabBody').prop('id').replace('tabBody_',''));
	console.log('taxonomyEdit - index: ' + index + ', tabBodyDropdown_index: ' + tabBodyDropdown_index + ', tabBody_index: ' + tabBody_index);
	
	var taxonomyObjArray = Object.keys(JS.taxonomyObjArray[tabBody_index]);
	// var taxonomyObjKey = taxonomyObjArray[parseInt(tabBodyDropdown_index+1)];
	var tabObjLookup = ["describe", "analyse", "assess"];  // <----- ['Faktuelle spørgsmål', 'Undersøgende spørgsmål', 'Diskuterende/vurderende spørgsmål']
	var taxonomyObjKey = tabObjLookup[tabHeading_index];
	console.log('taxonomyEdit - taxonomyObjArray: ' + taxonomyObjArray + ', taxonomyObjKey: ' + taxonomyObjKey);

	console.log('taxonomyEdit - taxonomyObjArray 2: ' + JSON.stringify(JS.taxonomyObjArray[tabBody_index]));
	
	var len = JS.taxonomyObjArray[tabBody_index][taxonomyObjKey].length;
	console.log('taxonomyEdit - len: ' + len + ', index: ' + index + ', res: ' + String(len - 1 - index));

	if (text.length > 0) {
		// JS.taxonomyObjArray[tabBody_index][taxonomyObjKey][index] = text;
		// JS.taxonomyObjArray[tabBody_index][taxonomyObjKey][len - 1 - index] = text;  // <---- OLD !!!
		JS.taxonomyObjArray[tabBodyDropdown_index][taxonomyObjKey][len - 1 - index] = text;  // <---- NEW !!!
	} else {
		// JS.taxonomyObjArray[tabBody_index][taxonomyObjKey].splice(index, 1);  // Dette virker, men arrayet skal reverses, så der slettes fra den rigtige ende!
		// JS.taxonomyObjArray[tabBody_index][taxonomyObjKey].splice(len - 1 - index, 1);  // <---- OLD !!!
		JS.taxonomyObjArray[tabBodyDropdown_index][taxonomyObjKey].splice(len - 1 - index, 1);
	}
	console.log('taxonomyEdit - taxonomyObjArray 3: ' + JSON.stringify(JS.taxonomyObjArray));
}


function taxonomyEdit_2(){
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	console.log('taxonomyEdit_2 - taxonomyObjArray 1: ' + JSON.stringify(JS.taxonomyObjArray));

	// JS.taxonomyObjArray.push({"studentSelectedTheme": JSS[n], "describe": [], "analyse": [], "assess": [], selected: true});

	$( ".tabBody" ).each(function( index1, element1 ) {   // describe / analyse / assess...
		
		$( ".tabBodyDropdownContainer", element1 ).each(function( index2, element2 ) {  //  each of the themes...
			var elemArr = [];
			$( ".sortable_text_container", element2 ).each(function( index3, element3 ) {  // each of the subquestions...
				elemArr.push($(element3).text());
			});

			var objKeys = Object.keys(JS.taxonomyObjArray[index2]);
			console.log('taxonomyEdit_2 - index2 : ' + index2 + ', objKeys: '+JSON.stringify(objKeys)+', index1+1: ' + String(index1+1) + ', elemArr: ' + JSON.stringify(elemArr));
			JS.taxonomyObjArray[index2][objKeys[index1+1]] = elemArr;
		});
	});	

	console.log('taxonomyEdit_2 - taxonomyObjArray 2: ' + JSON.stringify(JS.taxonomyObjArray));
}



$(document).on('change', '.taxonomyDropdown', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var taxonomyDropdown = $(this).val();
	console.log("taxonomyDropdown - taxonomyDropdown: " + taxonomyDropdown);
	var tabBodyObj = $(this).closest('.tabBodyDropdownContainer'); 
	$('.tabInput', tabBodyObj).val(taxonomyDropdown);
	$('.tabInput', tabBodyObj).focus();
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
	return dropdownMarkup.replace(/\?\?\?/g, keyProblem.toLowerCase());
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


// Functionality for the UserMsgBox containing the "Problem Formulation".
$( document ).on('click', ".problemFormulationBtn", function(event){
	var HTML = '';
	// HTML += insertKeyProblem('<h4>Du valgte nøgleproblemet "???"</h4>');
	HTML += insertKeyProblem('<h4>Du valgte nøgleproblemet <span class="e1 label label-default"> ??? </span></h4>');
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

	$('#UserMsgBox').unbind('click');
	$('.MsgBox_bgr').unbind('click');

	// SPECIAL STUDENT MESSAGES
	console.log('problemFormulationBtn - jsonData: ' + JSON.stringify(jsonData));
	if (jsonData.currentStep == 1) {
		console.log('problemFormulationBtn - ADD');
		HTML = '<p>Gennem hele øvelsen kan du rette i din problemformulering ved at klikke på denne knap:</p>';
		HTML += '<div style="margin-bottom: 20px;">';
		HTML += 	'<span class="btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET PROBLEMFORMULERING</span>';
		HTML += '</div>';
		$('#textInputProblemFormulation').before(HTML);
		$('#textInputProblemFormulation').prop('placeholder','Gå igang med at formulere dit hovedspørgsmål her - i løse træk.');
	}

	// MAKE ANIAMTIONS
	if (!$(this).hasClass('keyProblems')){  // keyProblems has problemFormulationBtn, why this exception has been added...
		window.cssObj = $(this).css(['padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'font-size']);
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
		// $(".problemFormulationBtn").animate(cssObjZero, 300).animate(cssObjXL, 300).animate(cssObj, 300);
		$(this).animate(cssObjZero, 300, function() {
			$(this).hide();
		});
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

	saveProblemFormulation();

	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	console.log('problemFormulation_goOn - problemFormulationMem 2: ' + JS.problemFormulationMem);
	$(".MsgBox_bgr").fadeOut(200, function() {
	    $(this).remove();
	    if (!$(this).hasClass('keyProblems')){  // keyProblems has problemFormulationBtn, why this exception has been added...
	    	$(".problemFormulationBtn").show().animate(cssObjXL, 300).animate(cssObj, 300);
	    }
	});
});

// Functionality for the UserMsgBox containing the "Problem Formulation".
$( document ).on('click', ".CloseClass", function(event){
	$(".MsgBox_bgr").fadeOut(200, function() {
	    $(this).remove();
	    if (!$(this).hasClass('keyProblems')){  // keyProblems has problemFormulationBtn, why this exception has been added...
	    	$(".problemFormulationBtn").show().animate(cssObjXL, 300).animate(cssObj, 300);
	    }
	});
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

	taxonomyEdit_2();

	var TextTheme = htmlEntities($('#textInputTheme').val());

	// TextTheme = 'TEST'; // <--------------------------------   VIGTIGT: FIND UD AF HVILKET MINIMUMSKRAV FAGREDAKTØRENE HAR TIL DETTE SKRIDT!!!
	
	// if (TextTheme.length > 0){
	
		
		step_4_template();
		// setJsAudioEventLitsner2();  // Commented out 11/4-2016
		
	// } else {
	// 	UserMsgBox("body", '<h4>OBS</h4> Du skal formulere hvad dit tema handler om i tekstboksen. Brug evt. sætningsstarterne i dropdownmenuen som inspiration til din formulering.');
	// }
});




//////////////////////
//  	STEP 4 		//	
//////////////////////



function step_4_template(){
	console.log("step_4_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_4_template - studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems));
	jsonData.previousStep = jsonData.currentStep;
	jsonData.currentStep = 4;
	osc.save('jsonData', jsonData);
	var stepNo = 4;
	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));

	// Set backgroundcolors by inline CSS-style:
	var colorObj = {g3: null, f1: null};
	$('body').append('<span class="g3 hide"> XXXX </span><span class="f1 hide"> YYYY </span>');
	colorObj.g3 = $('.g3').css('background-color');
	colorObj.f1 = $('.f1').css('background-color');
	console.log("step_4_template - colorObj: " + JSON.stringify(colorObj));

	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	console.log("step_4_template - JS.taxonomyObjArray: " + JSON.stringify(JS.taxonomyObjArray));

	var TSortableOrderArray = [];
	var SortableOrderArray_is_new = false;
	if (!JS.hasOwnProperty('SortableOrderArray')){
		JS.SortableOrderArray = [];
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
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction + insertMasterExample()):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	
	HTML += 			'<div class="masterStudentBtnWrap">';
	// HTML += 					'<span class="problemFormulationBtn btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET PROBLEMFORMULERING</span><span class="masterStudentBtn btn btn-info"><span class="glyphicons glyphicons-eye-open"></span>EKSEMPEL: SORTER UNDERSPØRGSMÅL</span>';
	HTML += 					'<span class="problemFormulationBtn btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span> RET PROBLEMFORMULERING</span>';
	HTML += 			'</div>';

	HTML += 			'<div id="subjectSentenceSortableContainer" class="btnActions">';

	window.barHeight = jsonData.numOfSubQuestions - 1; 
	console.log('step_4_template - jsonData.numOfSubQuestions: ' + jsonData.numOfSubQuestions + ', barHeight: ' + barHeight + ', typeof(barHeight): ' + typeof(barHeight));

	var count = 0;
	for (var n in JS.taxonomyObjArray) { 
		var taxonomyObjkey = Object.keys(JS.taxonomyObjArray[n]);
		for (var k in taxonomyObjkey) { 
			var key = taxonomyObjkey[k];
			if (key != 'studentSelectedTheme'){ // studentSelectedTheme has to be ignored...
				for (var t in JS.taxonomyObjArray[n][key]) { 
					var arrLen = JS.taxonomyObjArray[n][key].length-1;
					// HTML += '<div id="Sort_'+count+'" data-address="{n:'+n+',key:'+key+',t:'+t+'}" class="taxonomy Sortable sortable_text_container">'+JS.taxonomyObjArray[n][key][arrLen-t]+'</div>';
					// HTML += '<div style="background-color:'+((count <= barHeight)? colorObj.g3 : colorObj.f1)+'" id="Sort_'+count+'" data-address="{_n_:'+n+',_key_:_'+key+'_,_t_:'+t+'}" class="taxonomy Sortable sortable_text_container">'+JS.taxonomyObjArray[n][key][arrLen-t]+'</div>';
					// HTML += '<div id="Sort_'+count+'" data-address="{_n_:'+n+',_key_:_'+key+'_,_t_:'+t+'}" class="taxonomy Sortable sortable_text_container">'+((SortableOrderArray_is_new || jsonData.previousStep == 3)? JS.taxonomyObjArray[n][key][arrLen-t] : JS.SortableOrderArray[count] )+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>';  // <---- OLD 4/5-2016
					HTML += '<div id="Sort_'+count+'" data-address="{_n_:'+n+',_key_:_'+key+'_,_t_:'+t+'}" class="taxonomy Sortable sortable_text_container">'+((SortableOrderArray_is_new || jsonData.previousStep == 3)? JS.taxonomyObjArray[n][key][t] : JS.SortableOrderArray[count] )+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>';            // <---- NEW 4/5-2016
					// HTML += (count == barHeight)? '<div id="barHeight">----------------------------------</div>' : '';
					// JS.SortableOrderArray.push(JS.taxonomyObjArray[n][key][arrLen-t]);  															// <------ OLD! 
					TSortableOrderArray.push(((SortableOrderArray_is_new || jsonData.previousStep == 3)? JS.taxonomyObjArray[n][key][arrLen-t] : JS.SortableOrderArray[count] ));	// <------ NEW!
					++count;
				}
			}
		}
	}

	JS.SortableOrderArray = TSortableOrderArray;

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

	colorSubQuestions();
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
	    	// $( "#subjectSentenceSortableContainer" ).sortable( "refresh" );  // "Refresh" anvende ikke således.
	    	// repositionBarHeight();
	    	colorSubQuestions();
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


// function repositionBarHeight(){
// 		var barHeightPos;
// 		$( "#subjectSentenceSortableContainer div" ).each(function( index, element ) {
// 			if ($(element).attr('id') == ''){

// 			}
// 		});	
// }

function colorSubQuestions(){ // Set backgroundcolors by inline CSS-style:
	if (typeof(colorObj) === 'undefined'){
		window.colorObj = {g3: null, f1: null, none: null};
		$('body').append('<span class="g3 hide"> &nbsp; </span><span class="f1 hide"> &nbsp; </span> <span id="noColor" class="sortable_text_container hide"> &nbsp; </span>');
		colorObj.g3 = $('.g3').css('background-color');
		colorObj.f1 = $('.f1').css('background-color');
		colorObj.none = $('#noColor').css('background-color');
		console.log("colorSubQuestions - colorObj: " + JSON.stringify(colorObj));
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

		var eds = $(element).attr('data-address');
		console.log('updateSortableOrderArray - callNo: '+callNo+', eds 1: _' + eds + '_');

		eds = eds.replace(/_/g, '"'); 
		console.log('updateSortableOrderArray - callNo: '+callNo+', eds 2: _' + eds + '_');

		var edo = JSON.parse(eds);
		// var edo = JSON.parse(eds);
		console.log('updateSortableOrderArray - callNo: '+callNo+', edo: ' + edo + ', typeof(edo): ' + typeof(edo));
		console.log('updateSortableOrderArray - callNo: '+callNo+', edo.n: ' + edo.n);

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


$( document ).on('click', "#step_4_goBack", function(event){
	step_3_template();
	// setJsAudioEventLitsner2();  // Commented out 11/4-2016
	// $("#textInputTheme").focus();  // Sets the focus in the textarea when the template loades.
});


$( document ).on('click', "#step_4_goOn", function(event){

	updateSortableOrderArray(3);
	step_5_template();

});



//////////////////////
//  	STEP 5		//	FIND QUOTES IN THE TEXT
//////////////////////

function step_5_template(){
	jsonData.previousStep = jsonData.currentStep;
	jsonData.currentStep = 5;
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
	HTML += 		'<div class="col-xs-12 col-md-12">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_5" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction + returnAudioMarkup(stepNo)):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div class="masterStudentBtnWrap">';
	HTML += 					'<span class="masterStudentBtn btn btn-info"><span class="glyphicons glyphicons-eye-open"></span>EKSEMPEL: PROBLEMFORMULERING - MED UNDERSPØRGSMÅL</span>';
	HTML += 			'</div>';

						var placeholderText = 'Hvis du endnu ikke har skrevet et udkast til din problemformulering, skal du gøre det her.';
	HTML += 			'<textarea id="textInputProblemFormulation" class="textInput" val="" placeholder="'+placeholderText+'">';
							window.problemFormulationMemNum = JS.problemFormulationMem.length-1;
							console.log('step_5_template - JS.problemFormulationMem: ' + JSON.stringify(JS.problemFormulationMem));
							HTML += (problemFormulationMemNum < 0)? '' : JS.problemFormulationMem[problemFormulationMemNum];
	HTML += 			'</textarea>';

						for (var i = 0; i < jsonData.numOfSubQuestions; i++) {
							HTML += '<div class="taxonomy subQuestion sortable_text_container">'+((subQuestionArray_is_new || jsonData.previousStep == 4)? JS.SortableOrderArray[i] : JS.subQuestionArray[i] )+'<span class="contentEdit glyphicon glyphicon-pencil"></span></div>';	
							TsubQuestionArray.push(((subQuestionArray_is_new || jsonData.previousStep == 4)? JS.SortableOrderArray[i] : JS.subQuestionArray[i] ));
						}
						JS.subQuestionArray = TsubQuestionArray;

	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 5 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);

	setJsAudioEventLitsner2();
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


$( document ).on('click', "#step_5_goBack", function(event){
	updateSubQuestionArray();
	step_4_template();
});

$( document ).on('click', "#step_5_goOn", function(event){
	var problemFormulation = $('#textInputProblemFormulation').val();
	console.log('step_5_goOn - problemFormulation : ' + problemFormulation);
	
	if (problemFormulation.length > 0) {
		saveProblemFormulation();
		updateSubQuestionArray();
		
		step_6_template();

	} else {
		UserMsgBox("body", "<h4>OBS</h4> Du skal skrive tekst til din problemformulering før du kan gå videre!");
	}

});


//####################################################################################################################
//											      DEV-LINE
//####################################################################################################################


//////////////////////
//  	STEP 6		//	WRITE TEXTS TO YOUR QUOTES
//////////////////////

function step_6_template(){
	jsonData.currentStep = 6;
	osc.save('jsonData', jsonData);
	console.log("step_6_template - quoteCount: " + ((typeof(quoteCount) !== 'undefined')?quoteCount:'undefined'));
	console.log("step_6_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_6_template - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	
	var JS = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];  
	
	var stepNo = 6;
	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));
	var HTML = '';
	HTML += '<div id="step_6" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_6" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction + returnAudioMarkup(stepNo)):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="TextAndQuoteContainer">';
			
	// HTML +=				'<span class="Texts btn btn-info" >'+jsonData.texts[JST.textNo].author+': "'+jsonData.texts[JST.textNo].title+'", '+jsonData.texts[JST.textNo].year+'</span>';

	// 1 nøgleproblem
	// 3 emner
	// 4 underspørgsmål
	// 1 problemformulering
	HTML += 				'<div>';
				HTML += 		'<h3>Stilladseret skrive guide</h3>';
				HTML += 		'<h4>Nøgleproblem</h4> ';
				HTML += 		'<p >'+jsonData.keyProblems[JS.selcNo].name+'</p>';
				HTML += 		'<h4>Valgte temaer</h4> ';
								for (var n in JS.studentSelectedThemes){
				HTML += 			'<p>'+jsonData.keyProblems[JS.selcNo].themes[JS.studentSelectedThemes[n]]+'</p>';
								}
				HTML += 		'<h4>Underspørgsmål</h4> ';
								for (var n in JS.subQuestionArray){
				HTML += 			'<p>'+JS.subQuestionArray[n]+'</p>';
								}
				HTML += 		'<h4>Problemformulering</h4> ';

				HTML += 		'<p>'+JS.problemFormulationMem[JS.problemFormulationMem.length - 1]+'</p>';
								
				
	HTML += 				'</div>';

	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 6 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);

	setJsAudioEventLitsner2();
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
	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var text = jsonData.keyProblems[JST.selcNo];
	var HTML = '';
	HTML += '<!DOCTYPE html>';
	HTML += '<html>';
	HTML += 	'<head>';
	HTML += 	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';  // Fixes issue with danish characters on Internet Explore 
	HTML += 		'<style type="text/css">';
	HTML += 			'body {font-family: arial;}';
	HTML += 			'h1 {}';
	HTML += 			'h2 {}';
	HTML += 			'h3 {font-style: italic; color: #717272;}';
	HTML += 			'h4 {color: #56bfc5;}';
	HTML += 			'h5 {}';
	HTML += 			'h6 {}';
	HTML += 			'.selected {color: #56bfc5; width: 25%;}';
	HTML += 			'p {font-size: 14px; margin-bottom: 5px}';
	HTML += 			'table {padding: 8px; width: 100%;}';
	HTML += 			'td {width: 25%;}';
	HTML += 			'ol {color: #717272;}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>';
	HTML += 		'<h1>'+JST.headAndIntro[0]+'</h1>';
	// HTML += 		'<hr/>';
	HTML +=			'<p>En analyse af '+jsonData.keyProblems[JST.selcNo].author+"'s &quot;"+jsonData.keyProblems[JST.selcNo].title+'&quot; fra '+jsonData.keyProblems[JST.selcNo].year+'.<p>';
	HTML += 		'<p><b>Indledning:</b> '+JST.headAndIntro[1]+'</p>';

	// HTML += 			'<h3>Din valgte tekst: </h3>';
	// HTML += 			'<h4>"'+text.title+'" af '+text.author+', '+text.year+'</h4>';

	HTML += 		'<p><b>Temaudlægning:</b> '+JST.TextTheme+'</p>';
	HTML += 		'<hr/>';
	for (var n in JST.textQuotes){
		HTML += 		'<p><b>Citat '+String(parseInt(n)+1)+':</b> &quot;<i>'+JST.textQuotes[n]+'</i>&quot;</p>';
		HTML += 		'<p><b>Citatudlægning '+String(parseInt(n)+1)+':</b> '+JST.textQuoteNotes[n]+'</p>';
		HTML += 		'<hr/>';
		HTML += 		(n < jsonData.numOfChoosenWords-1)?'<p><b>Sætning '+String(parseInt(n)+1)+':</b> '+JST.textQuoteNotes[n]+'</p><hr/>':'';
		// HTML += 		'<hr/>';
	}
	HTML += 		'<p><b>Fortolkning:</b> ';
	for (var n in JST.textPassages){
		HTML += 		JST.textPassages[n]+' ';
	}
	HTML += 		'<hr/>';
	HTML += 		'<p><b>Afslutning:</b> '+JST.conclusion+'</p>';
	HTML += 		'<hr/>';
	HTML += 		'<div class="instruktion">';
	HTML += 			'<h3>Gennemlæs din tekst. Hænger den sammen i forhold til:</h3>';
	HTML += 			'<ol>';
	HTML += 				'<li>Tydelige overgange mellem afsnit.</li>';
	HTML += 				'<li>Sammenhæng mellem sætningerne.</li>';
	HTML += 				'<li>Godt og levende sprog.</li>';
	HTML += 				'<li>Korrekt brug af punktum og komma.</li>';
	HTML += 				'<li>Så få formuleringsmæssige uklarheder og stavefejl som muligt.</li>';
	HTML += 			'</ol>';
	HTML += 			'<h3>Når du har gennemgået disse trin, har du en rigtig god tekst!</h3>';
	HTML += 			'<hr/>';
	HTML += 		'</div>';
	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}



//#################################
//
//		OLD STEP 4
//
//#################################

//////////////////////
//  	STEP 7		//	WRITE TEXTS TO CONNECT YOUR PASSAGES
//////////////////////

function step_7_template(){
	jsonData.currentStep = 7;
	osc.save('jsonData', jsonData);
	console.log("step_7_template - quoteCount: " + ((typeof(textPassageCount) !== 'undefined')?textPassageCount:'undefined'));
	console.log("step_7_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_7_template - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	if ((typeof(textPassageCount) === 'undefined') || (textPassageCount === null)) { 
		window.textPassageCount = 0;
		console.log("step_7_template - textPassageCount DEFINED! ");
	} else {
		if (textPassageCount < jsonData.numOfChoosenWords-2){
			++textPassageCount;
		}
		// ++textPassageCount;
	}

	console.log("step_7_template - textPassageCount: " + textPassageCount);

	// var JSN = jsonData.studentSelectedProblems[jsonData.selectedselcNo];
	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];  // <-----  NEW!
	var textPassages = [];
	if (JST.hasOwnProperty("textPassages")){
		// selcNo = getSelected('selcNo');
		textPassages = JST.textPassages;
	}
	var stepNo = 7;
	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));
	var HTML = '';
	HTML += '<div id="step_7" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_7" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="TextAndQuoteContainer">';
			
	// HTML +=				'<span class="Texts btn btn-info" >'+jsonData.keyProblems[JST.selcNo].author+': "'+jsonData.keyProblems[JST.selcNo].title+'", '+jsonData.keyProblems[JST.selcNo].year+'</span>';
	
	HTML += 				'<div id="textPassageContainer" class="btnActions">';
				for (var i = 0; i < jsonData.numOfChoosenWords-1; i++) {
					HTML += 	'<span class="textPassageBtn btn btn-'+((i==textPassageCount)?'primary':'info')+'">Sætning '+String(i+1)+'</span>';
				}
	HTML += 				'</div>';

	HTML += 				'<div id="textOverviewContainer" >';
				HTML += 		'<div class="textOverview textOverview_TextTheme">'+
									'<h4>Tema</h4>'+JST.studentTheme +'<br/><br/>'+
									'<h4>Temaudlægning</h4>'+JST.TextTheme+
								'</div>';
				for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
					HTML += 	'<div class="textOverview textOverview_QuotesAndNotes">'+
									'<h4>Citat '+String(parseInt(i)+1)+'</h4>'+
									'&quot;<i>'+JST.textQuotes[i]+'</i>&quot;<br/><br/>'+
									'<h4>Udlægning til citat '+String(parseInt(i)+1)+'</h4>'+
									JST.textQuoteNotes[i]+
								'</div>';
				}
	HTML += 				'</div>';


	HTML += 			'</div>';

	// HTML += 			'<div class="QuoteHolder TextHolder"> &quot;<i>';
	// 			HTML += JST.textQuotes[textPassageCount];
	// HTML += 			'<i>&quot; </div>';

	HTML += 				'<div class="DropdownWrap">';
	HTML += 					returnDropdownMarkup(jsonData.sentenceStarters_interpretation);
	HTML += 				'</div>';

	HTML += 			'<textarea id="textInput_'+textPassageCount+'" val="" class="textInput">';
			if ((JST.hasOwnProperty('textPassages')) && (typeof(JST.textPassages[textPassageCount]) !== 'undefined')) {
				HTML += JST.textPassages[textPassageCount];
			}			
	HTML += 			'</textarea>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 7 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);

	setJsAudioEventLitsner2();
}


$(document).on('change', '#Dropdown1b', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var interpretation = $('#Dropdown1b').val();
	console.log("textInputTheme - interpretation: " + interpretation);
	$('#textInput_'+textPassageCount).val(interpretation);
});


$( document ).on('click', ".textPassageBtn", function(event){
	var index = $(this).index();
	console.log("quoteBtn - index: " + index);
	 
	// -----------------------
	console.log("quoteNoteBtn - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	if (!JST.hasOwnProperty('textPassages')){
		JST.textPassages = [];
		for (var i = 0; i < jsonData.numOfChoosenWords-1; i++) {
			JST.textPassages.push('');
		};
	}

	var sentence = htmlEntities($('#textInput_'+textPassageCount).val());
	console.log("quoteNoteBtn - textPassageCount: " + textPassageCount + ", sentence: " + sentence);
	console.log("quoteNoteBtn - $('#textInput_'+textPassageCount).val(): " + $('#textInput_'+textPassageCount).val());
	
	if (textPassageCount < jsonData.numOfChoosenWords-1){
		// JSN.subjectTexts_sentences.push(sentence);
		JST.textPassages[textPassageCount] = sentence;
		// step_4_template();
		console.log("quoteBtn - jsonData.studentSelectedProblems 2: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	} 
	// else {
	// 	JST.subjectTexts_sentences[textPassageCount] = sentence;
	// 	// step_4b_template();
	// 	console.log("quoteBtn - jsonData.studentSelectedProblems 3: " + JSON.stringify(jsonData.studentSelectedProblems));
	// 	// makeSortable();
	// }

	// -----------------------
	textPassageCount = index-1; 
	step_7_template();  
	// setJsAudioEventLitsner2();  // Commented out 11/4-2016
	// $(".textInput").focus();  // Sets the focus in the textarea when the template loades.
});


$( document ).on('click', "#step_7_goBack", function(event){
	if ((typeof(textPassageCount) === 'undefined') || (textPassageCount == 0)){
		step_6_template();
		// setJsAudioEventLitsner2();  // Commented out 11/4-2016
		// $(".textInputQuoteNote").focus();  // Sets the focus in the textarea when the template loades.
		textPassageCount = null;
		console.log("step_4_goBack - textPassageCount: " + textPassageCount);
	} else {
		--textPassageCount; // Once...
		--textPassageCount;	// twice... because of the inscreasement inside step_XXX_template
		step_7_template();
		// setJsAudioEventLitsner2();  // Commented out 11/4-2016
		// $(".textInput").focus();  // Sets the focus in the textarea when the template loades.
	}
});

$( document ).on('click', "#step_7_goOn", function(event){
	console.log("step_7_goOn - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	if (!JST.hasOwnProperty('textPassages')){
		JST.textPassages = [];
		for (var i = 0; i < jsonData.numOfChoosenWords-1; i++) {
			JST.textPassages.push('');
		};
	}

	var btnPrimaryText = $("#subjectWordSentenceContainer .btn-primary").text();

	var sentence = htmlEntities($('#textInput_'+textPassageCount).val());
	console.log("step_7_goOn - textPassageCount: " + textPassageCount + ", sentence: " + sentence);
	console.log("step_7_goOn - $('#textInput_'+textPassageCount).val(): " + $('#textInput_'+textPassageCount).val());
	if (sentence.length > 0) {
		// if (quoteCount < jsonData.numOfChoosenWords-1){
		// 	JSN.subjectTexts_sentences[quoteCount] = sentence;
		// 	console.log("step_4_goOn - jsonData.studentSelectedProblems 2: " + JSON.stringify(jsonData.studentSelectedProblems));
			
		// 	step_4_template();
			
		// } else {
			JST.textPassages[textPassageCount] = sentence;
			console.log("step_7_goOn - jsonData.studentSelectedProblems 3: " + JSON.stringify(jsonData.studentSelectedProblems));
			if (!hasNonEmptyStrElm( JST.textPassages )){
				// JSN.subjectTexts_sentences[quoteCount] = sentence;
				console.log("step_7_goOn - jsonData.studentSelectedProblems 4: " + JSON.stringify(jsonData.studentSelectedProblems));
				console.log("step_7_goOn - jsonData: " + JSON.stringify(jsonData));
				// autoPlay = (typeof(TautoPlay) !== 'undefined')? TautoPlay : autoPlay;  // This sets the remembered state before step 4.
				step_8_template();
				// setJsAudioEventLitsner2();  // Commented out 11/4-2016
				// $("#textInputConclusion").focus();  // Sets the focus in the textarea when the template loades.
				// makeSortable();
			} else {
				UserMsgBox("body", '<h4>OBS</h4> Du skal skrive sætninger i tekstboksene der forbinder dine tekstafsnit - du mangler at skrive tekst til '+returnMissingElements('textPassages', 'sætning')+'. Tryk på sætningsknapperne og skriv tekst i tekstboksene.');
			}
		// }

	} else {
		UserMsgBox("body", "<h4>OBS</h4> Du skal skrive sætninger i tekstboksene før du kan gå videre!");
	}

});


//////////////////////
//  	STEP 8 		//  WRITE YOUR CONCLUSION BY WRITING TWO SENTENCES
//////////////////////


function step_8_template(){
	console.log("step_8_template - jsonData 1: " + JSON.stringify(jsonData)); 
	jsonData.currentStep = 8;
	osc.save('jsonData', jsonData);
	var stepNo = 8;

	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));

	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];

	var HTML = '';
	HTML += '<div id="step_8" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_8" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectTextConclusionContainer" class="btnActions">';
			
	HTML += 				'<div class="DropdownWrap">';
	HTML += 					returnDropdownMarkup(jsonData.sentenceStarters_conclusion);
	HTML += 				'</div>';

	HTML += 				'<textarea id="textInputConclusion" val="">';
				if (JST.hasOwnProperty('conclusion')) {
					HTML += JST.conclusion;
				}			
	HTML += 				'</textarea>';

	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 8 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);

	setJsAudioEventLitsner2();
}

$(document).on('change', '#Dropdown2', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var textInput = $('#Dropdown2').val();
	console.log("textInputTheme - textInput: " + textInput);
	$('#textInputConclusion').val(textInput);
});


$( document ).on('click', "#step_8_goBack", function(event){
	step_7_template();
	// setJsAudioEventLitsner2();  // Commented out 11/4-2016
	// $(".textInput").focus();  // Sets the focus in the textarea when the template loades.
});


$( document ).on('click', "#step_8_goOn", function(event){

	var conclusion = htmlEntities($('#textInputConclusion').val());
	if (conclusion.length > 0){
		var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
		if (!JST.hasOwnProperty('conclusion')){
			JST.conclusion = null;
		}

		JST.conclusion = conclusion;
		
		step_9_template();
		// setJsAudioEventLitsner2();  // Commented out 11/4-2016
		// $(".headerField").focus();  // Sets the focus in the textarea when the template loades.
		
	} else {
		UserMsgBox("body", '<h4>OBS</h4> Du skal du skrive et par afsluttende sætninger, der kort og præcist konkluderer, hvad du har fundet ud af. Brug evt. sætningsstarterne i dropdownmenuen som inspiration til formulering af dine sætninger.');
	}
});



//#################################
//
//		OLD STEP 4
//
//#################################

//////////////////////
//  	STEP 9		//	WRITE A HEADING AND AN INTRODUCTION
//////////////////////

function step_9_template(){
	jsonData.currentStep = 9;
	osc.save('jsonData', jsonData);
	// console.log("step_9_template - headAndIntroCount: " + ((typeof(headAndIntroCount) !== 'undefined')?headAndIntroCount:'undefined'));
	console.log("step_9_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_9_template - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	// if ((typeof(headAndIntroCount) === 'undefined') || (headAndIntroCount === null)) { 
	// 	window.headAndIntroCount = 0;
	// } else {
	// 	++headAndIntroCount;
	// }

	// var JSN = jsonData.studentSelectedProblems[jsonData.selectedselcNo];
	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];  // <-----  NEW!
	var headAndIntro = ['', ''];
	if (JST.hasOwnProperty("headAndIntro")){
		// selcNo = getSelected('selcNo');
		headAndIntro = JST.headAndIntro;
	} else {
		JST.headAndIntro = headAndIntro;
	}
	console.log("step_9_template - headAndIntro: " + headAndIntro);
	// var headAndIntroArray = ["Overskrift", "Indledning"];
	var stepNo = 9;

	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));

	var HTML = '';
	HTML += '<div id="step_9" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_9" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	
			HTML +=					returnInputBoxes4(1, 'headerField', ((typeof(headAndIntro[0])!=='undefined') && (headAndIntro[0]!==''))?headAndIntro[0]:'', 'Skriv din overskrift her...');
	// }
	// if (headAndIntroCount == 1) {
			HTML += 	'<textarea class="introField" val="" placeholder="Skriv din indledning her..." >';
					if ((typeof(headAndIntro[1])!=='undefined') && (headAndIntro[1]!=='')) {
						HTML += headAndIntro[1];
					}			
			HTML += 	'</textarea>';
	// }

	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 9 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);

	setJsAudioEventLitsner2();
}



$( document ).on('focusout', ".headerField", function(event){
// $( document ).on('focusin', ".studentTheme", function(event){  
	var headerField = htmlEntities($('.headerField').val());
	console.log("focusout - headerField: _" + headerField + "_");
	// if (headerField.length > 0) {
		// var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
		jsonData.studentSelectedProblems[jsonData.selectedIndexNum].headAndIntro[0] = headerField;
	// }
});

$( document ).on('focusout', ".introField", function(event){
// $( document ).on('focusin', ".studentTheme", function(event){  
	var introField = htmlEntities($('.introField').val());
	console.log("focusout - introField: _" + introField + "_");
	// if (introField.length > 0) {
		jsonData.studentSelectedProblems[jsonData.selectedIndexNum].headAndIntro[1] = introField;
	// }
});


$( document ).on('click', "#step_9_goBack", function(event){
	// if ((typeof(headAndIntroCount) === 'undefined') || (headAndIntroCount == 0)){
		step_8_template();
		// setJsAudioEventLitsner2();  // Commented out 11/4-2016
		// $("#textInputConclusion").focus();  // Sets the focus in the textarea when the template loades.
		// headAndIntroCount = null;
		console.log("step_9_goBack - headAndIntroCount: " + headAndIntroCount);
	// } else {
	// 	--headAndIntroCount; // Once...
	// 	--headAndIntroCount; // twice... because of the inscreasement inside step_XXX_template
	// 	step_9_template();
	// setJsAudioEventLitsner2();  
	// }
});

$( document ).on('click', "#step_9_goOn", function(event){
	console.log("step_9_goOn - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 
	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	
	console.log("step_9_goOn - jsonData.studentSelectedProblems 3: " + JSON.stringify(jsonData.studentSelectedProblems));
	if (!hasNonEmptyStrElm( JST.headAndIntro )){
		// JSN.subjectTexts_sentences[quoteCount] = sentence;
		console.log("step_9_goOn - jsonData.studentSelectedProblems 4: " + JSON.stringify(jsonData.studentSelectedProblems));
		// autoPlay = (typeof(TautoPlay) !== 'undefined')? TautoPlay : autoPlay;  // This sets the remembered state before step 4.
		step_10_template();
		// setJsAudioEventLitsner2();  // Commented out 11/4-2016
		// makeSortable();
	} else {
		UserMsgBox("body", '<h4>OBS</h4> Du skal en overskrift og indledning til din analyse - du mangler at skrive tekst til '+returnMissingElements('headAndIntro', ["overskriften", "indledningen"]));
	}
});


//////////////////////
//  	STEP 10		//	DOWNLOAD YOUR WORD-FILE
//////////////////////

function step_10_template(){
	jsonData.currentStep = 10;
	osc.save('jsonData', jsonData);
	console.log("step_10_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_10_template - jsonData.studentSelectedProblems 1: " + JSON.stringify(jsonData.studentSelectedProblems)); 

	// var JSN = jsonData.studentSelectedProblems[jsonData.selectedselcNo];
	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];  // <-----  NEW!
	
	var stepNo = 10;

	$('#processContainer').html(returnProgressBar(stepNo));
	// ajustProcessBarContainerLength('#processBarContainer', '#processBar', '#processVal');
	$('#stepNavContainer').html(changeNavAndAudioToStepNo(stepNo));

	var HTML = '';
	HTML += '<div id="step_10" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-12">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_10" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?'<div class="col-xs-12 col-md-8">'+instruction(jsonData.steps[stepNo].instruction):'')+'</div><div class="clear"></div>';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="TextAndQuoteContainer">';
			
	// HTML +=				'<span class="Texts btn btn-info" >'+jsonData.keyProblems[JST.selcNo].author+': "'+jsonData.keyProblems[JST.selcNo].title+'", '+jsonData.keyProblems[JST.selcNo].year+'</span>';

	HTML += 				'<div id="textOverviewContainer" >';
				HTML += 		'<h3>'+JST.headAndIntro[0]+'</h3>';
				HTML +=			'<p>En analyse af '+jsonData.keyProblems[JST.selcNo].author+"'s &quot;"+jsonData.keyProblems[JST.selcNo].title+'&quot; fra '+jsonData.keyProblems[JST.selcNo].year+'.<p>';
				HTML += 		'<h4>Indledning</h4> ';
				HTML += 		'<p>'+JST.headAndIntro[1]+'</p>';
				HTML += 		'<div class="textOverview textOverview_TextTheme">'+
									'<h4>Tema</h4>'+JST.studentTheme+'<br/><br/>'+
									'<h4>Temaudlægning</h4>'+JST.TextTheme+'<br/>'+
								'</div>';
				for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
					HTML += 	'<div class="textOverview textOverview_QuotesAndNotes">'+
									'<h4>Citat '+String(parseInt(i)+1)+'</h4>'+
									'&quot;<i>'+JST.textQuotes[i]+'</i>&quot; <br/><br/>'+
									'<h4>Udlægning til citat '+String(parseInt(i)+1)+'</h4>'+
									JST.textQuoteNotes[i]+
								'</div>';
					// HTML += 	(typeof(JST.textPassages[i]!=='undefined'))?'<p id="textPassages_'+i+'">'+JST.textPassages[i]+'</p>':'';
					// HTML += 	'<span class="textOverviewSubHeading">Sætning '+String(parseInt(i)+1)+':</span> <br/>';
					HTML += 	(i < jsonData.numOfChoosenWords-1)?'<div class="textOverview"><h4>Sætning '+String(parseInt(i)+1)+'</h4> <p id="textPassages_'+i+'">'+JST.textPassages[i]+'</p></div>':'';
				}
				HTML += 		'<h4>Afslutning</h4>';
				HTML += 		'<p>'+JST.conclusion+'</p>';
	HTML += 				'</div>';
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard2(HTML, jsonData.numOfChoosenWords);
	errObj.updateErrorObj("STEP 10 - jsonData.studentSelectedProblems", jsonData.studentSelectedProblems[jsonData.selectedIndexNum]);
	
	$('#DataInput').html(HTML);

	setJsAudioEventLitsner2();
}


$( document ).on('click', "#step_10_goBack", function(event){
	step_9_template();
	// setJsAudioEventLitsner2();  // Commented out 11/4-2016
	// $(".headerField").focus();  // Sets the focus in the textarea when the template loades.
});

$( document ).on('click', "#step_10_download", function(event){
	
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
function wordTemplate_OLD() {
	var JST = jsonData.studentSelectedProblems[jsonData.selectedIndexNum];
	var text = jsonData.keyProblems[JST.selcNo];
	var HTML = '';
	HTML += '<!DOCTYPE html>';
	HTML += '<html>';
	HTML += 	'<head>';
	HTML += 	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';  // Fixes issue with danish characters on Internet Explore 
	HTML += 		'<style type="text/css">';
	HTML += 			'body {font-family: arial;}';
	HTML += 			'h1 {}';
	HTML += 			'h2 {}';
	HTML += 			'h3 {font-style: italic; color: #717272;}';
	HTML += 			'h4 {color: #56bfc5;}';
	HTML += 			'h5 {}';
	HTML += 			'h6 {}';
	HTML += 			'.selected {color: #56bfc5; width: 25%;}';
	HTML += 			'p {font-size: 14px; margin-bottom: 5px}';
	HTML += 			'table {padding: 8px; width: 100%;}';
	HTML += 			'td {width: 25%;}';
	HTML += 			'ol {color: #717272;}';
	HTML += 		'</style>';
	HTML += 	'</head>';
	HTML += 	'<body>';
	HTML += 		'<h1>'+JST.headAndIntro[0]+'</h1>';
	// HTML += 		'<hr/>';
	HTML +=			'<p>En analyse af '+jsonData.keyProblems[JST.selcNo].author+"'s &quot;"+jsonData.keyProblems[JST.selcNo].title+'&quot; fra '+jsonData.keyProblems[JST.selcNo].year+'.<p>';
	HTML += 		'<p><b>Indledning:</b> '+JST.headAndIntro[1]+'</p>';

	// HTML += 			'<h3>Din valgte tekst: </h3>';
	// HTML += 			'<h4>"'+text.title+'" af '+text.author+', '+text.year+'</h4>';

	HTML += 		'<p><b>Temaudlægning:</b> '+JST.TextTheme+'</p>';
	HTML += 		'<hr/>';
	for (var n in JST.textQuotes){
		HTML += 		'<p><b>Citat '+String(parseInt(n)+1)+':</b> &quot;<i>'+JST.textQuotes[n]+'</i>&quot;</p>';
		HTML += 		'<p><b>Citatudlægning '+String(parseInt(n)+1)+':</b> '+JST.textQuoteNotes[n]+'</p>';
		HTML += 		'<hr/>';
		HTML += 		(n < jsonData.numOfChoosenWords-1)?'<p><b>Sætning '+String(parseInt(n)+1)+':</b> '+JST.textQuoteNotes[n]+'</p><hr/>':'';
		// HTML += 		'<hr/>';
	}
	HTML += 		'<p><b>Fortolkning:</b> ';
	for (var n in JST.textPassages){
		HTML += 		JST.textPassages[n]+' ';
	}
	HTML += 		'<hr/>';
	HTML += 		'<p><b>Afslutning:</b> '+JST.conclusion+'</p>';
	HTML += 		'<hr/>';
	HTML += 		'<div class="instruktion">';
	HTML += 			'<h3>Gennemlæs din tekst. Hænger den sammen i forhold til:</h3>';
	HTML += 			'<ol>';
	HTML += 				'<li>Tydelige overgange mellem afsnit.</li>';
	HTML += 				'<li>Sammenhæng mellem sætningerne.</li>';
	HTML += 				'<li>Godt og levende sprog.</li>';
	HTML += 				'<li>Korrekt brug af punktum og komma.</li>';
	HTML += 				'<li>Så få formuleringsmæssige uklarheder og stavefejl som muligt.</li>';
	HTML += 			'</ol>';
	HTML += 			'<h3>Når du har gennemgået disse trin, har du en rigtig god tekst!</h3>';
	HTML += 			'<hr/>';
	HTML += 		'</div>';
	HTML += 	'</body>';
	HTML += '</html>';
	// document.write(HTML);
	return HTML;
}





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


	returnLastStudentSession(); // This function gives the student the possibility of loading the last "session".

	// setJsAudioEventLitsner2();  // Commented out 11/4-2016   // <------------  Commented out d. 08-04-2016

	window.DTO = Object.create(dynamicTextClass); 



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
    typeSpeed: 100,     // Time in milliseconds between each keystroke.
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
        {"add": " Dette er enden på denne lille præsentation :-)"}
    ],
    interval : null,
    init : function(){ // ARGUMENTS: 1: tagetSelector, 2: cmdObj (which is optional. If cmdObj is omitted, the default cmdObj above is loaded).
        this.tagetSelector = arguments[0];
        if (typeof(arguments[1]) !== 'undefined') this.cmdObj = arguments[1];

        this.findCmd();
        this.startCursorBlink();
    },
    add : function(text){   // This method types the text given as argument. The typing speed is given by "typeSpeed".
        console.log('add - CALLED');
        var count = 0;
        var chars = text.split('');
        console.log('add - chars: ' + chars);
        xthis = this;
        var timeId = setInterval(function(){ 
            if (count < chars.length){
                console.log('add - count: ' + count + ', chars['+count+']: ' + chars[count]);
                $(xthis.tagetSelector).append(String(chars[count])); 
                ++count;
            } else {
                console.log('add - clearInterval');
                clearInterval(timeId);         // Clear the "write timer" timeId
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
        var timeId = setInterval(function(){ 
            if (count < textlen-numOfWordChars+numOfChars){
                console.log('del - count: ' + count);
                text = text.slice(0,-1);
                $(xthis.tagetSelector).html(text); 
                ++count;
            } else {
                console.log('del - clearInterval');
                clearInterval(timeId);         // First, clear the "write timer" timeId
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
    mark : function(text){
        console.log('mark - CALLED');
    }, 
    wait : function(timeout){  // This method waits a number of milliseconds given by the argument "timeout", before the next command/method is executed.
        console.log('wait - CALLED');
        xthis = this;
        setTimeout(function(){ 
            xthis.findCmd(); 
        }, timeout);
    }, 
    findCmd : function(milliSec){  // This method finds the next command in cmdObj and executes it. 
        console.log('findCmd - CALLED');
        xthis = this;
        this.cmdCount = (typeof(this.cmdCount) === 'undefined')? 0 : this.cmdCount + 1;
        if (this.cmdCount < this.cmdObj.length){
            console.log('findCmd - cmdCount: ' + this.cmdCount);
            var cmd = Object.keys(this.cmdObj[this.cmdCount]);
            var arg = this.cmdObj[this.cmdCount][cmd];
            arg = (typeof(arg) === "string")? '"'+arg+'"' : arg;
            console.log('findCmd - eval('+cmd+'('+arg+')'+')');
            eval('this.'+cmd+'('+arg+')');
        }
        console.log('findCmd - cmdCount 2: ' + this.cmdCount);
    },
    startCursorBlink: function() { // This method initiates cursor blink with a "blink speed" given by cursorBlink.
        var xthis = this;
        this.cursorTimer = setInterval(function(){
            $('.cursor').fadeOut(xthis.cursorBlink).fadeIn(xthis.cursorBlink);
        }, xthis.cursorBlink*2);
    }, 
    removeCursor: function(fadeTime){ // This method removes the cursor from the application - the speed by which it is removed is determined by "fadeTime".
    	clearInterval(this.cursorTimer);
    	$('.cursor').fadeOut(fadeTime);
    },
    helper_spaceIndexes: function(str){  // This method is a helper method - it returns an array containing the positions of blank space chars in a string "str" given as argument.
        spaceArr = [];
        var pos = 0; var count = -1;
        while ((str.indexOf(' ', pos) !== -1)) {
            pos = str.indexOf(' ', pos);
            if (pos !== -1) spaceArr.push(pos);
            pos += 1;
        }
        return spaceArr;
    }
}



$(document).ready(function() {

    var DTO = Object.create(dynamicTextClass); 
    // DTO.init('#dynamicText', jsonData);  	// Own data...
    // DTO.init('#dynamicText');  			 	// Demo data...

});

