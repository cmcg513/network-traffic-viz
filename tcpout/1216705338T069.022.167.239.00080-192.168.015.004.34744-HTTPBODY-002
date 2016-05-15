/**
 * Calendar Utility Functions
 * @author Gourav Budhia
 * @created 05/20/2004
 * @name calendar_utils.js
 */

/**
 * Opens the check in calendar.
 * @param theForm - the form containing the check in field.
 * @param brand - the brand id.
 * @param region - the region id.
 * @param locale - the locale.
 * @param secure - the secure flag.
 */
function openCalendarCheckIn(theForm, brand, region, locale, secure)
{
	var cDate = theForm.checkInDate[theForm.checkInDate.selectedIndex].value;
	if(cDate == null || cDate == ""){
	    cDate = "-1";
	}
	var cMonthYear = theForm.checkInMonthYear[theForm.checkInMonthYear.selectedIndex].value;
	var url = '/h/d/' + brand + '/' + region + '/' + locale + '/calendar?test=grb&openerForm=' + theForm.name + '&monthYear=' + cMonthYear + '&date=' + cDate + '&checkOut=false&secure=' + secure;
	if(navigator.userAgent.indexOf("AOL 6.0") != -1 || navigator.userAgent.indexOf("AOL 5.0") != -1) {
		newWin = window.open(url,'HI','DEPENDANT=YES,WIDTH=225,HEIGHT=230,TITLEBAR=YES,MENUBAR=NO,SCROLLBARS=NO,TOP=0,LEFT=0');
	} else {
		var topPos = (screen.availHeight/2)-115;
		var leftPos = (screen.availWidth/2)-105;
		newWin = window.open(url,'cal','top=' + topPos + ',left=' + leftPos + ',dependent=yes,width=225,height=230,screenX=' + leftPos + ',screenY=' + topPos + ',titlebar=yes');
	}
	newWin.focus();
	return false;
}

/**
 * Opens the check out calendar.
 * @param theForm - the form containing the check out field.
 * @param brand - the brand id.
 * @param region - the region id.
 * @param locale - the locale.
 * @param secure - the secure flag.
 */
function openCalendarCheckOut(theForm, brand, region, locale, secure)
{
	var cDate = theForm.checkOutDate[theForm.checkOutDate.selectedIndex].value;
	if(cDate == null || cDate == ""){
	    cDate = "-1";
	}
	var cMonthYear = theForm.checkOutMonthYear[theForm.checkOutMonthYear.selectedIndex].value;
	var url = '/h/d/' + brand + '/' + region + '/' + locale + '/calendar?test=grb&openerForm=' + theForm.name + '&monthYear=' + cMonthYear + '&date=' + cDate + '&checkOut=true&secure=' + secure;
	if(navigator.userAgent.indexOf("AOL 6.0") != -1 || navigator.userAgent.indexOf("AOL 5.0") != -1) {
		newWin = window.open(url,'HI','DEPENDANT=YES,WIDTH=225,HEIGHT=230,TITLEBAR=YES,MENUBAR=NO,SCROLLBARS=NO,TOP=0,LEFT=0');
	} else {
		var topPos = (screen.availHeight/2)-115;
		var leftPos = (screen.availWidth/2)-105;
		newWin = window.open(url,'cal','top=' + topPos + ',left=' + leftPos + ',dependent=yes,width=225,height=230,screenX=' + leftPos + ',screenY=' + topPos + ',titlebar=yes');
	}
	newWin.focus();
	return false;
}

/**
 * Populates the check out date.
 * @param theForm - the form containing the check out date.
 */
