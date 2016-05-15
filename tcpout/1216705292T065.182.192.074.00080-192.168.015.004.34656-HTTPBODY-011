function loadListing(url,lat,lon,description,icon) {	
 	addListingToMap(url,lat,lon,description,dining);
	new Ajax(url, {
		method: 'get',
		update: $('listingBlock')
	}).request();
}

function loadCatBlock(url,activeDiv,label) {
	var getTabHeadHTML = document.getElementById(activeDiv + 'header').innerHTML;
	var cleanTabHead = stripHTML(getTabHeadHTML);
	document.getElementById(activeDiv + 'header').innerHTML = cleanTabHead;
	new Ajax(url, {
		method: 'get',
		update: $(activeDiv)
	}).request();
}

function loadBlock(url,activeDiv) {
	new Ajax(url, {
		method: 'get',
		update: $(activeDiv)
	}).request();
}

function stripHTML(oldString) {
   var newString = "";
   var inTag = false;
   for(var i = 0; i < oldString.length; i++) {
        if(oldString.charAt(i) == '<') inTag = true;
        if(oldString.charAt(i) == '>') {
              inTag = false;
              i++;
        }
        if(!inTag) newString += oldString.charAt(i);
   }
   return newString;
}

function loadListing2(url,lat,lon,description,icon) {
	if (icon == 'restaurants') icon = dining;
	if (icon == 'hotels') icon = hotels;
	if (icon == 'hospitals') icon = hospitals;
	if (icon == 'coffee') icon = coffee;
	if (icon == 'museums') icon = museums;
	if (icon == 'theaters') icon = theaters;
	if (icon == 'cinemas') icon = cinemas;
	if (icon == 'bars') icon = bars;
	
 	addListingToMap(url,lat,lon,description,icon);
	new Ajax(url, {
		method: 'get',
		update: $('mapDescriptionArea')
	}).request();
	
//	var container = document.getElementById('mapDescriptionArea');
//	container.style.height = '100px';

	//var mobileAddress = document.getElementById("Address1");
	//alert(mobileAddress.value);
	//var currentListing = document.getElementById("currentListing");
	//currentListing.value = mobileAddress.value;
}
