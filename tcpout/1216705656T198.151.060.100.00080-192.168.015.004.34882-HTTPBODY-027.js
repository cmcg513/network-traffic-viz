//bleach@orbitz.com - 09.04.04 - Deal Detector

var runUnLoadActivity=true;
var minutes=60; //how many minutes until the window closes
var closeTime=minutes*1000*60;
var numPerDay = 100; //number of popups to see in one day
var targetWin;

var never=getCookie("ddNever"); //never show this again cookie
var ddNever = new Date();ddNever.setTime(ddNever.getTime() + (1000 * 60 * 60 * 24 * 36500)); //100 years should be long enough

var day=getCookie("ddDay"); //only show once a day cookie
var ddDay = new Date();                                 
var todayMilli = (ddDay.getHours()*3600000);
var dayMilli = (1000 * 60 * 60 * 24 * 1);
ddDay.setTime(ddDay.getTime() + (dayMilli-todayMilli)); 

function getCookie(name){
var cname = name + "=";               
var dc = document.cookie;             
if (dc.length > 0){
	begin = dc.indexOf(cname);       
    if (begin != -1){           
		begin += cname.length;       
        end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
            return unescape(dc.substring(begin, end));
        } 
    }
return null;
}

function setCookie(name, value, expires){
document.cookie = name + "=" + escape(value) + "; path=/" +
((expires == null) ? "" : "; expires=" + expires.toGMTString());
}

function delCookie(name){
document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT" +  "; path=/";
}

function addNoEaEvents() {
	var anchors = document.getElementsByTagName('a');
	for (var i=0;i<anchors.length;i++) {
		var theAnchor = anchors[i];
		if (theAnchor.className != 'eaEnabled') {
			addEvent(theAnchor, 'click', noEA, false);
		}
	}
}



/*
function onLoadActivity(){
	if (window.navigator.userAgent.indexOf("@@SV1") == -1) {
		var targetWin = window.open('', 'exitApp','width=5,height=5,top='+screen.height+',left='+screen.width+'');if (targetWin) targetWin.close();
	} else
	{ runUnLoadActivity = false; }
}
*/
