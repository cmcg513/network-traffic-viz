var s9_pop_included = true;

var s9_pop_savedRatings = new Array();
var s9_pop_savedIsOwned = new Array();
var s9_pop_savedNotInterested = new Array();

var s9_pop_checkboxImages = new Array(
	"http://g-ecx.images-amazon.com/images/G/01/x-locale/personalization/ratings-bar/light-blue/check-off._V47060180_.gif",
	"http://g-ecx.images-amazon.com/images/G/01/x-locale/personalization/ratings-bar/light-blue/check-on._V47060003_.gif",
	"http://g-ecx.images-amazon.com/images/G/01/x-locale/personalization/ratings-bar/light-blue/check-hover._V47060180_.gif"
);

var s9_pop_starImages = new Array(
	"http://g-ecx.images-amazon.com/images/G/01/x-locale/personalization/ratings-bar/light-blue/unrated._V47082131_.gif",
	"http://g-ecx.images-amazon.com/images/G/01/x-locale/personalization/ratings-bar/light-blue/1-star._V47060850_.gif",
	"http://g-ecx.images-amazon.com/images/G/01/x-locale/personalization/ratings-bar/light-blue/2-star._V47082458_.gif",
	"http://g-ecx.images-amazon.com/images/G/01/x-locale/personalization/ratings-bar/light-blue/3-star._V47082143_.gif",
	"http://g-ecx.images-amazon.com/images/G/01/x-locale/personalization/ratings-bar/light-blue/4-star._V47082023_.gif",
	"http://g-ecx.images-amazon.com/images/G/01/x-locale/personalization/ratings-bar/light-blue/5-star._V47060241_.gif"
);
	
var s9_pop_starMessages = new Array(
	"Unrated",
	"I hate it",
	"I don't like it",
	"It's OK",
	"I like it",
	"I love it",
	"Rate it",
	"<span style="+'"'+"color: #990000"+'"'+">Saved</span>",
	"&nbsp;");
	
var s9_pop_starTwinkler = new Array();
var s9_pop_delayTime = 500;
var s9_pop_allImages = new Array();
function s9_pop_preloadImages(imgArray){
  for (i=0; i < imgArray.length ;i++){
    if (imgArray[i] != undefined) {
      s9_pop_allImages[i] = new Image();
      s9_pop_allImages[i].src = imgArray[i];
    }
  }
}
s9_pop_preloadImages(s9_pop_starImages);
s9_pop_preloadImages(s9_pop_checkboxImages);

function s9_pop_isOwnedMouseOver(asin){
	if (!s9_pop_getIsOwned(asin)) {
		document.images["isOwned." + asin].src = s9_pop_checkboxImages[2];
	}
}

function s9_pop_isOwnedMouseOut(asin){
	if (!s9_pop_getIsOwned(asin)) {
		document.images["isOwned." + asin].src = s9_pop_checkboxImages[0];
	}
}

function s9_pop_notInterestedMouseOver(asin){
	if (!s9_pop_getNotInterested(asin)) {
		document.images["notInterested." + asin].src = s9_pop_checkboxImages[2];
	}
}

function s9_pop_notInterestedMouseOut(asin){
	if (!s9_pop_getNotInterested(asin)) {
		document.images["notInterested." + asin].src = s9_pop_checkboxImages[0];
	}
}

function s9_pop_sendRating(asin, ratingType, ratingValue){
  var submitURL = '/gp/yourstore/ratings/submit.html?'
      + 'rating.source=ir'
      + '&rating_asin=' + asin
      + '&' + asin + '.rating.' + ratingType + '=' + ratingValue 
	  + '&ref=s9_pop_rating';

    if (((ratingType == 'onetofive') || (ratingType == 'owned')) && s9_pop_getNotInterested(asin)) {
        submitURL = submitURL + '&' + asin + '.rating.not-interested=NONE';
        s9_pop_setNotInterested(asin, false);
    }
    else if (ratingType == 'not-interested') {
        if (s9_pop_getRating(asin) > 0) {
            submitURL = submitURL + '&' + asin + '.rating.onetofive=0';
            s9_pop_setRating(asin, 0);
        }
        if (s9_pop_getIsOwned(asin)) {
            submitURL = submitURL + '&' + asin + '.rating.owned=NONE';
            s9_pop_setIsOwned(asin, false);
        }
    }

    isRatingsBarChanged = true;
    window.location.href = submitURL + "&return.response=204";
}

function s9_pop_swapStars(asin, rating) {
    if (document.images["stars." + asin] != undefined) {
        if (rating == undefined) rating = s9_pop_getRating(asin);
        document.images["stars." + asin].src = s9_pop_starImages[rating];
    }  
}

function s9_pop_swapStarMsgs(asin, rating) {
    if (document.getElementById("messages." + asin)) {
        if (rating == undefined) {
            document.getElementById("messages." + asin).innerHTML = s9_pop_starMessages[6];
        } else {
            document.getElementById("messages." + asin).innerHTML = s9_pop_starMessages[rating];
        }
    }
}

function s9_pop_swapIsOwned(asin, index) {
    if (document.images["isOwned."+asin]) document.images["isOwned." + asin].src = s9_pop_checkboxImages[index];
}

function s9_pop_swapNotInterested(asin, index) {
    if (document.images["notInterested."+asin]) document.images["notInterested." + asin].src = s9_pop_checkboxImages[index];
}