function populateCheckOut(theForm)
{
	if(theForm.checkInDate.selectedIndex != 0 && theForm.checkInMonthYear.selectedIndex != 0) {		
			var monthYear= theForm.checkInMonthYear.value;
			var month = monthYear.substring(0,monthYear.length-4);
			var year = monthYear.substring(monthYear.length-4);
			var date = theForm.checkInDate.selectedIndex;
			var nights = 1;
			if(typeof theForm.numOfNights!="undefined")
				nights=theForm.numOfNights.value;			
			var outDateObj = new Date(year, month, date+parseInt(nights));


			var year = outDateObj.getYear();
			if(year.toString().length == 3)
				year = 2000 + (outDateObj.getYear() % 100);
			theForm.checkOutMonthYear.value = "" + outDateObj.getMonth() + year;

			//We have set the checkOutMonthYear, now see how to set the date field			
				theForm.checkOutDate.selectedIndex = outDateObj.getDate();
			
	}
}

/**
 * Opens the faceplate check-out calendar on the advanced search page.
 * @param theForm - the quick res form.
 * @param brand - the brand id.
 * @param region - the region id.
 * @param locale - the locale.
 * @param pattern - the date format pattern.
 * @param secure - the secure flag.
 */
function openFPCalendarCheckOutAdvanced(theForm, brand, region, locale, pattern, secure)
{
	var datePattern = pattern.toLowerCase();
	var cDate = parseDate(theForm.checkOutFullDate.value, datePattern);
	var cMonthYear = parseMonthYear(theForm.checkOutFullDate.value, datePattern);
	document.getElementById('AdvancedCheckInCalendar').style.visibility = "hidden";
	document.getElementById('AdvancedCheckOutCalendar').style.visibility = "visible";
	document.getElementById('age_room_set').style.visibility = "hidden";
	document.getElementById('roomprefselect').style.visibility = "hidden";
	document.getElementById('smokingprefselect').style.visibility = "hidden";
	if (document.getElementById('roomrateselect')) {
	document.getElementById('roomrateselect').style.visibility = "hidden";
		}
	var url = ("/h/d/" + brand + "/" + region + "/" + locale + "/fpcal?test=grb&openerForm=" + theForm.name + '&monthYear=' + cMonthYear + '&date=' + cDate + '&checkOut=true&secure=' + secure);
	if (region != "280") {
		document.getElementById('AdvancedCheckOutCalendar').innerHTML = "<iframe SRC=" + url + " WIDTH=\"266\" HEIGHT=\"133\" scrolling=\"no\" FRAMEBORDER=0 style=\"border: '1px solid'\">Your browser does not support the iframe tag.  Please consider upgrading your browser.</iframe>";
	} 
	else {
		document.getElementById('AdvancedCheckOutCalendar').innerHTML = "<iframe SRC=" + url + " WIDTH=\"266\" HEIGHT=\"164\" scrolling=\"no\" FRAMEBORDER=0 style=\"border: '1px solid'\">Your browser does not support the iframe tag.  Please consider upgrading your browser.</iframe>";	
	}
	return false;
}

/**
 * Opens the faceplate check-in calendar on the advanced search page.
 * @param theForm - the quick res form.
 * @param brand - the brand id.
 * @param region - the region id.
 * @param locale - the locale.
 * @param pattern - the date format pattern.
 * @param secure - the secure flag.
 */
