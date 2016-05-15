
y_embedPlayer=function()
{this.id=(typeof window.y_up_id==='undefined')?null:y_up_id;this.debug=(typeof window.y_up_debug==='undefined')?0:y_up_debug;this.urlLoc=(typeof window.y_up_eUrlLoc==='undefined')?"http://l.yimg.com/cosmos.bcst.yahoo.com/ver/265.0/embed-2008-05-27-1021/":y_up_eUrlLoc;this.rootid=(typeof window.y_up_rootnode==='undefined')?61492:y_up_rootnode;this.embedW=(typeof window.y_up_embedW==='undefined')?400:y_up_embedW;this.embedH=(typeof window.y_up_embedH==='undefined')?300:y_up_embedH;this.tMsg=(typeof window.y_up_txtMessage==='undefined')?'Latest Clips':y_up_txtMessage;this.clipLimit=(typeof window.y_up_clipLimit==='undefined')?10:y_up_clipLimit;this.disMode=(typeof window.y_up_displaymode==='undefined')?1:y_up_displaymode;this.chromeMode=(typeof window.y_up_chromemode==='undefined')?1:y_up_chromemode;this.language=(typeof window.y_up_language==='undefined')?"":y_up_language;this.langFile=(typeof window.y_up_language==='undefined')?"":"&txtFile=http://us.i1.yimg.com/cosmos.bcst.yahoo.com/player/lang/"+y_up_language+".xml";this.bgColor=(typeof window.y_up_bgColor==='undefined')?null:y_up_bgColor;this.shareEnable=(typeof window.y_up_shareEnable==='undefined')?1:y_up_shareEnable;this.popupEnable=(typeof window.y_up_popupEnable==='undefined')?1:y_up_popupEnable;this.divType=(typeof window.y_up_posType==='undefined')?"relative":y_up_posType;this.noStretch=(typeof window.y_up_noStretch==='undefined')?1:y_up_noStretch;this.eventHandler=(typeof window.y_up_eventHandler==='undefined')?function(){return;}:y_up_eventHandler;this.loop=(typeof window.y_up_loop==='undefined')?1:y_up_loop;this.rd=(typeof window.y_up_rd==='undefined')?window.location.hostname:y_up_rd;this.overlayable=(typeof window.y_up_overlayable==='undefined')?1:y_up_overlayable;this.preview=(typeof window.y_up_preview==='undefined')?1:y_up_preview;this.eAutoStart=(typeof window.y_up_eAutoStart==='undefined')?0:y_up_eAutoStart;this.eDetect=(typeof window.y_up_eDetect==='undefined')?"hybrid":y_up_eDetect;this.xmlDataFV=(typeof window.y_up_contentXml==='undefined')?"":escape(y_up_contentXml);if(typeof window.y_up_eAutoStart!='undefined'&&typeof window.y_up_contentXml==='undefined'){this.xmlDataFV=escape("<clist><c id=\""+this.eAutoStart+"\"/></clist>");}
this.mailUrl=(typeof window.y_up_mailUrl==='undefined')?"http://cosmos.bcst.yahoo.com/scp_v3/viewer/share_upv2.php?url={url}":y_up_mailUrl;this.mailSize=(typeof window.y_up_mailSize==='undefined')?{'w':400,'h':500}:y_up_mailSize;this.uID=new Date().getTime()+Math.floor(Math.random()*100000);if("undefined"!=typeof(this.shareEnable.toLowerCase)&&'true'==this.shareEnable.toLowerCase()){this.shareEnable=1}
if("undefined"!=typeof(this.popupEnable.toLowerCase)&&'true'==this.popupEnable.toLowerCase()){this.popupEnable=1}
this.ds="cosmos.bcst.yahoo.com";this.fv="txtMessage="+escape(this.tMsg)+"&clipLimit="+this.clipLimit+"&displayMode="+this.disMode+"&uID="+this.uID+"&nostretch="+this.noStretch;this.fv+="&debug="+this.debug+"&shareEnable="+(Number(this.shareEnable)>0?1:0)+"&popupEnable="+((Number(this.popupEnable)>0)?1:0)+"&rootnode="+this.rootid+"&chromeMode="+this.chromeMode+"&xmlData="+this.xmlDataFV+"&uID="+new Date().getTime();this.fv+="&loop="+this.loop;this.fv+="&eAutoStart="+this.eAutoStart;this.fv+="&ds="+this.ds+this.langFile;this.oDisMode=this.disMode;this.loadCheck=0;this.isStarted=0;this.everBegun=0;var self=this;var currentClip=null;this.init=function()
{var a=false;var b=false;var c=true;try{a=document.getElementById('y_up_embedSwf');b=document.getElementById('player');if(self.eAutoStart)
{c=document.getElementById('y_up_embedSwf').notifyID;}}catch(e){}
if(typeof y_up=='undefined'||(typeof a=='object'&&!a)||(typeof b=='object'&&!b)||(typeof c=='undefined')){setTimeout(self.init,100);return;}
var promotedFunctions=["seek"];for(var x=0;x<promotedFunctions.length;x++)
{self[promotedFunctions[x]]=(function(){var toCall=promotedFunctions[x];return function()
{return y_up[toCall].apply(y_up,arguments);}})()}
y_up.setItemBeginHandler(self.adStart,"S_AD");y_up.setItemEndHandler(self.adStop,"S_AD");y_up.setNotifyAdControlHandler(self.adStart);y_up.setNotifyClientControlHandler(self.adStop);y_up.setItemFirstPlayHandler(self.eventBeginThrower);y_up.setItemEndHandler(self.eventEndThrower);y_up.setDisconnectHandler(self.eventErrorThrower);if(!self.eAutoStart)
{document.getElementById('player').style.width=self.embedW+"px";document.getElementById('player').style.height=self.embedH+"px";document.getElementById('player').style.display='none';document.getElementById('player').innerHTML='';self.eventHandler("init",{'id':'y_prev_u','w':self.embedW,'h':self.embedH});}
else
{currentClip=self.eAutoStart;y_up.setVideoCompleteHandler(self.onClipEnd);self.eventHandler("init",{});try{var foo=document.getElementById('y_up_embedSwf').notifyID(self.eAutoStart);}catch(e){}}};this.resize=function(pW,pH)
{self.embedW=pW;self.embedH=pH;var toResizeW={'y_up_embedPreview':0,'y_up_embedSwf':8,'y_prev':0,'player':0};for(var x in toResizeW)
{var newW=(self.embedW+toResizeW[x])+"px";if(document.getElementById(x))
{try{document.getElementById(x).style.width=newW+"px";}catch(e){}
try{document.getElementById(x).width=newW;}catch(e){}}}
var toResizeH={'y_up_embedPreview':0,'y_prev':0,'player':0};for(var z in toResizeH)
{var newH=(self.embedH+toResizeH[z])+"px";if(document.getElementById(z))
{try{document.getElementById(z).style.height=newH+"px";}catch(e){}}}
if(typeof y_up!="undefined")
{y_up.vidW=pW;y_up.vidH=pH;}
if(typeof y_up!="undefined"&&typeof y_up.setVideoSize!="undefined")
{y_up.setVideoSize(pW,pH);}
window.y_up_vidW=pW;window.y_up_vidH=pH;window.y_up_embedW=pW;window.y_up_embedW=pH;self.eventHandler("resize",{'id':'player','w':self.embedW,'h':self.embedH});return{'w':self.embedW,'h':self.embedH};};this.switchMode=function(mode)
{self.disMode=mode;self.setDisplayHeight();document.getElementById('y_up_embedSwf').style.height=self.modeHeight+"px";document.getElementById('y_up_embedSwf').height=self.modeHeight;};this.eventErrorThrower=function()
{self.eventHandler("error",{"id":"player","type":"disconnect"});}
this.eventBeginThrower=function(pInfo)
{self.everBegun=1;self.eventHandler("itemBegin",pInfo);}
this.eventEndThrower=function(pInfo)
{self.eventHandler("itemEnd",pInfo);}
this.eventSeqEndThrower=function(pInfo)
{self.eventHandler("sequenceEnd",pInfo);}
this.adStart=function(pInfo)
{var x=document.getElementById('y_up_embedSwf').sendJSCommand("adstart");if("object"!=typeof pInfo||y_up.isAdvancedAd(pInfo))
{if(!window.adInterval)
{window.adInterval=window.setInterval(function(){try{y_up.g('y_up_embedSwf').setControlsData({'msg':"Advertisement",'cur':y_up.getAdPlayheadTime(),'ttl':y_up.getAdDuration()})}catch(e){}},0.5*1000);}}
if(self.oDisMode==3){document.getElementById('yup-adContent').style.background="#000000";if(self.embedW>=310)document.getElementById('yup-adContent').style.padding="5px";if("object"==typeof pInfo||!y_up.isAdvancedAd(infoObj))
{y_up.setItemFirstPlayHandler(function(){var ebPack=y_up.get(pInfo,['stream','metadata','ads','EB']);if(ebPack)
{y_up.event("[ADS] 'EB' -> "+ebPack[0]);y_up_embedPlayer.switchMode(2);document.getElementById('yup-adRow').style.display="";document.getElementById('yup-adFrame').src=ebPack[0];}
if(y_up.clientDetect.browser()['ver'][0]==6)
{with(document.body.style)
{zoom=2;zoom=1;}}},'S_AD');}}}
this.adStop=function(pInfo)
{var x=document.getElementById('y_up_embedSwf').sendJSCommand("adstop");if("object"==typeof pInfo||!y_up.isAdvancedAd(infoObj))
{if(self.oDisMode==3){document.getElementById('yup-adContent').style.background="#FFFFFF";document.getElementById('yup-adContent').style.padding="0px";y_up_embedPlayer.switchMode(3);}
document.getElementById('yup-adRow').style.display="none";}
else
{window.clearInterval(window.adInterval);window.adInterval=0;y_up.g('y_up_embedSwf').setControlsData();}}
this.done=function()
{if(self.everBegun)
{document.getElementById('player').innerHTML='';self.eventHandler("done",{'id':'player','w':self.embedW,'h':self.embedH});}}
this.shareClip=function(id,title,format,sid)
{id=y_up.getCurrentVideoId();if(id===null||id==undefined||id==0)return;switch(format){case 1:var IMobj=messenger.detect();if(!IMobj.installed){alert("Messenger is not installed (or not detected)");}else{var ymurl="ymsgr:im?msg="+escape("Video from Yahoo! "+self.popupUrl(id,000000));window.location.href=ymurl;}
break;case 2:var space_id=00000000;var clipUrl=self.popupUrl(id,space_id);var toMail=self.mailUrl.replace(/{url}/,escape(clipUrl));console.log("toMail- "+toMail);window.open(toMail,'shareWin','width='+self.mailSize['w']+',height='+self.mailSize['h']+',toolbar=no,status=no');break;}};this.popupUrl=function(pId,pSid)
{var url='http://cosmos.bcst.yahoo.com/ver/265.0/popup/index.php?cl='+pId+'&t=em&sid='+pSid;return url;}
this.fullscreenUrl=function(pId,pSid)
{var url='http://l.yimg.com/cosmos.bcst.yahoo.com/ver/265.0/embed-2008-05-27-1021/fullscreen.html?';return url;}
this.launchPlayer=function(id,rootid)
{var id=y_up.getCurrentVideoId();if(id===null||id==undefined||id==0)return;if(1==self.popupEnable)
{y_up.pause();var url=this.popupUrl(id,00000000);window.open(url,'playerWindow','width=793,height=608,scrollbars=no');}
else if(2==self.popupEnable)
{if(y_up.canFullScreen())
{y_up.fullScreen();}
else
{y_up.pause();var url=this.fullscreenUrl(id,00000000);var time=y_up.getPlayheadTime();url+="&seek="+time;url+="&kbps="+y_up.kbps
url+="&eAutoStart="+id;url+="&language="+self.language;url+="&shareEnable=0"
url+="&popupEnable=0"
url+="&detect=0"
url+="&loop=0"
url+="&preview=0"
window.open(url,'fullscreenWindow','width='+screen.availWidth+',height='+screen.availHeight+'');if(y_up.clientDetect.os()['detected']=='mac'&&y_up.isLive()&&y_up.getPlayerTech()=='qt'||y_up.beaconInterval)
{try{y_up.clearTracking();y_up.player.unLoadPlayer();y_up.player.unLoadHtml();}catch(e){}}}}
return url;};this.setDisplayHeight=function()
{switch(self.disMode){case 1:self.modeHeight=26;break;case 2:self.modeHeight=55;break;case 3:self.modeHeight=160;break;}};this.makeSwfCode=function(swf,id,flashvars,w,h,bgColor)
{var swfCode='';var isIE=navigator.appName.indexOf("Microsoft")!=-1;var bg_Color=(bgColor===null)?"FFFFFF":bgColor;if(isIE){swfCode+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';swfCode+='codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+w+'" height="'+h+'" ';swfCode+='id="'+id+'" align="middle">';swfCode+='<param name="allowScriptAccess" value="always" />';if(self.overlayable)
{swfCode+='<param name="wmode" value="opaque" />';}
swfCode+='<param name="flashvars" value="'+flashvars+'" />';swfCode+='<param name="movie" value="'+swf+'" /><param name="quality" value="high" /><param name="bgcolor" value="#'+bg_Color+'" />';swfCode+='</object>';}else{swfCode+='<embed src="'+swf+'" quality="high" flashvars="'+flashvars+'" bgcolor="#'+bg_Color+'" width="'+w+'" height="'+h+'" id="'+id+'" align="middle" ';swfCode+='allowScriptAccess="always" wmode="opaque" swLiveConnect=true  type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';}
return swfCode;};this.playID=function(id)
{currentClip=id;y_up.setVideoCompleteHandler(self.onClipEnd);setTimeout(y_up_embedPlayer.playQueue,300);return true;};this.playQueue=function()
{if(document.getElementById('y_prev'))
{document.getElementById('y_prev').style.display='none';}
if(document.getElementById('player'))
{document.getElementById('player').style.display='block';}
if(!self.isStarted){var wmode=self.overlayable?"opaque":"";y_up.init({"id":currentClip,"rd":self.rd,"controls":0,"autoStart":1,"flvWMode":wmode,"pTrackPlayerName":"embedAPI","vidW":self.embedW,"vidH":self.embedH,"detect":self.eDetect,"posType":"relative"});self.isStarted=true;}else{y_up.playVideo(currentClip);}
try{var foo=document.getElementById('y_up_embedSwf').notifyID(currentClip);}catch(e){}};this.onClipEnd=function(clipParam)
{self.eventSeqEndThrower(clipParam);var x=document.getElementById('y_up_embedSwf').sendJSCommand("videonext",10);};this.writePlayer=function()
{if(self.eAutoStart)
{y_up_id=self.eAutoStart;y_up_autoStart=1;self.isStarted=1;}
else
{y_up_id=0;y_up_autoStart=0;}
var wmode=self.overlayable?"opaque":"";y_up_rd=self.rd;y_up_controls=0;y_up_flvWMode=wmode;y_up_pTrackPlayerName="embedAPI";y_up_vidW=self.embedW;y_up_vidH=self.embedH;y_up_detect=self.eDetect;y_up_posType="relative";var vpLoc="http://l.yimg.com/cosmos.bcst.yahoo.com/ver/265.0/player-2008-05-27-1021/";self.setDisplayHeight();if(self.chromeMode!=3)
{document.write('<link href="'+self.urlLoc+'src/chromeMode'+self.chromeMode+'.css" media="screen,print" rel="STYLESHEET" type="text/css" />');}
else
{document.write("<style>");document.write(".yup-table { border-collapse: collapse; }");document.write(".yup-table td { padding: 0; margin: 0; }");document.write(".yup-playercontent { }");document.write(".yup-traycontent { }");document.write(".yup-T1 { height: 5px; width: 1px; }");document.write(".yup-T2 { height: 5px; width: 4px; }");document.write(".yup-T3 { }");document.write(".yup-T4 { height: 5px; width: 4px; }");document.write(".yup-T5 { height: 5px; width: 1px; }");document.write(".yup-T6 { height: 5px; width: 0px; }");document.write(".yup-M1 { width: 1px; }");document.write(".yup-M2 { width: 0px; }");document.write(".yup-MW { width: 4px; }");document.write(".yup-B1 { height: 5px; width: 1px; }");document.write(".yup-B2 { height: 5px; width: 4px; }");document.write(".yup-B3 { }");document.write(".yup-B4 { height: 5px; width: 4px; }");document.write(".yup-B5 { height: 5px; width: 1px; }");document.write(".yup-B6 { height: 5px; width: 0px; }");document.write("</style>");}
document.write("<div id='y_embed' style='position:"+self.divType+";'>");document.write('<table class="yup-table" border="0">');document.write('<tr><td class="yup-T1"></td><td class="yup-T2"></td><td class="yup-T3"></td><td class="yup-T4"></td><td class="yup-T5"></td><td class="yup-T6"></td></tr>');document.write('<tr><td class="yup-M1"></td><td class="yup-MW"></td><td class="yup-playercontent">');var displayType='block';if(!self.eAutoStart)
{document.write("<div id='y_prev' style='display:block; background: black; width: "+self.embedW+"px; height: "+self.embedH+"px;'>");if(self.preview)
{document.write(self.makeSwfCode(self.urlLoc+"swf/yup_embed_preview.swf","y_up_embedPreview",self.fv,self.embedW,self.embedH,"000000"));}
else
{document.write("<div id='y_prev_u' style='display: block; width: "+self.embedW+"px; height: "+self.embedH+"px;'>&nbsp;</div>");}
document.write("</div>");displayType='none';}
document.write("<div id='player' style='background:#000000; display: "+displayType+"; width: "+self.embedW+"px; height: "+self.embedH+"px;'></div>");document.write('</td><td class="yup-MW"></td><td class="yup-M1"></td><td class="yup-M2"></td></tr>');document.write('<tr><td class="yup-M1"></td><td class="yup-traycontent" style="background:#FFFFFF" colspan=3>');document.write("<div id='y_embedTray'>"+self.makeSwfCode(self.urlLoc+"swf/yup_embed_module.swf","y_up_embedSwf",self.fv,y_up_embedPlayer.embedW+8,self.modeHeight,self.bgColor)+"</div>");var wmpScript="";wmpScript+='<script for="wmp" event="playStateChange(NewState)" language="jscript">\n';wmpScript+='try {'
wmpScript+='  if ( (y_up) && (y_up.tech == "wmp") && (!!y_up.player) && (typeof y_up.player.player_onPlayStateChange == "function") )\n'
wmpScript+='  { y_up.player.player_onPlayStateChange(NewState) }\n';wmpScript+='} catch (err) { }'
wmpScript+='</script>\n';document.write(wmpScript);document.write('<script src="'+vpLoc+'src/vidPlayer_two.js" type="text/javascript"><\/script>');document.write('</td><td class="yup-M1"></td><td class="yup-M2"></td></tr>');document.write('<tr id="yup-adRow" style="display: none"><td class="yup-M1"></td><td class="yup-MW"></td><td class="yup-traycontent" id="yup-adContent" align="center" style="background:#FFFFFF"><iframe width="300" height="100" scrolling="no" frameborder="0" vspace="0" hspace="0" marginheight="0" marginwidth="0" id="yup-adFrame" style=" visibility: visible; z-index: 1000;"></iframe></td><td class="yup-MW"></td><td class="yup-M1"></td><td class="yup-M2"></td></tr>');document.write('<tr><td class="yup-B1"></td><td class="yup-B2"></td><td class="yup-B3"></td><td class="yup-B4"></td><td class="yup-B5"></td><td class="yup-B6"></td></tr>');document.write('</table>');document.write('</div>');if(self.shareEnable)document.write('<div id="y_msngr_detect" style="position:absolute;left:-1000px;top:-1000px;"><script src="http://us.js1.yimg.com/us.yimg.com/lib/msg/js/msgr_detect_200509081601.js"></script></div>');};this.flvVerCopy=function()
{var flv=false;var flvMaj=0;var flvMin=0;var c5,c6,c7,c8,c9;try{c5=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.5");c6=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");c7=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");c8=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.8");c9=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.9");}
catch(error){}
if(c5)
{flv=true;flvMaj=5;flvMin=0;}
if(c6)
{flv=true
flvMaj=6
flvMin=0}
if(c7)
{flv=true
flvMaj=7
flvMin=0}
if(c8)
{flv=true
flvMaj=8
flvMin=0}
if(c9)
{flv=true
flvMaj=9
flvMin=0}
if(navigator.plugins)
{if(navigator.plugins!=null&&navigator.plugins.length>0){var flashPlugin=navigator.plugins['Shockwave Flash'];var flashMaj=0;if(typeof flashPlugin=='object'){for(i=25;i>0;i--){if(flashPlugin.description.indexOf(i+'.')!=-1){flv=true;flvMaj=i;flvMin=flashPlugin.description.match(/\.(\d+)/)[1];break;}}}}}
var toReturn=false;if(flv)
{toReturn=[flvMaj,flvMin];}
return toReturn;}
this.cGrade=function()
{var flvVer=self.flvVerCopy();var isCGrade=!flvVer||flvVer[0]<8;return isCGrade;};this.denyPreQual=function()
{var errW=self.embedW;var errH=self.embedH;errW+=10;errH+=10;if(self.disMode==1)
{errH+=25;}
else if(self.disMode==2)
{errH+=25+30;}
else if(self.disMode==3)
{errH+=25+30+105;}
var link="http://cosmos.bcst.yahoo.com/solutions/";var html='<table style="border: 1px solid #636363; width: '+errW+'px; height: '+errH+'px; text-align: center; background: white;"> <tr><td style="padding: 15px;" valign="top"> <img src="http://us.i1.yimg.com/advision.webevents.yahoo.com/i/uvp/prequalCaution.gif" width=60 height=50><br> <br> <span style="font-family: sans-serif; font-size: large;"><b>We are unable to proceed.</b></span><br> <br> <div style="background: #ffdf6b; font-family: sans-serif;"><b>Your computer is currently unable to play the selected clip.</b></div> <br> <span style="font-family: sans-serif;">Please go to the <a href="'+link+'" target="_blank">solutions</a> page to see what is required to proceed.</span><br> </td> </tr><td> <span style="color: #636363; font-size: xx-small; font-family: sans-serif;">&copy; 2006 Yahoo! Inc, All rights reserved.</span> </td></tr></table>';document.write(html);};};y_up_embedPlayer=new y_embedPlayer();shareClip=y_up_embedPlayer.shareClip;if(y_up_embedPlayer.cGrade())
{y_up_embedPlayer.denyPreQual();}
else
{y_up_embedPlayer.writePlayer();y_up_embedPlayer.init();}
