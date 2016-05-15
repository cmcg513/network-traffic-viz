function sendToMobile(currentListing) {
	var mhud = document.getElementById("mobileHUD");
	var cloc = document.getElementById(currentListing);
	var madd = document.getElementById(currentListing+"Address");
	var clis = document.getElementById("currentListing");
	clis.value = currentListing;
	//alert(clis.value);
	mhud.style.display = "block";
	mhud.style.top =  (findPosY(cloc)+20)+"px";
	mhud.style.left =  (findPosX(cloc)-200)+"px";
	mhud.style.zIndex = 0;
	//alert(findPosX(cloc)+" - "+findPosY(cloc));
}

function showBusVideo(videoFile,currentListing) {
		var mhud = document.getElementById("showBusVideoHUD");
		var cloc = document.getElementById(currentListing);
		mhud.style.display = "block";
		mhud.style.top =  (findPosY(cloc)+10)+"px";
		mhud.style.left =  (findPosX(cloc)-300)+"px";
		mhud.style.zIndex = 0;
		var FO = { movie:"/flash/hellovideoplayer.swf?videoFile="+videoFile, width:"335", height:"295", majorversion:"8", build:"0", xi:"true", wmode:"transparent" };
		UFO.create(FO, "videoGuts");
//		var descriptionObj = document.getElementById("videoDescription");
//		descriptionObj.innerHTML = "<h2 class=\"hdr\">" + unescape(videoTitle) + "<\/h2><br \/><div style=\"padding-left: 10px;\">" + unescape(videoDescription) + "<\/div>";
}

function sendToMobileSingle(currentListing) {
	var mhud = document.getElementById("mobileHUD");
	var cloc = document.getElementById(currentListing);
	var madd = document.getElementById(currentListing+"Address");
	var clis = document.getElementById("currentListing");
	clis.value = currentListing;
	//alert(clis.value);
	mhud.style.display = "block";
	mhud.style.top =  (findPosY(cloc)+20)+"px";
	mhud.style.left =  (findPosX(cloc)+5)+"px";
	mhud.style.zIndex = 0;
}

function closeHUD(currentHUD) {
	var chud = document.getElementById(currentHUD);
	chud.style.display = "none";
}

function findPosX(obj) {
    var curleft = 0;
    if(obj.offsetParent)
        while(1) 
        {
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.x)
        curleft += obj.x;
    return curleft;
}

  function findPosY(obj)
	{
		var curtop = 0;
		if(obj.offsetParent)
		while(1)
		{
		curtop += obj.offsetTop;
		if(!obj.offsetParent)
			break;
			obj = obj.offsetParent;
		}
		else if(obj.y)
			curtop += obj.y;
			return curtop;
		}

function createRequestObject() {
    var ro;
    var browser = navigator.appName;
    if(browser == "Microsoft Internet Explorer"){
        ro = new ActiveXObject("Microsoft.XMLHTTP");
    }else{
        ro = new XMLHttpRequest();
    }
    return ro;
}

var http = createRequestObject();

function sndReq() {
	var clid = document.getElementById("currentListing");
	var clmn = document.getElementById("mobileNumber");
	var caid = "Address"+clid.value;
	var clad = document.getElementById(caid);
 	http.open('get', '/sms/sendsms.cfm?msisdn='+clmn.value+'&sms='+clad.value);
    http.onreadystatechange = handleResponse;
    http.send(null);
}

function sndReqFromMap() {
	var clid = document.getElementById("currentListing");
	var clmn = document.getElementById("mobileNumber");
	var caid = "Address"+clid.value;
	var mfb = document.getElementById("mobileFormBox");
	var clad = document.getElementById(caid);
 	http.open('get', '/sms/sendsms.cfm?msisdn='+clmn.value+'&sms='+clad.value);
    http.onreadystatechange = handleResponse;
    http.send(null);
    mfb.innerHTML = "<br /><br /><h3>Your message has been sent, thank you.</h3>";
}

function sndMobiReq() {
	var maid = document.getElementById("mobiAddress");
	var mamn = document.getElementById("mobileNumberToMobi");
 	http.open('get', '/sms/sendsms.cfm?msisdn='+mamn.value+'&sms='+maid.value);
    http.onreadystatechange = handleResponse;
    http.send(null);
}

function updateHUD() {
  document.getElementById("mobileHUDTwo").innerHTML = "<span style=\"color: red; font-weight: bold;\">Thank you, You should recieve a text message in a few moments.</span>";
}

function handleResponse() {
    /*if(http.readyState == 4){
        var response = http.responseText;
        var update = new Array();

        if(response.indexOf('|' != -1)) {
            update = response.split('|');
            document.getElementById(update[0]).innerHTML = update[1];
        }
    }*/
}
