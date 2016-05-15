document.write("<style type='text/css'>img#Orig{max-height:70px;min-height:70px;height:expression(this.height > 70 ? 70: true);}</style>");
document.write("<style type='text/css'>div.divOrig{float:left;margin-right:5px;margin-top:0px;margin-bottom:1px;vspace:2;hspace:10;}</style>");
document.write("<style type='text/css'>{padding: 2px;}.IAAd {padding-top:2px;padding-bottom: 4px;}.IAAd div.ddTitle{padding-left: 1px;text-decoration: underline;font-weight: bold;}.ddUrl {position: relative; width:98%; white-space: nowrap; overflow: hidden; padding-left: 1px; }.IAAd a,.IAAd a:link, .IAAd a:active, .IAAd a:visited {background-image: none;padding-left: 0px;position: relative;}.IAAd a:hover div.ddDesc,.IAAd a:hover div.ddTitle, .IAAd a:hover div.ddUrl {background-color: #FFFFCC;}.IAAd div.ddDesc {padding-left: 1px;padding-right: 4px;color:#000000;}</style>")
var lIAContent =  "";

function d_m_Z(clickURL, titleText, descriptionText, advertiserDisplayURL, advertiserCompleteURL, ss, clickable)
{
   var lDiv = document.createElement('div');	
   var img = document.createElement("img");
   
   img.src = GetIAProductImageDetails(ss,titleText,descriptionText,advertiserCompleteURL.replace(' ',''),'',false);

   lDiv.innerHTML = "";

   if (clickable != null)	
   	lDiv.innerHTML = "<a id='clk"+adCount+"' href='"+clickURL+"'>" + lDiv.innerHTML +"</a>";

   lIAContent += "<table width='100%' cellpadding='0' cellspacing='0' style='padding-bottom:4px;border-bottom: solid 1px #cccccc;'><tr><td valign='top' height='60px' style='margin-right:10px'><div class='divOrig' id='divOrig"+adCount+"'>"+lDiv.innerHTML+"</div></td><td valign='top' wrap='true'><div class='IAAd ddAd"+adCount+"'><a target='_blank' href='"+clickURL+"' onclick='IA_Click(\""+advertiserCompleteURL+"\",\""+clickURL+"\")'><div class='ddTitle'>"+titleText+"</div><div class='ddDesc'>"+descriptionText+"</div><div class='ddUrl'><font size='1' color='#008A1D'>"+advertiserDisplayURL+"</font></div></a></div></td></tr></table><br>";

   var lDivs = document.getElementsByTagName("DIV");
   var lDivID = "";

   for (var i = 0; i < lDivs.length; i++)
   {
	if (lDivs[i].id.indexOf("div_yahooimageads") != -1)
	lDivID = lDivs[i].id;
   }

   var lDivObj = document.getElementById(lDivID);

   lDivObj.innerHTML = "";
   lDivObj.innerHTML = lIAContent; 
   lDivObj.innerHTML = lDivObj.innerHTML.replace(/IA Content/g, "");
   lDivObj.innerHTML = lDivObj.innerHTML.replace(/<div class=yahooAd><\/div>/gi, "");
}

function IA_Click(advertiserCompleteURL,clickURL)
{
	var mltClick = new Image(1,1);
	mltClick.src = "http://iaoc.worthathousandwords.com/iaoc.gif?pid="+PropertyID+"&ss="+IASearchString+"&advname="+advertiserCompleteURL+"&sty=Z&dm="+escape(unescape(DomainUrl))+"&url="+escape(unescape(clickURL))+"&gp=&loc=1";
}













