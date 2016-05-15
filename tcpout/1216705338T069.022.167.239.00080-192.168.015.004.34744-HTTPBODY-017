var initialHiddenLayers = new Array();
var initialShownLayers = new Array();

// Clean up what print stylesheet is selected as subpages change it.
window.onafterprint =
	function () {
  	resetActivePrintStyleSheet();
  };
	  
function addLayerToHideInitially(layerName) {
  initialHiddenLayers[initialHiddenLayers.length] = layerName;
}

function addLayerToShowInitially(layerName) {
  initialShownLayers[initialShownLayers.length] = layerName;
}

function hideLayersOnLoad() {
	if(initialHiddenLayers.length > 0) {
		for(i = 0; i  < initialHiddenLayers.length; i++) {
			if (initialHiddenLayers[i].length > 0) {
                  hideLayer(initialHiddenLayers[i]);
			}
		}
	}
}

function showLayersOnLoad() {
  if(initialShownLayers.length > 0) {
		for(i = 0; i  < initialShownLayers.length; i++) {
			if (initialShownLayers[i].length > 0) {
				if (initialShownLayers[i] == "hdMediaModule") {
					var divObj = $(initialShownLayers[i]);
					divObj.style.visibility = "visible";
					divObj.style.display = "block";
				}
				else {
					if ($(initialShownLayers[i])!=null) {
					var divObj = $(initialShownLayers[i]);
					divObj.style.visibility = "visible";
					divObj.style.display = "inline";
				}
			}
		}
  }
}
}

function displayLayer(layerName, popup) {
	var currentLayer = $(layerName);
	displayLayerAsObj(currentLayer, popup);
}

function hideLayer(layerName) {
	hideRollover(layerName);
}

function hidePopup(layerName) {
	if(is_ie) {
		var shim = $(layerName + "Shim") || $('hdPopupDivShimContainer');
		if(shim != null) {
			shim.style.visibility = "hidden";
			shim.style.display = "none";
		}
	}
	hideLayer(layerName);
}

function defaultWeatherDisplay(unitToShow, unitToHide) {
	var label = "label" + unitToHide;
	hideLayer(label);
	tempDivs = $('hdWeather').getElementsByTagName("div");
	temp = "temp" + unitToShow;
	for(i = 0; i < tempDivs.length; i++) {
		if(tempDivs[i].id.indexOf(temp) != -1) {
			hideLayer(tempDivs[i].id)
		}
	}
}

function changeToCelcius() {
	cmLIVEviewClick(document.location.pathname + '?cm_sp=Layer-_-HotelDetails-_-changeToCelcius', 'sitepromo');
	displayLayer("labelF", false);
	hideLayer("labelC");
	var tempDivs = $('hdWeather').getElementsByTagName("div");
	for(i = 0; i < tempDivs.length; i++) {
		if(tempDivs[i].id.indexOf('tempF') != -1) {
			hideLayer(tempDivs[i].id);
		} else if(tempDivs[i].id.indexOf('tempC') != -1) {
			displayLayer(tempDivs[i].id, false);
		}
	}
}

function changeToFahrenheit() {
	hideLayer("labelF");
	cmLIVEviewClick(document.location.pathname + '?cm_sp=Layer-_-HotelDetails-_-changeToFahrenheit', 'sitepromo');
	displayLayer("labelC", false);
	var tempDivs = $('hdWeather').getElementsByTagName("div");
	for(i = 0; i < tempDivs.length; i++) {
		if(tempDivs[i].id.indexOf('tempF') != -1) {
			displayLayer(tempDivs[i].id, false);
		} else if(tempDivs[i].id.indexOf('tempC') != -1) {
			hideLayer(tempDivs[i].id);
		}
	}
}

/**
 * Show the expandable text.
 */
function showExpandableText(expandableDiv, desiredHeight, moreDiv) {
	var originalHeight = expandableDiv.offsetHeight;
	expandableDivProps[expandableDivProps.length] = new Array(expandableDiv.id, originalHeight, desiredHeight);
	expandableDiv.style.height = desiredHeight;
	expandableDiv.style.overflow = "hidden";

	//Display the more link if the text goes beyond the layer height.
	if(parseFloat(originalHeight) > parseFloat(desiredHeight)) {
		cmLIVEviewClick(document.location.pathname + '?cm_sp=Layer-_-HotelDetails-_-' + moreDiv.id, 'sitepromo');
		displayLayer(moreDiv.id, false);
	}
}

