var theTipHider = '';
var canSearch = true;
var sId = 0;
var nId = 0;
var selectedToolTipIndex = "";
var oldSelectedToolTipIndex = "";
var prevNid = 0;
var amFilterDivs = new Array('amFilter','amFilterNotch','pick');
var prev;
var noMatrixSearchLoc;
var matrixClick = false;
var numberStars;
var lastRowIndex= 0;
var prevNCell = -1;
var prevCell = -1;

function declareHotelMatrixVars(){
	prev = new Array("n0s0","n0s1","n0s2","n0s3","n0s4","n0s5");
	//prev = new Array();
	prevCss = new Array();
	if(isMatrix) {
		for (var a = 0; a < prev.length; a ++) {
			var workingCss = document.getElementById(prev[a]).className;
			if (workingCss.indexOf("selectedRH") != -1) {
				//is a row header
				workingCss = workingCss.replace(" selectedRH", "");
			} else if (workingCss.indexOf("selectedCH") != -1 ) {
				//is a col header
				workingCss = workingCss.replace(" selectedCH", "");
			}
			prevCss[a] = workingCss;
		}
	}
	
	if(!isFramelessHotelResultSet){
		res = new subFrame("resultsFrame");
	}
	if(isHoodMatrix){
		if(!isFramelessHotelResultSet){
			map = new subFrame("mapFrame");
		}
		hip = top.document.getElementById("hotelInfo");//Hotel info popup
		selHotel = top.document.getElementById("selectedHotelInfo");//Selected hotel
	}
}

function subFrame(id) {
	if(useFrames){
		this.id = id;
		this.ifr = parent.document.getElementById(id);
		this.doc = top.frames[id].document;
		this.hasLoaded = false;
	}
}

function changeNIB() {
	if (nId == "0" || nId == lastRowIndex) {
		hideElements("neighborInfo","cityView","mapLegend");
		showElements("allNeighborInfo","nhoodMapLegend");
		showElements("mapArea");
	} else {
		hideElements("allNeighborInfo");
		hideElements("mapArea");
		for (var i = 0; i < allHoods.length; i ++) {
			hideElements("desc" + i);
		}
		showElements("desc" + nId);
		showElements("neighborInfo","cityView", "mapLegend");
		hideElements("nhoodMapLegend");
		
		if (allHoods[nId]) { //if not "other areas"
			// top.document.getElementById("mapSubHeading").innerHTML = allHoods[nId]
			// showElements("mapSubHeading");
		} else {
			hideElements("mapSubHeading","cityView","neighborInfo","mapLegend");
			showElements("allNeighborInfo","nhoodMapLegend");
			showElements("mapArea");
		}
	}
}

function hotelSumInfo(name,price,stars,divId) {
	this.name = name;
	this.price = price;
	this.stars = stars;
	this.divId = divId;
}

function _hover(event, contentString) {
	Novo.Microcontent.activate(event,{content:{string:contentString}, options:{headerless:'true'}});
}

function _click(event,index,selectTab) {
	Novo.Microcontent.destroy(); 
	return selectResultSet('n' + index + 's0','map',selectTab);
}

var selIconMouseoverHandler = null;
function selectHotel(id, mapAreaIdx) {
	if(useFrames && !isFramelessHotelResultSet){
		mapFrameRef = top.frames["mapFrame"];
		resultFrameRef = top.frames["resultsFrame"];
	} else {
		mapFrameRef = top;
		resultFrameRef = top;
	}
	var toolTip = mapFrameRef.toolTips[id];
	var selIcon = mapFrameRef.document.getElementById("selectedIcon");
	Element.extend(selIcon);
	selectedToolTipIndex = id;
	
	if (isFramelessHotelResultSet) {
		if(selIconMouseoverHandler != null) {
			Event.stopObserving (selIcon, 'mouseover', selIconMouseoverHandler);
		}
		
		selIconMouseoverHandler = _hover.bindAsEventListener(Novo.Microcontent, popNeighborhoodHotelInfo(Number(mapAreaIdx)));
		Event.observe(selIcon, 'mouseover', selIconMouseoverHandler);
	} else {
		selIcon.onmouseover = function() {
			mapFrameRef.popHotelInfo( Number(mapAreaIdx) );
		};
			
		selIcon.onmouseout = function() {
			top.hideToolTip(250,this.id);
		};
	}

	changeCss("numIcon" + id, "selected");
	
	// change the current selected tooltip icon back to what it was
	if (oldSelectedToolTipIndex != "" && oldSelectedToolTipIndex != id) {
		if (document.getElementById("numIcon" + oldSelectedToolTipIndex)) {
			changeCss("numIcon" + oldSelectedToolTipIndex, "numIcon " + mapFrameRef.toolTips[oldSelectedToolTipIndex].availability);
		}
	}
	
	oldSelectedToolTipIndex = id;
	
	hideElements("selectedHotel");
	selHotel.innerHTML = '';
	selHotel.innerHTML = resultFrameRef.document.getElementById('hotelProperty' + id).innerHTML;

	if (typeof hotelDetailsLightbox != 'undefined') {
		hotelDetailsLightbox.attachTriggers([selHotel]);
	}
	selIcon.innerHTML = Number(id);
	showElements("selectedHotel","selectedIcon");
	var mf = mapFrameRef.document.getElementById("mapFrame");
	var toY = 0;
	toY = parseFloat(toolTip.y) - 10;
	/*
	the following entirely ugly bit of code exists because setElementPosition calls a method that ignores relative/absolute positioning
	as it tries to figure out exactly where to put an element. The result is that when the map is displayed on a page without frames, it adds the height of topnav
	to the absolute position of the selected hotel icon (which it should not) AND it fails to account for the space above the map itself in the div id="mapFrame"
	
	*/
	if(!useFrames && !isFramelessHotelResultSet) {
		tn = document.getElementById("topnav");
		if(tn) {
			tnh = tn.offsetHeight;
			mfh = mf.offsetHeight;
			mfi = mf.getElementsByTagName("img")[0];
			if(mfi) {
				mfih = mfi.height;
				toY = toY - tnh + mfh - mfih;
			}
		}
	} else if(isFramelessHotelResultSet && mapAjax) {
		tn = document.getElementById("body");
		if(tn) {
			tnh = 0;
			if(mapPlot) {
			tnh = getElementPosition(tn).top;
			}
			toY = toY - tnh;
		}
	}
	top.setElementPosition(selIcon, mf, parseFloat(toolTip.x) - 10, toY );
	window.scrollTo(0,getElementPosition(top.document.getElementById("mapFrame")).top);
	if(document.getElementById('unavailableHotel')){hideElement('unavailableHotel');}
	return false;
}


