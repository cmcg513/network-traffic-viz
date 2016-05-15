
function DOMSwitcher(elemArray,form,field){
	// set up array to 1. init 2. toggle multi-switched elements
	// should report which is currently selected 
	// assumes radio switcher. 
	this.elemArray=elemArray;
	this.formName=form;
	this.togglefield=field;
	this.toggle=function(id){
		for(var ct=0;ct<this.elemArray.length;ct++){
			if(this.elemArray[ct]!=id){
				hideElement(this.elemArray[ct]);
				document.getElementById(elemArray[ct]+"Label").style.fontWeight="normal";
				document.getElementById(elemArray[ct]+"Radio").checked=false;
			}
		}
		showElement(id);
		document.getElementById(id+"Label").style.fontWeight="bold";
		document.getElementById(id+"Radio").checked=true;
		// sets value of hidden field telling request handler the state of the form.
		document.forms[this.formName].elements[this.togglefield].value=id;
		// toggles display of neighborhood select menu 
	}
}


function initDomSwitcher(){
	var domSwitcher=new DOMSwitcher(new Array("address","airport","standard"),'hotelOrbot','formState');
	var showHoods = false;
}

function executeSearch(elem){
	if(elem.value!='Enter city or point of interest...' && elem.value!=undefined){/* don't search if no value has been placed in input field */
		var URL_TARGET="/App/PerformNeighborhoodSearch?keyword="+elem.value;
		window.frames['iframe_select'].location.href=URL_TARGET;
	}
}