function openFPCalendarCheckInAdvanced(theForm, brand, region, locale, pattern, secure)
{
	var datePattern = pattern.toLowerCase();
	var cDate = parseDate(theForm.checkInFullDate.value, datePattern);
	var cMonthYear = parseMonthYear(theForm.checkInFullDate.value, datePattern);
	document.getElementById('AdvancedCheckOutCalendar').style.visibility = "hidden";
	document.getElementById('AdvancedCheckInCalendar').style.visibility = "visible";
	document.getElementById('checkOutTextBox').style.visibility = "hidden";
	document.getElementById('age_room_set').style.visibility = "hidden";
	document.getElementById('roomprefselect').style.visibility = "hidden";
	document.getElementById('smokingprefselect').style.visibility = "hidden";
	var url = ("/h/d/" + brand + "/" + region + "/" + locale + "/fpcal?test=grb&openerForm=" + theForm.name + '&monthYear=' + cMonthYear + '&date=' + cDate + '&checkOut=false&secure=' + secure);
	if (region != "280") {
		document.getElementById('AdvancedCheckInCalendar').innerHTML = "<iframe SRC=" + url + " WIDTH=\"266\" HEIGHT=\"133\" scrolling=\"no\" FRAMEBORDER=0 style=\"border: '1px solid'\">Your browser does not support the iframe tag.  Please consider upgrading your browser.</iframe>";
	} 
	else {
		document.getElementById('AdvancedCheckInCalendar').innerHTML = "<iframe SRC=" + url + " WIDTH=\"266\" HEIGHT=\"164\" scrolling=\"no\" FRAMEBORDER=0 style=\"border: '1px solid'\">Your browser does not support the iframe tag.  Please consider upgrading your browser.</iframe>";	
	}
	return false;
}

/**
 * Parses and returns the day from the full date.
 * @param fullDate - the date to parse.
 * @param datePattern - the formatted pattern of the date.
 */
function parseDate(fullDate, datePattern) {
	datePattern = datePattern.toLowerCase();
	if (!fullDate) fullDate = datePattern;
	var dateArray = fullDate.split("/");
	// mm/dd/yyyy
	var cDate;
	if (datePattern == "mm/dd/yyyy") {
		cDate = dateArray[1];
	} 
	// dd/mm/yyyy
	else if (datePattern == "dd/mm/yyyy") {
		cDate = dateArray[0];
	}
	// yyyy/mm/dd
	else {
		cDate = dateArray[2];
	}
	if(cDate == null || cDate == "dd" || cDate == ""){
	    cDate = "-1";
	}
	return cDate;
}

/**
 * Parses and returns the month from the full date.
 * @param fullDate - the date to parse.
 * @param datePattern - the formatted pattern of the date.
 */
function parseMonth(fullDate, datePattern) {
	datePattern = datePattern.toLowerCase();
	if (!fullDate) fullDate = datePattern;
	var dateArray = fullDate.split("/");
	// mm/dd/yyyy
	var cMonth;
	if (datePattern == "mm/dd/yyyy") {
		cMonth = dateArray[0];
	} 
	// dd/mm/yyyy
	else if (datePattern == "dd/mm/yyyy") {
		cMonth = dateArray[1];
	}
	// yyyy/mm/dd
	else {
		cMonth = dateArray[1];
	}
	if(cMonth == null || cMonth == "mm" || cMonth == ""){
	    cMonth = "-1";
	}
	else {
			cMonth = (cMonth - 1);
	}
	return cMonth;
}

/**
 * Parses and returns the year from the full date.
 * @param fullDate - the date to parse.
 * @param datePattern - the formatted pattern of the date.
 */
function parseYear(fullDate, datePattern) {
	datePattern = datePattern.toLowerCase();
	if (!fullDate) fullDate = datePattern;
	var dateArray = fullDate.split("/");
	// mm/dd/yyyy
	var cYear;
	if (datePattern == "mm/dd/yyyy") {
		cYear = dateArray[2];
	} 
	// dd/mm/yyyy
	else if (datePattern == "dd/mm/yyyy") {
		cYear = dateArray[2];
	}
	// yyyy/mm/dd
	else {
		cYear = dateArray[0];
	}
	if(cYear == null || cYear == "yyyy" || cYear == ""){
	    cYear = "-1";
	}
	return cYear;
}

/**
 * Parses and returns the month/year from the full date.
 * @param fullDate - the date to parse.
 * @param datePattern - the formatted pattern of the date.
 */