Event.observe(window, 'load', function() {
	if(nId>=0 && sId>=0 && nId != null && sId != null ){
		changeMapLabel('n'+nId+'s'+sId);
		disableClick('n'+nId+'s'+sId);
	}
});

//added this function for UIC-277
function changeMapLabel(id){
	if(canSearch && $(id) != null){
		var colIndex = id.substring(id.indexOf("n")+1,id.indexOf("s"))
		var rowIndex = id.substring(id.indexOf("s")+1,id.length).strip();
		var mapLabel = null;
		
		if((colIndex>=0) && (rowIndex==0))	{
			mid = id + 'Clickable';
			if($(mid) != null){
				mapLabel = $(mid).innerHTML.stripTags().strip();
				if(colIndex == 0) mapLabel = mapLabel.substring(0,mapLabel.indexOf("(")); 
				if(mapLabel.strip() == "All other areas"){
					mapLabel = $('n0s0Clickable').innerHTML.stripTags().strip();
					mapLabel = mapLabel.substring(0,mapLabel.indexOf("(")); 
				}
			}			
		}
		else if((colIndex>0) && (rowIndex>0)){
			var headerID = 'n'+colIndex+'s0Clickable';
			if($(headerID) != null){
				mapLabel = $(headerID).innerHTML.stripTags().strip();
				if(mapLabel.strip() == "All other areas"){
					mapLabel = $('n0s0Clickable').innerHTML.stripTags().strip();
					mapLabel = mapLabel.substring(0,mapLabel.indexOf("(")); 
				}
			}
		}
		else if((colIndex==0) && (rowIndex>0)){
			if($('n0s0Clickable') != null) {
				mapLabel = $('n0s0Clickable').innerHTML.stripTags().strip();
				mapLabel = mapLabel.substring(0,mapLabel.indexOf("(")); 
			}
		}
		
		if((rowIndex >= 0) && (colIndex >= 0) && (mapLabel != null)){	
			$$('#hotelMapAndMatrixContainer #mapMatrix h3').invoke('replace','<h3>'+mapLabel+'</h3>');
		}
		
		//Recalculate mover & obstacle positions since their y position would have changed by overwriting mapLabel 
		if(typeof botFloatFlyoutObject != 'undefined') {
			botFloatFlyoutObject.calculateMoverPositions();
			botFloatFlyoutObject.calculateObstaclePositions();
		}
	}
}


function disableClick(id){
	if(($(id) ==  null) || ($(id + 'UnClickable') == null) || ($(id + 'Clickable') == null))
		return;
	
	//Commenting out for UIC-2071 as document.getElementsByClassName is taking a long time to execute - skrishnappa
	//$$('td.notclickable').invoke('removeClassName','notclickable');
	//document.getElementsByClassName('notclickable').invoke('removeClassName','notclickable');
	//$(id).addClassName('notclickable');
	
	$(id + 'UnClickable').removeClassName('inactive');
	$(id + 'UnClickable').addClassName('active');
	$(id + 'Clickable').removeClassName('active');
	$(id + 'Clickable').addClassName('inactive');

	$(id).setStyle({
		cursor: 'default'
	});
}

function selectStarResultSet(id,clkLoc,tabName) {
	setResultIds(id);
	var resultsURL = "/App/PerformHotelSort?selectColumn=" + parseFloat(parseFloat(sId) + 1) + "&selectRow=" + parseFloat(parseFloat(nId) + 1) + "&origin=hotel.results.PerformHotelRateRequests.INSIDEMATRIX";
	resultsURL += "&jspTarget=resultSet" + "&tabStyleId=" + id + "&tabName=" + tabName + "&interactionSource=" + clkLoc + "&skipRateRequest=on";
	top.location.href = resultsURL;
}