//Array of expandable divs
var expandableDivProps = new Array();

/**
 * Process the expandable text arranged in 2 column layout.
 */
function processExpandableText(leftColumnDivName, rightColumnDivName, moreDivName, lessDivName) {

	var lineHeight;
	var heightMod;
	var columnHeight;
	var maxHeight = 145;

	var leftColumnDiv = $(leftColumnDivName);
	var rightColumnDiv = $(rightColumnDivName);
	var moreDiv = $(moreDivName);

	hideLayer(moreDivName);
	hideLayer(lessDivName);

	if(is_ie) {
		lineHeight = rightColumnDiv.currentStyle.lineHeight;
		fontSize = rightColumnDiv.currentStyle.fontSize;
		heightMod = maxHeight / (parseFloat(lineHeight) * parseFloat(fontSize));
		columnHeight = parseInt(heightMod) * parseFloat(lineHeight) * parseFloat(fontSize);
	} else {
		// rounding numbers for non-IE
		lineHeight = document.defaultView.getComputedStyle(rightColumnDiv,null).getPropertyValue("line-height");
		lineHeight = Math.round(parseFloat(lineHeight));
		heightMod = maxHeight / parseFloat(lineHeight);
		heightMod = Math.round(parseFloat(heightMod));
		columnHeight = parseInt(heightMod) * parseFloat(lineHeight);
	}
	showExpandableText(rightColumnDiv, columnHeight, moreDiv);
}

/**
 * Process the expandable text arranged in 2 column layout for Transport page.
 */
function processExpandableTextForTransport(leftColumnDivName, rightColumnDivName, moreDivName, lessDivName) {

	var rightColumnDiv = $(rightColumnDivName);
	var moreDiv = $(moreDivName);

	hideLayer(moreDivName);
	hideLayer(lessDivName);

	var columnHeight = document.getElementById(leftColumnDivName).offsetHeight - 56 ;	
	if (columnHeight<15) {
		columnHeight = 15;
	}
	showExpandableText(rightColumnDiv, columnHeight, moreDiv);
}

/**
 * Display complete text for the div with expandable text.
 */
function displayMoreText(expandableDivName, moreDivName, lessDivName) {
	var expandableDiv = $(expandableDivName);
	expandableDiv.style.height = expandableDivProps[0][1];
	expandableDiv.style.overflow = "visible";
	hideLayer(moreDivName);
	cmLIVEviewClick(document.location.pathname + '?cm_sp=Layer-_-HotelDetails-_-' + lessDivName, 'sitepromo');
	displayLayer(lessDivName, false);
	columnHeight();
}

/**
 * Display fewer characters for the div with expandable text.
 */
function displayLessText(expandableDivName, moreDivName, lessDivName) {
	var expandableDiv = $(expandableDivName);
	expandableDiv.style.height = expandableDivProps[0][2]
	expandableDiv.style.overflow = "hidden";
	hideLayer(lessDivName);
	cmLIVEviewClick(document.location.pathname + '?cm_sp=Layer-_-HotelDetails-_-' + moreDivName, 'sitepromo');
	displayLayer(moreDivName, false);
	columnHeight();
}

/**
 * Enable/Disable brand checkboxes for custom driving directions.
 */
function changeStateForCustomDirectionBrands(corridorCheckbox) {
	var brandCheckboxArray = document.getElementsByName("brands");
	if(corridorCheckbox.checked) {
		changeObjectsState(brandCheckboxArray, false);
	} else {
		changeObjectsState(brandCheckboxArray, true);
	}
}

function changeObjectsState(obj, disabled) {
	for(i = 0; i < obj.length; i++) {
		if(disabled) {
			obj[i].checked = !disabled;
		}
		obj[i].disabled = disabled;
	}
}

var popupWidth = 500;
var popupHeight = 500;
var popupTitle = null;
var popupTitleTemp = null;