function s9_pop_sendStars(asin, rating) {
    s9_pop_setRating(asin, rating);
    s9_pop_swapStarMsgs(asin, 7);
    if (s9_pop_getRating(asin)) {
        s9_pop_swapNotInterested(asin, 0);
    }
    window.setTimeout("s9_pop_sendRating('"+asin+"', 'onetofive', '"+rating+"')", s9_pop_delayTime);
}

function s9_pop_sendIsOwned(asin) {
    s9_pop_setIsOwned(asin, !s9_pop_getIsOwned(asin));
    rating = (s9_pop_getIsOwned(asin) ? 'OWN' : 'NONE');    
    s9_pop_swapIsOwned(asin, s9_pop_getIsOwned(asin) ? 1 : 0);
    if (s9_pop_getIsOwned(asin)) {
        s9_pop_swapNotInterested(asin, 0);
    }
    s9_pop_swapStarMsgs(asin, 7);
    window.setTimeout("s9_pop_sendRating('"+asin+"', 'owned', '"+rating+"')", s9_pop_delayTime);
}

function s9_pop_sendNotInterested(asin) {
    s9_pop_setNotInterested(asin, !s9_pop_getNotInterested(asin));        
    rating = (s9_pop_getNotInterested(asin) ? 'NOTINTERESTED' : 'NONE');
    s9_pop_swapNotInterested(asin, s9_pop_getNotInterested(asin) ? 1 : 0);
    if (s9_pop_getNotInterested(asin)) {
        s9_pop_swapIsOwned(asin, 0); 
        s9_pop_swapStars(asin, 0);
    }
    s9_pop_swapStarMsgs(asin, 7);
    window.setTimeout("s9_pop_sendRating('"+asin+"', 'not-interested', '"+rating+"')", s9_pop_delayTime);
}

function s9_pop_starMouseOver(asin, rating){
   if (s9_pop_starTwinkler[asin] != undefined){
    window.clearTimeout(s9_pop_starTwinkler[asin]);
    s9_pop_starTwinkler[asin] = null;
  }
  s9_pop_swapStars(asin, rating);
  s9_pop_swapStarMsgs(asin, rating);
}

function s9_pop_starMouseOut(asin){
  s9_pop_starTwinkler[asin] = window.setTimeout("s9_pop_swapStars('"+asin+"'); s9_pop_swapStarMsgs('"+asin+"')", s9_pop_delayTime);
}

function s9_pop_getRating(asin) {
  var rating = 0;
  if (document.images["stars." + asin]) {
    rating = document.images["stars." + asin].getAttribute("rating");
  }
  return rating;
}

function s9_pop_setRating(asin, rating) {
  if (document.images["stars." + asin]) {
    document.images["stars." + asin].setAttribute("rating", rating);
  }
}

function s9_pop_getIsOwned(asin) {
  var isOwned = 0;
  if (document.images["isOwned." + asin]) {
    isOwned = document.images["isOwned." + asin].getAttribute("isowned");
  }
  return (isOwned == 1);
}

function s9_pop_setIsOwned(asin, isOwned) {
  if (document.images["isOwned." + asin]) {
    document.images["isOwned." + asin].setAttribute("isowned", isOwned ? 1 : 0);
  }
}

function s9_pop_getNotInterested(asin) {
  var notInterested = 0;
  if (document.images["notInterested." + asin]) {
    notInterested = document.images["notInterested." + asin].getAttribute("notinterested");
  }
  return (notInterested == 1);
}

function s9_pop_setNotInterested(asin, notInterested) {
  if (document.images["notInterested." + asin]) {
    document.images["notInterested." + asin].setAttribute("notinterested", notInterested ? 1 : 0);
  }
}

function s9_pop_afterShow(oPopover) {
	try {
		var popInfo = oPopover.thingID.split('_');
		var asin = popInfo[popInfo.length - 1];
		
		var rating = s9_pop_savedRatings[asin]
		if (rating != undefined) {
			s9_pop_setRating(asin, rating);
			document.images["stars." + asin].src = s9_pop_starImages[rating];
		}
		
		var isOwned = s9_pop_savedIsOwned[asin];
		if (isOwned != undefined) {
			s9_pop_setIsOwned(asin, isOwned);
			document.images["isOwned." + asin].src = s9_pop_checkboxImages[isOwned ? 1 : 0];
		}

		var notInterested = s9_pop_savedNotInterested[asin];
		if (notInterested != undefined) {
			s9_pop_setNotInterested(asin, notInterested);
			document.images["notInterested." + asin].src = s9_pop_checkboxImages[notInterested ? 1 : 0];
		}
	} catch (e) {}
}

function s9_pop_beforeHide(oPopover) {
	try {
		var popInfo = oPopover.thingID.split('_');
		var asin = popInfo[popInfo.length - 1];
		s9_pop_savedRatings[asin] = s9_pop_getRating(asin);
		s9_pop_savedIsOwned[asin] = s9_pop_getIsOwned(asin);
		s9_pop_savedNotInterested[asin] = s9_pop_getNotInterested(asin);
	} catch (e) { }
	return true;
}

function s9_pop_isJsfEnabled() {
    var enabled = false;
    if (window.gaN2JSLibIds) {
        for (var i = 0; i < gaN2JSLibIds.length; i++) {
            if (gaN2JSLibIds[i] == 'multiPanePopover') {
                enabled = true;
            }
        }
    }
    return enabled;
}