function selectResultSet(id,clkLoc,tabName) {//tabName is optional, but should be used for matrix, map, and sort clicks
	if($(id) != null && $(id).hasClassName('selectedCH') && clkLoc == 'matrixRowHeader')
		return;
	
	if($(id) != null && id == 'n0s0' && $(id).hasClassName('selectedCRH') && clkLoc == 'matrix' )
		return;

	if($(id) != null && $(id).hasClassName('notclickable') && clkLoc != "sortTab")
		return;
	
	if (checkSearch()) {
	
		//added this line for UIC-151
		if($(id) != null && $(id).hasClassName('colheader'))
			Element.scrollTo('mapMatrix');	

		setResultIds(id);
		if(tabName != null) {
            changeSortTab(tabName);
		}
		
		if(!matrixClick){hideElements("selectedHotel", "selectedIcon");}
		top.selectedToolTipIndex = "";
		top.oldSelectedToolTipIndex = "";
		if(!isDateless && !isFloatChangeSearch){
			hideAmFilter();
		}
		var toScroll = true;
		if (clkLoc == "matrix"){
				toScroll = false;
				matrixClick = true;
				sortTabs=false;
				hideElement('selectedHotel');
		}
		if (clkLoc == "matrixRowHeader"){
				toScroll = false;
				matrixClick = false;
				sortTabs=false;
				hideElement('selectedHotel');
				var clkLoc = "matrix";
		}		
		hiLiMatrix(id,toScroll);
		if(isHoodMatrix){
			changeNIB();
		}
		if (clkLoc != 'auto'){
			var resultsURL = "/App/PerformHotelSort?selectColumn=" + parseFloat(parseFloat(sId) + 1) + "&selectRow=" + parseFloat(parseFloat(nId) + 1) + "&origin=hotel.results.PerformHotelRateRequests.INSIDEMATRIX";
			if (clkLoc == "prevPage" || clkLoc == "nextPage") {
					resultsURL +=  "&" + clkLoc + "=true";
					matrixClick = false;
			}  else {
				resultsURL += "&tabName=" + tab + "&interactionSource=" + clkLoc;
			}
			if(useFrames){
				coverMap();
				findingTxt = '<span class="finding">Finding:</span><span class="findingTxt">&nbsp;';
				if(sId != 0){
				findingTxt += sId + '-star ';
				}
				findingTxt += 'properties ';
				if(hasSelectedChains){
					findingTxt += selectedChain;
				}
				if(!isHoodMatrix || (isHoodMatrix && nId == 0)) {
				findingTxt += 'located ';
				}
				if(isHoodMatrix){
					findingTxt += 'in ';
					findingTxt += allHoods[nId].replace('<br>','');
				} else {
					findingTxt += (allHoods[nId] + noMatrixSearchLoc.replace('','<br>'));
				}
				if(hasNameContains){
					findingTxt += nameContains;
				}
				findingTxt += '</span>';
				document.getElementById('finding').innerHTML = findingTxt;
				showIntrastitial();
				canSearch = false;
				resultsURL += "&jspTarget=resultSet";
				if (clkLoc == "prevPage" || clkLoc == "nextPage" || clkLoc == "viewAll") {
					window.scrollTo(0,getElementPosition(top.document.getElementById("maptop")).top);
					if(document.getElementById('unavailableHotel')){hideElement('unavailableHotel');}
				}
				
				if (isFramelessHotelResultSet) {
					disableClick(id);
					resultsURL += "&framelessHotelResultSet=true";
					new Ajax.Updater('resultsFrame', resultsURL, {method:'post', evalScripts: true, onSuccess: handleExceptions, onFailure: handleAjaxFaliure});	
				} else {
					loadIframe("resultsFrame",resultsURL);
				}
			} else {
				noEA();
				canSearch = false;
				top.location.href = resultsURL;
			}
			return false;
		}
	}
}

function coverMap() {
	if(isHoodMatrix){
		if (!((!allHoods[nId] && prevNid == 0) || (!allHoods[prevNid] && nId == 0) || (nId == 0 && prevNid == 0))) {
			setElementPosition(document.getElementById("mapOver"),document.getElementById("mapFrame"),0,0);
			showElements('mapOver');
		}
	}
}