function parseMonthYear(fullDate, datePattern) {
	datePattern = datePattern.toLowerCase();
	if (!fullDate) fullDate = datePattern;
	var cMonth, cYear, cMonthYear;
	cMonth = parseMonth(fullDate, datePattern);
	cYear = parseYear(fullDate, datePattern);
	if(cMonth == null || cMonth == '-1' || cYear == null || cYear == "-1"){
	    cMonthYear = "-1";
	}
	else {
			cMonthYear = cMonth + cYear;
	}
	return cMonthYear;
}

/**
 * Creates and returns a date after parsing the 
 * specified value.  If the date can not be parsed, 
 * then -1 is returned.
 * @param dateValueToParse - the date to parse.
 * @param pattern - the date pattern.
 */
function createDate(dateValueToParse, pattern) {
	if (dateValueToParse != '') {
		var day = parseDate(dateValueToParse, pattern);
		var month = parseMonth(dateValueToParse, pattern);
		var year = parseYear(dateValueToParse, pattern);
		if (day!= "-1" && month!= "-1" && year!= "-1") {					
			var tempDate = new Date(year, month, day);
			return tempDate;
		}
	}
	return "-1";
}

/**
 * The legacy open FP calendar method.
 * Opens the faceplate check in calendar in the quick res.
 * @param theForm - the quick res form.
 * @param brand - the brand id.
 * @param region - the region id.
 * @param locale - the locale.
 * @param pattern - the date format pattern.
 * @param secure - the secure flag.
 */
function openFPCalendarCheckIn(theForm, brand, region, locale, secure) {
	var defaultPattern = 'mm/dd/yyyy';
	openFPCalendarCheckInQuickRes(theForm, brand, region, locale, defaultPattern, secure);
}

/**
 * Opens the faceplate check in calendar in the quick res.
 * @param theForm - the quick res form.
 * @param brand - the brand id.
 * @param region - the region id.
 * @param locale - the locale.
 * @param pattern - the date format pattern.
 * @param secure - the secure flag.
 */
function openFPCalendarCheckInQuickRes(theForm, brand, region, locale, pattern, secure)
{
	var datePattern = pattern.toLowerCase();
	var cDate = parseDate(theForm.checkInFullDate.value, datePattern);
	var cMonthYear = parseMonthYear(theForm.checkInFullDate.value, datePattern);
	document.getElementById('quickResCheckOutCalendar').style.visibility = "hidden";
	document.getElementById('quickResCheckInCalendar').style.visibility = "visible";
	document.getElementById('quickResCheckInCalendar').zIndex = 5;
	var url = ("/h/d/" + brand + "/" + region + "/" + locale + "/fpcal?test=grb&openerForm=" + theForm.name + "&monthYear=" + cMonthYear + "&date=" + cDate + "&checkOut=false&secure=" + secure);
	if (region != "280") {
		document.getElementById('quickResCheckInCalendar').innerHTML = "<iframe SRC=" + url + " WIDTH=\"266\" HEIGHT=\"133\" scrolling=\"no\" FRAMEBORDER=0 style=\"border: '1px solid'\">Your browser does not support the iframe tag.  Please consider upgrading your browser.</iframe>";
	} 
	else {
		document.getElementById('quickResCheckInCalendar').innerHTML = "<iframe SRC=" + url + " WIDTH=\"266\" HEIGHT=\"164\" scrolling=\"no\" FRAMEBORDER=0 style=\"border: '1px solid'\">Your browser does not support the iframe tag.  Please consider upgrading your browser.</iframe>";	
	}
	return false;
}

// function will support pages that do not pass in the date pattern.
function openFPCalendarCheckOut(theForm, brand, region, locale, secure) {
	var defaultPattern = 'mm/dd/yyyy';
	openFPCalendarCheckOutQuickRes(theForm, brand, region, locale, defaultPattern, secure);
}
   
