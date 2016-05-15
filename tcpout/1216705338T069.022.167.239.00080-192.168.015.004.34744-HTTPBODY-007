<!--
/*
 * cmdatatagutils.js
 * $Revision: 90481 $
 *
 * Coremetrics Tag v4.0, 4/18/2004
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *Date			Imp. Eng.			Desc
 * 06/01/06		Hutch White			Added leadTime-cm.pv5 and arrivalDate-cm.pv6
 *									to cmCreatePageViewTag function for custom rpt
 * 11/01/06		Eliot Towb			Added Conversion Event Tag function
 * 11/28/06		Eliot Towb			Added cmSetTest function
 * 03/19/07		Mary Ochoa			Added cmSetTest() Function for 90165498
 * 07/27/07		Hutch White			Add manual and element tags
 * 11/05/07		Hutch White			Update with cmCreatePageviewConversionEventTag combo tag
 * 04/30/08     Amy Brink			Added vars cm_Track... to activate Real Estate Impressions
 * 06/03/08		Hutch White			Add IX Survey Parameters to Pageview and Conversion Tags
 * 06/06/08		Mary Ochoa			Enabled Stamp parameters for the Element and Conversion Event tags
 */



// TAG GENERATING FUNCTIONS ---------------------------------------------------

/* 04/30/08 ARB Vars to activate Site Promotions and Real Estate */
var cm_TrackLink = "A";
var cm_TrackImpressions = "RS";

/*
 * Calling this function points tags to the production database
 */
function cmSetProduction(){
	cm_ClientID="90081223;90086566";
	cm_HOST="cls.ichotelsgroup.com/cm?";
}

/*
 * Calling this function points tags to the test ID (90083552) database
 */
function cmSetTest(){
	cm_ClientID="90083552;90165498";
	cm_HOST="cls.ichotelsgroup.com/cm?";
}

/*
 * Calling this function points tags to the journey database
 */
function cmSetJourney(){
	cm_ClientID="90086566"; 
	cm_HOST="cls.ichotelsgroup.com/cm?";
}




function cmCreateConversionEventTag(eventID, actionType, categoryID, points,IXCookieID,IXSurveyCode) {
	var cm = new _cm("tid", "14", "vn2", "e4.0");
	var datestamp = new Date();	
	var stamp = (Math.floor(Math.random() * 11111111)) + datestamp.valueOf();	
	
	cm.cid = eventID;
	cm.cat = actionType;
	cm.ccid = categoryID;
	cm.cpt = points;
	if (IXCookieID){
		cm.cx1=IXCookieID;
		cm.cx2=IXSurveyCode;
	}	
	cm.cx15=stamp;
	cm.writeImg();
}

function cmCreateManualImpressionTag(pageID, trackSP, trackRE) {
		var cm = new _cm("tid","9","vn2","e4.0");
		cm.pi = pageID;
		cm.cm_sp = trackSP;
		cm.cm_re = trackRE;
		cm.st = cm_ClientTS;
		cm.writeImg();
}

function cmCreateManualLinkClickTag(href,name,pageID) {	
	if (cmCreateLinkTag == null && cM != null) {
		var cmCreateLinkTag = cM;
	}
	if (cmCreateLinkTag != null) {		
		var dt = new Date();
		cmLnkT3 = dt.getTime();
		cmCreateLinkTag(cm_ClientTS, cmLnkT3, name, href, false, pageID);
	}
}

/* manual PageviewTag for off site page tagging.  Allows client to supply URL and Referring URL
*/
function cmCreateManualPageviewTag(pageID, categoryID,DestinationURL,ReferringURL,searchTerm) {
	var cm = new _cm("tid","1","vn2","e4.0");
	cm.pi = pageID;
	cm.cg = categoryID;
	cm.ul = DestinationURL;
	cm.rf = ReferringURL;
	if (searchTerm) {
		cm.se=searchTerm;
	}
	cm.writeImg();
}

function cmCreatePageElementTag(elementID, elementCategory, pageID, pageCategoryID, elementLocation) {
	var cm=new _cm("tid", "15", "vn2", "e4.0");
	var datestamp = new Date();	
	var stamp = (Math.floor(Math.random() * 11111111)) + datestamp.valueOf();	
	cm.eid=elementID;
	cm.ecat=elementCategory;
	cm.pflg=0;
	cm.pid=pageID;
	cm.pcat=pageCategoryID;
	cm.eloc=elementLocation;
	cm.ex15=stamp;
	cm.writeImg();
}