function displayPopup(name, ihgTitle, title, url, queryParams, width, height) {

	popupWidth = width;
	popupHeight = height;
	popupTitle = ihgTitle + " | ";
	popupTitleTemp = popupTitle + title;
	var popupAjax = new Ajax.Request(url,
										{	method: 'get',
											parameters: queryParams,
											onSuccess: showPopup,
											onFailure: showError
										});
}

function displayPopupWithContent(name, ihgTitle, title, content, width, height, cmProjName) {
	popupWidth = width;
	popupHeight = height;
	popupTitleTemp = ihgTitle;
	showPopupWithContent(content, cmProjName);
}

function showError(originalRequest) {
	alert("Error: " + originalRequest.responseText);
}

function showPopup(originalRequest) {

	var content = filterPopupResponse(originalRequest.responseText);
	showPopupWithContent(content);
}

function showPopupWithContent(content, cmProjName) {

	var popupDiv = $('hdPopupDiv');
	var popupContentDiv = $('hdPopupContent');
	var popupTitleDiv = $('hdPopupTitle');
	var popupCloseButton = $('hdPopupCloseBtn');
	var popupHeaderDiv = $('hdPopupHeader');
	
	var popupWidthContainer = parseInt(popupWidth);
	
	popupHeaderDiv.style.width = popupWidthContainer;
	popupTitleDiv.innerHTML = popupTitleTemp;
	popupTitleDiv.style.overflow = "hidden";
	popupTitleDiv.style.whiteSpace = "nowrap";
	popupTitleDiv.style.width = parseInt(popupWidth)-65;

	var popupHtml = content;
	popupCloseButton.style.visibility = "visible";
	popupCloseButton.style.display = "inline";
    	popupCloseButton.style.left = ((popupWidth)/2)-56;

	popupContentDiv.style.width = popupWidth-20;
	popupContentDiv.style.height = parseInt(popupHeight)-40;
	var popupBorderDiv = $('hdPopupBorder');
	popupBorderDiv.style.width = popupWidthContainer;
	popupBorderDiv.style.height = parseInt(popupHeight)+20;

	popupContentDiv.innerHTML ="<div id='hdPopupContentContainer' style='font-weight:normal; width:96%; align:center;'>"+ popupHtml+"</div>";

	popupDiv.style.display = "block";
	var windowSize = getWindowSize();
	var scrollXY = getScrollXY();
	popupDiv.style.width = popupWidthContainer;
	//popupDiv.style.left = ((windowSize[0] - popupWidth ) / 2) + scrollXY[0];
	popupDiv.style.left = "210px";
	popupDiv.style.top = ((windowSize[1] - popupHeight) / 2) + scrollXY[1];
	popupDiv.style.zIndex = 100;

	var cmProjName = (cmProjName == null) ? "HotelDetails" : cmProjName;	
	cmLIVEviewClick(document.location.pathname + '?cm_sp=Layer-_-' + cmProjName + '-_-' + popupTitleTemp, 'sitepromo');
	displayLayer('hdPopupDiv', true);
	
	if(is_opera)
	{	
		popupBorderDiv.style.width = popupWidthContainer-2;
		
		popupTitleDiv.style.marginBottom= "-4px";


	}
}


var closeWinRegex = new RegExp("<a href=\"#\" onClick=\"window.close\\(\\);\">[a-zA-Z\\s]*</a>", "gi");

function filterPopupResponse(response) {

	var indexOfBody = response.indexOf("<body");
	if(indexOfBody > 0) {
		response = response.substring(indexOfBody + 6);
	}
	var indexOfEndBody = response.indexOf("</body>");
	if(indexOfEndBody > 0) {
		response = response.substring(0, indexOfEndBody);
	}
	//Remove Close Links
	response = response.replace(closeWinRegex, " ");
	return response;
}

function getWindowSize() {
	var myWidth = 0, myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	return [myWidth, myHeight];
}

function getScrollXY() {
	var scrOfX = 0, scrOfY = 0;
	if( typeof( window.pageYOffset ) == 'number' ) {
		//Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	}
	return [ scrOfX, scrOfY ];
}

function getElement(name) {
	return $(name);
}

// resets the print css values
function resetActivePrintStyleSheet() {
    var i, a, main;
    for (i=0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("media") && a.getAttribute("media").indexOf("print") != -1) {
            a.disabled = true;
            if (is_ie) {
              a.removeAttribute('media');
              a.setAttribute('media', 'print_js_only');
            }
        }
    }
}
  