function openFPCalendarCheckOutQuickRes(theForm, brand, region, locale, pattern, secure)
{
	var datePattern = pattern.toLowerCase();
	var cDate = parseDate(theForm.checkInFullDate.value, datePattern);
	var cMonthYear = parseMonthYear(theForm.checkInFullDate.value, datePattern);
	document.getElementById('quickResCheckInCalendar').style.visibility = "hidden";
	document.getElementById('quickResCheckOutCalendar').style.visibility = "visible";
	var url = ("/h/d/" + brand + "/" + region + "/" + locale + "/fpcal?test=grb&openerForm=" + theForm.name + "&monthYear=" + cMonthYear + "&date=" + cDate + "&checkOut=true&secure=" + secure);
	if (region != "280") {
		document.getElementById('quickResCheckOutCalendar').innerHTML = "<iframe SRC=" + url + " WIDTH=\"266\" HEIGHT=\"133\" scrolling=\"no\" FRAMEBORDER=0 style=\"border: '1px solid'\">Your browser does not support the iframe tag.  Please consider upgrading your browser.</iframe>";
	} 
	else {
		document.getElementById('quickResCheckOutCalendar').innerHTML = "<iframe SRC=" + url + " WIDTH=\"266\" HEIGHT=\"164\" scrolling=\"no\" FRAMEBORDER=0 style=\"border: '1px solid'\">Your browser does not support the iframe tag.  Please consider upgrading your browser.</iframe>";
	}
	return false;
}

/**
 * Populates the check in date.
 * @fulldate - the date.
 * @pattern - the date pattern.
 */
function populateCheckIn(fulldate, pattern)
{
	document.getElementById('checkInTextBox').value = fulldate;
	fieldAgreementQuickRes('in', pattern);
	calendarExit();

}

/**
 * Populates the check out date.
 * @fulldate - the date.
 * @pattern - the date pattern.
 */
function populateCheckOutAdv(fulldate, pattern)
{
	document.getElementById('checkOutTextBox').value = fulldate;
	fieldAgreementQuickRes('out', pattern);
	calendarExit();
}

/**
 * The legacy field agreement method.
 * This method ensures the check in/out dates
 * and nights dropdown are all in agreement.
 * This function is called from the quick
 * search page.
 * @param alpha - a flag to represent check in/out.
 */
function fieldAgreement(alpha) {
	var defaultPattern = 'mm/dd/yyyy';
	fieldAgreementQuickRes(alpha, defaultPattern)
}
	
/**
 * This method ensures the check in/out dates
 * and nights dropdown are all in agreement.
 * This function is called from the quick
 * search page.
 * @param alpha - a flag to represent check in/out.
 * @param pattern - the date format pattern.
 */
