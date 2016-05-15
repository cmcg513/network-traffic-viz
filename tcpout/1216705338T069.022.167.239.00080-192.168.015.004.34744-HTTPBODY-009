function callCoremetrics( path, pageid, selection)
{

	   var urlStr = '';
	   //Construct the URL to be sent to Coremetrics
	   var cm_sp = 'cm_sp=PCReKit'+ '-_-'+pageid+'-_-'+selection;
	   if(path.indexOf('?') == -1)
	   {
	     urlStr = path + '?'+cm_sp;
	   }else{
	     urlStr = path + '&'+cm_sp;
	   }


	   // The following code is to show the url that we are sending to coremetrics. If cmAlert is present in the
	   // home page request parameter it will show the alert statement.
	   var cmAlert = false;
	   var homePageUrl = location.href;
	   if(homePageUrl.indexOf('?') != -1)
	   {
		var homepagePairs = homePageUrl.split('?');
		var homepageParameters = homepagePairs[1];
		//Since the parameters are seperated by '&' split them
		   var homepageparamPairs = homepageParameters.split('&');
		   for(i=0;i<homepageparamPairs.length;i++)
		   {
		      var homeparam = homepageparamPairs[i];
		      if(homeparam.indexOf('cmAlert') != -1)
		      {
			var ind1 = homeparam.indexOf('=');
			cmAlert = homeparam.substring(ind1+1);
			//alert(cmAlert);
		      }
		   }

	   }

	   if(cmAlert)
	   {
	     alert('url sent to coremetrics is :'+urlStr);
	   }

	   //alert(urlStr);
	   //Calling the Coremetrics JavaScript.
	   cmLIVEviewClick( urlStr, "sitepromo");
}


function setCommnPrefAndCallCoremetrics()
{
   var selection = "";
   var pageid = 'reg_comm|<%=env.getLocale() %>';
   var path = location.href;

   // #41906: Since Member Kits are not valid for hotel Registration,
   // those elements won't be added to the form then.
   // That means that these elements might not exist, hence
   // we should check for null element before evaluating "checked".
   var chkbox = document.getElementById('eKit');
   if(chkbox != null && chkbox.checked)
   {
      selection = 'eKit';
   }
   chkbox = document.getElementById('Mail');
   if(chkbox != null && chkbox.checked)
   {
      selection = 'Mail';
   }

   callCoremetrics( path, pageid, selection);

}
function callPCRCalendarCoremetrics( pageid, brand, language, country, memtype)
{

   var urlStr = '';
   var path = location.href;
   var cm_sp = 'cm_sp=Calendar|'+pageid+'-_-'+brand+'|'+language+'|'+country+'-_-'+memtype;
   if(path.indexOf('?') == -1)
   {
   	     urlStr = path + '?'+cm_sp;
   }else{
   	     urlStr = path + '&'+cm_sp;
   }

   var cmAlert = coremetricsAlert();
   if(cmAlert)
   {
        alert('url sent to coremetrics is :'+urlStr);
   }

    //Calling the Coremetrics JavaScript.
    cmLIVEviewClick( urlStr, "sitepromo");

}


function coremetricsAlert()
{

   // The following code is to show the url that we are sending to coremetrics. If cmAlert is present in the
   // home page request parameter it will show the alert statement.
   var cmAlert = false;
   var homePageUrl = location.href;
   if(homePageUrl.indexOf('?') != -1)
   {
	var homepagePairs = homePageUrl.split('?');
	var homepageParameters = homepagePairs[1];
	//Since the parameters are seperated by '&' split them
	   var homepageparamPairs = homepageParameters.split('&');
	   for(i=0;i<homepageparamPairs.length;i++)
	   {
	      var homeparam = homepageparamPairs[i];
	      if(homeparam.indexOf('cmAlert') != -1)
	      {
		var ind1 = homeparam.indexOf('=');
		cmAlert = homeparam.substring(ind1+1);
		//alert(cmAlert);
	      }
	   }

   }

   return cmAlert;

}

function callRoomPreferenceCoremetrics(formName, from) {
	if (formName!=null && formName.roomTypePreference !=null) {
		var selectedRoomTypeCode = formName.roomTypePreference.value;
		var reportTypeName = "tproompref?cm_re=ADA-_-" + from + "-_-" + selectedRoomTypeCode;
		cmLIVEviewClick(reportTypeName, 'Flash');
	}
}