function hiLiMatrix(id,toScroll) {
	var isInvertedMatrix = document.getElementById('isInvertedMatrix') != null && document.getElementById('isInvertedMatrix').value == 'true';
	
	if(isMatrix){
		//remove the hovering color of cell in case of inverted neighborhood matix
		if (document.getElementById(id).className.indexOf("hoverCell") != -1 || document.getElementById(id).className.indexOf("hoverRowHeader") != -1 || document.getElementById(id).className.indexOf("hoverColHeader") != -1){
			hoverResultMatrix(id,'mouseout');
		}
		//Reset previous to unselected state
		for (var p = 0; p < prev.length; p ++) {
			document.getElementById(prev[p]).className = prevCss[p];
		}

		var specN = false;
		var specS = false;
		if (id.lastIndexOf("n0s") == -1) {
			specN = true;
		}
		if (id.lastIndexOf("s0") == -1) {
			specS = true;
		}
		
		
		//Added for UIC-780 to link and unlink cells - skrishnappa
		if (prevNCell != -1 || prevCell != -1) {
			var prevUnlinkCell = prevNCell;
			if (prevCell != -1)
				prevUnlinkCell = prevCell;
		
			if(botMgr.hasClass(document.getElementById(prevUnlinkCell+"Clickable"), "inactive") && botMgr.hasClass(document.getElementById(prevUnlinkCell+"UnClickable"), "active")) {
				botMgr.swapClasses(document.getElementById(prevUnlinkCell+"Clickable"), "inactive", "active");
				botMgr.swapClasses(document.getElementById(prevUnlinkCell+"UnClickable"), "active", "inactive");
				prevNCell = -1;
				prevCell = -1;
			}
		}
		
		//SINGLE CELL
		if (specN && specS) {
			if (isInvertedMatrix) {
				var selectedCellRow = 'n0s'+sId; 
				var selectedCellCol = 'n'+nId+'s0';
			} else {
				var selectedCellRow = 'n'+nId+'s0';
				var selectedCellCol = 'n0s'+sId;
			}
			
			prev = new Array(id,selectedCellCol,selectedCellRow);
			prevCss = new Array(document.getElementById(prev[0]).className,document.getElementById(selectedCellCol).className,document.getElementById(selectedCellRow).className);

			if (document.getElementById(id).className.indexOf("selected") == -1) {
				document.getElementById(id).className = document.getElementById(id).className + " selected";
				document.getElementById(selectedCellCol).className = document.getElementById(selectedCellCol).className + " selectedCH";
				document.getElementById(selectedCellRow).className = document.getElementById(selectedCellRow).className + " selectedRH";
			}
			if (toScroll) {
				scrollMatrix(id);
			}
		//ALL AREAS (ALL STARS)
		} else if (!specN && !specS){
			prev = new Array("n0s0","n0s1","n0s2","n0s3","n0s4","n0s5");
			prevCss = new Array();
			for (var i = 0; i < prev.length; i++) {
				prevCss[i] = document.getElementById(prev[i]).className;
			}		

			for (var a = 0; a < prev.length; a ++) {
				if (document.getElementById(prev[a]).className.indexOf("selected") == -1) {
					//element not already selected
					if (document.getElementById(prev[a]).className.indexOf("rowHeader") != -1 && document.getElementById(prev[a]).className.indexOf("colHeader") != -1) {
						//is the all areas and all stars cell
						document.getElementById(prev[a]).className = document.getElementById(prev[a]).className + " selectedCRH";	
					} else if (document.getElementById(prev[a]).className.indexOf("rowHeader") != -1) {
						//is a row header
						//document.getElementById(prev[a]).className = document.getElementById(prev[a]).className + " selectedRH";
					} else if (document.getElementById(prev[a]).className.indexOf("colHeader") != -1) {
						//is a column header and being selected for default matrix (but not the inverted matrix)
						if (isInvertedMatrix) {
							document.getElementById(prev[a]).className = document.getElementById(prev[a]).className + " selectedCH";
						}
					} else {
						//is a cell
						document.getElementById(prev[a]).className = document.getElementById(prev[a]).className + " selected";
					}
				}
				//changeCss(prev[a],prevCss[a] + "Sel");
			}
			scrollMatrix('n1s0');
		//STAR HEADER OR NEIGBORHOOD HEADER CLICKED
		} else {
			prev = new Array();
			prevCss = new Array();
			var n = 0;
			var nCell = "n" + nId + "s";
			var sCell = "s" + sId;
			var matchId = nCell;

			if (specS) {  //stars clicked
				prev[n] = id;
				prevCss[n] = document.getElementById(id).className;
				n ++;
				matchId = sCell;
			}
			var cells = document.getElementsByTagName("td");
			for (var i = 0; i < cells.length; i ++) {
				if (cells[i].id.lastIndexOf(matchId) != -1) {
					prev[n] = cells[i].id;
					prevCss[n] = document.getElementById(prev[n]).className;
					if (document.getElementById(prev[n]).className.indexOf("selected") == -1) {
						//element not already selected
						if (document.getElementById(prev[n]).className.indexOf("rowHeader") != -1) {
							//is a row header
							document.getElementById(prev[n]).className = document.getElementById(prev[n]).className + " selectedRH";
						} else if (document.getElementById(prev[n]).className.indexOf("colHeader") != -1) {
							//is a column header
							document.getElementById(prev[n]).className = document.getElementById(prev[n]).className + " selectedCH";
						} else {
							//is a cell
							document.getElementById(prev[n]).className = document.getElementById(prev[n]).className + " selected";
						}
					}
					//document.getElementById(prev[n]).className = prevCss[n] + "Sel";
					n ++;
				}
			}
						
			if (specN && toScroll) { //scroll to selected neighborhood
				scrollMatrix(id);
			}
		}
		
		//Added for UIC-780 to link and unlink cells
		if (!(!specN && specS)) { // For Non Star Row Clicks
			if (botMgr.hasClass(document.getElementById(id+"Clickable"), "active") && botMgr.hasClass(document.getElementById(id+"UnClickable"), "inactive")) {
				if (specN && specS)  {
					prevCell = id;
				} else {
					prevNCell = id;
				}
				
				botMgr.swapClasses(document.getElementById(id+"Clickable"), "active", "inactive");
				botMgr.swapClasses(document.getElementById(id+"UnClickable"), "inactive", "active");
			}
		}
	}
}