function fieldAgreementQuickRes(alpha, pattern) {
	var datePattern = pattern.toLowerCase();
	var date1 = new Date();
	var date2 = new Date();
	diff  = new Date();
	checkInValue = document.getElementById('checkInTextBox').value;
	checkOutValue = document.getElementById('checkOutTextBox').value;
	// Nights dropdown not used for HD2
	if (document.getElementById('number_Nights')!=null) {
		nightsValue = document.getElementById('number_Nights').selectedIndex + 1;
		if (checkInValue == datePattern) { checkInValue = ""; }
		if (checkOutValue == datePattern) { checkOutValue = ""; }
	
		// to set the nights field if both checkIn & checkOut dates have been selected	
		if (checkInValue != '' && checkOutValue != '') { 		
			date1temp = createDate(checkInValue, datePattern);
			date2temp = createDate(checkOutValue, datePattern);
			if (date1temp!=null && date1temp!='-1' && date2temp!=null && date2temp!='-1') {
				date1.setTime(date1temp.getTime());
				date2.setTime(date2temp.getTime());
		
				diff.setTime(Math.abs(date1.getTime() - date2.getTime()));
				timediff = diff.getTime();
		
				if (date1.getTime() < date2.getTime()) {
					days = Math.floor(timediff / ((1000 * 60 * 60 * 24) + (1000 * 60 * 60 * 2))); 
					//the above is (# of milliseconds in a second * # of seconds in a minute * # of minutes in an hour * # of hours in a day) 
					//the adding of (1000 * 60 * 60 * 2), or 2 hours, means that the system time would count from 2am instead of midnight... thereby accounting for DST
					timediff -= days * (1000 * 60 * 60 * 24);
					document.getElementById('number_Nights').selectedIndex= days;
				}
				else {
					document.getElementById('number_Nights').selectedIndex = -1;
				}
			}
			return false; 
		} 
		// if only the checkIn date has been chosen, add the # of nights & populate the checkOut date
		else if (checkInValue != '' && checkOutValue == '') { 
			date1temp = createDate(checkInValue, datePattern);
			if (date1temp!=null && date1temp!='-1') {
				date1.setTime(date1temp.getTime());
				diff.setTime(Math.floor(date1.getTime() + ((1000 * 60 * 60 * 24) + (1000 * 60 * 60 * 2)) * nightsValue));
				var yr = diff.getFullYear();
				var dt = diff.getDate();
				var mo = diff.getMonth() + 1;
				if (mo <= 9) { mo = '0' + mo; }
				if (dt <= 9) { dt = '0' + dt; }
				setDate(dt, mo, yr, document.getElementById('checkOutTextBox'), datePattern);
				//	else return false; // otherwise exits		
			}
		}
		// if only the checkOut date has been chosen, subtract the # of nights & populate the checkIn date
		else if (checkInValue == '' && checkOutValue != '') { 
			date2temp = createDate(checkOutValue, datePattern);
			if (date2temp!=null && date2temp!='-1') {
				date2.setTime(date2temp.getTime());
				diff.setTime(Math.floor(date2.getTime() - ((1000 * 60 * 60 * 24)) * nightsValue));
				var yr = diff.getFullYear();
				var dt = diff.getDate();
				var mo = diff.getMonth() + 1;
				if (mo <= 9) { mo = '0' + mo; }
				if (dt <= 9) { dt = '0' + dt; }
				setDate(dt, mo, yr, document.getElementById('checkInTextBox'), datePattern);
				//	else return false; // otherwise exits
			}
		}
	} else {
		// Nights dropdown not used for HD2
		var updateCheckOutDate = false;
		if (alpha == 'out') {
			if ((checkOutValue != '' && checkOutValue != datePattern) && (checkInValue == '' || checkInValue == datePattern)) {
				updateCheckOutDate = true;
			}
		} else {
			if ((checkInValue != '' && checkInValue != datePattern) && (checkOutValue == '' || checkOutValue == datePattern)) {
				updateCheckOutDate = true;
			}
		}
		if (isCheckOutBeforeCheckInDate(datePattern)) {
			updateCheckOutDate = true;
		}
		if(updateCheckOutDate) {
			if (alpha == 'out') {
				date1temp = createDate(checkOutValue, datePattern);
				if (date1temp!=null && date1temp!='-1') {
					var date = date1temp.getDate();
					var outDate = parseInt(date)-1;
					var outYear = date1temp.getYear();
					if(outYear.toString().length == 3) {
						outYear = 2000 + (date1temp.getYear() % 100);
					}
					date1temp.setFullYear(outYear, date1temp.getMonth(), outDate);
				}
			} else {
				date1temp = createDate(checkInValue, datePattern);
				if (date1temp!=null && date1temp!='-1') {
					var date = date1temp.getDate();
					var outDate = parseInt(date)+1;
					var outYear = date1temp.getYear();
					if(outYear.toString().length == 3) {
						outYear = 2000 + (date1temp.getYear() % 100);
					}
					date1temp.setFullYear(outYear, date1temp.getMonth(), outDate);
				}
			}
			var yr = date1temp.getFullYear();
			var dt = date1temp.getDate();
			var mo = date1temp.getMonth() + 1;
			if (mo <= 9) { mo = '0' + mo; }
			if (dt <= 9) { dt = '0' + dt; }
			if (alpha == 'out') {
				setDate(dt, mo, yr, document.getElementById('checkInTextBox'), datePattern);
			} else {
				setDate(dt, mo, yr, document.getElementById('checkOutTextBox'), datePattern);
			}
		}
	}
}

