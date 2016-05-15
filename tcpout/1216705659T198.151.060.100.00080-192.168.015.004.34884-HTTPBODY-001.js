
self.onerror=function(){return true;}
var log=new function(){this.debug=function(str){}
this.warning=function(str){}
this.info=function(str){}
this.error=function(str){}}
var dlog=new function(){this.alert=function(){}}
var agt=navigator.userAgent.toLowerCase();var is_major=parseInt(navigator.appVersion);var is_minor=parseFloat(navigator.appVersion);var is_saf_build=parseFloat(agt.substring(agt.indexOf("safari")+7));var is_nav=((agt.indexOf('mozilla')!=-1)&&(agt.indexOf('spoofer')==-1)&&(agt.indexOf('compatible')==-1)&&(agt.indexOf('opera')==-1)&&(agt.indexOf('webtv')==-1));var is_nav4up=(is_nav&&(is_major>=4&&is_major<5));var is_nav6=(is_nav&&(is_major>=5));var is_nav6x=(is_nav&&(is_major==5)&&(agt.indexOf("netscape6")!=-1));var is_ie=(agt.indexOf("msie")!=-1);var is_ie3=(is_ie&&(is_major<4));var is_ie4=(is_ie&&(is_major==4)&&(agt.indexOf("msie 5.0")==-1));var is_ie4up=(is_ie&&(is_major>=4));var is_ie5x=(is_ie&&(is_major==4)&&(agt.indexOf("msie 5")!=-1));var is_ie5=(is_ie&&(is_major==4)&&(agt.indexOf("msie 5.0")!=-1));var is_ie55=(is_ie&&(is_major==4)&&(agt.indexOf("msie 5.5")!=-1));var is_ie5up=(is_ie&&!is_ie3&&!is_ie4);var is_ie6down=(is_ie&&(is_major<=6));if(document.images){var isIE6CSS=(document.compatMode&&document.compatMode.indexOf("CSS1")>=0)?true:false;}
var is_saf=(agt.indexOf("safari")!=-1);var is_saf12up=(is_saf&&is_saf_build>=125);var is_win=((agt.indexOf("win")!=-1)||(agt.indexOf("16bit")!=-1));var is_mac=(agt.indexOf("mac")!=-1);var is_linux=(agt.indexOf("inux")!=-1);var is_unix=((agt.indexOf("x11")!=-1)||is_linux);var is_mobile=((agt.indexOf("windows ce")!=-1)||(agt.indexOf("blackberry")!=-1)||(agt.indexOf("UP.Browser")!=-1)||(agt.indexOf("netfront")!=-1)||(agt.indexOf("blazer")!=-1)||(agt.indexOf("avantgo")!=-1)||(agt.indexOf("nokia")!=-1));if(is_mobile){document.location="/shared/util/mobileRedirect.jsp";}else{if(!document.getElementById||(is_ie5x&&!is_ie55)||is_nav6x||(is_saf&&!is_saf12up)){document.location="/shared/util/browserUpgrade.jsp";}}
var ie5=document.all&&document.getElementById
var ns6=document.getElementById&&!document.all
var closeFlag=0
var offY;var offX;var today=new Date();var thisDay=today.getDate();var thisMonth=today.getMonth();var thisYear=y2k(today.getYear());var monthArray=new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');var dayArray=new Array(31,28,31,30,31,30,31,31,30,31,30,31);function y2k(number){return(number<1000)?number+1900:number;}
function setArrays(){if(((thisYear%4==0)&&(thisYear%100!=0))||(thisYear%400==0))
dayArray[1]=29;}
function changeDate(ddArray,whichDD){if(ddArray.length>=4){var sMo=ddArray[0];var sDy=ddArray[1];var eMo=ddArray[2];var eDy=ddArray[3];if(whichDD!=3&&whichDD!=4)
changeDateGen(sMo,sDy,eMo,eDy,whichDD);}}
function changeDateGen(sMo,sDy,eMo,eDy,whichDD){var sMoIndex=sMo.options.selectedIndex;var sDyIndex=sDy.options.selectedIndex;var eMoIndex=eMo.options.selectedIndex;var eDyIndex=eDy.options.selectedIndex;var sDate=getDDdate(sMo,sDy);var eDate=getDDdate(eMo,eDy);if(whichDD==0&&sDate>eDate){if(whichCal==1){setDDdate(eMo,eDy,addDays(sDate,tripLength));}else if(whichCal==2){setDDdate(sMo,sDy,addDays(eDate,-1*tripLength));}}else if(sMoIndex>eMoIndex){if(whichDD==1){eMo.options.selectedIndex=sMoIndex;if(sDyIndex>eDyIndex)setDDdate(eMo,eDy,addDays(sDate,tripLength));}else if(whichDD==3){sMo.options.selectedIndex=eMoIndex;if(sDyIndex>eDyIndex)setDDdate(sMo,sDy,addDays(eDate,-1*tripLength));}}else if(sMoIndex==eMoIndex&&sDyIndex>eDyIndex){if(whichDD==1){setDDdate(eMo,eDy,addDays(sDate,tripLength));}else if(whichDD==2){setDDdate(eMo,eDy,addDays(sDate,tripLength));}else if(whichDD==4){setDDdate(sMo,sDy,addDays(eDate,-1*tripLength));}}}
function getDDdate(moDD,dyDD){var moYr=moDD.options[moDD.options.selectedIndex].value.split(" ");var mo=moYr[0].substr(0,3);var yr=(moYr.length>1)?moYr[1]:thisYear;var dy=dyDD.options[dyDD.options.selectedIndex].value;for(i=0;i<monthArray.length;i++){if(monthArray[i]==mo)break;}
return new Date(yr,i,dy);}
function getMonthLength(mo){mo=mo.substr(0,3).toLowerCase();for(var i=0;i<monthArray.length;i++){if(monthArray[i].toLowerCase()==mo)break;}
return dayArray[i];return 31;}
function setDDdate(moDD,dyDD,theDate){var maxMoYr=moDD.options[moDD.options.length-1].value;maxMoYr=maxMoYr.split(" ");var maxDy=getMonthLength(maxMoYr[0]);var yr=theDate.getFullYear();var mo=monthArray[theDate.getMonth()];var dy=theDate.getDate();var matchedMo=-1;var isCurrentYear=(yr==thisYear)?true:false;var matchVal=(yr==thisYear)?mo:mo+" "+yr;for(var i=0;i<moDD.options.length;i++){if(isCurrentYear&&(moDD.options[i].value==matchVal.substr(0,3))){matchedMo=i;break;}else if(!isCurrentYear&&(moDD.options[i].value==matchVal.substr(0,3))){matchedMo=i;break;}}
if(matchedMo==-1)dy=1;moDD.options.selectedIndex=Math.max(0,matchedMo);if(whichCalsNum>0||isNaN(parseInt(dyDD.options[0].value))){dyDD.options.selectedIndex=dy;}else{dyDD.options.selectedIndex=dy-1;}
if($(moDD).id=='inMonth'&&$(dyDD).id=='inDay')
{$('yearIn').value=yr;}
else if($(moDD).id=='outMonth'&&$(dyDD).id=='outDay')
{$('yearOut').value=yr;}}
function addDays(theDate,days){if(!days)days=0;var mseconds=theDate.getTime()+86400000*days;return new Date(mseconds);}
var theForm;var dateDDs=new Array();var whichCal=0;var whichCalsNum=0;var tripLength=7;var changeDates=true;function selectDate(dy,moYr){moYr=moYr.split(" ");var mo=moYr[0].substr(0,3);var yr=moYr[1];var theDate=new Date(mo+" "+dy+", "+yr);var moDD,dyDD;if(whichCalsNum>0){var monthDDType=(whichCal==1)?'monthInPIB':'monthOutPIB';var dayDDType=(whichCal==1)?'dayInPIB':'dayOutPIB';moDD=document.getElementById(monthDDType+whichCalsNum);dyDD=document.getElementById(dayDDType+whichCalsNum);}else{moDD=dateDDs[(whichCal*2)-2];dyDD=dateDDs[(whichCal*2)-1];}
setDDdate(moDD,dyDD,theDate,0);if(changeDates){if(whichCalsNum>0){whichCalsNum=0;moDD.onchange();dyDD.onchange();}
if(dateDDs.length==4)changeDateGen(dateDDs[0],dateDDs[1],dateDDs[2],dateDDs[3],0);else if(dateDDs.length>4)changeMultiDate(whichCal,0);}
whichCal=0;}
function changeMultiDate(whichDate,whichDD){var whichMoDD=(whichDate-1)*2;var whichDyDD=whichMoDD+1;var dateDiff=0;var i,firsti,whichDDofFour;whichCal=2;for(i=firsti=whichDate-1;i>=1;i--){dateDiff=(firsti-i)*2;whichDDofFour=(i==firsti&&whichDD>0)?whichDD+2:0;changeDateGen(dateDDs[whichMoDD-dateDiff-2],dateDDs[whichDyDD-dateDiff-2],dateDDs[whichMoDD-dateDiff],dateDDs[whichDyDD-dateDiff],whichDDofFour);}
whichCal=1;for(i=firsti=whichDate+1;i<=(dateDDs.length/2);i++){dateDiff=(i-firsti)*2;whichDDofFour=(i==firsti&&whichDD>0)?whichDD:0;changeDateGen(dateDDs[whichMoDD+dateDiff],dateDDs[whichDyDD+dateDiff],dateDDs[whichMoDD+dateDiff+2],dateDDs[whichDyDD+dateDiff+2],whichDDofFour);}
whichCal=0;}
function textFocus(el,val){if(val){el.defaultValue=val;if(el.value==val)el.select();}
else if((el.value!="")||(el.value!=" ")){el.select();}}
function textBlur(el,val){if(val)el.defaultValue=val;if((el.value=="")||(el.value==" ")){}}
function MM_reloadPage(init){if(init)with(navigator){if((appName=="Netscape")&&(parseInt(appVersion)==4)){document.MM_pgW=innerWidth;document.MM_pgH=innerHeight;onresize=MM_reloadPage;}}else if(innerWidth!=document.MM_pgW||innerHeight!=document.MM_pgH){location.reload();}}
function MM_findObj(n,d){var p,i,x;if(!d)d=document;if((p=n.indexOf("?"))>0&&parent.frames.length){d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);}
if(!(x=d[n])&&d.all)x=d.all[n];for(i=0;!x&&i<d.forms.length;i++)x=d.forms[i][n];for(i=0;!x&&d.layers&&i<d.layers.length;i++)x=MM_findObj(n,d.layers[i].document);if(!x&&d.getElementById)x=d.getElementById(n);return x;}
function MM_showHideLayers(){var i,p,v,obj,args=MM_showHideLayers.arguments;for(i=0;i<(args.length-1);i+=2)if((obj=MM_findObj(args[i]))!=null){v=args[i+1];if(obj.style){obj=obj.style;v=(v=='show')?'visible':(v=='hide')?'hidden':v;}
obj.visibility=v;}}
MM_reloadPage(true);function isXPSP2(){var isSP2=window.navigator.userAgent.indexOf("SV1")!=-1;return isSP2;}
function moveLists(fList,tList){var fromList=document.getElementById(fList);var toList=document.getElementById(tList);if(fromList.selectedIndex!=-1){for(i=0;i<fromList.length;i++){if(fromList.options[i].selected==true){toListlen=toList.length;toList.options[toListlen]=new Option(fromList.options[i].text,fromList.options[i].value);}}
for(i=(fromList.length-1);i>=0;i--){if(fromList.options[i].selected==true){fromList.options[i]=null;}}}else{alert("Please select an item to move.");}}
function msgUserPopUpBlockerIsOn(){if(document.getElementById("blockedPUMesgBox")){document.getElementById("blockedPUMesgBox").style.display="block";}}
function popUpGen(page,w,h,id,globalProps,sWindowName){if(!sWindowName)sWindowName="oPop";if(!id)id="popup";if(!globalProps)globalProps="resizable=yes,menubar=no,status=no,scrollbars=yes,toolbar=no,directories=no,location=no";if(!w||w=='')w=500;if(!h||h=='')h=500;var win;if(navigator.appName=='Netscape'){win=window.open(page,id,'width='+w+',height='+h+','+globalProps+',screenX=0,screenY=0');}else{win=window.open(page,id,'width='+w+',height='+h+','+globalProps+',top=0,left=0');}
eval(sWindowName+" = win");if(isXPSP2()&&win==null){msgUserPopUpBlockerIsOn();}else{win.focus();}
return false;}
function addEvent(obj,evType,fn,useCapture){if(obj.addEventListener){obj.addEventListener(evType,fn,useCapture);return true;}else if(obj.attachEvent){var r=obj.attachEvent("on"+evType,fn);return r;}}
function popUpHotwire(page){return popUpGen(page,760,620,'hotwire','resizable=yes,menubar=yes,status=yes,scrollbars=yes,toolbar=yes,directories=yes,location=yes');}
function popUpPrintItin(url){return popUpGen(url,635,600,'print','resizable=yes,menubar=yes,status=no,scrollbars=yes,toolbar=no,directories=no,location=no');}
function popUp(page){return popUpGen('/'+page+'.jsp',420,400,'popup');}
function popUpHelp(page){return popUpGen('/help/'+page+'.jsp',420,400,'popuphelp');}
var calendarLink="/App/ViewCalendar";function popUpCal(n){whichCalsNum=0;whichCal=n;var setMonth="";if(arguments.length>1){var monthDDType=(whichCal==1)?'monthInPIB':'monthOutPIB';whichCalsNum=arguments[1];var monthDD=document.getElementById(monthDDType+whichCalsNum);if(monthDD.value=='none'||monthDD.value==''){setMonth=monthDD.options[1].value.split(" ");}else{setMonth=monthDD.value.split(" ");}}else{setMonth=dateDDs[(n-1)*2].options[dateDDs[(n-1)*2].options.selectedIndex].value.split(" ");}
var setYear=setMonth[1]?setMonth[1]:"";setMonth=setMonth[0];var token=calendarLink.indexOf("?")==-1?"?":"&";return popUpGen(calendarLink+token+"n="+n+"&view=calendar&setMonth="+setMonth+"&setYear="+setYear,200,390,'popupcal','resizable=yes,menubar=no,status=no,scrollbars=no,toolbar=no,directories=no,location=no');}
function popUpAirCode(){return popUpGen('/shared/pagedef/content/air/airportCodes.jsp',600,725,'popupaircode');}
function popUpLearnMore(url){return popUpGen(url,500,400,'popuplearnmore');}
function popUpReg(page){return popUpGen('/App/global/legal/'+page+'.jsp',550,500);}
function closeWin(){window.close();return true;}
var sCount=0;function stepCount(){sCount++;document.write(sCount);}
var field_length=0;function tabNext(obj,event,len,next_field){if(event=="down"){field_length=obj.value.length;}
else if(event=="up"){if(obj.value.length!=field_length){field_length=obj.value.length;if(field_length==len){next_field.focus();}}}}
function selectCheck(formName,checkName){if(document.forms[formName].elements[checkName].checked){document.forms[formName].elements[checkName].checked=false;}
else{document.forms[formName].elements[checkName].checked=true;}}
function selectRadioBtn(formName,radioGroupName,btnIndex){var radioBtns=document.forms[formName].elements[radioGroupName];radioBtns[btnIndex].checked=true;}
var text="";text+='<style type="text/css">\n';text+='td   {font-family: arial, sans-serif; font-size: 12px;}\n';text+='p   {font-family: arial, sans-serif; font-size: 12px;}\n';text+='input  {font-family: arial, sans-serif; font-size: 12px; margin: 0px;}\n';text+='select  {font-family: arial, sans-serif; font-size: 12px; margin: 0px}\n';text+='.t1  {font-family: arial, sans-serif; font-size: 10px;}\n';text+='.t2  {font-family: arial, sans-serif; font-size: 11px;}\n';text+='.t3  {font-family: arial, sans-serif; font-size: 12px;}\n';text+='.dealList {padding-bottom: 0px; padding-right: 0px; line-height: normal;}\n';text+='</style>';if(document.layers){document.write(text);}
var ieStyle="";ieStyle+='<style type="text/css">\n';ieStyle+='.radioOutdent {margin-left: -6px;}\n'
ieStyle+='.checkOutdent {margin-left: -4px;}\n'
ieStyle+='</style>';if(is_ie4up&&is_win){document.write(ieStyle);}
var nnStyle="";nnStyle+='<style type="text/css">\n';nnStyle+='.radioMargin {margin-right: 6px;}\n'
nnStyle+='</style>';if(is_nav6&&is_win){document.write(nnStyle);}
function bonusDays(el,legs){if(el.checked){dateDDs[0].selectedIndex=0;dateDDs[1].selectedIndex=0;if(legs==2){dateDDs[2].selectedIndex=0;dateDDs[3].selectedIndex=0;}}}
function activateCkbox(id){if(document.getElementById(id))
document.getElementById(id).checked=true;}
function toggleCheckbox(el){el.checked=!el.checked;}
function changeStatus(txt){if(!txt)txt="";window.status=txt;return true;}
function stripYears(x){for(var i=x.options.length-1;i>=0;i--){noYear=x.options[i].text.split(' ');x.options[i].text=noYear[0];}}
function botInit(){}
function pageInit(){}
function init(){setArrays();botInit();pageInit();}
var isDynamicPackage=false;var nothing="";function jumpMenu(targ,selObj,restore){eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");if(restore)selObj.selectedIndex=0;}
var alphabet=new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");function goToLetter(selectBox,letter){var idx;for(var n=0;n<selectBox.options.length;n++){var firstLetter=selectBox.options[n].text.charAt(0).toUpperCase();if(firstLetter==letter){idx=n;var scroll=selectBox.options.length-1;selectBox.selectedIndex=scroll;selectBox.selectedIndex=idx;break;}else if(n==selectBox.options.length-1){if(letter=="A"){selectBox.selectedIndex=0;}else if(letter=="Z"){selectBox.selectedIndex=selectBox.options.length-1;}else{for(var t=0;t<alphabet.length;t++){if(alphabet[t]==letter){var newLetter=alphabet[t+1];}}
goToLetter(selectBox,newLetter);}}}}
function toggleCkbox(id){if(document.getElementById){document.getElementById(id).checked=true;}}
var runUnLoadActivity=true;function unLoadActivity(){};function onLoadActivity(){};function noEA(){runUnLoadActivity=false;}
function formHIASubmit(){var a=formHIASubmit.arguments;var f=document[formHIASubmit.arguments[0]];f.action=formHIASubmit.arguments[1];l=a.length;for(i=2;i<l;i+=1){pair=a[i].split('|');el=pair[0];newVal=pair[1];if(!f[el]){var h=document.createElement('INPUT');h.type='hidden';h.name=el;f.appendChild(h);h.value=newVal;}else{f[el].value=newVal;}}
f.submit();return false;}
function formSubmit(){var a=formSubmit.arguments;var f=document[formSubmit.arguments[0]];for(var i=1;i<a.length;i++){var pair=a[i].split('|');var el=pair[0];var newVal=pair[1];if(!f[el]){var h=document.createElement('INPUT');h.type='hidden';h.name=el;f.appendChild(h);h.value=newVal;}else{f[el].value=newVal;}}
f.submit();return false;}
function dpToggle(x){document.getElementById('check'+x).checked=true;document.dpswitch.submit();}
function goTo(URL){self.location=URL;}
function restrictLength(field,n){if(field.value.length>n){field.value=field.value.substring(0,n);}}
var custom_var,_sp='%3A\\/\\/',_rp='%3A//',_poE=0.0,_poX=0.0,_sH=screen.height,_d=document,_w=window,_ht=escape(_w.location.href),_hr=_d.referrer,_tm=(new Date()).getTime(),_kp=0,_sW=screen.width;_d.onkeypress=_fK;function _fK(_e){if(!_e)_e=_w.event;var _k=(typeof _e.which=='number')?_e.which:_e.keyCode;if((_kp==15&&_k==12))_w.open('http://www.opinionlab.com/ozone/24-7.asp?referer='+_fC(_ht),'Report','width=370,height=200,resizable=no,copyhistory=no,scrollbars=no');_kp=_k};function _fC(_u){_aT=_sp+',\\/,\\.,-,_,'+_rp+',%2F,%2E,%2D,%5F';_aA=_aT.split(',');for(i=0;i<5;i++){eval('_u=_u.replace(/'+_aA[i]+'/g,_aA[i+5])')}return _u};function O_LC(){_w.open('http://ccc01.opinionlab.com/comment_card.asp?time1='+_tm+'&time2='+(new Date()).getTime()+'&prev='+_fC(escape(_hr))+'&referer='+_fC(_ht)+'&height='+_sH+'&width='+_sW+'&custom_var='+custom_var,'comments','width=535,height=192,screenX='+((_sW-535)/2)+',screenY='+((_sH-192)/2)+',top='+((_sH-192)/2)+',left='+((_sW-535)/2)+',resizable=yes,copyhistory=yes,scrollbars=no')};function _fPe(){if(Math.random()>=1.0-_poE){O_LC();_poX=0.0}};function _fPx(){if(Math.random()>=1.0-_poX)O_LC()};window.onunload=_fPx;function O_GoT(_p){_d.write('<a href=\'javascript:O_LC()\'>'+_p+'</a>');_fPe()}
function submitWithActionFromHref(a){var f=getParentFormFromElement(a);if(f!=null){f.action=a.href;f.submit();}else{return true;}
return false;}
function submitWithActionFromHrefBots(tabClicked){var redirectUrl=tabClicked.href;var oldBotId=botMgr.getActiveBotId();if(oldBotId=='amc'||oldBotId=='aow')oldBotId='air';if(oldBotId=='rentcar'||oldBotId=='carserv')oldBotId='car';switch(tabClicked.id){case"quickSearchTab":var elemRef=getRef(botMgr.getActiveBotId()+'searchType');var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(elemRef)elemRef.value='qs';if(curRef)curRef.value='qs';if(preRef)preRef.value=oldBotId;break;case"flightsTab":var elemRef=getRef(botMgr.getActiveBotId()+'searchType');var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(elemRef)elemRef.value='air';if(curRef)curRef.value='air';if(preRef)preRef.value=oldBotId;break;case"hotelsTab":var elemRef=getRef(botMgr.getActiveBotId()+'orbotHotelSearchTypeKey');var searchRef=getRef(botMgr.getActiveBotId()+'searchType');var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(elemRef)elemRef.value='H';if(searchRef)searchRef.value='hotel';if(curRef)curRef.value='htl';if(preRef)preRef.value=oldBotId;break;case"carsTab":var elemRef=getRef(botMgr.getActiveBotId()+'searchType');var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(elemRef)elemRef.value='car';if(curRef)curRef.value='car';if(preRef)preRef.value=oldBotId;break;case"packagesTab":var elemRef=getRef(botMgr.getActiveBotId()+'searchType');var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(elemRef)elemRef.value='package';if(curRef)curRef.value='package';if(preRef)preRef.value=oldBotId;break;case"activitiesTab":var elemRef=getRef(botMgr.getActiveBotId()+'searchType');var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(elemRef)elemRef.value='oas';if(curRef)curRef.value='oas';if(preRef)preRef.value=oldBotId;break;}
clickSubmit('expand');return false;}
function submitWithActionFromElement(el,url){var f=getParentFormFromElement(el);if(f!=null){f.action=document.getElementById(url).value;f.submit();}else{return true;}
return false;}
function getParentFormFromElement(el){while(el.parentNode!=null&&el.tagName.toUpperCase()!='FORM'){el=el.parentNode;}
return el;}
function changeCss(id,style){document.getElementById(id).className=style;}
function expandPromoCode(){document.getElementById('promoDirections').className+=" visible";document.getElementById('expand').className+=" expanded";}
function collapsePromoCode(){document.getElementById('promoDirections').className=document.getElementById('promoDirections').className.replace(new RegExp(" visible\\b"),"");document.getElementById('expand').className=document.getElementById('expand').className.replace(new RegExp(" expanded\\b"),"");}
function hasClass(element,currentClass){var found=false;if(element&&element.className){var classes=element.className.split(" ");for(var i=0;i<classes.length;i++){if(classes[i]==currentClass){found=true;break;}}}
return found;}
function getElementsByClass(elements,currentClass)
{var classElements=new Array();for(var i=0;i<elements.length;i++)
{if(hasClass(elements[i],currentClass))
{classElements.push(elements[i]);}}
return classElements;}
function emptyOptions(selectBox){var length=selectBox.options.length;while(length>0){selectBox.options[0]=null;length=selectBox.options.length;}
return true;}
function populateOptions(selectBox,objArray,selectValue){var length=selectBox.options.length;if(length>0){emptyOptions(selectBox);}
for(i=0;i<objArray.length;i++){selectBox.options[i]=new Option(objArray[i][0],objArray[i][1]);if(objArray[i][1]==selectValue){selectBox.options[i].selected=true;}}
return true;}
var closeFlag=0
function closeit(status){if(status==0&&closeFlag==0){var objDiv=document.getElementById("dwindow");var objDiv1=document.getElementById("discountWindow");var objDiv2=document.getElementById("learnMoreWindow");if(objDiv!=null)
document.getElementById("dwindow").style.display="none";if(objDiv1!=null)
objDiv1.style.display="none";if(objDiv2!=null)
objDiv2.style.display="none";}
else if(status==1){closeFlag=1}
else{closeFlag=0}}
function setAllCheckboxes(containerId,groupName,checkedStatus){var inputs=document.getElementById(containerId).getElementsByTagName("input");for(var i=0;i<inputs.length;i++){if(inputs[i].type=="checkbox"&&(!inputs[i].disabled)){inputs[i].checked=checkedStatus;}}}
function toggleListSelects(interactiveState)
{if(interactiveState=="off")
{disableLinks();document.getElementById('assignedGroupsList').disabled=true;document.getElementById('unassignedGroupsList').disabled=true;document.getElementById('addLink').style.color="#aaa";document.getElementById('removeLink').style.color="#aaa";document.getElementById('addLink').style.color="#aaa";document.getElementById('assignedGroupsListLabel').style.color="#aaa";document.getElementById('unassignedGroupsListLabel').style.color="#aaa";}
if(interactiveState=="on")
{enableLinks();document.getElementById('assignedGroupsList').disabled=false;document.getElementById('unassignedGroupsList').disabled=false;document.getElementById('addLink').style.color="";document.getElementById('removeLink').style.color="";document.getElementById('assignedGroupsListLabel').style.color="#000";document.getElementById('unassignedGroupsListLabel').style.color="#000";}}
function enableLinks()
{if(document.getElementById('addLink')){document.getElementById('addLink').onclick=enableAddLink;document.getElementById('removeLink').onclick=enableRemoveLink;}}
function disableLinks()
{if(document.getElementById('addLink')){document.getElementById('addLink').onclick=noClick;document.getElementById('removeLink').onclick=noClick;}}
function noClick(){}
function enableAddLink()
{moveLists('unassignedGroupsList','assignedGroupsList');}
function enableRemoveLink()
{moveLists('assignedGroupsList','unassignedGroupsList');}
function enableMoveLists()
{submitActions('assignedGroupsList','assignedGroups');}
function toggleAnswersList(interactiveState){var signs=document.getElementsByClassName('handle');var questionActive=document.getElementsByClassName('questionActive');var counter=document.getElementsByClassName('counter');if(interactiveState=='off'){$('hideRevealLinks').style.visibility="hidden";var changeList=document.getElementsByClassName("hrReveal",$('questionsList'));for(var i=0;i<changeList.length;i++){changeList[i].removeClassName("hrReveal");changeList[i].addClassName("hrHide");}
for(var i=0;i<signs.length;i++){signs[i].hide();}
for(var i=0;i<questionActive.length;i++){questionActive[i].hide();}
for(var i=0;i<counter.length;i++){counter[i].hide();}}
else{$('hideRevealLinks').style.visibility="visible";for(var i=0;i<signs.length;i++){signs[i].show();}
for(var i=0;i<questionActive.length;i++){questionActive[i].show();}
for(var i=0;i<counter.length;i++){counter[i].show();}}}
function submitActions(selectId,listId){var e=document.getElementById(selectId);var list="";for(var i=0;i<e.options.length;i++){list+=e.options[i].value+",";}
document.getElementById(listId).value=list;}
function getInsideWindowWidth(){if(window.innerWidth){return window.innerWidth;}else if(isIE6CSS){return document.body.parentElement.clientWidth}else if(document.body&&document.body.clientWidth){return document.body.clientWidth;}
return 0;}
function getInsideWindowHeight(){if(window.innerHeight){return window.innerHeight;}else if(isIE6CSS){return document.body.parentElement.clientHeight}else if(document.body&&document.body.clientHeight){return document.body.clientHeight;}
return 0;}
function popupPosition(event){var browserWidth=0;browserHeight=0;if(typeof(window.innerWidth)=='number'){browserWidth=window.innerWidth;browserHeight=window.innerHeight;}else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){browserWidth=document.documentElement.clientWidth;browserHeight=document.documentElement.clientHeight;}else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){browserWidth=document.body.clientWidth;browserHeight=document.body.clientHeight;}
var scrollX=0,scrollY=0;if(typeof(window.pageYOffset)=='number'){scrollY=window.pageYOffset;scrollX=window.pageXOffset;}else if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){scrollY=document.body.scrollTop;scrollX=document.body.scrollLeft;}else if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){scrollY=document.documentElement.scrollTop;scrollX=document.documentElement.scrollLeft;}
windowLeft=scrollX;windowTop=scrollY;windowRight=browserWidth+scrollX;windowBottom=browserHeight+scrollY;clickX=event.clientX;clickY=event.clientY;popupDefaultOffsetX=50;popupDefaultOffsetY=-50;popupWidth=295;popupHeight=350;popupX=clickX+popupDefaultOffsetX+scrollX;popupY=clickY+popupDefaultOffsetY+scrollY;if(popupX+popupWidth>windowRight){popupX=clickX-(popupDefaultOffsetX+popupWidth);}
if(popupX<windowLeft){popupX=windowLeft+50;}
if((popupY+popupHeight)>windowBottom){popupY=windowBottom-(popupHeight+25);}
if(popupY<windowTop){popupY=scrollY;}
offX=popupX;offY=popupY;}
function loadwindowBMSM(url,offset,link){if(!ie5&&!ns6)
window.open(url,"","scrollbars=1")
else{document.getElementById(link).style.display=''
document.getElementById(link).style.width=295+"px"
document.getElementById(link).style.height=400+"px"
document.getElementById(link).style.left=offX+"px"
document.getElementById(link).style.top=offY-offset+"px"
if(link=='discountWindow'){document.getElementById("contentFrame").src=url;}
else{document.getElementById("learnMoreContentFrame").src=url
document.getElementById(link).style.width=355+"px"
document.getElementById(link).style.height=332+"px"}}}
function changeTab(tabName,controlId){$(controlId).className="";$(controlId).addClassName(tabName);}
function scrollToElementInBlock(blockId,eleId){if(document.getElementById(blockId)&&document.getElementById(eleId)){document.getElementById(blockId).scrollTop=document.getElementById(eleId).offsetTop;}}
/*  Prototype JavaScript framework, version 1.5.0
 *  (c) 2005-2007 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
/*--------------------------------------------------------------------------*/

var Prototype = {
  Version: '1.5.0',
  BrowserFeatures: {
    XPath: !!document.evaluate
  },

  ScriptFragment: '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)',
  emptyFunction: function() {},
  K: function(x) { return x }
}

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

var Abstract = new Object();

Object.extend = function(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
}

Object.extend(Object, {
  inspect: function(object) {
    try {
      if (object === undefined) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : object.toString();
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  },

  keys: function(object) {
    var keys = [];
    for (var property in object)
      keys.push(property);
    return keys;
  },

  values: function(object) {
    var values = [];
    for (var property in object)
      values.push(object[property]);
    return values;
  },

  clone: function(object) {
    return Object.extend({}, object);
  }
});

Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
}

Function.prototype.bindAsEventListener = function(object) {
  var __method = this, args = $A(arguments), object = args.shift();
  return function(event) {
    return __method.apply(object, [( event || window.event)].concat(args).concat($A(arguments)));
  }
}

Object.extend(Number.prototype, {
  toColorPart: function() {
    var digits = this.toString(16);
    if (this < 16) return '0' + digits;
    return digits;
  },

  succ: function() {
    return this + 1;
  },

  times: function(iterator) {
    $R(0, this, true).each(iterator);
    return this;
  }
});

var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }

    return returnValue;
  }
}

/*--------------------------------------------------------------------------*/

var PeriodicalExecuter = Class.create();
PeriodicalExecuter.prototype = {
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  stop: function() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.callback(this);
      } finally {
        this.currentlyExecuting = false;
      }
    }
  }
}
String.interpret = function(value){
  return value == null ? '' : String(value);
}

Object.extend(String.prototype, {
  gsub: function(pattern, replacement) {
    var result = '', source = this, match;
    replacement = arguments.callee.prepareReplacement(replacement);

    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  },

  sub: function(pattern, replacement, count) {
    replacement = this.gsub.prepareReplacement(replacement);
    count = count === undefined ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  },

  scan: function(pattern, iterator) {
    this.gsub(pattern, iterator);
    return this;
  },

  truncate: function(length, truncation) {
    length = length || 30;
    truncation = truncation === undefined ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : this;
  },

  strip: function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  },

  stripTags: function() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },

  stripScripts: function() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  },

  extractScripts: function() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  },

  evalScripts: function() {
    return this.extractScripts().map(function(script) { return eval(script) });
  },

  escapeHTML: function() {
    var div = document.createElement('div');
    var text = document.createTextNode(this);
    div.appendChild(text);
    return div.innerHTML;
  },

  unescapeHTML: function() {
    var div = document.createElement('div');
    div.innerHTML = this.stripTags();
    return div.childNodes[0] ? (div.childNodes.length > 1 ?
      $A(div.childNodes).inject('',function(memo,node){ return memo+node.nodeValue }) :
      div.childNodes[0].nodeValue) : '';
  },

  toQueryParams: function(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return {};

    return match[1].split(separator || '&').inject({}, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var name = decodeURIComponent(pair[0]);
        var value = pair[1] ? decodeURIComponent(pair[1]) : undefined;

        if (hash[name] !== undefined) {
          if (hash[name].constructor != Array)
            hash[name] = [hash[name]];
          if (value) hash[name].push(value);
        }
        else hash[name] = value;
      }
      return hash;
    });
  },

  toArray: function() {
    return this.split('');
  },

  succ: function() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  },

  camelize: function() {
    var parts = this.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = this.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
  },

  capitalize: function(){
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  },

  underscore: function() {
    return this.gsub(/::/, '/').gsub(/([A-Z]+)([A-Z][a-z])/,'#{1}_#{2}').gsub(/([a-z\d])([A-Z])/,'#{1}_#{2}').gsub(/-/,'_').toLowerCase();
  },

  dasherize: function() {
    return this.gsub(/_/,'-');
  },

  inspect: function(useDoubleQuotes) {
    var escapedString = this.replace(/\\/g, '\\\\');
    if (useDoubleQuotes)
      return '"' + escapedString.replace(/"/g, '\\"') + '"';
    else
      return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  }
});

String.prototype.gsub.prepareReplacement = function(replacement) {
  if (typeof replacement == 'function') return replacement;
  var template = new Template(replacement);
  return function(match) { return template.evaluate(match) };
}

String.prototype.parseQuery = String.prototype.toQueryParams;

var Template = Class.create();
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
Template.prototype = {
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern  = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    return this.template.gsub(this.pattern, function(match) {
      var before = match[1];
      if (before == '\\') return match[2];
      return before + String.interpret(object[match[3]]);
    });
  }
}

var $break    = new Object();
var $continue = new Object();

var Enumerable = {
  each: function(iterator) {
    var index = 0;
    try {
      this._each(function(value) {
        try {
          iterator(value, index++);
        } catch (e) {
          if (e != $continue) throw e;
        }
      });
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  },

  eachSlice: function(number, iterator) {
    var index = -number, slices = [], array = this.toArray();
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.map(iterator);
  },

  all: function(iterator) {
    var result = true;
    this.each(function(value, index) {
      result = result && !!(iterator || Prototype.K)(value, index);
      if (!result) throw $break;
    });
    return result;
  },

  any: function(iterator) {
    var result = false;
    this.each(function(value, index) {
      if (result = !!(iterator || Prototype.K)(value, index))
        throw $break;
    });
    return result;
  },

  collect: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      results.push((iterator || Prototype.K)(value, index));
    });
    return results;
  },

  detect: function(iterator) {
    var result;
    this.each(function(value, index) {
      if (iterator(value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  },

  findAll: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (iterator(value, index))
        results.push(value);
    });
    return results;
  },

  grep: function(pattern, iterator) {
    var results = [];
    this.each(function(value, index) {
      var stringValue = value.toString();
      if (stringValue.match(pattern))
        results.push((iterator || Prototype.K)(value, index));
    })
    return results;
  },

  include: function(object) {
    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  },

  inGroupsOf: function(number, fillWith) {
    fillWith = fillWith === undefined ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  },

  inject: function(memo, iterator) {
    this.each(function(value, index) {
      memo = iterator(memo, value, index);
    });
    return memo;
  },

  invoke: function(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  },

  max: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (result == undefined || value >= result)
        result = value;
    });
    return result;
  },

  min: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (result == undefined || value < result)
        result = value;
    });
    return result;
  },

  partition: function(iterator) {
    var trues = [], falses = [];
    this.each(function(value, index) {
      ((iterator || Prototype.K)(value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  },

  pluck: function(property) {
    var results = [];
    this.each(function(value, index) {
      results.push(value[property]);
    });
    return results;
  },

  reject: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator(value, index))
        results.push(value);
    });
    return results;
  },

  sortBy: function(iterator) {
    return this.map(function(value, index) {
      return {value: value, criteria: iterator(value, index)};
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  },

  toArray: function() {
    return this.map();
  },

  zip: function() {
    var iterator = Prototype.K, args = $A(arguments);
    if (typeof args.last() == 'function')
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  },

  size: function() {
    return this.toArray().length;
  },

  inspect: function() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }
}

Object.extend(Enumerable, {
  map:     Enumerable.collect,
  find:    Enumerable.detect,
  select:  Enumerable.findAll,
  member:  Enumerable.include,
  entries: Enumerable.toArray
});
var $A = Array.from = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0, length = iterable.length; i < length; i++)
      results.push(iterable[i]);
    return results;
  }
}

