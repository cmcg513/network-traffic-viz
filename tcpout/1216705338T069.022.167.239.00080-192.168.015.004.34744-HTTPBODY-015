/**
 * Webtrends logging script.
 * @author Cameron Stokes
 * @version $Header: @(#) /ccviews/genesis_ua_fd/genesis_ua/Source/Docroot/js/webtrends.js@@/main/15  2003-06-12 12:43:56 GMT  StokesC $
 * @created 3/18/2003
 */
var dcs_imgarray = new Array;
var dcs_ptr = 0;
var dCurrent = new Date();
var DCS=new Object();
var WT=new Object();
var DCSext=new Object();



function dcs_var(){
	WT.tz = dCurrent.getTimezoneOffset();
	WT.ul = navigator.appName=="Netscape" ? navigator.language : navigator.userLanguage;
	WT.cd = screen.colorDepth;
	WT.sr = screen.width+"x"+screen.height;
	WT.jo = navigator.javaEnabled() ? "Yes" : "No";
	WT.r = Math.random();
	//WT.ti   = document.title;
	DCS.dcsdat = dCurrent.getTime();
	if ((window.document.referrer != "") && (window.document.referrer != "-")){
		if (!(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) < 4) ){
			DCS.dcsref = window.document.referrer;
		}
	}

	DCS.dcsuri = window.location.pathname;
	DCS.dcsqry = window.location.search;
	DCS.dcssip = window.location.hostname;

}

function A(N,V){
	return "&"+N+"="+escape(V);
}

function dcs_createImage(dcs_src) {
	if (document.images){
		dcs_imgarray[dcs_ptr] = new Image;
		dcs_imgarray[dcs_ptr].src = dcs_src;
		dcs_ptr++;
	}
}

function dcsMeta(){
	var MRV="";
	var F=false;
	var myDocumentElements;
	if (document.all){
		F = true;
		myDocumentElements=document.all.tags("meta");
	}
	if (!F && document.documentElement){
		F = true;
		myDocumentElements=document.getElementsByTagName("meta");
	}
	if (F){
		for (var i=1; i<=myDocumentElements.length;i++){
			myMeta=myDocumentElements.item(i-1);
			if (myMeta.name) {
				if (myMeta.name.indexOf('WT.')==0){
					if (WT[myMeta.name.substring(3)])
						WT[myMeta.name.substring(3)]+=";"+myMeta.content;
					else
						WT[myMeta.name.substring(3)]=myMeta.content;					
				}
				if (myMeta.name.indexOf('DCSext.')==0){
					if (DCSext[myMeta.name.substring(7)])
						DCSext[myMeta.name.substring(7)]+=";"+myMeta.content;
					else
						DCSext[myMeta.name.substring(7)]=myMeta.content;
				}
			}
		}
	}
}

function dcs_TAG(TagImage){
	var gotoastFound = false;

	for (T in WT) {
		if (T.indexOf('goToastID')>-1) {
			gotoastFound = true;
		}
	}

	if (gotoastFound) {
		var P ="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+TagImage+"/dcs.gif?";
		for (N in DCS){P+=A( N, DCS[N]);}
		for (N in WT){P+=A( "WT."+N, WT[N]);}
		for (N in DCSext){P+=A( N, DCSext[N]);}
		//P+="&dcsp3p=0000000008048000001202000,http://"+dcsADDR+"/w3c/policy.xml";

		dcs_createImage(P);
	}
}

function dcs_ReRun(URI,QRY,INC,JS){
	if (!INC)
		WT = new Object();
	if (JS)
		dcs_var();
	DCS.dcsuri = URI;
	DCS.dcsqry = QRY;
	//dcs_TAG(TagPath);
}

function dcs_Hit(URI,QRY) {
	dcs_ReRun(URI,QRY,true,true);
}

function adClick(NAME) {
	dcs_ReRun("wt_redirect","WT.ac="+NAME,false,true);
	return true;
}

function adView(NAME) {
	dcs_ReRun("wt_redirect","WT.ad="+NAME,false,true);
	return true;
}

dcsMeta();
dcs_var();

if (window.location.protocol.indexOf('https:')==0) {
	dcs_TAG("secure.ichotelsgroup.com");
}
else {
	dcs_TAG("www.ichotelsgroup.com");
}