/**
 * The legacy field agreement method.
 * This method ensures the check in/out dates
 * and nights dropdown are all in agreement.
 * This function is called from the advanced 
 * search page.
 * @param numNights - the number of nights.
 */
function fieldAgreementNights(numNights) {
	var defaultPattern = 'mm/dd/yyyy';
	fieldAgreementNightsAdvanced(numNights, defaultPattern);
}

/**
 * This method ensures the check in/out dates
 * and nights dropdown are all in agreement.
 * This function is called from the advanced 
 * search page.
 * @param numNights - the number of nights.
 * @param pattern - the date format pattern.
 */
function fieldAgreementNightsAdvanced(numNights, pattern) {
	var datePattern = pattern.toLowerCase();
	var nights = numNights;
	var date1 = new Date();
	var date2 = new Date();
	diff  = new Date();

	checkInValue = document.getElementById('checkInTextBox').value;
	checkOutValue = document.getElementById('checkOutTextBox').value;
	
	if (checkInValue == datePattern) { checkInValue = ""; }
	if (checkOutValue == datePattern) { checkOutValue = ""; }
	
	if (checkInValue != '') {
		date1temp = createDate(checkInValue, datePattern);
		if (date1temp!=null && date1temp!='-1') {
			date1.setTime(date1temp.getTime());
			nights = nights * ((1000 * 60 * 60 * 24) + (1000 * 60 * 60 * 2)); //convert to milliseconds by multiplying value x 1000 x seconds x minutes x hours
			diff.setTime(Math.abs(date1.getTime() + nights ));
			var yr = diff.getFullYear();
			var dt = diff.getDate();
			var mo = diff.getMonth() + 1;
			if (mo <= 9) { mo = '0' + mo; }
			if (dt <= 9) { dt = '0' + dt; }
			
			setDate(dt, mo, yr, document.getElementById('checkOutTextBox'), datePattern);
		}
		return false; 
	} 
}

/**
 * Closes the calendar.
 */
function calendarExit () {
	if(document.getElementById('AdvancedCheckOutCalendar')) {
		document.getElementById('AdvancedCheckOutCalendar').style.visibility = "hidden";
		document.getElementById('AdvancedCheckInCalendar').style.visibility = "hidden";
		document.getElementById('nights').style.visibility = "visible";
		document.getElementById('checkOutTextBox').style.visibility = "visible";
		document.getElementById('age_room_set').style.visibility = "visible";
		document.getElementById('roomprefselect').style.visibility = "visible";
		document.getElementById('smokingprefselect').style.visibility = "visible";
		if (document.getElementById('roomrateselect')) {
			document.getElementById('roomrateselect').style.visibility = "visible";
		}
	}
	else {
		document.getElementById('quickResCheckOutCalendar').style.visibility = "hidden";
		document.getElementById('quickResCheckInCalendar').style.visibility = "hidden";
		document.getElementById('quickResCheckOut').style.visibility = "visible";
	}
}

/**
 * Returns true if the check out date is before
 * the check in date.  Function is added for HD2.
 * @pattern - the date format pattern
 */
function isCheckOutBeforeCheckInDate(pattern) {
	checkInValue = document.getElementById('checkInTextBox').value;
	checkOutValue = document.getElementById('checkOutTextBox').value;
	if (checkInValue == pattern) { checkInValue = ""; }
	if (checkOutValue == pattern) { checkOutValue = ""; }
	if (checkInValue != '' && checkOutValue != '') {
		var date1temp = createDate(checkInValue, pattern);
		var date2temp = createDate(checkOutValue, pattern);
		if (date1temp != null && date1temp != "-1" && date2temp != null && date2temp != "-1") {
			if (date1temp.getTime() >= date2temp.getTime()) {
				return true;
			}
		}
	}
	return false;
}