function checkSearch() {
	if (canSearch) {
		return true;
	} else {
		alert("Your previous hotel search request is still being processed. \n Please wait before submitting a new request.")
		return false;
	}
}

function setResultIds(id) {
	if(id != 'ns'){
		var cds = id.split('s');
		sId = cds[1];
		prevNid = nId;
		nId = cds[0].substring(1,cds[0].length);
	} else {
		nId = 0;
		sId = 0;
	}
}

function showIntrastitial(){
	hideElements('resultSet');
	showElements('intrastitial');
}

function hideIntrastitial(){
	hideElements('intrastitial');
	showElements('resultSet');
}

function handleExceptions(transport) {
	if (transport.responseText.match(/<\s*html(\s.*)*>/i)){
		/* A better error behavior is worth investigating */
		window.location.href = hotelHome;
	}
}

function handleAjaxFaliure(transport) {
	window.location.href = hotelHome;
}

function scrollMatrix(id) {
	if(document.getElementById('scrollBox')) {
		document.getElementById('scrollBox').scrollTop = getElementPosition(document.getElementById(id)).top - getElementPosition(document.getElementById('scrollBox')).top;
	}
}

function loadIframe(id,url) {
	top.frames[id].location.replace(url);
}

function sortHotels(sortBy) {
    if (checkSearch() && sortBy != tab) {
		changeSortTab(sortBy);
		selectResultSet('n'+nId+'s'+sId,'sortTab',sortBy);
		sortTabs=true;
		return false;
	}
}

function changeSortTab(sortBy) {
	if(sortBy=="TLCHOTEL") {
       	changeCss(tab,'a');
	    	changeCss(sortBy,'tlcRewardsActive');
	    	showElements(sortBy);
	    	tab = sortBy;
	}
	else {
       	if(tab=="TLCHOTEL"){
       		changeCss(tab,'tlcRewards');
       	}
       	else {
       		changeCss(tab,'a');
       	}
		changeCss(sortBy,'active');
		showElements(sortBy);
		tab = sortBy;
	}
}

function tipHider(){
	if(hideTip){
		zTranslate(document.getElementById('hotelInfo'), 'behind', 'hotelInfo');
		/*hideElements('hotelInfo');*/
	}
}

function keepToolTip(caller){
	clearTimeout(theTipHider);
	hideTip = false;
}

function hideToolTip(time,caller){
	if(theTipHider){
		clearTimeout(theTipHider);
	}
	time = (isNaN(time)) ? 500:time;
	hideTip = true;
	theTipHider = setTimeout('tipHider()',time);
}

function backButtonScroll(scrollPos, inFrame){
	if(inFrame) {
		scrollPos += getElementPosition(document.getElementById('resultsFrame')).top;
	}
	window.scroll(0,scrollPos);
}


//	functions and objects used in map
function mapNeighborHood(name,shortDescription,longDescription,areaId) {
	this.name = name;
	this.shortDescription = shortDescription;
	this.longDescription = longDescription;
	this.areaId = areaId;
}
function mapArea(x,y,tipIDs) {
	this.x = x;
	this.y = y;
	this.tips = tipIDs
}
function toolTip(imageId,starRating,name,price,serial,showStars,availability,x,y,preferredGraphic) {
	this.imageId = imageId;
	this.divId = imageId - serial;
	this.starRating = starRating;
	this.name = name;
	this.price = price;
	this.serial = serial;
	this.showStars = showStars;
	this.availability = availability;
	this.x = x;
	this.y = y;
	this.preferredGraphic = preferredGraphic;
}
function popHotelInfo(mapAreaIdx) {
	var out = '';
	var numIconStyle = '';
	out += '<table cellpadding="0" cellspacing="0" border="0">';
	for (var i = 0; i < mapAreas[mapAreaIdx].tips.length; i ++) {
		tip = mapAreas[mapAreaIdx].tips[i]
		if(i%5 == 0 && i != 0) {
			out += '</table>';
			out += '<table cellpadding="0" cellspacing="0" border="0" class="extra">';
		}
		numIconStyle = ( tip == top.selectedToolTipIndex ) ? "selected" : "numIcon " + toolTips[tip].availability;

		out += '<tr onMouseOver="changeCss(\'row' + i + '\',\'on\');keepToolTip(this.id);" onMouseOut="changeCss(\'row' + i + '\',\'\');hideToolTip(500,this.id);" onClick="return selectHotel(\'' + (toolTips[tip].imageId) + '\', ' + mapAreaIdx + ');" id="row' + i + '" style=\'cursor:pointer;\'>';
		out += '<td class="num"><div id = "numIcon' + toolTips[tip].imageId + '" class="' + numIconStyle +  '">' + toolTips[tip].imageId + '</div></td>';
		out += '<td><div>'
		out += '<p onMouseOver="keepToolTip(this.id)" id="p' + i + '"><a class="js" onMouseOver="keepToolTip(this.id)" id="a' + i + '">' + toolTips[tip].name + '</a></p>';
		out += (toolTips[tip].price != '' && toolTips[tip].price != null) ? toolTips[tip].price + '&nbsp;&nbsp;':'';
		if (toolTips[tip].showStars){
			out += '<img src="/site/img/icons/stars/10px_' + toolTips[tip].starRating + '_fff.gif" width="55" height="10" alt="' + toolTips[tip].starRating + ' star rating" />';
		}
		out += '</div></td>'
		out += '</tr>';
	}
	out += '</table>';
	tipTop = (mapAreas[mapAreaIdx].tips.length > 3) ? 0 : parseFloat(mapAreas[mapAreaIdx].y) -20;
	top.setElementPosition(top.document.getElementById('hotelInfo'), top.document.getElementById('mapFrame'), parseFloat(mapAreas[mapAreaIdx].x) + 15, tipTop);
	top.document.getElementById('hotelInfo').innerHTML = out;
	parent.zTranslate(top.document.getElementById('hotelInfo'), 'inFront', 'hotelInfo');
	top.keepToolTip('popHotelInfo()');
//	top.hideToolTip(1500,'popHotelInfo()');
}

