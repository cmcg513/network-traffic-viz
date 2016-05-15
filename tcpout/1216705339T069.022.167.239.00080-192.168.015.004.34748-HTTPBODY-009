//
// This Javascript file contains several methods for working with layers and rollovers.
// Since proj_user_reviews (8/25/2006)
//
  //
	// Detect browser
	//
	var agt=navigator.userAgent.toLowerCase();
	var appVer = navigator.appVersion.toLowerCase();
	var is_opera = (agt.indexOf("opera") != -1);
	var is_ie = (appVer.indexOf('msie') != -1) && (!is_opera);

  // ========================================================
  // Layer methods
  // ========================================================

	function hideLayerByName(layerName) {
		var divObj = document.getElementById(layerName);
		divObj.style.visibility = "hidden";
		divObj.style.display = "none";
	}

	function displayLayerByName(layerName, popup) {
		displayLayerAsObj(document.getElementById(layerName), popup);
	}

	function displayLayerAsObj(divObj, popup) {
		if(popup == true) {
			divObj.style.zIndex = 100;
			if(is_ie) {
				var shim = document.getElementById(divObj.id + "Shim") || document.getElementById('hdPopupDivShim');
				if(shim != null) {
					shim.style.width = divObj.offsetWidth;
					shim.style.height = divObj.offsetHeight;
					shim.style.left = divObj.style.left;
					shim.style.top = divObj.style.top;
					shim.style.zIndex = divObj.style.zIndex - 1;
					shim.style.visibility = "visible";
					shim.style.display = "inline";
				}
			}
		}
		divObj.style.visibility = "visible";
		divObj.style.display = "inline";
	}

  /****************************************************************************************
   **   Objekt Dimension                                                                 **
   ** From: http://www.experts-exchange.com/Web/Web_Languages/JavaScript/Q_21128638.html **
   **                                                                                    **
   **   Takes the element passed in and finds its absolute position on the page relative **
   **   to the upper left position of the document.                                      **
   ****************************************************************************************/
	function Dimension(element) {
	     this.x=-1;
	     this.y=-1;
	     this.w=0;
	     this.h=0;
	     if (element==document){
	          this.x=element.body.scrollLeft;
	          this.y=element.body.scrollTop;
	          this.w=element.body.clientWidth;
	          this.h=element.body.clientHeight;
	     }else if (element!=null){
	          var e=element;
	          var left=e.offsetLeft;
	          while ((e=e.offsetParent)!=null) {
	               left+=e.offsetLeft;
	          }
	          var e=element;
	          var top=e.offsetTop;
	          while((e=e.offsetParent)!=null) {
	               top+=e.offsetTop;
	          }
	          this.x=left;
	          this.y=top;
	          this.w=element.offsetWidth;
	          this.h=element.offsetHeight;
	     }
	}

	// WARNING: This positions itself relative to the entire page - if you need to move
	//          an object relative to another, then you should use another method or
	//          modify this to be able to determine which one is being asked for.
	var offset = 10;
	function displayLayerAtPosition(event, layerName, popup, layerPosition) {
		displayLayerAtPosition(event, layerName, popup, layerPosition, "HotelDetails");
	}
	
	function displayLayerAtPosition(event, layerName, popup, layerPosition, cmProjName) {
		var divObj = document.getElementById(layerName);
		// Get absolute position of object that received event on the page and offset it.
		var eventObjSrc = (event.srcElement) ? event.srcElement : event.target;
		var objPos = new Dimension(eventObjSrc);
		var tempX = objPos.x+offset;
		var tempY = objPos.y+objPos.h;

		divObj.style.position = "absolute";
		if(layerPosition == "topLeft") {
			divObj.style.top = tempY+eventObjSrc.clientHeight;
			divObj.style.left = tempX;
		} else if(layerPosition == "topRight") {
			divObj.style.top = tempY+eventObjSrc.clientHeight;
			divObj.style.left = (tempX-(divObj.offsetWidth));
		} else if(layerPosition == "topMiddle") {
			divObj.style.top = tempY+eventObjSrc.clientHeight;
			divObj.style.left = (tempX-((divObj.offsetWidth)?(divObj.offsetWidth/2):0));
		} else if(layerPosition == "middleLeft") {
			divObj.style.top = (tempY-((divObj.offsetHeight)?(divObj.offsetHeight/2):0));
			divObj.style.left = tempX;
		} else if(layerPosition == "middleRight") {
			divObj.style.top = (tempY-((divObj.offsetHeight)?(divObj.offsetHeight/2):0));
			divObj.style.left = (tempX-(divObj.style.width));
		} else if(layerPosition == "bottomLeft") {
			divObj.style.top = (tempY-objPos.h-((divObj.offsetHeight)?divObj.offsetHeight:0));
			divObj.style.left = tempX;
		} else if(layerPosition == "bottomRight") {
			divObj.style.top = (tempY-objPos.h-((divObj.offsetHeight)?divObj.offsetHeight:0));
			divObj.style.left = (tempX-(divObj.style.width));
		} else if(layerPosition == "bottomMiddle") {
			divObj.style.top = (tempY-objPos.h-((divObj.offsetHeight)?divObj.offsetHeight:0));
			divObj.style.left = (tempX-((divObj.offsetWidth)?(divObj.offsetWidth/2):0));
		} else if (parseInt(layerPosition)!= 'NaN') {
			tempY = tempY - layerPosition;
			divObj.style.top = tempY;
			divObj.style.left = tempX;
		}

		cmLIVEviewClick(document.location.pathname + '?cm_sp=Layer-_-' + cmProjName + '-_-' + layerName, 'sitepromo');

		displayLayerAsObj(divObj, popup);
	}

  // ========================================================
  // Rollover methods
  // ========================================================

  // Create a container for holding all rollovers
  var rolloverContainerName = "hdGeneralRolloverContainer";
  var rolloverContainer = document.createElement("div");
  rolloverContainer.id = rolloverContainerName;
  rolloverContainer.style.zIndex = "500";

	function hideRollover(layerName) {
		rolloverContainer.style.visibility = "hidden";
		rolloverContainer.style.display = "none";
		hideLayerByName(layerName);
	}
	  
	function displayRollOverContentFromElement(event, divId, contentElementId, width, layerPosition, srcPage) {
		displayRollOverContent(event, divId, document.getElementById(contentElementId).innerHTML, width, layerPosition, srcPage);
	}

	function displayRollOverContent(event, divId, content, width, layerPosition, srcPage) {
  	displayRollOverContent(event, divId, content, width, layerPosition, srcPage, "HotelDetails");
  }
  
	function displayRollOverContent(event, divId, content, width, layerPosition, srcPage, cmProjName) {
	  var divObj = rolloverContainer;
	  // Test to see if this has already been added to the document. If not, add it.
	  if (!( document.getElementById(rolloverContainerName) )) {
  	    document.body.appendChild(rolloverContainer);
	  }

	  var shimId = divId+'Shim';
	  var srcPageVal = srcPage;
	  var contentDivId = divId+'ContentDivId';
	  var innerHtmlContent = '<div id="'+contentDivId+'" style="position:absolute;z-index:500;">';
	  innerHtmlContent += '<table width='+width+' cellpadding=6 cellspacing=0 border=1 >';
	  innerHtmlContent += '<tr> <td class="hdRollOver rollOverContent"> ';
	  innerHtmlContent += content;
	  innerHtmlContent += '</td> </tr> </table></div>';
	  innerHtmlContent += getAnIframeShim(shimId, srcPageVal);
	  divObj.innerHTML = innerHtmlContent;
	  divObj.style.width = width;

	  // Have to display the object so that the height can be calculated.
	  displayLayerAsObj(divObj, false);
	  divObj.style.height = document.getElementById(contentDivId).offsetHeight;

	  displayLayerAtPosition(event, rolloverContainerName, false, layerPosition, cmProjName);
	  if (!is_opera) {
	  	positionShimUnderDiv(contentDivId, shimId);
	  }
	}

  function getAnIframeShim(frameId, srcPage) {
	  return '<iframe id="'+frameId+'" src="'+srcPage+'" scrolling="no" frameborder="0" style="position:absolute; top:0px; left:0px; display:none;"></iframe>';
  }

	function positionShimUnderDiv(divId, shimId) {
		var DivRef = document.getElementById(divId);
		var IfrRef = document.getElementById(shimId);
		IfrRef.style.width = DivRef.offsetWidth;
		IfrRef.style.height = DivRef.offsetHeight;
		IfrRef.style.top = DivRef.style.top;
		IfrRef.style.left = DivRef.style.left;
		IfrRef.style.zIndex = DivRef.style.zIndex - 1;
		IfrRef.style.display = DivRef.style.display;
	}