// Set the active style print sheet by its title.
function setActivePrintStyleSheet(title) {
		var i, a, main;
		for (i=0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && a.getAttribute("media") && a.getAttribute("media").indexOf("print_js_only") != -1) {             
            a.disabled = true;
            if (is_ie) {
            	a.removeAttribute('rel');
            }
            if (a.getAttribute("title") == title) {
                a.disabled = false;
                if (is_ie) {
                	a.setAttribute('rel', 'stylesheet');
                	a.setAttribute('media', 'print');
                }
            } else if (is_ie) {
              	a.setAttribute('rel', 'alternate stylesheet');
              	a.setAttribute('media', 'print_js_only');
            }
        }
    }
}

function printWithAltStyleSheet(title) {
	setActivePrintStyleSheet(title);
  window.print();
}

//Custom driving directions checkboxes.
function checkDirectionsBrandCheckboxState() {
	changeStateForCustomDirectionBrands($('corridorSearch'));
}

//Changes the height of the left and right nav based on main content height
function columnHeight() {
	// HD2
	if (document.getElementById('hdMainContent')!=null && document.getElementById('hdMainContent')!= 'undefined') {
	var centerHeight = (document.getElementById('hdMainContent').offsetHeight);
	var leftColumnHeight = (document.getElementById('hdLeftNav').offsetHeight);
	
	if (leftColumnHeight >= centerHeight) {
		document.getElementById('hdLeftNav').style.height = leftColumnHeight + 75;
		document.getElementById('hdRightNav').style.height = leftColumnHeight + 75; 
		//Design footer is hidden always, Javascript is required for display
		if (document.getElementById('hdDesignFooter')!=null) {
			document.getElementById('hdDesignFooter').style.visibility = 'visible';
			document.getElementById('hdDesignFooter').style.top = leftColumnHeight + 238;
		}

	 }
	 else {
		document.getElementById('hdLeftNav').style.height = centerHeight + 75;
		document.getElementById('hdRightNav').style.height = centerHeight + 75; 
		//Design footer is hidden always, Javascript is required for display
		if (document.getElementById('hdDesignFooter')!=null) {
			document.getElementById('hdDesignFooter').style.visibility = 'visible';
			document.getElementById('hdDesignFooter').style.top = centerHeight + 238;
		}	 
	 }
}	// CP MEETINGS
	else if (document.getElementById('center')!=null && document.getElementById('center')!= 'undefined') {
		var centerHeight = (document.getElementById('center').offsetHeight);
		var leftColumnHeight = (document.getElementById('left').offsetHeight);

		if ( leftColumnHeight < centerHeight )
		{
			document.getElementById('left').style.height = centerHeight;
			document.getElementById('right').style.height = centerHeight;
		}
	}
}
//Matches the height of the At A Glance and Whats Nearby consoles on the HD2 Welcome Page
function welcomeComponentsColumnHeight() {
	// HD2
	if (document.getElementById('hdWhatsNearbyComponentList')!=null && document.getElementById('hdWhatsNearbyComponentList')!= 'undefined' && document.getElementById('hdAtAGlanceComponentList')!=null && document.getElementById('hdAtAGlanceComponentList')!= 'undefined')
	{
	var atAGlanceHeight = (document.getElementById('hdAtAGlanceComponentList').offsetHeight);
	
	var whatsNearbyHeight = (document.getElementById('hdWhatsNearbyComponentList').offsetHeight);
	
	if (whatsNearbyHeight >= atAGlanceHeight) {
		document.getElementById('hdAtAGlanceComponentList').style.height = whatsNearbyHeight;
	 }
	 else {
		document.getElementById('hdWhatsNearbyComponentList').style.height = atAGlanceHeight;
		}	 
	 }
}

//Changes the size of right module equal to left module size
function fixHeight(left,right) {
   if (document.getElementById(left)!=null) {
      var leftHeight=document.getElementById(left).offsetHeight ;
      document.getElementById(right).style.height= leftHeight ;		
    }
}

function expandHeight(outerDivName,expandableDivName){
   var outerDiv=$(outerDivName);
   var expandableDiv=$(expandableDivName);
   outerDiv.style.height='100%';
   expandableDiv.style.height='100%';
 }