function popNeighborhoodHotelInfo(mapAreaIdx) {
	var out = '';
	var numIconStyle = '';
	
	var skipNHotels;
	var stackWidth = 207;
	var totalColumns = 1;
	var minThresholdRows = 4;
	var maxThresholdRows = 8;
	var totalToolTips = mapAreas[mapAreaIdx].tips.length;
	
	if (totalToolTips > minThresholdRows && totalToolTips <= maxThresholdRows) {
		totalColumns = 2;
		stackWidth = stackWidth * 2;
		skipNHotels = Math.ceil(totalToolTips / 2);
	} else {
		totalColumns = Math.ceil(totalToolTips / maxThresholdRows);
		stackWidth = stackWidth * totalColumns;
		skipNHotels = Math.ceil(totalToolTips / totalColumns);
	}
	
	out += '<div id="mapMicroContent" class="mapMicroContent" ';
	out += 'style="width:' + stackWidth + 'px;">';
	out += '<table cellpadding="0" cellspacing="0" border="0" class="contents">';
	
	var row = 0, j = 0, count = 0, columnCount = 0;
	while (count < totalToolTips) {
		j = row;
		columnCount = 0;
		out +='<tr>';
		do {
			tip = mapAreas[mapAreaIdx].tips[j];
			numIconStyle = ( tip == top.selectedToolTipIndex ) ? "selected" : "numIcon " + toolTips[tip].availability;
		
			out +='<td id="col' + toolTips[tip].imageId +'" class="col" onMouseOver="changeCss(' + '\'col' + toolTips[tip].imageId + '\',\'col on\');" onMouseOut="changeCss(' + '\'col' + toolTips[tip].imageId + '\',\'col off\');" onClick="return selectHotel(' + '\'' + toolTips[tip].imageId + '\', ' + '\'' + mapAreaIdx + '\');">';
				out +='<table cellpadding="0" cellspacing="0" border="0">';
					out +='<tr id="row' + toolTips[tip].imageId + '">';
						out +='<td><div class="num"><p id="numIcon' + toolTips[tip].imageId + '" class="' + numIconStyle + '">' + toolTips[tip].imageId + '</p></div></td>';
						out +='<td id="hotel' + toolTips[tip].imageId + '">';
							out +='<p class="name"><a class="js" id="a' + toolTips[tip].imageId + '">' + toolTips[tip].name + '</a></p>';
							out +='<p class="stars">';
							if (toolTips[tip].price != '' && toolTips[tip].price != null){
								out +='<span>' + toolTips[tip].price + '</span>';
							}
				
							if (toolTips[tip].showStars){
								out += '<img src="/site/img/icons/stars/10px_' + toolTips[tip].starRating + '_fff.gif" width="55" height="10" alt="' + toolTips[tip].starRating + ' star rating" />';	
							}
							out +='</p>';
						out +='</td>';
					out +='</tr>';
				out +='</table>';
			out +='</td>';
		
			j += skipNHotels;
			count++;
			columnCount++;
		} while((j < totalToolTips) && (count != totalToolTips) && (skipNHotels != 0));
		
		if ((columnCount < totalColumns) && (skipNHotels != 0) && (totalToolTips % totalColumns != 0)) {
			out +='<td class="col">&nbsp;</td>';
		}
		out +='</tr>';
		
		row++;
	}
	out += '</table>';
	out += '</div>';
	
	return(out);
}