/**
 * Updates the check out date by calculating
 * the number of nights.  Function is called 
 * when the nights dropdown is changed.
 */
function setCheckoutDateByNights(nightsDropdown, pattern) {
	var datePattern = pattern.toLowerCase();
	var nights = nightsDropdown.selectedIndex+1;	
	var date1 = new Date();
	var date2 = new Date();
	diff  = new Date();

	checkInValue = document.getElementById('checkInTextBox').value;
	checkOutValue = document.getElementById('checkOutTextBox').value;
	
	if (checkInValue == datePattern) { checkInValue = ""; }
	if (checkOutValue == datePattern) { checkOutValue = ""; }
	
	if (checkInValue != '') { 	
		date1temp = createDate(checkInValue, datePattern);
		date1.setTime(date1temp.getTime());
		//defect #53255 Modified for checkout date calculation
		nights = nights * (1000 * 60 * 60 * 24) + (1000 * 60 * 60 * 1);
		diff.setTime(Math.abs(date1.getTime() + nights ));
		var yr = diff.getFullYear();
		var dt = diff.getDate();
		var mo = diff.getMonth() + 1;
		if (mo <= 9) { mo = '0' + mo; }
		if (dt <= 9) { dt = '0' + dt; }
		setDate(dt, mo, yr, document.getElementById('checkOutTextBox'), datePattern);
		return false; 
	} 
}


/**
 * Sets the date in the specified text field.
 * @param day - the date.
 * @param month - the month. 
 * @param year - the year.
 * @param textFieldToUpdate - the text field to update.
 * @param datePattern - the date pattern.
 */
function setDate(day, month, year, textFieldToUpdate, datePattern) {
	// mm/dd/yyyy
	if (datePattern == "mm/dd/yyyy") {
		textFieldToUpdate.value = (month + "/" + day + "/" + year);
	} 
	// dd/mm/yyyy
	else if (datePattern == "dd/mm/yyyy") {
		textFieldToUpdate.value = (day + "/" + month + "/" + year);
	}
	// yyyy/mm/dd
	else {
		textFieldToUpdate.value = (year + "/" + month + "/" + day);
	}
}
//added from defect # 51212
function updateCheckinValue (checkInValue, pattern){
	
	var datePattern = pattern.toLowerCase();
	var dateArray = checkInValue.split("/");
	var patternvalue = checkpattern(datePattern);

	//defect #60064 Modified for Pattern Value

	if (patternvalue == "2" )
	{
		var year = dateArray [2];
	}else {
		var year = dateArray [0];
	}
	if (checkInValue == datePattern) { checkInValue = ""; }
	
	if (checkInValue != '' && year.length <= 2)
	{
		var day = parseDate(checkInValue, datePattern);
		var month = parseMonth(checkInValue, datePattern);
		var year = parseYear(checkInValue, datePattern);
		
		if (day!= "-1" && month!= "-1" && year!= "-1") 
			{
				var v1 = new Date();
				var v2 = "" + v1.getFullYear();
				var v4 = v2.substring(0, 2);
				year = v4 + year;
				var tempDate = new Date(year, month, day);
			
			}
				var yr = tempDate.getFullYear();
				var dt = tempDate.getDate();
				var mo = tempDate.getMonth() + 1;
		if (mo <= 9) { mo = '0' + mo; }
		if (dt <= 9) { dt = '0' + dt; }
				
		setDate(dt, mo, yr, document.getElementById('checkInTextBox'), datePattern);
		return false;
	}


		
}
function checkpattern(datePattern){
	// mm/dd/yyyy || dd/mm/yyyy
	if (datePattern == "mm/dd/yyyy" || datePattern == "dd/mm/yyyy" ) {
		return "2";
	} 
	
	// yyyy/mm/dd
	else {
		return "0";
	}
}