function cmCreateProductElementTag(elementID, elementCategory, productID, productCategoryID, elementLocation) {
	var cm=new _cm("tid", "15", "vn2", "e4.0");

	cm.eid=elementID;
	cm.ecat=elementCategory;
	cm.pflg=1;
	cm.pid=productID;	
	cm.pcat=productCategoryID;
	cm.eloc=elementLocation;
	
	cm.writeImg();
}

function cmCreatePageviewConversionEventTag(pageID,PVcategoryID,eventID, actionType, CEcategoryID, points,IXCookieID,IXSurveyCode) {
	var cm = new _cm("tid", "14", "vn2", "e4.0");

	if(pageID == null) {
		pageID = cmGetDefaultPageID();
	}
	// if available, override the referrer with the frameset referrer
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
		parent.cm_ref = document.URL;
	}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if(parent.cm_set_mmc) {
		cm.ul = document.location.href + 
				((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
				parent.cm_mmc_params; 
		parent.cm_ref = cm.ul;
		parent.cm_set_mmc = false;
	}
	cm.cg = PVcategoryID;
	cm.pc = "Y";
	cm.pi = pageID;

	cm.cid = eventID;
	cm.cat = actionType;
	cm.ccid = CEcategoryID;
	cm.cpt = points;
	cm.writeImg();
 }

/*
 * Creates a Tech Props tag.
 * pageID		: required. Page ID to set on this Pageview tag
 */
function cmCreateTechPropsTag(pageID, categoryID, brand, country, language, loginType, splitTest, IATA) {

	if(pageID == null) {
		pageID = cmGetDefaultPageID();
	}

	var cm=new _cm("tid", "6", "vn2", "e4.0");
	cm.pc="Y";
	cm.pi = pageID;
	cm.cg = categoryID;
	cm.pv1 = brand;
	cm.pv2 = country; 
	cm.pv3 = language;

	// if available, override the referrer with the frameset referrer
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
		parent.cm_ref = document.URL;
	}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if(parent.cm_set_mmc) {
		cm.ul = document.location.href + 
				((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
				parent.cm_mmc_params; 
		parent.cm_ref = cm.ul;
		parent.cm_set_mmc = false;
	}

	if (loginType) {
		cm.li  = 1;
		cm.ps1 = pageID;
		cm.ps2 = loginType;
	}

	cm.pv14 = splitTest;
	cm.pv15 = IATA;

	cm.addTP();
	cm.writeImg();
	
}
/*
 * Creates a Pageview tag with the given Page ID
 *
 * pageID	: required. Page ID to set on this Pageview tag
 * categoryID	: optional. Category ID to set on this Pageview tag
 * searchString	: optional. Internal search string enterred by user to reach
 *				  this page.
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults,  brand, country, language, loginType, hotelCode, splitTest, IATA,leadTime,arrivalDate,hotelRank,IXCookieID,IXSurveyCode) {
	if (pageID == null) {
		pageID = cmGetDefaultPageID();
	}

	var cm = new _cm("tid", "1", "vn2", "e4.0");
	cm.pi = pageID;
	if (searchString) {
		cm.se = searchString;
	}
	cm.sr = searchResults;
	if (categoryID) {
		cm.cg = categoryID;
	}

	// if available, override the referrer with the frameset referrer
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
		parent.cm_ref = document.URL;
	}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if(parent.cm_set_mmc) {
		cm.ul = document.location.href + 
				((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
				parent.cm_mmc_params; 
		parent.cm_ref = cm.ul;
		parent.cm_set_mmc = false;
	}

	cm.pv1 = brand;
	cm.pv2 = country; 
	cm.pv3 = language;
	cm.pv4 = hotelCode;
	if (leadTime){
		cm.pv5=leadTime;
	}
	if (arrivalDate){
		cm.pv6=arrivalDate;
	}
	if (hotelRank){
		cm.pv7=hotelRank;
	}
	if (IXCookieID){
		cm.pv8=IXCookieID;
		cm.pv9=IXSurveyCode;
	}
	cm.pv14 = splitTest;
	cm.pv15 = IATA;

	if (loginType) {
		cm.li  = 1;
		cm.ps1 = pageID;
		cm.ps2 = loginType;
	}

	cm.writeImg();
}

/*
 * Creates a Pageview tag with the default value for Page ID. 
 * Format of Page ID is "x/y/z/MyPage.asp"
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateDefaultPageviewTag(categoryID) {
	cmCreatePageviewTag(cmGetDefaultPageID(), categoryID, null);
}

function cmCreateHotelViewTag(propertyCode, propertyName, categoryID, hotelBrand, siteBrand, siteCountry, language, ZIP, city, state, country, roomImpressionList, splitTest,EF14,IATAno) {
	var cm = new _cm("tid", "5", "vn2", "e4.0");
	cm.li  = 2;
	cm.pr = propertyCode;
	cm.pm = propertyName;
	cm.ps1 = propertyCode;
	cm.ps2 = propertyName;
	cm.ps3 = hotelBrand;
	cm.ps4 = siteBrand;
	cm.ps5 = language;
	cm.ps6 = siteCountry;
	cm.ps7 = ZIP;
	cm.ps8 = city;
	cm.ps9 = state;
	cm.ps10 = country;
	cm.ps11 = roomImpressionList;
	cm.ps12 = splitTest;
	cm.ps13 = categoryID;
	if (EF14){
		cm.ps14=EF14
	}
	if (IATAno){
		cm.ps15=IATAno
	}
	cm.cg = categoryID;
	cm.pc = "Y";
	cm.pi = "HOTEL VIEW: " + propertyName + " (propertyCode)";

	cm.writeImg();
}

function cmCreateHotelSelectionTag(propertyCode, propertyName, hotelBrand, categoryID, siteBrand, siteCountry, language, ZIP, city, state, country, roomNights, adultRoomNights, childrenRoomNights, unitPrice, rateType, roomCode, reservationStartDate, numRooms, splitTest) {
	var cm = new _cm("tid", "4", "vn2", "e4.0");
	
	cm.at = "5";
	cm.pr = propertyCode; 
	cm.pm = propertyName;
	cm.sx1 = hotelBrand;
	cm.sx2 = siteBrand + "|" + siteCountry;
	cm.sx3 = language;
	cm.sx4 = ZIP;
	cm.sx5 = city;
	cm.sx6 = state;
	cm.sx7 = country;
	cm.qt = roomNights;
	cm.sx8 = adultRoomNights;
	cm.sx9 = childrenRoomNights;
	cm.bp = unitPrice;
	cm.sx10 = rateType;
	cm.sx11 = roomCode;
	cm.sx14 = reservationStartDate;
	cm.sx15 = numRooms;
	cm.pc = "N";
	cm.li = "10";
	cm.ps1 = splitTest;
	cm.cg = categoryID;
	cm.writeImg();
}

function cmCreateHotelBookingTag(propertyCode, propertyName, hotelBrand, categoryID, siteBrand, siteCountry, language, ZIP, city, state, country, roomNights, adultRoomNights, childrenRoomNights, unitPrice, rateType, roomCode, travelType, bookingConfirmationNumber, bookingTotal, tax,usedCreditBypass, customerID, priorityClub, userEmail, userCity, userState, userCountry, userZIP, reservationStartDate, numRooms, splitTest, IATA) {
	var cm = new _cm("tid", "4", "vn2", "e4.0");
	
	cm.at = "9";
	cm.pr = propertyCode; 
	cm.pm = propertyName;
	cm.sx1 = hotelBrand;
	cm.sx2 = siteBrand + "|" + siteCountry;
	cm.sx3 = language;
	cm.sx4 = ZIP;
	cm.sx5 = city;
	cm.sx6 = state;
	cm.sx7 = country;
	cm.qt = roomNights;
	cm.sx8 = adultRoomNights;
	cm.sx9 = childrenRoomNights;
	cm.bp = unitPrice;
	cm.sx10 = rateType;
	cm.sx11 = roomCode;
	cm.on = bookingConfirmationNumber;
	cm.tr = bookingTotal;
	cm.sg = tax;
	cm.sx12 = usedCreditBypass;
	cm.cd = customerID;
	cm.sx13 = priorityClub;
	cm.sx14 = reservationStartDate;
	cm.sx15 = numRooms + "|" + travelType;
	cm.cg = categoryID;
	cm.pc = "N";
	cm.li = "11";
	cm.ps1 = splitTest;
	cm.writeImg();

	var cm = new _cm("tid", "3", "vn2", "e4.0");
	cm.on = bookingConfirmationNumber;
	cm.tr = bookingTotal;
	cm.osk = "|" + propertyCode + "|" + unitPrice + "|" + roomNights + "|";
	cm.sg = tax;
	cm.cd = customerID;
	cm.sa = userState;
	cm.ct = userCity;
	cm.zp = userZIP;
	if (IATA){
		cm.or15=IATA;
	}
	cm.writeImg();
	

	var cm = new _cm("tid", "2", "vn2", "e4.0");
	cm.cd = customerID;
	cm.em = userEmail;
	cm.sa = userState;
	cm.ct = userCity;
	cm.zp = userZIP;
	cm.rg11 = priorityClub;
	cm.rg12 = userCountry;
	cm.writeImg();
}

function cmCreateRegistrationTag(customerID,userEmail,userCity,userState,userZIP,userCountry,priorityClub) {
	var cm = new _cm("tid", "2", "vn2", "e4.0");
	cm.cd = customerID;
	cm.em = userEmail;
	cm.sa = userState;
	cm.ct = userCity;
	cm.zp = userZIP;
	cm.cy = userCountry;
	cm.rg11 = priorityClub;
	cm.writeImg();
}

/* Creates an Error Tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateErrorTag(pageID, categoryID) {
	var cm=new _cm("tid", "404", "vn2", "e4.0");  //DO NOT CHANGE THESE PARAMETERS
	
	// get the referrer from the frameset
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
		parent.cm_ref = document.URL;
	}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if(parent.cm_set_mmc) {
		cm.ul = document.location.href + 
				((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
				parent.cm_mmc_params; 
		parent.cm_ref = cm.ul;
		parent.cm_set_mmc = false;
	}

	cm.pc = "Y";
	if(pageID == null) {
		cm.pi = cmGetDefaultPageID();
	} else {
		cm.pi = pageID;
	}
	cm.cg = categoryID;
	cm.writeImg();
}

function cmLIVEviewClick(href,name) {
	if (cmHandleLinkClick == null && C9 != null) {					
		var cmHandleLinkClick = C9;		
	}
	if (cmHandleLinkClick != null) {
		var link = new Object();
		link.tagName = "A";
		link.name = name;
		link.href = href;
		cmHandleLinkClick(link);
	}
}


// HELPER FUNCTIONS -----------------------------------------------------------
/* These functions are used by the tag-generating functions and/or may be used
 * in in general as convenience functions
 */

/*
 * Creates an acceptable default Page ID value to use for Pageview tags.
 * The default Page ID is based on the URL, and consists of the path and
 * filename (without the protocol, domain and query string).
 * 
 * example:
 * returns "x/y/MyPage.asp" for the URL http://www.mysite.com/x/y/MyPage.asp
 */
function cmGetDefaultPageID() { 
	var pageName = window.location.pathname; 

	// eliminates everything after "?" (for Opera browswers)
	var tempIndex1 = pageName.indexOf("?");
	if (tempIndex1 != -1) {
		pageName = pageName.substr(0, tempIndex1);
	}
	// eliminates everything after "#" (for Opera browswers)
	var tempIndex2 = pageName.indexOf("#");
	if (tempIndex2 != -1) {
		pageName = pageName.substr(0, tempIndex2);
	}
	// eliminates everything after ";"
	var tempIndex3 = pageName.indexOf(";");
	if (tempIndex3 != -1) {
		pageName = pageName.substr(0, tempIndex3);
	}

	var slashPos = pageName.lastIndexOf("/");
	if (slashPos == pageName.length - 1) {
		pageName = pageName + "default.asp"; /****************** SET TO DEFAULT DOC NAME */
	}

	while (pageName.indexOf("/") == 0) {
		pageName = pageName.substr(1,pageName.length);
	}

	return(pageName); 
} 

if (defaultNormalize == null) { var defaultNormalize = null; }

function myNormalizeURL(url, isHref) {
    var newURL = url;
    // ... transform newURL here ...
    if (defaultNormalize != null) {
        newURL = defaultNormalize(newURL, isHref);
    }
    return newURL;
}

// install normalization
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}


//-->