function popNeighborhoodInfo(mapAreaIdx, defaultSearchResultsTab) {
	var out = '';
		out += '<div id="mapMicroContent" class="mapMicroContent" style="width:288px;">';
			out += '<h3>' + mapNeighborHoods[Number(mapAreaIdx)].name + '</h3>';
			out += '<p class="description">' + mapNeighborHoods[Number(mapAreaIdx)].shortDescription + '</p>';
			
			if(defaultSearchResultsTab != 'null') {
				out += '<a href="javascript:void(0)" class="closeListener linkHotels" onclick="Novo.Microcontent.destroy(); return selectResultSet(\'n' + mapAreaIdx + 's0\',\'map\',\'' + defaultSearchResultsTab + '\');">See hotels in this neighborhood</a>';
			}
			
			out += '<p class="attractions">' + mapNeighborHoods[Number(mapAreaIdx)].longDescription + '</p>';
		out += '</div>';
		
	return(out);
}

function lastRow(lastCount) {
	lastRowIndex = lastCount;
}

function hoverResultMatrix(id, evt) {
	var className = null;
	var cellRef = document.getElementById(id);
	var isInvertedMatrix = document.getElementById('isInvertedMatrix') != null && document.getElementById('isInvertedMatrix').value == 'true';
	
	var starsIn = 'Col';
	var distanceIn = 'Row';
	
	if (isInvertedMatrix) {
		starsIn = 'Row';
		distanceIn = 'Col';
	}
	
	if (id.indexOf("s0") != -1 || id.indexOf("n0s0") != -1) {
		className = 'hover'+distanceIn+'Header';
	} else if (id.indexOf("n0") != -1) {
		className = 'hover'+starsIn+'Header';
	} else {
		className = 'hoverCell';
	}

	if(className != null && !botMgr.hasClass(cellRef, className) && evt == 'mouseover') {
		botMgr.appendClass(cellRef, className);
	} else if(className != null && botMgr.hasClass(cellRef, className) && evt == 'mouseout') {
		botMgr.removeClass(cellRef, className);
	}
}

/******************************************
COLO-related interactive map Javascript 
*******************************************/

function keepCorpToolTip(caller){
	clearTimeout(theTipHider);
	hideTip = false;
}

function hideCorpToolTip(time,caller){
	if(theTipHider){
		clearTimeout(theTipHider);
	}
	time = (isNaN(time)) ? 500:time;
	hideTip = true;
	theTipHider = setTimeout('corpTipHider()',time);
}

function corpTipHider(){
	if(hideTip){
		zTranslate(document.getElementById('corpHotelInfo'), 'behind', 'corpHotelInfo');
	}
}


/*
===========================================
 COLO-related interactive map functions:
===========================================
A few pre-requisites before diving into popCorpHotelInfo():
1) mapAreas - an array that holds a mapArea object (mapAreas gets build on coprHotelResultsMap.jsp).
2) mapArea - function which encapsulates: x/y coordinates of the image map; theTips array (mapArea function resides in this file).
	 theTips array contains indexes corresponding to individual toolTips.
3) toolTips - an array that holds a toolTip object. Each index in this array corresponds to a single hotel in the resultset (toolTips gets build on coprHotelResultsMap.jsp).
4) toolTip - function which encapsulates everything about a hotel - i.e. price, name, etc. (toolTip function resides in this file) 
*/

function popCorpHotelInfo(mapAreaIdx) {
	var firstColumnPriceCount = 0;
	var secondColumnPriceCount = 0;
	var firstColumnFlag = true;
	var out = '';
	var clusterOut = '';
  var outputInsert = '';
  out += '<div id="toolTipsColumn">';
	for (var i = 0; i < mapAreas[mapAreaIdx].tips.length; i ++) {
		tipIndex = mapAreas[mapAreaIdx].tips[i];	
		firstColumnPriceCount = firstColumnPriceCount + toolTips[tipIndex].price.length;

		/*If the firstColumnPriceCount reaches past 9, we start the second column and set the flag
			to false which will ensure that we never build a third column*/
		if(firstColumnFlag && firstColumnPriceCount > 9) {
			firstColumnFlag = false;
			out += '</div>';
			out += '<div id="toolTipsColumnTwo">';
		}
		
		//Start keeping count of the prices in the second column
		if(!firstColumnFlag){
			secondColumnPriceCount = secondColumnPriceCount + toolTips[tipIndex].price.length;
		}
		
		out += '<div class="toolTip" onMouseOver="changeCss(\'row' + i + '\',\'toolTipOn\'); keepCorpToolTip(this.id);" onMouseOut="changeCss(\'row' + i + '\',\'toolTip\'); hideCorpToolTip(500,this.id);" onClick="return selectCorpHotel(' + (toolTips[tipIndex].imageId) + ');"  id="row' + i + '" style=\'cursor:pointer;\'>';
		out += '  <div class="toolTipIcon' + toolTips[tipIndex].availability + '">' + toolTips[tipIndex].imageId + '</div>';
		out += '  <div class="toolTipName"><a class="js" onMouseOver="keepCorpToolTip(this.id)" id="a' + i + '">' + toolTips[tipIndex].name + '</a></div>';
		
		out += '	<ul>';
		for(j = 0; j < toolTips[tipIndex].price.length; j++) {
			out += '	<li>';
			out += '		<span class="toolTipPrice">' + toolTips[tipIndex].price[j].rate + '</span>';
			if (toolTips[tipIndex].price[j].policyGraphic) {
				out += '	<span class="toolTipPolicy"><img src="' + toolTips[tipIndex].price[j].policyGraphic + '" /></span>';
			}
			out += '	</li>';
		}			
		out += '	</ul>';
		
		if (toolTips[tipIndex].preferredGraphic.length > 0) {
			out += '<div class="toolTipPreferred"><img src="' + toolTips[tipIndex].preferredGraphic + '" /></div>';
		}
		out += '</div>';
	}
	out += '</div>';	
	
	//If prices in the second column reach past 9, we display a "Zoom..." link instead of outputting the tooltips
	if (secondColumnPriceCount > 9) {
		clusterOut += '<div class="clusterZoomTip" onMouseOver="changeCss(\'clusterZoom\',\'clusterZoomTipOn\'); keepCorpToolTip(this.id);" onMouseOut="changeCss(\'clusterZoom\',\'clusterZoomTip\'); hideCorpToolTip(500,this.id);" id="clusterZoom" style=\'cursor:pointer;\'>';
		clusterOut += '   <a class="js" href="/App/ZoomCorpMapCluster?cluster=' + mapAreaIdx + '">Zoom in to see property details</a>';
		clusterOut += '</div>';
    outputInsert = clusterOut;
  } else {
    outputInsert = out;
	}

  tipTop = mapAreas[mapAreaIdx].tips.length > 3 ? parseFloat(mapAreas[mapAreaIdx].y) + 125 : parseFloat(mapAreas[mapAreaIdx].y) + 140;
	top.setElementPosition(top.document.getElementById('corpHotelInfo'), document.getElementById('hotelMapLayout'), parseFloat(mapAreas[mapAreaIdx].x) + 40, tipTop);
  top.document.getElementById('corpHotelInfo').innerHTML = outputInsert;
  parent.zTranslate(top.document.getElementById('corpHotelInfo'), 'inFront', 'corpHotelInfo');
	top.keepCorpToolTip('popCorpHotelInfo()');
}