Object.extend(Array.prototype, Enumerable);

if (!Array.prototype._reverse)
  Array.prototype._reverse = Array.prototype.reverse;

Object.extend(Array.prototype, {
  _each: function(iterator) {
    for (var i = 0, length = this.length; i < length; i++)
      iterator(this[i]);
  },

  clear: function() {
    this.length = 0;
    return this;
  },

  first: function() {
    return this[0];
  },

  last: function() {
    return this[this.length - 1];
  },

  compact: function() {
    return this.select(function(value) {
      return value != null;
    });
  },

  flatten: function() {
    return this.inject([], function(array, value) {
      return array.concat(value && value.constructor == Array ?
        value.flatten() : [value]);
    });
  },

  without: function() {
    var values = $A(arguments);
    return this.select(function(value) {
      return !values.include(value);
    });
  },

  indexOf: function(object) {
    for (var i = 0, length = this.length; i < length; i++)
      if (this[i] == object) return i;
    return -1;
  },

  reverse: function(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  },

  reduce: function() {
    return this.length > 1 ? this : this[0];
  },

  uniq: function() {
    return this.inject([], function(array, value) {
      return array.include(value) ? array : array.concat([value]);
    });
  },

  clone: function() {
    return [].concat(this);
  },

  size: function() {
    return this.length;
  },

  inspect: function() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }
});

Array.prototype.toArray = Array.prototype.clone;

function $w(string){
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

if(window.opera){
  Array.prototype.concat = function(){
    var array = [];
    for(var i = 0, length = this.length; i < length; i++) array.push(this[i]);
    for(var i = 0, length = arguments.length; i < length; i++) {
      if(arguments[i].constructor == Array) {
        for(var j = 0, arrayLength = arguments[i].length; j < arrayLength; j++)
          array.push(arguments[i][j]);
      } else {
        array.push(arguments[i]);
      }
    }
    return array;
  }
}
var Hash = function(obj) {
  Object.extend(this, obj || {});
};

Object.extend(Hash, {
  toQueryString: function(obj) {
    var parts = [];

	  this.prototype._each.call(obj, function(pair) {
      if (!pair.key) return;

      if (pair.value && pair.value.constructor == Array) {
        var values = pair.value.compact();
        if (values.length < 2) pair.value = values.reduce();
        else {
        	key = encodeURIComponent(pair.key);
          values.each(function(value) {
            value = value != undefined ? encodeURIComponent(value) : '';
            parts.push(key + '=' + encodeURIComponent(value));
          });
          return;
        }
      }
      if (pair.value == undefined) pair[1] = '';
      parts.push(pair.map(encodeURIComponent).join('='));
	  });

    return parts.join('&');
  }
});

Object.extend(Hash.prototype, Enumerable);
Object.extend(Hash.prototype, {
  _each: function(iterator) {
    for (var key in this) {
      var value = this[key];
      if (value && value == Hash.prototype[key]) continue;

      var pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator(pair);
    }
  },

  keys: function() {
    return this.pluck('key');
  },

  values: function() {
    return this.pluck('value');
  },

  merge: function(hash) {
    return $H(hash).inject(this, function(mergedHash, pair) {
      mergedHash[pair.key] = pair.value;
      return mergedHash;
    });
  },

  remove: function() {
    var result;
    for(var i = 0, length = arguments.length; i < length; i++) {
      var value = this[arguments[i]];
      if (value !== undefined){
        if (result === undefined) result = value;
        else {
          if (result.constructor != Array) result = [result];
          result.push(value)
        }
      }
      delete this[arguments[i]];
    }
    return result;
  },

  toQueryString: function() {
    return Hash.toQueryString(this);
  },

  inspect: function() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }
});

function $H(object) {
  if (object && object.constructor == Hash) return object;
  return new Hash(object);
};
ObjectRange = Class.create();
Object.extend(ObjectRange.prototype, Enumerable);
Object.extend(ObjectRange.prototype, {
  initialize: function(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  },

  _each: function(iterator) {
    var value = this.start;
    while (this.include(value)) {
      iterator(value);
      value = value.succ();
    }
  },

  include: function(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }
});

var $R = function(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
}

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (typeof responder[callback] == 'function') {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) {}
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate: function() {
    Ajax.activeRequestCount++;
  },
  onComplete: function() {
    Ajax.activeRequestCount--;
  }
});

Ajax.Base = function() {};
Ajax.Base.prototype = {
  setOptions: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   ''
    }
    Object.extend(this.options, options || {});

    this.options.method = this.options.method.toLowerCase();
    if (typeof this.options.parameters == 'string')
      this.options.parameters = this.options.parameters.toQueryParams();
  }
}

Ajax.Request = Class.create();
Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

Ajax.Request.prototype = Object.extend(new Ajax.Base(), {
  _complete: false,

  initialize: function(url, options) {
    this.transport = Ajax.getTransport();
    this.setOptions(options);
    this.request(url);
  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = this.options.parameters;

    if (!['get', 'post'].include(this.method)) {
      // simulate other verbs over post
      params['_method'] = this.method;
      this.method = 'post';
    }

    params = Hash.toQueryString(params);
    if (params && /Konqueror|Safari|KHTML/.test(navigator.userAgent)) params += '&_='

    // when GET, append parameters to URL
    if (this.method == 'get' && params)
      this.url += (this.url.indexOf('?') > -1 ? '&' : '?') + params;

    try {
      Ajax.Responders.dispatch('onCreate', this, this.transport);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous)
        setTimeout(function() { this.respondToReadyState(1) }.bind(this), 10);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      var body = this.method == 'post' ? (this.options.postBody || params) : null;

      this.transport.send(body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    // user-defined headers
    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (typeof extras.push == 'function')
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    return !this.transport.status
        || (this.transport.status >= 200 && this.transport.status < 300);
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState];
    var transport = this.transport, json = this.evalJSON();

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + this.transport.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(transport, json);
      } catch (e) {
        this.dispatchException(e);
      }

      if ((this.getHeader('Content-type') || 'text/javascript').strip().
        match(/^(text|application)\/(x-)?(java|ecma)script(;.*)?$/i))
          this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(transport, json);
      Ajax.Responders.dispatch('on' + state, this, transport, json);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      // avoid memory leak in MSIE: clean up
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name);
    } catch (e) { return null }
  },

  evalJSON: function() {
    try {
      var json = this.getHeader('X-JSON');
      return json ? eval('(' + json + ')') : null;
    } catch (e) { return null }
  },

  evalResponse: function() {
    try {
      return eval(this.transport.responseText);
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Updater = Class.create();

Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
  initialize: function(container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    }

    this.transport = Ajax.getTransport();
    this.setOptions(options);

    var onComplete = this.options.onComplete || Prototype.emptyFunction;
    this.options.onComplete = (function(transport, param) {
      this.updateContent();
      onComplete(transport, param);
    }).bind(this);

    this.request(url);
  },

  updateContent: function() {
    var receiver = this.container[this.success() ? 'success' : 'failure'];
    var response = this.transport.responseText;

    if (!this.options.evalScripts) response = response.stripScripts();

    if (receiver = $(receiver)) {
      if (this.options.insertion)
        new this.options.insertion(receiver, response);
      else
        receiver.update(response);
    }

    if (this.success()) {
      if (this.onComplete)
        setTimeout(this.onComplete.bind(this), 10);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create();
Ajax.PeriodicalUpdater.prototype = Object.extend(new Ajax.Base(), {
  initialize: function(container, url, options) {
    this.setOptions(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = {};
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(request) {
    if (this.options.decay) {
      this.decay = (request.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = request.responseText;
    }
    this.timer = setTimeout(this.onTimerEvent.bind(this),
      this.decay * this.frequency * 1000);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});
function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (typeof element == 'string')
    element = document.getElementById(element);
  return Element.extend(element);
}

if (Prototype.BrowserFeatures.XPath) {
  document._getElementsByXPath = function(expression, parentElement) {
    var results = [];
    var query = document.evaluate(expression, $(parentElement) || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
      results.push(query.snapshotItem(i));
    return results;
  };
}

document.getElementsByClassName = function(className, parentElement) {
  if (Prototype.BrowserFeatures.XPath) {
    var q = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
    return document._getElementsByXPath(q, parentElement);
  } else {
    var children = ($(parentElement) || document.body).getElementsByTagName('*');
    var elements = [], child;
    for (var i = 0, length = children.length; i < length; i++) {
      child = children[i];
      if (Element.hasClassName(child, className))
        elements.push(Element.extend(child));
    }
    return elements;
  }
};

/*--------------------------------------------------------------------------*/

if (!window.Element)
  var Element = new Object();

Element.extend = function(element) {
  if (!element || _nativeExtensions || element.nodeType == 3) return element;

  if (!element._extended && element.tagName && element != window) {
    var methods = Object.clone(Element.Methods), cache = Element.extend.cache;

    if (element.tagName == 'FORM')
      Object.extend(methods, Form.Methods);
    if (['INPUT', 'TEXTAREA', 'SELECT'].include(element.tagName))
      Object.extend(methods, Form.Element.Methods);

    Object.extend(methods, Element.Methods.Simulated);

    for (var property in methods) {
      var value = methods[property];
      if (typeof value == 'function' && !(property in element))
        element[property] = cache.findOrStore(value);
    }
  }

  element._extended = true;
  return element;
};

Element.extend.cache = {
  findOrStore: function(value) {
    return this[value] = this[value] || function() {
      return value.apply(null, [this].concat($A(arguments)));
    }
  }
};

Element.Methods = {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function(element) {
    element = $(element);
    Element[Element.visible(element) ? 'hide' : 'show'](element);
    return element;
  },

  hide: function(element) {
    $(element).style.display = 'none';
    return element;
  },

  show: function(element) {
    $(element).style.display = '';
    return element;
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  },

  update: function(element, html) {
    html = typeof html == 'undefined' ? '' : html.toString();
    $(element).innerHTML = html.stripScripts();
    setTimeout(function() {html.evalScripts()}, 10);
    return element;
  },

  replace: function(element, html) {
    element = $(element);
    html = typeof html == 'undefined' ? '' : html.toString();
    if (element.outerHTML) {
      element.outerHTML = html.stripScripts();
    } else {
      var range = element.ownerDocument.createRange();
      range.selectNodeContents(element);
      element.parentNode.replaceChild(
        range.createContextualFragment(html.stripScripts()), element);
    }
    setTimeout(function() {html.evalScripts()}, 10);
    return element;
  },

  inspect: function(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();
    $H({'id': 'id', 'className': 'class'}).each(function(pair) {
      var property = pair.first(), attribute = pair.last();
      var value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    });
    return result + '>';
  },

  recursivelyCollect: function(element, property) {
    element = $(element);
    var elements = [];
    while (element = element[property])
      if (element.nodeType == 1)
        elements.push(Element.extend(element));
    return elements;
  },

  ancestors: function(element) {
    return $(element).recursivelyCollect('parentNode');
  },

  descendants: function(element) {
    return $A($(element).getElementsByTagName('*'));
  },

  immediateDescendants: function(element) {
    if (!(element = $(element).firstChild)) return [];
    while (element && element.nodeType != 1) element = element.nextSibling;
    if (element) return [element].concat($(element).nextSiblings());
    return [];
  },

  previousSiblings: function(element) {
    return $(element).recursivelyCollect('previousSibling');
  },

  nextSiblings: function(element) {
    return $(element).recursivelyCollect('nextSibling');
  },

  siblings: function(element) {
    element = $(element);
    return element.previousSiblings().reverse().concat(element.nextSiblings());
  },

  match: function(element, selector) {
    if (typeof selector == 'string')
      selector = new Selector(selector);
    return selector.match($(element));
  },

  up: function(element, expression, index) {
    return Selector.findElement($(element).ancestors(), expression, index);
  },

  down: function(element, expression, index) {
    return Selector.findElement($(element).descendants(), expression, index);
  },

  previous: function(element, expression, index) {
    return Selector.findElement($(element).previousSiblings(), expression, index);
  },

  next: function(element, expression, index) {
    return Selector.findElement($(element).nextSiblings(), expression, index);
  },

  getElementsBySelector: function() {
    var args = $A(arguments), element = $(args.shift());
    return Selector.findChildElements(element, args);
  },

  getElementsByClassName: function(element, className) {
    return document.getElementsByClassName(className, element);
  },

  readAttribute: function(element, name) {
    element = $(element);
    if (document.all && !window.opera) {
      var t = Element._attributeTranslations;
      if (t.values[name]) return t.values[name](element, name);
      if (t.names[name])  name = t.names[name];
      var attribute = element.attributes[name];
      if(attribute) return attribute.nodeValue;
    }
    return element.getAttribute(name);
  },

  getHeight: function(element) {
    return $(element).getDimensions().height;
  },

  getWidth: function(element) {
    return $(element).getDimensions().width;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    var elementClassName = element.className;
    if (elementClassName.length == 0) return false;
    if (elementClassName == className ||
        elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
      return true;
    return false;
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    Element.classNames(element).add(className);
    return element;
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    Element.classNames(element).remove(className);
    return element;
  },

  toggleClassName: function(element, className) {
    if (!(element = $(element))) return;
    Element.classNames(element)[element.hasClassName(className) ? 'remove' : 'add'](className);
    return element;
  },

  observe: function() {
    Event.observe.apply(Event, arguments);
    return $A(arguments).first();
  },

  stopObserving: function() {
    Event.stopObserving.apply(Event, arguments);
    return $A(arguments).first();
  },

  // removes whitespace-only text node children
  cleanWhitespace: function(element) {
    element = $(element);
    var node = element.firstChild;
    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  },

  empty: function(element) {
    return $(element).innerHTML.match(/^\s*$/);
  },

  descendantOf: function(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    while (element = element.parentNode)
      if (element == ancestor) return true;
    return false;
  },

  scrollTo: function(element) {
    element = $(element);
    var pos = Position.cumulativeOffset(element);
    window.scrollTo(pos[0], pos[1]);
    return element;
  },

  getStyle: function(element, style) {
    element = $(element);
    if (['float','cssFloat'].include(style))
      style = (typeof element.style.styleFloat != 'undefined' ? 'styleFloat' : 'cssFloat');
    style = style.camelize();
    var value = element.style[style];
    if (!value) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        var css = document.defaultView.getComputedStyle(element, null);
        value = css ? css[style] : null;
      } else if (element.currentStyle) {
        value = element.currentStyle[style];
      }
    }

    if((value == 'auto') && ['width','height'].include(style) && (element.getStyle('display') != 'none'))
      value = element['offset'+style.capitalize()] + 'px';

    if (window.opera && ['left', 'top', 'right', 'bottom'].include(style))
      if (Element.getStyle(element, 'position') == 'static') value = 'auto';
    if(style == 'opacity') {
      if(value) return parseFloat(value);
      if(value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/))
        if(value[1]) return parseFloat(value[1]) / 100;
      return 1.0;
    }
    return value == 'auto' ? null : value;
  },

  setStyle: function(element, style) {
    element = $(element);
    for (var name in style) {
      var value = style[name];
      if(name == 'opacity') {
        if (value == 1) {
          value = (/Gecko/.test(navigator.userAgent) &&
            !/Konqueror|Safari|KHTML/.test(navigator.userAgent)) ? 0.999999 : 1.0;
          if(/MSIE/.test(navigator.userAgent) && !window.opera)
            element.style.filter = element.getStyle('filter').replace(/alpha\([^\)]*\)/gi,'');
        } else if(value == '') {
          if(/MSIE/.test(navigator.userAgent) && !window.opera)
            element.style.filter = element.getStyle('filter').replace(/alpha\([^\)]*\)/gi,'');
        } else {
          if(value < 0.00001) value = 0;
          if(/MSIE/.test(navigator.userAgent) && !window.opera)
            element.style.filter = element.getStyle('filter').replace(/alpha\([^\)]*\)/gi,'') +
              'alpha(opacity='+value*100+')';
        }
      } else if(['float','cssFloat'].include(name)) name = (typeof element.style.styleFloat != 'undefined') ? 'styleFloat' : 'cssFloat';
      element.style[name.camelize()] = value;
    }
    return element;
  },

  getDimensions: function(element) {
    element = $(element);
    var display = $(element).getStyle('display');
    if (display != 'none' && display != null) // Safari bug
      return {width: element.offsetWidth, height: element.offsetHeight};

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    var originalDisplay = els.display;
    els.visibility = 'hidden';
    els.position = 'absolute';
    els.display = 'block';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = originalDisplay;
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      // Opera returns the offset relative to the positioning context, when an
      // element is position relative but top and left have not been defined
      if (window.opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
    return element;
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
    return element;
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return element;
    element._overflow = element.style.overflow || 'auto';
    if ((Element.getStyle(element, 'overflow') || 'visible') != 'hidden')
      element.style.overflow = 'hidden';
    return element;
  },

  undoClipping: function(element) {
    element = $(element);
    if (!element._overflow) return element;
    element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;
    element._overflow = null;
    return element;
  }
};

Object.extend(Element.Methods, {childOf: Element.Methods.descendantOf});

Element._attributeTranslations = {};

Element._attributeTranslations.names = {
  colspan:   "colSpan",
  rowspan:   "rowSpan",
  valign:    "vAlign",
  datetime:  "dateTime",
  accesskey: "accessKey",
  tabindex:  "tabIndex",
  enctype:   "encType",
  maxlength: "maxLength",
  readonly:  "readOnly",
  longdesc:  "longDesc"
};

Element._attributeTranslations.values = {
  _getAttr: function(element, attribute) {
    return element.getAttribute(attribute, 2);
  },

  _flag: function(element, attribute) {
    return $(element).hasAttribute(attribute) ? attribute : null;
  },

  style: function(element) {
    return element.style.cssText.toLowerCase();
  },

  title: function(element) {
    var node = element.getAttributeNode('title');
    return node.specified ? node.nodeValue : null;
  }
};

Object.extend(Element._attributeTranslations.values, {
  href: Element._attributeTranslations.values._getAttr,
  src:  Element._attributeTranslations.values._getAttr,
  disabled: Element._attributeTranslations.values._flag,
  checked:  Element._attributeTranslations.values._flag,
  readonly: Element._attributeTranslations.values._flag,
  multiple: Element._attributeTranslations.values._flag
});

Element.Methods.Simulated = {
  hasAttribute: function(element, attribute) {
    var t = Element._attributeTranslations;
    attribute = t.names[attribute] || attribute;
    return $(element).getAttributeNode(attribute).specified;
  }
};

// IE is missing .innerHTML support for TABLE-related elements
if (document.all && !window.opera){
  Element.Methods.update = function(element, html) {
    element = $(element);
    html = typeof html == 'undefined' ? '' : html.toString();
    var tagName = element.tagName.toUpperCase();
    if (['THEAD','TBODY','TR','TD'].include(tagName)) {
      var div = document.createElement('div');
      switch (tagName) {
        case 'THEAD':
        case 'TBODY':
          div.innerHTML = '<table><tbody>' +  html.stripScripts() + '</tbody></table>';
          depth = 2;
          break;
        case 'TR':
          div.innerHTML = '<table><tbody><tr>' +  html.stripScripts() + '</tr></tbody></table>';
          depth = 3;
          break;
        case 'TD':
          div.innerHTML = '<table><tbody><tr><td>' +  html.stripScripts() + '</td></tr></tbody></table>';
          depth = 4;
      }
      $A(element.childNodes).each(function(node){
        element.removeChild(node)
      });
      depth.times(function(){ div = div.firstChild });

      $A(div.childNodes).each(
        function(node){ element.appendChild(node) });
    } else {
      element.innerHTML = html.stripScripts();
    }
    setTimeout(function() {html.evalScripts()}, 10);
    return element;
  }
};

Object.extend(Element, Element.Methods);

var _nativeExtensions = false;

if(/Konqueror|Safari|KHTML/.test(navigator.userAgent))
  ['', 'Form', 'Input', 'TextArea', 'Select'].each(function(tag) {
    var className = 'HTML' + tag + 'Element';
    if(window[className]) return;
    var klass = window[className] = {};
    klass.prototype = document.createElement(tag ? tag.toLowerCase() : 'div').__proto__;
  });

Element.addMethods = function(methods) {
  Object.extend(Element.Methods, methods || {});

  function copy(methods, destination, onlyIfAbsent) {
    onlyIfAbsent = onlyIfAbsent || false;
    var cache = Element.extend.cache;
    for (var property in methods) {
      var value = methods[property];
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = cache.findOrStore(value);
    }
  }

  if (typeof HTMLElement != 'undefined') {
    copy(Element.Methods, HTMLElement.prototype);
    copy(Element.Methods.Simulated, HTMLElement.prototype, true);
    copy(Form.Methods, HTMLFormElement.prototype);
    [HTMLInputElement, HTMLTextAreaElement, HTMLSelectElement].each(function(klass) {
      copy(Form.Element.Methods, klass.prototype);
    });
    _nativeExtensions = true;
  }
}

var Toggle = new Object();
Toggle.display = Element.toggle;

/*--------------------------------------------------------------------------*/

Abstract.Insertion = function(adjacency) {
  this.adjacency = adjacency;
}

Abstract.Insertion.prototype = {
  initialize: function(element, content) {
    this.element = $(element);
    this.content = content.stripScripts();

    if (this.adjacency && this.element.insertAdjacentHTML) {
      try {
        this.element.insertAdjacentHTML(this.adjacency, this.content);
      } catch (e) {
        var tagName = this.element.tagName.toUpperCase();
        if (['TBODY', 'TR'].include(tagName)) {
          this.insertContent(this.contentFromAnonymousTable());
        } else {
          throw e;
        }
      }
    } else {
      this.range = this.element.ownerDocument.createRange();
      if (this.initializeRange) this.initializeRange();
      this.insertContent([this.range.createContextualFragment(this.content)]);
    }

    setTimeout(function() {content.evalScripts()}, 10);
  },

  contentFromAnonymousTable: function() {
    var div = document.createElement('div');
    div.innerHTML = '<table><tbody>' + this.content + '</tbody></table>';
    return $A(div.childNodes[0].childNodes[0].childNodes);
  }
}

var Insertion = new Object();

Insertion.Before = Class.create();
Insertion.Before.prototype = Object.extend(new Abstract.Insertion('beforeBegin'), {
  initializeRange: function() {
    this.range.setStartBefore(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment, this.element);
    }).bind(this));
  }
});

Insertion.Top = Class.create();
Insertion.Top.prototype = Object.extend(new Abstract.Insertion('afterBegin'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(true);
  },

  insertContent: function(fragments) {
    fragments.reverse(false).each((function(fragment) {
      this.element.insertBefore(fragment, this.element.firstChild);
    }).bind(this));
  }
});

Insertion.Bottom = Class.create();
Insertion.Bottom.prototype = Object.extend(new Abstract.Insertion('beforeEnd'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.appendChild(fragment);
    }).bind(this));
  }
});

Insertion.After = Class.create();
Insertion.After.prototype = Object.extend(new Abstract.Insertion('afterEnd'), {
  initializeRange: function() {
    this.range.setStartAfter(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment,
        this.element.nextSibling);
    }).bind(this));
  }
});

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);
var Selector = Class.create();
Selector.prototype = {
  initialize: function(expression) {
    this.params = {classNames: []};
    this.expression = expression.toString().strip();
    this.parseExpression();
    this.compileMatcher();
  },

  parseExpression: function() {
    function abort(message) { throw 'Parse error in selector: ' + message; }

    if (this.expression == '')  abort('empty expression');

    var params = this.params, expr = this.expression, match, modifier, clause, rest;
    while (match = expr.match(/^(.*)\[([a-z0-9_:-]+?)(?:([~\|!]?=)(?:"([^"]*)"|([^\]\s]*)))?\]$/i)) {
      params.attributes = params.attributes || [];
      params.attributes.push({name: match[2], operator: match[3], value: match[4] || match[5] || ''});
      expr = match[1];
    }

    if (expr == '*') return this.params.wildcard = true;

    while (match = expr.match(/^([^a-z0-9_-])?([a-z0-9_-]+)(.*)/i)) {
      modifier = match[1], clause = match[2], rest = match[3];
      switch (modifier) {
        case '#':       params.id = clause; break;
        case '.':       params.classNames.push(clause); break;
        case '':
        case undefined: params.tagName = clause.toUpperCase(); break;
        default:        abort(expr.inspect());
      }
      expr = rest;
    }

    if (expr.length > 0) abort(expr.inspect());
  },

  buildMatchExpression: function() {
    var params = this.params, conditions = [], clause;

    if (params.wildcard)
      conditions.push('true');
    if (clause = params.id)
      conditions.push('element.readAttribute("id") == ' + clause.inspect());
    if (clause = params.tagName)
      conditions.push('element.tagName.toUpperCase() == ' + clause.inspect());
    if ((clause = params.classNames).length > 0)
      for (var i = 0, length = clause.length; i < length; i++)
        conditions.push('element.hasClassName(' + clause[i].inspect() + ')');
    if (clause = params.attributes) {
      clause.each(function(attribute) {
        var value = 'element.readAttribute(' + attribute.name.inspect() + ')';
        var splitValueBy = function(delimiter) {
          return value + ' && ' + value + '.split(' + delimiter.inspect() + ')';
        }

        switch (attribute.operator) {
          case '=':       conditions.push(value + ' == ' + attribute.value.inspect()); break;
          case '~=':      conditions.push(splitValueBy(' ') + '.include(' + attribute.value.inspect() + ')'); break;
          case '|=':      conditions.push(
                            splitValueBy('-') + '.first().toUpperCase() == ' + attribute.value.toUpperCase().inspect()
                          ); break;
          case '!=':      conditions.push(value + ' != ' + attribute.value.inspect()); break;
          case '':
          case undefined: conditions.push('element.hasAttribute(' + attribute.name.inspect() + ')'); break;
          default:        throw 'Unknown operator ' + attribute.operator + ' in selector';
        }
      });
    }

    return conditions.join(' && ');
  },

  compileMatcher: function() {
    this.match = new Function('element', 'if (!element.tagName) return false; \
      element = $(element); \
      return ' + this.buildMatchExpression());
  },

  findElements: function(scope) {
    var element;

    if (element = $(this.params.id))
      if (this.match(element))
        if (!scope || Element.childOf(element, scope))
          return [element];

    scope = (scope || document).getElementsByTagName(this.params.tagName || '*');

    var results = [];
    for (var i = 0, length = scope.length; i < length; i++)
      if (this.match(element = scope[i]))
        results.push(Element.extend(element));

    return results;
  },

  toString: function() {
    return this.expression;
  }
}

Object.extend(Selector, {
  matchElements: function(elements, expression) {
    var selector = new Selector(expression);
    return elements.select(selector.match.bind(selector)).map(Element.extend);
  },

  findElement: function(elements, expression, index) {
    if (typeof expression == 'number') index = expression, expression = false;
    return Selector.matchElements(elements, expression || '*')[index || 0];
  },

  findChildElements: function(element, expressions) {
    return expressions.map(function(expression) {
      return expression.match(/[^\s"]+(?:"[^"]*"[^\s"]+)*/g).inject([null], function(results, expr) {
        var selector = new Selector(expr);
        return results.inject([], function(elements, result) {
          return elements.concat(selector.findElements(result || element));
        });
      });
    }).flatten();
  }
});

function $$() {
  return Selector.findChildElements(document, $A(arguments));
}
var Form = {
  reset: function(form) {
    $(form).reset();
    return form;
  },

  serializeElements: function(elements, getHash) {
    var data = elements.inject({}, function(result, element) {
      if (!element.disabled && element.name) {
        var key = element.name, value = $(element).getValue();
        if (value != undefined) {
          if (result[key]) {
            if (result[key].constructor != Array) result[key] = [result[key]];
            result[key].push(value);
          }
          else result[key] = value;
        }
      }
      return result;
    });

    return getHash ? data : Hash.toQueryString(data);
  }
};

Form.Methods = {
  serialize: function(form, getHash) {
    return Form.serializeElements(Form.getElements(form), getHash);
  },

  getElements: function(form) {
    return $A($(form).getElementsByTagName('*')).inject([],
      function(elements, child) {
        if (Form.Element.Serializers[child.tagName.toLowerCase()])
          elements.push(Element.extend(child));
        return elements;
      }
    );
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    form.getElements().each(function(element) {
      element.blur();
      element.disabled = 'true';
    });
    return form;
  },

  enable: function(form) {
    form = $(form);
    form.getElements().each(function(element) {
      element.disabled = '';
    });
    return form;
  },

  findFirstElement: function(form) {
    return $(form).getElements().find(function(element) {
      return element.type != 'hidden' && !element.disabled &&
        ['input', 'select', 'textarea'].include(element.tagName.toLowerCase());
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    form.findFirstElement().activate();
    return form;
  }
}

Object.extend(Form, Form.Methods);

/*--------------------------------------------------------------------------*/

Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
}

Form.Element.Methods = {
  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = {};
        pair[element.name] = value;
        return Hash.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    element.focus();
    if (element.select && ( element.tagName.toLowerCase() != 'input' ||
      !['button', 'reset', 'submit'].include(element.type) ) )
      element.select();
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.blur();
    element.disabled = false;
    return element;
  }
}

Object.extend(Form.Element, Form.Element.Methods);
var Field = Form.Element;
var $F = Form.Element.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = {
  input: function(element) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element);
      default:
        return Form.Element.Serializers.textarea(element);
    }
  },

  inputSelector: function(element) {
    return element.checked ? element.value : null;
  },

  textarea: function(element) {
    return element.value;
  },

  select: function(element) {
    return this[element.type == 'select-one' ?
      'selectOne' : 'selectMany'](element);
  },

  selectOne: function(element) {
    var index = element.selectedIndex;
    return index >= 0 ? this.optionValue(element.options[index]) : null;
  },

  selectMany: function(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(this.optionValue(opt));
    }
    return values;
  },

  optionValue: function(opt) {
    // extend element because hasAttribute may not be native
    return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;
  }
}

/*--------------------------------------------------------------------------*/

Abstract.TimedObserver = function() {}
Abstract.TimedObserver.prototype = {
  initialize: function(element, frequency, callback) {
    this.frequency = frequency;
    this.element   = $(element);
    this.callback  = callback;

    this.lastValue = this.getValue();
    this.registerCallback();
  },

  registerCallback: function() {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  onTimerEvent: function() {
    var value = this.getValue();
    var changed = ('string' == typeof this.lastValue && 'string' == typeof value
      ? this.lastValue != value : String(this.lastValue) != String(value));
    if (changed) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
}

Form.Element.Observer = Class.create();
Form.Element.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create();
Form.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = function() {}
Abstract.EventObserver.prototype = {
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback.bind(this));
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
}

Form.Element.EventObserver = Class.create();
Form.Element.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create();
Form.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
if (!window.Event) {
  var Event = new Object();
}

Object.extend(Event, {
  KEY_BACKSPACE: 8,
  KEY_TAB:       9,
  KEY_RETURN:   13,
  KEY_ESC:      27,
  KEY_LEFT:     37,
  KEY_UP:       38,
  KEY_RIGHT:    39,
  KEY_DOWN:     40,
  KEY_DELETE:   46,
  KEY_HOME:     36,
  KEY_END:      35,
  KEY_PAGEUP:   33,
  KEY_PAGEDOWN: 34,

  element: function(event) {
    return event.target || event.srcElement;
  },

  isLeftClick: function(event) {
    return (((event.which) && (event.which == 1)) ||
            ((event.button) && (event.button == 1)));
  },

  pointerX: function(event) {
    return event.pageX || (event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft));
  },

  pointerY: function(event) {
    return event.pageY || (event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop));
  },

  stop: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.returnValue = false;
      event.cancelBubble = true;
    }
  },

  // find the first node with the given tagName, starting from the
  // node the event was triggered on; traverses the DOM upwards
  findElement: function(event, tagName) {
    var element = Event.element(event);
    while (element.parentNode && (!element.tagName ||
        (element.tagName.toUpperCase() != tagName.toUpperCase())))
      element = element.parentNode;
    return element;
  },

  observers: false,

  _observeAndCache: function(element, name, observer, useCapture) {
    if (!this.observers) this.observers = [];
    if (element.addEventListener) {
      this.observers.push([element, name, observer, useCapture]);
      element.addEventListener(name, observer, useCapture);
    } else if (element.attachEvent) {
      this.observers.push([element, name, observer, useCapture]);
      element.attachEvent('on' + name, observer);
    }
  },

  unloadCache: function() {
    if (!Event.observers) return;
    for (var i = 0, length = Event.observers.length; i < length; i++) {
      Event.stopObserving.apply(this, Event.observers[i]);
      Event.observers[i][0] = null;
    }
    Event.observers = false;
  },

  observe: function(element, name, observer, useCapture) {
    element = $(element);
    useCapture = useCapture || false;

    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.attachEvent))
      name = 'keydown';

    Event._observeAndCache(element, name, observer, useCapture);
  },

  stopObserving: function(element, name, observer, useCapture) {
    element = $(element);
    useCapture = useCapture || false;

    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.detachEvent))
      name = 'keydown';

    if (element.removeEventListener) {
      element.removeEventListener(name, observer, useCapture);
    } else if (element.detachEvent) {
      try {
        element.detachEvent('on' + name, observer);
      } catch (e) {}
    }
  }
});

/* prevent memory leaks in IE */
if (navigator.appVersion.match(/\bMSIE\b/))
  Event.observe(window, 'unload', Event.unloadCache, false);
var Position = {
  // set to true if needed, warning: firefox performance problems
  // NOT neeeded for page scrolling, only if draggable contained in
  // scrollable elements
  includeScrollOffsets: false,

  // must be called before calling withinIncludingScrolloffset, every time the
  // page is scrolled
  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  realOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return [valueL, valueT];
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return [valueL, valueT];
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if(element.tagName=='BODY') break;
        var p = Element.getStyle(element, 'position');
        if (p == 'relative' || p == 'absolute') break;
      }
    } while (element);
    return [valueL, valueT];
  },

  offsetParent: function(element) {
    if (element.offsetParent) return element.offsetParent;
    if (element == document.body) return element;

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return element;

    return document.body;
  },

  // caches x/y coordinate pair to use with overlap
  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = this.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = this.realOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = this.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  // within must be called directly before
  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },

  page: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      // Safari fix
      if (element.offsetParent==document.body)
        if (Element.getStyle(element,'position')=='absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (!window.opera || element.tagName=='BODY') {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);

    return [valueL, valueT];
  },

  clone: function(source, target) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || {})

    // find page position of source
    source = $(source);
    var p = Position.page(source);

    // find coordinate system to use
    target = $(target);
    var delta = [0, 0];
    var parent = null;
    // delta [0,0] will do fine with position: fixed elements,
    // position:absolute needs offsetParent deltas
    if (Element.getStyle(target,'position') == 'absolute') {
      parent = Position.offsetParent(target);
      delta = Position.page(parent);
    }

    // correct by body offsets (fixes Safari)
    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    // set position
    if(options.setLeft)   target.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if(options.setTop)    target.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if(options.setWidth)  target.style.width = source.offsetWidth + 'px';
    if(options.setHeight) target.style.height = source.offsetHeight + 'px';
  },

  absolutize: function(element) {
    element = $(element);
    if (element.style.position == 'absolute') return;
    Position.prepare();

    var offsets = Position.positionedOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.width  = width + 'px';
    element.style.height = height + 'px';
  },

  relativize: function(element) {
    element = $(element);
    if (element.style.position == 'relative') return;
    Position.prepare();

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
  }
}

// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) {
  Position.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return [valueL, valueT];
  }
}

Element.addMethods();