function selectCorpHotel(id) {
	var selectedCorpHotel = '';
  selectedCorpHotel = top.document.getElementById("hotelCard");  //div which will house the selected card (exists in hotelProperties.jsp)
  selectedCorpHotel.innerHTML = '';
	selectedCorpHotel.innerHTML = top.document.getElementById('result' + id).innerHTML;  //capture content from this particular card on search results
  showElement("selectedCorpHotel");  //show this div which in turn contains hotelCard
	window.scrollTo(0,getElementPosition(top.document.getElementById("mapFrame")).top);  //shift the window down to view the selected hotel
}

var toolTipParser = function(sourceDiv,sourceAttribute) {
	var removeStrings = new Array(/'(X|Y)\":\"(-)?(\d){1,3}/g,/,\s\"(toolTipIds=)(-)?(\d|\,|\s){1,}/g,/(MapImageGroupMB)/g,/(HotelMatrixNeighborhoodMB)/g);
	var jspFilter = new jspToJson($(sourceDiv).readAttribute(sourceAttribute),removeStrings);
	var newHotels = eval(jspFilter.out);

	$A(newHotels).each(function(item,index) {
		var thisToolTip = $(document.createElement("span"));
		var thisDisplayString = (item.defaultSearchResultsTab ? popNeighborhoodInfo(index+1, item.defaultSearchResultsTab) : popNeighborhoodHotelInfo(index));
		var coordinates = (item.imagePixelLocation ? item.imagePixelLocation : item.location).split(",");

		$(sourceDiv).appendChild(thisToolTip);
		Event.observe(thisToolTip,'mouseover',_hover.bindAsEventListener(Novo.Microcontent, thisDisplayString));

 		if (item.isClickable) {
			thisToolTip.className = "hand";
			Event.observe(thisToolTip,'click', _click.bindAsEventListener(Novo.Microcontent, (index+1), item.defaultSearchResultsTab));
		}
		
		thisToolTip.setStyle({'position': 'absolute', 'background': 'red', 'filter': 'alpha(opacity=0)', 'opacity': '0', 'left': coordinates[0] + 'px', 'top': coordinates[1] + 'px', 'width': (coordinates[2]-coordinates[0]) + 'px', 'height': (coordinates[3]-coordinates[1]) + 'px'});
	
	});

	function _hover(event, contentString) {
		Novo.Microcontent.activate(event,{content:{string:contentString}, options:{headerless:'true'}});
	}
	
	function _click(event, index, selectTab) {
		Novo.Microcontent.destroy(); 
		return selectResultSet('n' + index + 's0','map',selectTab);
	}


}

var jspToJson = function(incomingJsp,removeArray) {
	// These are common to all JSP arrays.
	var jsonOut = incomingJsp.replace(/\"/g, "\\\"").replace(/(\[|\]|\r|\n|\t|\f)/g,"").replace(/(=\')/g,"\":\"").replace(/\',\s/g,"\", \"").replace(/\'}/g,"\"}").replace(/\{/g, "\{\"");
	$A(removeArray).each(function(item,index) {
		jsonOut = jsonOut.replace(item,"");
	});
	jsonOut = "([" + jsonOut + "])";
	this.out = jsonOut;
}