Element.addMethods({getPosition:function(){var element=arguments[0];var position=Position.cumulativeOffset(element);return{x:position[0],y:position[1],units:'px'};},getPositionOffset:function(offsetElement){return Position.delta(arguments[0],arguments[1]);},getNthElementByClassName:function(){var element=arguments[0];var className=arguments[1];var position=arguments[2];var tagName=(arguments[3]?arguments[3]:'*');var _children=$A((element||document.body).getElementsByTagName(tagName));if(position==0){log.error("Element.getNthElementByClassName: 1 based index. 0(zero) is not a valid position");return null;}else if(position<0){_children.reverse(true);position=Math.abs(position);}
var _matchCount=0;var result=null;for(var i=0;i<_children.length;i++){if(_children[i].className.match(new RegExp("(^|\\s)"+className+"(\\s|$)"))){_matchCount++;if(_matchCount==position){result=Element.extend(_children[i]);break;}}}
return result;},getParentByClassName:function(){var args=$A(arguments),element=args.shift(),targetClass=args[0];while(element.tagName!='HTML'){if(element.hasClassName(targetClass)){return Element.extend(element);}
element=$(element.parentNode);}
return null;},getParentByTagName:function(){var args=$A(arguments),element=args.shift(),targetElement=args[0].toUpperCase();while(element.parentNode){if(element.tagName==targetElement)return Element.extend(element);element=element.parentNode;}
return null;},getElementsByAttribute:function(){var element=arguments[0],attribute=arguments[1];var tags=element.getElementsByTagName(arguments[2]||'*');var results=$A();var tagsLength=tags.length;for(var i=0;i<tagsLength;i++){var _tag=tags[i];if(_tag.getAttribute(attribute))
{results.push(Element.extend(_tag));}}
return results;},getElementsBySelector:function(){var args=$A(arguments),element=args.shift();return args.map(function(expression){return expression.strip().split(/\s+/).inject([null],function(results,expr){var selector=new Selector(expr);return results.map(selector.findElements.bind(selector,element)).flatten();});}).flatten();},getFirstElementByClassName:function(){var element=arguments[0];var className=arguments[1];var tagName=arguments[2];if(tagName){return element.getNthElementByClassName(className,1,tagName);}else{return element.getNthElementByClassName(className,1);}},getLastElementByClassName:function(){var element=arguments[0];var className=arguments[1];var tagName=arguments[2];if(tagName){return element.getNthElementByClassName(className,-1,tagName);}else{return element.getNthElementByClassName(className,-1);}},destroy:function(){var element=$(arguments[0]);if(element){if(element.innerHTML){element.innerHTML="";}
if(element.parentNode){element.parentNode.removeChild(element);}}
return null;}});var Units={PX_TO_EM:10.88,EM_TO_PX:1/10.88,TYPE:'px'};Position.putInViewport=function(triggerElement,positionedElement,pointerCoordinates){var viewport=Position.calculateViewport();var scroll=Position.calculateScroll();var pageHeight=Position.calculatePageHeight();positionedElement.dim=positionedElement.getDimensions();positionedElement.pos=positionedElement.getPosition();triggerElement.dim=triggerElement.getDimensions();var left=triggerElement.pos.x-positionedElement.dim.width;if(triggerElement.pos.x+triggerElement.dim.width+positionedElement.dim.width<=viewport.width||left<=0){left=triggerElement.dim.width+triggerElement.pos.x;}
var horizontallyVisible=(parseInt(scroll.x)+viewport.width-(left+positionedElement.dim.width)>=0);if(Units.TYPE=='em'){left=left/Units.PX_TO_EM;}
positionedElement.setStyle({left:left+Units.TYPE});viewport=Position.calculateViewport();var top=positionedElement.pos.y;if(viewport.height<positionedElement.dim.height||parseInt(scroll.y)-top>=0){top=parseInt(scroll.y);}else if(top+positionedElement.dim.height>=parseInt(scroll.y)+viewport.height){top=top-(top+positionedElement.dim.height-(parseInt(scroll.y)+viewport.height));}
var verticallyVisible=(parseInt(scroll.y)+viewport.height-(top+positionedElement.dim.height)>=0);if(Units.TYPE=='em'){top=top/Units.PX_TO_EM;}
positionedElement.setStyle({top:top+Units.TYPE});return{x:left,y:top,inViewport:(horizontallyVisible&&verticallyVisible),units:Units.TYPE};};Position.delta=function(elementA,elementB){elementA.pos=elementA.getPosition();elementB.pos=elementB.getPosition();return{x:(elementB.pos.x-elementA.pos.x),y:(elementB.pos.y-elementA.pos.y),units:'px'};};Position.calculatePageHeight=function(){var pageHeight=0;if(document.documentElement.scrollHeight>document.documentElement.offsetHeight){pageHeight=document.documentElement.scrollHeight;}else{pageHeight=document.documentElement.offsetHeight;}
return{height:pageHeight,units:'px'};};Position.calculateScroll=function(){var yScroll=0,xScroll=0;if(window.pageYOffset&&window.pageXOffset){yScroll=window.pageYOffset;xScroll=window.pageXOffset;}else if(document.documentElement&&document.documentElement.scrollTop){yScroll=document.documentElement.scrollTop;xScroll=document.documentElement.scrollLeft;}else if(document.body){yScroll=document.body.scrollTop;xScroll=document.body.scrollLeft;}
return{x:xScroll,y:yScroll,units:'px'}};Position.calculateViewport=function(){var docEl=document.documentElement;var windowHeight=window.innerHeight;var windowWidth=window.innerWidth;if(windowHeight!=null&&docEl.clientHeight!=null){windowHeight=(docEl.clientHeight<windowHeight&&docEl.clientHeight>0)?docEl.clientHeight:windowHeight;windowWidth=(docEl.clientWidth<window.innerWidth&&docEl.clientWidth>0)?docEl.clientWidth:windowWidth;}else if(docEl&&docEl.clientHeight){windowHeight=docEl.clientHeight;windowWidth=docEl.clientWidth;}else if(document.body){windowHeight=document.body.clientHeight;windowWidth=document.body.clientWidth;}
return{height:windowHeight,width:windowWidth,units:'px'};};Position.cumulativeOffset=function(_element){var element=Element.extend(_element);var valueT=0,valueL=0;do{if(Element.getStyle(element,'position')=='fixed'){var scroll=Position.calculateScroll();valueT+=scroll.y+element.offsetTop;valueL+=scroll.x+element.offsetLeft;element=null;}else{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=$(element.offsetParent);}}while(element);return[valueL,valueT];}
Ajax.Request.prototype.abort=function(){this.transport.onreadystatechange=Prototype.emptyFunction;this.transport.abort();Ajax.activeRequestCount--;};var ManagedEventObservers=Class.create();ManagedEventObservers.prototype={initialize:function(){this.observers=$A();},add:function(element,eventType,callback,useCapture){if(arguments.length>=3){element=$(element);useCapture=useCapture||false;Event.observe(element,eventType,callback,useCapture);this.observers.push([element,eventType,callback,useCapture]);}else{throw new Error("ManagedEventObservers.add(): too few parameters");}},remove:function(element){if($(element)){for(var i=0;i<this.observers.length;i++){if(this.observers[i][0]==element){Event.stopObserving.apply(this,this.observers[i]);this.observers[i][0]=null;this.observers.splice(i);}}}},clear:function(){for(var i=0;i<this.observers.length;i++){Event.stopObserving.apply(this,this.observers[i]);this.observers[i][0]=null;}
this.observers.clear();return null;}};Object.extend(Event,{_domReady:function(){if(arguments.callee.done)return;arguments.callee.done=true;if(this._timer)clearInterval(this._timer);this._readyCallbacks.each(function(f){f()});this._readyCallbacks=null;},onDOMReady:function(f){if(!this._readyCallbacks){var domReady=this._domReady.bind(this);if(document.addEventListener)
document.addEventListener("DOMContentLoaded",domReady,false);if(/WebKit/i.test(navigator.userAgent)){this._timer=setInterval(function(){if(/loaded|complete/.test(document.readyState))domReady();},10);}
Event.observe(window,'load',domReady);Event._readyCallbacks=[];}
Event._readyCallbacks.push(f);}});
var Dialog={};Dialog.Base=function(){};Dialog.Base.prototype={version:'Dialog 1.0',setProperties:function(type,content,options){this.type=type;this.content=content;this.options={fixInViewport:false,onResize:true,triggerEvent:'click',closeLabel:'Close',hasHeader:true,sessionTimeoutUrl:'',closeElements:$A(),setUp:function(){},tearDown:function(){}}
Object.extend(this.options,options||{});this.isOpen=false;this.activated=false;this.styled=false;this.response=null;this.triggers=new ManagedEventObservers();this.managedEventObservers=new ManagedEventObservers();this.closeEventObservers=new ManagedEventObservers();},createMarkup:function(){log.error('You have not defined createMarkup() for your '+this.type+' object.');},showDialog:function(){log.error('You have not defined showDialog() for your '+this.type+' object.');},positionInViewport:function(){log.error('You have not defined positionInViewport() for your '+this.type+' object.');},open:function(event){log.error('You have not defined open() for your '+this.type+' object.');},close:function(event){log.error('You have not defined close() for your '+this.type+' object.');},createDialogDivs:function(){this.dialogWrapper=Element.extend(document.createElement('div'));if(this.options.id){this.dialogWrapper.id=this.options.id;}
this.dialogWrapper.className='dialogWrapper '+this.type.toLowerCase();this.dialogPadding=Element.extend(document.createElement('div'));this.dialogPadding.className='dialogPadding';if(this.options.headerless=='true'){this.dialogPadding.addClassName('headerless');}
this.mainContent=Element.extend(document.createElement('div'));this.mainContent.className='mainContent';if(this.options.hasHeader==true){this.header=Element.extend(document.createElement('div'));this.headerLeft=Element.extend(document.createElement('div'));this.headerRight=Element.extend(document.createElement('div'));this.headerRight.className="closeListener";this.options.closeElements.push(this.headerRight.update('<a href="javascript:void(0);" class="closeListener">'+this.options.closeLabel+'</a>'));this.dialogTitle=Element.extend(document.createElement('h1'));if(this.options.heading!=null){this.dialogTitle.className="heading";this.dialogTitle.update(this.options.heading);}
this.dialogPadding.appendChild(this.header);this.header.appendChild(this.headerLeft);this.header.appendChild(this.headerRight);this.headerLeft.appendChild(this.dialogTitle);}
this.main=Element.extend(document.createElement('div'));this.mainLeft=Element.extend(document.createElement('div'));this.mainCenter=Element.extend(document.createElement('div'));this.mainRight=Element.extend(document.createElement('div'));this.footer=Element.extend(document.createElement('div'));this.footerLeft=Element.extend(document.createElement('div'));this.footerRight=Element.extend(document.createElement('div'));this.dialogWrapper.appendChild(this.dialogPadding);this.dialogPadding.appendChild(this.main);this.dialogPadding.appendChild(this.footer);this.main.appendChild(this.mainLeft);this.main.appendChild(this.mainCenter);this.main.appendChild(this.mainRight);this.mainCenter.appendChild(this.mainContent);this.footer.appendChild(this.footerLeft);this.footer.appendChild(this.footerRight);},createShim:function(){if(navigator.userAgent.toLowerCase().indexOf("msie 6")!=-1){log.debug("is ie6, creating shim");this.shim=this.shim?this.shim.destroy():null;this.shim=Element.extend(document.createElement('iframe'));this.shim.src='/d.gif';this.shim.scrolling='no';this.shim.frameBorder="0";this.dialogPadding.insertBefore(this.shim,this.dialogPadding.firstChild);this.resizeShim();}},attachTriggers:function(newTriggers){if(newTriggers==undefined||newTriggers.length==undefined){return;}else{if(this.triggers instanceof ManagedEventObservers){var _triggerElements=$A(newTriggers);for(var i=0;_triggerElements[i];i++){this.triggers.add(_triggerElements[i],this.options.triggerEvent,this.open.bindAsEventListener(this));}}else{log.error("Dialog.Base.prototype.triggers not instance of ManagedEventObservers");}}},attachCloseListeners:function(callback){if(this.options.closeElements){for(var i=0;this.options.closeElements[i];i++){if(this.options.closeElements[i].isAttached==null){this.closeEventObservers.add(this.options.closeElements[i],'click',callback);this.options.closeElements[i].isAttached=true;}}}
var contentCloseListeners=this.mainContent.getElementsByClassName('closeListener');for(var i=0;contentCloseListeners[i];i++){if(contentCloseListeners[i].isAttached==null){this.managedEventObservers.add(contentCloseListeners[i],'click',callback);contentCloseListeners[i].isAttached=true;}}},inspectTrigger:function(event){this.trigger=$(Event.element(event));this.trigger.pos=this.trigger.getPosition();this.trigger.dim=this.trigger.getDimensions();this.eventX=Event.pointerX(event);this.eventY=Event.pointerY(event);},getContent:function(){if(this.response!=null){log.debug("Dialog.Base.getContent: response");this.showDialog(this.response);}
else if(this.content==null){log.debug("Dialog.Base.getContent: null");}
else if(this.content.domNode!=null){log.debug("Dialog.Base.getContent - domNode: "+this.content.domNode);this.showDialog($(this.content.domNode).cloneNode(true));}
else if(this.content.string!=null){log.debug("Dialog.Base.getContent: string");this.showDialog(this.content.string);}
else if(this.content.url!=null){log.debug("Dialog.Base.getContent - url: "+this.content.url);this.request=new Ajax.Request(this.content.url,{method:(this.options.ajaxParameters)?'post':'get',parameters:(this.options.ajaxParameters)?this.options.ajaxParameters:'',onComplete:this.showDialog.bind(this),onSuccess:function(transport){log.debug(transport.status+': Dialog.Base.getContent() content.url successful');if(this.options.sessionTimeoutUrl&&transport.responseText.indexOf("<html")!=-1){this.sessionHasExpired=true;top.location.href=this.options.sessionTimeoutUrl;}}.bind(this)});}
else{log.error('Dialog.response is null and Dialog.content not a recognized type');}},populateDialog:function(){if(this.response){if(this.content.string){this.mainContent.update(this.response);}else if(this.content.domNode){this.mainContent.innerHTML=this.response.innerHTML;}else if(this.content.url&&this.response.responseText){this.mainContent.update(this.response.responseText);}else{log.error("Dialog.populateDialog: unable to determine response type");}}},appendToDOM:function(){$("dialog").appendChild(this.dialogWrapper);this.dialogWrapper.setStyle({visibility:"hidden"});},removeFromDOM:function(){this.shim=this.shim?this.shim.destroy():null;this.header=this.header?this.headerRight.destroy():null;this.headerLeft=this.headerLeft?this.headerLeft.destroy():null;this.headerRight=this.headerRight?this.headerRight.destroy():null;this.dialogTitle=this.dialogTitle?this.dialogTitle.destroy():null;this.dialogPadding=this.dialogPadding?this.dialogPadding.destroy():null;this.main=this.main?this.main.destroy():null;this.mainLeft=this.mainLeft?this.mainLeft.destroy():null;this.mainCenter=this.mainCenter?this.mainCenter.destroy():null;this.mainRight=this.mainRight?this.mainRight.destroy():null;this.footer=this.footer?this.footer.destroy():null;this.footerLeft=this.footerLeft?this.footerLeft.destroy():null;this.footerRight=this.footerRight?this.footerRight.destroy():null;this.mainContent=this.mainContent?this.mainContent.destroy():null;this.dialogWrapper=this.dialogWrapper?this.dialogWrapper.destroy():null;}};Microcontent=Class.create();Microcontent.prototype=Object.extend(new Dialog.Base(),{initialize:function(triggerElements,content,userOptions){var options={triggerEvent:'mouseover',fixInViewport:false,positionFromPointer:false,triggerDelay:0};var triggerElements=$A(triggerElements);Object.extend(options,userOptions||{});this.setProperties('Microcontent',content,options);if(!this.options.triggersOverridden){this.attachTriggers(triggerElements);}
if(this.options.triggerEvent=='mouseover'){for(var i=0;triggerElements[i];i++){this.triggers.add(triggerElements[i],"mouseout",this.clearTriggerFocus.bindAsEventListener(this));}}else if(this.options.triggerEvent=='click'){}else{log.error("Microcontent.options.triggerEvent: "+this.options.triggerEvent+" is not a recognized event type");}
this.focusListeners=new ManagedEventObservers();this.focusListenersAttached=false;},createMarkup:function(){this.createDialogDivs();},showDialog:function(response){try{if(this.dialogWrapper){this.response=response;this.populateDialog();this.attachCloseListeners(this.close.bindAsEventListener(this));this.focusListenersAttached=this.attachFocusListeners();this.appendToDOM();this.styled=this.buildLayout();var positionArray=(this.options.positionFromPointer)?[this.eventX,this.eventY]:null;var top=this.trigger.pos.y-this.headerRight.dim.height;if(Units.TYPE=='em'){top=top/Units.PX_TO_EM;}
this.dialogWrapper.setStyle({top:top+Units.TYPE});this.positionInViewport();this.dialogWrapper.setStyle({visibility:"visible"});this.isOpen=true;window.setTimeout(function(){this.createShim();}.bind(this),0);}else{log.error("Microcontent.showDialog: dialogWrapper doesn't exist");}}catch(error){log.error("EXCEPTION: Microcontent.showDialog: "+error);}finally{this.activated=false;}},positionInViewport:function(){var triggerBoundingBox={x1:this.trigger.pos.x,y1:this.trigger.pos.y,x2:(this.trigger.pos.x+this.trigger.dim.width),y2:(this.trigger.pos.y+this.trigger.dim.height)};var leftReferencePoint={x:triggerBoundingBox.x1,y:triggerBoundingBox.y1+(this.trigger.dim.height/2)};var rightReferencePoint={x:triggerBoundingBox.x2,y:triggerBoundingBox.y1+(this.trigger.dim.height/2)};var headerDim=this.header.getDimensions();var footerDim=this.footer.getDimensions();var topPositionChromeOffset=footerDim.height+(this.beak.dim.height/2);var bottomPositionChromeOffset=headerDim.height+(this.beak.dim.height/2);paddingDistance=this.beak.dim.width-this.beak.overlap.border-this.mainLeft.dim.width;var dialogWrapperDimensions;var styleForLeft=function(){this.beak.className="beakRight";this.beak.setStyle({left:this.main.dim.width-this.mainLeft.dim.width-this.beak.overlap.border+"px"});var paddingDistance=this.beak.dim.width-this.beak.overlap.border-this.mainLeft.dim.width;this.dialogPadding.setStyle({paddingRight:paddingDistance+"px"});this.dialogPadding.setStyle({paddingLeft:"0"});this.dialogWrapper.setStyle({marginLeft:this.beak.overlap.trigger+"px"});dialogWrapperDimensions=this.dialogWrapper.getDimensions();}.bind(this);var styleForRight=function(){this.beak.className="beakLeft";this.beak.setStyle({left:0});var paddingDistance=this.beak.dim.width-this.beak.overlap.border-this.mainRight.dim.width;this.dialogPadding.setStyle({paddingRight:"0"});this.dialogPadding.setStyle({paddingLeft:paddingDistance+"px"});this.dialogWrapper.setStyle({marginLeft:0-this.beak.overlap.trigger+"px"});dialogWrapperDimensions=this.dialogWrapper.getDimensions();}.bind(this);styleForRight();var topRightBoundingBox={x1:rightReferencePoint.x,y1:rightReferencePoint.y-dialogWrapperDimensions.height+topPositionChromeOffset,x2:rightReferencePoint.x+dialogWrapperDimensions.width,y2:rightReferencePoint.y+topPositionChromeOffset};var bottomRightBoundingBox={x1:rightReferencePoint.x,y1:rightReferencePoint.y-bottomPositionChromeOffset,x2:rightReferencePoint.x+dialogWrapperDimensions.width,y2:rightReferencePoint.y+dialogWrapperDimensions.height-bottomPositionChromeOffset};styleForLeft();var topLeftBoundingBox={x1:leftReferencePoint.x-dialogWrapperDimensions.width,y1:leftReferencePoint.y-dialogWrapperDimensions.height+topPositionChromeOffset,x2:leftReferencePoint.x,y2:leftReferencePoint.y+topPositionChromeOffset};var bottomLeftBoundingBox={x1:leftReferencePoint.x-dialogWrapperDimensions.width,y1:leftReferencePoint.y-bottomPositionChromeOffset,x2:leftReferencePoint.x,y2:leftReferencePoint.y+dialogWrapperDimensions.height-bottomPositionChromeOffset};var viewport=Position.calculateViewport();var scroll=Position.calculateScroll();var viewportBoundingBox={x1:scroll.x,y1:scroll.y,x2:(scroll.x+viewport.width),y2:(scroll.y+viewport.height)};var bottomRightGood=(bottomRightBoundingBox.x2<=viewportBoundingBox.x2)&&(bottomRightBoundingBox.y2<=viewportBoundingBox.y2);var bottomLeftGood=(bottomLeftBoundingBox.x1>=viewportBoundingBox.x1)&&(bottomLeftBoundingBox.y2<=viewportBoundingBox.y2);var topRightGood=(topRightBoundingBox.x2<=viewportBoundingBox.x2)&&(topRightBoundingBox.y1>=viewportBoundingBox.y1);var topLeftGood=(topLeftBoundingBox.x1>=viewportBoundingBox.x1)&&(topLeftBoundingBox.y1>=viewportBoundingBox.y1);var dialogBoundingBox;var positionLeft=function(){styleForLeft();this.dialogWrapper.setStyle({left:dialogBoundingBox.x1+"px"});}.bind(this);var positionRight=function(){styleForRight();this.dialogWrapper.setStyle({left:dialogBoundingBox.x1+"px"});}.bind(this);var positionTop=function(){var mainCenterDim=this.mainCenter.getDimensions();this.beak.setStyle({marginTop:mainCenterDim.height-this.beak.dim.height+"px"});this.dialogWrapper.setStyle({top:dialogBoundingBox.y1+"px"});}.bind(this);var positionBottom=function(){this.beak.setStyle({marginTop:"0"});this.dialogWrapper.setStyle({top:dialogBoundingBox.y1+"px"});}.bind(this);if(bottomRightGood){dialogBoundingBox=bottomRightBoundingBox;positionRight();positionBottom();}else if(topRightGood){dialogBoundingBox=topRightBoundingBox;positionRight();positionTop();}else if(bottomLeftGood){dialogBoundingBox=bottomLeftBoundingBox;positionLeft();positionBottom();}else if(topLeftGood){dialogBoundingBox=topLeftBoundingBox;positionLeft();positionTop();}else{dialogBoundingBox=bottomRightBoundingBox;positionRight();positionBottom();}},open:function(event){if(this.isOpen==false&&this.activated==false){this.triggerFocused=true;this.dialogFocused=false;this.activated=true;this.options.setUp();this.inspectTrigger(event);Event.stop(event);if(!this.dialogWrapper){this.createMarkup();}
setTimeout(function(){if(this.triggerFocused){this.getContent();}}.bind(this),this.options.triggerDelay);}else{log.error("already open or activated: isOpen:"+this.isOpen+", activated:"+this.activated);}},close:function(event){log.debug("Microcontent.close()");if(event){Event.stop(event);}
this.focusListeners.clear();this.focusListenersAttached=false;this.managedEventObservers.clear();this.closeEventObservers.clear();this.removeFromDOM();this.triggerFocused=false;this.dialogFocused=false;this.activated=false;this.isOpen=false;},attachFocusListeners:function(){if(this.focusListenersAttached==false&&this.options.triggerEvent!='click'){this.focusListeners.add(this.dialogWrapper,"mouseover",this.setDialogFocus.bindAsEventListener(this));this.focusListeners.add(this.dialogWrapper,"mouseout",this.clearDialogFocus.bindAsEventListener(this));return true;}else{return false;}},checkFocus:function(){setTimeout(function(){if(this.dialogFocused==false&&this.triggerFocused==false){this.close()}}.bind(this),200);},clearTriggerFocus:function(){log.debug("trigger mouse out");this.triggerFocused=false;this.checkFocus();},setDialogFocus:function(){log.debug("dialog mouseover");this.dialogFocused=true;this.triggerFocused=false;},clearDialogFocus:function(){log.debug("dialog mouseout");this.dialogFocused=false;this.checkFocus();},buildLayout:function(){this.beak=Element.extend(document.createElement('div'));this.beak.className='beakLeft';this.dialogPadding.appendChild(this.beak);this.header.addClassName('header');this.headerLeft.addClassName('headerLeft');this.headerRight.addClassName('headerRight');this.main.addClassName('main');this.mainLeft.addClassName('mainLeft');this.mainCenter.addClassName('mainCenter');this.mainRight.addClassName('mainRight');this.footer.addClassName('footer');this.footerLeft.addClassName('footerLeft');this.footerRight.addClassName('footerRight');var contentDim=this.mainCenter.getDimensions();this.mainLeft.setStyle({height:contentDim.height+"px"});this.mainCenter.setStyle({height:contentDim.height+"px"});this.mainRight.setStyle({height:contentDim.height+"px"});this.headerRight.dim=this.headerRight.getDimensions();this.footerRight.dim=this.footerRight.getDimensions();this.beak.dim=this.beak.getDimensions();this.main.dim=this.main.getDimensions();this.mainLeft.dim=this.mainLeft.getDimensions();this.mainRight.dim=this.mainRight.getDimensions();if(this.beak.overlap==null){this.beak.overlap={border:parseInt(this.beak.getStyle('right')),trigger:parseInt(this.beak.getStyle('margin-left'))};this.beak.setStyle({marginLeft:0,right:0});}
this.dialogPadding.setStyle({width:this.main.dim.width+"px"});this.headerLeft.setStyle({width:this.main.dim.width-this.headerRight.dim.width+"px",visibility:'hidden',visibility:''});this.footerLeft.setStyle({width:this.main.dim.width-this.footerRight.dim.width+"px",visibility:'hidden',visibility:''});return true;},resizeShim:function(){this.dialogPadding.dim=this.dialogPadding.getDimensions();this.shim.setStyle({left:0,height:this.dialogPadding.dim.height+"px",width:this.main.dim.width+"px",overflow:"auto"});if(this.beak.className=="beakLeft"){this.shim.setStyle({left:this.dialogWrapper.getDimensions().width-this.main.dim.width+"px"});}},destroy:function(){this.content=null;this.options=null;this.closeEventObservers=this.closeEventObservers.clear();for(var i=0;i<this.managedEventObservers.observers.length;i++){this.managedEventObservers.observers[i][0].isAttached=null;}
this.managedEventObservers=this.managedEventObservers.clear();this.focusListeners=this.focusListeners.clear();},inspectPositioningData:function(viewport,scroll,page){var output="Microcontent.inspectPositioningData:<br/>"+"viewport.height: "+viewport.height+"<br/>"+"scroll.y: "+scroll.y+"<br/>"+"this.options.fixInViewport: "+this.options.fixInViewport+"<br/>"+"this.options.positionFromPointer: "+this.options.positionFromPointer+"<br/>"+"this.dialogWrapper.dim: "+this.dialogWrapper.dim.width+","+this.dialogWrapper.dim.height+"<br/>"+"this.dialogWrapper.pos: "+this.dialogWrapper.pos.x+","+this.dialogWrapper.pos.y+"<br/>"+"this.trigger: "+this.trigger+"<br/>"+"this.trigger.pos: "+this.trigger.pos.x+","+this.trigger.pos.y+"<br/>"+"this.trigger.dim: "+this.trigger.dim.width+","+this.trigger.dim.height+"<br/>"+"this.eventX, this.eventY: "+this.eventX+","+this.eventY;log.info(output);}});DropDownMenu=Class.create();DropDownMenu.prototype=Object.extend(new Dialog.Base(),{initialize:function(triggerElements,content,userOptions){var options={triggerEvent:'mouseover',fixInViewport:false,positionFromPointer:false,hasHeader:false};var triggerElements=$A(triggerElements);Object.extend(options,userOptions||{});this.setProperties('Dropdownmenu',content,options);this.attachTriggers(triggerElements);this.triggerElements=triggerElements;this.focusListeners=new ManagedEventObservers();this.focusListenersAttached=false;},createMarkup:function(){this.createDialogDivs();},showDialog:function(response){this.response=response;this.populateDialog();if(this.focusListenersAttached==false){this.focusListenersAttached=this.attachFocusListeners();}
this.appendToDOM();if(this.styled==false){this.styled=this.buildLayout();}
this.positionInViewport();this.dialogWrapper.setStyle({visibility:"visible"});this.isOpen=true;window.setTimeout(function(){this.createShim();}.bind(this),0);this.activated=false;},positionInViewport:function(){var travelerUpdate=document.getElementsByClassName('travelerUpdate')[0];var travelerUpdatePos=travelerUpdate.getPosition();var travelerUpdateDim=travelerUpdate.getDimensions();this.dialogWrapper.setStyle({top:travelerUpdatePos.y+travelerUpdateDim.height+"px",left:travelerUpdatePos.x-this.mainLeft.dim.width-2+"px"});},open:function(event){this.triggerFocused=true;if(this.isOpen==false&&this.activated==false){this.activated=true;this.options.setUp();this.dialogFocused=false;this.inspectTrigger(event);Event.stop(event);if(!this.dialogWrapper){this.createMarkup();}
this.getContent();}
return false;},close:function(){this.removeFromDOM();this.activated=false;this.isOpen=false;return false;},attachFocusListeners:function(){if(this.focusListenersAttached==false&&this.options.triggerEvent!='click'){for(var i=0;this.triggerElements[i];i++){Event.observe(this.triggerElements[i],"mouseout",this.clearTriggerFocus.bindAsEventListener(this));}
Event.observe(this.dialogWrapper,"mouseover",this.setDialogFocus.bindAsEventListener(this));Event.observe(this.dialogWrapper,"mouseout",this.clearDialogFocus.bindAsEventListener(this));return true;}},checkFocus:function(){setTimeout(function(){if(this.dialogFocused==false&&this.triggerFocused==false&&this.isOpen){this.close();}}.bind(this),200);},clearTriggerFocus:function(){this.triggerFocused=false;this.checkFocus();},setDialogFocus:function(){this.dialogFocused=true;},clearDialogFocus:function(){this.dialogFocused=false;this.checkFocus();},buildLayout:function(){this.main.addClassName('main');this.mainLeft.addClassName('mainLeft');this.mainCenter.addClassName('mainCenter');this.mainRight.addClassName('mainRight');this.footer.addClassName('footer');this.footerLeft.addClassName('footerLeft');this.footerRight.addClassName('footerRight');var contentDim=this.mainCenter.getDimensions();this.mainLeft.setStyle({height:contentDim.height+"px"});this.mainCenter.setStyle({height:contentDim.height+"px"});this.mainRight.setStyle({height:contentDim.height+"px"});this.footerRight.dim=this.footerRight.getDimensions();this.main.dim=this.main.getDimensions();this.mainLeft.dim=this.mainLeft.getDimensions();this.dialogPadding.setStyle({width:this.main.dim.width+"px"});this.footerLeft.setStyle({width:this.main.dim.width-this.footerRight.dim.width+"px",visibility:'hidden',visibility:''});return true;},resizeShim:function(){this.dialogPadding.dim=this.dialogPadding.getDimensions();this.shim.setStyle({left:0,height:this.dialogPadding.dim.height+"px",width:this.main.dim.width-30+"px",overflow:"auto"});}});Lightbox=Class.create();Lightbox.prototype=Object.extend(new Dialog.Base(),{initialize:function(triggerElements,content,userOptions){var options={triggerEvent:'click',fixInViewport:false,interstitial:"",id:""};Object.extend(options,userOptions||{});this.setProperties('Lightbox',content,options);this.layoutBuilt=false;this.isFixedAtTop=null;this.isFixedAtBottom=null;this.positionFixedUnsupportedVal=null;this.attachTriggers(triggerElements);for(var i=0;triggerElements[i];i++){triggerElements[i].setAttribute("delegatedTracking","true");}
this.createMarkup();this.dialogWrapper.addClassName('fixed');},createMarkup:function(){this.createDialogDivs();this.footerRight.className="closeListener";this.options.closeElements.push(this.footerRight.update('<a href="javascript:void(0);" class="closeListener">'+this.options.closeLabel+'</a>'));var page=Position.calculatePageHeight();this.mask=Element.extend(document.createElement('div'));this.mask.style.height=page.height+page.units;this.mask.addClassName('lightboxMask lightboxLoading');this.mask.style.display='none';var body=Element.extend(document.getElementsByTagName('body')[0]);body.appendChild(this.mask);this.options.closeElements.push(this.mask);},showDialog:function(response){if(!this.sessionHasExpired){this.displayContent(response);this.activated=false;}},positionFixedUnsupported:function(){if(this.positionFixedUnsupportedVal==null){this.positionFixedUnsupportedVal=this.dialogWrapper.getStyle('position')=='absolute';}
return this.positionFixedUnsupportedVal;},positionInViewport:function(){var viewport=Position.calculateViewport();var scroll=Position.calculateScroll();this.dialogWrapper.dim=this.dialogWrapper.getDimensions();if(this.positionFixedUnsupported()){this.dialogWrapper.setStyle({top:scroll.y+"px"});}else{this.dialogWrapper.setStyle({top:"0px"});}
if(this.dialogWrapper.dim.width<viewport.width){this.dialogWrapper.setStyle({left:(viewport.width-this.dialogWrapper.dim.width)/2+"px"});}
this.isFixedAtTop=true;this.isFixedAtBottom=false;},open:function(event){if(this.isOpen==false&&this.activated==false){this.activated=true;this.options.setUp(event);Event.stop(event);this.showMask();this.displayLightbox();setTimeout(this.getContent.bind(this),250);}else{log.error("isOpen: "+this.isOpen+", activated: "+this.activated+" either the lightbox is already open or activated, see Lightbox.open");Event.stop(event);}
return false;},close:function(event){if(event){Event.stop(event);}
if(this.request){log.debug("aborting request");this.request.abort();this.request=null;}
this.dialogWrapper.style.visibility="hidden";this.managedEventObservers.clear();this.mainContent.innerHTML=this.options.interstitial;this.resize();this.hideMask();if(this.options.tearDown){this.options.tearDown();}
this.activated=false;this.isOpen=false;this.lastScroll=null;this.bottomOfDialog=null;this.dialogViewportDiff=null;this.isFixedAtBottom=false;this.isFixedAtTop=false;this.dialogSelects.clear();this.response=null;return false;},showMask:function(){this.allSelects=$$('select');this.allSelects.invoke('hide');if(this.mask){this.mask.show();}else{this.closeEventObservers.add(this.mask,'click',this.close.bindAsEventListener(this));}},hideMask:function(){this.mask.hide();this.allSelects.invoke('show');this.allSelects.clear();},resizeMask:function(){var page=Position.calculatePageHeight();this.mask.dim=this.mask.getDimensions();if(page.height>this.mask.dim.height){this.mask.setStyle({height:page.height+"px"});}},buildLayout:function(){this.appendToDOM();this.header.addClassName('header');this.headerLeft.addClassName('headerLeft');this.headerRight.addClassName('headerRight');this.main.addClassName('main');this.mainLeft.addClassName('mainLeft');this.mainCenter.addClassName('mainCenter');this.mainRight.addClassName('mainRight');this.footer.addClassName('footer');this.footerLeft.addClassName('footerLeft');this.footerRight.addClassName('footerRight');var contentDim=this.mainCenter.getDimensions();this.mainLeft.setStyle({height:contentDim.height+"px"});this.mainRight.setStyle({height:contentDim.height+"px"});this.headerRight.dim=this.headerRight.getDimensions();this.footerRight.dim=this.footerRight.getDimensions();this.main.dim=this.main.getDimensions();this.mainLeft.dim=this.mainLeft.getDimensions();this.dialogPadding.setStyle({width:this.main.dim.width+"px"});this.headerLeft.setStyle({width:this.main.dim.width-this.headerRight.dim.width+"px",visibility:'hidden',visibility:''});this.footerLeft.setStyle({width:this.main.dim.width-this.footerRight.dim.width+"px",visibility:'hidden',visibility:''});this.dialogWrapper.addClassName('fixed');this.layoutBuilt=true;},resize:function(){var mainCenterDim=this.mainCenter.getDimensions();this.mainLeft.setStyle({height:mainCenterDim.height+"px"});this.mainRight.setStyle({height:mainCenterDim.height+"px"});this.resizeMask();this.isFixedAtBottom=false;},attachResizeListeners:function(callback,containerElement){var resizeListeners;if(arguments.length>1&&$(containerElement).getElementsByClassName){resizeListeners=document.getElementsByClassName('resizeListener',$(containerElement));}else{resizeListeners=document.getElementsByClassName('resizeListener',this.dialogWrapper);}
for(var i=0;resizeListeners[i];i++){this.managedEventObservers.add(resizeListeners[i],'click',callback);}},displayLightbox:function(){if(!this.layoutBuilt){this.buildLayout();}
this.mainContent.innerHTML=this.options.interstitial;this.onWindowScroll();this.managedEventObservers.add(window,'scroll',this.onWindowScroll.bindAsEventListener(this));this.managedEventObservers.add(window,'resize',this.onWindowResize.bindAsEventListener(this));this.positionInViewport();this.dialogWrapper.style.visibility="visible";setTimeout(this.resize.bind(this),250);this.isOpen=true;},displayContent:function(response){this.response=response;this.populateDialog();this.dialogSelects=$A(this.dialogWrapper.getElementsByTagName("select")).each(function(sel){return Element.extend(sel);});this.dialogSelects.invoke('show');this.attachCloseListeners(this.close.bindAsEventListener(this));this.attachResizeListeners(this.onLightboxResize.bindAsEventListener(this));setTimeout(this.resize.bind(this),250);},replaceContent:function(newContent,parameters){if(this.isOpen==true&&this.activated==false){this.activated=true;this.response=null;this.managedEventObservers.clear();this.mainContent.innerHTML=this.options.interstitial;this.resize();var page=Position.calculatePageHeight();this.mask.dim=this.mask.getDimensions();if(page.height>this.mask.dim.height){this.mask.setStyle({height:page.height+"px"});}
if(arguments.length>1){var _parameters=$H(parameters).toQueryString();}
if(newContent.indexOf("?")!=-1){this.content={url:newContent+"&"+_parameters};}else{this.content={url:newContent+"?"+_parameters};}
this.getContent();}else if(this.isOpen==false){log.error("called replaceContent on a Lightbox that was not open");}},onWindowResize:function(){this.positionInViewport();var viewport=Position.calculateViewport();this.mask.setStyle({width:viewport.width+"px"});},onLightboxResize:function(){setTimeout(this.resize.bind(this),0);},onWindowScroll:function(){var viewport=Position.calculateViewport();var scroll=Position.calculateScroll();var page=Position.calculatePageHeight();this.dialogWrapper.dim=this.dialogWrapper.getDimensions();this.dialogWrapper.pos=this.dialogWrapper.getPosition();if(this.dialogWrapper.dim.height<viewport.height){this.bottomOfDialog=null;this.dialogViewportDiff=null;this.dialogWrapper.addClassName('fixed');this.isFixedAtTop=true;this.isFixedAtBottom=false;if(this.positionFixedUnsupported()){this.dialogWrapper.setStyle({top:scroll.y+"px"});}else{this.dialogWrapper.setStyle({top:"0px"});}}
else if(this.dialogWrapper.dim.height>viewport.height){this.bottomOfDialog=this.dialogWrapper.pos.y+this.dialogWrapper.dim.height;this.dialogViewportDiff=this.dialogWrapper.dim.height-viewport.height;if(this.dialogWrapper.pos.y<scroll.y&&this.bottomOfDialog>(scroll.y+viewport.height)){this.isFixedAtTop=false;this.isFixedAtBottom=false;if(this.dialogWrapper.hasClassName('fixed')){this.dialogWrapper.setStyle({top:this.dialogWrapper.pos.y+"px"});this.dialogWrapper.removeClassName('fixed');}}
if(this.lastScroll!=null){if(scroll.y>this.lastScroll.y){if(this.isFixedAtTop){this.dialogWrapper.removeClassName('fixed');this.dialogWrapper.setStyle({top:this.lastScroll.y+"px"});this.isFixedAtTop=false;this.bottomOfDialog=this.lastScroll.y+this.dialogWrapper.dim.height;}
if((scroll.y+viewport.height)>this.bottomOfDialog){if(!this.isFixedAtBottom){this.dialogWrapper.addClassName('fixed');this.isFixedAtBottom=true;}
if(this.positionFixedUnsupported()){this.dialogWrapper.setStyle({top:(scroll.y-this.dialogViewportDiff)+"px"});}else{this.dialogWrapper.setStyle({top:-(this.dialogViewportDiff)+"px"});}}}
else if(scroll.y<this.lastScroll.y){if(this.positionFixedUnsupported()&&scroll.y<=this.dialogWrapper.pos.y){this.dialogWrapper.setStyle({top:scroll.y+"px"});}
else{if(this.isFixedAtBottom){this.dialogWrapper.removeClassName('fixed');this.dialogWrapper.setStyle({top:this.lastScroll.y-this.dialogViewportDiff+"px"});this.isFixedAtBottom=false;}
if(scroll.y<=this.dialogWrapper.pos.y&&!this.isFixedAtTop){this.dialogWrapper.addClassName('fixed');this.dialogWrapper.setStyle({top:0});this.isFixedAtTop=true;}}}}}
this.lastScroll=scroll;},inspectScrollData:function(viewport,scroll,page){var output="Lightbox.inspectScrollData:<br/>"+"viewport.height: "+viewport.height+"<br/>"+"scroll.y: "+scroll.y+"<br/>"+"page.height: "+page.height+"<br/>"+"this.dialogWrapper.dim.height: "+this.dialogWrapper.dim.height+"<br/>"+"this.dialogWrapper.pos.y: "+this.dialogWrapper.pos.y+"<br/>"+"this.dialogWrapper.style.top: "+this.dialogWrapper.style.top+"<br/>"+"this.bottomOfDialog: "+this.bottomOfDialog+"<br/>"+"this.dialogViewportDiff: "+this.dialogViewportDiff+"<br/>"+"this.dialogWrapper.className: "+this.dialogWrapper.className+"<br/>"+"this.isFixedAtTop: "+this.isFixedAtTop+"<br/>"+"this.isFixedAtBottom: "+this.isFixedAtBottom+"<br/>"+"this.positionFixedUnsupported: "+this.positionFixedUnsupported();if(this.lastScroll!=null){output="this.lastScroll.y: "+this.lastScroll.y+"<br/>"+output;}
log.info(output);},destroy:function(){this.closeEventObservers.clear();this.activated=null;this.isFixedAtBottom=null;this.isFixedAtTop=null;this.isOpen=null;this.lastScroll=null;this.managedEventObservers=null;this.options.closeLabel=null;this.options.heading=null;this.options.id=null;this.options.interstitial=null;this.options.sessionTimeoutUrl=null;this.options.triggerEvent=null;this.options.setUp=new function(){};this.options.tearDown=new function(){};this.positionFixedUnsupportedVal=null;this.layoutBuilt=null;this.content=null;this.triggers.clear();}});var Austin=function(){};Austin.Microcontent=function(){this.activate=function(){log.info("activate()");}};var Novo={};Novo.Microcontent=new function(){this.currentMC=null,this.novoMCActivated=false,this.dialogs=new Array(),this.activate=function(event,params){log.debug("Novo.Microcontent.activate");if(!this.novoMCActivated){try{this.novoMCActivated=true;var element=$(Event.element(event));var dialog=null;for(var i=0;this.dialogs[i];i++){if(element==this.dialogs[i].element){if(params.content==this.dialogs[i].content){dialog=this.dialogs[i];}}}
if(dialog==null){if(this.currentMC!=null){this.currentMC.close();}
Object.extend(params.options,{triggersOverridden:true});this.currentMC=new Microcontent([element],params.content,params.options);this.dialogs.push({element:element,object:this.currentMC});}else{if(this.currentMC!=null&&this.currentMC!=dialog.object){this.currentMC.close();this.currentMC=dialog.object;this.currentMC.content=params.content;}else if(this.currentMC==null){this.currentMC=dialog.object;}}
this.currentMC.open(event);}catch(exception){log.error("EXCEPTION: Novo.Microcontent.activate: "+exception);}finally{this.novoMCActivated=false;}}else{log.debug("Novo.Microcontent already activated");}}
this.destroy=function(){if(this.currentMC!=null){this.currentMC.close();this.currentMC=null;}}};
function changeImage(id,img){var oImg=document.getElementById(id);if(oImg){oImg.src=img;}}
function changeStyle(id,styleSelector,value){eval("document.getElementById(id).style."+styleSelector+"='"+value+"';");}
function jsSupportedHTML(html){if(document.getElementById){document.write(html);}}
function getValue(field){var val;if(field.type=="text"){val=field.value;}
else if(field.type=="select-one"){val=field.options[field.options.selectedIndex].value;}
else if(field[0].type=="radio"){for(var i=0;i<field.length;i++){if(field[i].checked){val=field[i].value;}}}
return val;}
function getNumValue(field){return parseFloat(getValue(field));}
function setValue(field,val){if(field.type=="select-one"){for(var v=0;v<field.options.length;v++){if(field.options[v].value==val){field.selectedIndex=field.options[v].index;}}}
if(field[0].type=="radio"){for(var i=0;i<field.length;i++){if(field[i].value==val){field[i].checked=true;}}}}
function setValueById(id,val){if(document.getElementById(id))
document.getElementById(id).value=val;}
function zTranslate(theElement,zIndexNew,debug){if(theElement!=null){if(zIndexNew=='inFront'){theElement.style.zIndex="999";}else if(zIndexNew=='behind'){theElement.style.zIndex="-999";}else if(parseInt(zIndexNew,10)!=NaN){theElement.style.zIndex=zIndexNew;}else{return false;}}else{return false;}}
function showElement(id){var oDiv=document.getElementById(id);if(oDiv){var t=oDiv.tagName;oDiv.style.display=(t=='A'||t=='SPAN'||t=='IMG')?'inline':'block';}}
function showElements(){var a=arguments;for(var i=0;i<a.length;i++){if(typeof a[i]=='string'){showElement(a[i]);}else{for(var j=0;j<a[i].length;j++){showElements(a[i][j]);}}}}
function hideElement(id){var oDiv=document.getElementById(id);if(oDiv){oDiv.style.display="none";}}
function hideElements(){var a=arguments;for(var i=0;i<a.length;i++){if(typeof a[i]=='string'){hideElement(a[i]);}else{for(var j=0;j<a[i].length;j++){hideElements(a[i][j]);}}}}
function showHideElement(id){var o=document.getElementById(id);o.style.display=o.style.display=='block'?'none':'block';return false;}
function showOneHideMany(s,h){if(arguments.length>2&&arguments[2]==true){showElement(s);hideElements(h.split('|'));}else{hideElements(h.split('|'));showElement(s);}}
function openElement(id,html){parent.document.getElementById(id).innerHTML=html;showElement(id);}
function closeElement(id){if(id!=""){parent.document.getElementById(id).innerHTML="";hideElement(id);}}
function writeElement(id,html){var oDoc=window.frames[id].document;oDoc.open();oDoc.write(html);oDoc.close();showElement(id);}
function toggleElement(id1,id2){document.getElementById(id1).className="a";document.getElementById(id2).className="active";return false;}
function changeCss(sID,sClass){var oEl=document.getElementById(sID);if(oEl){oEl.className=sClass;}}
function getElementPosition(elem){var offsetTrail=elem;var offsetLeft=0;var offsetTop=0;while(offsetTrail){offsetLeft+=offsetTrail.offsetLeft;offsetTop+=offsetTrail.offsetTop;offsetTrail=offsetTrail.offsetParent;}
if(navigator.userAgent.indexOf("Mac")!=-1&&typeof document.body.leftMargin!="undefined"){offsetLeft+=document.body.leftMargin;offsetTop+=document.body.topMargin;}
return{left:offsetLeft,top:offsetTop};}
function setElementPosition(layerEl,fixedEl,xOffset,yOffset){layerEl.style.position="absolute";layerEl.style.top=parseFloat(getElementPosition(fixedEl).top+yOffset)+"px";layerEl.style.left=parseFloat(getElementPosition(fixedEl).left+xOffset)+"px";}
function limitChecks(theChecks,limit){var numChecked=0;for(i in theChecks){if(document.getElementById(theChecks[i])!=null){if(document.getElementById(theChecks[i]).checked==true){numChecked++;}}}
for(i in theChecks){if(numChecked>=limit){if(document.getElementById(theChecks[i])!=null){if(document.getElementById(theChecks[i]).checked==false){document.getElementById(theChecks[i]).disabled=true;}}}else{if(document.getElementById(theChecks[i])!=null){document.getElementById(theChecks[i]).disabled=false;}}}}
function selectItems(id,state){var objectID=document.getElementById(id);for(i=0;i<objectID.options.length;i++){var items=(state=="on")?(objectID.options[i].selected=true):(objectID.options[i].selected=false);}}
function onPromoWebtrends(promotion){if(promotion.match("%")){promovalue="% off";}else if(promotion.toLowerCase().match("free")){promovalue="Free Nights";}else if(promotion.match("dollar")||promotion.indexOf("$")>=0){promovalue="$ off";}else if(promotion==null||promotion==''){promovalue="";}else{promovalue="Value Adds";}
return promovalue;}
function toggleElementDisplay(){var a=arguments;for(var i=0;i<a.length;i++){showHideElement(a[i]);}
return false;}
function switchCareAlertFields(selectedOption){hideAllCareAlertFields();showSelectedCareAlertFields(selectedOption);}
function hideAllCareAlertFields(){for(i=0;i<8;i++){var alertTypeDivId="alertType_"+i;if(document.getElementById(alertTypeDivId)!=null){hideElement(alertTypeDivId);}}}
function showSelectedCareAlertFields(selectedOption){var alertTypeDivId="alertType_"+selectedOption;if(document.getElementById(alertTypeDivId)!=null){showElement(alertTypeDivId);$(alertTypeDivId).visualEffect("highlight");}}
function switchCareAlertTextMessageFields(selectedOption){if(selectedOption=='Other'){hideElement('textMessagePhoneNumber');showElement('textMessageEmailAddress');$('textMessageEmailAddress').visualEffect("highlight");}
else{if(document.getElementById('textMessagePhoneNumber')!=null){var phoneNumberFieldsWereHidden=document.getElementById('textMessagePhoneNumber').style.display=="none";}
hideElement('textMessageEmailAddress');showElement('textMessagePhoneNumber');if(phoneNumberFieldsWereHidden){$('textMessagePhoneNumber').visualEffect("highlight");}}}
var t;Event.observe(window,'load',function(){if($('fromRedesignedOas')&&$('fromRedesignedOas').value=='true'){if(document.getElementById('eventType').checked){retainSearchType('eventType');}
else{retainSearchType('cityType');}
if($('fromHomePage')&&$('fromHomePage').value!='quick'){autoPlay('opt1');timedRotate();if($('clicker')){Event.observe($('clicker'),'click',function(event){clearTimeout(t);pausecomp(500);var opt=Event.findElement(event,'li');checkFormForClick(Event.findElement(event,'li'));effectsEngine(opt);});}
if($('slidingLinkPanel')){Event.observe($('slidingLinkPanel'),'click',function(event){clearTimeout(t);pausecomp(1000);});}}}});function effectsEngine(opt)
{new Effect.BlindUp('slidingLinkPanel',{duration:0.5,queue:'front',afterFinish:function(){new Effect.Fade('assetImage',{duration:0.4,afterFinish:function(){changeImage(opt);new Effect.Appear('assetImage',{duration:0.4,afterFinish:function(){populateLinks(opt);new Effect.BlindDown('slidingLinkPanel',{duration:0.5,queue:'end'});}});}});}});}
function checkFormForClick(ele_nm)
{var someNodeList=$$('li');var nodes=$A(someNodeList);nodes.each(function(node){if(node.hasClassName('CtixOnclick'))
{node.removeClassName('CtixOnclick');node.addClassName('CtixOnDefault');}});ele_nm.addClassName('CtixOnclick');ele_nm.removeClassName('CtixOnDefault');ChangeLinkPanelImage(ele_nm);}
function populateLinks(ele_nm)
{var someUlList=$$('ul');var ulList=$A(someUlList);ulList.each(function(node){if(node.hasClassName('activeLinks'))
{node.removeClassName('activeLinks');node.addClassName('inactiveLinks');}});if($(ele_nm).hasClassName('sports'))
{$('exploreLinks1').removeClassName('inactiveLinks');$('exploreLinks1').addClassName('activeLinks');}
if($(ele_nm).hasClassName('concerts'))
{$('exploreLinks2').removeClassName('inactiveLinks');$('exploreLinks2').addClassName('activeLinks');}
if($(ele_nm).hasClassName('theatre'))
{$('exploreLinks3').removeClassName('inactiveLinks');$('exploreLinks3').addClassName('activeLinks');}
if($(ele_nm).hasClassName('more'))
{$('exploreLinks4').removeClassName('inactiveLinks');$('exploreLinks4').addClassName('activeLinks');}}
function changeImage(ele_nm)
{if($(ele_nm).hasClassName('sports'))
{var someVariable=$('exploreLinks1').readAttribute('href');$('assetImage').setStyle({background:'url('+someVariable+') no-repeat'});}
if($(ele_nm).hasClassName('concerts'))
{var someVariable=$('exploreLinks2').readAttribute('href');$('assetImage').setStyle({background:'url('+someVariable+') no-repeat'});}
if($(ele_nm).hasClassName('theatre'))
{var someVariable=$('exploreLinks3').readAttribute('href');$('assetImage').setStyle({background:'url('+someVariable+') no-repeat'});}
if($(ele_nm).hasClassName('more'))
{var someVariable=$('exploreLinks4').readAttribute('href');$('assetImage').setStyle({background:'url('+someVariable+') no-repeat'});}}
function ChangeLinkPanelImage(ele_nm)
{if($(ele_nm).hasClassName('sports'))
{if($('selectSports').readAttribute('value')<=4)
{$('slidingLinkPanel').removeClassName('linkPanelTwo');$('slidingLinkPanel').addClassName('linkPanelOne');}
else
{$('slidingLinkPanel').removeClassName('linkPanelOne');$('slidingLinkPanel').addClassName('linkPanelTwo');}}
if($(ele_nm).hasClassName('concerts'))
{if($('selectConcerts').readAttribute('value')<=4)
{$('slidingLinkPanel').removeClassName('linkPanelTwo');$('slidingLinkPanel').addClassName('linkPanelOne');}
else
{$('slidingLinkPanel').removeClassName('linkPanelOne');$('slidingLinkPanel').addClassName('linkPanelTwo');}}
if($(ele_nm).hasClassName('theatre'))
{if($('selectTheatre').readAttribute('value')<=4)
{$('slidingLinkPanel').removeClassName('linkPanelTwo');$('slidingLinkPanel').addClassName('linkPanelOne');}
else
{$('slidingLinkPanel').removeClassName('linkPanelOne');$('slidingLinkPanel').addClassName('linkPanelTwo');}}
if($(ele_nm).hasClassName('more'))
{if($('selectMore').readAttribute('value')<=4)
{$('slidingLinkPanel').removeClassName('linkPanelTwo');$('slidingLinkPanel').addClassName('linkPanelOne');}
else
{$('slidingLinkPanel').removeClassName('linkPanelOne');$('slidingLinkPanel').addClassName('linkPanelTwo');}}}
function autoPlay(ele)
{checkFormForClick($(ele));populateLinks($(ele));changeImage($(ele));}
function rotateTabs()
{var flag=true;for(var i=1;i<=4;i++)
{if($('opt'+i).hasClassName('CtixOnclick'))
{var elmId=i+1;if(i==4)
{elmId=1;flag=false;}
checkFormForClick($('opt'+elmId));effectsEngine($('opt'+elmId));break;}}
if(flag)
timedRotate();}
function timedRotate()
{t=setTimeout("rotateTabs()",5000)}
function pausecomp(millis)
{var date=new Date();var curDate=null;do{curDate=new Date();}
while(curDate-date<millis);}
function webTrendsForRTab()
{eventTckt=$('eventType').checked;cityTckt=$('cityType').checked;evnttxtval=$F('eventName');citytxtval=$F('location');if(eventTckt)
{dcsMultiTrack('DCSext.RDCK','Event Name','DCSext.AKW',evnttxtval);}
else if(cityTckt)
{dcsMultiTrack('DCSext.RDCK','City Date','DCSext.AKW',citytxtval);}}
function webTrendsForRTabLinks(ele_id)
{var hiliList=$$('li');var nodes=$A(hiliList);nodes.each(function(node){if(node.hasClassName('CtixOnclick'))
{if(node.hasClassName('sports'))
{paramVal='Sports'+','+ele_id;dcsMultiTrack('DCSext.TBCK',paramVal)}
if(node.hasClassName('concerts'))
{paramVal='Concerts'+','+ele_id;dcsMultiTrack('DCSext.TBCK',paramVal)}
if(node.hasClassName('theatre'))
{paramVal='Theater'+','+ele_id;dcsMultiTrack('DCSext.TBCK',paramVal)}
if(node.hasClassName('more'))
{paramVal='More'+','+ele_id;dcsMultiTrack('DCSext.TBCK',paramVal)}}});}
function Cookie(name)
{this.delimiter='|';this.nameValueDelimiter='=';this.name=name;this.content="";this.values=null;this.expiration="";this.path="/";this.secure="";this.getNameValueDelimiter=function(){return this.nameValueDelimiter;}
this.setExpiration=function(days,hours,minutes){if(typeof days=="number"&&typeof hours=="number"&&typeof minutes=="number")
{var expiry=new Date();expiry.setDate(expiry.getDate()+parseInt(days));expiry.setHours(expiry.getHours()+parseInt(hours));expiry.setMinutes(expiry.getMinutes()+parseInt(minutes));this.expiration=expiry;}}
this.setPath=function(path){this.path=path;}
this.setSecure=function(secure){this.secure=secure;}
this.get=function(){var cookiestring=document.cookie;var index1=cookiestring.indexOf(this.name);if(index1==-1||this.name=="")
return"";var index2=cookiestring.indexOf(';',index1);if(index2==-1)
index2=cookiestring.length;this.content=unescape(cookiestring.substring(index1+this.name.length+1,index2));return this.content;}
this.set=function(value,minutesToExpiry){var cookie=new String();this.setExpiration(0,0,minutesToExpiry);cookie=this.name+"="+escape(value);this.content=cookie;cookie+=((this.expiration)?"; expires="+this.expiration:"");cookie+=((this.path)?"; path="+this.path:"");cookie+=((this.secure)?"; secure="+this.secure:"");document.cookie=cookie;return true;}
this.remove=function(){if(get())
{this.expiration="Thu, 01-Jan-70 00:00:01 GMT";this.set("DELETE");}}
this.getValues=function(){var cookieValueArray=this.get().split(this.delimiter);this.values=cookieValueArray;return this.values;}
this.setValues=function(values){this.values=values;var newContent="";for(i=0;null!=values&&i<values.length;i++)
{newContent=(newContent?newContent+this.delimiter:"")+values[i];}
this.set(newContent);}
this.setNameValues=function(nameValues){if(!nameValues)return;this.values=new Array();for(var i=0;i<nameValues.length;i++)
{this.values[i]=nameValues[i].name+this.nameValueDelimiter+nameValues[i].value;}
this.setValues(this.values);}
this.getNameValues=function(){this.getValues();var nameValues=new Array();for(var i=0;i<this.values.length;i++)
{nameValues[i]=new Object();var nameValue=this.values[i].split(this.nameValueDelimiter);nameValues[i].name=nameValue[0];nameValues[i].value=nameValue[1];}
return nameValues;}
this.getNameValue=function(name){dlog.alert('Cookie.getNameValue('+name+')');if(null!=name&&name!='')
{var cookieValues=this.getValues();for(i=0;null!=cookieValues&&i<cookieValues.length;i++)
{if(cookieValues[i]!='')
{var nameValue=cookieValues[i].split(this.nameValueDelimiter);if(nameValue[0]==name)
{return nameValue[1];}}}}
return null;}
this.setValue=function(valueToInsert){if(null!=valueToInsert&&valueToInsert!='')
{var cookieValues=this.getValues();var alreadyExists=false;var newValues=new Array();for(i=0;i<cookieValues.length;i++)
{if(cookieValues[i]!='')
newValues[newValues.length]=cookieValues[i];if(cookieValues[i]==valueToInsert)
alreadyExists=true;}
if(!alreadyExists)
newValues[newValues.length]=valueToInsert;this.setValues(newValues);return true;}
return false;}
this.setNameValue=function(name,value){dlog.alert('Cookie.setNameValue('+name+','+value+')');if(null!=name&&name!='')
{var alreadyExists=false;var newValues=new Array();var cookieValues=this.getValues();for(i=0;null!=cookieValues&&i<cookieValues.length;i++)
{if(cookieValues[i]!='')
{var nameValue=cookieValues[i].split(this.nameValueDelimiter);if(nameValue[0]==name)
{alreadyExists=true;newValues[newValues.length]=name+this.nameValueDelimiter+value}
else
{newValues[newValues.length]=cookieValues[i];}}}
if(!alreadyExists)
newValues[newValues.length]=name+this.nameValueDelimiter+value;this.setValues(newValues);return true;}
return false;}
this.removeValue=function(valueToRemove){var cookieValues=this.getValues();if(cookieValues!=null)
{dlog.alert('Cookie.removeValue('+valueToRemove+')');var newValues=new Array();var j=0;for(i=0;i<cookieValues.length;i++)
{if(cookieValues[i]!=''&&valueToRemove!=cookieValues[i])
{newValues[j]=cookieValues[i];j+=1;}}
this.setValues(newValues);}}
this.removeNameValue=function(nameToRemove){this.setNameValue(nameToRemove,'DELETE');this.removeValue(nameToRemove+this.nameValueDelimiter+'DELETE');}}
function valueNotInCookie(cookieName,valueToCheck)
{var cookieValues=parseCookie(cookieName);cookieValues=cookieValues.sort();var newValues=new Array();for(i=0;i<cookieValues.length;i++){if(valueToCheck==cookieValues[i]){return false;break;}}
return true;}
function cookieExists(cookieName)
{var cookieValues=parseCookie(cookieName);if(cookieValues!=-1){return true;}
else{return false;}}
var botMgr=new function(){this.initialized=false;this.botBoxIds=new Array();this.locTypeIds=new Array();this.bookTypeIds=new Array();this.componentDateIds=new Array();this.savedLocationIds=new Array();this.bId='';this.pId='';this.navProductSelected=null;this.botRefs=new Array();this.tabCount=1;this.cookie=new Cookie('bot');this.PRODUCTID_WITH_CHILDRENAGE="aph";this.PRODUCTID2_WITH_CHILDRENAGE="ahc";this.PRODUCTID3_WITH_CHILDRENAGE="apc";this.CHILDRENAGE_MAX_AMOUNT=6;this.CHILDRENAGE_INFANT_VALUE='1';this.CHILDRENAGE_YOUTH_MIN_VALUE=12;this.FORM_NAME='botForm';this.airOriginValue='';this.prevDropOffDropDownSelection='';this.carDefaultTime="11 am";this.prevEndTime='Anytime';this.prevEndType='Depart';this.fieldsInit=[{name:'Origin',value:''},{name:'Destination',value:''},{name:'Target',value:''},{name:'AddressOrIntersection',value:''},{name:'City',value:''},{name:'StateProvince',value:''},{name:'PostalCode',value:''},{name:'StartMonth',value:''},{name:'StartDay',value:''},{name:'EndMonth',value:''},{name:'EndDay',value:''},{name:'StartTime',value:''},{name:'StartTimeType',value:''},{name:'EndTime',value:''},{name:'EndTimeType',value:''},{name:'Guests',value:''},{name:'Passengers',value:''},{name:'adults',value:''},{name:'seniors',value:''},{name:'youths',value:''},{name:'children',value:''},{name:'infantsWithoutSeat',value:''},{name:'infantsWithSeat',value:''},{name:'Rooms',value:''},{name:'DriversAge',value:''}];this.fields=this.fieldsInit;this.travelerTypes=['adults','seniors','youths','children','infantsWithoutSeat','infantsWithSeat'];this.addBotBox=function(botBoxId){dlog.alert("addBotBox('"+botBoxId+"') <");this.botBoxIds[this.botBoxIds.length]=botBoxId;}
this.addArrayTypeId=function(bId,arrTypeId,arrTypeArray){dlog.alert("addArrayTypeId('"+bId+","+arrTypeId+","+arrTypeArray+"') <");if(!this[arrTypeArray]){this[arrTypeArray]=new Array();}
var j=arrayIndexOf(this[arrTypeArray],bId);if(j==-1){var k=this[arrTypeArray].length;this[arrTypeArray][k]=new Array();this[arrTypeArray][k][0]=bId;this[arrTypeArray][k][1]=arrTypeId;}else{this[arrTypeArray][j][this[arrTypeArray][j].length]=arrTypeId;}}
this.setProduct=function(newBotId)
{if(!newBotId)return;var activeProductId=newBotId;var oldBotId=this.getActiveBotId();dlog.alert("setProduct() from "+oldBotId+" to "+newBotId);this.hideElement(getRef(oldBotId));if(getRef('isBot')){if(newBotId!=oldBotId)this.persistError(newBotId,oldBotId);this.persistTextfieldChanged(newBotId,oldBotId);if(oldBotId=='oas')this.selectLocationType(newBotId);if(oldBotId!='rail')this.persistDate(newBotId,oldBotId);this.persistTime(newBotId,oldBotId);if(getRef(oldBotId+'Rooms')||getRef(newBotId+'Rooms'))
this.persistRoom(newBotId,oldBotId);}
this.setActiveBotId(newBotId);this.showElement(getRef(newBotId));this.setFormFocus();}
this.persistTime=function(newBotId,oldBotId){switch(newBotId){case'car':case'hpc':switch(oldBotId){case'air':case'aph':case'apc':case'ahc':case'aow':if(getRef(oldBotId+'StartTime').value!='Anytime')
getRef(newBotId+'StartTime').value=this.carDefaultTime;if(getRef(oldBotId+'EndTime').value!='Anytime')
getRef(newBotId+'EndTime').value=this.carDefaultTime;break;}
break;case'amc':if(oldBotId=='air'||oldBotId=='aow'){this.prevEndTime=getRef('airEndTime').value;this.prevEndType=getRef('airEndTimeType').value;getRef('amcStartTime2').value='Anytime';getRef('amcStartTimeType2').value='Depart';}
break;case'air':if(getRef('amcStartTime2')!=null||getRef('amcStartTimeType2')!=null){this.prevEndTime=getRef('airEndTime').value;this.prevEndType=getRef('airEndTimeType').value;}
break;}}
this.persistDate=function(newBotId,oldBotId){var endRef="";if(oldBotId=='amc')endRef=getRef(oldBotId+'StartDate1');else endRef=getRef(oldBotId+'StartDate');switch(newBotId){case'aow':getRef('aowStartDate').value=endRef.value;break;case'amc':getRef('amcStartDate1').value=endRef.value;break;case'rail':break;case'htl':case'aph':case'ahc':case'hpc':prevEndDate=getRef(oldBotId+'EndDate').value;prevStartDate=getRef(oldBotId+'StartDate').value;curEndDate=getRef(newBotId+'EndDate');curStartDate=getRef(newBotId+'StartDate');if(prevEndDate==prevStartDate){curEndDate.value='mm/dd/yy';curStartDate.value=prevStartDate;}
else{curStartDate.value=prevStartDate;curEndDate.value=prevEndDate;}
break;default:if(endRef){getRef(newBotId+'StartDate').value=endRef.value;}
var endRef=getRef(newBotId+'EndDate');if(endRef){if(oldBotId=='amc'||oldBotId=='aow'){endRef.value=getRef('airEndDate').value;}else if(getRef(oldBotId+'EndDate')){endRef.value=getRef(oldBotId+'EndDate').value;}}}}
var varRef="";var persistVal="";this.persistRoom=function(newBotId,oldBotId){switch(oldBotId){case'htl':case'aph':case'ahc':case'hpc':if(getRef(oldBotId+'Rooms'))persistVal=getRef(oldBotId+'Rooms');switch(newBotId){case'aph':case'ahc':case'hpc':case'htl':if(getRef(newBotId+'Rooms'))getRef(newBotId+'Rooms').value=persistVal.value;case'apc':varRef=persistVal.value;break;default:break;}
break;case'apc':if(persistVal.value==null)varRef=1;switch(newBotId){case'aph':case'ahc':case'hpc':case'htl':if(getRef(newBotId+'Rooms'))getRef(newBotId+'Rooms').value=varRef;break;default:break;}
default:break;}}
this.persistTextfieldChanged=function(newBotId,oldBotId){switch(newBotId){case'air':case'apc':case'aph':case'ahc':case'aow':switch(oldBotId){case'air':case'aph':case'apc':case'ahc':case'aow':getRef(newBotId+'Origin').value=getRef(oldBotId+'Origin').value;getRef(newBotId+'Destination').value=getRef(oldBotId+'Destination').value;break;case'amc':getRef(newBotId+'Origin').value=getRef(oldBotId+'Origin1').value;getRef(newBotId+'Destination').value=getRef(oldBotId+'Destination1').value;break;case'car':var newCarElemRef=getRef(newBotId+'Origin');if(newCarElemRef!=null){if(document.getElementById('hotelDusted')&&document.getElementById('hotelDusted').value){newCarElemRef.value=(getRef('airOrigin').value||getRef('apcOrigin').value)}else{newCarElemRef.value=(getRef('airOrigin').value||getRef('ahcOrigin').value||getRef('apcOrigin').value||getRef('aphOrigin').value);}
var carAirportRadioRef=getRef('carAirport');var carCityRadioRef=getRef('carCityPOI');if(carAirportRadioRef!=null&&carAirportRadioRef.checked){var newElemRef=getRef(newBotId+'Destination');var oldElemRef=getRef(oldBotId+'Origin');if(newElemRef!=null&&oldElemRef!=null){if(oldElemRef.value=='Where From?'){newElemRef.value='';}else{newElemRef.value=oldElemRef.value;}}}else if(carCityRadioRef!=null&&carCityRadioRef.checked){var newElemRef=getRef(newBotId+'Destination');var oldElemRef=getRef(oldBotId+'Target');if(newElemRef!=null&&oldElemRef!=null){newElemRef.value=oldElemRef.value;}}}
break;case'htl':case'hpc':case'oas':if(getRef('fromRedesignedOas').value!='true')
{getRef(newBotId+'Destination').value=getRef(oldBotId+'Target').value;if(document.getElementById('hotelDusted')&&document.getElementById('hotelDusted').value){if(getRef('apcOrigin')){getRef(newBotId+'Origin').value=(getRef('airOrigin').value||getRef('apcOrigin').value);}else{getRef(newBotId+'Origin').value=getRef('airOrigin').value;}}else{getRef(newBotId+'Origin').value=(getRef('airOrigin').value||getRef('ahcOrigin').value||getRef('apcOrigin').value||getRef('aphOrigin').value);}
break;}
default:}
break;case'car':switch(oldBotId){case'air':case'aph':case'apc':case'ahc':var newElemRef=getRef(newBotId+'Origin');var oldDestRef=getRef(oldBotId+'Destination');var newDestRef=getRef(newBotId+'Destination');var newTarRef=getRef(newBotId+'Target');var newCityRef=getRef(newBotId+'OriginCity');if(oldDestRef!=null&&newElemRef!=null&&oldDestRef.value==''){newElemRef.value='Where From?';}else{if(newElemRef!=null&&oldDestRef!=null){newElemRef.value=oldDestRef.value;newCityRef.value=oldDestRef.value;}
if(newTarRef!=null&&oldDestRef!=null){newTarRef.value=oldDestRef.value;}
if(newElemRef!=null&&newDestRef!=null&&newElemRef.value==newDestRef.value){newDestRef.value='Same as pick-up';}}
break;case'htl':case'hpc':var oldTarRef=getRef(oldBotId+'Target');var newTarRef=getRef(newBotId+'Target');var newElemRef=getRef(newBotId+'Origin');if(oldTarRef!=null&&newElemRef!=null&&oldTarRef.value==""){newElemRef.value='Where From?';}else if(oldTarRef!=null&&newElemRef!=null&&oldTarRef.value!=""){newElemRef.value=oldTarRef.value;if(newTarRef!=null){newTarRef.value=oldTarRef.value;}}
break;case'oas':if(getRef('fromRedesignedOas').value!='true')
{var oldTarRef=getRef(oldBotId+'Target');var newTarRef=getRef(newBotId+'Target');var newElemRef=getRef(newBotId+'Origin');if(oldTarRef!=null&&newElemRef!=null&&oldTarRef.value==""){newTarRef.value='Where From?';}else if(oldTarRef!=null&&newElemRef!=null&&oldTarRef.value!=""){newTarRef.value=oldTarRef.value;}}
break;default:}
break;case'hpc':case'htl':switch(oldBotId){case'air':case'aph':case'apc':case'ahc':getRef(newBotId+'Target').value=getRef(oldBotId+'Destination').value;break;case'car':var oldOriginRef=getRef(oldBotId+'Origin');var newTargetRef=getRef(newBotId+'Target');if(oldOriginRef!=null&&newTargetRef!=null&&oldOriginRef.value=='Where From?'){newTargetRef.value="";}else if(oldOriginRef!=null&&newTargetRef!=null&&oldOriginRef.value!='Where From?'){var carAirportRadioRef=getRef('carAirport');var carCityRadioRef=getRef('carCityPOI');if(carAirportRadioRef!=null&&carAirportRadioRef.checked){var newElemRef=getRef(newBotId+'Target');var oldElemRef=getRef(oldBotId+'Origin');if(newElemRef!=null&&oldElemRef!=null){newElemRef.value=oldElemRef.value;}}else if(carCityRadioRef!=null&&carCityRadioRef.checked){var newElemRef=getRef(newBotId+'Target');var oldElemRef=getRef(oldBotId+'Target');if(newElemRef!=null&&oldElemRef!=null){newElemRef.value=oldElemRef.value;}}}
break;case'htl':case'hpc':case'oas':if(getRef('fromRedesignedOas')&&getRef('fromRedesignedOas').value!='true')
{getRef(newBotId+'Target').value=getRef(oldBotId+'Target').value;}
break;default:}
break;case'oas':if(getRef('fromRedesignedOas').value!='true')
{switch(oldBotId){case'air':case'aph':case'apc':case'ahc':getRef(newBotId+'Target').value=getRef(oldBotId+'Destination').value;getRef('oasTopCitiesNone').checked=true;break;case'car':var oldOriginRef=getRef(oldBotId+'Origin');var newTarRef=getRef(newBotId+'Target');if(oldOriginRef!=null&&newTarRef!=null&&oldOriginRef.value=='Where From?'){newTarRef.value="";}else if(oldOriginRef!=null&&newTarRef!=null&&oldOriginRef.value!='Where From?'){newTarRef.value=oldOriginRef.value;}
getRef('oasTopCitiesNone').checked=true;break;case'htl':case'hpc':getRef(newBotId+'Target').value=getRef(oldBotId+'Target').value;getRef('oasTopCitiesNone').checked=true;break;default:}}
break;case'amc':if(oldBotId=='air'||oldBotId=='aow'){getRef(newBotId+'Origin1').value=getRef(oldBotId+'Origin').value;getRef(newBotId+'Destination1').value=getRef(oldBotId+'Destination').value;}
break;default:}}
this.getActiveBotId=function(){return this.bId;}
this.setActiveBotId=function(newBotId){this.bId=newBotId;}
this.swapFields=function(prevBot,nextBot,fieldName){this.setFieldValue(nextBot,fieldName,this.getFieldValue(prevBot,fieldName));}
this.getFieldValue=function(bot,fieldName){dlog.alert("getFieldValue('"+bot+"', '"+fieldName+"')");var elemRef=getRef(bot+fieldName)
if(elemRef)
{switch(elemRef.type)
{case"radio":if(elemRef.checked){return elemRef.value;}else{return"";}
break;case"checkbox":return elemRef.checked;break;case"select-one":return elemRef.options[elemRef.options.selectedIndex].value;break;default:if(elemRef[0].type=="radio"){for(i=0;i<elemRef.length;i++){if(elemRef[i].checked){return elemRef[i].value;}}
return"";}
return elemRef.value;}}
return null;}
this.setFieldValue=function(bId,fieldName,newValue){var elemRef=getRef(bId+fieldName)
if(elemRef)
{switch(elemRef.type)
{case"radio":if(elemRef.value==newValue){elemRef.checked=true;}
break;case"checkbox":elemRef.checked=newValue;break;case"select-one":this.selectValue(elemRef,newValue);break;default:elemRef.value=newValue;}}}
this.grabFieldValues=function(){var guestsCount=0;var guestsIndex=-1;for(var i=0;i<this.fields.length;i++)
{var name=this.fields[i].name;var newValue=this.getFieldValue(this.bId,name);if(newValue){this.fields[i].value=newValue;for(var j=0;j<this.travelerTypes.length;j++){if(name==this.travelerTypes[j]){guestsCount+=parseInt(newValue);j=this.travelerTypes.length;}}}else{if(name=='Guests')guestsIndex=i;}}
if(guestsIndex>=0)this.fields[guestsIndex].value=guestsCount;return this.fields;}
this.putFieldValues=function(){if(this.fields){for(var i=0;i<this.fields.length;i++)
{this.setFieldValue(this.bId,this.fields[i].name,this.fields[i].value);}}
return this.fields;}
this.setFormFocus=function(){if(this.bId.indexOf('chg')>0||this.bId.indexOf('edt')>0)return;var formRef=getRef(this.bId+this.FORM_NAME);if(formRef&&((document.getElementById('dealPage')==null))){dlog.alert('setFormFocus(): form='+formRef.id);var fieldSelected=false;for(var k=0;k<formRef.elements.length&&!fieldSelected;k++){var elemRef=formRef.elements[k];if(elemRef){if(elemRef.type=='text'&&!elemRef.disabled){if(!this.hasClass(elemRef,'hasError')){for(var j=k+1;j<formRef.elements.length&&!fieldSelected;j++){var eleRef=formRef.elements[j];if(eleRef.type=='text'&&!eleRef.disabled&&this.hasClass(eleRef,'hasError')){dlog.alert('setFormFocus(): select on '+eleRef.id);if(eleRef.select){eleRef.select();fieldSelected=true;}}}}
if(this.hasClass(elemRef,'hasError')||!fieldSelected){dlog.alert('setFormFocus(): select on '+elemRef.id);if(elemRef.select){elemRef.select();fieldSelected=true;}
if((this.bId=='car'||this.bId=='rentcar')&&((formRef.carLocalMarketOneWayOn!=null&&formRef.carLocalMarketOneWayOn.value=='true'))){var targetRef=getRef(this.bId+'Target');if(targetRef!=null&&targetRef.select){targetRef.select();fieldSelected=true;}}}}
if(elemRef.type=='select-one'&&!elemRef.disabled&&this.bId!='car'&&this.bId!='rentcar'){dlog.alert('setFormFocus(): focus on '+elemRef.id);fieldSelected=true;}}}}}
this.disableUnchanged=function(){var selectRef=getRef(this.bId+'StartMonth');if(selectRef&&!this.hasClass(selectRef,'changed'))
selectRef.disabled=true;selectRef=getRef(this.bId+'StartDay');if(selectRef&&!this.hasClass(selectRef,'changed'))
selectRef.disabled=true;selectRef=getRef(this.bId+'EndMonth');if(selectRef&&!this.hasClass(selectRef,'changed'))
selectRef.disabled=true;selectRef=getRef(this.bId+'EndDay');if(selectRef&&!this.hasClass(selectRef,'changed'))
selectRef.disabled=true;selectRef=getRef(this.bId+'Origin');if(selectRef&&!this.hasClass(selectRef,'changed'))
selectRef.disabled=false;selectRef=getRef(this.bId+'Destination');if(selectRef&&!this.hasClass(selectRef,'changed'))
selectRef.disabled=false;selectRef=getRef(this.bId+'Target');if(selectRef&&!this.hasClass(selectRef,'changed'))
selectRef.disabled=false;}
this.loadState=function(){dlog.alert("loadState(): botCookie="+this.cookie.get());if(!this.cookie.get()){this.cookie.setNameValues(this.fieldsInit);this.fields=this.cookie.getNameValues();}else{this.fields=this.cookie.getNameValues();}}
this.getBotRefs=function(){return this.botRefs;}
this.getBotArray=function(botsRef){var botArray=new Array();if(botsRef){var index=0;var productElems=botsRef.childNodes;for(var i=0;i<productElems.length;i++){if(this.hasClass(productElems[i],'product')){botArray[index]=getRef(productElems[i].id);index++;}}}
return botArray}
this.hasClass=function(element,currentClass){var found=false;if(element&&element.className){var classes=element.className.split(" ");for(var i=0;i<classes.length;i++){if(classes[i]==currentClass){found=true;break;}}}
return found;}
this.appendClass=function(element,newClass){if(!element)return false;var length=element.className?element.className.length:0;if(length>0){if(this.hasClass(element,newClass)){}else{element.className=element.className+" "+newClass;dlog.alert('appendClass(): class "'+newClass+'" added to '+element.id+"'s className");}}
else{element.className=newClass;dlog.alert('appendClass(): className for '+element.id+' changed to "'+newClass+'"');}
return true;}
this.removeClass=function(element,currentClass){dlog.alert("removeClass('"+element.className+"', '"+currentClass+"')");var removed=false;if(element){var classes=element.className.split(" ");if(classes.length==1&&classes[0]==currentClass){element.className="";}else{var newClassString="";for(var i=0;i<classes.length;i++){if(classes[i]==currentClass){removed=true;}else{newClassString+=((newClassString)?" ":"")+classes[i];}}
element.className=newClassString;}
if(removed)dlog.alert('removeClass(): class "'+currentClass+'" for '+element.id+' was removed: "'+element.className+'"');}
return removed;}
this.swapClasses=function(elementRef,oldClass,newClass){if(elementRef!=null){this.removeClass(elementRef,oldClass);this.appendClass(elementRef,newClass);}}
this.showElement=function(elementRef){if(elementRef){this.removeClass(elementRef,'inactive');if(elementRef.tagName=='SPAN'){this.appendClass(elementRef,'inline');}else{this.appendClass(elementRef,'active');}}}
this.hideElement=function(elementRef){if(elementRef){if(elementRef.tagName=='SPAN'){this.removeClass(elementRef,'inline');}else{this.removeClass(elementRef,'active');}
this.appendClass(elementRef,'inactive');dlog.alert("hideElement(): "+elementRef.id+".className='"+elementRef.className+"'");}}
this.selectValue=function(selectRef,value){if(!selectRef)return 0;for(var i=0;i<selectRef.options.length;i++){if(selectRef.options[i].value==value){selectRef.selectedIndex=i;break;}}
return selectRef.selectedIndex;}
this.gotoFlightType=function(elemRef){if(elemRef){dlog.alert("gotoFlightType(): className="+elemRef.className);var indexRT=botMgr.hasClass(elemRef,'roundTrip');var indexOW=botMgr.hasClass(elemRef,'oneWay');var indexMC=botMgr.hasClass(elemRef,'multiCity');if(indexRT){if(getRef('isBot'))botMgr.persistType('air');botMgr.setProduct('air');getRef('airRoundTrip').checked=true;getRef('aowRoundTrip').checked=true;getRef('amcRoundTrip').checked=true;}
else if(indexOW){if(getRef('isBot'))botMgr.persistType('aow');botMgr.setProduct('aow');getRef('airOneWay').checked=true;getRef('aowOneWay').checked=true;getRef('amcOneWay').checked=true;}
else if(indexMC){if(getRef('isBot'))botMgr.persistType('amc');botMgr.setProduct('amc');getRef('airMultiCity').checked=true;getRef('aowMultiCity').checked=true;getRef('amcMultiCity').checked=true;}
if(getRef("DPSavingsMessage")&&getRef("airDualButtonBottom")){botMgr.swapClasses(getRef('airDualButtonBottom'),'showDPSavings','hideDPSavings');this.checkDPMatch();}}}
this.setSearchType=function(searchType){var elemRef=getRef(this.bId+'searchType');if(elemRef)elemRef.value=searchType;}
this.highlightElement=function(highlightId){var elemRef=getRef(highlightId);if(elemRef)elemRef.select();}
this.selectLocationType=function(newBotId){var oasSelectedRadio;var radioElem=0;oldBotId=botMgr.getActiveBotId();var elemForRadioGroup=getRef(oldBotId+'TargetGroup');if(elemForRadioGroup){var inpArr=elemForRadioGroup.getElementsByTagName('input');if(inpArr!=null&&inpArr.length>0){for(var i=0;i<inpArr.length-2;i++){if(inpArr[i].checked&&(inpArr[i].id!=getRef(botMgr.getActiveBotId()+'TopCitiesNone'))){oasSelectedRadio=inpArr[i].value;radioElem=1;}}
if(radioElem==0){inpArr[inpArr.length-2].checked=true;oasSelectedRadio=inpArr[inpArr.length-1].value;}}}
var elemRef;for(var i=0;i<botMgr.botRefs.length;i++){if(botMgr.botRefs[i].id!=botMgr.bId){if(botMgr.botRefs[i].id=='car'){elemRef=getRef(botMgr.botRefs[i].id+'Origin');elemRef.value=oasSelectedRadio;}
else if(botMgr.botRefs[i].id=='htl'){elemRef=getRef(botMgr.botRefs[i].id+'Target');elemRef.value=oasSelectedRadio;}
else if(botMgr.botRefs[i].id=='hpc'){elemRef=getRef(botMgr.botRefs[i].id+'Target');elemRef.value=oasSelectedRadio;}
else if(botMgr.botRefs[i].id=='oas'){elemRef=getRef(botMgr.botRefs[i].id+'Target');elemRef.value=oasSelectedRadio;}
else if(botMgr.botRefs[i].id=='air'){elemRef=getRef(botMgr.botRefs[i].id+'Destination');elemRef.value=oasSelectedRadio;}
else if(botMgr.botRefs[i].id=='apc'){elemRef=getRef(botMgr.botRefs[i].id+'Destination');elemRef.value=oasSelectedRadio;}
else if(botMgr.botRefs[i].id=='ahc'){elemRef=getRef(botMgr.botRefs[i].id+'Destination');elemRef.value=oasSelectedRadio;}
else if(botMgr.botRefs[i].id=='aph'){elemRef=getRef(botMgr.botRefs[i].id+'Destination');elemRef.value=oasSelectedRadio;}}}}
this.persistError=function(newBotId,oldBotId){var element=getRef(oldBotId);if(element){var pTag=element.getElementsByTagName('p');for(var i=0;i<pTag.length;i++){if(botMgr.hasClass(pTag[i],'error')){botMgr.hideElement(pTag[i]);}}
var divTag=element.getElementsByTagName('div');var fieldsetTag=element.getElementsByTagName('fieldset');for(var j=0;j<divTag.length;j++){if(botMgr.hasClass(divTag[j],'errorTop'))
botMgr.hideElement(divTag[j]);if(botMgr.hasClass(divTag[j],'hasError')){var textfieldTag=element.getElementsByTagName('input');for(var k=0;k<textfieldTag.length;k++){if(botMgr.hasClass(textfieldTag[k],'hasError'))
textfieldTag[k].value="";}
botMgr.removeClass(divTag[j],'hasError');}
if(botMgr.hasClass(fieldsetTag[j],'hasError')){if(botMgr.hasClass(fieldsetTag[j],'startDates')){var fieldSet=element.getElementsByTagName('input');for(var l=0;l<fieldSet.length;l++){if(botMgr.hasClass(fieldSet[l],'startDate'))
fieldSet[l].value="mm/dd/yy";}
botMgr.removeClass(fieldsetTag[j],'hasError');}
if(botMgr.hasClass(fieldsetTag[j],'endDates')){var fieldSet=element.getElementsByTagName('input');for(var l=0;l<fieldSet.length;l++){if(botMgr.hasClass(fieldSet[l],'endDate'))
fieldSet[l].value="mm/dd/yy";}
botMgr.removeClass(fieldsetTag[j],'hasError');}}
if(botMgr.hasClass(divTag[j],'travelerGroup')){var noOfTraveler=this.countTravelers(newBotId);if(noOfTraveler>9){adultsRef=getRef(newBotId+'adults');botMgr.selectValue(adultsRef,'1');seniorsRef=getRef(newBotId+'seniors');botMgr.selectValue(seniorsRef,'0');youthsRef=getRef(newBotId+'youths');botMgr.selectValue(youthsRef,'0');childrenRef=getRef(newBotId+'children');botMgr.selectValue(childrenRef,'0');infantsWithoutSeatRef=getRef(newBotId+'infantsWithoutSeat');botMgr.selectValue(infantsWithoutSeatRef,'0');infantsWithSeatRef=getRef(newBotId+'infantsWithSeat');botMgr.selectValue(infantsWithSeatRef,'0');}
if(newBotId=='amc'){getRef('amcOrigin2').value="";getRef('amcDestination2').value="";getRef('amcStartDate2').value="mm/dd/yy";}}}}}
this.persistType=function(newBotId){oldBotId=botMgr.getActiveBotId();var nonStopRef=getRef(newBotId+'NonStopsPreferred');var refundRef=getRef(newBotId+'RefundableFaresOnly');var prefRef=getRef(newBotId+'Preferenced');var cabRef=getRef(newBotId+'CabinClass');if((oldBotId=='air'||oldBotId=='aow')&&newBotId=='amc'){getRef('amcOrigin2').value="";getRef('amcDestination2').value="";getRef('amcOrigIncludeAirports2').checked=false;getRef('amcDestIncludeAirports2').checked=false;getRef('amcStartDate2').value="mm/dd/yy";}
if(newBotId!='amc'){var orginRef=getRef(newBotId+'OrigIncludeAirports');var destRef=getRef(newBotId+'DestIncludeAirports');}
else{var orginRef=getRef(newBotId+'OrigIncludeAirports1');var destRef=getRef(newBotId+'DestIncludeAirports1');}
if(orginRef){if(newBotId!=oldBotId)orginRef.checked=false;if(oldBotId!='amc'){if(getRef(oldBotId+'OrigIncludeAirports').checked==true)
orginRef.checked=true;}
if(oldBotId=='amc'){if(getRef(oldBotId+'OrigIncludeAirports1').checked==true)
orginRef.checked=true;}}
if(getRef(newBotId+'OrigIncludeAirports1'&&newBotId!=oldBotId)){if(getRef(oldBotId+'OrigIncludeAirports').checked==true)
getRef(newBotId+'OrigIncludeAirports1').checked=true;}
if(destRef){if(newBotId!=oldBotId)destRef.checked=false;if(oldBotId!='amc'){if(getRef(oldBotId+'DestIncludeAirports').checked==true)
destRef.checked=true;}
if(oldBotId=='amc'){if(getRef(oldBotId+'DestIncludeAirports1').checked==true)
destRef.checked=true;}}
if(getRef(newBotId+'DestIncludeAirports1'&&newBotId!=oldBotId)){if(getRef(oldBotId+'DestIncludeAirports').checked==true)
getRef(newBotId+'DestIncludeAirports1').checked=true;}
if(oldBotId=='amc'){if(newBotId=='air'){getRef('airStartTimeType').value=getRef('amcStartTimeType1').value;getRef('airEndTimeType').value=getRef('amcStartTimeType2').value;getRef('airStartTime').value=getRef('amcStartTime1').value;getRef('airEndTime').value=getRef('amcStartTime2').value;}
if(newBotId=='aow'){getRef('aowStartTimeType').value=getRef('amcStartTimeType1').value;getRef('aowStartTime').value=getRef('amcStartTime1').value;}}
if(oldBotId=='aow'){if(newBotId=='amc'){getRef('amcStartTimeType1').value=getRef('aowStartTimeType').value;getRef('amcStartTimeType2').value=getRef('airEndTimeType').value;getRef('amcStartTime1').value=getRef('aowStartTime').value;getRef('amcStartTime2').value=getRef('airEndTime').value;}
if(newBotId=='air'){getRef('airStartTimeType').value=getRef('aowStartTimeType').value;getRef('airEndTimeType').value=getRef('amcStartTimeType2').value;getRef('airStartTime').value=getRef('aowStartTime').value;getRef('airEndTime').value=getRef('amcStartTime2').value;}}
if(oldBotId=='air'){if(newBotId=='aow'){getRef('aowStartTimeType').value=getRef('airStartTimeType').value;getRef('aowStartTime').value=getRef('airStartTime').value;}
if(newBotId=='amc'){getRef('amcStartTimeType1').value=getRef('airStartTimeType').value;getRef('amcStartTimeType2').value=getRef('airEndTimeType').value;getRef('amcStartTime1').value=getRef('airStartTime').value;getRef('amcStartTime2').value=getRef('airEndTime').value;}}
if(nonStopRef){if(oldBotId!=newBotId)nonStopRef.checked=false;if(getRef(oldBotId+'NonStopsPreferred').checked==true)
getRef(newBotId+'NonStopsPreferred').checked=true;}
if(refundRef){if(oldBotId!=newBotId)refundRef.checked=false;if(getRef(oldBotId+'RefundableFaresOnly').checked==true)
getRef(newBotId+'RefundableFaresOnly').checked=true;}
if(prefRef){if(oldBotId!=newBotId)prefRef.checked=false;if(getRef(oldBotId+'Preferenced').checked==true){getRef(newBotId+'Preferenced').checked=true;if(getRef(oldBotId+'PreferencingAirline').checked==true){getRef(newBotId+'PreferencingAirline').checked=true;getRef(newBotId+'Carrier1').value=getRef(oldBotId+'Carrier1').value;getRef(newBotId+'Carrier2').value=getRef(oldBotId+'Carrier2').value;getRef(newBotId+'Carrier3').value=getRef(oldBotId+'Carrier3').value;}
if(getRef(oldBotId+'PreferencingAlliance').checked==true){getRef(newBotId+'PreferencingAlliance').checked=true;getRef(newBotId+'PreferredAlliance').value=getRef(oldBotId+'PreferredAlliance').value;}
this.behaviorFlightOptions(newBotId);}else{getRef(newBotId+'Preferenced').checked=false;getRef(newBotId+'Carrier1').value='';getRef(newBotId+'Carrier2').value='';getRef(newBotId+'Carrier3').value='';getRef(newBotId+'PreferencingAlliance').checked=false;getRef(newBotId+'PreferredAlliance').value='';this.behaviorFlightOptions(newBotId);}}
if(cabRef){if(getRef(oldBotId+'CabinClass').value!='None')
getRef(newBotId+'CabinClass').value=getRef(oldBotId+'CabinClass').value;}}
this.setOrbotHotelSearchTypeKey=function(orbotHotelSearchTypeKey,targetProductType){var elemRef=getRef(this.bId+'orbotHotelSearchTypeKey');var searchRef=getRef(this.bId+'searchType');if(elemRef)elemRef.value=orbotHotelSearchTypeKey;if(elemRef.value=='HC'&&targetProductType!='package'){if(searchRef)searchRef.value='hotel';}
return true;}
this.saveState=function(){dlog.alert("saveState(): botCookie("+botMgr.cookie.name+")="+botMgr.cookie.get());botMgr.cookie.setNameValues(botMgr.grabFieldValues());dlog.alert("saveState(): botCookie="+botMgr.cookie.get());}
this.gotoBot=function()
{dlog.alert("gotoBot()");var newBotId=this.getAttribute('botid');var oldBotId=botMgr.getActiveBotId();var redirectUrl=this.getAttribute('href');var targetProduct=this.getAttribute('target');var dpHidden=this.getAttribute('dp');var orbotHotel=this.getAttribute('orbotHotelSearchTypeKey');dlog.alert("gotoBot(): attributes: botid="+newBotId+" href="+redirectUrl+" target="+targetProduct+" dp="+dpHidden);if((redirectUrl)||(!(redirectUrl)&&(targetProduct=='package'))){if(!targetProduct&&!dpHidden){dlog.alert('gotoBot(): REDIRECT to "'+redirectUrl+'"');document.location=redirectUrl;}else{if(targetProduct){botMgr.setSearchType(targetProduct);dlog.alert('gotoBot(): setting searchType to "'+targetProduct+'"');}
if(dpHidden){var dpHiddenRef=getRef(botMgr.bId+'dpHidden');if(dpHiddenRef){if(dpHidden=='hotelcar')botMgr.setSearchType('car');else
dpHiddenRef.value=dpHidden;}
dlog.alert('gotoBot(): setting dpHidden to "'+dpHidden+'"');}
if(orbotHotel){if(oldBotId!='rail')botMgr.setOrbotHotelSearchTypeKey(orbotHotel,targetProduct);dlog.alert('gotoBot(): setting searchType to "'+orbotHotel+'"');}
dlog.alert('gotoBot(): SUBMIT after setting searchType or dpHidden');var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(curRef)curRef.value=newBotId;if(oldBotId=='amc'||oldBotId=='aow')oldBotId='air';if(preRef)preRef.value=oldBotId;clickSubmit('expand');}}else{dlog.alert('gotoBot(): SET PRODUCT to "'+newBotId+'"');botMgr.setProduct(newBotId);}}
this.dropdownChanged=function(event){dlog.alert("dropdownChanged()");var evt=(event)?event:((window.event)?window.event:"");if(evt){var element=(evt.target)?evt.target:evt.srcElement;dlog.alert("dropdownChanged(): element.id='"+element.id+"'");if(element){botMgr.appendClass(element,'changed');var coreId=element.id.substr(botMgr.bId.length,element.id.length-botMgr.bId.length);var elemRef;if(getRef('isBot')){var coreId=element.id.substr(botMgr.bId.length,element.id.length-botMgr.bId.length);var elemRef;for(var i=0;i<botMgr.botRefs.length;i++){if(botMgr.botRefs[i].id!=botMgr.bId){if(botMgr.bId=='air'&&botMgr.botRefs[i].id=='aph'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='air'&&botMgr.botRefs[i].id=='apc'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='air'&&botMgr.botRefs[i].id=='ahc'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='car'&&botMgr.botRefs[i].id=='hpc'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='aph'&&botMgr.botRefs[i].id=='air'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='aph'&&botMgr.botRefs[i].id=='ahc'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='aph'&&botMgr.botRefs[i].id=='apc'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='hpc'&&botMgr.botRefs[i].id=='car'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='ahc'&&botMgr.botRefs[i].id=='air'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='ahc'&&botMgr.botRefs[i].id=='aph'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='ahc'&&botMgr.botRefs[i].id=='apc'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='apc'&&botMgr.botRefs[i].id=='air'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='apc'&&botMgr.botRefs[i].id=='aph'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else if(botMgr.bId=='apc'&&botMgr.botRefs[i].id=='ahc'){if(coreId=='StartTime'||coreId=='EndTime'){elemRef=getRef(botMgr.botRefs[i].id+coreId);botMgr.selectValue(elemRef,element.value);}}
else{botMgr.selectValue(elemRef,coreId);}}}}
var bId=botMgr.getActiveBotId();var formRef=getRef(bId+botMgr.FORM_NAME);var carPickupDropoffDropDownChange=false;if(formRef&&formRef.searchType.value=='car'&&(formRef.carLocalMarketOneWayOn!=null&&formRef.carLocalMarketOneWayOn.value=='true')&&(element.id==bId+'OriginLocation'||element.id==bId+'DestinationLocation')){carPickupDropoffDropDownChange=true;}
if(formRef){if(formRef.disambiguatedOrigin!=null&&formRef.locationType!=null){for(var l=0;l<formRef.locationType.length;l++){if(formRef.locationType[l].checked){var locType=formRef.locationType[l].value;break;}}
if(locType=='air'){formRef.target.selectedIndex=formRef.origin.selectedIndex;}else{if(locType=='std'){formRef.origin.selectedIndex=formRef.target.selectedIndex;}}}
else if(carPickupDropoffDropDownChange){var currentSelection=null;var neighbourSelection=null;var pickupDropDownSelection=getRef(bId+'OriginLocation');var dropoffDropDownSelection=getRef(bId+'DestinationLocation');botMgr.hideElement(getRef(bId+'AirportError'));var pickUpLabel=getRef(bId+'LocationTypeBoxOrigin').getElementsByTagName('label');for(var i=0;i<pickUpLabel.length;i++){if(botMgr.removeClass(pickUpLabel[i],'error')){botMgr.removeClass(pickUpLabel[i],'error');}}
var dropOffLabel=getRef(bId+'LocationTypeBoxDestination').getElementsByTagName('label');for(i=0;i<dropOffLabel.length;i++){if(botMgr.hasClass(dropOffLabel[i],'error')){botMgr.removeClass(dropOffLabel[i],'error');}}
if(element.id==bId+'OriginLocation'){currentSelection=getRef(bId+'Origin'+'Location');neighbourSelection=getRef(bId+'Destination'+'Location');}else if(element.id==bId+'DestinationLocation'){currentSelection=getRef(bId+'Destination'+'Location');neighbourSelection=getRef(bId+'Origin'+'Location');}
if(currentSelection!=null&&neighbourSelection!=null){var neighbourDropDownNote=neighbourSelection.parentNode.getElementsByTagName('span');if(currentSelection.value!='Address'){neighbourDropDownNote[0].firstChild.nodeValue='(airport, city, address)';}else if(currentSelection.value=='Address'){neighbourDropDownNote[0].firstChild.nodeValue='(airport, city)';}
var airportError=false;if(currentSelection.value!='Airport'&&neighbourSelection.value!='Airport'&&dropoffDropDownSelection.value!='Same as pick-up'){airportError=true;botMgr.showElement(getRef(bId+'AirportError'));var pickUpLabel=getRef(bId+'LocationTypeBoxOrigin').getElementsByTagName('label');for(i=0;i<pickUpLabel.length;i++){botMgr.appendClass(pickUpLabel[i],'error');}
var dropOffLabel=getRef(bId+'LocationTypeBoxDestination').getElementsByTagName('label');for(i=0;i<dropOffLabel.length;i++){botMgr.appendClass(dropOffLabel[i],'error');}
botMgr.hideElement(getRef(bId+'OriginLocations'));botMgr.hideElement(getRef(bId+'DestinationLocations'));}else{botMgr.showElement(getRef(bId+'OriginLocations'));botMgr.showElement(getRef(bId+'DestinationLocations'));botMgr.swapLocations(evt);if(currentSelection==getRef(bId+'DestinationLocation')&&neighbourSelection.value=='Airport'){var targetElemRef=getRef(bId+'Target');var airportElemRef=getRef(bId+'Origin');if(botMgr.prevDropOffDropDownSelection=="Same as pick-up"){if(targetElemRef.value!=""&&targetElemRef.value!="Where from?"){airportElemRef.value=targetElemRef.value;}}else{if(airportElemRef.value!=""&&airportElemRef!="Where from?"){targetElemRef.value=airportElemRef.value;}}}}
var pickupElemRef=getRef('pickupSearchMode');var dropoffElemRef=getRef('dropoffSearchMode');if(airportError==false&&pickupDropDownSelection!=null&&dropoffDropDownSelection!=null&&pickupElemRef!=null&&dropoffElemRef!=null){var pickupDropDownValue=pickupDropDownSelection.value;var dropoffDropDownValue=dropoffDropDownSelection.value;if(pickupDropDownValue=='Airport'){pickupElemRef.value='air';}else if(pickupDropDownValue=='City'){pickupElemRef.value='std';}else{pickupElemRef.value='adr';}
if(dropoffDropDownValue=='Airport'){dropoffElemRef.value='air';}else if(dropoffDropDownValue=='City'){dropoffElemRef.value='std';}else if(dropoffDropDownValue=='Address'){dropoffElemRef.value='adr';}else{dropoffElemRef.value='';}
botMgr.alignLMOWTextBoxesOnError(bId);}else if(airportError==true){pickupElemRef.value='';dropoffElemRef.value='';}}
botMgr.prevDropOffDropDownSelection=dropoffDropDownSelection.value;}}}}}
this.textfieldFocus=function(event){var evt=(event)?event:((window.event)?window.event:"");if(evt){var element=(evt.target)?evt.target:evt.srcElement;element.select();}}
this.swapAir=function(event){var evt=(event)?event:((window.event)?window.event:"");if(evt){var elemRef=(evt.target)?evt.target:evt.srcElement;botMgr.gotoFlightType(elemRef);}}
this.showNextSlice=function(event){var evt=(event)?event:((window.event)?window.event:"");if(evt){var element=(evt.target)?evt.target:evt.srcElement;if(element){if(!element.tagName){element=element.parentNode;}
var sliceNum=eval(element.id.substr(element.id.length-1));botMgr.hideElement(getRef("addAnotherFlight"+sliceNum));botMgr.showElement(getRef("slice"+(sliceNum+1)));}}}
this.showHideLocations=function(bId){var elemRef=getRef(bId+'Airport');if(elemRef&&elemRef.checked){this.showElement(getRef(bId+'EndPointsGroup'));elemRef=getRef(bId+'Origin');if(elemRef)elemRef.disabled=false;this.hideElement(getRef(bId+'TargetGroup'));elemRef=getRef(bId+'Target');if(elemRef)elemRef.disabled=true;this.hideElement(getRef(bId+'AddressGroup'));}else{elemRef=getRef(bId+'CityPOI');if(elemRef&&elemRef.checked){this.hideElement(getRef(bId+'EndPointsGroup'));elemRef=getRef(bId+'Origin');if(elemRef)elemRef.disabled=true;this.showElement(getRef(bId+'TargetGroup'));elemRef=getRef(bId+'Target');if(elemRef)elemRef.disabled=false;this.hideElement(getRef(bId+'AddressGroup'));}else{elemRef=getRef(bId+'Address');if(elemRef&&elemRef.checked){this.hideElement(getRef(bId+'EndPointsGroup'));elemRef=getRef(bId+'Origin');if(elemRef)elemRef.disabled=true;this.hideElement(getRef(bId+'TargetGroup'));elemRef=getRef(bId+'Target');if(elemRef)elemRef.disabled=true;this.showElement(getRef(bId+'AddressGroup'));}}}}
this.showHideLMOWLocations=function(bId,originPickUp,destinationDropOff){var originPickUpValue=originPickUp.value;var destinationDropOffValue=destinationDropOff.value;if(originPickUpValue=="Airport"&&destinationDropOffValue=="Same as pick-up"){this.hideElement(getRef(bId+'OriginAirportEndPointsGroup'));this.hideElement(getRef(bId+'DestinationAirportEndPointsGroup'));this.hideElement(getRef(bId+'OriginCityEndPointsGroup'));this.hideElement(getRef(bId+'DestinationCityEndPointsGroup'));this.showElement(getRef(bId+'TargetGroup'));this.hideElement(getRef(bId+'OriginAddressGroup'));this.hideElement(getRef(bId+'DestinationAddressGroup'));this.hideElement(getRef(bId+'Origin'));this.hideElement(getRef(bId+'Destination'));this.hideElement(getRef(bId+'OriginCity'));this.hideElement(getRef(bId+'DestinationCity'));}else{this.hideElement(getRef(bId+'TargetGroup'));this.showHideInnerTextBoxComponents(bId,"Origin",originPickUpValue);this.showHideInnerTextBoxComponents(bId,"Destination",destinationDropOffValue);this.showHideInnerComponent(bId,originPickUpValue,"Airport","Origin");this.showHideInnerComponent(bId,destinationDropOffValue,"Airport","Destination");this.showHideInnerComponent(bId,originPickUpValue,"City","Origin");this.showHideInnerComponent(bId,destinationDropOffValue,"City","Destination");}
if(originPickUpValue!="Address"){this.hideElement(getRef(bId+'OriginAddressGroup'));}
if(destinationDropOffValue!="Address"){this.hideElement(getRef(bId+'DestinationAddressGroup'));}}
this.showHideInnerComponent=function(bId,pickUpValue,endPoint,component){if(pickUpValue==endPoint){this.showElement(getRef(bId+component+endPoint+"EndPointsGroup"));this.showElement(getRef(bId+endPoint+component));}else{this.hideElement(getRef(bId+component+endPoint+"EndPointsGroup"));this.hideElement(getRef(bId+endPoint+component));}}
this.showHideInnerTextBoxComponents=function(bId,capsLocationSearchType,locationPickUpOrDropOff){if(locationPickUpOrDropOff=='Airport'){this.showElement(getRef(bId+capsLocationSearchType));this.hideElement(getRef(bId+capsLocationSearchType+'City'));this.hideElement(getRef(bId+capsLocationSearchType+'AddressGroup'));}else if(locationPickUpOrDropOff=='City'){this.hideElement(getRef(bId+capsLocationSearchType));this.showElement(getRef(bId+capsLocationSearchType+'City'));this.hideElement(getRef(bId+capsLocationSearchType+'AddressGroup'));}else if(locationPickUpOrDropOff=='Address'){this.hideElement(getRef(bId+capsLocationSearchType));this.hideElement(getRef(bId+capsLocationSearchType+'City'));this.showElement(getRef(bId+capsLocationSearchType+'AddressGroup'));}else if(locationPickUpOrDropOff=='Same as pick-up'){this.hideElement(getRef(bId+capsLocationSearchType));this.hideElement(getRef(bId+capsLocationSearchType+'City'));this.hideElement(getRef(bId+capsLocationSearchType+'AddressGroup'));}}
this.alignLMOWTextBoxesOnError=function(bId){var pickupDropDownSelection=getRef(bId+'OriginLocation');var dropoffDropDownSelection=getRef(bId+'DestinationLocation');if(pickupDropDownSelection!=null&&dropoffDropDownSelection!=null){var pickupDropDownValue=pickupDropDownSelection.value;var dropoffDropDownValue=dropoffDropDownSelection.value;var pickupComponentRef=getRef(bId+pickupDropDownValue+"Origin");var dropoffComponentRef=getRef(bId+dropoffDropDownValue+"Destination");if((pickupDropDownValue=='Airport'||pickupDropDownValue=='City')&&(dropoffDropDownValue=='Airport'||dropoffDropDownValue=='City')){if(botMgr.hasClass(pickupComponentRef,'hasError')&&!botMgr.hasClass(dropoffComponentRef,'hasError')){var dropoffcomponentlabel=dropoffComponentRef.getElementsByTagName('label');for(var t=0;t<dropoffcomponentlabel.length;t++){if(!botMgr.hasClass(dropoffcomponentlabel[t],'neighbourHasError')){botMgr.appendClass(dropoffcomponentlabel[t],'neighbourHasError');}}}else if(!botMgr.hasClass(pickupComponentRef,'hasError')&&!botMgr.hasClass(dropoffComponentRef,'hasError')){var dropoffcomponentlabel=dropoffComponentRef.getElementsByTagName('label');for(var t=0;t<dropoffcomponentlabel.length;t++){if(botMgr.hasClass(dropoffcomponentlabel[t],'neighbourHasError')){botMgr.removeClass(dropoffcomponentlabel[t],'neighbourHasError');}}}
if(botMgr.hasClass(dropoffComponentRef,'hasError')&&!botMgr.hasClass(pickupComponentRef,'hasError')){var pickupcomponentlabel=pickupComponentRef.getElementsByTagName('label');for(var t=0;t<pickupcomponentlabel.length;t++){if(!botMgr.hasClass(pickupcomponentlabel[t],'neighbourHasError')){botMgr.appendClass(pickupcomponentlabel[t],'neighbourHasError');}}}else if(!botMgr.hasClass(dropoffComponentRef,'hasError')&&!botMgr.hasClass(pickupComponentRef,'hasError')){var pickupcomponentlabel=pickupComponentRef.getElementsByTagName('label');for(var t=0;t<pickupcomponentlabel.length;t++){if(botMgr.hasClass(pickupcomponentlabel[t],'neighbourHasError')){botMgr.removeClass(pickupcomponentlabel[t],'neighbourHasError');}}}}else if((pickupDropDownValue=='Airport'||pickupDropDownValue=='City')&&(dropoffDropDownValue=='Address'||dropoffDropDownValue=='Same as pick-up')){var pickupcomponentlabel=pickupComponentRef.getElementsByTagName('label');for(var t=0;t<pickupcomponentlabel.length;t++){if(botMgr.hasClass(pickupcomponentlabel[t],'neighbourHasError')){botMgr.removeClass(pickupcomponentlabel[t],'neighbourHasError');}}}else if(pickupDropDownValue=='Address'&&(dropoffDropDownValue=='Airport'||dropoffDropDownValue=='City')){var dropoffcomponentlabel=dropoffComponentRef.getElementsByTagName('label');for(var t=0;t<dropoffcomponentlabel.length;t++){if(botMgr.hasClass(dropoffcomponentlabel[t],'neighbourHasError')){botMgr.removeClass(dropoffcomponentlabel[t],'neighbourHasError');}}}}}
this.clearUnwantedParamValues=function(bId){var pickupDropDownSelection=getRef(bId+'OriginLocation');var dropoffDropDownSelection=getRef(bId+'DestinationLocation');if(pickupDropDownSelection!=null&&dropoffDropDownSelection!=null){var pickupDropDownValue=pickupDropDownSelection.value;var dropoffDropDownValue=dropoffDropDownSelection.value;var origin='';var destination='';if(pickupDropDownValue!='Address'){if(pickupDropDownValue=='Airport'&&dropoffDropDownValue=='Same as pick-up'){origin=getRef(bId+'Target').value;}else{if(pickupDropDownValue=='Airport'){origin=getRef(bId+'Origin').value;}else{origin=getRef(bId+'Origin'+pickupDropDownValue).value;}}}
if(dropoffDropDownValue!='Address'&&dropoffDropDownValue!='Same as pick-up'){if(dropoffDropDownValue=='Airport'){destination=getRef(bId+'Destination').value;}else{destination=getRef(bId+'Destination'+dropoffDropDownValue).value;}}
getRef(bId+'Target').value="";getRef(bId+'Origin').value="";getRef(bId+'OriginCity').value="";getRef(bId+'Destination').value="";getRef(bId+'DestinationCity').value="";if(pickupDropDownValue!='Address'){if(pickupDropDownValue=='Airport'&&dropoffDropDownValue=='Same as pick-up'){getRef(bId+'Target').value=origin;}else{if(pickupDropDownValue=='Airport'){getRef(bId+'Origin').value=origin;}else{getRef(bId+'Origin'+pickupDropDownValue).value=origin;}}}
if(dropoffDropDownValue!='Address'&&dropoffDropDownValue!='Same as pick-up'){if(dropoffDropDownValue=='Airport'){getRef(bId+'Destination').value=destination;}else{getRef(bId+'Destination'+dropoffDropDownValue).value=destination;}}}}
this.swapLocations=function(event){dlog.alert("swapLocations()");var event=(event)?event:((window.event)?window.event:"");if(event){var element=(event.target)?event.target:event.srcElement;if(element.tagName!='LABEL')
element=element.parentNode;var divelem=element;while(divelem.tagName!='DIV'){divelem=divelem.parentNode;}
if(divelem.id=='carLocationTypeBoxOrigin'||divelem.id=='rentcarLocationTypeBoxOrigin'){var pbId=divelem.id.slice(0,(divelem.id.length-"LocationTypeBoxOrigin".length));}else if(divelem.id=='carLocationTypeBoxDestination'||divelem.id=='rentcarLocationTypeBoxDestination'){var pbId=divelem.id.slice(0,(divelem.id.length-"LocationTypeBoxDestination".length));}else{var pbId=divelem.id.slice(0,(divelem.id.length-"LocationTypeBox".length));}
botMgr.setActiveBotId(pbId);var bId=botMgr.getActiveBotId();var divTag=getRef(pbId).getElementsByTagName('div');var pTag=getRef(pbId).getElementsByTagName('p');var fieldsetTag=getRef(pbId).getElementsByTagName('fieldset');var textfieldTag=getRef(pbId).getElementsByTagName('input');var formRef=getRef(bId+botMgr.FORM_NAME);if(formRef.carLocalMarketOneWayOn!=''&&formRef.carLocalMarketOneWayOn.value=='false'){var labels=getRef(pbId+'LocationTypeBox').getElementsByTagName('label');for(var i=0;i<labels.length;i++){if(labels[i]==element){if(getRef('isBot')){botMgr.persistCarHotelError(fieldsetTag,pTag,divTag,textfieldTag,pbId);}
botMgr.swapClasses(labels[i],'inactiveRadio','activeRadio');}else
botMgr.swapClasses(labels[i],'activeRadio','inactiveRadio');}}
var formRef=getRef(bId+botMgr.FORM_NAME);if(formRef){if(formRef.disambiguatedOrigin!=null&&(formRef.carLocalMarketOneWayOn==null||formRef.carLocalMarketOneWayOn.value=='false')){var inputElement=element.childNodes[0];if(inputElement.value=='std'||inputElement.value=='air'){for(var i=0;i<formRef.disambiguatedOrigin.length;i++)
formRef.disambiguatedOrigin[i].value=true;}
else{for(var i=0;i<formRef.disambiguatedOrigin.length;i++)
formRef.disambiguatedOrigin[i].value=false;}}}
if(formRef.carLocalMarketOneWayOn!=''&&formRef.carLocalMarketOneWayOn.value=='true'){var originElemRef=null;var destinationElemRef=null;var originElemRef=getRef(bId+'LocationTypeBoxOrigin');var destinationElemRef=getRef(bId+'LocationTypeBoxDestination');if(originElemRef!=null&&destinationElemRef!=null){var originSelect=originElemRef.getElementsByTagName('select');var destinationSelect=destinationElemRef.getElementsByTagName('select');this.showHideLMOWLocations(pbId,originSelect[0],destinationSelect[0]);}}
else{botMgr.showHideLocations(pbId);}}}
this.persistCarHotelError=function(fieldsetTag,pTag,divTag,textfieldTag,pbId){for(var j=0;j<pTag.length;j++){if(this.hasClass(pTag[j],'error')){for(var l=0;l<textfieldTag.length;l++)
if(this.hasClass(textfieldTag[l],'locationInput')&&pbId=='htl')
textfieldTag[l].value="";this.hideElement(pTag[j]);}
this.removeClass(divTag[j],'hasError');}
for(var j=0;j<divTag.length;j++){if(this.hasClass(divTag[j],'hasError')&&pbId=='car'){for(var k=0;k<textfieldTag.length;k++){if(this.hasClass(textfieldTag[k],'locationInput')){getRef(pbId+'Origin').value='Where from?';getRef(pbId+'Target').value='Where from?';getRef(pbId+'Destination').value='Same as pick-up';}}
this.removeClass(divTag[j],'hasError');}
if(this.hasClass(fieldsetTag[j],'hasError')){if(this.hasClass(fieldsetTag[j],'startDates')){for(var l=0;l<textfieldTag.length;l++)
if(this.hasClass(textfieldTag[l],'startDate'))
textfieldTag[l].value="mm/dd/yy";this.removeClass(fieldsetTag[j],'hasError');}
if(this.hasClass(fieldsetTag[j],'endDates')){for(var l=0;l<textfieldTag.length;l++)
if(this.hasClass(textfieldTag[l],'endDate'))
textfieldTag[l].value="mm/dd/yy";this.removeClass(fieldsetTag[j],'hasError');}}
if(this.hasClass(divTag[j],'errorTop')){this.hideElement(divTag[j]);for(var l=0;l<textfieldTag.length;l++){if(this.hasClass(textfieldTag[l],'hotelSmartfillBox'))
textfieldTag[l].value="";if(this.hasClass(textfieldTag[l],'locationInput')&&pbId=='htl')
textfieldTag[l].value="";}
this.removeClass(divTag[j],'hasError');}}}
this.showAddress=function(pbId,bId){log.info("showAddress("+pbId+", "+bId+")");var pLoc=getRef(pbId+'LocationTypeBox').getElementsByTagName('p');var divTag=getRef(bId).getElementsByTagName('div');var pTag=getRef(bId).getElementsByTagName('p');var fieldsetTag=getRef(bId).getElementsByTagName('fieldset');var textfieldTag=getRef(bId).getElementsByTagName('input');for(var j=0;j<divTag.length;j++){if(botMgr.hasClass(pLoc[j],'active'))
if(getRef('isBot'))botMgr.persistCarHotelError(fieldsetTag,pTag,divTag,textfieldTag,bId);}
botMgr.hideElement(getRef(pbId+'SearchByAddress'));botMgr.hideElement(getRef(pbId+'TargetGroup'));botMgr.hideElement(getRef(pbId+'EndPointsGroup'));botMgr.showElement(getRef(pbId+'SearchByCity'));var savedAddres_ref=getRef(pbId+"companyAddress");if(savedAddres_ref&&savedAddres_ref.innerHTML!=""){log.info("hiding address group to show saved fields.")
botMgr.hideElement(getRef(pbId+'AddressGroup'));getRef(pbId+'companyLocationsField').style.display="block";}
else{log.info("showing address group.")
botMgr.showElement(getRef(pbId+'AddressGroup'));}
var sByMyLocRef=getRef(pbId+'SearchByMyLocations');if(sByMyLocRef){botMgr.showElement(getRef(pbId+'SearchByMyLocations'));}
var elemRef=getRef(pbId+'LocationType');if((elemRef&&elemRef.value!='loc')||!(savedAddres_ref)){elemRef.value='adr';}
if(savedAddres_ref&&savedAddres_ref.innerHTML!=""){elemRef.value='loc';}
elemRef=getRef(pbId+'Target');if(elemRef)elemRef.disabled=true;return false;}
this.showTarget=function(pbId,bId){log.info("showTarget("+pbId+", "+bId+")");if(getRef(bId)){var pLoc=getRef(pbId+'LocationTypeBox').getElementsByTagName('p');var divTag=getRef(bId).getElementsByTagName('div');var pTag=getRef(bId).getElementsByTagName('p');var fieldsetTag=getRef(bId).getElementsByTagName('fieldset');var textfieldTag=getRef(bId).getElementsByTagName('input');for(var j=0;j<divTag.length;j++){if(botMgr.hasClass(pLoc[j],'active'))
if(getRef('isBot'))botMgr.persistCarHotelError(fieldsetTag,pTag,divTag,textfieldTag,bId);}}
else{log.error("element does not exist: "+bid);}
botMgr.hideElement(getRef(pbId+'SearchByCity'));botMgr.hideElement(getRef(pbId+'AddressGroup'));botMgr.showElement(getRef(pbId+'SearchByAddress'));botMgr.showElement(getRef(pbId+'TargetGroup'));botMgr.showElement(getRef(pbId+'EndPointsGroup'));var sByMyLocRef=getRef(pbId+'SearchByMyLocations');if(sByMyLocRef){botMgr.showElement(getRef(pbId+'SearchByMyLocations'));getRef(pbId+'companyLocationsField').style.display="none";}
var elemRef=getRef(pbId+'LocationType');if(elemRef){compLocElem=getRef('companyLocation');if(compLocElem!=null&&compLocElem.value!=''){elemRef.value='loc';}else{elemRef.value='std';}}
elemRef=getRef(pbId+'Target');if(elemRef)elemRef.disabled=false;return false;}
this.showMyLocations=function(pbId,bId){log.info("showMyLocations("+pbId+", "+bId+")");var searchBy_linkref=getRef(pbId+'SearchByMyLocations');if(searchBy_linkref){botMgr.hideElement(searchBy_linkref);}
botMgr.showElement(getRef(pbId+'SearchByCity'));botMgr.showElement(getRef(pbId+'SearchByAddress'));botMgr.hideElement(getRef(pbId+'SearchByMyLocations'));}
this.selectSpecificHotelOrNot=function(){var activeRadioId='SpecificHotelOnly';var inactiveRadioId='AllHotels'
var hotelNameDisabled=false;elemRef=getRef(botMgr.bId+'AllHotels');if(elemRef&&elemRef.checked){activeRadioId='AllHotels';inactiveRadioId='SpecificHotelOnly';hotelNameDisabled=true;}
var bots=botMgr.getBotRefs();for(var i=0;i<bots.length;i++){elemRef=getRef(bots[i].id+activeRadioId);if(elemRef){elemRef.checked=true;botMgr.swapClasses(elemRef.parentNode,'inactiveRadio','activeRadio');}
elemRef=getRef(bots[i].id+inactiveRadioId);if(elemRef){elemRef.checked=false;botMgr.swapClasses(elemRef.parentNode,'activeRadio','inactiveRadio');}
elemRef=getRef(bots[i].id+'SpecificHotelName');if(elemRef)elemRef.disabled=hotelNameDisabled;}}
this.showBookByAddress=function(bId){dlog.alert("showBookByAddress("+bId+")");botMgr.hideElement(getRef(bId+'BookByHourly'));botMgr.hideElement(getRef(bId+'EndDates'));botMgr.showElement(getRef(bId+'BookByAddress'));var elemRef=getRef(bId+'bookType');if(elemRef)elemRef.value='adr';elemRef=getRef(bId+'Target');if(elemRef)elemRef.disabled=false;return false;}
this.showBookByHourly=function(bId){dlog.alert("showBookByHourly("+bId+")");botMgr.hideElement(getRef(bId+'BookByAddress'));botMgr.showElement(getRef(bId+'BookByHourly'));botMgr.showElement(getRef(bId+'EndDates'));var elemRef=getRef(bId+'bookType');if(elemRef)elemRef.value='hourly';elemRef=getRef(bId+'Target');if(elemRef)elemRef.disabled=true;return false;}
this.showSearchOptions=function(bId){dlog.alert("showSearchOptions()");botMgr.hideElement(getRef(bId+"OptionsExpand"));botMgr.showElement(getRef(bId+"SearchOptions"));botMgr.removeClass(getRef(bId+"ExpandSearchOptions"),'floatedExpand');var e=getRef(bId+'ExpandSearchOptionsInput');if(e){e.value='true';}
return false;}
this.changeChildrenAge=function(bId,skipRules){dlog.alert("changeChildrenAge('"+bId+"')");var adultTravelersRef=getRef(bId+"adults");var childrenTravelersRef=getRef(bId+"children");var childrenAgeRef=getRef(bId+"ChildrenAge");if(adultTravelersRef&&childrenTravelersRef&&childrenAgeRef){var numAdultsTotal=parseInt(adultTravelersRef.value);var numChildrenTotal=parseInt(childrenTravelersRef.value);var numYouths=0;var numInfantsWithoutSeat=0;var numInfantsWithSeat=0;if(numChildrenTotal<=0){botMgr.hideElement(childrenAgeRef);}else{botMgr.showElement(childrenAgeRef);for(var i=1;i<=botMgr.CHILDRENAGE_MAX_AMOUNT;i++){var childAgeGroupRef=getRef(bId+"ChildAge"+i+"Group");if(i<=numChildrenTotal){var childAgeRef=getRef(bId+"ChildAge"+i);var infantTypesRef=getRef(bId+"InfantTypes"+i);if(childAgeRef.value==botMgr.CHILDRENAGE_INFANT_VALUE){botMgr.showElement(infantTypesRef);elemRef=getRef(bId+"InfantWithoutSeat"+i)
if(elemRef&&elemRef.checked)numInfantsWithoutSeat++;else numInfantsWithSeat++;}else{botMgr.hideElement(infantTypesRef);var childAge=parseInt(childAgeRef.value);if(childAge>=botMgr.CHILDRENAGE_YOUTH_MIN_VALUE)numYouths++;}
botMgr.showElement(childAgeGroupRef);}else{botMgr.hideElement(childAgeGroupRef);}}}
if(!skipRules&&getRef('isBot')){var bots=botMgr.getBotRefs();for(var i=0;i<bots.length;i++){elemRef=getRef(bots[i].id+"youths");if(elemRef){botMgr.selectValue(elemRef,numYouths);elemRef=getRef(bots[i].id+"infantsWithoutSeat");if(elemRef)botMgr.selectValue(elemRef,numInfantsWithoutSeat);elemRef=getRef(bots[i].id+"infantsWithSeat");if(elemRef)botMgr.selectValue(elemRef,numInfantsWithSeat);elemRef=getRef(bots[i].id+"children");if(elemRef)botMgr.selectValue(elemRef,numChildrenTotal-(numYouths+numInfantsWithoutSeat+numInfantsWithSeat));}else{elemRef=getRef(bots[i].id+"children");if(elemRef)botMgr.selectValue(elemRef,numChildrenTotal);elemRef=getRef(bots[i].id+"Guests");dlog.alert("changeChildrenAge(): total="+(numChildrenTotal+numAdultsTotal));if(elemRef)botMgr.selectValue(elemRef,(numChildrenTotal+numAdultsTotal));for(var j=1;j<=botMgr.CHILDRENAGE_MAX_AMOUNT;j++){if(j<=numChildrenTotal){childAgeRef=getRef(bId+"ChildAge"+j);elemRef=getRef(bots[i].id+"ChildAge"+j);numChildAge=botMgr.getFieldValue(bId,"ChildAge"+j);if(elemRef)botMgr.setFieldValue(bots[i].id,"ChildAge"+j,numChildAge);infantTypesRef=getRef(bId+"InfantWithSeat"+j);elemRef=getRef(bots[i].id+"InfantWithSeat"+j);if(elemRef)botMgr.setFieldValue(bots[i].id,"InfantWithSeat"+j,botMgr.getFieldValue(bId,"InfantWithSeat"+j));infantTypesRef=getRef(bId+"InfantWithoutSeat"+j);elemRef=getRef(bots[i].id+"InfantWithoutSeat"+j);if(elemRef)botMgr.setFieldValue(bots[i].id,"InfantWithoutSeat"+j,botMgr.getFieldValue(bId,"InfantWithoutSeat"+j));}}
botMgr.changeChildrenAge(bots[i].id,true);}}}}}
this.changeTraveler=function(bId,travelerType,elemId){dlog.alert("changeTraveler('"+bId+"','"+travelerType+"','"+elemId+"')");if(!elemId||!travelerType||""==travelerType)return;var elemRef=getRef(elemId);if(!elemRef)return;var numValue=elemRef.value;var bots=botMgr.getBotRefs();var travCount=0;for(var i=0;i<bots.length;i++){elemRef=getRef(bots[i].id+travelerType);if(elemRef)botMgr.selectValue(elemRef,numValue);}
elemRef=getRef(bId+"adults");if(elemRef)travCount+=parseInt(elemRef.value);elemRef=getRef(bId+"seniors");if(elemRef)travCount+=parseInt(elemRef.value);dlog.alert("changeTraveler(): adult travCount="+travCount);for(var i=0;i<bots.length;i++){elemRef=getRef(bots[i].id+"seniors");if(!elemRef){elemRef=getRef(bots[i].id+"adults");if(elemRef)botMgr.selectValue(elemRef,''+travCount);}}
travCount=0;elemRef=getRef(bId+"children");if(elemRef)travCount+=parseInt(elemRef.value);elemRef=getRef(bId+"youths");if(elemRef)travCount+=parseInt(elemRef.value);elemRef=getRef(bId+"infantsWithSeat");if(elemRef)travCount+=parseInt(elemRef.value);elemRef=getRef(bId+"infantsWithoutSeat");if(elemRef)travCount+=parseInt(elemRef.value);dlog.alert("changeTraveler(): child travCount="+travCount);for(var i=0;i<bots.length;i++){elemRef=getRef(bots[i].id+"youths");if(!elemRef){elemRef=getRef(bots[i].id+"children");if(elemRef){botMgr.selectValue(elemRef,''+travCount);botMgr.changeChildrenAge(bots[i].id,true);}}}
travCount=this.countTravelers(bId);for(var i=0;i<bots.length;i++){elemRef=getRef(bots[i].id+"Guests");if(elemRef){botMgr.selectValue(elemRef,''+travCount);}}
this.hideShowFlightPlusHotelButton(travCount);}
this.displayInfantTicketNote=function(bId,visible){(visible)?botMgr.showElement(getRef(bId+'InfantTicketNote')):botMgr.hideElement(getRef(bId+'InfantTicketNote'));}
this.hideShowFlightPlusHotelButton=function(numTravelers){var aphButton=getRef('airAPHButton');if(aphButton!=null){if(numTravelers>4){botMgr.swapClasses(aphButton,'visible','invisible');}else{botMgr.swapClasses(aphButton,'invisible','visible');}
if(getRef("DPSavingsMessage")&&getRef("airDualButtonBottom")){this.checkDPMatch();}}}
this.countTravelers=function(bId){var travCount=0;for(var k=0;k<botMgr.travelerTypes.length;k++){elemRef=getRef(bId+botMgr.travelerTypes[k]);if(elemRef)travCount+=parseInt(elemRef.value);}
return travCount;}
this.countInfants=function(bId){var infantsCount=0;var infantsWithSeat=getRef(bId+"infantsWithSeat");var infantsWithoutSeat=getRef(bId+"infantsWithoutSeat");if(infantsWithSeat!=null){infantsCount+=parseInt(infantsWithSeat.value);}
if(infantsWithoutSeat!=null){infantsCount+=parseInt(infantsWithoutSeat.value);}
return infantsCount;}
this.hideShowPreferredCarriers=function(bId){var elemRef=getRef(bId+'Preferenced');if(elemRef){if(elemRef.checked){botMgr.showElement(getRef(bId+'PreferredCarriers'));}else{botMgr.hideElement(getRef(bId+'PreferredCarriers'));}}}
this.expandTravelers=function(){dlog.alert("expandTravelers()");var elemRef=getRef(botMgr.getActiveBotId()+'ExpandTravelers');if(elemRef)elemRef.value='true';if(botMgr.getActiveBotId()=='air'){var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(curRef)curRef.value='air';if(preRef)preRef.value='air';}
clickSubmit('expand');return false;}
this.gotoFlexSearch=function(){dlog.alert("gotoFlexSearch()");if(botMgr.getActiveBotId()=='air'){var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(curRef)curRef.value='air';if(preRef)preRef.value='air';var FlexWeekendsSearchParam=document.getElementById(botMgr.getActiveBotId()+'isFlex');FlexWeekendsSearchParam.value='true';}
clickSubmit('fareCalendarSearch');return false;}
this.gotoOneWaySearch=function(){dlog.alert("gotoOneWaySearch()");var elemRef=getRef(botMgr.bId+'OneWay');if(elemRef){elemRef.value="oneway"
elemRef.checked=true;}
if(botMgr.getActiveBotId()=='air'){var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(curRef)curRef.value='air';if(preRef)preRef.value='air';}
clickSubmit('expand');return false;}
this.showTravelers=function(event){dlog.alert("showTravelers()");var bots=botMgr.getBotRefs();for(var i=0;i<bots.length;i++){var bId=bots[i].id;for(var n=1;n<botMgr.travelerTypes.length;n++){botMgr.appendClass(getRef(bId+'Travelers'),'expanded');botMgr.showElement(getRef(bId+botMgr.travelerTypes[n]+'Travelers'));}
botMgr.hideElement(getRef(bId+'TravelersExpand'));botMgr.showElement(getRef(bId+'PassengerLimitLink'));botMgr.displayInfantTicketNote(bId,true);var elemRef=getRef(bId+'ExpandTravelers');if(elemRef)elemRef.value='true';}}
this.showRepriceAlert=function(){dlog.alert("showAddress()");botMgr.showElement(getRef('errorClickReprice'));return false;}
this.resetOrbotValues=function(startDate,endDate){dlog.alert("resetOrbotValues('"+startDate+"','"+endDate+"')");log.info("resetOrbotValues('"+startDate+"','"+endDate+"')");var tempRepriceDatesA=[startDate,endDate];var repriceDatesChangedB=false;for(var k=0;k<this.affectRepriceElementsInputA.length;k++){var elemRef=getRef(this.affectRepriceElementsInputA[k]);if(elemRef){if(elemRef.value!=tempRepriceDatesA[k]){elemRef.value=tempRepriceDatesA[k];repriceDatesChangedB=true;}}}
if(repriceDatesChangedB){botMgr.showRepriceAlert();}
return false;}
this.popCalendar=function(event){var calendarLink="/App/ViewCalendar?chooseDate=true";var evt=(event)?event:((window.event)?window.event:"");if(evt){var element=(evt.target)?evt.target:evt.srcElement;var calLink=element.parentNode;var index=calLink.id.substr(calLink.id.length-1);if(isNaN(index)){if(calLink.id.indexOf('StartCalendar')!=-1)
index=1;else if(calLink.id.indexOf('EndCalendar')!=-1)
index=2;}
calendarRef=calLink.id;var fieldset=calLink.parentNode;var selects=fieldset.getElementsByTagName('select');for(var i=0;i<selects.length;i++){if(selects[i].className.indexOf('Month')!=-1){var pbId=selects[i].id.slice(0,(selects[i].id.length-selects[i].name.length));botMgr.setActiveBotId(pbId);var monthAndYear=selects[i].options[selects[i].options.selectedIndex].value.split(" ");var month=monthAndYear[0];var year=monthAndYear[1]?monthAndYear[1]:thisYear;var token=calendarLink.indexOf("?")==-1?"?":"&";return popUpGen(calendarLink+token+"n="+index+"&view=calendar&setMonth="+month+"&setYear="+year,200,390,'popupcal','resizable=yes,menubar=no,status=no,scrollbars=no,toolbar=no,directories=no,location=no');}}}}
this.submitHotelEditSearch=function(formId){var frm=document.getElementById(formId);if(frm.locationType.value=='adr')
frm.keywordPIB.disabled=true;}
this.unencodePopWin=function(m){m=m.replace(new RegExp("&lt;","g"),"<");m=m.replace(new RegExp("&gt;","g"),">");m=m.replace(new RegExp("&#034;","g"),"\"");m=m.replace(new RegExp("&#039;","g"),"'");return m;}
this.checkDPMatch=function(){dlog.alert("checkDPMatch()");var elemRef=getRef('airDestination');var h=0;var m='';if(!locationDPSavings||!getRef("DPSavingsMessage")||!getRef("airDualButtonBottom")){return;}
for(var i=0;i<locationDPSavings.length;i++){for(var j=0;j<locationDPSavings[i].aliases.length;j++){if(elemRef.value.toLowerCase()==locationDPSavings[i].aliases[j]){if(dpOrbotPrice==''){getRef("DPSavingsMessage").innerHTML='Save by booking a Flight + Hotel together';}else{if(dpOrbotPrice<locationDPSavings[i].savings){m=botMgr.unencodePopWin(locationDPSavings[i].popWin);getRef("DPSavingsMessage").innerHTML='Save '+m+' by booking a Flight + Hotel together for '+locationDPSavings[i].city;}else{m=botMgr.unencodePopWin(locationDPSavings[i].popWinNoDest);getRef("DPSavingsMessage").innerHTML='Save '+m+' by booking a Flight + Hotel together';}}
var numTravAir=botMgr.countTravelers('air');if(numTravAir<=4){botMgr.swapClasses(getRef('airDualButtonBottom'),'hideDPSavings','showDPSavings');h=1;}
break;}}}
if(h==0){botMgr.swapClasses(getRef('airDualButtonBottom'),'showDPSavings','hideDPSavings');}}
this.changeSavedLocations=function(bId){var savedLocRef=getRef(bId+'SavedLocationID');var addrRef=getRef(bId+'AddressOrIntersection');var cityRef=getRef(bId+'City');var stateRef=getRef(bId+'StateProvince');var postalRef=getRef(bId+'PostalCode');var locationTypeRef=getRef(bId+'LocationType');if(savedLocRef&&addrRef&&cityRef&&stateRef&&postalRef){var canGetAttrib=savedLocRef[savedLocRef.selectedIndex].getAttribute;if(canGetAttrib){var addrValue=savedLocRef[savedLocRef.selectedIndex].getAttribute('street1');var cityValue=savedLocRef[savedLocRef.selectedIndex].getAttribute('city');var stateValue=savedLocRef[savedLocRef.selectedIndex].getAttribute('state');var postalValue=savedLocRef[savedLocRef.selectedIndex].getAttribute('postal');}
var undefined;addrRef.value=(addrValue!=null&&addrValue!=undefined)?addrValue:"";cityRef.value=(cityValue!=null&&cityValue!=undefined)?cityValue:"";postalRef.value=(postalValue!=null&&postalValue!=undefined)?postalValue:"";var stateMatch=false;if(stateValue!=null){for(var i=0;i<stateRef.length;i++){if(stateRef[i].value==stateValue){stateRef.selectedIndex=i;stateMatch=true;break;}}}
if(stateValue==null||!stateMatch){stateRef.selectedIndex=0;}
if(locationTypeRef){locationTypeRef.value=(savedLocRef.selectedIndex==0)?'adr':'loc';}}}
this.clearSavedLocation=function(bId){var savedLocRef=getRef(bId+'SavedLocationID');if(savedLocRef){savedLocRef.selectedIndex=0;this.changeSavedLocations(bId);}
else{this.clearStopLocation(bId);}}
this.clearStopLocation=function(bId){var addrRef=getRef(bId+'AddressOrIntersection');var cityRef=getRef(bId+'City');var stateRef=getRef(bId+'StateProvince');var postalRef=getRef(bId+'PostalCode');var stopAddressGroupContainer=parent.getRef(bId+'AddressGroup');var savedLocContainterRef=getRef(bId+'companyLocationsField');var locTypeRef=getRef(bId+'LocationType');var locIdRef=getRef(bId+'companyLocation');var savedLocContentRef=getRef(bId+'companyAddress');if(addrRef&&cityRef&&stateRef&&postalRef&&locTypeRef&&savedLocContainterRef){if(locTypeRef.value=="loc"){locIdRef.value="";savedLocContentRef.innerHTML="";botMgr.showElement(stopAddressGroupContainer);savedLocContainterRef.style.display="none";}
addrRef.value="";cityRef.value="";postalRef.value="";stateRef.selectedIndex=0;locTypeRef.value="adr";}}
this.showAndPositionCalendar=function(event){calendar.dateFieldFocused=true;log.info("showAndPositionCalendar");var evt=(event)?event:((window.event)?window.event:"");if(evt){var element=(evt.target)?evt.target:evt.srcElement;if(!calendar.calendarVisible||element!=calendar.eventElement){botMgr.swapClasses(calendar.containerDivRef,'active','inactive');botMgr.removeClass(calendar.containerDivRef,botMgr.bId);calendar.eventElement=element;var index=element.id.substr(element.id.length-1);index=(isNaN(index))?0:index;var pbId=element.id.slice(0,(element.id.length-element.name.length));if(getRef(pbId)){botMgr.setActiveBotId(pbId);}
calendar.eventElement.style.position='relative';var newXPos=botMgr.getXPosition(getRef(calendar.eventElement.id))+calendar.xoffset;newXPos=(newXPos>0)?newXPos:0;calendar.containerDivRef.style.left=newXPos+'px';var newYPos=botMgr.getYPosition(getRef(calendar.eventElement.id))+calendar.yoffset;newYPos=(newYPos>0)?newYPos:0;calendar.containerDivRef.style.top=newYPos+'px';calendar.eventElement.style.position='';calendar.draw();calendar.documentRef.getElementById('calendarBody').className='';calendar.calendarVisible=true;calendar.calendarFocused=false;calendar.dateFieldFocused=true;botMgr.appendClass(calendar.containerDivRef,pbId);calendar.containerDivRef.style.visibility='visible';botMgr.swapClasses(calendar.containerDivRef,'inactive','active');if(this.id=='flexBonuschgStartDate'||this.id=='flexBonuschgEndDate'){botMgr.checkRadio('flexBonus');}
else if(this.id=='flexStaychgStayStartDate'||this.id=='flexStaychgStayEndDate'){botMgr.checkRadio('flexStays');}}
calendar.eventElement.select();}}
this.checkRadio=function(elementId){var elementCache=document.getElementById(elementId);if(elementCache){elementCache.checked=true;}}
this.hideCalendar=function(){if(calendar.calendarVisible){botMgr.swapClasses(calendar.containerDivRef,'active','inactive');botMgr.removeClass(calendar.containerDivRef,botMgr.bId);calendar.containerDivRef.style.visibility='hidden';calendar.containerDivRef.style.top=calendar.yPos-calendar.yoffset;calendar.containerDivRef.style.left=calendar.xPos-calendar.xoffset;calendar.documentRef.getElementById('calendarBody').className='hidden';calendar.calendarFocused=false;calendar.calendarVisible=false;}}
this.dateFieldBlur=function(){calendar.dateFieldFocused=false;window.setTimeout('botMgr.checkCalFocus()',200);}
this.setCalFocus=function(){calendar.calendarFocused=true;}
this.clearCalFocus=function(){calendar.calendarFocused=false;window.setTimeout('botMgr.checkCalFocus()',100);}
this.checkCalFocus=function(){if(!calendar.calendarFocused&&!calendar.dateFieldFocused)
botMgr.hideCalendar();}
this.getXPosition=function(obj){var curleft=0;if(obj.offsetLeft){curleft+=obj.offsetLeft;}else{if(obj.x){curleft+=obj.x;}}
return curleft;}
this.getYPosition=function(obj){var curtop=0;if(obj.offsetTop){curtop+=obj.offsetTop;}else{if(obj.y){curtop+=obj.y;}}
return curtop;}
this.behaviorLocationType=function(bId){log.info("inBehaviorLocType("+bId+")")
var jarr=new Array();jarr=getInnerArray(botMgr.locTypeIds,bId);for(var i=0;i<jarr.length;i++){var pbId=jarr[i];if(bId=='car'||bId=='rentcar'||bId=='htlchg'){var formRef=getRef(bId+botMgr.FORM_NAME);if(formRef.carLocalMarketOneWayOn!=''&&formRef.carLocalMarketOneWayOn.value=='true'){var originElemRef=null;var destinationElemRef=null;var originElemRef=getRef(pbId+'LocationTypeBoxOrigin');var destinationElemRef=getRef(pbId+'LocationTypeBoxDestination');botMgr.prevDropOffDropDownSelection=getRef(pbId+'Destination'+'Location').value;if(originElemRef!=null&&destinationElemRef!=null){var originSelect=originElemRef.getElementsByTagName('select');var destinationSelect=destinationElemRef.getElementsByTagName('select');this.showHideLMOWLocations(pbId,originSelect[0],destinationSelect[0]);this.alignLMOWTextBoxesOnError(pbId);}}else{var elemRef=getRef(pbId+'LocationTypeBox');if(elemRef){var radios=elemRef.getElementsByTagName('input');if(radios!=null&&radios.length>0){for(var l=0;l<radios.length;l++){radios[l].onclick=this.swapLocations;if(radios[l].checked)
botMgr.swapClasses(radios[l].parentNode,'inactiveRadio','activeRadio');}
this.showHideLocations(pbId);}}}}}}
this.behaviorBotForms=function(botsRef,skipElements){log.info("behaviorBotForms("+botsRef+" , "+skipElements);var agt=navigator.userAgent.toLowerCase();var is_saf=(agt.indexOf("safari")!=-1);if(!botsRef)return;var formList=botsRef.getElementsByTagName('form');for(var j=0;j<formList.length;j++)
{if(formList[j].name==this.FORM_NAME){dlog.alert('behaviorBotForm(): form='+formList[j].name);formList[j].searchMethodHidden.value='find';if(!skipElements){for(var k=0;k<formList[j].elements.length;k++){var elemRef=formList[j].elements[k];elemRef.disabled=false;if(elemRef.type!='hidden'&&elemRef.tagName!='FIELDSET')
elemRef.tabIndex=this.tabCount++;switch(elemRef.type)
{case"radio":break;case"checkbox":break;case"select-one":if(this.hasClass(elemRef,'carLocation')||this.hasClass(elemRef,'rentcarLocation')){elemRef.onchange=this.dropdownChanged;dlog.alert("behaviorBotForms(): select-one: "+elemRef.id);}
break;case"text":if(this.hasClass(elemRef,'highlight')){elemRef.onclick=new Function("botMgr.highlightElement('"+elemRef.id+"');"+elemRef.onclick);}
case"submit":if(this.hasClass(elemRef,'aph')){elemRef.onclick=new Function("botMgr.setSearchType('airhotel');"+elemRef.onclick);}
if(this.hasClass(elemRef,'air')){var tbId=botMgr.bId;botMgr.bId='air';botMgr.setSearchType('air');botMgr.bId=tbId;elemRef.onclick=new Function("botMgr.setSearchType('air');"+elemRef.onclick);}
break;}}}}
if(formList[j].id=='htledtBotForm'){formList[j].onsubmit=new Function("botMgr.submitHotelEditSearch('"+formList[j].id+"');");}}
if(is_saf&&!skipElements){var airAPHButtonRef=document.getElementById('airAPHButton');if(airAPHButtonRef!=null){var buttonRef=airAPHButtonRef.getElementsByTagName('button');for(i=0;i<buttonRef.length;i++){var elemRef=buttonRef[i];if(elemRef.type=='submit'){if(this.hasClass(elemRef,'aph')){elemRef.onclick=new Function("botMgr.setSearchType('airhotel');"+elemRef.onclick);}}}}}}
this.behaviorFlightType=function(bId){var flightType=getRef(bId+'FlightType');if(flightType!=null){var radios=flightType.getElementsByTagName('input');if(radios!=null&&radios.length>0){for(i=0;i<radios.length;i++)
radios[i].onclick=this.swapAir;}}}
this.behaviorFlightOptions=function(bId){var elemRef=getRef(bId+'Preferenced');if(elemRef){elemRef.onclick=new Function("botMgr.hideShowPreferredCarriers('"+bId+"');");this.hideShowPreferredCarriers(bId);}}
this.behaviorLinkSubmit=function(bId){dlog.alert("behaviorLinkSubmit("+bId+")");var linkRef=getRef(bId+'TravelersRedirect');if(linkRef){linkRef.onclick=this.expandTravelers;}
linkRef=getRef(bId+'OneWayLink');if(linkRef){linkRef.onclick=this.gotoOneWaySearch;}
linkRef=getRef(bId+'FlexDatesLink');if(linkRef){linkRef.onclick=this.gotoFlexSearch;}
linkRef=getRef(bId+'FlexWeekendsLink');if(linkRef){linkRef.onclick=this.gotoFlexSearch;}}
this.behaviorProductNav=function(){var elemRef=getRef('productNav');if(elemRef){var elemList=elemRef.getElementsByTagName('input');for(var j=0;j<elemList.length;j++)
{dlog.alert('behaviorProductNav(): input('+elemList[j].id+') href='+elemList[j].getAttribute('href')+' bId='+elemList[j].getAttribute('botid'));elemList[j].onclick=this.gotoBot;if(elemList[j].checked){this.navProductSelected=elemList[j].getAttribute('botid');}}
var elemRef=getRef(this.navProductSelected+'FlightType');if(elemRef){var elemList=elemRef.getElementsByTagName('input');for(var j=0;j<elemList.length;j++)
{if(elemList[j].checked){this.gotoFlightType(elemList[j]);break;}}}else{if(this.bId!=this.navProductSelected)
this.setProduct(this.navProductSelected);}}}
this.behaviorExpandOptions=function(bId){dlog.alert("behaviorExpandOptions()");var linkRef=getRef(bId+'OptionsLink');dlog.alert("behaviorExpandOptions(): linkRef="+linkRef);if(linkRef){var redirectLinkRef=getRef(bId+'OptionsRedirect');if(redirectLinkRef){linkRef.onclick=this.goToExpandSearch;}else{linkRef.onclick=new Function("return botMgr.showSearchOptions('"+bId+"');");}
var searchOptions=getRef(bId+'SearchOptions');if(searchOptions!=null)
this.hideElement(searchOptions);}}
this.goToExpandSearch=function(){var e=getRef(botMgr.getActiveBotId+'ExpandSearchOptionsInput');if(e)e.value='true';if(botMgr.getActiveBotId()=='air'){var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(curRef)curRef.value='air';if(preRef)preRef.value='air';}
if(botMgr.getActiveBotId()=='htl'){var elemRef=getRef(botMgr.getActiveBotId()+'orbotHotelSearchTypeKey');var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(elemRef)elemRef.value='H';if(curRef)curRef.value='htl';if(preRef)preRef.value='htl';}
if(botMgr.getActiveBotId()=='car'){var curRef=getRef(botMgr.getActiveBotId()+'currentBot');var preRef=getRef(botMgr.getActiveBotId()+'previousBot');if(curRef)curRef.value='car';if(preRef)preRef.value='car';}
clickSubmit('expand');return false;}
this.behaviorAddAnotherFlight=function(){isHomeAMC=document.getElementById('amc');for(m=2;m<=5;m++){var addLink=getRef("addAnotherFlight"+m);if(addLink!=null){addLink.onclick=this.showNextSlice;}}
for(n=4;n<=6;n++){var slice=getRef("slice"+n);if(slice!=null&&isHomeAMC!=null){botMgr.appendClass(slice,'inactive');}}}
this.behaviorCalendar=function(bId){var jarr=new Array();jarr=getInnerArray(botMgr.componentDateIds,bId);for(var i=0;i<jarr.length;i++){var pbId=jarr[i];var calStartLink=getRef(pbId+'StartCalendar');var calEndLink=getRef(pbId+'EndCalendar');if((calStartLink==null)&&(calEndLink==null)){for(var k=1;k<=6;k++){var calStartLink=getRef(pbId+'StartCalendar'+k);if(calStartLink!=null)
calStartLink.onclick=this.popCalendar;}}else{if(calStartLink!=null){calStartLink.onclick=this.popCalendar;}
if(calEndLink!=null){calEndLink.onclick=this.popCalendar;}}}}
this.behaviorDisplayTravelers=function(bId){elemRef=getRef(bId+'TravelersExpand');if(elemRef){elemRef.onclick=this.showTravelers;}}
this.behaviorSearchBy=function(bId){log.info("behaviorSearchBy('"+bId+"')");var jarr=new Array();jarr=getInnerArray(botMgr.locTypeIds,bId);for(var i=0;i<jarr.length;i++){var pbId=jarr[i];var sByARef=getRef(pbId+'SearchByAddressLink');var sByCRef=getRef(pbId+'SearchByCityLink');if(sByARef&&sByCRef){sByARef.onclick=new Function("return botMgr.showAddress('"+pbId+"', '"+bId+"');");sByCRef.onclick=new Function("return botMgr.showTarget('"+pbId+"', '"+bId+"');");if(this.hasClass(sByARef,'isDefault')){this.showAddress(pbId,bId);}else{this.showTarget(pbId,bId);}}}}
this.behaviorSpecificHotel=function(bId){dlog.alert("behaviorSpecificHotel('"+bId+"')");var elemRef=getRef(bId+'SpecificHotelOnly');if(elemRef){elemRef.onclick=this.selectSpecificHotelOrNot;}
elemRef=getRef(bId+'AllHotels');if(elemRef){elemRef.onclick=this.selectSpecificHotelOrNot;}
this.selectSpecificHotelOrNot();}
this.behaviorBookBy=function(bId){dlog.alert("behaviorBookBy('"+bId+"')");var jarr=new Array();jarr=getInnerArray(botMgr.bookTypeIds,bId);for(var i=0;i<jarr.length;i++){var pbId=jarr[i];var sByARef=getRef(pbId+'BookByAddressLink');var sByHRef=getRef(pbId+'BookByHourlyLink');if(sByARef&&sByHRef){sByARef.onclick=new Function("return botMgr.showBookByHourly('"+pbId+"');");sByHRef.onclick=new Function("return botMgr.showBookByAddress('"+pbId+"');");if(this.hasClass(sByARef,'isDefault')){this.showBookByAddress(pbId);}else{this.showBookByHourly(pbId);}}}}
this.behaviorDates=function(bId){var jarr=new Array();jarr=getInnerArray(botMgr.componentDateIds,bId);for(var i=0;i<jarr.length;i++){var pbId=jarr[i];var dates=getRef(pbId+"Dates");if(dates!=null){selects=dates.getElementsByTagName('select');for(m=0;m<selects.length;m++)
if(botMgr.hasClass(selects[m],'startMonth')||botMgr.hasClass(selects[m],'startDay'))
selects[m].onchange=changeDateWithEvent;}else{dates=getRef(pbId+"Dates1");if(dates!=null){for(var k=1;k<=6;k++){var datesRef=getRef(pbId+'Dates'+k);if(datesRef){selects=datesRef.getElementsByTagName('select');for(n=0;n<selects.length;n++)
if(botMgr.hasClass(selects[n],'startMonth')||botMgr.hasClass(selects[n],'startDay'))
selects[n].onblur=changeDateWithEvent;}}}}}}
this.behaviorDatesWithCalendar=function(bId){var jarr=new Array();jarr=getInnerArray(botMgr.componentDateIds,bId);for(var i=0;i<jarr.length;i++){var pbId=jarr[i];var dates=getRef(pbId+"Dates");if(dates!=null){inputs=dates.getElementsByTagName('input');for(var m=0;m<inputs.length;m++){if(document.getElementById('floating')==null){inputs[m].onfocus=this.showAndPositionCalendar;}
inputs[m].onclick=this.showAndPositionCalendar;inputs[m].onblur=this.dateFieldBlur;}}else{dates=getRef(pbId+"Dates1");if(dates!=null){for(var i=1;i<=6;i++){var datesRef=getRef(pbId+'Dates'+i);if(datesRef!=null){inputs=datesRef.getElementsByTagName('input');for(var n=0;n<inputs.length;n++){if(botMgr.hasClass(inputs[n],'startDate')){inputs[n].onfocus=this.showAndPositionCalendar;inputs[n].onclick=this.showAndPositionCalendar;inputs[n].onblur=this.dateFieldBlur;}}}}}}}}
this.behaviorTravelers=function(bId){for(var k=0;k<this.travelerTypes.length;k++){var elemId=bId+this.travelerTypes[k];var travelerSelectRef=getRef(elemId);if(travelerSelectRef){if(getRef('isBot'))
travelerSelectRef.onchange=new Function("","botMgr.changeTraveler('"+bId+"','"+this.travelerTypes[k]+"','"+elemId+"');");}}
if(bId=='air')this.hideShowFlightPlusHotelButton(this.countTravelers(bId));}
this.behaviorChildrenAge=function(bId){var elemRef=getRef(bId+"children");if(elemRef){elemRef.onchange=new Function("botMgr.changeChildrenAge('"+bId+"');");}
for(var i=1;i<=this.CHILDRENAGE_MAX_AMOUNT;i++){elemRef=getRef(bId+"ChildAge"+i);if(elemRef){elemRef.onchange=new Function("botMgr.changeChildrenAge('"+bId+"');");}
elemRef=getRef(bId+"InfantWithSeat"+i)
if(elemRef){elemRef.onchange=new Function("botMgr.changeChildrenAge('"+bId+"');");}
elemRef=getRef(bId+"InfantWithoutSeat"+i)
if(elemRef){elemRef.onchange=new Function("botMgr.changeChildrenAge('"+bId+"');");}}
var showInfantNote=(bId=='air'||bId=='amc'||bId=='aow')&&(botMgr.countInfants(bId)>0);this.displayInfantTicketNote(bId,showInfantNote);this.changeChildrenAge(bId);}
this.behaviorSavedLocation=function(bId){var jarr=new Array();jarr=getInnerArray(botMgr.savedLocationIds,bId);for(var i=0;i<jarr.length;i++){var pbId=jarr[i];var savedLocRef=getRef(pbId+'SavedLocationID');if(savedLocRef){savedLocRef.onchange=new Function("botMgr.changeSavedLocations('"+pbId+"');");}}}
this.behaviorClearStop=function(bId){var jarr=new Array();jarr=getInnerArray(botMgr.savedLocationIds,bId);for(var i=0;i<jarr.length;i++){var pbId=jarr[i];var clearStopRef=getRef(pbId+'ClearStop');if(clearStopRef){clearStopRef.onclick=new Function("botMgr.clearSavedLocation('"+pbId+"');");}}}
this.behaviorRepriceAlert=function(bId){dlog.alert("behaviorSpecificHotel('"+bId+"')");this.originalRepriceValuesInputA=new Array();this.affectRepriceElementsInputA=[bId+"StartDate",bId+"EndDate"];for(var k=0;k<this.affectRepriceElementsInputA.length;k++){var elemRef=getRef(this.affectRepriceElementsInputA[k]);if(elemRef){elemRef.onfocus=new Function("botMgr.showRepriceAlert();");this.originalRepriceValuesInputA[k]=elemRef.value;}}
this.originalRepriceValuesSelectA=new Array();this.affectRepriceElementsSelectA=[bId+"Target",bId+"StartTime",bId+"EndTime"];for(var k=0;k<this.affectRepriceElementsSelectA.length;k++){var elemRef=getRef(this.affectRepriceElementsSelectA[k]);if(elemRef){elemRef.onchange=new Function("botMgr.showRepriceAlert();");this.originalRepriceValuesSelectA[k]=elemRef.options.selectedIndex;}}}
this.behaviorCheckIntrastitial=function(){var elem=getRef('htlchgbotForm');if(elem)
elem.onsubmit=checkSearch;}
this.addBehavior=function(botsRef,bots){log.info("addBehavior()");dlog.alert("addBehavior() ");if(!bots){dlog.alert("no bots element!");return;}
this.behaviorBotForms(botsRef,false);for(var i=0;i<bots.length;i++){var bId=bots[i].id;dlog.alert("bots["+i+"]="+bId);this.behaviorLinkSubmit(bId);this.behaviorLocationType(bId);this.behaviorFlightType(bId);this.behaviorDates(bId);this.behaviorDatesWithCalendar(bId);this.behaviorCalendar(bId);this.behaviorTravelers(bId);this.behaviorDisplayTravelers(bId);this.behaviorExpandOptions(bId);this.behaviorFlightOptions(bId);this.behaviorSearchBy(bId);this.behaviorSpecificHotel(bId);this.behaviorBookBy(bId);this.behaviorSavedLocation(bId);this.behaviorClearStop(bId);this.behaviorCheckIntrastitial();if(getRef('errorClickReprice')){this.behaviorRepriceAlert(bId);}
if(this.hasClass(bots[i],'active')){this.bId=bots[i].id;}}
var elemRef=getRef(this.navProductSelected+'FlightType');if(elemRef){var elemList=elemRef.getElementsByTagName('input');for(var j=0;j<elemList.length;j++)
{if(elemList[j].checked){this.gotoFlightType(elemList[j]);break;}}}else{this.setProduct(this.navProductSelected);}
this.behaviorAddAnotherFlight();this.behaviorChildrenAge(this.PRODUCTID_WITH_CHILDRENAGE);this.behaviorChildrenAge(this.PRODUCTID2_WITH_CHILDRENAGE);this.behaviorChildrenAge(this.PRODUCTID3_WITH_CHILDRENAGE);this.setFormFocus();}
this.construct=function(botId){dlog.alert("construct(): botId=>"+botId+"<");this.bId=botId;var botsRef=getRef(this.bId+'Bots');var bots=this.getBotArray(botsRef);this.addBehavior(botsRef,bots);this.botRefs=this.botRefs.concat(bots);dlog.alert("airOriginValue: '"+this.airOriginValue+"'");dlog.alert("Bot: NEW instantiated: "+this.bId);}
this.init=function(){log.info("init()")
if(!this.initialized){this.initialized=true;dlog.alert("botMgr.init()...");for(var i=0;i<this.botBoxIds.length;i++){this.construct(this.botBoxIds[i]);}
dlog.alert("botMgr.init() end. bId="+this.bId+"<br />=====================");}
else{for(var i=0;i<this.botBoxIds.length;i++){var botsRef=getRef(this.botBoxIds[i]+'Bots');var bots=this.getBotArray(botsRef);for(var j=0;j<bots.length;j++){var bId=bots[j].id;if(bId=='car'||bId=='rentcar'){this.behaviorLocationType(bId);}}}
this.setFormFocus();}
this.behaviorProductNav();var botsRef=getRef('Bots');this.behaviorBotForms(botsRef,true);}}
function getRef(elemId){var element=document.getElementById(elemId);if(!element)return null;return element;}
function arrayIndexOf(arr,bId){var j=-1;for(var i=0;i<arr.length;i++){if(arr[i][0]==bId){return i;}}
return j;}
function getInnerArray(arr,bId){var j=arrayIndexOf(arr,bId);if(j!=-1){var jarr=new Array(arr[j].length-1);for(var k=1;k<arr[j].length;k++){jarr[k-1]=bId+arr[j][k];}}else{var jarr=new Array(1);jarr[0]=bId;}
return jarr;}
function botInit(where){botMgr.init();}
var today=new Date();var thisDay=today.getDate();var thisMonth=today.getMonth();var thisYear=today.getFullYear();var calendarRef="";function getLastFebDay(currentYear){if(((thisYear%4==0)&&(thisYear%100!=0))||(thisYear%400==0))
return 29;else
return 28;}
this.months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];this.days=[31,getLastFebDay(thisYear),31,30,31,30,31,31,30,31,30,31];function changeDateWithEvent(event){var evt=(event)?event:((window.event)?window.event:"");if(evt){var element=(evt.target)?evt.target:evt.srcElement;var index=element.id.substr(element.id.length-1);var pbId=element.id.slice(0,(element.id.length-element.name.length));if(isNaN(index)){botMgr.setActiveBotId(pbId);chgDate(element);var fieldsets=getRef(botMgr.getActiveBotId()+"botForm").getElementsByTagName('fieldset');var indicies=new Array();for(var f=0;f<fieldsets.length;f++){var selects=fieldsets[f].getElementsByTagName('select');for(var s=0;s<selects.length;s++){if(selects[s].className.indexOf('startMonth')!=-1){indicies[indicies.length]='startMonth';indicies['startMonth']=new Array();indicies['startMonth'][0]=selects[s].selectedIndex;}else if(selects[s].className.indexOf('startDay')!=-1){indicies[indicies.length]='startDay';indicies['startDay']=new Array();indicies['startDay'][0]=selects[s].selectedIndex;}else if(selects[s].className.indexOf('endMonth')!=-1){indicies[indicies.length]='endMonth';indicies['endMonth']=new Array();indicies['endMonth'][0]=selects[s].selectedIndex;}else if(selects[s].className.indexOf('endDay')!=-1){indicies[indicies.length]='endDay';indicies['endDay']=new Array();indicies['endDay'][0]=selects[s].selectedIndex;}}}
var selects=document.getElementsByTagName('select');for(var s=0;s<selects.length;s++){if(botMgr.hasClass(selects[s],'startMonth')){selects[s].selectedIndex=indicies['startMonth'][0];botMgr.appendClass(selects[s],'changed');}else if(botMgr.hasClass(selects[s],'startDay')){selects[s].selectedIndex=indicies['startDay'][0];botMgr.appendClass(selects[s],'changed');}else if(botMgr.hasClass(selects[s],'endMonth')){selects[s].selectedIndex=indicies['endMonth'][0];botMgr.appendClass(selects[s],'changed');}else if(botMgr.hasClass(selects[s],'endDay')){selects[s].selectedIndex=indicies['endDay'][0];botMgr.appendClass(selects[s],'changed');}}}
else{changeMultiDate(element,index);}}}
function chgDate(element){var bId=botMgr.getActiveBotId();var startMonth=getRef(bId+'StartMonth');var startDay=getRef(bId+'StartDay');if(bId=="carservorigin"){var endMonth=getRef("carservdestinationEndMonth");var endDay=getRef('carservdestinationEndDay');botMgr.setActiveBotId('carserv');}else{var endMonth=getRef(bId+'EndMonth');var endDay=getRef(bId+'EndDay');}
dateRules(startMonth,startDay,endMonth,endDay,element);}
function dateRules(startMonth,startDay,endMonth,endDay,element){if(startMonth!=null&&startDay!=null&&endMonth!=null&&endDay!=null){var formRef=getRef(botMgr.getActiveBotId()).getElementsByTagName('form');var tripLength=formRef[0].tripLength.value;var startMonthIndex=startMonth.options.selectedIndex;var startDayIndex=startDay.options.selectedIndex;var endMonthIndex=endMonth.options.selectedIndex;var endDayIndex=endDay.options.selectedIndex;var startDate=getDateObject(startMonth,startDay);var endDate=getDateObject(endMonth,endDay);var dateType=(botMgr.hasClass(element,'startMonth')||botMgr.hasClass(element,'startDay'))?'start':'end';if(startMonthIndex>endMonthIndex&&startDayIndex<=endDayIndex){if(dateType=='start'){endMonth.options.selectedIndex=startMonthIndex;}else{startMonth.options.selectedIndex=endMonthIndex;}}
else if(startMonthIndex>endMonthIndex&&startDayIndex>endDayIndex){if(dateType=='start'){setNewDate(endMonth,endDay,addDays(startDate,tripLength));}else{setNewDate(startMonth,startDay,addDays(endDate,-1*tripLength));}}
else if(startMonthIndex==endMonthIndex&&startDayIndex>endDayIndex){if(dateType=='start'){setNewDate(endMonth,endDay,addDays(startDate,tripLength));}else{setNewDate(startMonth,startDay,addDays(endDate,-1*tripLength));}}}}
function getDateObject(monthSelectBox,daySelectBox){var monthAndYear=monthSelectBox.options[monthSelectBox.options.selectedIndex].value.split(" ");var month=monthAndYear[0].substr(0,3);var year=(monthAndYear.length>1)?monthAndYear[1]:thisYear;var day=daySelectBox.options[daySelectBox.options.selectedIndex].value;for(i=0;i<months.length;i++){if(months[i]==month){index=i;break;}}
return new Date(year,index,day);}
function getMonthLength(month){month=month.substr(0,3);for(i=0;i<months.length;i++){if(month==months[i]){index=i;break;}}
return days[i];}
function setNewDate(monthSelectBox,daySelectBox,newDate){var maxMonthYear=monthSelectBox.options[monthSelectBox.options.length-1].value;maxMonthYear=maxMonthYear.split(" ");var maxDay=getMonthLength(maxMonthYear[0]);var year=newDate.getFullYear();var month=months[newDate.getMonth()];var day=newDate.getDate();var matchedMonth=-1;var matchVal=(year==thisYear)?month:month+" "+year;for(i=0;i<monthSelectBox.options.length;i++){if(monthSelectBox.options[i].value==matchVal){matchedMonth=i;break;}}
if(matchedMonth==-1){day=1;}
monthSelectBox.options.selectedIndex=Math.max(0,matchedMonth);daySelectBox.options.selectedIndex=day-1;}
function addDays(newDate,days){if(!days)
days=0;var mseconds=newDate.getTime()+86400000*days;return new Date(mseconds);}
function chooseDate(day,monthAndYear){var monthAndYear=monthAndYear.split(" ");var month=monthAndYear[0].substr(0,3);var year=monthAndYear[1];var newDate=new Date(month+" "+day+", "+year);var startMonth,startDay,endMonth,endDay,productId,calType;var index=calendarRef.substr(calendarRef.length-1);if(isNaN(index))
index="";if(calendarRef.indexOf('Start')!=-1)
calType="Start";else if(calendarRef.indexOf('End')!=-1)
calType="End";productId=botMgr.getActiveBotId();startMonth=getRef(productId+"StartMonth"+index);startDay=getRef(productId+"StartDay"+index);if(index.length>0){setNewDate(startMonth,startDay,newDate);changeMultiDate(getRef(calendarRef),index);}else{if(calType=="Start"){if(startMonth!=null&&startDay!=null){setNewDate(startMonth,startDay,newDate);chgDate(startMonth);}}else{endMonth=getRef(productId+"EndMonth"+index);endDay=getRef(productId+"EndDay"+index);if(endMonth!=null&&endDay!=null){setNewDate(endMonth,endDay,newDate);chgDate(endMonth);}}}}
function changeMultiDate(element,index){var index=parseInt(index);var startMonthSB,startDaySB;var productId=botMgr.getActiveBotId();var endMonthSB=getRef(productId+'StartMonth'+index);var endDaySB=getRef(productId+'StartDay'+index);botMgr.swapClasses(endMonthSB,'endMonth','startMonth');botMgr.swapClasses(endMonthSB,'endDay','startDay');startMonthSB=getRef(productId+'StartMonth'+index);startDaySB=getRef(productId+'StartDay'+index);for(var n=index+1;n<=6;n++){botMgr.swapClasses(startMonthSB,'endMonth','startMonth');botMgr.swapClasses(startDaySB,'endDay','startDay');endMonthSB=getRef(productId+'StartMonth'+n);endDaySB=getRef(productId+'StartDay'+n);botMgr.swapClasses(endMonthSB,'startMonth','endMonth');botMgr.swapClasses(endDaySB,'startDay','endDay');dateRules(startMonthSB,startDaySB,endMonthSB,endDaySB,startMonthSB);startMonthSB=endMonthSB;startDaySB=endDaySB;}}
function qsToTab(tab){dlog.alert("qsToTab('"+tab+"')");botMgr.setSearchType(tab);clickSubmit("expand");return false;}
function clickSubmit(hiddenValue){dlog.alert("clickSubmit('"+hiddenValue+"')");var f=getRef(botMgr.getActiveBotId()+botMgr.FORM_NAME);if(f){f.searchMethodHidden.value=hiddenValue;if(hiddenValue=='expand')
botMgr.disableUnchanged();f.submit();}}
var calendar=new function(){this.MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];this.DAYS_BY_MONTH=[31,0,31,30,31,30,31,31,30,31,30,31];this.MAX_MONTH=this.MONTHS.length-1;this.MIN_MONTH=0;this.ARROW_PREV='<img class="arrowPrevious" src="/site/img/chrome/buttons/calendarPrevious.gif" onclick="parent.calendar.showPrevMonth();" />';this.ARROW_NEXT='<img class="arrowNext" src="/site/img/chrome/buttons/calendarNext.gif" onclick="parent.calendar.showNextMonth();" />';this.WEEKS='<tr class="daysHeader"><td>S</td><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td></tr>';this.CLOSE_BAR='<div class="closeBar"><a href="javascript:parent.botMgr.hideCalendar();">Close</a></div>';this.month;this.year;this.hasPrev;this.hasNext;this.calendarVisible;this.calendarFocused;this.dateFieldFocused;this.eventElement;this.storedDateObj;this.userStartDateObj;this.userEndDateObj;this.eventDateObj;this.documentRef;this.calendarRef;this.windowRef;this.containerDivRef;this.xoffset=70;this.yoffset=-20;this.today;this.maxDate;this.init=function(windowRef,docRef,calRef,dateToday,dateMax){log.debug('calendar.init('+windowRef+', '+docRef+', '+calRef+', '+dateToday+', '+dateMax+')');this.calendarVisible=false;this.calendarFocused=false;this.dateFieldFocused=false;this.eventElement;this.storedDateObj=new Date(dateToday);this.userStartDateObj=null;this.userEndDateObj=null;this.eventDateObj=null;this.documentRef=docRef;this.calendarRef=calRef;this.windowRef=windowRef;this.containerDivRef=document.getElementById('calDiv');this.xPos=botMgr.getXPosition(getRef('calDiv'));this.yPos=botMgr.getYPosition(getRef('calDiv'));this.today=new Date(dateToday);this.maxDate=new Date(dateMax);botMgr.hideCalendar();this.behaviorCalendarFocus();}
this.behaviorCalendarFocus=function(){log.debug('calendar.behaviorCalendarFocus()');this.documentRef.onmousedown=botMgr.setCalFocus;document.onmousedown=botMgr.clearCalFocus;}
this.update=function(month,year,hasPrev,hasNext){log.debug('calendar.update('+month+', '+year+', '+hasPrev+', '+hasNext+')');this.month=month;this.year=year;this.hasPrev=hasPrev;this.hasNext=hasNext;var arrow,headerClass,header;if(this.hasPrev&&this.hasNext){arrow=this.ARROW_PREV+this.ARROW_NEXT;headerClass="";}
else if(this.hasPrev&&!this.hasNext){arrow=this.ARROW_PREV;headerClass='hasPrevious';}
else if(!this.hasPrev&&this.hasNext){arrow=this.ARROW_NEXT;headerClass='hasNext';}
header='<thead><tr class="monthHeader" ><th colspan="7">'+arrow+'<div class="'+headerClass+'">'+this.MONTHS[this.month]+' '+this.year+'</div></th></tr>'+this.WEEKS+'</thead>';var dateObj,highlightId;if(this.eventElement.className.indexOf('end')!=-1){if(this.userEndDateObj!=null)dateObj=this.userEndDateObj;else if(this.userStartDateObj!=null)dateObj=this.userStartDateObj;}
else if(this.userStartDateObj!=null)
dateObj=this.userStartDateObj;if(dateObj)highlightId=dateObj.getMonth()+'_'+dateObj.getDate()+'_'+dateObj.getFullYear();var days="";var firstDay=this.getFirstDay();var totalDays=this.getTotalDays(this.month,this.year);var dayCounter=1;var dayFill=false;days+='<tbody>';for(var i=0;i<6;i++){days+='<tr class="days">';for(var j=0;j<=6;j++){if(j==firstDay)dayFill=true;if(!dayFill||dayCounter>totalDays)
days+='<td class="none">&nbsp;</td>';else{var beforeStartDate,afterCurrentDate,beforeMaxDate;if(this.eventElement.className.indexOf('end')>=0&&this.userStartDateObj!=null)
beforeStartDate=this.year<this.userStartDateObj.getFullYear()||(this.year==this.userStartDateObj.getFullYear()&&this.month<this.userStartDateObj.getMonth())||(this.year==this.userStartDateObj.getFullYear()&&this.month==this.userStartDateObj.getMonth()&&dayCounter<this.userStartDateObj.getDate());afterCurrentDate=this.year>this.today.getFullYear()||(this.year==this.today.getFullYear()&&this.month>this.today.getMonth())||(this.year==this.today.getFullYear()&&this.month==this.today.getMonth()&&dayCounter>this.today.getDate());beforeMaxDate=this.year<this.maxDate.getFullYear()||(this.year==this.maxDate.getFullYear()&&this.month<this.maxDate.getMonth())||(this.year==this.maxDate.getFullYear()&&this.month==this.maxDate.getMonth()&&dayCounter<this.maxDate.getDate());var clickableDate=true;if(!beforeStartDate&&highlightId==(this.month+'_'+dayCounter+'_'+this.year))
days+='<td class="selected">';else if(!beforeStartDate&&this.year==this.today.getFullYear()&&this.month==this.today.getMonth()&&dayCounter==this.today.getDate())
days+='<td class="today">';else if(afterCurrentDate&&beforeMaxDate&&!beforeStartDate)
days+='<td>';else{days+='<td class="disabled">';clickableDate=false;}
if(clickableDate)days+='<a id="'+this.month+'_'+dayCounter+'_'+this.year+'" href="#" onmousedown="javascript:parent.calendar.clickDate('+this.month+','+dayCounter+','+this.year+');">'+dayCounter+'</a></td>';else days+=dayCounter;days+='</td>';dayCounter++;}}
days+='</tr>';}
days+='</tbody>';this.calendarRef.innerHTML='<table cellpadding="0" cellspacing="0">'+header+days+'</table>'+this.CLOSE_BAR;}
this.getTotalDays=function(month,year){log.debug('calendar.getTotalDays('+month+','+year+')');var returnVal;if(month==1){if((year%4==0&&year%100!=0)||year%400==0)returnVal=29;else returnVal=28;}
else returnVal=this.DAYS_BY_MONTH[month];log.info('calendar.getTotalDays returned: '+returnVal);return returnVal;}
this.getFirstDay=function(){log.debug('calendar.getFirstDay()');var firstDay=new Date(this.year,this.month,1);log.info('calendar.getFirstDay returned: '+firstDay.getDay());return firstDay.getDay();}
this.showNextMonth=function(){log.debug('calendar.showNextMonth()');var month=(this.month<this.MAX_MONTH)?this.month+1:this.MIN_MONTH;var year=(this.month<this.MAX_MONTH)?this.year:this.year+1;var hasPrevCal=(this.today.getFullYear()<year||(this.today.getFullYear()==year&&this.today.getMonth()<month));var hasNextCal=(this.maxDate.getFullYear()>year||(this.maxDate.getFullYear()==year&&this.maxDate.getMonth()>month));this.storedDateObj.setMonth(month);this.storedDateObj.setYear(year);this.update(month,year,hasPrevCal,hasNextCal);}
this.showPrevMonth=function(){log.debug('calendar.showPrevMonth()');var month=(this.month!=this.MIN_MONTH)?this.month-1:this.MAX_MONTH;var year=(this.month!=this.MIN_MONTH)?this.year:this.year-1;var hasPrevCal=(this.today.getFullYear()<year||(this.today.getFullYear()==year&&this.today.getMonth()<month));var hasNextCal=(this.maxDate.getFullYear()>year||(this.maxDate.getFullYear()==year&&this.maxDate.getMonth()>month));this.storedDateObj.setMonth(month);this.storedDateObj.setYear(year);this.update(month,year,hasPrevCal,hasNextCal);}
this.clickDate=function(month,day,year){log.debug('calendar.clickDate('+month+','+day+','+year+')');if(this.eventElement!=null){var month=new String(month+1);month=(month.length==1)?'0'+month.toString():month;var day=new String(day);day=(day.length==1)?'0'+day.toString():day;var year=new String(year);year=year.substr(2);this.eventElement.value=month+'/'+day+'/'+year;if(this.eventElement.id=='carservoriginStartDate'){getRef('carservdestinationStartDate').value=month+'/'+day+'/'+year;}
botMgr.hideCalendar();}}
this.validateDate=function(dateStr){log.debug('calendar.validateDate('+dateStr+')');var userDateObj=null;var valid=false;if(dateStr!=null&&dateStr!=''){var splitDates=dateStr.split('/');if(splitDates.length==3){var userYear,userMonth,userDay;if(!isNaN(splitDates[0])&&!isNaN(splitDates[1])&&!isNaN(splitDates[2]))
valid=true;if(valid&&splitDates[2].length==2){userYear='20'+splitDates[2];valid=true;}else if(valid&&splitDates[2].length==4){userYear=splitDates[2];valid=true;}else valid=false;if(valid&&(splitDates[0].length==1||splitDates[0].length==2)&&splitDates[0]>0&&splitDates[0]<13){userMonth=splitDates[0]-1;valid=true;}else valid=false;if(valid&&(splitDates[1].length==1||splitDates[1].length==2)&&splitDates[1]>0&&splitDates[1]<=this.getTotalDays(userMonth,userYear)){userDay=splitDates[1];valid=true;}else valid=false;if(valid){if(userYear<this.today.getFullYear())
valid=false;else if(userYear==this.today.getFullYear()&&userMonth<this.today.getMonth())
valid=false;else if(userYear==this.today.getFullYear()&&userMonth==this.today.getMonth()&&userDay<this.today.getDate())
valid=false;if(userYear>this.maxDate.getFullYear())
valid=false;else if(userYear==this.maxDate.getFullYear()&&userMonth>this.maxDate.getMonth())
valid=false;else if(userYear==this.maxDate.getFullYear()&&userMonth==this.maxDate.getMonth()&&userDay>this.maxDate.getDate())
valid=false;}
if(valid)
userDateObj=new Date(userYear,userMonth,userDay);}}
log.info('calendar.validateDate returned: '+userDateObj);return userDateObj;}
this.draw=function(){log.debug('calendar.draw()');this.eventDateObj=this.validateDate(this.eventElement.value);if(this.eventElement.className.indexOf('end')!=-1){this.userEndDateObj=this.eventDateObj;var startDateField=getRef(botMgr.bId+'StartDate');if(startDateField!=null)this.userStartDateObj=this.validateDate(startDateField.value);var isAfter=false;if(this.userStartDateObj!=null&&this.userEndDateObj!=null){if(this.userStartDateObj.getFullYear()>this.userEndDateObj.getFullYear())
isAfter=true;else if(this.userStartDateObj.getFullYear()==this.userEndDateObj.getFullYear()&&this.userStartDateObj.getMonth()>this.userEndDateObj.getMonth())
isAfter=true;else if(this.userStartDateObj.getFullYear()==this.userEndDateObj.getFullYear()&&this.userStartDateObj.getMonth()==this.userEndDateObj.getMonth()&&this.userStartDateObj.getDate()>this.userEndDateObj.getDate())
isAfter=true;}
if(!isAfter&&this.userEndDateObj!=null)this.setUserDate(this.userEndDateObj);else if(isAfter||(this.userEndDateObj==null&&this.userStartDateObj!=null))this.setUserDate(this.userStartDateObj);else this.setUserDate(this.userEndDateObj);}
else{this.userStartDateObj=this.eventDateObj;this.setUserDate(this.userStartDateObj);}}
this.setUserDate=function(userDateObj){log.debug('calendar.setUserDate('+userDateObj+')');var dateObj;if(userDateObj==null)dateObj=this.storedDateObj;else dateObj=userDateObj;var month=dateObj.getMonth();var year=dateObj.getFullYear();var hasPrevCal=(this.today.getFullYear()<year||(this.today.getFullYear()==year&&this.today.getMonth()<month));var hasNextCal=(this.maxDate.getFullYear()>year||(this.maxDate.getFullYear()==year&&this.maxDate.getMonth()>month));this.storedDateObj.setMonth(month);this.storedDateObj.setYear(year);this.update(month,year,hasPrevCal,hasNextCal);}}
var optionIds=['airChoice','carChoice','htlChoice','railChoice','cruiseChoice','oasChoice','aphChoice','apcChoice','hpcChoice','ahcChoice'];var botElement;Event.observe(window,'load',function(){for(var i=0;i<optionIds.length;i++){if($(optionIds[i])){Event.observe(optionIds[i],'click',function(event){webtrendEvent(event);});}}});function webtrendEvent(event){var botElement=Event.element(event);var radioId=botElement.id;switch(radioId){case'airChoice':dcsMultiTrack('DCSext.rbck','Air');break;case'carChoice':dcsMultiTrack('DCSext.rbck','Car');break;case'htlChoice':dcsMultiTrack('DCSext.rbck','Hotel');break;case'railChoice':dcsMultiTrack('DCSext.rbck','Rail');break;case'cruiseChoice':dcsMultiTrack('DCSext.rbck','Cruises');break;case'oasChoice':dcsMultiTrack('DCSext.rbck','Activities');break;case'aphChoice':dcsMultiTrack('DCSext.rbck','APH');break;case'apcChoice':dcsMultiTrack('DCSext.rbck','APC');break;case'hpcChoice':dcsMultiTrack('DCSext.rbck','HPC');break;case'ahcChoice':dcsMultiTrack('DCSext.rbck','AHC');break;default:break;}}
function changeSearchType(typeOfEvent)
{if(typeOfEvent=='eventType')
{hideElement('errorTopId')
showElement('eventNameInput');showElement('exampleNote');hideElement('locationInput');hideElement('oasDates');}
else
{hideElement('errorTopId')
hideElement('eventNameInput');hideElement('exampleNote');showElement('locationInput');showElement('oasDates');}}
function retainSearchType(typeOfEvent)
{if(typeOfEvent=='eventType')
{showElement('eventNameInput');showElement('exampleNote');hideElement('locationInput');hideElement('oasDates');}
else
{hideElement('eventNameInput');hideElement('exampleNote');showElement('locationInput');showElement('oasDates');}}
if(self!=top){if(document.images)
top.location.replace(window.location.href);else
top.location.href=window.location.href;}
var circleArray=Class.create();circleArray.prototype=Object.extend(Array.prototype,{initialize:function(list){this.currentIndex=0;this.constructor(list);},previous:function(){this.currentIndex-=1;if(this.currentIndex<0){this.currentIndex=this.length-1;}
return this.getCurrentValue();},next:function(){this.currentIndex=this.currentIndex+1.0;if(this.currentIndex>=this.length){this.currentIndex=0;}
return this.getCurrentValue();},getCurrentValue:function(){return this[this.currentIndex];},getCurrentIndex:function(){return this.currentIndex;},setCurrentIndex:function(index){this.currentIndex=index;}});var rotator=Class.create();rotator.prototype={initExtend:function(element,contentList,options,loadEffects){this.element=element;this.options=options;this.numberOfPages=0;this.oldIndex=-1;this.timeout=null;this.pauseLoadEffects=false;this.isLocked=false;this.contentInitialized=false;this.contentList=new circleArray(contentList);this.contentList=this.contentList.concat(contentList);this.contentList.shift();this.contentList.setCurrentIndex(0);this.contents=document.getElementsByClassName("contents",this.element)[0];this.initContents();this.elementsPrevious=document.getElementsByClassName(this.options.previous,this.element);this.elementsNext=document.getElementsByClassName(this.options.next,this.element);this.eventMouseUp=this.eventClick.bindAsEventListener(this);this.elementsPrevious.each(function(child){Event.observe(child,'mouseup',this.eventMouseUp);}.bind(this));this.elementsNext.each(function(child){Event.observe(child,'mouseup',this.eventMouseUp);}.bind(this));if(this.options.showPageNumbers){this.initPageNumbers();this.updatePageNumber();}
if(loadEffects!=null&&this.options.runLoadEffects){this.pageLoadEffects=loadEffects;this.runLoadEffects=true;this.loadEffectIndex=0;this.timeout=setTimeout(function(){this.processLoadEffects();}.bind(this),2000);}},processLoadEffects:function(){if(this.runLoadEffects&&this.contentInitialized){if(!this.isLocked&&!this.pauseLoadEffects){if(this.loadEffectIndex<this.pageLoadEffects.length){this.lockControl();this.effect=this.pageLoadEffects[this.loadEffectIndex];this.loadEffectIndex+=1;this.timeout=setTimeout(function(){this.unlockControl();}.bind(this),this.effect.duration);this.timeout=setTimeout(function(){this.processLoadEffects();}.bind(this),this.effect.pause);this.oldIndex=this.contentList.getCurrentIndex();this.contentList.setCurrentIndex(this.effect.pageNumber);this.update();}else{this.runLoadEffects=false;}}else{this.timeout=setTimeout(function(){this.processLoadEffects();}.bind(this),1000);}}},initContents:function(){var contentsTemplate=new Template("<div class='item 1'><div>&nbsp;</div></div><div class='item 2'><div>&nbsp;</div></div>");this.contents.innerHTML=contentsTemplate.evaluate();this.contents=document.getElementsByClassName("item",this.contents);this.swapContents(this.contents[0],this.contents[1]);this.flagToggle=false;this.adRequest(this.contentList.getCurrentValue(),this.contents[0]);this.eventPause=this.eventPause.bindAsEventListener(this);this.eventUnpause=this.eventUnpause.bindAsEventListener(this);this.contents.each(function(child){Event.observe(child,'mouseover',this.eventPause);Event.observe(child,'mouseout',this.eventUnpause);}.bind(this));this.contentInitialized=true;},initPageNumbers:function(){this.numberOfPages=this.contentList.length;var wrapperTemplate=new Template("<ul>#{pages}</ul>");var pageTemplate=new Template("<li><a href='javascript: void(0);' class='page #{number}' name='#{name}'>#{pageLabel}</a></li>");var pagesText="";document.getElementsByClassName("pages",this.element).each(function(elPages){for(var i=0;i<this.numberOfPages;i++){var pageData={number:String(i),name:String(i),pageLabel:String(i+1)};pagesText+=pageTemplate.evaluate(pageData);}
var wrapperData={pages:(pagesText)};elPages.innerHTML=wrapperTemplate.evaluate(wrapperData);}.bind(this));document.getElementsByClassName("page",this.element).each(function(elPage){Event.observe(elPage,'mouseup',this.eventMouseUp);}.bind(this));},eventClick:function(pEvent){if(!this.isLocked){this.lockControl();this.timeout=clearTimeout();var eventElement=Event.element(pEvent);this.oldIndex=this.contentList.getCurrentIndex();if(eventElement.hasClassName(this.options.previous)){this.contentList.previous();this.update();}else if(eventElement.hasClassName(this.options.next)){this.contentList.next();this.update();}else if(this.options.showPageNumbers){if(eventElement.hasClassName("page")){this.contentList.setCurrentIndex(parseInt(eventElement.getAttribute("name")));if(this.contentList.getCurrentIndex()!=this.oldIndex){this.update();}}}
this.timeout=setTimeout(function(){this.unlockControl();}.bind(this),(this.options.interactEffect[1]*1000));}
if(this.runLoadEffects){this.unlockControl();this.runLoadEffects=false;this.timeout=setTimeout(function(){this.eventClick(pEvent);}.bind(this),200);}},update:function(){var showElement,hideElement;if(this.flagToggle){showElement=this.contents[0];hideElement=this.contents[1];}else{showElement=this.contents[1];hideElement=this.contents[0];}
this.adRequest(this.contentList.getCurrentValue(),showElement);this.swapContents(showElement,hideElement);this.flagToggle=!this.flagToggle;if(this.options.showPageNumbers){this.updatePageNumber();}},adRequest:function(url,updateElement){var ajaxReq=new Ajax.Request(url,{method:'get',onSuccess:function(transport){updateElement.innerHTML=(transport.responseText);}.bind(this)});},updatePageNumber:function(){if(this.contentList.getCurrentIndex()!=this.oldIndex){var selectedPageNumber="page "+this.contentList.getCurrentIndex();var oldPageNumber="page "+this.oldIndex;document.getElementsByClassName(selectedPageNumber,this.element).each(function(page){page.addClassName("selected");});document.getElementsByClassName(oldPageNumber,this.element).each(function(page){page.removeClassName("selected");});}},swapContents:function(showElement,hideElement){this.rotateShow(showElement);this.rotateHide(hideElement);var swapZindexTimer=setTimeout(function(){showElement.setStyle({zIndex:"10"});hideElement.setStyle({zIndex:"0"});}.bind(this),300);},rotateHide:function(hideElement){return new this.options.interactEffect[0](hideElement,{duration:(this.options.interactEffect[1]/2),transition:Effect.Transitions.sinoidal,from:1.0,to:0.01});},rotateShow:function(showElement){return new this.options.interactEffect[0](showElement,{duration:this.options.interactEffect[1],from:0.0,to:1.0});},eventPause:function(pEvent){this.pauseLoadEffects=true;},eventUnpause:function(pEvent){this.pauseLoadEffects=false;},lockControl:function(){this.isLocked=true;},unlockControl:function(){this.isLocked=false;}};
var adRotator=Class.create();adRotator.prototype=Object.extend(rotator.prototype,{initialize:function(){log.debug("init adRotator");var tab1="shared/adserverProxy.jsp?tab=1";var tab2="shared/adserverProxy.jsp?tab=2";var tab3="shared/adserverProxy.jsp?tab=3";var tab4="shared/adserverProxy.jsp?tab=4";var tab5="shared/adserverProxy.jsp?tab=5";var tabArray=[tab1,tab2,tab3,tab4,tab5];var loadFXArray=[{effect:Effect.Opacity,pause:4000,pageNumber:1},{effect:Effect.Opacity,pause:4000,pageNumber:2},{effect:Effect.Opacity,pause:4000,pageNumber:3},{effect:Effect.Opacity,pause:4000,pageNumber:4},{effect:Effect.Opacity,pause:4000,pageNumber:0}];this.elementHTMLClassName="adRotator";this.initAdTemplate();var elements=$(document.body).getElementsBySelector('DIV.'+this.elementHTMLClassName);if(elements.length<=0){log.error("adRotator.js: error inserting/retreiving adRotator HTML with DOM during initialization");return false;}
this.element=elements[elements.length-1];this.cookie=new Cookie("adRotator");var runOnLoadEffects=true;if(this.cookie.get()){runOnLoadEffects=false;}else{this.cookie.set("true");}
var rotatorOptions={previous:"previous",next:"next",interactEffect:[Effect.Opacity,1.5],showPageNumbers:true,runLoadEffects:runOnLoadEffects};Event.onDOMReady(function(){this.initExtend(this.element,tabArray,rotatorOptions,loadFXArray);}.bind(this));},initAdTemplate:function(){var adRotatorTemplate=new Template("<div class=\"#{parentClass}\">"+"<div class=\"window\">"+"<div class=\"contents\">"+"</div>"+"</div>"+"<div class=\"footer\">"+"<ul class=\"navigation \">"+"<li class=\"previous\">"+"<a href=\"javascript: void(0);\">"+"<img class=\"previous\" src=\"/site/img/chrome/buttons/center_spot_previous.gif\" />"+"</a>"+"</li>"+"<li class=\"pages\">"+"</li><li class=\"next\"><a href=\"javascript: void(0);\"><img class=\"next\" src=\"/site/img/chrome/buttons/center_spot_next.gif\" />"+"</a>"+"</li>"+"</ul>"+"</div>"+"</div>");var contentData={parentClass:this.elementHTMLClassName};document.write(adRotatorTemplate.evaluate(contentData));}});
String.prototype.parseColor=function(){var color='#';if(this.slice(0,4)=='rgb('){var cols=this.slice(4,this.length-1).split(',');var i=0;do{color+=parseInt(cols[i]).toColorPart()}while(++i<3);}else{if(this.slice(0,1)=='#'){if(this.length==4)for(var i=1;i<4;i++)color+=(this.charAt(i)+this.charAt(i)).toLowerCase();if(this.length==7)color=this.toLowerCase();}}
return(color.length==7?color:(arguments[0]||this));}
Element.collectTextNodes=function(element){return $A($(element).childNodes).collect(function(node){return(node.nodeType==3?node.nodeValue:(node.hasChildNodes()?Element.collectTextNodes(node):''));}).flatten().join('');}
Element.collectTextNodesIgnoreClass=function(element,className){return $A($(element).childNodes).collect(function(node){return(node.nodeType==3?node.nodeValue:((node.hasChildNodes()&&!Element.hasClassName(node,className))?Element.collectTextNodesIgnoreClass(node,className):''));}).flatten().join('');}
Element.setContentZoom=function(element,percent){element=$(element);element.setStyle({fontSize:(percent/100)+'em'});if(navigator.appVersion.indexOf('AppleWebKit')>0)window.scrollBy(0,0);return element;}
Element.getOpacity=function(element){return $(element).getStyle('opacity');}
Element.setOpacity=function(element,value){return $(element).setStyle({opacity:value});}
Element.getInlineOpacity=function(element){return $(element).style.opacity||'';}
Element.forceRerendering=function(element){try{element=$(element);var n=document.createTextNode(' ');element.appendChild(n);element.removeChild(n);}catch(e){}};Array.prototype.call=function(){var args=arguments;this.each(function(f){f.apply(this,args)});}
var Effect={_elementDoesNotExistError:{name:'ElementDoesNotExistError',message:'The specified DOM element does not exist, but is required for this effect to operate'},tagifyText:function(element){if(typeof Builder=='undefined')
throw("Effect.tagifyText requires including script.aculo.us' builder.js library");var tagifyStyle='position:relative';if(/MSIE/.test(navigator.userAgent)&&!window.opera)tagifyStyle+=';zoom:1';element=$(element);$A(element.childNodes).each(function(child){if(child.nodeType==3){child.nodeValue.toArray().each(function(character){element.insertBefore(Builder.node('span',{style:tagifyStyle},character==' '?String.fromCharCode(160):character),child);});Element.remove(child);}});},multiple:function(element,effect){var elements;if(((typeof element=='object')||(typeof element=='function'))&&(element.length))
elements=element;else
elements=$(element).childNodes;var options=Object.extend({speed:0.1,delay:0.0},arguments[2]||{});var masterDelay=options.delay;$A(elements).each(function(element,index){new effect(element,Object.extend(options,{delay:index*options.speed+masterDelay}));});},PAIRS:{'slide':['SlideDown','SlideUp'],'blind':['BlindDown','BlindUp'],'appear':['Appear','Fade']},toggle:function(element,effect){element=$(element);effect=(effect||'appear').toLowerCase();var options=Object.extend({queue:{position:'end',scope:(element.id||'global'),limit:1}},arguments[2]||{});Effect[element.visible()?Effect.PAIRS[effect][1]:Effect.PAIRS[effect][0]](element,options);}};var Effect2=Effect;Effect.Transitions={linear:Prototype.K,sinoidal:function(pos){return(-Math.cos(pos*Math.PI)/2)+0.5;},reverse:function(pos){return 1-pos;},flicker:function(pos){return((-Math.cos(pos*Math.PI)/4)+0.75)+Math.random()/4;},wobble:function(pos){return(-Math.cos(pos*Math.PI*(9*pos))/2)+0.5;},pulse:function(pos,pulses){pulses=pulses||5;return(Math.round((pos%(1/pulses))*pulses)==0?((pos*pulses*2)-Math.floor(pos*pulses*2)):1-((pos*pulses*2)-Math.floor(pos*pulses*2)));},none:function(pos){return 0;},full:function(pos){return 1;}};Effect.ScopedQueue=Class.create();Object.extend(Object.extend(Effect.ScopedQueue.prototype,Enumerable),{initialize:function(){this.effects=[];this.interval=null;},_each:function(iterator){this.effects._each(iterator);},add:function(effect){var timestamp=new Date().getTime();var position=(typeof effect.options.queue=='string')?effect.options.queue:effect.options.queue.position;switch(position){case'front':this.effects.findAll(function(e){return e.state=='idle'}).each(function(e){e.startOn+=effect.finishOn;e.finishOn+=effect.finishOn;});break;case'with-last':timestamp=this.effects.pluck('startOn').max()||timestamp;break;case'end':timestamp=this.effects.pluck('finishOn').max()||timestamp;break;}
effect.startOn+=timestamp;effect.finishOn+=timestamp;if(!effect.options.queue.limit||(this.effects.length<effect.options.queue.limit))
this.effects.push(effect);if(!this.interval)
this.interval=setInterval(this.loop.bind(this),15);},remove:function(effect){this.effects=this.effects.reject(function(e){return e==effect});if(this.effects.length==0){clearInterval(this.interval);this.interval=null;}},loop:function(){var timePos=new Date().getTime();for(var i=0,len=this.effects.length;i<len;i++)
if(this.effects[i])this.effects[i].loop(timePos);}});Effect.Queues={instances:$H(),get:function(queueName){if(typeof queueName!='string')return queueName;if(!this.instances[queueName])
this.instances[queueName]=new Effect.ScopedQueue();return this.instances[queueName];}}
Effect.Queue=Effect.Queues.get('global');Effect.DefaultOptions={transition:Effect.Transitions.sinoidal,duration:1.0,fps:60.0,sync:false,from:0.0,to:1.0,delay:0.0,queue:'parallel'}
Effect.Base=function(){};Effect.Base.prototype={position:null,start:function(options){this.options=Object.extend(Object.extend({},Effect.DefaultOptions),options||{});this.currentFrame=0;this.state='idle';this.startOn=this.options.delay*1000;this.finishOn=this.startOn+(this.options.duration*1000);this.event('beforeStart');if(!this.options.sync)
Effect.Queues.get(typeof this.options.queue=='string'?'global':this.options.queue.scope).add(this);},loop:function(timePos){if(timePos>=this.startOn){if(timePos>=this.finishOn){this.render(1.0);this.cancel();this.event('beforeFinish');if(this.finish)this.finish();this.event('afterFinish');return;}
var pos=(timePos-this.startOn)/(this.finishOn-this.startOn);var frame=Math.round(pos*this.options.fps*this.options.duration);if(frame>this.currentFrame){this.render(pos);this.currentFrame=frame;}}},render:function(pos){if(this.state=='idle'){this.state='running';this.event('beforeSetup');if(this.setup)this.setup();this.event('afterSetup');}
if(this.state=='running'){if(this.options.transition)pos=this.options.transition(pos);pos*=(this.options.to-this.options.from);pos+=this.options.from;this.position=pos;this.event('beforeUpdate');if(this.update)this.update(pos);this.event('afterUpdate');}},cancel:function(){if(!this.options.sync)
Effect.Queues.get(typeof this.options.queue=='string'?'global':this.options.queue.scope).remove(this);this.state='finished';},event:function(eventName){if(this.options[eventName+'Internal'])this.options[eventName+'Internal'](this);if(this.options[eventName])this.options[eventName](this);},inspect:function(){var data=$H();for(property in this)
if(typeof this[property]!='function')data[property]=this[property];return'#<Effect:'+data.inspect()+',options:'+$H(this.options).inspect()+'>';}}
Effect.Parallel=Class.create();Object.extend(Object.extend(Effect.Parallel.prototype,Effect.Base.prototype),{initialize:function(effects){this.effects=effects||[];this.start(arguments[1]);},update:function(position){this.effects.invoke('render',position);},finish:function(position){this.effects.each(function(effect){effect.render(1.0);effect.cancel();effect.event('beforeFinish');if(effect.finish)effect.finish(position);effect.event('afterFinish');});}});Effect.Event=Class.create();Object.extend(Object.extend(Effect.Event.prototype,Effect.Base.prototype),{initialize:function(){var options=Object.extend({duration:0},arguments[0]||{});this.start(options);},update:Prototype.emptyFunction});Effect.Opacity=Class.create();Object.extend(Object.extend(Effect.Opacity.prototype,Effect.Base.prototype),{initialize:function(element){this.element=$(element);if(!this.element)throw(Effect._elementDoesNotExistError);if(/MSIE/.test(navigator.userAgent)&&!window.opera&&(!this.element.currentStyle.hasLayout))
this.element.setStyle({zoom:1});var options=Object.extend({from:this.element.getOpacity()||0.0,to:1.0},arguments[1]||{});this.start(options);},update:function(position){this.element.setOpacity(position);}});Effect.Move=Class.create();Object.extend(Object.extend(Effect.Move.prototype,Effect.Base.prototype),{initialize:function(element){this.element=$(element);if(!this.element)throw(Effect._elementDoesNotExistError);var options=Object.extend({x:0,y:0,mode:'relative'},arguments[1]||{});this.start(options);},setup:function(){this.element.makePositioned();this.originalLeft=parseFloat(this.element.getStyle('left')||'0');this.originalTop=parseFloat(this.element.getStyle('top')||'0');if(this.options.mode=='absolute'){this.options.x=this.options.x-this.originalLeft;this.options.y=this.options.y-this.originalTop;}},update:function(position){this.element.setStyle({left:Math.round(this.options.x*position+this.originalLeft)+'px',top:Math.round(this.options.y*position+this.originalTop)+'px'});}});Effect.MoveBy=function(element,toTop,toLeft){return new Effect.Move(element,Object.extend({x:toLeft,y:toTop},arguments[3]||{}));};Effect.Scale=Class.create();Object.extend(Object.extend(Effect.Scale.prototype,Effect.Base.prototype),{initialize:function(element,percent){this.element=$(element);if(!this.element)throw(Effect._elementDoesNotExistError);var options=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:'box',scaleFrom:100.0,scaleTo:percent},arguments[2]||{});this.start(options);},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||false;this.elementPositioning=this.element.getStyle('position');this.originalStyle={};['top','left','width','height','fontSize'].each(function(k){this.originalStyle[k]=this.element.style[k];}.bind(this));this.originalTop=this.element.offsetTop;this.originalLeft=this.element.offsetLeft;var fontSize=this.element.getStyle('font-size')||'100%';['em','px','%','pt'].each(function(fontSizeType){if(fontSize.indexOf(fontSizeType)>0){this.fontSize=parseFloat(fontSize);this.fontSizeType=fontSizeType;}}.bind(this));this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;this.dims=null;if(this.options.scaleMode=='box')
this.dims=[this.element.offsetHeight,this.element.offsetWidth];if(/^content/.test(this.options.scaleMode))
this.dims=[this.element.scrollHeight,this.element.scrollWidth];if(!this.dims)
this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth];},update:function(position){var currentScale=(this.options.scaleFrom/100.0)+(this.factor*position);if(this.options.scaleContent&&this.fontSize)
this.element.setStyle({fontSize:this.fontSize*currentScale+this.fontSizeType});this.setDimensions(this.dims[0]*currentScale,this.dims[1]*currentScale);},finish:function(position){if(this.restoreAfterFinish)this.element.setStyle(this.originalStyle);},setDimensions:function(height,width){var d={};if(this.options.scaleX)d.width=Math.round(width)+'px';if(this.options.scaleY)d.height=Math.round(height)+'px';if(this.options.scaleFromCenter){var topd=(height-this.dims[0])/2;var leftd=(width-this.dims[1])/2;if(this.elementPositioning=='absolute'){if(this.options.scaleY)d.top=this.originalTop-topd+'px';if(this.options.scaleX)d.left=this.originalLeft-leftd+'px';}else{if(this.options.scaleY)d.top=-topd+'px';if(this.options.scaleX)d.left=-leftd+'px';}}
this.element.setStyle(d);}});Effect.Highlight=Class.create();Object.extend(Object.extend(Effect.Highlight.prototype,Effect.Base.prototype),{initialize:function(element){this.element=$(element);if(!this.element)throw(Effect._elementDoesNotExistError);var options=Object.extend({startcolor:'#ffff99'},arguments[1]||{});this.start(options);},setup:function(){if(this.element.getStyle('display')=='none'){this.cancel();return;}
this.oldStyle={};if(!this.options.keepBackgroundImage){this.oldStyle.backgroundImage=this.element.getStyle('background-image');this.element.setStyle({backgroundImage:'none'});}
if(!this.options.endcolor)
this.options.endcolor=this.element.getStyle('background-color').parseColor('#ffffff');if(!this.options.restorecolor)
this.options.restorecolor=this.element.getStyle('background-color');this._base=$R(0,2).map(function(i){return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16)}.bind(this));this._delta=$R(0,2).map(function(i){return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i]}.bind(this));},update:function(position){this.element.setStyle({backgroundColor:$R(0,2).inject('#',function(m,v,i){return m+(Math.round(this._base[i]+(this._delta[i]*position)).toColorPart());}.bind(this))});},finish:function(){this.element.setStyle(Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}));}});Effect.ScrollTo=Class.create();Object.extend(Object.extend(Effect.ScrollTo.prototype,Effect.Base.prototype),{initialize:function(element){this.element=$(element);this.start(arguments[1]||{});},setup:function(){Position.prepare();var offsets=Position.cumulativeOffset(this.element);if(this.options.offset)offsets[1]+=this.options.offset;var max=window.innerHeight?window.height-window.innerHeight:document.body.scrollHeight-
(document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight);this.scrollStart=Position.deltaY;this.delta=(offsets[1]>max?max:offsets[1])-this.scrollStart;},update:function(position){Position.prepare();window.scrollTo(Position.deltaX,this.scrollStart+(position*this.delta));}});Effect.Fade=function(element){element=$(element);var oldOpacity=element.getInlineOpacity();var options=Object.extend({from:element.getOpacity()||1.0,to:0.0,afterFinishInternal:function(effect){if(effect.options.to!=0)return;effect.element.hide().setStyle({opacity:oldOpacity});}},arguments[1]||{});return new Effect.Opacity(element,options);}
Effect.Appear=function(element){element=$(element);var options=Object.extend({from:(element.getStyle('display')=='none'?0.0:element.getOpacity()||0.0),to:1.0,afterFinishInternal:function(effect){effect.element.forceRerendering();},beforeSetup:function(effect){effect.element.setOpacity(effect.options.from).show();}},arguments[1]||{});return new Effect.Opacity(element,options);}
Effect.Puff=function(element){element=$(element);var oldStyle={opacity:element.getInlineOpacity(),position:element.getStyle('position'),top:element.style.top,left:element.style.left,width:element.style.width,height:element.style.height};return new Effect.Parallel([new Effect.Scale(element,200,{sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(element,{sync:true,to:0.0})],Object.extend({duration:1.0,beforeSetupInternal:function(effect){Position.absolutize(effect.effects[0].element)},afterFinishInternal:function(effect){effect.effects[0].element.hide().setStyle(oldStyle);}},arguments[1]||{}));}
Effect.BlindUp=function(element){element=$(element);element.makeClipping();return new Effect.Scale(element,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(effect){effect.element.hide().undoClipping();}},arguments[1]||{}));}
Effect.BlindDown=function(element){element=$(element);var elementDimensions=element.getDimensions();return new Effect.Scale(element,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:elementDimensions.height,originalWidth:elementDimensions.width},restoreAfterFinish:true,afterSetup:function(effect){effect.element.makeClipping().setStyle({height:'0px'}).show();},afterFinishInternal:function(effect){effect.element.undoClipping();}},arguments[1]||{}));}
Effect.SwitchOff=function(element){element=$(element);var oldOpacity=element.getInlineOpacity();return new Effect.Appear(element,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(effect){new Effect.Scale(effect.element,1,{duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function(effect){effect.element.makePositioned().makeClipping();},afterFinishInternal:function(effect){effect.element.hide().undoClipping().undoPositioned().setStyle({opacity:oldOpacity});}})}},arguments[1]||{}));}
Effect.DropOut=function(element){element=$(element);var oldStyle={top:element.getStyle('top'),left:element.getStyle('left'),opacity:element.getInlineOpacity()};return new Effect.Parallel([new Effect.Move(element,{x:0,y:100,sync:true}),new Effect.Opacity(element,{sync:true,to:0.0})],Object.extend({duration:0.5,beforeSetup:function(effect){effect.effects[0].element.makePositioned();},afterFinishInternal:function(effect){effect.effects[0].element.hide().undoPositioned().setStyle(oldStyle);}},arguments[1]||{}));}
Effect.Shake=function(element){element=$(element);var oldStyle={top:element.getStyle('top'),left:element.getStyle('left')};return new Effect.Move(element,{x:20,y:0,duration:0.05,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:-40,y:0,duration:0.1,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:40,y:0,duration:0.1,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:-40,y:0,duration:0.1,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:40,y:0,duration:0.1,afterFinishInternal:function(effect){new Effect.Move(effect.element,{x:-20,y:0,duration:0.05,afterFinishInternal:function(effect){effect.element.undoPositioned().setStyle(oldStyle);}})}})}})}})}})}});}
Effect.SlideDown=function(element){element=$(element).cleanWhitespace();var oldInnerBottom=element.down().getStyle('bottom');var elementDimensions=element.getDimensions();return new Effect.Scale(element,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:elementDimensions.height,originalWidth:elementDimensions.width},restoreAfterFinish:true,afterSetup:function(effect){effect.element.makePositioned();effect.element.down().makePositioned();if(window.opera)effect.element.setStyle({top:''});effect.element.makeClipping().setStyle({height:'0px'}).show();},afterUpdateInternal:function(effect){effect.element.down().setStyle({bottom:(effect.dims[0]-effect.element.clientHeight)+'px'});},afterFinishInternal:function(effect){effect.element.undoClipping().undoPositioned();effect.element.down().undoPositioned().setStyle({bottom:oldInnerBottom});}},arguments[1]||{}));}
Effect.SlideUp=function(element){element=$(element).cleanWhitespace();var oldInnerBottom=element.down().getStyle('bottom');return new Effect.Scale(element,window.opera?0:1,Object.extend({scaleContent:false,scaleX:false,scaleMode:'box',scaleFrom:100,restoreAfterFinish:true,beforeStartInternal:function(effect){effect.element.makePositioned();effect.element.down().makePositioned();if(window.opera)effect.element.setStyle({top:''});effect.element.makeClipping().show();},afterUpdateInternal:function(effect){effect.element.down().setStyle({bottom:(effect.dims[0]-effect.element.clientHeight)+'px'});},afterFinishInternal:function(effect){effect.element.hide().undoClipping().undoPositioned().setStyle({bottom:oldInnerBottom});effect.element.down().undoPositioned();}},arguments[1]||{}));}
Effect.Squish=function(element){return new Effect.Scale(element,window.opera?1:0,{restoreAfterFinish:true,beforeSetup:function(effect){effect.element.makeClipping();},afterFinishInternal:function(effect){effect.element.hide().undoClipping();}});}
Effect.Grow=function(element){element=$(element);var options=Object.extend({direction:'center',moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{});var oldStyle={top:element.style.top,left:element.style.left,height:element.style.height,width:element.style.width,opacity:element.getInlineOpacity()};var dims=element.getDimensions();var initialMoveX,initialMoveY;var moveX,moveY;switch(options.direction){case'top-left':initialMoveX=initialMoveY=moveX=moveY=0;break;case'top-right':initialMoveX=dims.width;initialMoveY=moveY=0;moveX=-dims.width;break;case'bottom-left':initialMoveX=moveX=0;initialMoveY=dims.height;moveY=-dims.height;break;case'bottom-right':initialMoveX=dims.width;initialMoveY=dims.height;moveX=-dims.width;moveY=-dims.height;break;case'center':initialMoveX=dims.width/2;initialMoveY=dims.height/2;moveX=-dims.width/2;moveY=-dims.height/2;break;}
return new Effect.Move(element,{x:initialMoveX,y:initialMoveY,duration:0.01,beforeSetup:function(effect){effect.element.hide().makeClipping().makePositioned();},afterFinishInternal:function(effect){new Effect.Parallel([new Effect.Opacity(effect.element,{sync:true,to:1.0,from:0.0,transition:options.opacityTransition}),new Effect.Move(effect.element,{x:moveX,y:moveY,sync:true,transition:options.moveTransition}),new Effect.Scale(effect.element,100,{scaleMode:{originalHeight:dims.height,originalWidth:dims.width},sync:true,scaleFrom:window.opera?1:0,transition:options.scaleTransition,restoreAfterFinish:true})],Object.extend({beforeSetup:function(effect){effect.effects[0].element.setStyle({height:'0px'}).show();},afterFinishInternal:function(effect){effect.effects[0].element.undoClipping().undoPositioned().setStyle(oldStyle);}},options))}});}
Effect.Shrink=function(element){element=$(element);var options=Object.extend({direction:'center',moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{});var oldStyle={top:element.style.top,left:element.style.left,height:element.style.height,width:element.style.width,opacity:element.getInlineOpacity()};var dims=element.getDimensions();var moveX,moveY;switch(options.direction){case'top-left':moveX=moveY=0;break;case'top-right':moveX=dims.width;moveY=0;break;case'bottom-left':moveX=0;moveY=dims.height;break;case'bottom-right':moveX=dims.width;moveY=dims.height;break;case'center':moveX=dims.width/2;moveY=dims.height/2;break;}
return new Effect.Parallel([new Effect.Opacity(element,{sync:true,to:0.0,from:1.0,transition:options.opacityTransition}),new Effect.Scale(element,window.opera?1:0,{sync:true,transition:options.scaleTransition,restoreAfterFinish:true}),new Effect.Move(element,{x:moveX,y:moveY,sync:true,transition:options.moveTransition})],Object.extend({beforeStartInternal:function(effect){effect.effects[0].element.makePositioned().makeClipping();},afterFinishInternal:function(effect){effect.effects[0].element.hide().undoClipping().undoPositioned().setStyle(oldStyle);}},options));}
Effect.Pulsate=function(element){element=$(element);var options=arguments[1]||{};var oldOpacity=element.getInlineOpacity();var transition=options.transition||Effect.Transitions.sinoidal;var reverser=function(pos){return transition(1-Effect.Transitions.pulse(pos,options.pulses))};reverser.bind(transition);return new Effect.Opacity(element,Object.extend(Object.extend({duration:2.0,from:0,afterFinishInternal:function(effect){effect.element.setStyle({opacity:oldOpacity});}},options),{transition:reverser}));}
Effect.Fold=function(element){element=$(element);var oldStyle={top:element.style.top,left:element.style.left,width:element.style.width,height:element.style.height};element.makeClipping();return new Effect.Scale(element,5,Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function(effect){new Effect.Scale(element,1,{scaleContent:false,scaleY:false,afterFinishInternal:function(effect){effect.element.hide().undoClipping().setStyle(oldStyle);}});}},arguments[1]||{}));};Effect.Morph=Class.create();Object.extend(Object.extend(Effect.Morph.prototype,Effect.Base.prototype),{initialize:function(element){this.element=$(element);if(!this.element)throw(Effect._elementDoesNotExistError);var options=Object.extend({style:{}},arguments[1]||{});if(typeof options.style=='string'){if(options.style.indexOf(':')==-1){var cssText='',selector='.'+options.style;$A(document.styleSheets).reverse().each(function(styleSheet){if(styleSheet.cssRules)cssRules=styleSheet.cssRules;else if(styleSheet.rules)cssRules=styleSheet.rules;$A(cssRules).reverse().each(function(rule){if(selector==rule.selectorText){cssText=rule.style.cssText;throw $break;}});if(cssText)throw $break;});this.style=cssText.parseStyle();options.afterFinishInternal=function(effect){effect.element.addClassName(effect.options.style);effect.transforms.each(function(transform){if(transform.style!='opacity')
effect.element.style[transform.style.camelize()]='';});}}else this.style=options.style.parseStyle();}else this.style=$H(options.style)
this.start(options);},setup:function(){function parseColor(color){if(!color||['rgba(0, 0, 0, 0)','transparent'].include(color))color='#ffffff';color=color.parseColor();return $R(0,2).map(function(i){return parseInt(color.slice(i*2+1,i*2+3),16)});}
this.transforms=this.style.map(function(pair){var property=pair[0].underscore().dasherize(),value=pair[1],unit=null;if(value.parseColor('#zzzzzz')!='#zzzzzz'){value=value.parseColor();unit='color';}else if(property=='opacity'){value=parseFloat(value);if(/MSIE/.test(navigator.userAgent)&&!window.opera&&(!this.element.currentStyle.hasLayout))
this.element.setStyle({zoom:1});}else if(Element.CSS_LENGTH.test(value))
var components=value.match(/^([\+\-]?[0-9\.]+)(.*)$/),value=parseFloat(components[1]),unit=(components.length==3)?components[2]:null;var originalValue=this.element.getStyle(property);return $H({style:property,originalValue:unit=='color'?parseColor(originalValue):parseFloat(originalValue||0),targetValue:unit=='color'?parseColor(value):value,unit:unit});}.bind(this)).reject(function(transform){return((transform.originalValue==transform.targetValue)||(transform.unit!='color'&&(isNaN(transform.originalValue)||isNaN(transform.targetValue))))});},update:function(position){var style=$H(),value=null;this.transforms.each(function(transform){value=transform.unit=='color'?$R(0,2).inject('#',function(m,v,i){return m+(Math.round(transform.originalValue[i]+
(transform.targetValue[i]-transform.originalValue[i])*position)).toColorPart()}):transform.originalValue+Math.round(((transform.targetValue-transform.originalValue)*position)*1000)/1000+transform.unit;style[transform.style]=value;});this.element.setStyle(style);}});Effect.Transform=Class.create();Object.extend(Effect.Transform.prototype,{initialize:function(tracks){this.tracks=[];this.options=arguments[1]||{};this.addTracks(tracks);},addTracks:function(tracks){tracks.each(function(track){var data=$H(track).values().first();this.tracks.push($H({ids:$H(track).keys().first(),effect:Effect.Morph,options:{style:data}}));}.bind(this));return this;},play:function(){return new Effect.Parallel(this.tracks.map(function(track){var elements=[$(track.ids)||$$(track.ids)].flatten();return elements.map(function(e){return new track.effect(e,Object.extend({sync:true},track.options))});}).flatten(),this.options);}});Element.CSS_PROPERTIES=$w('backgroundColor backgroundPosition borderBottomColor borderBottomStyle '+'borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth '+'borderRightColor borderRightStyle borderRightWidth borderSpacing '+'borderTopColor borderTopStyle borderTopWidth bottom clip color '+'fontSize fontWeight height left letterSpacing lineHeight '+'marginBottom marginLeft marginRight marginTop markerOffset maxHeight '+'maxWidth minHeight minWidth opacity outlineColor outlineOffset '+'outlineWidth paddingBottom paddingLeft paddingRight paddingTop '+'right textIndent top width wordSpacing zIndex');Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;String.prototype.parseStyle=function(){var element=Element.extend(document.createElement('div'));element.innerHTML='<div style="'+this+'"></div>';var style=element.down().style,styleRules=$H();Element.CSS_PROPERTIES.each(function(property){if(style[property])styleRules[property]=style[property];});if(/MSIE/.test(navigator.userAgent)&&!window.opera&&this.indexOf('opacity')>-1){styleRules.opacity=this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1];}
return styleRules;};Element.morph=function(element,style){new Effect.Morph(element,Object.extend({style:style},arguments[2]||{}));return element;};['setOpacity','getOpacity','getInlineOpacity','forceRerendering','setContentZoom','collectTextNodes','collectTextNodesIgnoreClass','morph'].each(function(f){Element.Methods[f]=Element[f];});Element.Methods.visualEffect=function(element,effect,options){s=effect.gsub(/_/,'-').camelize();effect_class=s.charAt(0).toUpperCase()+s.substring(1);new Effect[effect_class](element,options);return $(element);};Element.addMethods();
if(!Control)var Control={};Control.Slider=Class.create();Control.Slider.prototype={initialize:function(handle,track,options){var slider=this;if(handle instanceof Array){this.handles=handle.collect(function(e){return $(e)});}else{this.handles=[$(handle)];}
this.track=$(track);this.options=options||{};this.axis=this.options.axis||'horizontal';this.increment=this.options.increment||1;this.step=parseInt(this.options.step||'1');this.range=this.options.range||$R(0,1);this.value=0;this.values=this.handles.map(function(){return 0});this.spans=this.options.spans?this.options.spans.map(function(s){return $(s)}):false;this.options.startSpan=$(this.options.startSpan||null);this.options.endSpan=$(this.options.endSpan||null);this.restricted=this.options.restricted||false;this.maximum=this.options.maximum||this.range.end;this.minimum=this.options.minimum||this.range.start;this.alignX=parseInt(this.options.alignX||'0');this.alignY=parseInt(this.options.alignY||'0');this.trackLength=this.maximumOffset()-this.minimumOffset();this.handleLength=this.isVertical()?(this.handles[0].offsetHeight!=0?this.handles[0].offsetHeight:this.handles[0].style.height.replace(/px$/,"")):(this.handles[0].offsetWidth!=0?this.handles[0].offsetWidth:this.handles[0].style.width.replace(/px$/,""));this.active=false;this.dragging=false;this.disabled=false;if(this.options.disabled)this.setDisabled();this.allowedValues=this.options.values?this.options.values.sortBy(Prototype.K):false;if(this.allowedValues){this.minimum=this.allowedValues.min();this.maximum=this.allowedValues.max();}
this.eventMouseDown=this.startDrag.bindAsEventListener(this);this.eventMouseUp=this.endDrag.bindAsEventListener(this);this.eventMouseMove=this.update.bindAsEventListener(this);this.handles.each(function(h,i){i=slider.handles.length-1-i;slider.setValue(parseFloat((slider.options.sliderValue instanceof Array?slider.options.sliderValue[i]:slider.options.sliderValue)||slider.range.start),i);Element.makePositioned(h);Event.observe(h,"mousedown",slider.eventMouseDown);});Event.observe(this.track,"mousedown",this.eventMouseDown);Event.observe(document,"mouseup",this.eventMouseUp);Event.observe(document,"mousemove",this.eventMouseMove);this.initialized=true;},dispose:function(){var slider=this;Event.stopObserving(this.track,"mousedown",this.eventMouseDown);Event.stopObserving(document,"mouseup",this.eventMouseUp);Event.stopObserving(document,"mousemove",this.eventMouseMove);this.handles.each(function(h){Event.stopObserving(h,"mousedown",slider.eventMouseDown);});},setDisabled:function(){this.disabled=true;},setEnabled:function(){this.disabled=false;},getNearestValue:function(value){if(this.allowedValues){if(value>=this.allowedValues.max())return(this.allowedValues.max());if(value<=this.allowedValues.min())return(this.allowedValues.min());var offset=Math.abs(this.allowedValues[0]-value);var newValue=this.allowedValues[0];this.allowedValues.each(function(v){var currentOffset=Math.abs(v-value);if(currentOffset<=offset){newValue=v;offset=currentOffset;}});return newValue;}
if(value>this.range.end)return this.range.end;if(value<this.range.start)return this.range.start;return value;},setValue:function(sliderValue,handleIdx){if(!this.active){this.activeHandleIdx=handleIdx||0;this.activeHandle=this.handles[this.activeHandleIdx];this.updateStyles();}
handleIdx=handleIdx||this.activeHandleIdx||0;if(this.initialized&&this.restricted){if((handleIdx>0)&&(sliderValue<this.values[handleIdx-1]))
sliderValue=this.values[handleIdx-1];if((handleIdx<(this.handles.length-1))&&(sliderValue>this.values[handleIdx+1]))
sliderValue=this.values[handleIdx+1];}
sliderValue=this.getNearestValue(sliderValue);this.values[handleIdx]=sliderValue;this.value=this.values[0];this.handles[handleIdx].style[this.isVertical()?'top':'left']=this.translateToPx(sliderValue);this.drawSpans();if(!this.dragging||!this.event)this.updateFinished();},setValueBy:function(delta,handleIdx){this.setValue(this.values[handleIdx||this.activeHandleIdx||0]+delta,handleIdx||this.activeHandleIdx||0);},translateToPx:function(value){return Math.round(((this.trackLength-this.handleLength)/(this.range.end-this.range.start))*(value-this.range.start))+"px";},translateToValue:function(offset){return((offset/(this.trackLength-this.handleLength)*(this.range.end-this.range.start))+this.range.start);},getRange:function(range){var v=this.values.sortBy(Prototype.K);range=range||0;return $R(v[range],v[range+1]);},minimumOffset:function(){return(this.isVertical()?this.alignY:this.alignX);},maximumOffset:function(){return(this.isVertical()?(this.track.offsetHeight!=0?this.track.offsetHeight:this.track.style.height.replace(/px$/,""))-this.alignY:(this.track.offsetWidth!=0?this.track.offsetWidth:this.track.style.width.replace(/px$/,""))-this.alignY);},isVertical:function(){return(this.axis=='vertical');},drawSpans:function(){var slider=this;if(this.spans)
$R(0,this.spans.length-1).each(function(r){slider.setSpan(slider.spans[r],slider.getRange(r))});if(this.options.startSpan)
this.setSpan(this.options.startSpan,$R(0,this.values.length>1?this.getRange(0).min():this.value));if(this.options.endSpan)
this.setSpan(this.options.endSpan,$R(this.values.length>1?this.getRange(this.spans.length-1).max():this.value,this.maximum));},setSpan:function(span,range){if(this.isVertical()){span.style.top=this.translateToPx(range.start);span.style.height=this.translateToPx(range.end-range.start+this.range.start);}else{span.style.left=this.translateToPx(range.start);span.style.width=this.translateToPx(range.end-range.start+this.range.start);}},updateStyles:function(){this.handles.each(function(h){Element.removeClassName(h,'selected')});Element.addClassName(this.activeHandle,'selected');},startDrag:function(event){if(Event.isLeftClick(event)){if(!this.disabled){this.active=true;var handle=Event.element(event);var pointer=[Event.pointerX(event),Event.pointerY(event)];var track=handle;if(track==this.track){var offsets=Position.cumulativeOffset(this.track);this.event=event;this.setValue(this.translateToValue((this.isVertical()?pointer[1]-offsets[1]:pointer[0]-offsets[0])-(this.handleLength/2)));var offsets=Position.cumulativeOffset(this.activeHandle);this.offsetX=(pointer[0]-offsets[0]);this.offsetY=(pointer[1]-offsets[1]);}else{while((this.handles.indexOf(handle)==-1)&&handle.parentNode)
handle=handle.parentNode;if(this.handles.indexOf(handle)!=-1){this.activeHandle=handle;this.activeHandleIdx=this.handles.indexOf(this.activeHandle);this.updateStyles();var offsets=Position.cumulativeOffset(this.activeHandle);this.offsetX=(pointer[0]-offsets[0]);this.offsetY=(pointer[1]-offsets[1]);}}}
Event.stop(event);}},update:function(event){if(this.active){if(!this.dragging)this.dragging=true;this.draw(event);if(navigator.appVersion.indexOf('AppleWebKit')>0)window.scrollBy(0,0);Event.stop(event);}},draw:function(event){var pointer=[Event.pointerX(event),Event.pointerY(event)];var offsets=Position.cumulativeOffset(this.track);pointer[0]-=this.offsetX+offsets[0];pointer[1]-=this.offsetY+offsets[1];this.event=event;this.setValue(this.translateToValue(this.isVertical()?pointer[1]:pointer[0]));if(this.initialized&&this.options.onSlide)
this.options.onSlide(this.values.length>1?this.values:this.value,this);},endDrag:function(event){if(this.active&&this.dragging){this.finishDrag(event,true);Event.stop(event);}
this.active=false;this.dragging=false;},finishDrag:function(event,success){this.active=false;this.dragging=false;this.updateFinished();},updateFinished:function(){if(this.initialized&&this.options.onChange)
this.options.onChange(this.values.length>1?this.values:this.value,this);this.event=null;}}